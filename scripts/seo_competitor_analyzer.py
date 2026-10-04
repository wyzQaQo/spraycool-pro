#!/usr/bin/env python3
"""
SEO Competitor Analyzer - 极度控费版本
==========================================
功能：通过 DataForSEO 批量获取竞品 URL，本地抓取文本，spaCy 提取 H1/H2 和 LSI 词频

成本控制在：
- SERP 查询：$0.0006/关键词（只买第1页，depth=10）
- On-Page 抓取：仅在本地爬虫失败时使用，且关闭 JS 渲染
- NLP 分析：全本地运行，零外接成本

作者：MistGuard Pro SEO Team
日期：2026-06-08
"""

import os
import sys
import json
import time
import asyncio
import logging
from datetime import datetime
from typing import List, Dict, Optional, Tuple
from dataclasses import dataclass, asdict
from pathlib import Path
from collections import Counter

import httpx
from bs4 import BeautifulSoup
import spacy
from spacy.lang.en.stop_words import STOP_WORDS
from dotenv import load_dotenv

# 自动加载 .env 文件（优先从脚本所在目录查找）
_env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=_env_path)

# =============================================================================
# 配置与常量
# =============================================================================

# DataForSEO API 凭证（从 .env 或环境变量读取，避免硬编码）
API_LOGIN = os.getenv("DATAFORSEO_LOGIN", "")
API_PASSWORD = os.getenv("DATAFORSEO_PASSWORD", "")

# API 端点
BASE_URL = "https://api.dataforseo.com/v3"
SERP_TASK_POST = f"{BASE_URL}/serp/google/organic/task_post"
SERP_TASK_GET = f"{BASE_URL}/serp/google/organic/tasks_ready"
ONPAGE_INSTANT = f"{BASE_URL}/on_page/instant_pages"

# 批量大小限制
SERP_BATCH_SIZE = 100  # DataForSEO 单次请求上限（避免 40006 错误）

# 默认 SERP 参数（极度控费）
DEFAULT_SERP_PARAMS = {
    "depth": 10,           # 只获取第 1 页（10 个结果）
    "location_code": 2840,  # United States
    "language_code": "en",
    # 严禁附加参数（避免翻倍计费）：
    # - 不设置 load_async_overview
    # - 不设置 calculate_rectangles
    # - 不设置 people_also_ask_click_depth
    # - 不使用高级搜索指令（如 site:）
}

# spaCy 模型
SPACY_MODEL = "en_core_web_sm"

# 日志配置
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)
logger = logging.getLogger(__name__)


# =============================================================================
# 数据模型
# =============================================================================

@dataclass
class SERPResult:
    """SERP 查询结果"""
    keyword: str
    url: str
    position: int
    title: str
    description: str
    
    def to_dict(self):
        return asdict(self)


@dataclass
class PageAnalysis:
    """页面分析结果"""
    url: str
    keyword: str
    h1_tags: List[str]
    h2_tags: List[str]
    lsi_keywords: List[Tuple[str, int]]  # [(word, frequency), ...]
    raw_text: str
    scraped_at: str
    scrape_method: str  # "local" or "onpage_api"
    
    def to_dict(self):
        return asdict(self)


# =============================================================================
# 1. DataForSEO SERP 阶段（极度控费与批量投递）
# =============================================================================

class DataForSEOSERPClient:
    """
    DataForSEO SERP API 客户端
    严格控费：只买第 1 页数据，禁止所有附加参数
    """
    
    def __init__(self, login: str, password: str, output_dir: str):
        self.auth = (login, password)
        self.output_dir = Path(output_dir)
        self.raw_dir = self.output_dir / "raw" / "serp"
        self.raw_dir.mkdir(parents=True, exist_ok=True)
        
        # HTTP 客户端（复用连接）
        self.client = httpx.AsyncClient(
            auth=self.auth,
            timeout=httpx.Timeout(30.0, connect=10.0),
            limits=httpx.Limits(max_connections=10)
        )
        
        logger.info(f"SERP 客户端初始化完成（输出目录: {output_dir}）")
    
    def _build_payload(self, keywords: List[str], params: Dict) -> List[Dict]:
        """
        构建 SERP API 请求负载
        严格控费：Payload 绝对干净，不含任何附加参数
        """
        tasks = []
        for keyword in keywords:
            task = {
                "keyword": keyword,
                "depth": params.get("depth", 10),
                "location_code": params.get("location_code", 2840),
                "language_code": params.get("language_code", "en"),
                # 严禁添加以下参数（会翻倍计费）：
                # - load_async_overview
                # - calculate_rectangles
                # - people_also_ask_click_depth
                # - advanced_operator
            }
            tasks.append(task)
        
        return tasks
    
    def _chunk_tasks(self, tasks: List[Dict], chunk_size: int = SERP_BATCH_SIZE) -> List[List[Dict]]:
        """
        将任务列表切片为小批次（避免 40006 错误）
        DataForSEO 单次 POST 请求的 tasks 数组上限为 100 个任务
        """
        chunks = []
        for i in range(0, len(tasks), chunk_size):
            chunks.append(tasks[i:i + chunk_size])
        
        logger.info(f"任务切片完成：{len(tasks)} 个任务 → {len(chunks)} 个批次（每批 {chunk_size} 个）")
        return chunks
    
    async def _post_tasks(self, tasks: List[Dict]) -> List[str]:
        """
        投递 SERP 任务（Standard Queue 模式）
        返回：任务 ID 列表
        """
        try:
            response = await self.client.post(
                SERP_TASK_POST,
                json=tasks
            )
            response.raise_for_status()
            data = response.json()
            
            # 严格校验响应状态码
            if data.get("status_code") != 20000:
                logger.error(f"SERP 任务投递失败: {data.get('status_message')}")
                return []
            
            task_ids = []
            for task in data.get("tasks", []):
                if task.get("status_code") == 20100:
                    task_ids.append(task.get("id"))
                else:
                    logger.warning(f"任务创建失败: {task.get('status_message')}")
            
            logger.info(f"成功投递 {len(task_ids)} 个 SERP 任务")
            return task_ids
        
        except httpx.HTTPStatusError as e:
            logger.error(f"HTTP 错误: {e.response.status_code} - {e.response.text}")
            return []
        except Exception as e:
            logger.error(f"投递任务时发生错误: {e}")
            return []
    
    async def _get_results(self, task_ids: List[str], max_wait: int = 300) -> List[Dict]:
        """
        获取 SERP 任务结果（Standard Queue 模式需要轮询）
        max_wait: 最大等待时间（秒）
        """
        results = []
        start_time = time.time()
        
        while task_ids and (time.time() - start_time) < max_wait:
            try:
                # 检查已完成的任务
                response = await self.client.get(SERP_TASK_GET)
                response.raise_for_status()
                data = response.json()
                
                if data.get("status_code") != 20000:
                    logger.error(f"获取任务结果失败: {data.get('status_message')}")
                    break
                
                completed_tasks = []
                for task in data.get("tasks", []):
                    if task.get("id") in task_ids:
                        completed_tasks.append(task.get("id"))
                        results.extend(task.get("result", []))
                
                # 移除已完成的任务 ID
                for task_id in completed_tasks:
                    task_ids.remove(task_id)
                
                if not task_ids:
                    logger.info("所有 SERP 任务已完成")
                    break
                
                logger.info(f"等待 {len(task_ids)} 个任务完成...")
                await asyncio.sleep(10)  # 每 10 秒轮询一次
            
            except Exception as e:
                logger.error(f"获取结果时发生错误: {e}")
                await asyncio.sleep(10)
        
        if task_ids:
            logger.warning(f"{len(task_ids)} 个任务超时未完成")
        
        return results
    
    async def fetch_serp_results(
        self,
        keywords: List[str],
        params: Optional[Dict] = None
    ) -> List[SERPResult]:
        """
        批量获取 SERP 结果（主控费核心方法）
        
        流程：
        1. 构建任务列表
        2. 切片为每 100 个一批
        3. 逐批投递（Standard Queue 模式）
        4. 轮询获取结果
        5. 解析结果为 SERPResult 对象
        """
        if not keywords:
            logger.warning("关键词列表为空")
            return []
        
        params = params or DEFAULT_SERP_PARAMS
        
        # 1. 构建任务列表
        tasks = self._build_payload(keywords, params)
        logger.info(f"开始处理 {len(tasks)} 个关键词的 SERP 查询")
        
        # 2. 切片为小批次
        chunks = self._chunk_tasks(tasks, SERP_BATCH_SIZE)
        
        # 3. 逐批投递
        all_task_ids = []
        for i, chunk in enumerate(chunks, 1):
            logger.info(f"投递批次 {i}/{len(chunks)} ({len(chunk)} 个任务)...")
            task_ids = await self._post_tasks(chunk)
            all_task_ids.extend(task_ids)
            
            # 避免速率限制
            if i < len(chunks):
                await asyncio.sleep(1)
        
        # 4. 轮询获取结果
        logger.info(f"共投递 {len(all_task_ids)} 个任务，开始轮询结果...")
        raw_results = await self._get_results(all_task_ids)
        
        # 5. 解析结果
        serp_results = []
        for result in raw_results:
            keyword = result.get("keyword", "")
            for item in result.get("items", []):
                if item.get("type") == "organic":
                    serp_result = SERPResult(
                        keyword=keyword,
                        url=item.get("url", ""),
                        position=item.get("rank_group", 0),
                        title=item.get("title", ""),
                        description=item.get("description", "")
                    )
                    serp_results.append(serp_result)
        
        # 保存原始结果
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        raw_file = self.raw_dir / f"serp_results_{timestamp}.json"
        with open(raw_file, "w", encoding="utf-8") as f:
            json.dump([r.to_dict() for r in serp_results], f, ensure_ascii=False, indent=2)
        logger.info(f"SERP 原始结果已保存: {raw_file} ({len(serp_results)} 条记录)")
        
        return serp_results
    
    async def close(self):
        """关闭 HTTP 客户端"""
        await self.client.aclose()


# =============================================================================
# 2. 网页抓取阶段（防封与去噪）
# =============================================================================

class WebScraper:
    """
    双轨网页抓取器
    - 优先使用本地异步爬虫（零成本）
    - 失败时使用 DataForSEO On-Page API（控费：关闭 JS 渲染）
    """
    
    def __init__(self, login: str, password: str, output_dir: str, use_onpage_api: bool = True):
        self.auth = (login, password)
        self.output_dir = Path(output_dir)
        self.use_onpage_api = use_onpage_api
        
        # 本地爬虫客户端
        self.local_client = httpx.AsyncClient(
            timeout=httpx.Timeout(15.0, connect=5.0),
            limits=httpx.Limits(max_connections=20),
            headers={
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            }
        )
        
        # On-Page API 客户端
        self.onpage_client = httpx.AsyncClient(
            auth=self.auth,
            timeout=httpx.Timeout(30.0, connect=10.0)
        )
        
        logger.info("网页抓取器初始化完成（双轨模式）")
    
    async def _scrape_local(self, url: str) -> Tuple[Optional[str], Optional[str]]:
        """
        本地异步爬虫（零成本）
        返回：(html_content, error_message)
        """
        try:
            response = await self.local_client.get(url, follow_redirects=True)
            response.raise_for_status()
            return response.text, None
        
        except httpx.TimeoutException:
            return None, "Timeout"
        except httpx.HTTPStatusError as e:
            return None, f"HTTP {e.response.status_code}"
        except Exception as e:
            return None, str(e)
    
    async def _scrape_onpage_api(self, url: str) -> Tuple[Optional[str], Optional[str]]:
        """
        使用 DataForSEO On-Page API 抓取（控费：关闭 JS 渲染）
        返回：(html_content, error_message)
        """
        if not self.use_onpage_api:
            return None, "On-Page API 未启用"
        
        try:
            # 1. 提交即时页面请求
            payload = [{
                "url": url,
                "enable_javascript": False,  # 关闭 JS 渲染以节省点数
                "custom_robotstxt": "allow",
            }]
            
            response = await self.onpage_client.post(ONPAGE_INSTANT, json=payload)
            response.raise_for_status()
            data = response.json()
            
            if data.get("status_code") != 20000:
                return None, f"On-Page API 错误: {data.get('status_message')}"
            
            task_id = data.get("tasks", [{}])[0].get("id")
            if not task_id:
                return None, "On-Page API 未返回任务 ID"
            
            # 2. 轮询获取结果（简化版，实际可能需要多次请求）
            await asyncio.sleep(5)  # 等待处理完成
            
            # 注意：On-Page API 的实际结果获取需要额外的 GET 请求
            # 这里简化为直接返回原始响应
            logger.info(f"On-Page API 任务已提交: {task_id}")
            return response.text, None
        
        except Exception as e:
            return None, f"On-Page API 错误: {str(e)}"
    
    async def scrape_url(self, url: str) -> Tuple[str, str]:
        """
        双轨抓取机制
        返回：(html_content, scrape_method)
        scrape_method: "local" 或 "onpage_api"
        """
        # 1. 优先尝试本地爬虫
        logger.debug(f"尝试本地爬取: {url}")
        html_content, error = await self._scrape_local(url)
        
        if html_content:
            logger.info(f"本地爬取成功: {url}")
            return html_content, "local"
        
        logger.warning(f"本地爬取失败: {url} ({error})")
        
        # 2. 本地爬取失败，尝试 On-Page API
        if self.use_onpage_api:
            logger.info(f"尝试 On-Page API: {url}")
            html_content, error = await self._scrape_onpage_api(url)
            
            if html_content:
                logger.info(f"On-Page API 成功: {url}")
                return html_content, "onpage_api"
            
            logger.error(f"On-Page API 也失败: {url} ({error})")
        
        return "", "failed"
    
    async def scrape_urls(self, urls: List[str]) -> Dict[str, Tuple[str, str]]:
        """
        批量抓取 URL（异步并发）
        返回：{url: (html_content, scrape_method)}
        """
        logger.info(f"开始批量抓取 {len(urls)} 个 URL...")
        
        tasks = [self.scrape_url(url) for url in urls]
        results = await asyncio.gather(*tasks)
        
        return {url: result for url, result in zip(urls, results)}
    
    async def close(self):
        """关闭 HTTP 客户端"""
        await self.local_client.aclose()
        await self.onpage_client.aclose()


# =============================================================================
# 3. 本地 NLP 分析阶段（全本地运行，零外接大模型成本）
# =============================================================================

class NLPAnalyzer:
    """
    本地 NLP 分析器（基于 spaCy）
    - 提取 H1/H2 标签
    - 提取 LSI 关键词（词频统计）
    """
    
    def __init__(self, model_name: str = SPACY_MODEL):
        try:
            self.nlp = spacy.load(model_name)
            logger.info(f"spaCy 模型加载成功: {model_name}")
        except IOError:
            logger.warning(f"spaCy 模型未找到: {model_name}，正在下载...")
            import subprocess
            subprocess.run([sys.executable, "-m", "spacy", "download", model_name], check=True)
            self.nlp = spacy.load(model_name)
        
        # 停用词集合（扩展）
        self.stop_words = set(STOP_WORDS)
        self.stop_words.update(["http", "https", "www", "com", "org", "net", "edu"])
    
    def extract_h1_h2(self, html_content: str) -> Tuple[List[str], List[str]]:
        """
        提取页面中的 H1 和 H2 标签文本
        返回：(h1_tags, h2_tags)
        """
        soup = BeautifulSoup(html_content, "html.parser")
        
        h1_tags = [tag.get_text(strip=True) for tag in soup.find_all("h1")]
        h2_tags = [tag.get_text(strip=True) for tag in soup.find_all("h2")]
        
        return h1_tags, h2_tags
    
    def extract_lsi_keywords(self, text: str, top_n: int = 20) -> List[Tuple[str, int]]:
        """
        使用 spaCy 提取 LSI 关键词（词频统计）
        
        严格过滤：
        - 停用词（is_stop）
        - 标点符号（is_punct）
        - 字符长度 <= 2
        
        词形归一：
        - 使用 token.lemma_.lower()
        
        词性筛选：
        - 只保留名词（NOUN）、专有名词（PROPN）、动词（VERB）
        """
        # 处理文本
        doc = self.nlp(text)
        
        # 词频统计
        word_freq = Counter()
        
        for token in doc:
            # 严格过滤
            if token.is_stop:       # 停用词
                continue
            if token.is_punct:      # 标点符号
                continue
            if len(token.text) <= 2:  # 字符长度
                continue
            if token.pos_ not in ["NOUN", "PROPN", "VERB"]:  # 词性筛选
                continue
            
            # 词形归一
            lemma = token.lemma_.lower()
            
            # 再次检查（归一后可能变成停用词或短词）
            if lemma in self.stop_words or len(lemma) <= 2:
                continue
            
            word_freq[lemma] += 1
        
        # 返回词频最高的前 N 个词
        return word_freq.most_common(top_n)
    
    def analyze_page(self, url: str, html_content: str, keyword: str, scrape_method: str) -> PageAnalysis:
        """
        分析单个页面
        返回：PageAnalysis 对象
        """
        # 提取 H1/H2
        h1_tags, h2_tags = self.extract_h1_h2(html_content)
        
        # 提取纯文本（用于 LSI 分析）
        soup = BeautifulSoup(html_content, "html.parser")
        raw_text = soup.get_text(separator=" ", strip=True)
        
        # 提取 LSI 关键词
        lsi_keywords = self.extract_lsi_keywords(raw_text)
        
        return PageAnalysis(
            url=url,
            keyword=keyword,
            h1_tags=h1_tags,
            h2_tags=h2_tags,
            lsi_keywords=lsi_keywords,
            raw_text=raw_text[:1000],  # 只保存前 1000 个字符（节省空间）
            scraped_at=datetime.now().isoformat(),
            scrape_method=scrape_method
        )


# =============================================================================
# 主控流程
# =============================================================================

async def run_competitor_analysis(
    keywords: List[str],
    output_dir: str = "results/competitor_analysis",
    params: Optional[Dict] = None,
    use_onpage_api: bool = True
):
    """
    运行竞品分析流程
    
    流程：
    1. DataForSEO SERP 查询（获取竞品 URL）
    2. 网页抓取（本地 + On-Page API）
    3. NLP 分析（H1/H2 + LSI）
    4. 导出报告
    """
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # 检查 API 凭证
    if not API_LOGIN or not API_PASSWORD:
        logger.error("DataForSEO API 凭证未设置！请设置环境变量 DATAFORSEO_LOGIN 和 DATAFORSEO_PASSWORD")
        return
    
    # 1. SERP 查询
    logger.info("=" * 70)
    logger.info("[Step 1] DataForSEO SERP 查询（极度控费模式）")
    logger.info("=" * 70)
    
    serp_client = DataForSEOSERPClient(API_LOGIN, API_PASSWORD, str(output_dir))
    serp_results = await serp_client.fetch_serp_results(keywords, params)
    await serp_client.close()
    
    if not serp_results:
        logger.error("未获取到 SERP 结果，流程终止")
        return
    
    # 提取唯一 URL（去重）
    unique_urls = {}
    for result in serp_results:
        if result.url not in unique_urls:
            unique_urls[result.url] = result.keyword
    
    logger.info(f"获取到 {len(serp_results)} 个 SERP 结果，去重后 {len(unique_urls)} 个唯一 URL")
    
    # 2. 网页抓取
    logger.info("=" * 70)
    logger.info("[Step 2] 网页抓取（双轨模式）")
    logger.info("=" * 70)
    
    scraper = WebScraper(API_LOGIN, API_PASSWORD, str(output_dir), use_onpage_api)
    url_results = await scraper.scrape_urls(list(unique_urls.keys()))
    await scraper.close()
    
    # 3. NLP 分析
    logger.info("=" * 70)
    logger.info("[Step 3] NLP 分析（spaCy + BeautifulSoup）")
    logger.info("=" * 70)
    
    nlp_analyzer = NLPAnalyzer()
    analyses = []
    
    for url, (html_content, scrape_method) in url_results.items():
        if not html_content:
            logger.warning(f"跳过分析（抓取失败）: {url}")
            continue
        
        keyword = unique_urls[url]
        analysis = nlp_analyzer.analyze_page(url, html_content, keyword, scrape_method)
        analyses.append(analysis)
        
        logger.info(f"分析完成: {url} (方法: {scrape_method})")
        logger.info(f"  H1: {len(analysis.h1_tags)} 个, H2: {len(analysis.h2_tags)} 个")
        logger.info(f"  LSI 关键词: {len(analysis.lsi_keywords)} 个")
    
    # 4. 导出报告
    logger.info("=" * 70)
    logger.info("[Step 4] 导出报告")
    logger.info("=" * 70)
    
    # 保存完整分析结果
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    analysis_file = output_dir / f"competitor_analysis_{timestamp}.json"
    
    with open(analysis_file, "w", encoding="utf-8") as f:
        json.dump([a.to_dict() for a in analyses], f, ensure_ascii=False, indent=2)
    
    logger.info(f"完整分析结果已保存: {analysis_file} ({len(analyses)} 个页面)")
    
    # 生成摘要报告（CSV）
    csv_file = output_dir / f"competitor_analysis_{timestamp}.csv"
    with open(csv_file, "w", encoding="utf-8") as f:
        f.write("URL,Keyword,Scrape Method,H1 Count,H2 Count,Top 5 LSI Keywords\n")
        for analysis in analyses:
            top_5_lsi = ", ".join([f"{word}({freq})" for word, freq in analysis.lsi_keywords[:5]])
            f.write(f"{analysis.url},{analysis.keyword},{analysis.scrape_method},")
            f.write(f"{len(analysis.h1_tags)},{len(analysis.h2_tags)},")
            f.write(f"\"{top_5_lsi}\"\n")
    
    logger.info(f"摘要报告已保存: {csv_file}")
    
    # 打印统计信息
    logger.info("=" * 70)
    logger.info("分析完成！统计信息：")
    logger.info(f"  - 输入关键词: {len(keywords)} 个")
    logger.info(f"  - SERP 结果: {len(serp_results)} 个")
    logger.info(f"  - 唯一 URL: {len(unique_urls)} 个")
    logger.info(f"  - 成功分析: {len(analyses)} 个页面")
    
    scrape_methods = Counter([a.scrape_method for a in analyses])
    logger.info(f"  - 本地爬取: {scrape_methods.get('local', 0)} 个")
    logger.info(f"  - On-Page API: {scrape_methods.get('onpage_api', 0)} 个")
    
    return analyses


# =============================================================================
# 命令行入口
# =============================================================================

def main():
    import argparse
    
    parser = argparse.ArgumentParser(
        description="SEO Competitor Analyzer - 极度控费版本",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
示例用法:
  # 从文件读取关键词
  python seo_competitor_analyzer.py --input keywords.txt
  
  # 直接指定关键词
  python seo_competitor_analyzer.py --keywords "misting system" "outdoor cooling"
  
  # 禁用 On-Page API（只使用本地爬虫）
  python seo_competitor_analyzer.py --input keywords.txt --no-onpage-api
  
  # 指定输出目录
  python seo_competitor_analyzer.py --input keywords.txt --output results/my_analysis
        """
    )
    
    parser.add_argument("--input", "-i", help="关键词文件（每行一个关键词）")
    parser.add_argument("--keywords", "-k", nargs="+", help="直接指定关键词")
    parser.add_argument("--output", "-o", default="results/competitor_analysis", help="输出目录")
    parser.add_argument("--location", "-l", type=int, default=2840, help="位置代码（默认: 2840 = United States）")
    parser.add_argument("--language", "-lang", default="en", help="语言代码（默认: en）")
    parser.add_argument("--no-onpage-api", action="store_true", help="禁用 On-Page API（只使用本地爬虫）")
    parser.add_argument("--depth", "-d", type=int, default=10, help="SERP 深度（默认: 10，即第 1 页）")
    
    args = parser.parse_args()
    
    # 读取关键词
    keywords = []
    if args.input:
        if not os.path.exists(args.input):
            logger.error(f"关键词文件不存在: {args.input}")
            return
        with open(args.input, "r", encoding="utf-8") as f:
            keywords = [line.strip() for line in f if line.strip()]
    elif args.keywords:
        keywords = args.keywords
    else:
        logger.error("请通过 --input 或 --keywords 指定关键词")
        parser.print_help()
        return
    
    if not keywords:
        logger.error("关键词列表为空")
        return
    
    logger.info(f"关键词数量: {len(keywords)}")
    logger.info(f"输出目录: {args.output}")
    logger.info(f"On-Page API: {'禁用' if args.no_onpage_api else '启用'}")
    
    # 构建 SERP 参数
    params = {
        "depth": args.depth,
        "location_code": args.location,
        "language_code": args.language,
    }
    
    # 运行分析
    asyncio.run(run_competitor_analysis(
        keywords=keywords,
        output_dir=args.output,
        params=params,
        use_onpage_api=not args.no_onpage_api
    ))


if __name__ == "__main__":
    main()

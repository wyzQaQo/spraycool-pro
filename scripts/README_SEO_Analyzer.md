# SEO Competitor Analyzer - 使用文档

## 功能概述

这是一个**极度控费**的 SEO 竞品分析工具，通过三阶段流程自动分析竞争对手的页面结构：

1. **DataForSEO SERP 查询**（控费核心）
   - 批量获取关键词的搜索结果
   - 严格限制 `depth=10`（只买第 1 页）
   - 禁用所有附加参数（避免翻倍计费）
   - 自动切片为每 100 个任务一批（避免 40006 错误）

2. **双轨网页抓取**
   - 优先使用本地异步爬虫（**零成本**）
   - 失败时使用 DataForSEO On-Page API（关闭 JS 渲染以节省点数）

3. **本地 NLP 分析**（**零外接成本**）
   - 提取 H1/H2 标签
   - 使用 spaCy 提取 LSI 关键词（词频统计）

## 成本估算

| 阶段 | 成本 | 说明 |
|------|------|------|
| SERP 查询 | $0.0006/关键词 | 只买第 1 页数据 |
| 本地抓取 | $0 | 零成本 |
| On-Page API | 约 $0.001/页面 | 仅本地爬取失败时使用 |
| NLP 分析 | $0 | 全本地运行 |

**示例**：分析 100 个关键词，每个关键词 10 个结果 = 1000 个 URL
- 最坏情况：所有 URL 都需要 On-Page API = $1.00
- 理想情况：所有 URL 都本地爬取成功 = $0.06（仅 SERP 成本）

## 安装依赖

```bash
# 创建虚拟环境（推荐）
python -m venv venv
source venv/bin/activate  # Linux/Mac
# 或
venv\Scripts\activate  # Windows

# 安装依赖
pip install -r requirements_seo_analyzer.txt
```

## 配置 API 凭证

1. 复制模板文件：
   ```bash
   cp .env.template .env
   ```

2. 编辑 `.env` 文件，填入您的 DataForSEO API 凭证：
   ```
   DATAFORSEO_LOGIN=your_login_here
   DATAFORSEO_PASSWORD=your_password_here
   ```

## 使用方法

### 1. 准备关键词文件

创建一个文本文件（如 `keywords.txt`），每行一个关键词：

```
misting system
outdoor cooling system
patio misting
restaurant cooling
hotel outdoor cooling
```

### 2. 运行脚本

#### 基本用法

```bash
# 从文件读取关键词
python seo_competitor_analyzer.py --input keywords.txt

# 直接指定关键词
python seo_competitor_analyzer.py --keywords "misting system" "outdoor cooling"
```

#### 高级选项

```bash
# 指定输出目录
python seo_competitor_analyzer.py --input keywords.txt --output results/my_analysis

# 禁用 On-Page API（只使用本地爬虫）
python seo_competitor_analyzer.py --input keywords.txt --no-onpage-api

# 指定位置和语言
python seo_competitor_analyzer.py --input keywords.txt --location 2840 --language en

# 调整 SERP 深度（默认 10 = 第 1 页）
python seo_competitor_analyzer.py --input keywords.txt --depth 10
```

### 3. 查看结果

脚本会在输出目录生成以下文件：

```
results/competitor_analysis/
├── competitior_analysis_20260608_023000.json  # 完整分析结果（JSON）
├── competitior_analysis_20260608_023000.csv   # 摘要报告（CSV）
└── raw/
    └── serp/
        └── serp_results_20260608_023000.json  # 原始 SERP 数据
```

#### JSON 结果格式

```json
[
  {
    "url": "https://example.com/misting-system",
    "keyword": "misting system",
    "h1_tags": ["Outdoor Misting Systems", "Cooling Solutions"],
    "h2_tags": ["How It Works", "Benefits", "Installation"],
    "lsi_keywords": [
      ["cooling", 15],
      ["outdoor", 12],
      ["system", 10],
      ...
    ],
    "raw_text": "...",  // 前 1000 个字符
    "scraped_at": "2026-06-08T02:30:00",
    "scrape_method": "local"  // 或 "onpage_api"
  }
]
```

#### CSV 报告格式

| URL | Keyword | Scrape Method | H1 Count | H2 Count | Top 5 LSI Keywords |
|-----|----------|---------------|-----------|-----------|---------------------|
| ... | ... | local | 2 | 15 | cooling(15), outdoor(12), ... |

## 控费特性

### 1. SERP 查询阶段

- ✅ **严格限制 depth=10**：只获取第 1 页数据（10 个结果）
- ✅ **禁用所有附加参数**：
  - 不设置 `load_async_overview`
  - 不设置 `calculate_rectangles`
  - 不设置 `people_also_ask_click_depth`
  - 不使用高级搜索指令（如 `site:`）
- ✅ **自动切片**：每 100 个任务一批（避免 40006 错误）
- ✅ **使用 Standard Queue 模式**：比 Live 模式便宜

### 2. 网页抓取阶段

- ✅ **优先本地爬虫**：零成本
- ✅ **On-Page API 控费**：
  - 设置 `"enable_javascript": false`（关闭 JS 渲染）
  - 只用于本地爬取失败的 URL

### 3. NLP 分析阶段

- ✅ **全本地运行**：零外接成本
- ✅ **使用 spaCy**：开源 NLP 库

## 代码结构

```
seo_competitor_analyzer.py
│
├─ 数据模型
│  ├─ SERPResult       # SERP 查询结果
│  └─ PageAnalysis     # 页面分析结果
│
├─ DataForSEOSERPClient  # DataForSEO SERP API 客户端
│  ├─ _build_payload()    # 构建请求负载（严格控费）
│  ├─ _chunk_tasks()      # 任务切片（避免 40006 错误）
│  ├─ _post_tasks()       # 投递任务
│  ├─ _get_results()      # 获取结果（轮询）
│  └─ fetch_serp_results() # 主控方法
│
├─ WebScraper            # 双轨网页抓取器
│  ├─ _scrape_local()     # 本地异步爬虫（零成本）
│  ├─ _scrape_onpage_api() # On-Page API（控费）
│  ├─ scrape_url()        # 单 URL 抓取
│  └─ scrape_urls()       # 批量抓取
│
├─ NLPAnalyzer          # 本地 NLP 分析器
│  ├─ extract_h1_h2()    # 提取 H1/H2 标签
│  ├─ extract_lsi_keywords() # 提取 LSI 关键词
│  └─ analyze_page()     # 分析单个页面
│
└─ run_competitor_analysis() # 主控流程
```

## 故障排查

### 1. "DataForSEO API 凭证未设置"

**解决方法**：创建 `.env` 文件并填入正确的 API 凭证。

### 2. "SERP 任务投递失败"

**可能原因**：
- API 凭证错误
- API credits 不足
- 请求格式错误

**解决方法**：
- 检查 `.env` 文件
- 前往 DataForSEO 面板检查 credits 余额
- 查看日志中的详细错误信息

### 3. "本地爬取失败"

**可能原因**：
- 目标网站有强力防爬（如 Cloudflare）
- 网络连接问题
- 目标网站阻止了爬虫 User-Agent

**解决方法**：
- 脚本会自动尝试 On-Page API
- 如果 On-Page API 也失败，检查目标网站是否可访问

### 4. "spaCy 模型未找到"

**解决方法**：脚本会自动下载模型，或手动运行：
```bash
python -m spacy download en_core_web_sm
```

## 高级用法

### 1. 自定义 SERP 参数

编辑脚本中的 `DEFAULT_SERP_PARAMS` 字典：

```python
DEFAULT_SERP_PARAMS = {
    "depth": 10,           # 只获取第 1 页
    "location_code": 2840,  # United States
    "language_code": "en",
}
```

### 2. 调整 LSI 关键词数量

编辑 `extract_lsi_keywords()` 方法的 `top_n` 参数：

```python
lsi_keywords = self.extract_lsi_keywords(raw_text, top_n=50)  # 提取前 50 个
```

### 3. 扩展停用词列表

编辑 `NLPAnalyzer.__init__()` 方法：

```python
self.stop_words.update(["http", "https", "www", "com", "org", "net", "edu", "your_word"])
```

## 性能优化

### 1. 并发控制

脚本使用 `httpx.AsyncClient` 进行异步并发，默认最大连接数为：
- SERP 客户端：10
- 本地爬虫：20

可根据网络情况调整。

### 2. 批处理大小

SERP 任务批处理大小默认为 100（DataForSEO 限制），可通过修改 `SERP_BATCH_SIZE` 常量调整。

## 许可证

MIT License

## 联系方式

如有问题或建议，请联系 MistGuard Pro SEO Team。

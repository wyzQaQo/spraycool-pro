#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
MistGuard Pro — SEO Content Automation Pipeline
================================================
v2.0 - 保存所有 API 原始数据和详细字段

完整7步流水线：
  1. Keyword Data API  → 扩词（保存完整响应）
  2. Labs API          → 筛低竞争词（保存完整响应）
  3. SERP API          → 意图分析（保存完整响应）
  4. 抓取 + Python NLP → 提取 H1/H2/LSI
  5. 规则引擎          → 生成 E-E-A-T 大纲
  6. 代码生成器        → 输出 Next.js 页面代码
  7. CSV 报告          → 输出报告 + 完整数据 JSON

数据保存策略：
  - results/seo_automation/raw/{dimension}/{location}/{timestamp}_{endpoint}.json  → 原始 API 响应
  - results/seo_automation/processed/{dimension}/{location}/keywords_full.json  → 完整字段关键词数据
  - results/seo_automation/outlines/{slug}.json  → 大纲（含所有 LSI/SERP 数据）
  - results/seo_automation/serp/{dimension}/{keyword_hash}.json  → SERP 完整数据
"""

import os
import sys
import json
import time
import base64
import hashlib
import re
import csv
from datetime import datetime
from collections import Counter
from urllib.parse import urlparse
from pathlib import Path
import requests

# =============================================================================
# CONFIG
# =============================================================================

API_LOGIN = "so@luckywyz.com"
API_PASSWORD = "3aea72cdd70c3f58"
API_BASE = "https://api.dataforseo.com/v3"

LOCATIONS = [
    {"name": "United States", "code": 2840},
    {"name": "United Arab Emirates", "code": 2784},
    {"name": "Saudi Arabia", "code": 2682},
    {"name": "United Kingdom", "code": 2826},
    {"name": "Australia", "code": 2036},
]
LANGUAGE = "en"

EEAT_CONFIG = {
    "company_name": "MistGuard Pro",
    "founded_year": 2015,
    "factory_location": "Guangdong, China",
    "certifications": ["ISO 9001", "CE", "RoHS", "UL"],
    "years_experience": 9,
    "projects_completed": 3200,
    "countries_served": 45,
}

SEED_KEYWORDS = {
    "product": {
        "priority": 1,
        "page_type": "product_detail",
        "seeds": [
            "misting system", "fogging system", "high pressure misting system",
            "outdoor misting system", "cooling mist system", "mosquito misting system",
            "dust suppression system", "commercial misting system",
            "industrial misting system", "portable misting system",
            "automatic misting system", "stainless steel misting system",
        ]
    },
    "application_hotel": {
        "priority": 1,
        "page_type": "application",
        "seeds": [
            "hotel cooling system", "hotel patio cooling", "hotel outdoor cooling",
            "resort cooling system", "resort misting system",
            "beach resort cooling", "outdoor resort cooling",
            "beach bar cooling system", "beach club misting system",
        ]
    },
    "application_restaurant": {
        "priority": 1,
        "page_type": "application",
        "seeds": [
            "restaurant cooling system", "restaurant patio misting",
            "outdoor dining cooling", "restaurant outdoor cooling",
        ]
    },
    "application_residential": {
        "priority": 2,
        "page_type": "application",
        "seeds": [
            "backyard misting system", "patio misting system",
            "garden cooling system", "residential misting system",
            "home outdoor cooling",
        ]
    },
    "application_agriculture": {
        "priority": 2,
        "page_type": "application",
        "seeds": [
            "livestock cooling system", "poultry cooling system",
            "barn misting system", "greenhouse misting system",
            "dairy farm cooling",
        ]
    },
    "application_industrial": {
        "priority": 2,
        "page_type": "application",
        "seeds": [
            "construction dust suppression", "dust control misting system",
            "industrial dust suppression", "warehouse cooling system",
            "factory cooling system",
        ]
    },
    "problem": {
        "priority": 1,
        "page_type": "problem",
        "seeds": [
            "how to cool outdoor patio", "how to cool outdoor restaurant",
            "how to keep guests comfortable in summer",
            "how to reduce dust on construction site",
            "how to control mosquitoes outdoors",
            "how to cool livestock barn",
            "how to cool a hotel terrace in summer",
        ]
    },
    "location_us": {
        "priority": 2,
        "page_type": "location",
        "seeds": [
            "outdoor cooling system texas", "outdoor cooling system arizona",
            "outdoor cooling system florida",
            "restaurant cooling system texas", "hotel cooling system arizona",
            "resort cooling system florida",
        ]
    },
    "location_gulf": {
        "priority": 2,
        "page_type": "location",
        "seeds": [
            "outdoor cooling system dubai", "outdoor cooling system saudi arabia",
            "outdoor cooling system abu dhabi",
            "restaurant cooling system dubai", "hotel cooling system saudi arabia",
        ]
    },
    "industry": {
        "priority": 2,
        "page_type": "industry",
        "seeds": [
            "hospitality cooling solutions", "resort climate control",
            "outdoor comfort solutions", "commercial cooling solutions",
            "venue cooling systems", "outdoor venue cooling",
        ]
    },
    "accessory": {
        "priority": 3,
        "page_type": "product_detail",
        "seeds": [
            "misting nozzle", "fog nozzle", "misting pump",
            "misting filter", "misting tubing",
            "stainless steel misting nozzle", "high pressure misting pump",
            "misting system accessories",
        ]
    },
    "sports_events": {
        "priority": 2,
        "page_type": "application",
        "seeds": [
            "golf course cooling system", "golf driving range misting",
            "stadium cooling system", "outdoor event cooling",
            "sports venue cooling",
        ]
    },
}


# =============================================================================
# DATAFORSEO API CLIENT (v2.0 - 保存完整原始响应)
# =============================================================================

class DataForSEOClient:
    def __init__(self, login, password, output_dir, dimension, location_name):
        self.auth = (login, password)
        self.base = "https://api.dataforseo.com/v3"
        self.output_dir = output_dir
        self.dimension = dimension
        self.location_name = location_name
        # 创建原始数据保存目录
        self.raw_dir = os.path.join(output_dir, "raw", dimension, location_name.replace(" ", "_"))
        self.processed_dir = os.path.join(output_dir, "processed", dimension, location_name.replace(" ", "_"))
        os.makedirs(self.raw_dir, exist_ok=True)
        os.makedirs(self.processed_dir, exist_ok=True)
        os.makedirs(os.path.join(output_dir, "serp"), exist_ok=True)
        os.makedirs(os.path.join(output_dir, "outlines"), exist_ok=True)

    def _save_raw_response(self, endpoint, payload, response, batch_id=""):
        """保存完整原始 API 响应到 JSON 文件"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        safe_endpoint = endpoint.replace("/", "_").strip("_")
        filename = f"{timestamp}_{safe_endpoint}{batch_id}.json"
        filepath = os.path.join(self.raw_dir, filename)
        data_to_save = {
            "endpoint": endpoint,
            "request_payload": payload,
            "response": response,
            "saved_at": datetime.now().isoformat(),
            "dimension": self.dimension,
            "location": self.location_name,
        }
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data_to_save, f, ensure_ascii=False, indent=2)
        print(f"    . 原始响应已保存: {filename}")
        return filepath

    def post(self, endpoint, payload):
        url = self.base + endpoint
        resp = requests.post(url, auth=self.auth, json=payload, timeout=60)
        resp.raise_for_status()
        return resp.json()

    def get(self, endpoint):
        url = self.base + endpoint
        resp = requests.get(url, auth=self.auth, timeout=60)
        resp.raise_for_status()
        return resp.json()

    def keywords_for_keywords(self, keywords, location_code, language="en", method="live"):
        """
        批量获取关键词数据
        method: "live" = 即时返回（限制 12 请求/分钟）
                 "standard" = POST → GET 两步（便宜，有排队延迟）
        """
        # 分批：每批最多 1000 个关键词（API 限制）
        batch_size = 1000
        all_results = []
        
        for i in range(0, len(keywords), batch_size):
            batch = keywords[i:i+batch_size]
            print(f"    批次 {i//batch_size + 1}: {len(batch)} 个关键词 (方法: {method})")
            
            if method == "standard":
                # Standard 方法：POST → GET 两步
                results = self._keywords_for_keywords_standard(batch, location_code, language)
            else:
                # Live 方法：即时返回（默认）
                results = self._keywords_for_keywords_live(batch, location_code, language)
            
            all_results.extend(results)
            # Live 方法限制：12 请求/分钟
            if method == "live" and i + batch_size < len(keywords):
                print(f"    等待 5 秒（Live 方法限制）...")
                time.sleep(5)
        
        return all_results

    def _keywords_for_keywords_live(self, keywords, location_code, language="en"):
        """Live 方法：即时返回"""
        payload = [{
            "keywords": keywords,
            "location_code": location_code,
            "language_code": language,
            "include_serp_info": True,
            "limit": 100,
        }]
        data = self.post("/keywords_data/google/keywords_for_keywords/live", payload)
        # 保存完整原始响应
        self._save_raw_response("/keywords_data/google/keywords_for_keywords/live", payload, data)

        results = []
        for task in data.get("tasks", []):
            status_code = task.get("status_code", 0)
            if status_code != 20000:
                print(f"    ! API 任务状态异常: status_code={status_code}, {task.get('status_message', '')}")
                continue
            for item in task.get("result", []):
                # 保存 API 返回的所有字段（不挑拣）
                results.append({
                    # 核心字段
                    "keyword": item.get("keyword", ""),
                    "location_code": item.get("location_code", location_code),
                    "language_code": item.get("language_code", language),
                    # 搜索量相关（完整字段）
                    "search_volume": item.get("search_volume"),
                    # competition 字段（API 返回的是字符串如 "LOW"/"MEDIUM"/"HIGH"，competition_index 是 0-100 的数值）
                    "competition": item.get("competition", ""),
                    "competition_index": item.get("competition_index"),
                    "cpc": item.get("cpc"),
                    "min_cpc": item.get("min_cpc"),
                    "max_cpc": item.get("max_cpc"),
                    "high_top_of_page_bid": item.get("high_top_of_page_bid"),
                    "low_top_of_page_bid": item.get("low_top_of_page_bid"),
                    # monthly_searches 完整数据
                    "monthly_searches": item.get("monthly_searches", []),
                    # SERP 信息
                    "seo_difficulty": item.get("seo_difficulty"),
                    "organic_etv": item.get("organic_etv"),
                    "paid_etv": item.get("paid_etv"),
                    "organic_result_count": item.get("organic_result_count"),
                    "categories": item.get("categories", []),
                    # 完整原始 item（兜底，确保不丢失任何字段）
                    "_raw_item": item,
                })
        return results

    def _keywords_for_keywords_standard(self, keywords, location_code, language="en"):
        """Standard 方法：POST → GET 两步（便宜，有排队延迟）"""
        # Step 1: POST 提交任务
        payload = [{
            "keywords": keywords,
            "location_code": location_code,
            "language_code": language,
            "include_serp_info": True,
            "limit": 100,
        }]
        post_data = self.post("/keywords_data/google/keywords_for_keywords/task_post", payload)
        self._save_raw_response("/keywords_data/google/keywords_for_keywords/task_post", payload, post_data, batch_id="_post")
        
        # 提取 task_id
        task_ids = []
        for task in post_data.get("tasks", []):
            if task.get("status_code") == 20100:
                task_ids.append(task["id"])
        
        if not task_ids:
            print(f"    ! Standard 方法 POST 失败: {post_data}")
            return []
        
        print(f"    Standard 方法：任务已提交，等待结果（task_ids: {task_ids[:3]}...）")
        
        # Step 2: GET 获取结果（等待排队）
        max_wait = 300  # 最多等待 5 分钟
        waited = 0
        all_results = []
        
        while waited < max_wait and task_ids:
            time.sleep(10)  # 每 10 秒检查一次
            waited += 10
            print(f"    等待中... {waited}s")
            
            # 检查每个 task_id
            completed_ids = []
            for task_id in task_ids:
                try:
                    get_data = self.get(f"/keywords_data/google/keywords_for_keywords/task_get/{task_id}")
                    self._save_raw_response("/keywords_data/google/keywords_for_keywords/task_get", {}, get_data, batch_id=f"_{task_id[:8]}")
                    
                    for task in get_data.get("tasks", []):
                        status_code = task.get("status_code", 0)
                        if status_code == 20000:  # 完成
                            completed_ids.append(task_id)
                            # 提取结果
                            for item in task.get("result", []):
                                all_results.append({
                                    "keyword": item.get("keyword", ""),
                                    "location_code": item.get("location_code", location_code),
                                    "language_code": item.get("language_code", language),
                                    "search_volume": item.get("search_volume"),
                                    "competition": item.get("competition", ""),
                                    "competition_index": item.get("competition_index"),
                                    "cpc": item.get("cpc"),
                                    "min_cpc": item.get("min_cpc"),
                                    "max_cpc": item.get("max_cpc"),
                                    "monthly_searches": item.get("monthly_searches", []),
                                    "seo_difficulty": item.get("seo_difficulty"),
                                    "organic_etv": item.get("organic_etv"),
                                    "paid_etv": item.get("paid_etv"),
                                    "organic_result_count": item.get("organic_result_count"),
                                    "categories": item.get("categories", []),
                                    "_raw_item": item,
                                })
                        elif status_code >= 40000:  # 错误
                            completed_ids.append(task_id)
                            print(f"    ! 任务 {task_id} 失败: {task.get('status_message', '')}")
                except Exception as e:
                    print(f"    ! 检查任务 {task_id} 时出错: {e}")
            
            # 移除已完成的任务
            for tid in completed_ids:
                if tid in task_ids:
                    task_ids.remove(tid)
        
        if task_ids:
            print(f"    ! 警告：{len(task_ids)} 个任务超时未完成")
        
        print(f"    Standard 方法：获得 {len(all_results)} 个结果")
        return all_results

    def bulk_keyword_difficulty(self, keywords, location_code, language="en", method="live"):
        """
        批量查询关键词难度（KD）
        method: "live" = 即时返回（限制 12 请求/分钟）
                 "standard" = POST → GET 两步（便宜，有排队延迟）
        """
        # 分批：每批最多 1000 个关键词（API 限制）
        batch_size = 1000
        all_difficulty_map = {}
        all_full_data = []
        
        for i in range(0, len(keywords), batch_size):
            batch = keywords[i:i+batch_size]
            print(f"    批次 {i//batch_size + 1}: {len(batch)} 个关键词 (方法: {method})")
            
            if method == "standard":
                # Standard 方法：POST → GET 两步
                difficulty_map, full_data = self._bulk_keyword_difficulty_standard(
                    batch, location_code, language
                )
            else:
                # Live 方法：即时返回（默认）
                difficulty_map, full_data = self._bulk_keyword_difficulty_live(
                    batch, location_code, language
                )
            
            all_difficulty_map.update(difficulty_map)
            all_full_data.extend(full_data)
            
            # Live 方法限制：12 请求/分钟
            if method == "live" and i + batch_size < len(keywords):
                print(f"    等待 5 秒（Live 方法限制）...")
                time.sleep(5)
        
        # 保存完整 difficulty 数据
        difficulty_file = os.path.join(
            self.processed_dir, 
            f"keyword_difficulty_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        )
        with open(difficulty_file, "w", encoding="utf-8") as f:
            json.dump(all_full_data, f, ensure_ascii=False, indent=2)
        print(f"    . Difficulty 完整数据已保存: {os.path.basename(difficulty_file)} ({len(all_full_data)} 个词)")
        
        return all_difficulty_map

    def _bulk_keyword_difficulty_live(self, keywords, location_code, language="en"):
        """Live 方法：即时返回"""
        payload = [{
            "keywords": keywords,
            "location_code": location_code,
            "language_code": language,
        }]
        data = self.post("/dataforseo_labs/google/bulk_keyword_difficulty/live", payload)
        self._save_raw_response("/dataforseo_labs/google/bulk_keyword_difficulty/live", payload, data)

        difficulty_map = {}
        full_data = []
        for task in data.get("tasks", []):
            for result in task.get("result", []):
                for item in result.get("items", []):
                    kd = item.get("keyword_difficulty", 100)
                    keyword = item.get("keyword", "")
                    difficulty_map[keyword] = kd
                    full_data.append({
                        "keyword": keyword,
                        "keyword_difficulty": kd,
                        "location_code": item.get("location_code"),
                        "language_code": item.get("language_code"),
                        "_raw_item": item,
                    })
        return difficulty_map, full_data

    def _bulk_keyword_difficulty_standard(self, keywords, location_code, language="en"):
        """Standard 方法：POST → GET 两步（便宜，有排队延迟）"""
        # Step 1: POST 提交任务
        payload = [{
            "keywords": keywords,
            "location_code": location_code,
            "language_code": language,
        }]
        post_data = self.post("/dataforseo_labs/google/bulk_keyword_difficulty/task_post", payload)
        self._save_raw_response("/dataforseo_labs/google/bulk_keyword_difficulty/task_post", payload, post_data, batch_id="_post")
        
        # 提取 task_id
        task_ids = []
        for task in post_data.get("tasks", []):
            if task.get("status_code") == 20100:
                task_ids.append(task["id"])
        
        if not task_ids:
            print(f"    ! Standard 方法 POST 失败: {post_data}")
            return {}, []
        
        print(f"    Standard 方法：任务已提交，等待结果（{len(task_ids)} 个任务）")
        
        # Step 2: GET 获取结果（等待排队）
        max_wait = 300  # 最多等待 5 分钟
        waited = 0
        all_difficulty_map = {}
        all_full_data = []
        
        while waited < max_wait and task_ids:
            time.sleep(10)  # 每 10 秒检查一次
            waited += 10
            print(f"    等待中... {waited}s")
            
            # 检查每个 task_id
            completed_ids = []
            for task_id in task_ids:
                try:
                    get_data = self.get(f"/dataforseo_labs/google/bulk_keyword_difficulty/task_get/{task_id}")
                    self._save_raw_response(
                        "/dataforseo_labs/google/bulk_keyword_difficulty/task_get", 
                        {}, 
                        get_data, 
                        batch_id=f"_{task_id[:8]}"
                    )
                    
                    for task in get_data.get("tasks", []):
                        status_code = task.get("status_code", 0)
                        if status_code == 20000:  # 完成
                            completed_ids.append(task_id)
                            # 提取结果
                            for result in task.get("result", []):
                                for item in result.get("items", []):
                                    kd = item.get("keyword_difficulty", 100)
                                    keyword = item.get("keyword", "")
                                    all_difficulty_map[keyword] = kd
                                    all_full_data.append({
                                        "keyword": keyword,
                                        "keyword_difficulty": kd,
                                        "location_code": item.get("location_code"),
                                        "language_code": item.get("language_code"),
                                        "_raw_item": item,
                                    })
                        elif status_code >= 40000:  # 错误
                            completed_ids.append(task_id)
                            print(f"    ! 任务 {task_id} 失败: {task.get('status_message', '')}")
                except Exception as e:
                    print(f"    ! 检查任务 {task_id} 时出错: {e}")
            
            # 移除已完成的任务
            for tid in completed_ids:
                if tid in task_ids:
                    task_ids.remove(tid)
        
        if task_ids:
            print(f"    ! 警告：{len(task_ids)} 个任务超时未完成")
        
        print(f"    Standard 方法：获得 {len(all_difficulty_map)} 个结果")
        return all_difficulty_map, all_full_data

    def serp_organic(self, keyword, location_code, language="en", depth=10):
        """返回完整 SERP 数据（含所有 SERP 特征）"""
        task_id = "serp_" + hashlib.md5((keyword + str(location_code)).encode()).hexdigest()[:12]
        payload = [{
            "keyword": keyword,
            "location_code": location_code,
            "language_code": language,
            "device": "desktop",
            "os": "windows",
            "depth": depth,
            "tag": task_id,
        }]
        post_data = self.post("/serp/google/organic/task_post", payload)
        self._save_raw_response("/serp/google/organic/task_post", payload, post_data, batch_id="_post")

        task_ids = []
        for task in post_data.get("tasks", []):
            if task.get("status_code") == 20100:
                task_ids.append(task["id"])

        if not task_ids:
            return {}

        max_wait = 120
        waited = 0
        while waited < max_wait:
            time.sleep(3)
            waited += 3
            get_data = self.get("/serp/google/organic/task_get/regular/" + task_ids[0])
            for task in get_data.get("tasks", []):
                status = task.get("status_code", 0)
                if status == 20000:
                    # 保存完整 SERP 原始响应
                    serp_dir = os.path.join(self.output_dir, "serp", self.dimension)
                    os.makedirs(serp_dir, exist_ok=True)
                    serp_file = os.path.join(serp_dir, f"{task_id}.json")
                    with open(serp_file, "w", encoding="utf-8") as f:
                        json.dump({
                            "keyword": keyword,
                            "location_code": location_code,
                            "full_response": get_data,
                        }, f, ensure_ascii=False, indent=2)
                    print(f"    . SERP 完整数据已保存: {os.path.basename(serp_file)}")

                    items = {"organic": [], "related_searches": [], "people_also_ask": [], "full_result": {}}
                    for result in task.get("result", []):
                        items["full_result"] = result  # 保存完整 result
                        all_items = result.get("items", {})
                        # organic 完整数据
                        for item in all_items.get("organic", []):
                            items["organic"].append({
                                "rank": item.get("rank_group", 0),
                                "rank_absolute": item.get("rank_absolute", 0),
                                "title": item.get("title", ""),
                                "url": item.get("url", ""),
                                "domain": item.get("domain", ""),
                                "description": item.get("description", ""),
                                "breadcrumb": item.get("breadcrumb", ""),
                                "is_featured_snippet": item.get("is_featured_snippet", False),
                                "is_image_pack": item.get("is_image_pack", False),
                                "is_video": item.get("is_video", False),
                                "links": item.get("links", []),
                                "main_domain": item.get("main_domain", ""),
                                "_raw_item": item,
                            })
                        items["related_searches"] = [r.get("keyword", "") if isinstance(r, dict) else str(r) for r in all_items.get("related_searches", [])]
                        paa_raw = all_items.get("people_also_ask", [])
                        items["people_also_ask"] = [{"question": q.get("question", ""), "answer": q.get("answer", ""), "_raw": q} for q in paa_raw if isinstance(q, dict)]
                        # 保存所有 SERP 特征类型
                        for key in all_items:
                            if key not in ["organic", "related_searches", "people_also_ask"]:
                                items[key] = all_items[key]
                    return items
                elif status >= 40000:
                    return {}
        return {}


# =============================================================================
# STEP 1 & 2: 扩词 + 筛词（保存完整字段）
# =============================================================================

def expand_and_filter(client, seeds, location, min_volume=50, max_kd=40, method="live"):
    """
    批量扩词 + 筛词
    method: "live" = 即时返回（限制 12 请求/分钟）
             "standard" = POST → GET 两步（便宜，有排队延迟）
    """
    print(f"\n[Step 1/2] 扩词 + 筛词: {location['name']} (方法: {method}")
    
    # 批量提交：一次性提交所有种子关键词（最多 1000 个）
    print(f"  批量提交 {len(seeds)} 个种子关键词...")
    all_keywords = client.keywords_for_keywords(
        seeds, location["code"], LANGUAGE, method=method
    )
    print(f"  共获得 {len(all_keywords)} 个相关词")

    # 保存完整关键词数据（含所有字段）
    full_data_file = os.path.join(client.processed_dir, "keywords_full.json")
    with open(full_data_file, "w", encoding="utf-8") as f:
        json.dump(all_keywords, f, ensure_ascii=False, indent=2)
    print(f"  . 完整关键词数据已保存: keywords_full.json ({len(all_keywords)} 个词)")

    filtered = [r for r in all_keywords if r.get("search_volume") and r["search_volume"] >= min_volume]
    print(f"  过滤后(搜索量>={min_volume}): {len(filtered)} 个")

    if not filtered:
        return []

    print(f"  查询关键词难度(KD)...")
    keywords_list = [r["keyword"] for r in filtered]
    difficulty_map = client.bulk_keyword_difficulty(keywords_list, location["code"], LANGUAGE)

    for r in filtered:
        r["kd"] = difficulty_map.get(r["keyword"], 100)
        # 同步更新完整数据文件中的 kd 字段
        for full_r in all_keywords:
            if full_r["keyword"] == r["keyword"]:
                full_r["kd"] = r["kd"]
                break

    # 重新保存含 KD 的完整数据
    full_data_file2 = os.path.join(client.processed_dir, "keywords_full_with_kd.json")
    with open(full_data_file2, "w", encoding="utf-8") as f:
        json.dump(all_keywords, f, ensure_ascii=False, indent=2)
    print(f"  . 含 KD 完整数据已保存: keywords_full_with_kd.json")

    target = [r for r in filtered if r["kd"] <= max_kd]
    target.sort(key=lambda x: (x.get("search_volume") or 0), reverse=True)
    print(f"  KD<={max_kd} 的目标词: {len(target)} 个")
    for r in target[:10]:
        sv = r.get('search_volume', 0) or 0
        kd = r.get('kd', 100)
        cpc = r.get('cpc', 0) or 0
        comp = r.get('competition', 'N/A')
        print(f"    - {r['keyword']}: SV={sv}, KD={kd}, CPC=${cpc}, Competition={comp}")
    return target


# =============================================================================
# STEP 3: 意图分析
# =============================================================================

def analyze_intent(serp_data):
    organic = serp_data.get("organic", [])
    titles = [item["title"] for item in organic if item.get("title")]
    patterns = {
        "how_to": sum(1 for t in titles if re.search(r'\bhow to\b', t, re.I)),
        "best": sum(1 for t in titles if re.search(r'\bbest\b', t, re.I)),
        "what_is": sum(1 for t in titles if re.search(r'\bwhat is\b', t, re.I)),
        "guide": sum(1 for t in titles if re.search(r'\bguide\b', t, re.I)),
        "review": sum(1 for t in titles if re.search(r'\breview\b', t, re.I)),
        "vs": sum(1 for t in titles if re.search(r'\bvs\b|\bversus\b', t, re.I)),
        "top": sum(1 for t in titles if re.search(r'\btop\s+\d+', t, re.I)),
        "list_number": sum(1 for t in titles if re.search(r'^\d+\s', t)),
    }
    dominant = max(patterns, key=patterns.get)
    intent_map = {
        "how_to": ("tutorial", "操作指南", 2000),
        "best": ("commercial", "评测/推荐", 2500),
        "what_is": ("informational", "信息科普", 1500),
        "guide": ("informational", "综合指南", 3000),
        "review": ("commercial", "产品评测", 2000),
        "vs": ("commercial", "对比评测", 1800),
        "top": ("commercial", "排行榜", 2000),
        "list_number": ("informational", "列表文章", 1500),
    }
    intent_type, content_format, word_count = intent_map.get(dominant, ("informational", "综合页面", 2000))
    paa_count = len(serp_data.get("people_also_ask", []))
    return {
        "intent_type": intent_type,
        "content_format": content_format,
        "word_count_suggestion": word_count,
        "patterns": patterns,
        "has_paa": paa_count >= 3,
        "paa_count": paa_count,
        "dominant_pattern": dominant,
        "confidence": "high" if patterns[dominant] >= 3 else "medium",
    }


# =============================================================================
# STEP 4: 抓取 + LSI 提取
# =============================================================================

def scrape_page(url, timeout=10):
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        }
        resp = requests.get(url, headers=headers, timeout=timeout, allow_redirects=True)
        resp.raise_for_status()
        html = resp.text
        h1 = re.findall(r'<h1[^>]*>(.*?)</h1>', html, re.DOTALL | re.IGNORECASE)
        h2 = re.findall(r'<h2[^>]*>(.*?)</h2>', html, re.DOTALL | re.IGNORECASE)
        h3 = re.findall(r'<h3[^>]*>(.*?)</h3>', html, re.DOTALL | re.IGNORECASE)

        def clean_tags(text):
            text = re.sub(r'<script[^>]*>.*?</script>', '', text, flags=re.DOTALL | re.I)
            text = re.sub(r'<style[^>]*>.*?</style>', '', text, flags=re.DOTALL | re.I)
            text = re.sub(r'<[^>]+>', ' ', text)
            text = re.sub(r'\s+', ' ', text).strip()
            return text

        h1 = [clean_tags(h) for h in h1 if clean_tags(h)]
        h2 = [clean_tags(h) for h in h2 if clean_tags(h)]
        h3 = [clean_tags(h) for h in h3 if clean_tags(h)]
        body = clean_tags(html)
        return {"url": url, "h1": h1, "h2": h2, "h3": h3, "body": body[:8000]}
    except Exception as e:
        print(f"    . 抓取失败 {url}: {e}")
        return None


def scrape_top_pages(serp_data, max_pages=5):
    organic = serp_data.get("organic", [])
    pages = []
    for item in organic[:max_pages]:
        url = item.get("url", "")
        if not url or url.endswith(".pdf") or url.endswith(".jpg"):
            continue
        print(f"  抓取: {url}")
        data = scrape_page(url)
        if data:
            data["rank"] = item.get("rank", 0)
            data["title"] = item.get("title", "")
            pages.append(data)
        time.sleep(1.5)
    return pages


def extract_lsi(pages_data, seed_keyword):
    import string
    stopwords = {
        "the","a","an","is","are","was","were","be","been","being",
        "have","has","had","do","does","did","will","would","could",
        "should","may","might","must","can","to","of","in","for",
        "on","with","at","by","from","as","and","but","or","it","its",
        "they","them","their","we","us","our","you","your","he","she",
        "him","her","his","i","me","my","mine","what","which","who",
        "when","where","why","how","all","any","both","each","few",
        "more","most","other","some","such","no","not","only","own",
        "same","than","too","very","just","now","then","here","there",
        "up","down","out","off","over","under","again","further",
        "once","also","get","go","see","know","take","use","make",
        "come","give","look","way","find","want","day","time","year",
        "work","life","back","good","new","first","last","long",
        "great","little","high","old","different","large","small",
        "next","early","young","important","public","bad","same",
        "able","one","two","three","well","still","own","say",
        "man","try","ask","need","feel","seem","become","leave",
        "put","mean","keep","let","begin","seem","help","show",
        "hear","play","run","move","live","believe","bring","happen",
        "stand","lose","pay","meet","include","continue","set",
        "learn","change","lead","understand","watch","follow","stop",
        "create","speak","read","allow","add","spend","grow","open",
        "walk","offer","remember","love","consider","appear","buy",
        "wait","serve","die","send","expect","build","stay","fall",
        "cut","reach","kill","remain","suggest","raise","pass",
        "sell","require","report","decide","pull","return","explain",
        "carry","develop","hope","drive","break","receive","agree",
        "support","remove","return","describe","lie","discover",
        "contain","establish","join","reduce","save","increase",
        "share","compare","claim","prove","appear","avoid","prepare",
        "about","above","across","after","against","along","among",
        "around","before","behind","below","beneath","beside",
        "between","beyond","during","inside","into","near","off",
        "onto","outside","since","through","throughout","toward",
        "towards","upon","within","without",
    }
    seed_words = set(seed_keyword.lower().split())
    all_bigrams = Counter()
    all_words = Counter()
    for page in pages_data:
        text = page.get("body", "").lower()
        text = text.translate(str.maketrans(string.punctuation, " " * len(string.punctuation)))
        words = [w.strip() for w in text.split() if len(w.strip()) > 2 and w.strip().isalpha()]
        words = [w for w in words if w not in stopwords and w not in seed_words]
        all_words.update(words)
        bigrams = [words[i] + " " + words[i+1] for i in range(len(words) - 1)]
        all_bigrams.update(bigrams)
    threshold = max(2, len(pages_data) // 3)
    top_bigrams = [(w, c) for w, c in all_bigrams.most_common(50) if c >= threshold and w not in seed_words]
    top_words = [(w, c) for w, c in all_words.most_common(80) if c >= threshold and w not in seed_words]
    return {
        "top_bigrams": top_bigrams[:20],
        "top_words": top_words[:30],
        "h1_collection": [h for p in pages_data for h in p.get("h1", [])],
        "h2_collection": [h for p in pages_data for h in p.get("h2", [])],
        "h3_collection": [h for p in pages_data for h in p.get("h3", [])],
        "domains": list(set(p.get("url", "").split("/")[2] for p in pages_data if p.get("url"))),
    }


# =============================================================================
# STEP 5: 生成 E-E-A-T 大纲
# =============================================================================

def generate_eeat_outline(keyword, intent, lsi, dimension, page_type, serp_data, full_keyword_data=None):
    related = serp_data.get("related_searches", [])[:8]
    paa = serp_data.get("people_also_ask", [])[:6]
    bigrams = [b[0] for b in lsi.get("top_bigrams", [])]
    words = [w[0] for w in lsi.get("top_words", [])]

    structures = {
        "product_detail": [
            {"h2": f"What Is {keyword.title()}?", "lsi": bigrams[:3], "points": ["定义与工作原理", "核心技术参数", "适用场景概览"]},
            {"h2": f"Key Benefits of {keyword.title()}", "lsi": bigrams[3:6], "points": ["节能效果", "降温效率", "安装便利性", "维护成本"]},
            {"h2": f"How {keyword.title()} Works", "lsi": bigrams[6:9], "points": ["高压泵工作原理", "雾化喷嘴技术", "控制系统逻辑"]},
            {"h2": f"{keyword.title()} Specifications", "lsi": words[:5], "points": ["工作压力范围", "流量参数", "覆盖面积", "材质标准", "认证信息"]},
            {"h2": f"Applications of {keyword.title()}", "lsi": bigrams[9:12], "points": ["酒店度假村", "餐厅户外区域", "工业粉尘控制", "农业畜牧", "体育赛事"]},
            {"h2": f"{keyword.title()} vs Alternative Solutions", "lsi": words[5:10], "points": ["vs 传统风扇", "vs 空调系统", "vs 低压制冷", "成本对比", "效果对比"]},
            {"h2": "Why Choose MistGuard Pro?", "lsi": ["factory direct", "quality certified"], "points": [f"{EEAT_CONFIG['years_experience']}+ years experience", f"{EEAT_CONFIG['projects_completed']}+ projects", "ISO/CE/UL certified", "2-year warranty"]},
        ],
        "application": [
            {"h2": f"The Challenge: Why {keyword.title()} Matters", "lsi": bigrams[:3], "points": ["行业痛点描述", "不解决的后果", "市场数据支撑"]},
            {"h2": f"MistGuard Pro Solution for {keyword.title()}", "lsi": bigrams[3:6], "points": ["系统架构", "核心技术优势", "定制化能力"]},
            {"h2": f"How Our System Works in {keyword.title()} Settings", "lsi": bigrams[6:10], "points": ["安装流程", "运行原理", "智能控制", "节能效果"]},
            {"h2": f"Key Results & Metrics", "lsi": words[:5], "points": ["降温幅度8-15°C", "能耗降低数据", "客户满意度", "投资回报周期"]},
            {"h2": f"Real-World {keyword.title()} Projects", "lsi": ["case study", "installation"], "points": ["项目背景", "解决方案", "实施效果", "客户反馈"]},
            {"h2": "Why Property Managers Trust MistGuard Pro", "lsi": ["certified", "warranty"], "points": [f"{EEAT_CONFIG['years_experience']}+ years", f"{EEAT_CONFIG['projects_completed']}+ projects", "2-year warranty", "24/7 support"]},
        ],
        "problem": [
            {"h2": f"Understanding the Problem: {keyword.title()}", "lsi": bigrams[:3], "points": ["问题根源分析", "影响的场景", "常见误区"]},
            {"h2": f"How MistGuard Pro Solves {keyword.title()}", "lsi": bigrams[3:7], "points": ["技术原理", "系统组件", "实施步骤", "预期效果"]},
            {"h2": f"Step-by-Step Guide to Fix {keyword.title()}", "lsi": bigrams[7:11], "points": ["现场评估", "方案设计", "安装部署", "调试验收"]},
            {"h2": "Expert Insights from Our Engineering Team", "lsi": ["expert", "engineer"], "points": ["工程师专业建议", "常见错误避免", "维护最佳实践"]},
        ],
        "location": [
            {"h2": f"{keyword.title()}: Climate Challenges & Solutions", "lsi": bigrams[:3], "points": ["当地气候特点", "户外降温需求", "法规要求"]},
            {"h2": f"MistGuard Pro Solutions for {keyword.title()}", "lsi": bigrams[3:7], "points": ["针对当地气候配置", "推荐产品型号", "安装注意事项", "维护周期"]},
            {"h2": f"Projects We've Completed in {keyword.title().replace('outdoor cooling system ', '').title()}", "lsi": ["project", "installation"], "points": ["当地案例", "客户类型", "项目规模", "效果反馈"]},
            {"h2": f"Why Choose a Local-Experienced Supplier for {keyword.title()}", "lsi": ["local", "experience"], "points": ["了解当地气候", "快速响应服务", "当地合作伙伴", "出口经验"]},
        ],
        "industry": [
            {"h2": f"{keyword.title()}: Industry Overview", "lsi": bigrams[:3], "points": ["行业现状", "市场趋势", "关键挑战"]},
            {"h2": f"MistGuard Pro's Approach to {keyword.title()}", "lsi": bigrams[3:7], "points": ["行业定制方案", "技术标准", "合规要求", "ROI分析"]},
            {"h2": "Industry Expertise & Credentials", "lsi": ["certified", "standard"], "points": EEAT_CONFIG["certifications"]},
        ],
    }

    struct = structures.get(page_type, structures["product_detail"])
    sections = list(struct)

    if paa:
        sections.append({
            "h2": f"Frequently Asked Questions About {keyword.title()}",
            "lsi": ["faq", "question"],
            "points": [q["question"] for q in paa],
        })

    sections.append({
        "h2": f"Get Your Custom {keyword.title()} Quote",
        "lsi": ["quote", "consultation"],
        "points": ["Free site assessment", "Custom system design", "2-year warranty", "Global shipping"],
    })

    outline = {
        "keyword": keyword,
        "slug": re.sub(r'[^a-z0-9\-]', '', keyword.lower().replace(" ", "-"))[:60],
        "dimension": dimension,
        "page_type": page_type,
        "intent": intent,
        "h1": f"{keyword.title()}: Complete Solutions & Expert Guide | MistGuard Pro",
        "meta_description": f"Discover {keyword} solutions engineered by MistGuard Pro. {EEAT_CONFIG['years_experience']}+ years experience, {EEAT_CONFIG['projects_completed']}+ projects worldwide.",
        "meta_title": f"{keyword.title()} | MistGuard Pro — Outdoor Cooling & Misting Systems",
        "word_count": intent.get("word_count_suggestion", 2000),
        "sections": sections,
        "related_keywords": related,
        "faq_questions": [{"q": q["question"], "a": q.get("answer", "")} for q in paa],
        "lsi_bigrams": bigrams,
        "lsi_words": words,
        "eeat_signals": {
            "company_credentials": {
                "founded": EEAT_CONFIG["founded_year"],
                "projects": EEAT_CONFIG["projects_completed"],
                "countries": EEAT_CONFIG["countries_served"],
                "certifications": EEAT_CONFIG["certifications"],
            },
        },
        # 附加：保存完整关键词数据引用
        "keyword_data_full": full_keyword_data if full_keyword_data else {},
    }
    return outline


# =============================================================================
# STEP 6: 生成 Next.js 页面代码（简化版，无 JSX 注释）
# =============================================================================

def slugify(text):
    return re.sub(r'[^a-z0-9\-]', '', text.lower().replace(" ", "-"))[:60]


def generate_nextjs_page(outline):
    """生成 Next.js 页面代码（占位符标记用 [AI_PLACEHOLDER] 代替 JSX 注释）"""
    kw = outline["keyword"]
    slug = outline["slug"]
    ptype = outline["page_type"]
    sections = outline["sections"]
    related = outline.get("related_keywords", [])
    faqs = outline.get("faq_questions", [])

    if ptype == "application":
        page_path = "applications/" + slug
    elif ptype == "problem":
        page_path = "problems/" + slug
    elif ptype == "location":
        page_path = "locations/" + slug
    elif ptype == "industry":
        page_path = "industries/" + slug
    else:
        page_path = "products/" + slug

    # 生成 sections JSX（无注释，用占位符）
    section_jsx_parts = []
    for i, sec in enumerate(sections):
        heading = sec["h2"]
        points = sec.get("points", [])
        points_jsx = ""
        for p in points:
            points_jsx += f'\n              <li className="flex items-start gap-2"><CheckCircle size={{16}} className="text-spring-400 mt-1 shrink-0" /><span className="text-gray-300">{p}</span></li>'

        image_placeholder = ""
        if i % 2 == 1:
            image_placeholder = f'''
            <div className="mt-6 rounded-xl overflow-hidden border border-spring-500/10">
              <div className="aspect-video bg-deep-900 flex items-center justify-center">
                <span className="text-gray-600 text-sm">Image: {heading[:40]}</span>
              </div>
            </div>'''

        # 关键修复：不用 JSX 注释，用普通文本占位符
        placeholder = f"[AI_PLACEHOLDER_{i}: Generate 300-{300+i*50} words, naturally include LSI terms: {', '.join(sec.get('lsi', [])[:3])}]"

        section_jsx_parts.append(f'''
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{heading}</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-400 leading-relaxed mb-4">
                {placeholder}
              </p>
              <ul className="space-y-3 mt-4">{points_jsx}
              </ul>
            </div>{image_placeholder}
          </section>''')

    sections_code = "\n".join(section_jsx_parts)

    # FAQ Schema
    faq_schema_str = ""
    if faqs:
        faq_items = ",\n    ".join([
            '{"@type": "Question", "name": "' + q["q"].replace('"', '\\"') + '", "acceptedAnswer": {"@type": "Answer", "text": "' + q["a"].replace('"', '\\"')[:200] + '"}}'
            for q in faqs[:6]
        ])
        faq_schema_str = f'''
  "faqSchema": {{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
    {faq_items}
    ]
  }},'''

    # Hero 占位符
    hero_placeholder = f"[AI_HERO: Write 200-word intro, include LSI terms: {', '.join(outline.get('lsi_bigrams', [])[:5])}]"

    # 生成完整代码
    code = f'''"use client";

import {{ useTranslations }} from "next-intl";
import {{ Link }} from "@/i18n/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {{ CheckCircle, ArrowRight, Drop }} from "@phosphor-icons/react";

export const metadata = {{
  title: "{outline['meta_title']}",
  description: "{outline['meta_description']}",
  alternates: {{
    canonical: `/en/{page_path}`,
    languages: {{
      en: "/en/{page_path}",
      ar: "/ar/{page_path}",
      es: "/es/{page_path}",
      fr: "/fr/{page_path}",
    }},
  }},
}};

const structuredData = {{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{outline['h1']}",
  "description": "{outline['meta_description']}",
  "author": {{
    "@type": "Organization",
    "name": "MistGuard Pro",
    "url": "https://www.mistguard-pro.com",
  }},
  "publisher": {{
    "@type": "Organization",
    "name": "MistGuard Pro",
    "logo": {{
      "@type": "ImageObject",
      "url": "https://www.mistguard-pro.com/logo.png"
    }}
  }},
  "datePublished": "{datetime.now().strftime('%Y-%m-%d')}",
  "dateModified": "{datetime.now().strftime('%Y-%m-%d')}",
  "about": {{
    "@type": "Thing",
    "name": "{kw}"
  }},
  {faq_schema_str}
}};

export default function Page() {{
  const t = useTranslations();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <main className="min-h-screen bg-deep-950 pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {{/* Breadcrumb */}}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-spring-400 transition-colors">Home</Link>
            <ArrowRight size={{14}} />
            <Link href="/{page_path.split('/')[0]}" className="hover:text-spring-400 transition-colors">
              {page_path.split('/')[0].charAt(0).upper() + page_path.split('/')[0].slice(1)}
            </Link>
            <ArrowRight size={{14}} />
            <span className="text-gray-400">{kw.title()}</span>
          </nav>

          {{/* Hero */}}
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">
              {kw.title()}: <span className="text-gradient-spring">Complete Solutions</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
              {hero_placeholder}
              Engineered by MistGuard Pro with {EEAT_CONFIG['years_experience']}+ years of expertise.
            </p>

            {{/* E-E-A-T Trust Bar */}}
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-spring-500/5 border border-spring-500/10">
                <CheckCircle size={{16}} className="text-spring-400" />
                <span className="text-sm text-gray-400">ISO 9001 Certified</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-spring-500/5 border border-spring-500/10">
                <CheckCircle size={{16}} className="text-spring-400" />
                <span className="text-sm text-gray-400">{EEAT_CONFIG['projects_completed']}+ Projects</span>
              </div>
            </div>
          </div>

          {{/* Content Sections */}}
          {sections_code}

          {{/* CTA */}}
          <section className="glass-card-strong rounded-2xl p-8 md:p-12 text-center border-spring-500/20 mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Upgrade Your {kw.title()}?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Get a free site assessment from our engineering team.
              {EEAT_CONFIG['projects_completed']}+ successful installations worldwide.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-spring-500 text-black font-semibold hover:bg-spring-400 transition-colors"
            >
              Request a Free Quote
              <ArrowRight size={{18}} weight="bold" />
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}}
'''
    return code


# =============================================================================
# STEP 7: 输出 CSV 报告（含完整字段）
# =============================================================================

def export_csv_report(results, output_dir):
    csv_path = os.path.join(output_dir, "seo_report.csv")
    with open(csv_path, "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.writer(f)
        writer.writerow([
            "Keyword", "Dimension", "Page Type", "Search Volume", "KD",
            "CPC", "Min CPC", "Max CPC", "Competition", "Competition Index",
            "SEO Difficulty", "Organic ETV", "Paid ETV",
            "Priority", "Intent", "Word Count", "Slug",
            "Related Keywords", "FAQ Count", "Status", "Monthly Searches (latest)",
        ])
        for r in results:
            outline = r.get("outline", {})
            kw_data = r  # 完整关键词数据
            monthly = ""
            if kw_data.get("monthly_searches"):
                latest = kw_data["monthly_searches"][-1] if isinstance(kw_data["monthly_searches"], list) else {}
                monthly = f"{latest.get('year', '')}-{latest.get('month', '')}: {latest.get('search_volume', '')}"
            writer.writerow([
                r.get("keyword", ""),
                r.get("dimension", ""),
                r.get("page_type", ""),
                r.get("search_volume", 0),
                r.get("kd", 0),
                r.get("cpc", 0),
                r.get("min_cpc", ""),
                r.get("max_cpc", ""),
                r.get("competition", ""),
                r.get("competition_index", ""),
                r.get("seo_difficulty", ""),
                r.get("organic_etv", ""),
                r.get("paid_etv", ""),
                r.get("priority", ""),
                outline.get("intent", {}).get("intent_type", ""),
                outline.get("word_count", ""),
                outline.get("slug", ""),
                "; ".join(outline.get("related_keywords", [])[:8]),
                len(outline.get("faq_questions", [])),
                "Done" if r.get("page_code") else "Pending",
                monthly,
            ])
    print(f"  . CSV report: {csv_path}")


# =============================================================================
# MAIN PIPELINE
# =============================================================================

def run_pipeline(dimension_name, config, location, client, output_dir, method="live"):
    seeds = config["seeds"]
    page_type = config["page_type"]
    priority = config["priority"]

    print(f"\n{'='*70}")
    print(f"Dimension: {dimension_name} | Location: {location['name']}")
    print(f"  Type: {page_type} | Priority: {priority}")
    print(f"{'='*70}")

    target_keywords = expand_and_filter(client, seeds, location,
                                        min_volume=30 if priority <= 2 else 10,
                                        max_kd=50 if priority == 1 else 40, method=method)
    if not target_keywords:
        print("  No target keywords found, skipping.")
        return []

    results = []
    process_limit = 5 if priority == 1 else 3
    for kw_data in target_keywords[:process_limit]:
        keyword = kw_data["keyword"]
        print(f"\n  Processing: {keyword}")

        print(f"    [Step 3] SERP analysis...")
        serp_data = client.serp_organic(keyword, location["code"], LANGUAGE, depth=10)
        if not serp_data:
            print(f"    SERP data empty, skipping.")
            continue

        intent = analyze_intent(serp_data)
        print(f"    Intent: {intent['intent_type']} ({intent['content_format']})")

        print(f"    [Step 4] Scraping Top pages...")
        pages_data = scrape_top_pages(serp_data, max_pages=5)
        lsi = extract_lsi(pages_data, keyword)
        print(f"    LSI bigrams: {len(lsi['top_bigrams'])}, words: {len(lsi['top_words'])}")

        print(f"    [Step 5] Generating E-E-A-T outline...")
        outline = generate_eeat_outline(keyword, intent, lsi, dimension_name, page_type, serp_data, full_keyword_data=kw_data)

        print(f"    [Step 6] Generating Next.js page...")
        page_code = generate_nextjs_page(outline)

        page_dir = os.path.join(output_dir, "pages", dimension_name)
        os.makedirs(page_dir, exist_ok=True)
        page_file = os.path.join(page_dir, outline['slug'] + ".tsx")
        with open(page_file, "w", encoding="utf-8") as f:
            f.write(page_code)

        outline_dir = os.path.join(output_dir, "outlines")
        os.makedirs(outline_dir, exist_ok=True)
        # 保存完整 outline（含所有关键词数据）
        with open(os.path.join(outline_dir, outline['slug'] + ".json"), "w", encoding="utf-8") as f:
            json.dump(outline, f, ensure_ascii=False, indent=2)

        if page_type == "application":
            page_path = "applications/" + outline['slug']
        elif page_type == "problem":
            page_path = "problems/" + outline['slug']
        elif page_type == "location":
            page_path = "locations/" + outline['slug']
        elif page_type == "industry":
            page_path = "industries/" + outline['slug']
        else:
            page_path = "products/" + outline['slug']

        results.append({
            **kw_data,
            "dimension": dimension_name,
            "page_type": page_type,
            "intent": intent,
            "outline": outline,
            "page_code": page_code,
            "page_path": page_path,
            "files": {"page": page_file},
        })

        print(f"    Done: {page_file}")

    return results


def main():
    import argparse
    parser = argparse.ArgumentParser(description="MistGuard Pro SEO Automation v2.0")
    parser.add_argument("--dimension", "-d", help="Run single dimension")
    parser.add_argument("--location", "-l", default="United States", help="Location name")
    parser.add_argument("--priority", "-p", type=int, choices=[1, 2, 3], help="Filter by priority")
    parser.add_argument("--output", "-o", default="results/seo_automation", help="Output directory")
    parser.add_argument("--dry-run", action="store_true", help="Skip API calls")
    parser.add_argument("--method", "-m", default="live", choices=["live", "standard"], help="API method: live (instant) or standard (queued, cheaper)")
    args = parser.parse_args()

    print("MistGuard Pro SEO Automation Pipeline v2.0")
    print(f"  Output: {args.output}")
    os.makedirs(args.output, exist_ok=True)

    dims = SEED_KEYWORDS
    if args.dimension:
        dims = {k: v for k, v in dims.items() if k == args.dimension}
    if args.priority:
        dims = {k: v for k, v in dims.items() if v["priority"] == args.priority}

    loc = next((l for l in LOCATIONS if l["name"] == args.location), LOCATIONS[0])

    if args.dry_run:
        print("\nDRY RUN MODE - No API calls")
        for dim_name, config in dims.items():
            print(f"\n  Would process: {dim_name}")
            print(f"    Seeds: {config['seeds'][:3]}")
        return

    client = DataForSEOClient(API_LOGIN, API_PASSWORD, args.output, "", loc["name"])
    # 更新 client 的 dimension（循环时每次更新）
    all_results = []

    for dim_name, config in dims.items():
        try:
            # 为每个 dimension 创建独立的 client（不同的保存目录）
            dim_client = DataForSEOClient(API_LOGIN, API_PASSWORD, args.output, dim_name, loc["name"])
            results = run_pipeline(dim_name, config, loc, dim_client, args.output, method=args.method)
            all_results.extend(results)
        except Exception as e:
            print(f"\n  Error in {dim_name}: {e}")
            import traceback
            traceback.print_exc()

    if all_results:
        print(f"\n{'='*70}")
        print("[Step 7] Exporting reports...")
        export_csv_report(all_results, args.output)
        manifest = [{"keyword": r["keyword"], "slug": r["outline"]["slug"], "dimension": r["dimension"], "page_path": r["page_path"], "priority": r["priority"]} for r in all_results]
        with open(os.path.join(args.output, "manifest.json"), "w", encoding="utf-8") as f:
            json.dump(manifest, f, ensure_ascii=False, indent=2)
        print(f"  manifest.json ({len(manifest)} pages)")

        # 保存所有结果的完整 JSON（含所有 API 数据）
        all_data_file = os.path.join(args.output, f"all_results_full_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json")
        with open(all_data_file, "w", encoding="utf-8") as f:
            json.dump(all_results, f, ensure_ascii=False, indent=2)
        print(f"  . 完整结果已保存: {os.path.basename(all_data_file)}")

    print(f"\nPipeline complete! {len(all_results)} pages generated.")


if __name__ == "__main__":
    main()

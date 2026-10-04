#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
MistGuard Pro — DataForSEO Keyword Research Pipeline
=====================================================

批量调研关键词，输出结构化数据用于 AI 页面生成。

Usage:
    python keyword_research.py

Output:
    results/
    ├── raw/                  # 原始 API 返回
    ├── keywords.json         # 按维度分类的关键词库
    ├── keyword_universe.csv  # 可导入 Excel/Notion
    └── page_templates/       # AI 页面结构模板（H1-H4 + LSI）

API Docs: https://docs.dataforseo.com/v3/serp/google/organic/overview/
"""

import os
import sys
import json
import time
import base64
import hashlib
import requests
from datetime import datetime
from collections import Counter
from urllib.parse import quote

# =============================================================================
# CONFIG
# =============================================================================

API_LOGIN = "so@luckywyz.com"
API_PASSWORD = "3aea72cdd70c3f58"
API_BASE = "https://api.dataforseo.com/v3"

# Target markets (priority order)
LOCATIONS = [
    {"location_name": "United States", "location_code": 2840},
    {"location_name": "United Arab Emirates", "location_code": 2784},
    {"location_name": "Saudi Arabia", "location_code": 2682},
    {"location_name": "United Kingdom", "location_code": 2826},
    {"location_name": "Australia", "location_code": 2036},
]

LANGUAGE_CODE = "en"
RESULTS_LIMIT = 100  # SERP results to fetch per keyword

# =============================================================================
# SEED KEYWORDS — 6 Dimensions
# =============================================================================

SEED_KEYWORDS = {
    "product": {
        "priority": 1,
        "seeds": [
            "misting system",
            "fogging system",
            "high pressure misting system",
            "outdoor misting system",
            "cooling mist system",
            "mosquito misting system",
            "dust suppression system",
            "commercial misting system",
            "industrial misting system",
            "portable misting system",
            "automatic misting system",
            "stainless steel misting system",
        ]
    },
    "application_hotel": {
        "priority": 1,
        "seeds": [
            "hotel cooling system",
            "hotel patio cooling",
            "hotel outdoor cooling",
            "resort cooling system",
            "resort misting system",
            "beach resort cooling",
            "outdoor resort cooling",
            "beach bar cooling system",
            "beach club misting system",
        ]
    },
    "application_restaurant": {
        "priority": 1,
        "seeds": [
            "restaurant cooling system",
            "restaurant patio misting",
            "outdoor dining cooling",
            "restaurant outdoor cooling",
        ]
    },
    "application_residential": {
        "priority": 2,
        "seeds": [
            "backyard misting system",
            "patio misting system",
            "garden cooling system",
            "residential misting system",
            "home outdoor cooling",
        ]
    },
    "application_agriculture": {
        "priority": 2,
        "seeds": [
            "livestock cooling system",
            "poultry cooling system",
            "barn misting system",
            "greenhouse misting system",
            "dairy farm cooling",
        ]
    },
    "application_industrial": {
        "priority": 2,
        "seeds": [
            "construction dust suppression",
            "dust control misting system",
            "industrial dust suppression",
            "warehouse cooling system",
            "factory cooling system",
        ]
    },
    "problem": {
        "priority": 1,
        "seeds": [
            "how to cool outdoor patio",
            "how to cool outdoor restaurant",
            "how to keep guests comfortable in summer",
            "how to reduce dust on construction site",
            "how to control mosquitoes outdoors",
            "how to cool livestock barn",
            "how to cool a hotel terrace in summer",
        ]
    },
    "location_us": {
        "priority": 2,
        "seeds": [
            "outdoor cooling system texas",
            "outdoor cooling system arizona",
            "outdoor cooling system florida",
            "restaurant cooling system texas",
            "hotel cooling system arizona",
            "resort cooling system florida",
        ]
    },
    "location_gulf": {
        "priority": 2,
        "seeds": [
            "outdoor cooling system dubai",
            "outdoor cooling system saudi arabia",
            "outdoor cooling system abu dhabi",
            "restaurant cooling system dubai",
            "hotel cooling system saudi arabia",
        ]
    },
    "industry": {
        "priority": 2,
        "seeds": [
            "hospitality cooling solutions",
            "resort climate control",
            "outdoor comfort solutions",
            "commercial cooling solutions",
            "venue cooling systems",
            "outdoor venue cooling",
        ]
    },
    "accessory": {
        "priority": 3,
        "seeds": [
            "misting nozzle",
            "fog nozzle",
            "misting pump",
            "misting filter",
            "misting tubing",
            "stainless steel misting nozzle",
            "high pressure misting pump",
            "misting system accessories",
        ]
    },
    "sports_events": {
        "priority": 2,
        "seeds": [
            "golf course cooling system",
            "golf driving range misting",
            "stadium cooling system",
            "outdoor event cooling",
            "sports venue cooling",
        ]
    },
}


# =============================================================================
# API CLIENT
# =============================================================================

class DataForSEOClient:
    def __init__(self, login: str, password: str):
        self.login = login
        self.password = password
        self.auth = (login, password)

    def post_tasks(self, endpoint: str, payload: list) -> dict:
        """Submit tasks to DataForSEO."""
        url = f"{API_BASE}{endpoint}"
        resp = requests.post(url, auth=self.auth, json=payload, timeout=60)
        resp.raise_for_status()
        return resp.json()

    def get_results(self, endpoint: str) -> dict:
        """Poll results from DataForSEO."""
        url = f"{API_BASE}{endpoint}"
        resp = requests.get(url, auth=self.auth, timeout=60)
        resp.raise_for_status()
        return resp.json()


# =============================================================================
# KEYWORD RESEARCH PIPELINE
# =============================================================================

class KeywordResearchPipeline:
    def __init__(self, client: DataForSEOClient, output_dir: str = "results"):
        self.client = client
        self.output_dir = output_dir
        self.raw_dir = os.path.join(output_dir, "raw")
        self.template_dir = os.path.join(output_dir, "page_templates")
        os.makedirs(self.raw_dir, exist_ok=True)
        os.makedirs(self.template_dir, exist_ok=True)

        self.keyword_db = {}  # keyword -> metadata
        self.all_related = {}  # keyword -> [related_terms]
        self.all_questions = {}  # keyword -> [questions]

    # -------------------------------------------------------------------------
    # Step 1: Submit SERP Tasks
    # -------------------------------------------------------------------------

    def submit_serp_tasks(self, keywords: list, location_code: int, tag_prefix: str = "") -> list:
        """Submit a batch of SERP tasks. Returns list of task IDs."""
        payload = []
        for kw in keywords:
            task_id = f"{tag_prefix}_{hashlib.md5(kw.encode()).hexdigest()[:8]}"
            payload.append({
                "keyword": kw,
                "location_code": location_code,
                "language_code": LANGUAGE_CODE,
                "device": "desktop",
                "os": "windows",
                "depth": RESULTS_LIMIT,
                "tag": task_id,
            })

        print(f"  Submitting {len(payload)} SERP tasks...")
        resp = self.client.post_tasks("/serp/google/organic/task_post", payload)

        task_ids = []
        for task in resp.get("tasks", []):
            if task.get("status_code") == 20100:
                task_ids.append(task["id"])
            else:
                print(f"    ⚠ Task failed: {task.get('status_message', 'Unknown')}")

        print(f"  ✅ {len(task_ids)} tasks accepted")
        return task_ids

    # -------------------------------------------------------------------------
    # Step 2: Poll Results
    # -------------------------------------------------------------------------

    def poll_results(self, task_ids: list, max_wait: int = 120) -> dict:
        """Poll task results until ready or timeout."""
        pending = set(task_ids)
        results = {}
        waited = 0

        while pending and waited < max_wait:
            time.sleep(3)
            waited += 3

            for tid in list(pending):
                resp = self.client.get_results(f"/serp/google/organic/task_get/regular/{tid}")
                for task in resp.get("tasks", []):
                    status = task.get("status_code", 0)
                    if status == 20000:
                        pending.discard(tid)
                        results[tid] = task
                    elif status >= 40000:
                        pending.discard(tid)
                        print(f"    ⚠ Task {tid} error: {task.get('status_message')}")

            if pending:
                print(f"  ⏳ {len(pending)} pending... ({waited}s)")

        if pending:
            print(f"  ⚠ {len(pending)} tasks timed out")

        return results

    # -------------------------------------------------------------------------
    # Step 3: Extract Data from SERP Results
    # -------------------------------------------------------------------------

    def extract_from_serp(self, task_result: dict, seed_keyword: str) -> dict:
        """Extract keywords, questions, related searches from SERP data."""
        data = {
            "seed": seed_keyword,
            "ranking_pages": [],
            "related_searches": [],
            "people_also_ask": [],
            "questions": [],
            "lsi_terms": [],
        }

        result_items = task_result.get("result", [])
        if not result_items:
            return data

        serp = result_items[0]
        items = serp.get("items", {})

        # 1. Ranking pages (titles + descriptions)
        organic = items.get("organic", [])
        for item in organic[:20]:
            data["ranking_pages"].append({
                "title": item.get("title", ""),
                "description": item.get("description", ""),
                "url": item.get("url", ""),
                "domain": item.get("domain", ""),
            })

        # 2. Related searches
        related = items.get("related_searches", [])
        for rs in related:
            if isinstance(rs, dict):
                query = rs.get("query", "")
            else:
                query = str(rs)
            if query:
                data["related_searches"].append(query)

        # 3. People Also Ask
        paa = items.get("people_also_ask", [])
        for qa in paa:
            q = qa.get("question", "") if isinstance(qa, dict) else str(qa)
            a = qa.get("answer", "") if isinstance(qa, dict) else ""
            if q:
                data["people_also_ask"].append({"question": q, "answer": a})
                data["questions"].append(q)

        # 4. Extract LSI terms from titles + descriptions
        text_corpus = " ".join([
            p["title"] + " " + p["description"]
            for p in data["ranking_pages"]
        ]).lower()

        data["lsi_terms"] = self._extract_lsi_terms(text_corpus, seed_keyword)

        return data

    def _extract_lsi_terms(self, text: str, seed: str) -> list:
        """Extract LSI (semantic) terms from corpus."""
        # Common stopwords
        stopwords = {
            "the", "a", "an", "is", "are", "was", "were", "be", "been",
            "being", "have", "has", "had", "do", "does", "did", "will",
            "would", "could", "should", "may", "might", "must", "shall",
            "can", "need", "dare", "ought", "used", "to", "of", "in",
            "for", "on", "with", "at", "by", "from", "as", "into",
            "through", "during", "before", "after", "above", "below",
            "between", "under", "and", "but", "or", "yet", "so", "if",
            "because", "although", "though", "while", "where", "when",
            "that", "which", "who", "whom", "whose", "what", "this",
            "these", "those", "i", "you", "he", "she", "it", "we", "they",
            "me", "him", "her", "us", "them", "my", "your", "his",
            "our", "their", "mine", "yours", "hers", "ours", "theirs",
            "myself", "yourself", "himself", "herself", "itself",
            "ourselves", "themselves", "it", "s", "t", "just", "now",
            "then", "than", "only", "also", "very", "too", "more",
            "most", "some", "any", "no", "not", "all", "each", "every",
            "both", "few", "little", "much", "many", "other", "another",
            "such", "own", "same", "different", "new", "old", "first",
            "last", "long", "great", "little", "own", "other", "right",
            "good", "best", "better", "high", "low", "big", "small",
            "large", "next", "early", "young", "important", "few",
            "public", "bad", "same", "able", "back", "call", "came",
            "come", "day", "does", "each", "end", "even", "find", "get",
            "give", "go", "here", "home", "how", "its", "just", "know",
            "last", "leave", "life", "like", "line", "look", "made",
            "make", "man", "many", "may", "might", "more", "most",
            "move", "much", "must", "name", "never", "new", "next",
            "off", "old", "one", "only", "other", "our", "out", "over",
            "own", "part", "people", "place", "put", "right", "said",
            "same", "say", "see", "seem", "she", "should", "show", "side",
            "since", "some", "sound", "still", "such", "take", "tell",
            "than", "them", "thing", "think", "this", "those", "though",
            "three", "through", "time", "too", "two", "under", "until",
            "up", "us", "use", "very", "want", "way", "we", "well",
            "went", "were", "what", "when", "where", "which", "while",
            "who", "why", "will", "with", "work", "world", "would",
            "year", "yes", "yet", "you", "your",
        }

        # Extract meaningful bigrams and unigrams
        words = [w.strip(".,;:!?()[]{}\"'—–-") for w in text.split()]
        words = [w for w in words if len(w) > 2 and w not in stopwords and w.isalpha()]

        # Unigram frequency
        unigrams = Counter(words)

        # Bigrams
        bigrams = Counter([f"{words[i]} {words[i+1]}" for i in range(len(words)-1)])

        # Filter: remove words already in seed keyword
        seed_words = set(seed.lower().split())

        lsi = []
        for term, count in bigrams.most_common(30):
            if count >= 2 and not any(sw in term for sw in seed_words):
                lsi.append({"term": term, "freq": count, "type": "bigram"})

        for term, count in unigrams.most_common(30):
            if count >= 3 and term not in [x["term"] for x in lsi] and not any(sw == term for sw in seed_words):
                lsi.append({"term": term, "freq": count, "type": "unigram"})

        return lsi[:20]

    # -------------------------------------------------------------------------
    # Step 4: Generate Page Structure Template
    # -------------------------------------------------------------------------

    def generate_page_template(self, seed_keyword: str, serp_data: dict, dimension: str) -> dict:
        """Generate H1-H4 structure + LSI embedding suggestions."""
        template = {
            "target_keyword": seed_keyword,
            "dimension": dimension,
            "url_slug": self._slugify(seed_keyword),
            "structure": {},
            "lsi_terms": [t["term"] for t in serp_data.get("lsi_terms", [])],
            "related_keywords": serp_data.get("related_searches", [])[:15],
            "faq_questions": [q["question"] for q in serp_data.get("people_also_ask", [])][:8],
            "competitor_insights": [],
        }

        # Competitor insights
        for page in serp_data.get("ranking_pages", [])[:5]:
            template["competitor_insights"].append({
                "domain": page["domain"],
                "title_pattern": page["title"],
            })

        # Generate heading structure based on dimension type
        template["structure"] = self._build_heading_structure(seed_keyword, dimension, serp_data)

        return template

    def _build_heading_structure(self, keyword: str, dimension: str, serp_data: dict) -> dict:
        """Build semantic heading structure."""
        related = serp_data.get("related_searches", [])
        questions = [q["question"] for q in serp_data.get("people_also_ask", [])]
        lsi = [t["term"] for t in serp_data.get("lsi_terms", [])]

        # Pick sub-topics from related searches
        sub_topics = related[:4] if len(related) >= 4 else [
            f"{keyword} for commercial use",
            f"{keyword} installation guide",
            f"{keyword} benefits",
            f"{keyword} vs alternatives",
        ]

        structure = {
            "h1": f"{keyword.title()}: Complete Guide & Solutions | MistGuard Pro",
            "h2s": []
        }

        # H2: Main sections
        h2_sections = [
            {
                "h2": f"What Is {keyword.title()}?",
                "h3s": [
                    {"h3": f"How {keyword.title()} Works", "h4s": [f"Key Components of {keyword.title()}", f"Technology Behind {keyword.title()}"]},
                    {"h3": f"Benefits of {keyword.title()}", "h4s": ["Energy Efficiency", "Cost Savings", "Environmental Impact"]},
                ]
            },
            {
                "h2": f"{keyword.title()} for Different Applications",
                "h3s": [
                    {"h3": topic, "h4s": [f"Why {topic} Needs {keyword.title()}", f"Best Practices for {topic}"]}
                    for topic in sub_topics[:3]
                ]
            },
            {
                "h2": f"How to Choose the Right {keyword.title()}",
                "h3s": [
                    {"h3": "Key Factors to Consider", "h4s": ["Coverage Area", "Pressure Requirements", "Water Quality"]},
                    {"h3": "Installation & Maintenance", "h4s": ["DIY vs Professional Installation", "Maintenance Schedule"]},
                ]
            },
            {
                "h2": f"{keyword.title()} vs Alternatives",
                "h3s": [
                    {"h3": f"{keyword.title()} vs Fans", "h4s": ["Cooling Efficiency Comparison", "Operating Costs"]},
                    {"h3": f"{keyword.title()} vs AC Units", "h4s": ["Energy Consumption", "Outdoor Suitability"]},
                ]
            },
        ]

        # Add FAQ section if we have questions
        if questions:
            faq_h3s = [{"h3": q, "h4s": []} for q in questions[:6]]
            h2_sections.append({
                "h2": f"Frequently Asked Questions About {keyword.title()}",
                "h3s": faq_h3s
            })

        # Add CTA section
        h2_sections.append({
            "h2": f"Get Your Custom {keyword.title()} Quote",
            "h3s": [
                {"h3": "Why Choose MistGuard Pro?", "h4s": []},
                {"h3": "Request a Free Assessment", "h4s": []},
            ]
        })

        structure["h2s"] = h2_sections

        # LSI embedding suggestions
        structure["lsi_embedding"] = {
            "intro_paragraph": f"Naturaly weave these terms into the first 100 words: {', '.join(lsi[:5])}",
            "body_terms": lsi[5:15],
            "conclusion_terms": lsi[15:20],
        }

        return structure

    def _slugify(self, text: str) -> str:
        """Convert keyword to URL slug."""
        return text.lower().replace(" ", "-").replace("/", "-")[:60]

    # -------------------------------------------------------------------------
    # Step 5: Run Full Pipeline for a Dimension
    # -------------------------------------------------------------------------

    def run_dimension(self, dimension_name: str, config: dict, location: dict):
        """Run keyword research for one dimension + location."""
        print(f"\n{'='*60}")
        print(f"Dimension: {dimension_name} | Location: {location['location_name']}")
        print(f"{'='*60}")

        seeds = config["seeds"]
        priority = config["priority"]
        tag = f"{dimension_name}_{location['location_code']}"

        # 1. Submit
        task_ids = self.submit_serp_tasks(seeds, location["location_code"], tag)
        if not task_ids:
            print("  No tasks submitted, skipping.")
            return

        # 2. Poll
        print("  Waiting for results...")
        results = self.poll_results(task_ids)

        # 3. Process & save
        for tid, task_result in results.items():
            # Map task back to seed keyword
            seed_kw = None
            for seed in seeds:
                if hashlib.md5(seed.encode()).hexdigest()[:8] in tid:
                    seed_kw = seed
                    break

            if not seed_kw:
                continue

            # Extract data
            serp_data = self.extract_from_serp(task_result, seed_kw)

            # Save raw
            raw_file = os.path.join(self.raw_dir, f"{tag}_{self._slugify(seed_kw)}.json")
            with open(raw_file, "w", encoding="utf-8") as f:
                json.dump(task_result, f, ensure_ascii=False, indent=2)

            # Generate template
            template = self.generate_page_template(seed_kw, serp_data, dimension_name)
            tmpl_file = os.path.join(self.template_dir, f"{self._slugify(seed_kw)}.json")
            with open(tmpl_file, "w", encoding="utf-8") as f:
                json.dump(template, f, ensure_ascii=False, indent=2)

            # Store in DB
            self.keyword_db[seed_kw] = {
                "dimension": dimension_name,
                "priority": priority,
                "location": location["location_name"],
                "location_code": location["location_code"],
                "related_searches": serp_data["related_searches"],
                "questions": serp_data["questions"],
                "lsi_terms": serp_data["lsi_terms"],
                "ranking_domains": [p["domain"] for p in serp_data["ranking_pages"][:10]],
                "template_file": tmpl_file,
                "raw_file": raw_file,
            }

            print(f"    ✅ {seed_kw}: {len(serp_data['related_searches'])} related, {len(serp_data['questions'])} questions")

    # -------------------------------------------------------------------------
    # Step 6: Export Final Outputs
    # -------------------------------------------------------------------------

    def export(self):
        """Export all results to structured files."""
        print(f"\n{'='*60}")
        print("EXPORTING RESULTS")
        print(f"{'='*60}")

        # 1. JSON keyword database
        db_file = os.path.join(self.output_dir, "keywords.json")
        with open(db_file, "w", encoding="utf-8") as f:
            json.dump(self.keyword_db, f, ensure_ascii=False, indent=2)
        print(f"  ✅ keywords.json ({len(self.keyword_db)} keywords)")

        # 2. CSV for Excel/Notion import
        csv_file = os.path.join(self.output_dir, "keyword_universe.csv")
        with open(csv_file, "w", encoding="utf-8") as f:
            f.write("keyword,dimension,priority,location,related_count,questions_count,lsi_terms,url_slug\n")
            for kw, meta in self.keyword_db.items():
                lsi = "; ".join([t["term"] for t in meta["lsi_terms"][:10]])
                slug = self._slugify(kw)
                f.write(f'"{kw}","{meta["dimension"]}",{meta["priority"]},"{meta["location"]}",{len(meta["related_searches"])},{len(meta["questions"])},"{lsi}","{slug}"\n')
        print(f"  ✅ keyword_universe.csv")

        # 3. Summary report
        summary = {
            "generated_at": datetime.now().isoformat(),
            "total_keywords": len(self.keyword_db),
            "dimensions": {},
            "priority_breakdown": {"1": 0, "2": 0, "3": 0},
        }
        for kw, meta in self.keyword_db.items():
            dim = meta["dimension"]
            if dim not in summary["dimensions"]:
                summary["dimensions"][dim] = {"count": 0, "keywords": []}
            summary["dimensions"][dim]["count"] += 1
            summary["dimensions"][dim]["keywords"].append(kw)
            summary["priority_breakdown"][str(meta["priority"])] += 1

        summary_file = os.path.join(self.output_dir, "summary.json")
        with open(summary_file, "w", encoding="utf-8") as f:
            json.dump(summary, f, ensure_ascii=False, indent=2)
        print(f"  ✅ summary.json")

        # 4. Page generation manifest (for AI batch page creation)
        manifest = []
        for kw, meta in self.keyword_db.items():
            if meta["priority"] <= 2:  # Only priority 1-2 for page generation
                manifest.append({
                    "keyword": kw,
                    "slug": self._slugify(kw),
                    "dimension": meta["dimension"],
                    "priority": meta["priority"],
                    "template_file": meta["template_file"],
                    "h1": f"{kw.title()}: Complete Guide & Solutions | MistGuard Pro",
                    "related_keywords": meta["related_searches"][:10],
                    "faq_questions": meta["questions"][:6],
                    "lsi_terms": [t["term"] for t in meta["lsi_terms"][:15]],
                })

        manifest_file = os.path.join(self.output_dir, "page_manifest.json")
        with open(manifest_file, "w", encoding="utf-8") as f:
            json.dump(manifest, f, ensure_ascii=False, indent=2)
        print(f"  ✅ page_manifest.json ({len(manifest)} pages ready for AI generation)")

        print(f"\n📁 All results saved to: {os.path.abspath(self.output_dir)}")

    # -------------------------------------------------------------------------
    # Main Entry
    # -------------------------------------------------------------------------

    def run(self, dimensions: dict = None, locations: list = None):
        """Run full pipeline."""
        dimensions = dimensions or SEED_KEYWORDS
        locations = locations or LOCATIONS[:1]  # Default: US only

        print("🚀 MistGuard Pro Keyword Research Pipeline")
        print(f"   API: {API_BASE}")
        print(f"   Dimensions: {len(dimensions)}")
        print(f"   Locations: {[l['location_name'] for l in locations]}")

        for dim_name, dim_config in dimensions.items():
            for loc in locations:
                try:
                    self.run_dimension(dim_name, dim_config, loc)
                except Exception as e:
                    print(f"  ❌ Error in {dim_name}/{loc['location_name']}: {e}")

        self.export()


# =============================================================================
# CLI
# =============================================================================

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="MistGuard Pro Keyword Research")
    parser.add_argument("--dimension", "-d", help="Run single dimension (e.g. product)")
    parser.add_argument("--location", "-l", help="Location name (e.g. 'United States')")
    parser.add_argument("--output", "-o", default="results", help="Output directory")
    parser.add_argument("--priority", "-p", type=int, choices=[1, 2, 3], help="Filter by priority")
    args = parser.parse_args()

    client = DataForSEOClient(API_LOGIN, API_PASSWORD)
    pipeline = KeywordResearchPipeline(client, args.output)

    # Filter dimensions
    dims = SEED_KEYWORDS
    if args.dimension:
        dims = {k: v for k, v in dims.items() if k == args.dimension}
    if args.priority:
        dims = {k: v for k, v in dims.items() if v["priority"] == args.priority}

    # Filter locations
    locs = LOCATIONS
    if args.location:
        locs = [l for l in locs if l["location_name"] == args.location]

    pipeline.run(dims, locs)

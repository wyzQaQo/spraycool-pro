# MistGuard Pro — DataForSEO 关键词调研脚本

## 安装依赖

```bash
cd scripts
pip install -r requirements.txt
```

## 运行方式

### 1. 全量跑（所有维度 × 所有地区）

```bash
python keyword_research.py
```

⚠️ **注意**：这会消耗较多 API 额度。建议先用单维度测试。

### 2. 只跑高优先级词（推荐首次运行）

```bash
python keyword_research.py -p 1
```

### 3. 只跑某个维度

```bash
# 产品词
python keyword_research.py -d product

# 酒店场景
python keyword_research.py -d application_hotel

# 问题词（高转化）
python keyword_research.py -d problem

# 地区词（美国）
python keyword_research.py -d location_us
```

### 4. 指定地区

```bash
# 只跑美国
python keyword_research.py -l "United States"

# 只跑阿联酋
python keyword_research.py -l "United Arab Emirates"
```

### 5. 组合过滤

```bash
# 高优先级 + 美国
python keyword_research.py -p 1 -l "United States"
```

---

## 输出文件说明

运行后会在 `results/` 目录生成：

```
results/
├── raw/                          # 原始 API 返回（每关键词一个 JSON）
├── page_templates/               # AI 页面结构模板（H1-H4 + LSI）
├── keywords.json                 # 完整关键词数据库
├── keyword_universe.csv          # 可导入 Excel / Notion
├── page_manifest.json            # 可直接用于 AI 批量生成页面
└── summary.json                  # 统计摘要
```

### 关键文件

| 文件 | 用途 |
|------|------|
| `keywords.json` | 每个种子词的完整数据：相关搜索、问题、LSI词、排名域名 |
| `keyword_universe.csv` | Excel 表格，方便筛选和排序 |
| `page_manifest.json` | **最重要的文件**，直接交给 AI 生成页面 |
| `page_templates/*.json` | 每个关键词的 H1-H4 结构 + LSI 嵌入建议 |

---

## page_manifest.json 结构

```json
[
  {
    "keyword": "hotel cooling system",
    "slug": "hotel-cooling-system",
    "dimension": "application_hotel",
    "priority": 1,
    "template_file": "results/page_templates/hotel-cooling-system.json",
    "h1": "Hotel Cooling System: Complete Guide & Solutions | MistGuard Pro",
    "related_keywords": ["hotel hvac cooling", "resort cooling", ...],
    "faq_questions": ["How much does a hotel cooling system cost?", ...],
    "lsi_terms": ["outdoor comfort", "evaporative cooling", ...]
  }
]
```

这个文件可以直接用于下一步：
- **AI 批量生成页面**：把 manifest 丢给 AI，自动生成几百个页面
- **内容规划**：按维度分组，制定发布日历
- **内链矩阵**：相关关键词之间自动建立内链

---

## 脚本工作原理

1. **提交 SERP 任务** → DataForSEO 抓取 Google 搜索结果
2. **轮询获取结果** → 等待任务完成（通常 10-30 秒）
3. **提取数据**：
   - 排名前 20 的页面标题/描述
   - Google Related Searches（相关搜索）
   - People Also Ask（相关问题）
4. **LSI 语义分析** → 从排名页面提取高频语义词
5. **生成页面模板** → 自动构建 H1-H4 结构
6. **导出结构化数据** → JSON + CSV + Manifest

---

## 扩展：批量生成页面

拿到 `page_manifest.json` 后，可以用以下提示词让 AI 批量生成页面：

```
你是一个专业的 B2B 外贸内容写手，精通户外喷雾降温行业。

请根据以下 page_manifest.json 生成 Next.js 页面代码。
每个页面要求：
1. 使用给定的 H1 和 related_keywords 自然地融入内容
2. 在正文前 100 词内嵌入前 5 个 LSI 词
3. 用 FAQ 格式回答 people_also_ask 中的问题
4. 在页面底部添加相关产品推荐内链
5. 使用服务端组件，导出 generateMetadata 注入 SEO 标签

请按优先级顺序生成，先生成 priority=1 的页面。
```

---

## DataForSEO API 额度提示

- 每个 SERP 任务消耗 1 个 credit
- 本脚本每个种子词提交 1 个任务
- 全量跑（12 维度 × 平均 8 种子词 × 1 地区）≈ 96 credits
- 建议先用 `-p 1` 跑高优先级词（约 30-40 credits）

可以在 DataForSEO 后台查看剩余额度：
https://app.dataforseo.com/account/subscription

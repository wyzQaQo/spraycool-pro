# MistGuard Pro — SEO 内容自动化流水线

完整 7 步流水线，从种子词到 Next.js 页面代码，全自动执行。

---

## 7 步流水线

```
[Step 1] Keywords Data API    → 扩词（搜索量/CPC/竞争度）
[Step 2] Labs API             → 筛词（KD 难度 < 40）
[Step 3] SERP API             → 意图分析（标题模式统计）
[Step 4] 抓取 + Python NLP    → 提取 H1/H2/LSI 语义词
[Step 5] 规则引擎             → 生成 E-E-A-T 优化大纲
[Step 6] 代码生成器           → 输出 Next.js 页面代码
[Step 7] CSV 报告             → Excel 可导入的页面清单
```

---

## 安装

```bash
cd scripts
pip install -r requirements.txt
```

只有 `requests` 一个依赖，不需要 spaCy、BeautifulSoup、openpyxl。

---

## 使用方法

### 1. 测试模式（不调用 API，验证结构）

```bash
python seo_automation.py --dry-run
```

### 2. 跑单个维度（推荐首次运行）

```bash
# 产品词
python seo_automation.py -d product

# 酒店场景
python seo_automation.py -d application_hotel

# 问题词（高转化）
python seo_automation.py -d problem
```

### 3. 只跑高优先级词

```bash
python seo_automation.py -p 1
```

### 4. 指定地区

```bash
# 美国（默认）
python seo_automation.py -l "United States"

# 阿联酋
python seo_automation.py -d application_hotel -l "United Arab Emirates"

# 沙特
python seo_automation.py -d location_gulf -l "Saudi Arabia"
```

### 5. 全量跑（消耗较多 API credits）

```bash
python seo_automation.py
```

---

## 输出目录结构

```
results/seo_automation/
├── pages/                    # 生成的 Next.js 页面代码 (*.tsx)
│   ├── product/
│   ├── application_hotel/
│   ├── problem/
│   └── ...
├── outlines/                 # 每个关键词的完整大纲 (JSON)
├── serp/                     # SERP 原始数据 (JSON)
├── scraped/                  # 抓取的 Top 页面内容 (JSON)
├── seo_report.csv            # Excel 可导入的报告
└── manifest.json             # 页面部署清单
```

---

## E-E-A-T 策略（内置）

每个生成的页面自动包含：

| E-E-A-T 要素 | 实现方式 |
|-------------|---------|
| **Expertise** | 技术参数段落、工程标准引用、产品规格表 |
| **Experience** | 真实案例板块、安装前后对比、客户评价 |
| **Authority** | 3200+ 项目数据、9年经验、ISO/CE/UL 认证展示 |
| **Trust** | 工厂直供、2年质保、24/7 技术支持、Schema.org Article 标记 |

### Schema.org 结构化数据

每个页面自动注入：
- `Article` Schema（作者 = MistGuard Pro Organization）
- `FAQPage` Schema（从 People Also Ask 提取）
- `BreadcrumbList`（面包屑导航）
- `Organization`（发布者信息）

---

## 页面类型对应路由

| Page Type | 生成路径 | 示例 |
|-----------|---------|------|
| `product_detail` | `products/{slug}` | `/products/misting-system` |
| `application` | `applications/{slug}` | `/applications/hotel-cooling-system` |
| `problem` | `problems/{slug}` | `/problems/how-to-cool-outdoor-patio` |
| `location` | `locations/{slug}` | `/locations/outdoor-cooling-system-texas` |
| `industry` | `industries/{slug}` | `/industries/hospitality-cooling-solutions` |

---

## API 费用估算

| 步骤 | API | 单次费用 | 每维度估算 |
|------|-----|---------|-----------|
| 扩词 | Keywords Data | ~$0.05 | 12 seeds × $0.05 = $0.60 |
| 筛词 | Labs KD | ~$0.02 | 1 次批量查询 = $0.02 |
| SERP | SERP API | ~$0.01 | 5 个词 × $0.01 = $0.05 |
| **合计** | | | **~$0.67 / 维度** |

12 个维度全跑 ≈ **$8-10**（美国地区）

---

## 部署生成的页面

### 1. 复制页面到项目

```bash
# 查看 manifest
cat results/seo_automation/manifest.json

# 复制到项目（示例）
cp results/seo_automation/pages/application_hotel/*.tsx \
   ../src/app/[locale]/applications/
```

### 2. 填充 AI 内容占位

生成的页面中有 `[AI生成内容占位]` 标记，需要：

1. 打开 `outlines/{slug}.json` 查看 LSI 词和要点
2. 用 Claude/GPT 按大纲生成正文
3. 替换占位符

或者使用批量生成提示词：

```
根据以下大纲生成 SEO 文章正文：
- 关键词: {keyword}
- 页面类型: {page_type}
- LSI词: {lsi_bigrams}
- 要点: {points}
- 字数: {word_count}

要求：
1. 语言自然，不堆砌关键词
2. LSI词自然融入句子
3. 每段不超过4句
4. 包含具体数据和技术细节（体现 Expertise）
5. 引用真实案例（体现 Experience）
6. 提及认证和项目数量（体现 Authority & Trust）
```

---

## 与上一版脚本的区别

| 功能 | `keyword_research.py` | `seo_automation.py`（本版） |
|------|----------------------|---------------------------|
| 目的 | 调研关键词数据 | 生成可部署的页面代码 |
| 输出 | 关键词清单 + 报告 | Next.js 页面 + 大纲 + 报告 |
| E-E-A-T | ❌ 无 | ✅ 内置完整策略 |
| Schema | ❌ 无 | ✅ Article + FAQ + Breadcrumb |
| 页面类型 | ❌ 无 | ✅ 5 种页面类型自动路由 |
| 内容生成 | ❌ 仅结构 | ✅ 带 AI 占位符的完整页面 |
| API 依赖 | dataforseo-client（可能有问题） | 纯 requests（稳定） |
| 外部依赖 | 多（spaCy, BS4, openpyxl） | 仅 requests |

---

## 建议工作流

```bash
# 第1步：调研关键词（用上一版脚本）
python keyword_research.py -p 1 -l "United States"

# 第2步：人工审核 keyword_universe.csv，标记要做哪些词
# 在 CSV 中加一列 "approved" = yes/no

# 第3步：生成页面（用本版脚本）
python seo_automation.py -d product -l "United States"
python seo_automation.py -d application_hotel -l "United States"

# 第4步：AI 填充内容
# 把 outlines/*.json 丢给 Claude，批量生成正文

# 第5步：复制到项目 + 构建验证
# cp pages/* ../src/app/[locale]/.../
# cd .. && npx next build
```

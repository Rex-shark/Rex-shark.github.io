---
slug: threads-bot
name: ThreadsBot
tagline: 本地 LLM 自動爬新聞、改寫並發布到 Threads
status: 已完成
category: Backend / Automation
github: https://github.com/Rex-shark/ThreadsBot
demo: null
route: /projects/threads-bot
---

# ThreadsBot

> 此文件為 subagent 製作靜態介紹頁的權威資料來源。撰寫頁面時請以本檔內容為準，**不得自行編造數據或功能**。
> 標註 `（待補）` 的欄位請保留原樣或在頁面上顯示佔位提示。

---

## 一句話說明

用本地 LLM（Ollama）自動爬取新聞、改寫成社群貼文，並發布到 Threads，全程不依賴付費 AI API。

## 解決的問題

個人想經營 Threads 但沒時間每天找題材、寫貼文。市面上的自動化方案多半綁定 OpenAI / Claude API，長期成本高、且內容受 API 政策約束。ThreadsBot 走完全本地化路線，把資料、模型、發布流程都收在自己機器上，免月費、可離線運作、Prompt 也能完全自訂。

## 適合誰用

- 想嘗試 **本地 LLM（Ollama）** 做實用自動化的開發者
- 學習 **Spring AI** 整合本地模型的後端工程師
- 對 **WebMagic 爬蟲 + JPA + 排程** 全鏈路範例有興趣的人
- 想把 Threads 當內容自媒體經營、又不想付 AI API 費的個人

---

## 核心流程

```
自由時報 / TechCrunch
        ↓  WebMagic 爬蟲
   crawl_article (DB)
        ↓  Spring AI + Ollama (gemma4:e4b)
  ai_generated_post (DB)
        ↓  Threads Graph API（兩階段發布）
       Threads 貼文
        ↓
  post_publish_log (DB)
```

三個階段彼此解耦，皆可獨立透過 REST API 手動觸發或排程執行：

1. **爬蟲階段**：定時抓取自由時報、TechCrunch 新聞，去重後寫入 `crawl_article`（PENDING）。
2. **AI 改寫階段**：取出 PENDING 文章丟給 Ollama，依 Prompt 改寫為 Threads 風格貼文（500 字內），結果寫入 `ai_generated_post`（DRAFT）。
3. **發文階段**：取出 DRAFT 文章呼叫 Threads Graph API 兩階段發布（建立 Container → 正式發布），結果寫入 `post_publish_log`。

---

## 技術棧

| 分層 | 技術 |
|------|------|
| 語言 / 框架 | Java 21、Spring Boot 3.5.9 |
| AI | Spring AI 1.1.2、Ollama（`gemma4:e4b`）、`nomic-embed-text-v2-moe` |
| 爬蟲 | WebMagic 1.0.3、Jsoup 1.21.2 |
| 資料庫 | PostgreSQL 14+、Spring Data JPA、Hibernate |
| 工具庫 | Lombok、Spring Retry、Spring Scheduling、Spring Validation |
| 外部 API | Threads Graph API v1.0 |
| 建置 | Maven Wrapper（mvnw） |

### 卡片用 badge 顏色（給設計參考）

| Tag | 建議色 |
|------|--------|
| Java 21 | `#B07219` |
| Spring Boot 3.5 | `#6DB33F` |
| Spring AI | `#6DB33F` |
| Ollama | `#000000` |
| WebMagic | `#5B8DEF` |
| PostgreSQL | `#336791` |
| Threads API | `#000000` |

---

## 主要功能（用於頁面 Feature 區塊）

### 1. 多來源新聞爬蟲
- **說明**：以 WebMagic + Jsoup 解析自由時報、TechCrunch，支援 `scan-range`、`max-articles` 控制掃描深度。
- **去重**：以 `source_url` 唯一鍵避免重複入庫。
- **觸發方式**：REST API 手動觸發 + 可開關 cron 排程。
- **icon 建議**：`Newspaper` / `Globe`

### 2. 本地 LLM 文章改寫
- **說明**：透過 Spring AI 串接本機 Ollama，用 `gemma4:e4b` 把長新聞改寫為 500 字內的 Threads 貼文，全程不出機器。
- **可調參數**：temperature、top-k、top-p、repeat-penalty、keep-alive。
- **可靠性**：整合 Spring Retry，失敗自動重試（預設 3 次、間隔 5 秒）。
- **icon 建議**：`Sparkles` / `Bot`

### 3. Threads 兩階段發布
- **說明**：依 Threads Graph API 規範，先建立 media container 再正式發布，回傳 `media_id` 作為外部追蹤 ID。
- **狀態追蹤**：成功與失敗都寫入 `post_publish_log`，包含錯誤訊息可供排查。
- **icon 建議**：`Send` / `Share2`

### 4. 排程與開關控制
- **說明**：爬蟲、AI 生成各有獨立的 cron 與 enabled 開關，透過 `@ConditionalOnProperty` 控制是否註冊。
- **預設**：開發階段全部關閉，正式上線再依需求啟用。
- **icon 建議**：`Clock` / `CalendarClock`

### 5. 完整資料留痕
- **說明**：三張表（`crawl_article`、`ai_generated_post`、`post_publish_log`）形成完整審計鏈，從原文 → AI 改寫 → 發布結果都可回溯。
- **icon 建議**：`Database` / `History`

---

## API 端點（用於頁面 API 區塊）

| Method | 路徑 | 說明 |
|--------|------|------|
| POST | `/api/crawler/ltn/execute` | 觸發自由時報爬蟲 |
| GET | `/api/crawler/ltn/status` | 查詢自由時報爬蟲狀態 |
| POST | `/api/crawler/techcrunch/execute` | 觸發 TechCrunch 爬蟲 |
| POST | `/api/ai-generation/execute` | 觸發 AI 改寫一篇 PENDING 文章 |
| GET | `/api/ai-generation/pending-count` | 查詢待 AI 處理文章數 |
| POST | `/api/threads-publish/execute` | 自動挑一篇 DRAFT 發布到 Threads |
| POST | `/api/threads-publish/{aiPostId}` | 指定 AI 文章 ID 發布 |
| GET | `/api/threads-publish/pending-count` | 查詢待發布文章數 |

**Method 配色建議**：GET `#3B82F6`、POST `#10B981`、PUT `#F59E0B`、DELETE `#EF4444`

---

## 資料模型摘要

三張核心資料表：

- **`crawl_article`**：爬蟲原始文章（status：PENDING / PROCESSED / FAILED）
- **`ai_generated_post`**：AI 改寫後貼文（status：DRAFT / PUBLISHED / FAILED）
- **`post_publish_log`**：每次發布結果（status：PENDING / SUCCESS / FAILED）

關聯：`crawl_article 1—N ai_generated_post 1—N post_publish_log`，刪除上層會 cascade 下層。

> 完整 ERD 與欄位定義可參考原專案 [`spec/database-schema.md`](https://github.com/Rex-shark/ThreadsBot)。頁面若要呈現 ERD，可放精簡版三表關聯圖。

---

## 環境需求

| 工具 | 版本 |
|------|------|
| Java | 21+ |
| Maven | 3.9+（內建 mvnw，無需手動安裝） |
| PostgreSQL | 14+ |
| Ollama | 最新版 |
| Threads 開發者帳號 | 需取得長期 Access Token |

---

## 快速開始（頁面用精簡四步）

1. **安裝 Ollama 並拉模型**
   ```bash
   ollama pull gemma4:e4b
   ```
2. **建立資料庫**
   ```sql
   CREATE DATABASE my_db_threads_bot;
   ```
3. **設定環境**
   ```bash
   cp src/main/resources/application-dev.yaml.example src/main/resources/application-dev.yaml
   # 編輯填入 DB 帳密、Threads Access Token 與 User ID
   ```
4. **啟動**
   ```bash
   ./mvnw spring-boot:run
   # http://localhost:8080
   ```

> 完整手把手步驟（含 Meta 開發者帳號、Threads Token 取得流程、API 觸發示範、排程啟用）已寫成長文教學，見下方「延伸閱讀」。Showcase 頁面**只放精簡四步**避免畫面過長。

---

## 延伸閱讀 / 長文教學

原專案 docs 底下另有一份完整教學文章：

- **檔案**：[`ThreadsBot/docs/local-llm-threads-tutorial.md`](https://github.com/Rex-shark/ThreadsBot/blob/master/docs/local-llm-threads-tutorial.md)
- **性質**：手把手部落格教學，11 張步驟截圖建議，從 0 到發出第一篇 Threads 貼文。
- **未來規劃**：搬到本網站 `/blog` 後，showcase 頁面 CTA 改連到本站文章。

**頁面整合方式**（給 subagent）：
- 在 ThreadsBot 頁面尾段加一個「想自己做一個？」CTA 區塊，連到該教學文章。
- **不要**把教學內容複製進 showcase 頁面，避免兩處同步維護。

---

## 設計亮點 / 可在頁面強調的 Why

- **零 API 成本**：核心改寫工作走本地 Ollama，沒有月費、沒有 token 帳單。
- **完整可審計**：三表結構保留「原文 → AI 文 → 發布結果」全鏈路，問題可追溯。
- **可關可開**：每個階段有獨立 enabled / cron，可以只開爬蟲、只開 AI、或全自動。
- **Spring 生態整合**：示範 Spring AI、WebMagic、Spring Retry、Scheduling、JPA 在單一專案中協作的方式。
- **Prompt 自主可調**：Prompt 全在自己 codebase，可隨時為個人風格微調，不受第三方平台政策影響。

---

## 已知限制 / 誠實揭露

- **Threads 不支援自動定時發文**：發文步驟目前需手動觸發，或自行包一層排程，不保證 Threads 平台一定接受。
- **Token 期限**：Threads 長期 Token 約 60 天需手動換發。
- **模型 context 上限**：原文太長會超出 `gemma4:e4b` context window，需自行截斷或換大模型（如 `gemma3:27b`）。
- **schema 採用 `ddl-auto: update`**：適合個人專案，正式環境建議改 Flyway / Liquibase。

---

## 連結

- **Source code**：https://github.com/Rex-shark/ThreadsBot
- **Demo / Live**：（待補：目前無公開 demo，可放實際發出的 Threads 貼文連結）
- **相關文章**：（待補：若 Rex 之後寫成技術文章，連結補在這裡）

---

## 視覺資產（已備齊）

> 原始檔位於 [`spec/projects/img/`](./img/)，subagent 製作頁面時請執行：
> 1. 建立 `public/projects/threads-bot/` 目錄
> 2. 將下列檔案**複製並改名為英文 kebab-case**（避免中文檔名造成部署問題）
> 3. 在頁面以 `<img src="/projects/threads-bot/<name>.png">` 引用

| # | 來源檔 | 改名為 | 用途 / 位置 | 備註 |
|---|---|---|---|---|
| 1 | `img/發文成果圖.PNG` | `hero-threads-post.png` | ⭐ Hero 旁或頁尾「成果」區塊 | 手機豎版 Threads 實際貼文，最強成果證明 |
| 2 | `img/ollama回應.png` | `ollama-response.png` | 「本地 LLM 文章改寫」功能卡片旁 | 終端機 `curl /api/generate` 回應截圖 |
| 3 | `img/DB資料圖.png` | `db-records.png` | 「資料模型摘要」段落 | `crawl_article` 表實際資料列 |
| 4 | `img/流程圖.md` | （直接內嵌 mermaid） | Overview / 流程區塊 | 見下方「架構流程圖」 |

### 架構流程圖（mermaid 已提供）

完整定義見 [`img/流程圖.md`](./img/流程圖.md)。subagent 在頁面渲染時有兩個選擇：

- **選項 A（推薦）**：用 [`mermaid`](https://www.npmjs.com/package/mermaid) npm 套件動態渲染（已能掌握 dark mode、響應式）。
- **選項 B**：用 mermaid CLI 預先轉成 SVG 放入 `public/projects/threads-bot/architecture-flow.svg`，頁面以 `<img>` 引用（建置簡單，不增加 bundle）。

**建議走選項 B**：本網站只有這一處流程圖，引入 mermaid runtime 不划算，產靜態 SVG 即可。

### 截圖樣式建議

- 三張 PNG 統一加圓角 `rounded-2xl` + 細邊框 `border-slate-200`，hover 可微微抬起。
- `hero-threads-post.png` 因為是手機豎版，建議放在 Hero 右側欄或單獨「成果」區塊置中，不要強拉滿寬以免變形。
- `db-records.png`、`ollama-response.png` 屬於螢幕截圖，可加 macOS 視窗框裝飾或保持原樣。

---

## 給 subagent 的頁面製作指引

- **頁面路由**：`/projects/threads-bot`，元件位於 `src/pages/projects/ThreadsBot.tsx`。
- **參考既有範例**：[`src/pages/projects/SpringBootApiDemo.tsx`](../../src/pages/projects/SpringBootApiDemo.tsx) 的版型與動畫節奏可直接沿用，再依本專案氣質調整。
- **頂部導覽**：返回連結指向 `/styles/finalist`，右側保留 GitHub 連結。
- **不可編造**：所有數字（stars、forks）目前**不放假數據**，沒資料就移除該區塊或顯示 `—`。
- **文案語氣**：繁體中文（台灣用語），跟 SpringBootApiDemo 同調，技術詞彙保留原文。
- **避免外部 Google Fonts**：沿用系統字體 + JetBrains Mono（已在 SpringBoot 範例中載入過）。

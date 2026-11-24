# 個人網站開發計畫

## 專案目標

Rex 的個人網站（`rex-shark.github.io`）。**正式首頁採用 Finalist 風格**（白底 indigo/violet、3D Tilt 卡片、好文分享、文章分類篩選），位於 `/`。原本的多風格導覽頁（StyleGallery）作為「設計實驗室」保留於 `/gallery`，可從首頁連入觀賞其餘 23 種設計風格。

---

## 架構規劃

### 路由結構

使用 **BrowserRouter**（SEO Lv2 已從 HashRouter 遷移；GitHub Pages 的 SPA 路由由 `public/404.html` redirect + `index.html` 還原腳本解決，並相容舊 `#/path` 連結）：

```
/                                       → 首頁：撲克牌桌（src/pages/home/；2026-11-17 起）
/classic                                → 經典版首頁（Finalist，原正式首頁）
/gallery                                → 設計實驗室（StyleGallery，含 23 種設計實驗）
/styles/<風格路由名>                     → 各風格首頁（23 種）
/styles/finalist                        → 同經典版元件（向下相容，避免已分享連結失效）
/projects/threads-bot                   → ThreadsBot showcase
/projects/ai-chatroom                   → ai-chatroom showcase
/projects/rpgmaker-character-forge      → RPG Maker Character Forge showcase
/projects/drama-3                       → Drama 3 TTS 工作台 showcase
/projects/fishing-work                  → fishing-work showcase（強調 AI 應用）
/projects/pokemon-agent-pets            → 寶可夢牧場 Agent showcase
/projects/codex-forge                   → codex-forge showcase（私人專案，無 repo 連結）
/projects/vrm-chat-widget               → VRM Chat Widget showcase
/templates                              → 設計範本總覽（lazy 載入；首頁導覽列「設計範本」進入）
/templates/<template>?style=&device=    → 版型展示（dashboard、shop、corporate、landing；kit 為隱藏的元件總覽）
```

### 目錄結構

```
src/
├── App.tsx                          # BrowserRouter 路由設定
├── main.tsx                         # 進入點
├── index.css                        # 全域樣式與主題變數
├── pages/
│   ├── StyleGallery.tsx             # 設計實驗室（/gallery）
│   ├── styles/                      # 23 個設計實驗風格 + Finalist.tsx（正式首頁）
│   └── projects/                    # 精選專案 showcase 頁
│       ├── ThreadsBot.tsx
│       ├── AiChatroom.tsx
│       ├── RpgmakerCharacterForge.tsx
│       ├── Drama3.tsx
│       ├── FishingWork.tsx
│       └── PokemonAgentPets.tsx
├── components/
│   ├── ui/                          # shadcn/ui 元件（目前僅 button）
│   └── gallery/
│       └── StyleCard.tsx            # 風格卡片元件
└── lib/
    └── utils.ts                     # cn() + handleHashClick()

spec/                                # 資料權威來源（不放程式）
├── plan.md                          # 本檔案
├── info.md                          # Rex 個人資訊（自介、技能、聯絡）
├── article/
│   ├── data.md                      # 好文分享策展清單（已上架）
│   └── data-pending.md              # 待上架文章佇列（由 add-article skill 處理）
└── projects/                        # 精選專案介紹（每專案一個 <slug>.md）
    └── img/                         # 原始截圖 + mermaid 流程圖

docs/
└── blog/                            # 部落格草稿（待 /blog 完成後上站）

public/
├── 404.html                         # GitHub Pages SPA redirect
├── robots.txt / sitemap.xml         # SEO
└── projects/<slug>/                 # 部署用圖片（英文檔名）
```

### Subagent 架構

- **新增風格頁**：透過 `style-page-creator` subagent 執行，可並行啟動多個（分工見 `.claude/rules/style-pages.md`）
- **新增專案 showcase 頁**：使用 general-purpose agent，依 `spec/projects/<slug>.md` 製作

---

## 首頁設計

正式首頁（`/`）採用 **Finalist 風格**，內容區塊：

1. **固定導覽列**：關於 / 技能 / 專案 / 文章 / 聯絡（右上）+ 「設計實驗室」連結到 `/gallery`
2. **Hero**：自介、CTA
3. **關於**：3 張 About 卡片
4. **技能**：分後端 / 前端 / 資料庫 / AI・LLM / 系統設計
5. **精選專案**：7 張卡（見下方）
6. **好文分享**：來自 `spec/article/data.md`，含 tag 篩選
7. **聯絡**：email、GitHub
8. **Footer**

---

## 精選專案

9 個專案（8 個公開＋1 個私人），全部呈現在首頁專案區塊；23 個風格頁只列有 repo 的 8 個公開專案（`projects`），首頁讀 `featuredProjects`（含 `privateProjects`）。**已移除「系統分析設計教學」、「Spring Boot API 範例」與「Claude Code 原始碼研究」**（Spring Boot API 範例 2026-09、Claude Code 原始碼研究 2026-10 連同 showcase 頁、路由一併移除）。

| 專案 | 卡片描述 | 點擊行為 | Showcase 頁 | 狀態 |
|------|----------|----------|-------------|------|
| **個人網站** | 用 24 種不同設計風格實作的個人網站（即本站），最終選定 Finalist 為正式首頁。 | 直連 `/gallery` 觀賞其他 23 種風格 | 不做（網站本身即作品） | ✅ 完成 |
| **ThreadsBot** | 本地 LLM 自動爬新聞、改寫成 Threads 貼文，Spring Boot 3 + Spring AI + Ollama，零 API 成本。 | 進入 `/projects/threads-bot` | ✅ 已有 | ✅ 完成 |
| **ai-chatroom** | 真人與 AI 夥伴 Lumi 🐾 同房即時聊天，AI 以群組成員身分自主判斷回應或沉默，還會自己換場並生成背景圖。 | 進入 `/projects/ai-chatroom` | ✅ 已有 | ✅ 完成 |
| **RPG Maker Character Forge** | 一張行走圖生出整套 RPG Maker 角色素材（立繪 / 16 表情 face / 敵人戰鬥圖），Codex Agent + ComfyUI。 | 進入 `/projects/rpgmaker-character-forge` | ✅ 已有 | ✅ 完成 |
| **Drama 3 TTS 工作台** | 在 Apple Silicon Mac 上離線操作 Fish Audio Drama 3 語音模型：多角色劇本、聲音複製、表演標籤、串流播放。 | 進入 `/projects/drama-3` | ✅ 已有 | ✅ 完成 |
| **fishing-work** | 偽裝成 VS Code、簡報、Meet、Excel 的區網遊戲平台；繪圖比賽由本機 AI 當評審（Clef 看圖打分、gemma4 寫評語）。 | 進入 `/projects/fishing-work` | ✅ 已有 | ✅ 完成（repo 待公開） |
| **寶可夢牧場 Agent** | 讓 AI agent 的工作狀態看得見的 3D 桌寵：每個 Claude Code／Codex session 認養一隻寶可夢。 | 進入 `/projects/pokemon-agent-pets` | ✅ 已有 | ✅ 完成（repo 待公開） |
| **codex-forge** 🔒 | 把 AI 技術顧問接進需求討論群聊：擁有者 @小助手Lumi，Codex CLI 讀完整段討論與附件回覆；另有 Claude Code 驅動的 Live2D 貓。 | 進入 `/projects/codex-forge`（卡片顯示「私人專案」，不放 repo 連結） | ✅ 已有 | ✅ 完成（私人專案） |
| **VRM Chat Widget** | 會聊天、會說話、有表情的 3D 虛擬角色：本機 Ollama 對話、TTS 語音與對嘴、whisper.cpp 語音輸入；舞台版與可嵌入網頁的泡泡版。 | 進入 `/projects/vrm-chat-widget` | ✅ 已有 | ✅ 完成 |

---

## 設計實驗室（`/gallery`）

原 StyleGallery 改造為「設計實驗室」：

- **入口**：首頁右上角導覽列、Footer，或首頁底部加一個「想看其他設計風格？」CTA
- **內容**：保留 23 張風格預覽卡（不含 Finalist，因為它已是正式首頁）
- **頁面文案調整**：標題從「選擇你喜歡的設計風格」改為「設計實驗室」，副標寫明風格數（目前「23 種設計風格實驗」，新增風格時同步），定位為作品/實驗，不再是「決定風格」的選擇器
- **返回入口**：各風格頁面頂部「返回」連結從 `/` 改為 `/gallery`

---

## 風格頁面清單

每個風格頁面皆包含：固定導覽列、Hero（含 `/me.png`）、技能區塊、專案區塊、聯絡區塊、Footer。

| #  | 風格 | 路由 | 視覺特色 | 狀態 |
|----|------|------|----------|------|
| 1  | 簡約商務 | `/styles/minimal-business` | 黑白灰 + 藍色強調、Archivo + Space Grotesk | ✅ 完成 |
| 2  | 手繪插圖 | `/styles/hand-drawn` | 米白紙張、Caveat + Kalam、素描線條 | ✅ 完成 |
| 3  | 賽博龐克 | `/styles/cyberpunk` | 黑底霓虹、Orbitron + JetBrains Mono、掃描線 | ✅ 完成 |
| 4  | 極簡日式 | `/styles/japanese-minimal` | 暖紙底色、圓相裝飾、侘寂美學 | ✅ 完成 |
| 5  | 蒸氣波 | `/styles/vaporwave` | 紫粉漸層、透視網格、80 年代復古 | ✅ 完成 |
| 6  | 蒸汽龐克 | `/styles/steampunk` | 深棕銅色、齒輪裝飾、黃銅銘牌（壓力錶僅作裝飾，不代表數值） | ✅ 完成 |
| 7  | 蘋果風格 | `/styles/macbook` | 毛玻璃、macOS 視窗裝飾、Apple 設計語言 | ✅ 完成 |
| 8  | 瑞士現代主義 | `/styles/swiss-modern` | 黑白紅三色、12 欄網格、Inter + IBM Plex Mono | ✅ 完成 |
| 9  | 像素藝術 | `/styles/pixel-art` | 深藍黑底螢光綠、Press Start 2P、CRT 掃描線 | ✅ 完成 |
| 10 | 柔和UI進化版 | `/styles/soft-ui` | Neumorphism 凸起凹陷陰影、粉彩色系、Nunito + Poppins | ✅ 完成 |
| 11 | 玻璃態 | `/styles/glassmorphism` | 深藍紫漸層、backdrop-blur 毛玻璃卡片、光暈球裝飾 | ✅ 完成 |
| 12 | 黏土態 | `/styles/claymorphism` | 充氣膨脹感、inset 陰影高光、Fredoka One 圓潤字型 | ✅ 完成 |
| 13 | 微互動 | `/styles/micro-interactions` | Ripple 按鈕、3D Tilt 卡片、彈跳 Tag、底線滑入導覽 | ✅ 完成 |
| 14 | 便當盒網格 | `/styles/bento-grid` | 非對稱 CSS Grid、深色底多彩卡片、Apple WWDC 風格 | ✅ 完成 |
| 15 | 空間 UI | `/styles/spatial-ui` | visionOS 玻璃態懸浮面板、星點背景、冰藍光暈、3D Tilt 卡片 | ✅ 完成 |
| 16 | 反精緻美學 | `/styles/anti-polish` | Brutalist 粗礦、噪點划痕、螢光黃撞血紅、Anton 字型 | ✅ 完成 |
| 17 | IDE / 終端機 | `/styles/ide-terminal` | VS Code 編輯器介面、語法高亮、檔案總管側欄 | ✅ 完成 |
| 18 | 無障礙倫理設計 | `/styles/accessible-ethical` | 以 WCAG 2.1 AA 為目標的高對比、Atkinson Hyperlegible 字型、完整 focus 狀態 | ✅ 完成 |
| 19 | GitHub 開發者檔案 | `/styles/github-profile` | GitHub Primer Dark、Pinned Repos、README 區塊、技術棧 badge | ✅ 完成 |
| 20 | AI 原生介面 | `/styles/ai-native` | Agent 對話介面：寫死腳本的逐字串流、tool call 卡片呈現專案、快捷 chip（不接 LLM、無自由輸入）、中性底 + AI 紫 `#6366F1`（ui-ux-pro-max #43） | ✅ 完成 |
| 21 | 雜誌編輯排版 | `/styles/editorial` | 一期雜誌專題：封面期號、首字放大、襯線內文多欄、pull quote、figure/figcaption、米白紙底 + 墨綠 `#1F4E3C`、Fraunces + Newsreader（ui-ux-pro-max #66） | ✅ 完成 |
| 22 | 玻璃態・粉紅版 | `/styles/glassmorphism-pink` | 沿用 #11 版型：背景改深梅紅漸層、光暈球與主漸層改粉紅→蜜桃、玻璃卡片帶微粉色調、模糊略加強 | ✅ 完成 |
| 23 | 柔和UI・加強版 | `/styles/soft-ui-pro` | 沿用 #10 版型：主色改青綠 `#2A9D8F`、經典 `#E0E5EC` 底 + `#A3B1C6` 深陰影、陰影距離加大、凸起面加 145° 漸層、主按鈕漸層，更立體 | ✅ 完成 |
| ⭐  | **Finalist → 正式首頁** | `/`（兼容 `/styles/finalist`） | 白底 indigo/violet、3D Tilt、好文分享、文章篩選 | ✅ 升級為首頁 |

**20、21 驗收標準**：資料全部 import `profile.ts`（不編造）、與既有 19 頁有明顯視覺差異、手機到桌面可用、`npm run build` 與 `npm run lint` 通過；整合後同步 `App.tsx`、`StyleGallery.tsx`（卡片 + 預覽縮圖）、`sitemap.xml`、本表與「19 種」相關文案。

---

## 精選專案 showcase 頁

依據 `spec/projects/<slug>.md` 製作。

| 專案 | 路由 | 資料來源 | 狀態 |
|------|------|----------|------|
| ThreadsBot | `/projects/threads-bot` | [spec/projects/threads-bot.md](projects/threads-bot.md) | ✅ 完成 |
| ai-chatroom | `/projects/ai-chatroom` | [spec/projects/ai-chatroom.md](projects/ai-chatroom.md) | ✅ 完成（spec + 8 截圖 + 首頁卡片 + showcase 頁；2026-10-19 依 README 更新） |
| RPG Maker Character Forge | `/projects/rpgmaker-character-forge` | [spec/projects/rpgmaker-character-forge.md](projects/rpgmaker-character-forge.md) | ✅ 完成（spec + 3 截圖 + 首頁卡片 + showcase 頁） |
| Drama 3 TTS 工作台 | `/projects/drama-3` | [spec/projects/drama-3.md](projects/drama-3.md) | ✅ 完成（spec + 2 截圖 + 首頁卡片 + showcase 頁；配色沿用該專案的「紙張與墨」） |
| fishing-work | `/projects/fishing-work` | [spec/projects/fishing-work.md](projects/fishing-work.md) | ✅ 完成（spec + 9 截圖 + 首頁卡片 + showcase 頁；頁面主軸為 AI 應用；配色沿用該專案的 VS Code Dark+） |
| 寶可夢牧場 Agent | `/projects/pokemon-agent-pets` | [spec/projects/pokemon-agent-pets.md](projects/pokemon-agent-pets.md) | ✅ 完成（spec + 8 張場景地圖 + 2 張有寶可夢的實景截圖 + 首頁卡片 + showcase 頁；泡泡狀態另以網頁元件重繪圖例） |
| codex-forge 🔒 | `/projects/codex-forge` | [spec/projects/codex-forge.md](projects/codex-forge.md) | ✅ 完成（spec + 15 截圖 + 首頁卡片 + showcase 頁；私人專案不放連結；配色沿用該專案前台的「紙偶定格」） |
| VRM Chat Widget | `/projects/vrm-chat-widget` | [spec/projects/vrm-chat-widget.md](projects/vrm-chat-widget.md) | ✅ 完成（spec + 4 截圖 + 牌桌卡（卡圖 Codex 生成）+ showcase 頁；截圖角色為 VRoid Project 的 AvatarSample_A，圖說皆註明） |

---

## 資料權威來源（Single Source of Truth）

所有「會被多處使用」的內容統一存放在 `spec/`。詳細規則見 [CLAUDE.md](../CLAUDE.md) 與 `.claude/rules/`。

| 主題 | 檔案 | 用途 |
|------|------|------|
| Rex 個人資訊 | [spec/info.md](info.md) | 自介、技能、聯絡方式、職位 |
| 精選專案 | [spec/projects/](projects/) | showcase 頁面內容 |
| 好文分享 | [spec/article/data.md](article/data.md) | 首頁 Bookmarks 區塊 |

---

## 共用元件 / Helper

| 名稱 | 路徑 | 說明 | 狀態 |
|------|------|------|------|
| `cn()` | `src/lib/utils.ts` | clsx + tailwind-merge | ✅ |
| `handleHashClick()` | `src/lib/utils.ts` | 攔截 `<a href="#x">`，改用 scrollIntoView | ✅ |
| `StyleCard` | `src/components/gallery/StyleCard.tsx` | 風格卡片 | ✅ |
| `StyleGallery` | `src/pages/StyleGallery.tsx` | 設計實驗室導覽頁（`/gallery`） | ✅ |

---

## 待辦事項

### 🎯 首頁升級工程 ✅

採取精簡做法：直接修改 `Finalist.tsx`（不另建 Home.tsx），讓 `/` 與 `/styles/finalist` 共用同一元件。

- ✅ **修改 `Finalist.tsx`**
   - 頂部「返回風格選擇」改為「Rex.」品牌 + 右側「設計實驗室 →」連到 `/gallery`
   - 專案區從 4 張縮為 3 張（後續陸續新增專案、移除 Spring Boot API 範例，目前為 5 張）：移除「系統分析設計教學」；個人網站 desc 改寫並 `to: '/gallery'`
   - 移除 Hero 的「下載履歷」按鈕（避免假連結）
- ✅ **修改 `App.tsx`**
   - `/` → `Finalist`
   - `/gallery` → `StyleGallery`
   - `/styles/finalist` 保留向下相容
- ✅ **修改 `StyleGallery.tsx`**
   - 標題改為「設計實驗室」、副標「打造正式首頁前的 19 種設計風格實驗」
   - 移除 Finalist 卡片與 `FinalistPreview` 元件
   - Header 加「返回首頁」連結
- ✅ **批次修改 19 個風格頁返回鍵**
   - `to="/"` → `to="/gallery"`
   - 文案「返回風格選擇」→「返回設計實驗室」（Cyberpunk 保留 `cd ../` 風格特色）
- ✅ **build 通過 + 手動驗收路徑成立**

### 🔍 SEO 優化計畫

分三階段執行。

#### Lv1 — 基礎 meta + sitemap ✅（部署後驗證待辦）

- ✅ `<html lang>` 從 `en` 改為 `zh-Hant-TW`
- ✅ `<meta name="description">`
- ✅ **Open Graph**（og:type / url / title / description / image / locale / site_name）
- ✅ **Twitter Card**（summary_large_image）
- ✅ `<meta name="theme-color">` `#6366F1`
- ✅ `<link rel="canonical">`
- ✅ `public/robots.txt`
- ✅ `public/sitemap.xml`（初版：首頁 + gallery；Lv2 已改為無 hash 路徑）
- ✅ **JSON-LD `Person` schema**
- ⬜ 部署後用 [Open Graph Debugger](https://www.opengraph.xyz/) 驗證（需推 main 觸發 deploy）
- ⬜ 之後做 1200×630 專屬 OG 圖取代 `/me.png`

#### Lv2 — 解 HashRouter SEO 問題 ✅（部署後驗證待辦）

- ✅ `HashRouter` → `BrowserRouter`（[src/App.tsx](../src/App.tsx)）
- ✅ `public/404.html` 加 GitHub Pages SPA redirect 腳本（編碼路徑進 `?/`）
- ✅ `index.html` 加接收腳本：還原 `?/path` 路徑 + 相容舊 `#/path` hash
- ✅ `sitemap.xml` 補完 24 條路由（首頁 + gallery + 3 projects + 19 styles），全部無 hash
- ✅ `sitemap.xml` 補上後續新增的 2 條：`/projects/ai-chatroom`、`/projects/rpgmaker-character-forge`（補完後共 26 條；其後移除 spring-boot-api 為 25 條；再新增 4 個風格頁為 29 條；再新增 `/projects/drama-3` 為 30 條；移除 `/projects/claude-code-sourcemap` 為 29 條；再新增 `/projects/fishing-work`、`/projects/pokemon-agent-pets` 為 31 條；再新增 `/projects/codex-forge` 為 32 條；再新增 `/projects/vrm-chat-widget`，精選專案與風格頁部分現為 33 條，另有設計範本 5 條）
- ✅ react-router 的 `<Link to="/xxx">` 不需改（自動跟 BrowserRouter 工作）
- ⬜ **部署後驗證**：
  - 直接訪問 `https://rex-shark.github.io/projects/threads-bot` 應正常顯示頁面（不是 404）
  - 訪問舊 hash URL `https://rex-shark.github.io/#/styles/finalist` 應 redirect 到 `/styles/finalist`
  - GSC 重新提交 sitemap.xml 後應顯示 36 個已發現網址（含設計範本 5 條）

#### Lv3 — 預先渲染 ⬜（重工程，視 SEO 需求再評估）

- ⬜ 引入 vite-plugin-prerender 或改 SSG 方案
- ⬜ 每個路由 build 成獨立 HTML（含完整 title、description、OG）
- ⬜ 為主要頁面做專屬 OG 圖（首頁、ThreadsBot、Drama 3）

### 🧹 Claude 設定精簡 ✅

CLAUDE.md 與 subagent 是專案早期寫的，內容冗長且互相重複。改採漸進式披露。

- ✅ `CLAUDE.md` 精簡為核心指引（概述、指令、路由總覽、規則索引）
- ✅ 主題規則拆到 `.claude/rules/`（`paths:` frontmatter，讀到對應檔案才載入）：
  `frontend.md`、`routing.md`、`style-pages.md`、`project-pages.md`、`articles.md`、`personal-info.md`
- ✅ subagent 重寫：移除與 CLAUDE.md / rules 重複的內容與硬編碼個資，改為引用
- ✅ subagent 權限：拿掉 `bypassPermissions`；所需指令改列在共享的 `.claude/settings.json` allowlist
- ✅ `add-article` skill 內對 CLAUDE.md 章節的引用改指向 `.claude/rules/articles.md`
- ✅ 驗收：CLAUDE.md 167 → 68 行；agents 290 → 105 行；subagent 無 `bypassPermissions`；無殘留的失效引用

### 🧪 設計實驗室資料去假化 + AI 技能 ✅

19 個風格頁是早期產物，個人資料多為當時編造。目標：**每個數字、每個名詞都能在 `spec/` 找到出處**，並補上 AI 相關技能。

#### 盤點結果（2026-09）

| 類別 | 範圍 | 處置 |
|---|---|---|
| 三張舊專案卡（含已移除的「系統分析設計教學」），連結全指向 GitHub 個人首頁 | 19 頁 | 換成真實 5 專案 |
| 技能熟練度百分比 / 等級（Java 92%、EXPERT…） | HandDrawn、SwissModern、Steampunk、Macbook、AntiPolish、Cyberpunk（公式算的） | 移除，改為純技能標籤（決策 B） |
| 假 stars | MicroInteractions（12/28/19）、GithubProfile（3/12/7） | 移除 |
| GitHub 假數據：22 followers / 8 following、語言比例、演算法生成的貢獻熱力圖、不存在的 repo 名 | GithubProfile + StyleGallery 預覽縮圖 | 全部移除（決策 C） |
| 無出處的技能：MySQL、Linux、Nginx、MapStruct、Swagger/OpenAPI、需求分析 | 8 頁 + IdeTerminal | 移除（Redis、Vite、Java 21、Spring Boot 3.5、PostgreSQL 16 可由 `spec/projects/` 佐證，保留） |
| 無出處的宣稱：「Taiwan」「Open to Work / Freelance」「24 小時內回覆」「1-2 個工作天回覆」「後端架構設計師」「無障礙設計諮詢」「Blog Series」 | SwissModern、GithubProfile、IdeTerminal、AntiPolish、AccessibleEthical、SpatialUi | 僅保留 Taiwan，其餘移除（決策 D） |
| 「持續分享…實戰經驗」罐頭自介 | 約 12 頁 | 改寫為有出處的描述（做了哪些專案） |
| 缺漏：`ERD`、`UML` 幾乎沒出現；**19 頁完全沒有 AI 字詞** | 19 頁 | 補上 |
| 雜項：Footer 年份 2025、IdeTerminal 狀態列 `master*`、StyleGallery 寫 WCAG AAA 但頁內寫 AA | 多頁 | 順手修正 |

#### 做法

0. ✅ **移除「Spring Boot API 範例」**（Rex 決定，無公開 repo）：刪 `SpringBootApiDemo.tsx`、`App.tsx` 路由、`sitemap.xml`、Finalist 專案卡、`info.md` / README / rules 的相關記載
1. ✅ **先補 `spec/info.md`**（唯一權威來源）
   - 新增「AI / LLM」技能分類（清單見決策 A）
   - 「專案」段落由 `（待補）` 改為 5 個精選專案（標題、一句描述、tags、repo、站內路由），內容取自 `spec/projects/*.md` 與 Finalist 現況
   - 依決策 D 補上所在地 / 求職狀態，或維持 `（待補）`
2. ✅ **建立共用資料模組 `src/data/profile.ts`**：`profile`、`skillGroups`（含 AI 組）、`projects`，內容 1:1 對應 `info.md`。之後改資料只改一處，不再 20 頁各寫一份
3. ✅ **Finalist 改讀共用資料**，並加上 AI 技能組（正式首頁目前也沒有）
4. ✅ **19 頁改讀共用資料**（平行 subagent，每個只改自己那一頁；裝飾欄位如配色、旋轉角度以 index 對應留在頁內）
   - 專案卡：5 張，`to` 指向站內 showcase、`href` 指向真實 repo
   - 各頁保留自己的主題語氣（Cyberpunk 的 `> xxx.exe`、PixelArt 的 `PLAYER 1` 等裝飾字不算假資料，保留）
   - IdeTerminal：`About.java` / `skills.json` / `projects.md` 手刻內容依共用資料重寫
5. ✅ **同步**：`StyleGallery.tsx` 預覽縮圖與卡片描述、`.claude/rules/personal-info.md`（加一條「頁面資料一律 import `src/data/profile.ts`」）、`style-page-creator` agent
6. ✅ **驗收**
   - ✅ `npm run build` 通過；`npm run lint` 由 10 個既有錯誤降為 1 個（僅剩 shadcn 產生的 `button.tsx`；後續已在 `eslint.config.js` 對 `src/components/ui/` 關閉該規則，現為 0 個）
   - ✅ 20 頁瀏覽器自動檢查：假資料關鍵字 0、熟練度百分比 0、每頁 5 張專案卡 + 5 個真實 repo 連結、AI 技能組皆在、巢狀 `<a>` 0、1280px 與 375px 皆無水平溢出
   - ✅ 19 頁技能區 / 專案區逐頁截圖目視
   - 全站 grep 不到：`系統分析設計教學`、`MySQL`、`Nginx`、`followers`、`Open to Work`、`小時內回覆`、`%` 熟練度
   - 19 頁逐頁預覽：5 張專案卡可點、AI 技能組有出現、版面沒被多出的卡片撐壞

#### 決策（2026-09 Rex 確認）

- **A. AI 技能清單**：Spring AI、Ollama（本地 LLM）、Gemini API、Function Calling、RAG、Embedding / 向量資料庫、Prompt Engineering、AI Agent、MCP、Claude Code（Skills / Subagent / Hooks）、Codex、ComfyUI
- **B. 熟練度**：**完全不顯示數值**。HandDrawn、SwissModern、Steampunk、Macbook、AntiPolish、Cyberpunk 六頁的進度條 / 壓力錶 / 等級條改為純技能標籤，版面重排但保留主題外觀（例如壓力錶可留作無刻度讀數的裝飾）
- **C. GithubProfile**：**移除所有數字**（stars、followers / following、語言比例、貢獻熱力圖），不接 API；pinned repos 換成真實 repo。`StyleGallery.tsx` 的預覽縮圖與卡片描述同步拿掉熱力圖與語言統計
- **D. 個人宣稱**：只保留「所在地：Taiwan」。Open to Work / Freelance、回覆時效、「後端架構設計師」、「無障礙設計諮詢」、「Blog Series」全部移除

### 🎙 新增精選專案：Drama 3 TTS 工作台 ✅（2026-10-16）

- ✅ `spec/projects/drama-3.md`（取自 drama-3 的 README 與 spec/）、截圖複製到 `public/projects/drama-3/`
- ✅ `spec/info.md` 專案表、`src/data/profile.ts` 新增第 6 個專案；首頁與 23 個風格頁皆讀共用資料自動出現
- ✅ showcase 頁 `src/pages/projects/Drama3.tsx`、`App.tsx` 路由、`sitemap.xml`
- ✅ 原本寫死「5 張 = 3 + 2」的 9 個風格頁（Cyberpunk、AntiPolish、AccessibleEthical、GithubProfile、Macbook、Steampunk、MicroInteractions、HandDrawn、SwissModern）與 BentoGrid 改為依張數計算欄寬，之後增減專案不必再改
- ✅ 驗收：build、lint 通過；24 頁 × 1280 / 700 / 375 px 自動檢查皆有第 6 張卡與 repo 連結、網格每排排滿、無新增水平溢出
- ✅ GitHub repo `Rex-shark/drama-3` 已設為公開（2026-11-05 確認）
- ✅ 2026-11-05 依 drama-3 的 Epic 4 升級驗證（2026-11-03）更新 spec 與 showcase 頁：mlx-audio 改鎖 0.6.3、4bit / bf16 換 2026-10-29 新權重、建議預設 8bit → 4bit、中斷率表改依權重版本、三版本行程峰值 / 載入 / 倍率重測值、取樣預設 1.0 / 0.9 / top_k 不限（設計決策「清 MLX 快取」換成「top_k 不設上限」）

### 🗑 移除精選專案：Claude Code 原始碼研究 ✅（2026-10-16，Rex 決定）

- ✅ 刪除 `src/pages/projects/ClaudeCodeSourcemap.tsx`、`spec/projects/claude-code-sourcemap.md`
- ✅ 移除 `App.tsx` 路由、`sitemap.xml`（現為 29 條）、`profile.ts` / `info.md` 專案、README 記載
- ✅ BentoGrid 的專案 icon 依順序對應，同步拿掉研究筆記用的 `BookOpen`

### 💬 ai-chatroom 依 README 更新 ✅（2026-10-19）

- ✅ AI 角色更名 Luna 🌙 → Lumi 🐾（spec、showcase 頁、`profile.ts` / `info.md` 卡片描述）
- ✅ 新增「自動情境生圖」：Lumi 呼叫 `changeScene` 換場、本機 ComfyUI 生成全房共享背景（showcase 頁新增區塊 + 3 張新圖，Hero 改用新截圖）
- ✅ 情緒圖庫 89 → 109 張、15 → 16 種情緒；`sendLumiImage`、`/api/v1/lumi-images/**`；STOMP 補 `SCENE_*` 事件
- ✅ 修正：多人房不使用 `ChatMemory`（每次自 Redis 取最近 K 則歷史），原頁面寫「記憶以 roomCode 隔離」有誤
- ⬜ 重拍 4 張舊截圖（`ai-bubble`、`room-chat`、`rooms-lobby`、`luna-emotion-image`，畫面仍是 Luna 🌙），目前頁面以圖說註明「攝於更名前」

### 🐟 新增精選專案：fishing-work、寶可夢牧場 Agent ✅（2026-11-17）

- ✅ `spec/projects/fishing-work.md`、`spec/projects/pokemon-agent-pets.md`（取自兩個專案的 README、spec、plan）
- ✅ `spec/info.md` 專案表、`src/data/profile.ts` 新增第 6、7 個專案；首頁與 23 個風格頁皆讀共用資料自動出現（首頁、BentoGrid 依序配色與 icon 陣列補兩筆）
- ✅ showcase 頁 `FishingWork.tsx`（Rex 指定強調 AI 應用：Clef 評分、像不像比賽雙圖比對、gemma4 評審ミオ、容錯設計、Claude Code 多 session 分工開發）、`PokemonAgentPets.tsx`；`App.tsx` 路由、`sitemap.xml`、README
- ✅ 寶可夢牧場 Agent：8 張純場景截圖＋README 兩張有寶可夢角色的實景截圖（`map-lake-left-pets` 當 Hero、`map-snow-pets` 放泡泡狀態區；Rex 2026-11-17 決定放上），皆由透明背景 PNG 轉 WebP（保留透明、10 張共約 0.6 MB；先前轉 JPG 會把透明處填成白底）；泡泡狀態另以網頁元件重繪圖例。名稱依 Rex 2026-11-17 指示加上「Agent」
- ⬜ **部署前**把 `Rex-shark/fishing-work`、`Rex-shark/pokemon-agent-pets` 設為公開（2026-11-17 查詢皆為私有，連結對訪客會是 404）
- ✅ 卡牌組（`card-deck/`）補上兩張專案卡（2026-11-17）：`details.ts` 補文章內容（摘錄自 spec），卡圖見卡牌手牌版段落

### 🔒 新增私人專案：codex-forge ✅（2026-11-17）

Rex 指示加入但**不公開** repo。

- ✅ `spec/projects/codex-forge.md`（取自該專案 README 2026-11-17 與 `docs/project-intro.md`；數字以較新的 README 為準）。依該專案介紹文件，不寫 repo 位置、本機路徑、測試帳號、email、真實客戶名稱
- ✅ `profile.ts` 新增 `PrivateProject` 型別、`privateProjects`、`featuredProjects`（公開＋私人）；`projects` 維持只有公開專案，所以 23 個風格頁不受影響、不會出現沒有連結的 GitHub 按鈕
- ✅ 首頁 `Finalist.tsx` 改讀 `featuredProjects`：第 8 色赤陶紅；沒有 `href` 的卡片 icon 換成鎖頭、右下角顯示「私人專案」
- ✅ showcase 頁 `CodexForge.tsx`（紙偶定格配色）；15 張 WebP 截圖（取自專案 `docs/screenshots/web/`，約 1.2 MB）；`App.tsx` 路由、`sitemap.xml`、`info.md`、README
- ✅ 卡牌組（`card-deck/`）補上 codex-forge 卡（2026-11-17），見卡牌手牌版段落

### 🃏 首頁改為撲克牌桌（卡牌組併入主站）🔄（2026-11-17 開始）

Rex 2026-11-17 決定：首頁 `/` 改用撲克牌桌；原本的 Finalist 首頁轉為「經典版」備份。三層瀏覽：

```
首頁 /（牌桌）── 點場上的卡 ──▶ 簡易介紹（彈出卡，一個畫面看完）── 看完整介紹 ──▶ 詳細頁
                                                                          英雄卡 → /classic（經典版）
                                                                          設計範本 → /templates
                                                                          其他專案 → /projects/<slug>（現有頁面不動）
詳細頁按上一頁／返回首頁 → 回到牌桌，場上的牌與剛才打開的卡原樣還原（sessionStorage）
```

- ✅ 規劃與流程圖（2026-11-17，Rex 確認；由本 session 執行）
- ✅ 路由：`/` → 牌桌（`src/pages/home/Home.tsx`）；Finalist 改到 `/classic`，`/styles/finalist` 保留相容；sitemap 加 `/classic`
- ✅ 併入主站：`card-deck/src` 的元件、版面計算、卡圖與英雄卡分層素材搬到 `src/pages/home/`；`@site` 別名改回 `@/`；扭蛋小龍（已停用）不搬
- ✅ 樣式隔離：牌桌的 Tailwind token 改名 `deck-*`（原本的 `muted`、`accent` 會和 shadcn 撞名），值掛在 `.deck-root`；深淺主題改成牌桌外框的 `data-theme`，不再動 `<html>`。牌桌的動畫 keyframes、多層背景放 `src/pages/home/deck.css`（例外：這些寫成 Tailwind class 不實際）
- ✅ 簡易介紹（`components/BriefView.tsx`、`content/briefs.ts`）：取代原本的長文 InspectView。專案＝卡圖窗截圖、標題、tags、一句話（`profile.ts` desc）、3 個亮點、按鈕（看完整介紹 → / GitHub 或 🔒 私人專案）；英雄卡＝頭像、職稱、自介、聯絡、按鈕（看完整自介 → `/classic`）。3 個亮點的權威來源是各 `spec/projects/<slug>.md` 的「卡片重點」一節（個人網站沒有 spec，取自 CLAUDE.md／info.md）；長文 `details.ts` 不再使用。窄螢幕（手機）點手牌直接放上場並打開簡易介紹，不用點兩次
- ✅ 來回保留狀態：場上的牌、打開中的卡存 sessionStorage；回到牌桌時不重新發牌
- ✅ 經典版頂端加回牌桌的入口（導覽列「牌桌首頁」）；牌桌頂端只放「設計實驗室」（Rex 2026-11-17 指示拿掉頂端的「經典版」按鈕；經典版仍可從英雄卡簡易介紹的「看完整自介」進入）
- ✅ 其他頁面改 lazy 載入（風格頁、專案頁、經典版），首頁 JS 由 500 kB 以上降到約 270 kB；卡圖與英雄卡分層圖改 WebP（素材 2.6 MB → 1.0 MB）
- ✅ 驗證（2026-11-17）：桌機與 375 px 手機、鍵盤操作、深淺色、詳細頁按上一頁還原牌桌與簡易介紹、`/classic`；`npm run build`、lint 通過
- ✅ 牌組調整（2026-11-18，Rex 指示）：移除「個人網站」卡（牌桌本身就是個人網站；只從牌組濾掉，`profile.ts` 與經典版不動；刪除其卡圖與簡易介紹截圖 `personal-site.webp`），改放「設計範本」卡在英雄卡右邊，共 9 張。設計範本不在 `profile.ts` 專案清單，於 `content/cards.ts` 另定一筆（文案摘錄自 `spec/templates/README.md`：4 個版型、8 種風格、DESIGN.md；GitHub 沿用本站 repo；按鈕「進設計範本 →」到 `/templates`）；簡易介紹 3 個亮點同取自該 README，代表圖為購物網站簡約風格＋底部工具列截圖（`assets/templates.webp`，headless Chrome 1440×640）；卡圖 `cards/templates.webp`（Codex image_gen）：服裝店試衣間裡網頁造型小角色換穿 8 種風格外衣，客戶拿色票挑選、鯊魚帽設計師量身。驗證：卡面、簡易介紹、進 `/templates` 再按上一頁還原牌桌；build、lint 通過，首頁 JS 仍約 270 kB
- ✅ 設計範本卡改名「UI 設計試衣間」（2026-11-24，Rex 指示由 Claude 取名，呼應卡圖的試衣間）：只改牌卡標題與按鈕「進試衣間 →」，路由 `/templates` 與範本頁內的「設計範本」名稱不動
- ✅ 牌桌頂端移除「設計實驗室」連結（Rex 2026-11-24 指示）：頂端只剩深淺切換；設計實驗室仍可從經典版導覽列進入
- ✅ 卡片左上角圓鈕的編號改為羅馬數字（Ⅰ、Ⅱ、Ⅲ…，Rex 2026-11-23 指示；英雄卡維持 ★），簡易介紹標頭同步；`content/cards.ts` 的 `cardBadge()`
- ⬜ `card-deck/` 獨立專案的去留（併入後保留當參考，`demo/` 風格稿仍在那裡），待 Rex 決定

### ✂️ 專案頁移除「已知限制 / 誠實揭露」✅（2026-11-18）

Rex 指示：showcase 頁不再顯示「已知限制 / 誠實揭露」區塊。

- ✅ 移除 ThreadsBot、ai-chatroom、RPG Maker Character Forge、Drama 3 四頁的該區塊（前三頁原本與「設計亮點」並排，改為設計亮點單欄）
- ✅ spec 原文保留作紀錄，各節加註「頁面不顯示」
- 未動：Drama 3 的「模型會中斷」技術段落（spec 標題有「誠實揭露」字樣，但頁面上是對策與實測數據的主體內容）；fishing-work、寶可夢牧場 Agent 頁的「已知限制」區塊（標題沒有「誠實揭露」）

### 🧸 新增精選專案：VRM Chat Widget ✅（2026-11-23）

- ✅ `spec/projects/vrm-chat-widget.md`（取自該專案 README、THIRD_PARTY_NOTICES、models/README；repo 已公開）
- ✅ `profile.ts`／`info.md` 新增第 9 個專案（公開專案最後一個，codex-forge 仍排最後）；經典版與 BentoGrid 配色各補一色，codex-forge 維持赤陶紅
- ✅ showcase 頁 `VrmChatWidget.tsx`（配色取自專案畫面：淡藍天空、奶油黃、粉紅）；4 張截圖轉 WebP（舞台版、泡泡版、六表情、九動作）；`App.tsx` 路由、`sitemap.xml`、README
- ✅ 牌桌：卡圖由 Codex image_gen 生成原創插畫（`assets/cards/vrm-chat-widget.webp`，畫風參考寶可夢牧場卡），`briefs.ts` 與 spec「卡片重點」補 3 個亮點
- 截圖中的角色是第三方模型（VRoid Project 的 AvatarSample_A），頁面與簡易介紹的圖說都註明

### 🔖 首頁「好文分享」改為「優質網站分享」⬜（2026-10-26 提出）

把首頁的好文分享區換成推薦清單，收錄兩種內容：**YouTube 頻道**（名稱、連結、介紹）與**網站**（名稱、連結、介紹）。好文分享區**先保留不移除**，等新區塊上線再決定。

- ✅ 版面提案：四種版面（A 卡片牆 / B 雙欄分區 / C 精選 + 清單 / D 主題目錄），存於 [docs/design/curated-sites-layouts.html](../docs/design/curated-sites-layouts.html)（直接用瀏覽器開），線上版 https://claude.ai/artifact/W89dFtGyR7Gm1pwdoMEkNE 。提案內的頻道與網站是範例資料，不是 Rex 的推薦
- ⬜ Rex 選定版面（或混搭，例如 A 的卡片 + D 的主題分組）
- ⬜ Rex 提供頻道與網站清單
- ⬜ 建立資料來源（建議 `spec/sites/data.md`，沿用 `data.md` 格式；欄位 `type`、`name`、`url`、`intro`，選填 `handle`、`tags`、`lang`）並寫對應的 `.claude/rules` 規則
- ⬜ 實作到 `Finalist.tsx`；正式版可改用頻道頭像 / 網站 favicon 取代字母頭像
- ⬜ 決定好文分享區的去留（移除時同步 `data.md`、`data-pending.md`、`add-article` skill、`.claude/rules/articles.md`）

### 🛞 可遊玩的個人網站：坦克大地圖 🔄（2026-11-02 開始）

在 `tank-battle/` 另起一個獨立 Vite 專案從零做（不沿用現有風格，現有網站不動）：整個網站是一張大地圖，用鍵盤開坦克在 HTML 元素之間移動，敵方坦克隨機出現。

- ✅ 參考資料：4 個坦克大戰開源 repo 淺層 clone 在 `tank-battle/refs/`（不進版控）。評估結論：三個用了原版 NES 圖與音效（Namco 版權）、兩個沒有授權，**只當玩法參考，不複製程式碼與素材**
- ✅ 素材備用：Kenney Pixel Platformer Blocks（CC0）下載於 `game/assets/`，坦克頁目前沒用到
- ✅ 第一版：64×44 格大地圖（固定種子產生：磚牆可打破、鋼牆、水、草叢）、WASD / 方向鍵八方向移動 + 轉角輔助、空白鍵 / J 開火、敵人隨機生成與簡單 AI、生命與重生、HUD、小地圖、P 暫停；坦克為自繪 inline SVG
- ✅ 地圖內容層：帶 `data-solid` 的 HTML 元素會被當障礙物（坦克撞、子彈擋），之後放個人資料區塊用
- ✅ 出生點廣場 + 自介看板（頭像、姓名、職稱、兩句自介；資料以 `@site` 別名直接 import 母專案的 `src/data/profile.ts` 與 `public/me.png`）；廣場內不生成地形與敵人，開場鏡頭對準看板
- ✅ 卡片點擊放大：點看板 / 卡片開彈窗、遊戲鎖住（暫停且不吃鍵盤），Esc / 點背景 / ✕ 關閉後回到原狀態
- ✅ 專案看板（一個專案一塊，取代原本的 GitHub 總表卡片）：先做 ai-chatroom、RPG Maker Character Forge 兩塊，放在出生點左右；圖沿用 showcase 頁 Hero 圖，放大後有大圖、描述、tags、GitHub 與正式站「完整介紹」連結。新增專案看板：`tank-battle/src/content/featured.ts` 加圖、`map.ts` 的 `PROJECT_SLOTS` 加位置
- ⬜ 其餘 3 個專案看板（個人網站、ThreadsBot、Drama 3）；ThreadsBot 的 Hero 圖是直式手機截圖，需另選橫式圖
- ⬜ 其餘區域：技能軍械庫（開砲打開技能箱）、專案機庫（停機坪觸發卡片）、通訊塔（聯絡）
- ⬜ 不想玩也能看：1～4 快速傳送、安全區、和平模式、「看一般版」連結
- ⬜ 頭像 `me.png` 有 1.7 MB，看板只顯示 112px，上線前應另出壓縮版
- ⬜ 觸控裝置操作（目前只支援實體鍵盤）
- ⬜ 決定上線方式（取代首頁、掛在子路徑，或獨立部署）

### 🃏 可遊玩的個人網站：卡牌手牌版 🔄（2026-11-02 開始）

比照坦克組，在 `card-deck/` 另起獨立 Vite 專案（React + Tailwind v4 + Framer Motion，port 5185，launch 設定名 `cards`，IDEA 執行設定 `card-deck dev`）：版面參考卡牌遊戲的牌桌，畫面正下方是一手扇形手牌，用滑鼠把牌打出到牌桌上看詳細資訊。卡面、牌桌皆為自繪，不使用任何遊戲的美術素材。

- ✅ 手牌（最初 6 張，2026-11-17 增為 9 張）：自介（英雄卡，頭像）＋ 5 個專案（`profile.ts` 順序）。文字一律讀母網站 `src/data/profile.ts`（`@site` 別名），卡圖沿用各 showcase 頁 Hero 圖；個人網站沒有 showcase 頁，卡圖是正式站首頁截圖 `card-deck/src/assets/personal-site.png`
- ✅ 互動（2026-11-09 改版）：滑鼠停留手牌上浮放大＋3D 傾斜、鄰卡讓開；**打出＝把卡放到場地格子上**——拖曳時可放的空格亮綠框、離卡片最近的空格最亮，放開就落進那格（可自己選格）；點一下手牌則放進第一個空格（怪獸區中間往外，再魔陷區）。共 10 格（怪獸區 5＋魔陷區 5），可以同時擺好幾張。觸控點擊不會觸發停留放大（只有鍵盤 Tab 選到才放大）
- ✅ 場上的卡：可拖到別的空格換位置；往下拖回手牌區（手牌區亮起「放開收回手牌」）即收回；**點一下才放大展示內容**
- ✅ 放大展示（2026-11-09 改為部落格式單欄）：卡片翻面放大，內容一欄往下排——專案：標題、tags、封面圖、一句話說明，接著解決的問題／主要功能／技術棧／設計亮點／已知限制，每段之後穿插一張截圖；自介：頭像、職稱、自介、聯絡方式、技能。內文 17px。頂端有「收回手牌」「關閉」。文字摘錄自 `spec/projects/<slug>.md`，集中在 `card-deck/src/content/details.ts`；元件 `components/InspectView.tsx`
- ✅ 鍵盤：Tab 選牌、Enter / 空白鍵（手牌：放上場；場上：放大）、Delete / Backspace 把場上的卡收回、Esc 關閉放大；`prefers-reduced-motion` 時關閉動畫
- ✅ 開場預設把自介卡放在怪獸區正中間（訪客一進來就看到是誰）
- ❌ 舊版「打出後牌桌右側詳細面板」與「翻面看完整資訊」按鈕：2026-11-09 改版後移除（`DetailPanel.tsx` 已刪）
- ❌ 場景切換選單與其他 6 種場景（絨布、酒館、戰棋、迷幻、星界、霓虹）：2026-11-09 Rex 決定只留決鬥場，已移除（`scenes.ts`、`SceneSwitcher.tsx`、`SceneDecor.tsx` 與對應 CSS 已刪）
- ✅ Rex 選定正式場景：決鬥場地（2026-11-03），2026-11-09 起為唯一場景
  - ✅ 場地只留我方 2 × 5 格（上排怪獸區、下排魔陷區）；2026-11-09 拿掉兩側有文字的場地／墓地／額外／牌組格，格子放大（桌機最高 260px）
  - ✅ 檯面兩側擺 5 隻扭蛋 Q 版小龍模型（原創，Codex image_gen 生成，透明 PNG 縮為 512px，放在 `card-deck/src/assets/figures/`），各自待機晃動、點一下會跳；窄螢幕改放場地四角 4 隻。元件 `components/DuelFigures.tsx`
- ✅ 每張卡的正面卡圖改成依內容畫的原創插畫（2026-11-09，Codex image_gen 生成 1536×1024，縮成 768 寬 JPG，放在 `card-deck/src/assets/cards/`）。專案截圖不放卡面，只留在放大查看的文章裡；自介文章的頭像仍用 `me.png`
  - 英雄卡：鯊魚帽 Rex 在海上展開發光卡牌
  - 個人網站：設計工作室裡二十多個不同風格的網頁畫框，中央金框是選定的那一個
  - ThreadsBot：小機器人撈報紙、紡成絲線變成貼文泡泡，桌上燈籠代表本機運作
  - ai-chatroom：Lumi 與兩位朋友聊天，背景從房間翻成海邊夏日祭典
  - RPG Maker Character Forge：鍛造坊把像素行走圖敲成立繪、表情頭像與敵人戰鬥圖
  - Drama 3：劇場麥克風發出聲波，帶出四種情緒面具，旁邊是離線筆電
- ✅ 英雄卡卡框加強（2026-11-09）：金箔卡框帶緩慢旋轉的虹彩光、背後金色光暈呼吸、卡圖定時掃過一道亮光、三角金鉚釘、酒紅金邊名稱緞帶；只套在牌面（`.hero-card`），放大查看的對話框不受影響；`prefers-reduced-motion` 時動畫全停
- ✅ 英雄卡人物會動（2026-11-09，拆層 2.5D，`components/HeroArt.tsx`，素材在 `card-deck/src/assets/cards/hero/`）：
  - 人物層用 macOS Vision 從原卡圖摳出（與原圖逐像素對齊）；背景板與閉眼版由 Codex image_gen 改圖產生，閉眼只裁兩眼小塊疊上
  - 動作：以腳底為支點呼吸＋微擺、約 4.6 秒眨一次眼、手上卡牌十字閃光、背景泡泡上飄；滑鼠停在卡上時前後景反向錯位（景深）
  - 不用 GIF（色數不足、檔案大）也不用真 Live2D（需在 Cubism 編輯器手動綁骨、要額外執行環境），理由見 2026-11-09 對話
  - 原本單張的 `intro.jpg` 已移除，英雄卡資料不再帶 image 欄位
- ✅ 程式碼審查（2026-11-10，subagent 跑 code-review，共 10 項）先修前四項：
  - 點龍公仔沒跳（`initial={false}` 讓重新掛載的圖直接停在最後一格）→ 拿掉
  - 拖曳綁定 pointerId：多指觸控只認按下的那根手指，已在拖時別的手指按卡不會搶走
  - 放大查看關閉後（關閉鈕、Esc、收回手牌）焦點還給那張卡（`data-card-id`），鍵盤使用者不會被丟回頁首
  - 主站 `src/index.css` 加 `@source not` 排除 `card-deck/`、`tank-battle/`、`game/`，子專案的 Tailwind class 不再混進主站 CSS
- ✅ 審查剩下的 6 項（2026-11-10）：
  - 拖曳放開（含 pointercancel）時清掉 hoverId，手牌不會卡在放大狀態
  - 放大畫面按「收回手牌」：退場動畫縮回該卡在手牌的位置（AnimatePresence `custom` 傳 `ExitTarget`），Esc／關閉仍縮回場地格
  - 拖曳中的 pointermove 合併成每幀最多一次 setState；放開時用放開座標再判斷是否算拖曳；`takenSlots` 每次渲染只算一次
  - 移除 `imageAlt`／`focus` 欄位（卡片 aria-label 已是標題，alt 讀不到），畫面描述改成 `cards.ts` 註解
  - `cards.ts` 載入時檢查每個專案都有 `DETAILS`，缺了直接報錯
  - 龍公仔是純裝飾：img 改 `alt=""`，描述改成註解
- ✅ 統一牌桌風格（2026-11-16）：手牌、場地、佈景三種視覺語言不一致（暖色羊皮紙卡、冷色全息格線、平面深藍底）。先做 DEMO `card-deck/demo/style.html`（dev 開 `/demo/style.html`，不進 build）：木桌＋絨布對戰墊＋燙金印刷格線＋黃銅框卡片，同一盞燈、同一組金箔色，墊子有墨綠／酒紅／夜藍三色可切換。另做動漫卡通版 `card-deck/demo/anime.html`（Rex 想要類似爐石的動漫感；只取類型感，造型原創）：同一條深紫粗描邊、兩階硬邊上色、Huninn 圓體描邊字、玩具感厚棋盤，棋盤有天空藍／草原綠／糖果紫。再加像素版 `pixel.html`（16 色限定色盤、階梯缺角、RPG 選單視窗卡框、卡圖用 canvas 縮小＋色階化成像素圖、Cubic 11 像素字，地磚草原／地城／雪原）與賽璐璐版 `cel.html`（細黑線稿、平塗、斜向冷紫硬陰影、網點與集中線、棋盤做成動畫用紙、卡圖用 SVG 濾鏡色階化，時段晴天／黃昏／夜晚），以及簡約版 `minimal.html`（Rex 想要蘋果官網那種；只取極簡產品頁的類型感，不用任何品牌標誌：大量留白、系統字、白卡柔和陰影、毛玻璃導覽列、分段切換、淺／深色，全頁黑白灰，唯一色彩是英雄卡的多色光暈；之後依 Rex 要求加入 ui-ux-pro-max 的柔和 UI〔Soft UI Evolution，改良版新擬態〕作為預設外觀：整頁同底色、場地與卡片凸起、格子與卡圖窗凹陷、按住卡片會壓下去，文字維持 AA 對比，可切回淺色／深色；再加「柔和深色」，柔和兩款的卡片多一圈粗卡框（英雄卡是粉彩漸層框）與左上角凸起圓鈕〔英雄★、專案編號〕）。五版頁首互有切換連結（demo 保留作參考）。
  - ✅ 2026-11-16 Rex 選定「柔和深色」套回正式版：`index.css` 改成柔和深色 token（`surface`／`fg`／`muted`／`accent`／`shade`／`shine`／卡面與卡框漸層；底色不能叫 `base`，會和 Tailwind 的 `text-base` 字級撞名變成文字顏色）；場地改凸起軟墊、格子凹槽（下排較淺）、拖曳目標淡藍光圈；`CardFace` 改粗卡框＋凹陷卡圖窗＋左上凸起圓鈕（英雄★粉彩框＋背後柔光，HeroArt 動畫保留）；頂端列、放大查看（同款粗框、按鈕膠囊、文章配色）一併換；扭蛋小龍保留，光暈改柔和投影
  - ✅ 2026-11-17 依 Rex 回饋調整：移除兩側扭蛋小龍（`DuelFigures` 元件與素材保留，App 不再渲染）；移除右上「手牌 x / 6」，改放深淺切換開關（`ThemeToggle`，記在 localStorage `card-deck-theme`，`index.html` 開頭先套主題避免閃爍；淺色＝柔和淺色 token）；卡面改「卡圖 → 置中卡名條（壓在卡圖下緣）→ 凹陷說明框 → 標籤一左一右」，拿掉小標與長描述，說明取 profile.ts 原文第一個子句（`cardBrief`，切在第一個「。，：」前，不另寫文案）；左上圓鈕改龍珠橘＋紅字（深淺都一樣）；深色卡片底改靛藍石板色（face #46507a→#343c5c、框 #7884ad→#262c44），不再和桌面同色
- ✅ 手牌加入 fishing-work、寶可夢牧場 Agent（2026-11-17），共 8 張（英雄＋7 專案，場地 10 格放得下）：`details.ts` 補兩篇文章（摘錄自 `spec/projects/`，寶可夢牧場的兩張含角色截圖註明屬各自權利方、已知限制附非官方聲明）；卡圖同樣用 Codex image_gen 生成原創插畫（`fishing-work.jpg`：辦公室偷偷畫畫比賽＋小惡魔評審；`pokemon-agent-pets.jpg`：桌上浮空小島與原創小寵物頂著五色狀態泡泡，不畫任何寶可夢）
- ✅ 手牌加入私人專案 codex-forge（2026-11-17），共 9 張：`cards.ts` 改讀 `featuredProjects`（公開＋私人專案），型別放寬為 `Project | PrivateProject`；放大查看遇到沒有 `href` 的私人專案時，GitHub 按鈕改成不可點的「🔒 私人專案」（`LockIcon`，同主站 Lucide Lock 造型）；`details.ts` 補文章（摘錄自 spec，不寫 repo 位置、帳號、真實客戶名稱；截圖 5 張，討論內容為虛構示範資料）；卡圖 `codex-forge.jpg`：紙板劇場箱裡大家把便條與草圖串成時間軸，AI 小助手從影印紙探出身子展開流程圖，角落小黑貓遞紙條給主持人
- ⏸ 圖片未壓縮（`me.png` 1.7 MB、ThreadsBot 1.1 MB、RPG 圖 0.96 MB），Rex 決定先不壓縮
- ⬜ 決定上線方式（取代首頁、掛在子路徑，或獨立部署）

### 🎨 設計規範（DESIGN.md）🔄（2026-11-09 開始）

正式站的視覺規範改用 Google design.md 格式，寫在根目錄 `DESIGN.md`，作為重新設計的依據。

- ✅ 建立專案 skill `read-design-spec`（讀取design規範文件）：規格全文副本放在 `.claude/skills/read-design-spec/reference/design-md-spec.md`，寫／改 DESIGN.md 或調整視覺前先讀
- ⬜ 和 Rex 確認重新設計的範圍與方向
- ⬜ 撰寫根目錄 `DESIGN.md`（方向確認後才寫），並以 `npx @google/design.md lint DESIGN.md` 驗證
- ⬜ token 同步到 `src/index.css`（Tailwind v4 `@theme` + `:root` 變數）

### 🧩 設計範本（`/templates`）🔄（2026-11-09 開始）

接案展示用：同一份假資料與功能，切換不同設計風格給客戶挑。長期取代設計實驗室（`/gallery`），本階段兩者並存、現有頁面不動。規格書在 [spec/templates/](templates/README.md)。

- ✅ 安裝 impeccable skill（pbakaus/impeccable，Apache-2.0）到 `.claude/skills/impeccable`；**刻意不放啟動器 `scripts/impeccable`**（首次執行會下載執行檔），skill 會走「Launcher unavailable」備案直接讀 DESIGN.md
- ✅ 規格書：總覽與原則（[README](templates/README.md)）、共用假資料（虛構品牌「青森選物」，[shared-data](templates/shared-data.md)）
- ✅ 版型規格：[後台儀表板](templates/dashboard.md)、[購物網站](templates/shop.md)、[公司官網](templates/corporate.md)
- ✅ 補充版型規格（待確認）：[預約訂位](templates/booking.md)、[方案介紹頁](templates/landing.md)
- ⬜ Rex 審閱規格書，確認 README 第 8 節待決事項（補充版型去留、圖片來源、品牌名稱、實作順序）
- ✅ 第一批風格 `DESIGN.md`（2026-11-09）：[簡約](templates/styles/minimal/DESIGN.md)、[玻璃態](templates/styles/glass/DESIGN.md)、[柔和 UI](templates/styles/soft/DESIGN.md)，三份皆通過 `npx @google/design.md lint`（0 錯誤、0 警告，含 WCAG 對比檢查）
  - 字體（皆 Google Fonts，已確認可取得）：簡約 Geist＋Noto Sans TC、玻璃態 Manrope＋Noto Sans TC、柔和 UI Nunito＋Huninn 粉圓（只有 400 字重）＋Noto Sans TC
  - 玻璃態的 `surface` 是「玻璃疊在畫布上的等效實色」，用於對比計算與 `prefers-reduced-transparency` 退路；實際玻璃材質用 `glass-fill` 系列 token
  - 實作提醒：`npx @google/design.md export --format css-tailwind` 可產出 Tailwind v4 `@theme`，但字體堆疊會被包成單一引號字串（`"Nunito, Huninn, Noto Sans TC"`），**字體變數要手寫**，不可直接用 export 結果
- ✅ 實作計畫（2026-11-09）：[implementation.md](templates/implementation.md)。要點：風格＝CSS 變數資料＋共用元件（不各寫一套）、變數只掛在範本外框不碰全域、裝置預覽用容器查詢、浮層掛進外框、狀態放風格外層、lazy load、`npm run tpl:check` 檢查 DESIGN.md 與程式同步
- ✅ 階段 1：基礎建設＋元件總覽（2026-11-09）
  - 展示器：`/templates` 總覽、`/templates/<template>` 外框（容器查詢、浮層掛載點、自己的捲動容器）、底部工具列（風格切換＋← →、版型、桌機／平板／手機、風格說明側欄可複製 DESIGN.md、重設、隱藏）
  - 三個風格檔（`src/templates/styles/`）、共用假資料（`src/templates/data/`）、狀態 store、表單驗證、toast
  - 共用元件 25 種＋折線圖／甜甜圈圖／長條清單，元件總覽 `/templates/kit` 三種風格 × 三種寬度目視檢查過
  - `npm run tpl:check`：DESIGN.md 色彩一致、禁視窗斷點、禁 fixed、Portal 必傳 container、禁 key={style}（已用故意放入的錯誤自我測試）
  - 規則檔 `.claude/rules/templates.md`
  - bundle：首頁從 850.1KB（gzip 217.6）變為 852.6KB（gzip 219.8），多的 2.5KB 是 lazy 路由本身；範本程式碼完全不在首頁。為此 `vite.config.ts` 加了 `templates-shared` 分組，範本改用自己的 `cn()`（`src/templates/lib/cn.ts`）
- ✅ 階段 2：後台儀表板 × 3 風格（2026-11-09）
  - `src/templates/dashboard/`：資料（`data.ts`）、狀態 store（`state.ts`）、外殼（側欄／頂部列／通知／使用者選單）、總覽、訂單（含詳情抽屜）、商品（含新增商品對話框）、設定
  - 依 [dashboard.md](templates/dashboard.md) 逐項實作並在瀏覽器實測：全域搜尋帶入訂單頁、頁籤計數、debounce 搜尋、排序、分頁、勾選＋半選、批次標記出貨（只改已付款，toast 顯示更新／略過筆數）、詳情抽屜改狀態、通知已讀與開訂單、新增商品驗證、上架開關、表格／卡片切換、設定儲存後低庫存門檻連動總覽與商品頁、清除示範資料、骨架屏與空狀態
  - 驗收：四個頁面在三種風格下 innerText 完全相同；切換風格保留狀態；桌機 1440／1024、平板（側欄收成 icon 欄）、手機（漢堡抽屜、訂單卡片）皆無水平溢出、無 console 錯誤；首頁 bundle 不變
  - 實作中修正：主內容區設為 `@container`（頁內斷點依扣掉側欄後的寬度）、甜甜圈圖自己當容器、設定頁儲存鈕改為底部吸附列、base-ui 頁籤列掛載時自行捲到錯誤位置（改由外層容器捲動）
  - 新增外殼變數（`--tpl-shell-*`、`--tpl-sidebar-*`、`--tpl-header-*`）：簡約貼邊細線、玻璃漂浮面板、柔和凸起面板
- ✅ 檢查點：Rex 確認儀表板方向（2026-11-09）
- ✅ 階段 3：購物網站 × 3 風格（2026-11-09）
  - `src/templates/shop/`：狀態 store（購物車、收藏、篩選、頁面）、外殼（公告列、頁首、頁尾＋電子報）、列表、詳情、購物車抽屜、結帳、訂購完成；跨版型訂單流水號 `src/templates/data/sequence.ts`（接在儀表板 0418 之後）
  - 依 [shop.md](templates/shop.md) 實測：同商品同規格合併、免運進度、折扣碼（錯誤／QINGSEN10 九折）、移除後 5 秒內可復原、結帳驗證捲到並 focus 第一個錯誤、訂單編號 QS-261109-0419、繼續購物清空購物車、詳情規格加價（胡桃木邊几大 NT$5,480）、從詳情返回還原列表捲動位置、收藏為空與篩選無結果的空狀態、頁首搜尋與已套用條件 chip 同步
  - 驗收：列表／詳情／結帳在三種風格下 innerText 完全相同；切風格保留購物車與表單錯誤；手機版（漢堡分類選單、篩選底部抽屜、結帳摘要收合）無水平溢出；首頁 bundle 不變
  - 共用元件補強：`Checkbox` 加 `invalid`／`id`／`describedBy`（結帳條款驗證用）
- ✅ 階段 4：公司官網 × 3 風格（2026-11-09）
  - `src/templates/corporate/`：資料、狀態 store（門市地區、消息分類／展開、聯絡表單）、捲動 hooks（捲動追蹤、數字跑動、是否已捲動）、導覽列／頁尾／回到頂端、12 個區塊
  - 依 [corporate.md](templates/corporate.md) 實測：導覽列頂部透明、捲動後換成風格材質；捲動追蹤；全螢幕手機選單點連結後關閉並捲動；數字跑動（減少動態時直接顯示）；服務與消息對話框；門市地區頁籤、複製地址（不支援剪貼簿時顯示錯誤 toast）、`tel:` 撥號；消息分類＋載入更多；輪播自動播放、hover／focus 暫停、左右與圓點切換；「我要應徵」預填聯絡表單並捲到聯絡區；聯絡表單驗證、送出中、成功、再寄一封；「線上商店」切到購物網站並保留風格；回到頂端
  - 驗收：整頁 innerText 在三種風格下完全相同；手機寬度無水平溢出；首頁 bundle 不變（853.1KB）
  - 實作中修正：主視覺佔位圖不放文字（避免與大標題重複）、導覽列／主視覺／區塊內容左緣對齊（統一 80rem＋左右內距）、`Drawer` 新增全螢幕選單樣式
  - ~~測試注意：用程式 click 開對話框會立刻關閉~~（誤判，見階段 5：實際是 Dialog 缺 role，已修正）
- ✅ 階段 5：補充版型 × 3 風格（2026-11-09，Rex 確認保留）
  - 預約訂位 `src/templates/booking/`：四步驟（選課程與門市 → 日曆＋時段名額＋人數 → 填資料 → 確認）＋完成畫面；名額規則（公休、11/12 額滿、週末緊張、時段剩餘、人數上限 min(4, 剩餘)）、換課程／門市清空後續選擇、步驟條可點回已完成步驟、日曆方向鍵跨週移動、桌機右側摘要／手機底部固定列可展開摘要、預約編號 BK-261109-0031 起遞增
  - 方案介紹頁 `src/templates/landing/`：導覽列（同官網的透明→捲動後材質、捲動追蹤、全螢幕選單）、主視覺、怎麼運作、月繳／年繳切換（價格淡入）、最受歡迎強調、可收合比較表（手機橫捲、第一欄固定）、本月盒子內容、訂閱者回饋（手機橫向滑動）、FAQ、結尾行動區、訂閱對話框（帶入方案與付款週期、送禮欄位展開、驗證、成功畫面）
  - 驗收：兩個版型在三種風格下 innerText 完全相同；手機寬度無水平溢出；全新分頁無 console 錯誤；首頁 bundle 不變（853.2KB）
  - 共用修正：捲動 hooks 移到 `src/templates/lib/scroll.ts`（`useScrollSpy` 改為傳入區塊 id）；**共用 `Dialog` 原本把 `role` 設成 undefined 蓋掉 base-ui 預設的 dialog 角色**，已改回 `role="dialog"`（無障礙修正，階段 4 記錄的「程式 click 打不開對話框」其實是查不到 role 的誤判）
- ❌ 移除預約訂位版型（2026-11-09，Rex 決定）：刪除 `src/templates/booking/` 與版型清單項目；官網「預約手作課程」改為捲到服務項目；[booking.md](templates/booking.md) 標記取消
- ✅ 第二批 5 種風格（2026-11-09）：企業專業 `enterprise`、和紙編輯 `wabi`、新粗野 `brutal`、暗色科技 `tech`、奢華精品 `luxury`
  - 各有 DESIGN.md（`spec/templates/styles/<slug>/`，全部 lint 0 錯誤 0 警告）與風格檔（`src/templates/styles/<slug>.ts`）；暗色科技有格線背景 `TechDecor.tsx`
  - 字體皆確認 Google Fonts 可取得：Space Grotesk、JetBrains Mono、Archivo／Archivo Black、IBM Plex Sans、Noto Serif TC、Cormorant Garamond
  - 共用元件擴充 4 個變數（結構不變）：`--tpl-border-width`（新粗野 2px 粗框）、`--tpl-row-h`（表格列高，企業專業 44px）、`--tpl-label-tracking`（奢華精品 0.12em）、`--tpl-primary-border`（新粗野主要按鈕黑框）；數字樣式加 `lining-nums`（Cormorant 預設舊式數字）
  - 工具列改為只有選中的風格顯示名稱、其餘只顯示色票（hover 顯示名稱），8 種排得下
  - 驗收：儀表板、購物網站、官網、方案頁 × 8 種風格 innerText 完全相同；手機寬度全部無水平溢出；全新分頁無 console 錯誤；首頁 bundle 不變（853.0KB）
- 🔄 階段 6：上線收尾（2026-11-09）
  - ✅ 首頁 `Finalist.tsx` 導覽列「設計實驗室」旁加「設計範本」→ `/templates`（同樣式、同動畫；手機寬度兩個連結並排無溢出）
  - ✅ `public/sitemap.xml` 加入 `/templates` 與 4 個版型（不含 `/templates/kit`）；確認 GitHub Pages 404 轉址會保留 `?style=&device=`（分享連結可直接帶風格與裝置）
  - ✅ 手機上的展示工具列改為兩列（第一列 8 種風格色票、第二列版型＋風格名稱與操作），不再需要橫向捲動
  - ✅ 品牌改名（2026-11-09）：「霧森選物 Mistwood」有實際同名商家，改為「青森選物 Qingsen」；網域 `qingsen.example.com`、訂單前綴 MW → QS
  - ✅ 玻璃態改版（2026-11-09）：Rex 認為深夜藍＋三團柔光太花，改為單一淡粉紅底（#FBEAF0）＋白色毛玻璃的淺色版本；移除 `GlassDecor.tsx`；DESIGN.md lint 0 錯誤 0 警告，4 個版型對比檢查通過
  - ✅ 程式碼審查修正（2026-11-10，subagent 跑 code-review 找到 10 項，全部修正並在瀏覽器實測）
    - 假送出等待 0.8 秒內按「重設」或關閉對話框，不再寫入資料：新增 `lib/useSubmitGuard.ts`，套用在結帳、新增商品、訂閱、官網聯絡表單、後台設定；送出中再按 Enter 不會重複送出
    - 購物車數量上限改以整個商品計算（同商品不同規格共用 min(庫存, 10)），詳情頁達上限時「加入購物車」停用；規格已同步更新 shop.md
    - 重設、切換版型時清掉 toast（舊的「復原」不再作用到新狀態）並捲回頂端
    - 訂單切換頁籤、搜尋、換頁時清除勾選（dashboard.md 已同步）
    - 工具列的風格與裝置選擇器支援方向鍵（roving tabindex）；沒有可重設資料的頁面停用重設鈕，「已重設」計時器改為可清除
    - `tpl:check` 不再把網址當註解略過；部署流程 build 前先跑 `tpl:check`
    - 補改名漏網：折扣碼 MISTWOOD10 → QINGSEN10
  - ✅ 展示工具列改版（2026-11-24）：為了加入更多版型與風格，改為單列固定寬度；版型、風格改成從工具列上方展開的面板（版型依 `TEMPLATE_GROUPS` 分組、風格可依亮／暗篩選、選了不關閉方便比較），風格另有 ‹ › 快速輪換；手機單列，次要操作收進「⋯」
  - ✅ 第三批 4 種風格（2026-11-24，Rex 指定 CSS Zen Garden #221、#217、#213、#177 為靈感）：中世紀現代 `midcentury`、透疊色面 `planes`、古典博物誌 `curio`、黃昏城市 `dusk`
    - 只借用風格語彙，配色與裝飾圖形皆為原創（原作 CC BY-NC-SA、註明不可複製）；各有 DESIGN.md（lint 0 錯誤 0 警告）、風格檔與背景裝飾元件（`MidCenturyDecor`、`PlanesDecor`、`CurioDecor`、`DuskDecor`）
    - 驗收：4 版型 × 4 新風格實算文字對比全數通過、手機寬度無水平溢出、無 console 錯誤
  - ✅ 玻璃態找回玻璃感（2026-11-24）：純色底讓毛玻璃沒東西可透，加回三團「同色系」柔光（玫瑰粉、蜜桃粉、淡紫粉，35–45%）並把面板改為白 45%＋多重亮邊；為了柔光最濃處的對比，主色加深為 #A82B56、提示文字 #74505F
  - ✅ 第四批 9 種風格（2026-11-24，Rex 從 daisyUI UI Design Trends 指定）：Material `material`、Metro 方塊 `metro`、Fluent `fluent`、擬物 `skeuo`、黏土擬態 `clay`、Aqua 果凍 `aqua`、全像虹彩 `holo`、新藝術 `nouveau`（#048，卡片上圓下方）、液態金屬 `chrome`；共 21 種
    - 共用元件新增 `--tpl-card-radius`／`--tpl-card-radius-xl`（卡片與大圖圓角，可寫四角不同的簡寫），預設跟隨 radius-lg／xl
    - 驗收：4 版型 × 9 新風格文字對比全數通過（全像虹彩另以光暈最濃處計算，連結色加深為 #0F5C75）、手機寬度無水平溢出、無 console 錯誤
  - ✅ 卡片形狀變體（2026-11-24，Rex 指定）：玻璃態 2 `glass2`（冰藍薄荷、卡片上方直角下方圓角 `0 0 20px 20px`）、企業專業 2 `enterprise2`（深翠綠暖灰、卡片左上右下直角、右上左下圓弧 `0 20px 0 20px`；最初為 D 字形 `0 20px 20px 0`，同日依 Rex 改）；共 23 種
    - 玻璃態的光暈變數改為通用的 `--tpl-glow-1／2／3`，兩種玻璃風格共用 `GlassDecor`
    - 驗收：兩種變體 × 4 版型文字對比通過（玻璃態 2 以光暈最濃處 #CFE6F4 計算）、手機無水平溢出
  - ✅ 實木擬物 `wood`（2026-11-24，daisyUI #023 Real-Wood Skeuomorphism）：橡木地板背景（`WoodDecor`）、楓木面板木紋＋內框、胡桃木厚按鈕、刻槽輸入框；共 24 種
    - 共用 `panel` 新增選用的 `--tpl-panel-image`（材質紋理），沒設為 none
    - 驗收：以最深木紋（畫布 #D4B68D、面板再深 8%）計算，4 版型文字對比通過；狀態色刻意加深；手機無水平溢出
    - 依 Rex 回饋修正（2026-11-24）：面板木紋原本是接近垂直的 1px 細線、會切過後台每一行字，改為寬而平滑的色帶（最深 3.5%）；背景木紋與木板縫也減淡（最深約 6%、縫 12%）
  - ✅ 品質複查（依 impeccable audit 清單；偵測器需下載執行檔所以未跑，改用瀏覽器內檢查腳本）：4 版型主要頁面 × 8 風格檢查實算文字對比、無障礙名稱、表單標籤、替代文字、重複 id、標題層級、觸控目標（手機框）
    - 修正：柔和 UI 狀態色當文字時對比不足（success #3F7D4E→#356B42、warning #A86516→#8A5A14）；第一批三份 DESIGN.md 補 `status-*` 元件讓 lint 檢查狀態色文字；商品詳情 h1→h3 跳級（補隱藏 h2）；`TplImage` 的 `alt=""` 改為 `aria-hidden` 裝飾圖
    - 確認無問題：無寫死色碼（除工具列中性樣式與開關圓鈕陰影）、所有動畫有減少動態處理、手機觸控目標皆合格
    - 檢查注意：瀏覽器面板在背景時 CSS 過渡會暫停，量測前要先停用 transition，否則會量到切換前的顏色
  - ✅ 圖片（2026-11-18，Rex 決定用 Codex 生成）：12 件商品 × 3 張（主圖／細節／情境）＋品牌主視覺＋森林盒子開箱＋6 間門市，共 44 張，畫面皆不含文字；WebP 放 `public/templates/img/`（約 3.8 MB，頁面 lazy 載入），`TplImage` 的 `IMAGE_SOURCES` 對照表接上，沒有的鍵仍退回佔位圖。清單與提示詞重點見 [spec/templates/images.md](templates/images.md)。4 個版型實測：圖片全部載入、無佔位圖殘留
  - ✅ commit（2026-11-24，Rex 指示；與牌桌「UI 設計試衣間」卡一起進版控，push 由 Rex 執行）

### 其他待辦

- ⬜ 確認既有 repo 連結：`Rex-shark/ai-chatroom` 與 `Rex-shark/ThreadsBot` 不在公開 repo 清單（2026-10-16 查詢；公開的是 `ai-chat-room`），需公開 repo 或改連結
- ⬜ SwissModern 的 Hero / 聯絡區 12 欄網格未做響應式（手機有 2px 水平溢出，既有問題）
- ⬜ HandDrawn 便利貼的「資料庫 / DevOps」圈線標題偏長會折行，可考慮縮短顯示或放寬

- ⬜ 補全 [spec/info.md](info.md) 的 `（待補）` 欄位（一句話自介、年資、聯絡偏好）
- ⬜ 把 [ThreadsBot tutorial 長文](https://github.com/Rex-shark/ThreadsBot/blob/master/docs/local-llm-threads-tutorial.md) 搬成站內 `/blog/local-llm-threads-tutorial`
- ⬜ 建 `/blog` 列表頁與文章詳情頁範本
- ⬜ **部落格草稿**（待 `/blog` 完成後上站）：
  - ⬜ [docs/blog/ai-chatroom.md](../docs/blog/ai-chatroom.md) — ai-chatroom 技術文（草稿；上站時補架構圖、確認 demo、調圖片路徑；**並依 2026-10 現況改寫**：角色 Luna → Lumi、圖庫 89 → 109 張 / 15 → 16 種情緒、`sendLunaImage` → `sendLumiImage`、多人房不用 `ChatMemory`、補上自動情境生圖）
- ⬜ 加入暗色模式切換功能
- ⬜ 效能優化（圖片壓縮、lazy loading、bundle 拆分 — 目前 750KB）

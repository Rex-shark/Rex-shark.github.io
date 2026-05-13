# 個人網站開發計畫

## 專案目標

Rex 的個人網站（`rex-shark.github.io`）。**正式首頁採用 Finalist 風格**（白底 indigo/violet、3D Tilt 卡片、好文分享、文章分類篩選），位於 `/`。原本的多風格導覽頁（StyleGallery）作為「設計實驗室」保留於 `/gallery`，可從首頁連入觀賞其餘 19 種設計風格。

---

## 架構規劃

### 路由結構

使用 **HashRouter**（解決 GitHub Pages 靜態託管的 SPA 路由問題）：

```
/#/                            → 正式首頁（Finalist 風格）
/#/gallery                     → 設計風格導覽頁（原 StyleGallery，含 19 種設計實驗）
/#/styles/<風格路由名>          → 各風格首頁（19 種，不含 Finalist）
/#/projects/spring-boot-api    → Spring Boot API 範例 showcase
/#/projects/threads-bot        → ThreadsBot 專案 showcase
```

> **`/styles/finalist` 路由保留與否**：建議保留作為向下相容（Finalist 本身就是首頁內容），實作時讓兩者指向同一元件即可，避免外部已分享連結失效。

### 目錄結構

```
src/
├── App.tsx                          # HashRouter 路由設定
├── main.tsx                         # 進入點
├── index.css                        # 全域樣式與主題變數
├── pages/
│   ├── Home.tsx                     # 正式首頁（從 Finalist.tsx 改造）
│   ├── StyleGallery.tsx             # 設計風格導覽頁（搬到 /gallery）
│   ├── styles/                      # 19 個設計實驗風格
│   └── projects/                    # 精選專案 showcase 頁
│       ├── SpringBootApiDemo.tsx
│       └── ThreadsBot.tsx
├── components/
│   ├── ui/                          # shadcn/ui 元件
│   ├── gallery/
│   │   └── StyleCard.tsx            # 風格卡片元件
│   └── common/                      # 共用元件
├── lib/
│   └── utils.ts                     # cn() + handleHashClick()
└── assets/                          # 靜態資源

spec/                                # 資料權威來源（不放程式）
├── plan.md                          # 本檔案
├── info.md                          # Rex 個人資訊（自介、技能、聯絡）
├── article/
│   └── data.md                      # 好文分享策展清單
├── projects/                        # 精選專案介紹
│   ├── threads-bot.md
│   └── img/                         # 原始截圖 + mermaid 流程圖
└── (其他規格文件)

public/
└── projects/<slug>/                 # 部署用圖片（英文檔名）
```

### Subagent 架構

- **新增風格頁**：透過 `.claude/agents/style-page-creator.md` 執行，可並行啟動多個
- **新增專案 showcase 頁**：使用 general-purpose agent，依 `spec/projects/<slug>.md` 製作

---

## 首頁設計

正式首頁（`/`）採用 **Finalist 風格**，內容區塊：

1. **固定導覽列**：關於 / 技能 / 專案 / 文章 / 聯絡（右上）+ 「設計實驗室」連結到 `/gallery`
2. **Hero**：自介、CTA
3. **關於**：3 張 About 卡片
4. **技能**：分後端 / 前端 / 資料庫 / 系統設計
5. **精選專案**：3 張卡（見下方）
6. **好文分享**：來自 `spec/article/data.md`，含 tag 篩選
7. **聯絡**：email、GitHub
8. **Footer**

---

## 精選專案

3 個專案，全部呈現在首頁專案區塊。**已移除「系統分析設計教學」**。

| 專案 | 卡片描述 | 點擊行為 | Showcase 頁 | 狀態 |
|------|----------|----------|-------------|------|
| **個人網站** | 用 20 種不同設計風格實作的個人網站（即本站），最終選定 Finalist 為正式首頁。 | 直連 `/gallery` 觀賞其他 19 種風格 | 不做（網站本身即作品） | ✅ 完成 |
| **Spring Boot API 範例** | RESTful API 範例，含 JWT 認證、角色控管、JPA 資料存取層。 | 進入 `/projects/spring-boot-api` | ✅ 已有 | ✅ 完成 |
| **ThreadsBot** | 本地 LLM 自動爬新聞、改寫成 Threads 貼文，Spring Boot 3 + Spring AI + Ollama，零 API 成本。 | 進入 `/projects/threads-bot` | ✅ 已有 | ✅ 完成 |

---

## 設計實驗室（`/gallery`）

原 StyleGallery 改造為「設計實驗室」：

- **入口**：首頁右上角導覽列、Footer，或首頁底部加一個「想看其他設計風格？」CTA
- **內容**：保留 19 張風格預覽卡（不含 Finalist，因為它已是正式首頁）
- **頁面文案調整**：標題從「選擇你喜歡的設計風格」改為「設計實驗室 — 19 種設計風格實作筆記」之類，定位為作品/實驗，不再是「決定風格」的選擇器
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
| 6  | 蒸汽龐克 | `/styles/steampunk` | 深棕銅色、齒輪裝飾、壓力錶進度條 | ✅ 完成 |
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
| 18 | 無障礙倫理設計 | `/styles/accessible-ethical` | WCAG AAA 高對比、Atkinson Hyperlegible 字型、完整 focus 狀態 | ✅ 完成 |
| 19 | GitHub 開發者檔案 | `/styles/github-profile` | GitHub Primer Dark、貢獻熱力圖、Pinned Repos、語言統計條 | ✅ 完成 |
| ⭐  | **Finalist → 正式首頁** | `/`（兼容 `/styles/finalist`） | 白底 indigo/violet、3D Tilt、好文分享、文章篩選 | ✅ 升級為首頁 |

---

## 精選專案 showcase 頁

依據 `spec/projects/<slug>.md` 製作。

| 專案 | 路由 | 資料來源 | 狀態 |
|------|------|----------|------|
| Spring Boot API 範例 | `/projects/spring-boot-api` | （內嵌於頁面） | ✅ 完成 |
| ThreadsBot | `/projects/threads-bot` | [spec/projects/threads-bot.md](projects/threads-bot.md) | ✅ 完成 |

---

## 資料權威來源（Single Source of Truth）

所有「會被多處使用」的內容統一存放在 `spec/`。詳細規則見 [CLAUDE.md](../CLAUDE.md)。

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
| `StyleGallery` | `src/pages/StyleGallery.tsx` | 設計實驗室導覽頁（待搬到 `/gallery`） | ✅ |

---

## 待辦事項

### 🎯 首頁升級工程 ✅ 完成

採取精簡做法：直接修改 `Finalist.tsx`（不另建 Home.tsx），讓 `/` 與 `/styles/finalist` 共用同一元件。

- [x] **修改 `Finalist.tsx`**
   - 頂部「返回風格選擇」改為「Rex.」品牌 + 右側「設計實驗室 →」連到 `/gallery`
   - 專案區從 4 張縮為 3 張：移除「系統分析設計教學」；個人網站 desc 改寫並 `to: '/gallery'`
   - 移除 Hero 的「下載履歷」按鈕（避免假連結）
- [x] **修改 `App.tsx`**
   - `/` → `Finalist`
   - `/gallery` → `StyleGallery`
   - `/styles/finalist` 保留向下相容
- [x] **修改 `StyleGallery.tsx`**
   - 標題改為「設計實驗室」、副標「打造正式首頁前的 19 種設計風格實驗」
   - 移除 Finalist 卡片與 `FinalistPreview` 元件
   - Header 加「返回首頁」連結
- [x] **批次修改 19 個風格頁返回鍵**
   - `to="/"` → `to="/gallery"`
   - 文案「返回風格選擇」→「返回設計實驗室」（Cyberpunk 保留 `cd ../` 風格特色）
- [x] **build 通過 + 手動驗收路徑成立**

### 其他待辦

- [ ] 補全 [spec/info.md](info.md) 的 `（待補）` 欄位（一句話自介、年資、聯絡偏好）
- [ ] 把 [ThreadsBot tutorial 長文](https://github.com/Rex-shark/ThreadsBot/blob/master/docs/local-llm-threads-tutorial.md) 搬成站內 `/blog/local-llm-threads-tutorial`
- [ ] 建 `/blog` 列表頁與文章詳情頁範本
- [ ] 加入暗色模式切換功能
- [ ] SEO 優化（meta tags、Open Graph、sitemap）
- [ ] 效能優化（圖片壓縮、lazy loading、bundle 拆分 — 目前 730KB）

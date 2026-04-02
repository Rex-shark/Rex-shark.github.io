# 個人網站開發計畫

## 專案目標

建立 Rex 的個人網站（`rex-shark.github.io`），首頁作為**風格導覽頁**，展示多種設計風格的卡片，點擊後進入對應風格的完整首頁。目的是從中挑選最喜歡的設計方向，再決定最終風格。

---

## 架構規劃

### 路由結構

使用 **HashRouter**（解決 GitHub Pages 靜態託管的 SPA 路由問題）：

```
/#/                            → 風格導覽頁（StyleGallery）
/#/styles/minimal-business     → 簡約商務風格
/#/styles/hand-drawn           → 手繪插圖風格
/#/styles/cyberpunk            → 賽博龐克風格
/#/styles/japanese-minimal     → 極簡日式風格
/#/styles/vaporwave            → 蒸氣波風格
/#/styles/steampunk            → 蒸汽龐克風格
/#/styles/macbook              → 蘋果風格
/#/styles/swiss-modern         → 瑞士現代主義
/#/styles/pixel-art            → 像素藝術
/#/styles/soft-ui              → 柔和UI進化版
/#/styles/glassmorphism        → 玻璃態
/#/styles/claymorphism         → 黏土態
/#/styles/spatial-ui           → 空間UI（visionOS）
```

### 目錄結構

```
src/
├── App.tsx                          # HashRouter 路由設定
├── main.tsx                         # 進入點
├── index.css                        # 全域樣式與主題變數
├── pages/
│   ├── StyleGallery.tsx             # 風格導覽頁（首頁）
│   └── styles/
│       ├── MinimalBusiness.tsx       # 簡約商務風格
│       ├── HandDrawn.tsx            # 手繪插圖風格
│       ├── Cyberpunk.tsx            # 賽博龐克風格
│       ├── JapaneseMinimal.tsx      # 極簡日式風格
│       ├── Vaporwave.tsx            # 蒸氣波風格
│       ├── Steampunk.tsx            # 蒸汽龐克風格
│       ├── Macbook.tsx              # 蘋果風格
│       ├── SwissModern.tsx          # 瑞士現代主義
│       ├── PixelArt.tsx             # 像素藝術
│       └── SoftUi.tsx               # 柔和UI進化版
├── components/
│   ├── ui/                          # shadcn/ui 元件
│   ├── gallery/
│   │   └── StyleCard.tsx            # 風格卡片元件
│   └── common/                      # 共用元件
├── lib/
│   └── utils.ts                     # 工具函式
└── assets/                          # 靜態資源
```

### Subagent 架構

新增風格頁面透過 `.claude/agents/style-page-creator.md` 定義的獨立 agent 執行，可並行啟動多個。預設使用 `sonnet` 模型，複雜風格可覆蓋為 `opus`。

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

---

## 共用元件

| 元件 | 路徑 | 說明 | 狀態 |
|------|------|------|------|
| StyleCard | `src/components/gallery/StyleCard.tsx` | 風格卡片（含預覽、hover 動畫） | ✅ 完成 |
| StyleGallery | `src/pages/StyleGallery.tsx` | 導覽頁，含 7 張風格卡片 | ✅ 完成 |

---

## 基礎建設

- [x] 安裝 `react-router` 並設定 HashRouter
- [x] 建立 `pages/`、`components/gallery/` 目錄結構
- [x] 實作風格導覽頁（`StyleGallery.tsx`）
- [x] 實作 `StyleCard` 元件
- [x] GitHub Pages SPA 路由（HashRouter 方案）
- [x] GitHub Actions 自動部署（`.github/workflows/deploy.yml`）
- [x] 建立 subagent 定義（`.claude/agents/style-page-creator.md`）
- [x] 建立 slash command（`.claude/commands/create-style-page.md`）

---

## 待辦事項

- [ ] 從 N 種風格中選定最終設計方向
- [ ] 將選定的風格頁面升級為正式首頁
- [ ] 加入暗色模式切換功能
- [ ] SEO 優化（meta tags、Open Graph）
- [ ] 加入更多實際專案內容與連結
- [ ] 效能優化（圖片壓縮、lazy loading）

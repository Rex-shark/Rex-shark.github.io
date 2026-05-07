# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

此檔案提供 Claude Code (claude.ai/code) 在此儲存庫中工作時的指引。

## 語言規則

所有回應、說明與程式碼註解一律使用**繁體中文（台灣用語）**。

## 專案概述

這是 Rex（GitHub 帳號：Rex-shark）的個人網站，部署於 `rex-shark.github.io`。作者為 Java 全端工程師，計畫內容包含自介、技能展示、Java/Spring Boot 教學與 GitHub 專案。

## 技術 Stack

- **框架**：React 19 + Vite 8
- **樣式**：Tailwind CSS v4（透過 `@tailwindcss/vite` 整合，無獨立設定檔）
- **UI 元件**：shadcn/ui（style: `base-nova`，底層使用 `@base-ui/react` 原件）
- **動畫**：Framer Motion
- **語言**：TypeScript（strict 模式）
- **字型**：Geist Variable（`@fontsource-variable/geist`）
- **部署**：GitHub Pages（透過 GitHub Actions）

## 常用指令

```bash
npm install       # 安裝相依套件
npm run dev       # 本地開發伺服器
npm run build     # tsc --noEmit 型別檢查後建置至 dist/
npm run lint      # ESLint 檢查
npm run preview   # 預覽 production 建置結果
```

## 架構重點

### 風格導覽頁架構

首頁為**風格導覽頁**（`StyleGallery`），展示多種設計風格的卡片，點擊後進入對應風格的完整首頁。使用 **HashRouter** 解決 GitHub Pages 靜態託管的 SPA 路由問題。

路由結構：
```
/#/                            → 風格導覽頁（StyleGallery）
/#/styles/<風格路由名>          → 各風格首頁
```

風格頁面位於 `src/pages/styles/`，每個頁面皆為獨立的 React 元件，包含：固定導覽列、Hero（含 `/me.png`）、技能區塊、專案區塊、聯絡區塊、Footer。

### Subagent 架構

新增風格頁面透過 `.claude/agents/style-page-creator.md` 定義的獨立 agent 執行，可並行啟動多個：

- **模型**：預設 `sonnet`，複雜風格可覆蓋為 `opus`
- **職責分工（Plan A）**：Subagent **只建立** `src/pages/styles/<PascalCase>.tsx`，**不修改** `App.tsx` 和 `StyleGallery.tsx`（由主 agent 統一整合，避免並行衝突）
- **回報機制**：Subagent 完成後回報 import 名稱、路由路徑、卡片配色等資訊供主 agent 整合

### 路徑別名
`@` 對應 `./src`（在 `vite.config.ts` 與 `tsconfig.json` 均已設定）。

### 樣式系統
- 主題定義在 [src/index.css](src/index.css)，使用 CSS 自訂屬性（OKLch 色彩空間）
- 暗色模式以 `.dark` class 切換（非 `prefers-color-scheme` media query）
- 定義了完整的 token：`--background`、`--foreground`、`--primary`、`--muted`、`--accent`、`--destructive`、`--radius-*` 等

### 元件慣例
- shadcn/ui 元件放在 `src/components/ui/`，透過 `npx shadcn add <component>` 新增
- 樣式合併工具：`src/lib/utils.ts` 匯出的 `cn()`（`clsx` + `tailwind-merge`）
- Icon 使用 Lucide React；SVG 精靈檔位於 `public/icons.svg`
- 風格頁面中的 GitHub Icon 使用自訂 `GithubIcon` SVG 元件（定義在各風格頁面內）

## 部署

push 至 `main` 分支後，`.github/workflows/deploy.yml` 會自動觸發：

1. `npm ci` 安裝相依
2. `npm run build` 建置至 `dist/`
3. 部署至 GitHub Pages

網址：`https://rex-shark.github.io`

## 開發進度與計畫

開發進度與計畫詳見 [spec/plan.md](spec/plan.md)。

**重要規則**：每當完成計畫中的項目，或計畫有任何變更（新增、移除、調整優先順序），都必須**立即更新** `spec/plan.md`，確保該文件始終反映最新狀態。

## 個人資料來源

**所有與 Rex 個人相關的內容**（自介、技能清單、聯絡方式、專案描述、職位、身份、年資等）必須以 [spec/info.md](spec/info.md) 為唯一權威來源。

**規則**：
- 撰寫風格頁面文案、產生範例內容、回答「Rex 的某項資料」前，**必先讀取 `spec/info.md`**
- 若 `info.md` 中標註 `（待補）` 的欄位，**不得自行編造**，應在輸出中保留 `（待補）` 或明確詢問使用者
- 使用者補充新資訊時，**同步更新 `info.md`**，使其持續為最新版本
- 既有風格頁面中的硬編碼資料（如 `MinimalBusiness.tsx` 內的 email、技能列表）若與 `info.md` 不一致，以 `info.md` 為準

## 精選專案資料來源

**精選專案的介紹資料**（用於 `src/pages/projects/` 底下的靜態頁面）統一存放於 [spec/projects/](spec/projects/) 目錄，每個專案一個 Markdown 檔（檔名為 kebab-case 的 slug，例如 `threads-bot.md`）。

**規則**：
- 製作或更新 `src/pages/projects/<Project>.tsx` 前，**必先讀取 `spec/projects/<slug>.md`**，並以該檔內容為唯一資料來源
- **不得自行編造**：標註 `（待補）` 的欄位、未提供的截圖、未公布的數字（stars / forks 等）一律保留佔位或留白，不可虛構
- 截圖佔位以灰底框 + `截圖待補` 字樣呈現；正式截圖應放於 `public/projects/<slug>/<name>.png`
- subagent 製作頁面時，導覽列返回連結預設指向 `/styles/finalist`
- 新增專案資料檔時，同步在此處或專案文件首段標註對應的頁面路由與元件路徑

目前資料檔：
- [spec/projects/threads-bot.md](spec/projects/threads-bot.md) — ThreadsBot（本地 LLM 自動發文）

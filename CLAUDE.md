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

## 部署

push 至 `main` 分支後，`.github/workflows/deploy.yml` 會自動觸發：

1. `npm ci` 安裝相依
2. `npm run build` 建置至 `dist/`
3. 部署至 GitHub Pages

網址：`https://rex-shark.github.io`

## 目前開發狀態

**首頁為風格選擇頁**：暫時性的連結頁面，列出多個按鈕，每個按鈕連至一個不同風格設計的首頁版本。目的是從多種風格中挑選最喜歡的方向。

設計風格與架構細節**待定**，各風格頁面獨立設計、互不干擾。

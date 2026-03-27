# CLAUDE.md

此檔案提供 Claude Code (claude.ai/code) 在此儲存庫中工作時的指引。

## 語言規則

所有回應、說明與程式碼註解一律使用**繁體中文（台灣用語）**。

## 專案概述

這是 Rex（GitHub 帳號：Rex-shark）的個人網站，部署於 `rex-shark.github.io`。

## 技術 Stack

- **框架**：React 19 + Vite
- **樣式**：Tailwind CSS v4
- **UI 元件**：shadcn/ui
- **動畫**：Framer Motion
- **語言**：TypeScript
- **部署**：GitHub Pages（透過 GitHub Actions）

## 開發方式

```bash
npm install       # 安裝相依套件
npm run dev       # 本地開發伺服器
npm run build     # 建置至 dist/
```

部署：push 至 `main` 分支後，GitHub Actions 自動建置並發布。

## 目前開發狀態

**首頁為風格選擇頁**：暫時性的連結頁面，列出多個按鈕，每個按鈕連至一個不同風格設計的首頁版本。目的是從多種風格中挑選最喜歡的方向。

設計風格與架構細節**待定**，各風格頁面獨立設計，互不干擾。

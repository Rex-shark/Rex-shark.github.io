# CLAUDE.md

此檔案提供 Claude Code (claude.ai/code) 在此儲存庫中工作時的指引。

## 語言規則

所有回應、說明與程式碼註解一律使用**繁體中文（台灣用語）**。

## 專案概述

這是 Rex（GitHub 帳號：Rex-shark）的靜態個人網站，部署於 `rex-shark.github.io`。

- **設計風格**：吉卜力手繪風，暖米色系（`#F5F0E3`）、森林綠（`#4A7C59`）、暖棕（`#7A5C3A`）
- **字體**：Caveat（標題、手寫感）+ Quicksand（內文）
- **無任何建置系統、框架或外部相依套件**

## 開發方式

此為純靜態網站，無需建置流程：

- **本地預覽**：直接用瀏覽器開啟 `index.html`，或使用簡易 HTTP 伺服器：
  ```
  npx serve .
  # 或
  python -m http.server 8080
  ```
- **部署**：推送至 `main` 分支後，GitHub Pages 會自動發布。

## 架構說明

```
index.html          ← 首頁（唯一主要頁面）
assets/
  me.png            ← 個人大頭照
tutorials/          ← 程式教學頁面（未來新增）
projects/           ← 專案展示頁面（未來新增）
```

### index.html 結構

- **CSS**：內嵌於 `<head>` 的 `<style>` 標籤，CSS 變數定義於 `:root`
- **版面區塊**：nav → hero（頭像 + 自介）→ 草地分隔線 → 技能 → 教學 → 專案 → 聯絡 → footer
- **互動效果**：CSS animation（草地搖擺）+ JS（動態產生草葉高度陣列）
- **響應式**：斷點設於 720px
- **色彩主題**：CSS 變數統一管理，主色為 `--green: #4A7C59`、`--brown: #7A5C3A`

### 共用元件規劃

目前共用導覽列尚未拆出，未來頁面增多時可考慮用 JS fetch 載入 `components/navbar.html`。

## 設計原則

- 按鈕使用手繪陰影偏移效果（`box-shadow: 3px 4px 0`），hover 時位移 `translate(-2px,-2px)`
- 卡片使用虛線裝飾邊框（`::before` 偽元素）
- 所有互動元素需有 `cursor: pointer` 與 hover 回饋
- 新增教學頁面時沿用同一組 CSS 變數與 Caveat/Quicksand 字體

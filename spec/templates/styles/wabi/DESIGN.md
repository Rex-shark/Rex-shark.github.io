---
version: alpha
name: 和紙編輯 Editorial Wabi
description: 米白和紙色畫布、墨黑文字與一點朱紅，以細線與留白組織版面，明體標題帶出書頁般的沉靜。
colors:
  primary: "#1F1B16"
  on-primary: "#FBF8F2"
  primary-hover: "#3A332B"
  secondary: "#7A6A55"
  tertiary: "#B83A2B"
  neutral: "#F5F1E8"
  background: "{colors.neutral}"
  surface: "#FBF8F2"
  surface-raised: "#FFFDF8"
  surface-sunken: "#EFE9DD"
  on-surface: "#1F1B16"
  on-surface-variant: "#5A5248"
  on-surface-subtle: "#6E6559"
  outline: "#E2DACB"
  outline-strong: "#CFC4B1"
  disabled: "#ECE6DA"
  on-disabled: "#665E53"
  scrim: "#1F1B1659"
  accent-container: "#F3E3DF"
  on-accent-container: "#8A2A1F"
  inverse-surface: "#1F1B16"
  on-inverse-surface: "#FBF8F2"
  success: "#3F6B4A"
  success-container: "#E5EEE6"
  on-success-container: "#2F5238"
  warning: "#8F5A12"
  warning-container: "#F6EAD5"
  on-warning-container: "#6C430C"
  error: "#A6322A"
  on-error: "#FBF8F2"
  error-container: "#F6E1DD"
  on-error-container: "#82261F"
  info: "#3D5A80"
  info-container: "#E3E9F1"
  on-info-container: "#2E4663"
  chart-1: "#1F1B16"
  chart-2: "#B83A2B"
  chart-3: "#7A6A55"
  chart-4: "#8C7F6A"
typography:
  display:
    fontFamily: Noto Serif TC
    fontSize: 50px
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: 0.02em
  headline-lg:
    fontFamily: Noto Serif TC
    fontSize: 34px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0.02em
  headline-md:
    fontFamily: Noto Serif TC
    fontSize: 26px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0.02em
  headline-sm:
    fontFamily: Noto Serif TC
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
  title-md:
    fontFamily: Noto Serif TC
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.5
  body-lg:
    fontFamily: Noto Sans TC
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.75
  body-md:
    fontFamily: Noto Sans TC
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: Noto Sans TC
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
  label-lg:
    fontFamily: Noto Sans TC
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.04em
  label-md:
    fontFamily: Noto Sans TC
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Noto Sans TC
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.04em
  number-xl:
    fontFamily: Noto Sans TC
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.1
    fontFeature: "'tnum' 1"
  number-md:
    fontFamily: Noto Sans TC
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    fontFeature: "'tnum' 1"
rounded:
  none: 0px
  sm: 2px
  md: 2px
  lg: 3px
  xl: 4px
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  4xl: 96px
  gutter: 24px
  margin-desktop: 32px
  margin-mobile: 16px
  container: 1200px
  sidebar: 240px
  control-height: 42px
  row-height: 56px
components:
  page:
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-surface}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 24px
  card-muted-text:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-variant}"
  surface-raised-panel:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.md}"
    padding: 16px
    height: 42px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
  button-primary-disabled:
    backgroundColor: "{colors.disabled}"
    textColor: "{colors.on-disabled}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.md}"
    padding: 16px
    height: 42px
  button-secondary-hover:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.on-surface}"
  button-ghost-hover:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.on-surface}"
  button-danger:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-error}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.md}"
  link:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.tertiary}"
  input:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    height: 42px
  input-placeholder:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface-subtle}"
  input-error-message:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.error}"
    typography: "{typography.body-sm}"
  sidebar:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface-variant}"
    width: 240px
  nav-item-active:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-lg}"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
  chip-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  badge-neutral:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
  badge-success:
    backgroundColor: "{colors.success-container}"
    textColor: "{colors.on-success-container}"
  badge-warning:
    backgroundColor: "{colors.warning-container}"
    textColor: "{colors.on-warning-container}"
  badge-error:
    backgroundColor: "{colors.error-container}"
    textColor: "{colors.on-error-container}"
  badge-info:
    backgroundColor: "{colors.info-container}"
    textColor: "{colors.on-info-container}"
  badge-accent:
    backgroundColor: "{colors.accent-container}"
    textColor: "{colors.on-accent-container}"
  table-header:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-md}"
  table-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    height: 56px
  table-row-hover:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.on-surface}"
  table-row-selected:
    backgroundColor: "{colors.accent-container}"
    textColor: "{colors.on-accent-container}"
  switch-on:
    backgroundColor: "{colors.tertiary}"
    rounded: "{rounded.full}"
  switch-off:
    backgroundColor: "{colors.outline-strong}"
  switch-thumb:
    backgroundColor: "{colors.surface-raised}"
  tooltip:
    backgroundColor: "{colors.inverse-surface}"
    textColor: "{colors.on-inverse-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
  toast:
    backgroundColor: "{colors.inverse-surface}"
    textColor: "{colors.on-inverse-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
  dialog:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xl}"
    padding: 24px
  skeleton:
    backgroundColor: "{colors.surface-sunken}"
  step-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
  step-done:
    backgroundColor: "{colors.accent-container}"
    textColor: "{colors.on-accent-container}"
  overlay-scrim:
    backgroundColor: "{colors.scrim}"
  status-success:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.success}"
  status-warning:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.warning}"
  status-info:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.info}"
  divider:
    backgroundColor: "{colors.outline}"
  divider-strong:
    backgroundColor: "{colors.outline-strong}"
  chart-series-1:
    backgroundColor: "{colors.chart-1}"
  chart-series-2:
    backgroundColor: "{colors.chart-2}"
  chart-series-3:
    backgroundColor: "{colors.chart-3}"
  chart-series-4:
    backgroundColor: "{colors.chart-4}"
  swatch-secondary:
    backgroundColor: "{colors.secondary}"
---

# 和紙編輯 Editorial Wabi

## Overview

**沉靜、文雅、有書卷氣。** 米白和紙色的畫布、墨黑文字、細細的分隔線與大量留白，像一本排版講究的雜誌或旅宿的手冊；明體標題帶出溫度，只在需要注意的地方點一抹朱紅。

- **適合推薦給**：旅宿與民宿、茶與工藝、日式或私廚餐廳、出版與藝文、文化品牌。
- **情緒目標**：客戶看到時覺得「有質感、有故事、慢下來」。
- **密度**：寬鬆，前台區塊間距 112px，文字行高較高。
- **個性所在**：明體標題、1px 細線、墨黑實心按鈕、朱紅的點綴與頁籤底線。

## Colors

- **Neutral 和紙（#F5F1E8）**：畫布與側欄；面板 `surface`（#FBF8F2）略亮。
- **Primary 墨黑（#1F1B16）**：主要按鈕、選中 chip 與分段控制、標題與內文。
- **Tertiary 朱紅（#B83A2B）**：連結、focus 外框、開關開啟、頁籤底線、圖表第二色。和紙底上對比約 5.4:1。
- **Secondary 茶褐（#7A6A55）**：圖表第三色與次要裝飾。
- **線條**：`outline`（#E2DACB）細線、`outline-strong`（#CFC4B1）輸入框與次要按鈕。
- **狀態色**：降低飽和度的苔綠、土黃、赭紅、藍灰，徽章淺底深字。
- **反白**：toast 與 tooltip 用墨黑底＋和紙色字。

## Typography

標題用 **Noto Serif TC**（明體，600 字重），內文用 **Noto Sans TC**。

- 標題字距 +0.02em，明體中文略微撐開更易讀。
- 標籤與按鈕 500 字重、字距 +0.04em。
- 內文 16px、行高 1.8，段落寬度約 36 個中文字。
- 數字用黑體並開啟 `tnum`，表格與金額保持清楚。

## Layout

- 後台：側欄與頂部列貼齊外框，和紙底＋1px 細線。
- 前台：最大寬度 1120px，區塊間距 112px；標題與內文之間 20px。
- 以細線與留白分組，不用卡片陰影。
- 間距系統 4px 為基本單位。

## Elevation & Depth

**完全平面。** 層次來自底色的三階明度（`surface-sunken` → `neutral` → `surface` → `surface-raised`）與 1px 細線。只有浮層有極淡投影 `0 12px 32px rgba(31,27,22,0.12)`；遮罩為 35% 墨黑。

## Shapes

**幾乎直角。** 控制項 2px、卡片 3px、浮層 4px，接近紙張邊緣的俐落感；徽章、開關、頭像保留全圓作為柔和的對比。

## Components

- **按鈕**：主要＝墨黑實心和紙字；次要＝和紙底＋`outline-strong` 細框；文字按鈕 hover 才出底色。
- **輸入框**：`surface-raised` 底＋細框，focus 時朱紅邊框。
- **頁籤**：底線式，選中項 2px 朱紅底線。
- **分段控制**：細框軌道，選中項墨黑實心。
- **表格**：表頭與內容同底、只靠細線區隔；hover 列 `surface-sunken`；勾選列淡朱紅。
- **開關**：開啟為朱紅。

## Do's and Don'ts

- Do 用留白與 1px 細線組織版面
- Do 讓朱紅只出現在連結、選中與 focus
- Do 標題用明體、內文用黑體
- Don't 使用投影、漸層或毛玻璃
- Don't 用大圓角或膠囊按鈕
- Don't 讓朱紅大面積鋪色

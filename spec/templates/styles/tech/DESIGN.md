---
version: alpha
name: 暗色科技 Dark Tech
description: 近黑畫布上的細格線與單一螢光萊姆綠，平面、銳利、資訊密集，像一台精準的儀器。
colors:
  primary: "#C6F24E"
  on-primary: "#0A0B0D"
  primary-hover: "#D6F87C"
  secondary: "#5EEAD4"
  tertiary: "#7DD3FC"
  neutral: "#0A0B0D"
  background: "{colors.neutral}"
  surface: "#111317"
  surface-raised: "#181B21"
  surface-sunken: "#0E1013"
  on-surface: "#E8EAED"
  on-surface-variant: "#A1A7B3"
  on-surface-subtle: "#8A919E"
  outline: "#23272F"
  outline-strong: "#343A45"
  track-off: "#4A515E"
  disabled: "#1A1D23"
  on-disabled: "#8A919E"
  scrim: "#000000B3"
  accent-container: "#1E2610"
  on-accent-container: "#D6F87C"
  inverse-surface: "#E8EAED"
  on-inverse-surface: "#0A0B0D"
  success: "#4ADE80"
  success-container: "#0F2A1A"
  on-success-container: "#86EFAC"
  warning: "#FBBF24"
  warning-container: "#2E2408"
  on-warning-container: "#FCD34D"
  error: "#F87171"
  on-error: "#1A0505"
  error-container: "#2D1214"
  on-error-container: "#FCA5A5"
  info: "#60A5FA"
  info-container: "#0F1F35"
  on-info-container: "#93C5FD"
  chart-1: "#C6F24E"
  chart-2: "#5EEAD4"
  chart-3: "#7DD3FC"
  chart-4: "#A1A7B3"
typography:
  display:
    fontFamily: Space Grotesk, Noto Sans TC
    fontSize: 52px
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk, Noto Sans TC
    fontSize: 34px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk, Noto Sans TC
    fontSize: 26px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Space Grotesk, Noto Sans TC
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
  title-md:
    fontFamily: Space Grotesk, Noto Sans TC
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.5
  body-lg:
    fontFamily: Space Grotesk, Noto Sans TC
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.75
  body-md:
    fontFamily: Space Grotesk, Noto Sans TC
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: Space Grotesk, Noto Sans TC
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
  label-lg:
    fontFamily: Space Grotesk, Noto Sans TC
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.01em
  label-md:
    fontFamily: Space Grotesk, Noto Sans TC
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Space Grotesk, Noto Sans TC
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.01em
  number-xl:
    fontFamily: JetBrains Mono
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.1
    fontFeature: "'tnum' 1"
  number-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    fontFeature: "'tnum' 1"
rounded:
  none: 0px
  sm: 2px
  md: 4px
  lg: 6px
  xl: 8px
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
  control-height: 40px
  row-height: 48px
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
    height: 40px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
  button-primary-disabled:
    backgroundColor: "{colors.disabled}"
    textColor: "{colors.on-disabled}"
  button-secondary:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.md}"
    padding: 16px
    height: 40px
  button-secondary-hover:
    backgroundColor: "{colors.outline}"
    textColor: "{colors.on-surface}"
  button-ghost-hover:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
  button-danger:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-error}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.md}"
  link:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
  input:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    height: 40px
  input-placeholder:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.on-surface-subtle}"
  input-error-message:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.error}"
    typography: "{typography.body-sm}"
  sidebar:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.on-surface-variant}"
    width: 240px
  nav-item-active:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.primary}"
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
    backgroundColor: "{colors.surface-raised}"
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
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-md}"
  table-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    height: 48px
  table-row-hover:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
  table-row-selected:
    backgroundColor: "{colors.accent-container}"
    textColor: "{colors.on-accent-container}"
  switch-on:
    backgroundColor: "{colors.primary}"
    rounded: "{rounded.full}"
  switch-off:
    backgroundColor: "{colors.track-off}"
  switch-thumb:
    backgroundColor: "{colors.on-primary}"
  tooltip:
    backgroundColor: "{colors.inverse-surface}"
    textColor: "{colors.on-inverse-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
  toast:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
  dialog:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xl}"
    padding: 24px
  skeleton:
    backgroundColor: "{colors.surface-raised}"
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
  swatch-tertiary:
    backgroundColor: "{colors.tertiary}"
---

# 暗色科技 Dark Tech

## Overview

**精準、冷靜、高效。** 近黑畫布上鋪一層極淡的 48px 細格線，像工程圖紙或終端機；所有面板都是平面的，只靠 1px 細線分層。整個畫面只有一個彩色：螢光萊姆綠，留給「現在能按的、正在發生的、最重要的」那一個東西。

- **適合推薦給**：SaaS、開發者工具、金融科技、AI 與資料平台——使用者盯著畫面很久、重視資訊效率的產品。
- **情緒目標**：客戶看到時覺得「專業、俐落、技術很強」。
- **密度**：後台偏密（表格列高 48px、控制項 40px），前台適中。
- **個性所在**：背景格線、萊姆綠的精準點綴、數字一律用等寬字（JetBrains Mono），讓金額與數量像儀表讀數。

## Colors

- **Neutral 近黑（#0A0B0D）**：畫布。`surface`（#111317）為面板、`surface-raised`（#181B21）為浮層與 hover、`surface-sunken`（#0E1013）為輸入框、表頭與側欄。
- **Primary 萊姆綠（#C6F24E）**：主要按鈕、選中 chip、連結、focus 外框、開關開啟、圖表主色。搭配近黑字 `on-primary`，不用白字。**一個畫面大面積只出現一處。**
- **Secondary 青（#5EEAD4）／Tertiary 天藍（#7DD3FC）**：只用在圖表第二、三色，不當介面強調色。
- **線條**：`outline`（#23272F）分隔、`outline-strong`（#343A45）輸入框與次要按鈕邊框。
- **文字**：`on-surface`（#E8EAED）主文字、`on-surface-variant`（#A1A7B3）次要、`on-surface-subtle`（#8A919E）placeholder，深底對比皆 ≥ 4.5:1。
- **狀態色**：高明度綠／黃／紅／藍，徽章用「深色 container＋淺字」。
- **反白**：tooltip 用 `inverse-surface`（淺灰底黑字），在暗色畫面裡一眼可見。

## Typography

拉丁字母與標題用 **Space Grotesk**（幾何、帶點機械感），中文用 **Noto Sans TC**，數字用 **JetBrains Mono**。

- 標題 600 字重、字距收緊 −0.02em；內文 16px、行高 1.7。
- 金額、數量、日期、訂單編號一律等寬字並開啟 `tnum`，表格數字欄右對齊。
- 等寬字只用在數據，不拿來裝飾一般文字。

## Layout

- 後台：側欄與頂部列貼齊外框（不漂浮），以 1px 細線分隔；內容區 12 欄網格、欄距 24px。
- 前台：最大寬度 1200px，區塊間距 96px。
- 背景格線固定在外框上，不隨內容捲動；手機寬度時格線間距不變、亮度降低。
- 間距系統 4px 為基本單位。

## Elevation & Depth

**平面，以底色明度與 1px 線條分層，不用投影。**

- 層級 0：畫布＋格線（#23272F 的 40% 透明度）＋頂部一圈極淡的萊姆綠光暈（6%）。
- 層級 1：面板 `surface`＋1px `outline`＋頂邊 1px 白 3% 內光。
- 層級 2（浮層）：`surface-raised`＋1px `outline-strong`＋`0 16px 48px rgba(0,0,0,0.6)`。
- 主要按鈕 hover：外加 4px 萊姆綠 22% 光環，這是全系統唯一的「發光」。

## Shapes

**小圓角、銳利。** 控制項 4px、卡片 6px、浮層 8px、tooltip 2px。chip、徽章、開關、頭像維持全圓，與方正的面板形成對比。

## Components

- **按鈕**：主要＝萊姆綠實心＋黑字；次要＝`surface-raised`＋`outline-strong` 邊框；文字按鈕 hover 才出底色。
- **輸入框**：`surface-sunken` 底＋`outline-strong` 邊框，focus 時邊框變萊姆綠。
- **頁籤**：底線式，選中項萊姆綠文字＋2px 萊姆綠底線。
- **分段控制**：深色軌道，選中項 `outline` 底＋細框。
- **表格**：表頭 `surface-sunken`、列高 48px、hover 列 `surface-raised`、勾選列萊姆綠 container。
- **開關**：開啟為萊姆綠軌道＋黑色圓鈕，關閉為 #4A515E 軌道。
- **toast**：`surface-raised`＋淺字；tooltip 反白。

## Do's and Don'ts

- Do 讓萊姆綠只出現在最重要的動作與狀態上
- Do 金額、數量、日期使用等寬數字
- Do 以 1px 線條與底色明度分層
- Don't 加彩色漸層或多種強調色
- Don't 用投影營造層次（浮層除外）
- Don't 把等寬字用在一般內文
- Don't 讓格線背景亮到干擾閱讀

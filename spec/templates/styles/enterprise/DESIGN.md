---
version: alpha
name: 企業專業 Enterprise
description: 白底配深藍與鋼藍，小圓角、資訊密度高，表格與表單紮實可靠，給人值得信任的穩定感。
colors:
  primary: "#0B3D91"
  on-primary: "#FFFFFF"
  primary-hover: "#082F70"
  secondary: "#3E6FB0"
  tertiary: "#00897B"
  neutral: "#F4F6F9"
  background: "{colors.neutral}"
  surface: "#FFFFFF"
  surface-raised: "#FFFFFF"
  surface-hover: "#F7F9FC"
  surface-sunken: "#EEF2F7"
  on-surface: "#0F1B2D"
  on-surface-variant: "#44526A"
  on-surface-subtle: "#5B6880"
  outline: "#D9DFE7"
  outline-strong: "#B7C1CE"
  disabled: "#EEF1F5"
  on-disabled: "#5B6880"
  scrim: "#0F1B2D66"
  accent: "#1F5FBF"
  on-accent: "#FFFFFF"
  accent-container: "#E8F0FB"
  on-accent-container: "#0B3D91"
  inverse-surface: "#0F1B2D"
  on-inverse-surface: "#FFFFFF"
  success: "#1E7B45"
  success-container: "#E6F4EC"
  on-success-container: "#16603A"
  warning: "#A35C00"
  warning-container: "#FFF4E0"
  on-warning-container: "#7A4500"
  error: "#B42318"
  on-error: "#FFFFFF"
  error-container: "#FDECEA"
  on-error-container: "#912018"
  info: "#1F5FBF"
  info-container: "#E8F0FB"
  on-info-container: "#174A96"
  chart-1: "#0B3D91"
  chart-2: "#3E6FB0"
  chart-3: "#7FA7D9"
  chart-4: "#00897B"
typography:
  display:
    fontFamily: IBM Plex Sans, Noto Sans TC
    fontSize: 44px
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: -0.005em
  headline-lg:
    fontFamily: IBM Plex Sans, Noto Sans TC
    fontSize: 30px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.005em
  headline-md:
    fontFamily: IBM Plex Sans, Noto Sans TC
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.005em
  headline-sm:
    fontFamily: IBM Plex Sans, Noto Sans TC
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.4
  title-md:
    fontFamily: IBM Plex Sans, Noto Sans TC
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.5
  body-lg:
    fontFamily: IBM Plex Sans, Noto Sans TC
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.75
  body-md:
    fontFamily: IBM Plex Sans, Noto Sans TC
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: IBM Plex Sans, Noto Sans TC
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
  label-lg:
    fontFamily: IBM Plex Sans, Noto Sans TC
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.2
  label-md:
    fontFamily: IBM Plex Sans, Noto Sans TC
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.2
  label-sm:
    fontFamily: IBM Plex Sans, Noto Sans TC
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.02em
  number-xl:
    fontFamily: IBM Plex Sans
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.1
    fontFeature: "'tnum' 1"
  number-md:
    fontFamily: IBM Plex Sans
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
  control-height: 36px
  row-height: 44px
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
    height: 36px
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
    height: 36px
  button-secondary-hover:
    backgroundColor: "{colors.surface-hover}"
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
    textColor: "{colors.accent}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    height: 36px
  input-placeholder:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-subtle}"
  input-error-message:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.error}"
    typography: "{typography.body-sm}"
  sidebar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-variant}"
    width: 240px
  nav-item-active:
    backgroundColor: "{colors.accent-container}"
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
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-md}"
  table-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    height: 44px
  table-row-hover:
    backgroundColor: "{colors.surface-hover}"
    textColor: "{colors.on-surface}"
  table-row-selected:
    backgroundColor: "{colors.accent-container}"
    textColor: "{colors.on-accent-container}"
  switch-on:
    backgroundColor: "{colors.primary}"
    rounded: "{rounded.full}"
  switch-off:
    backgroundColor: "{colors.outline-strong}"
  switch-thumb:
    backgroundColor: "{colors.surface}"
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
    backgroundColor: "{colors.surface}"
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
  swatch-tertiary:
    backgroundColor: "{colors.tertiary}"
  swatch-on-accent:
    backgroundColor: "{colors.on-accent}"
---

# 企業專業 Enterprise

## Overview

**穩定、可信、有效率。** 白底配深海軍藍，小圓角、細線、緊湊的列高；版面像一份整理得很好的報告，資訊多但井然有序。視覺上不搶戲，讓使用者專注在數據與流程。

- **適合推薦給**：金融與保險、B2B 服務、製造業、公部門、傳統產業——重視信任感與資訊量的客戶。
- **情緒目標**：客戶看到時覺得「可靠、專業、看得出是大公司」。
- **密度**：八種風格中最高（控制項 36px、表格列高 44px）。
- **個性所在**：深藍主色、紮實的表格、清楚的層級；以精準取代裝飾。

## Colors

- **Neutral 冷灰（#F4F6F9）**：畫布；面板與輸入框為純白 `surface`。
- **Primary 海軍藍（#0B3D91）**：主要按鈕、選中 chip、開關、頁籤底線、側欄選中文字。白字對比約 10:1。
- **Accent 亮藍（#1F5FBF）**：連結與 focus 外框；`accent-container`（#E8F0FB）為選中列、選中導覽底色。
- **Secondary 鋼藍（#3E6FB0）／Tertiary 青綠（#00897B）**：圖表第二、四色。
- **線條**：`outline`（#D9DFE7）卡片與分隔、`outline-strong`（#B7C1CE）輸入框。
- **狀態色**：標準的綠／橘／紅／藍，徽章淺底深字。
- **反白**：toast 與 tooltip 用深藍黑 `inverse-surface`＋白字，像系統訊息。

## Typography

**IBM Plex Sans**（拉丁、數字）＋ **Noto Sans TC**（中文）。

- 標題 600 字重、字級克制（主標 44px），層級靠字重與間距而不是大字。
- 內文 15–16px、行高 1.6；表格 14px。
- 數字開啟 `tnum`，金額右對齊。

## Layout

- 後台：側欄與頂部列貼齊外框，白底＋1px 細線；內容區 12 欄、欄距 24px。
- 表格列高 44px，一屏能看到更多資料。
- 前台最大寬度 1200px，區塊間距 80px。
- 間距系統 4px 為基本單位，群組內 8–12px。

## Elevation & Depth

**細線為主、極淡投影為輔。**

- 層級 1：卡片白底＋1px `outline`＋`0 1px 2px rgba(15,27,45,0.06)`。
- 層級 2：浮層白底＋1px `outline`＋`0 12px 32px rgba(15,27,45,0.16), 0 2px 6px rgba(15,27,45,0.08)`。
- 輸入框內側 1px 極淡內陰影，增加「可填寫」的質感。

## Shapes

**小圓角。** 控制項 4px、卡片 6px、浮層 8px、tooltip 2px。徽章、開關、頭像為全圓。

## Components

- **按鈕**：主要＝海軍藍實心白字；次要＝白底＋`outline-strong` 邊框；高度 36px。
- **輸入框**：白底、1px `outline-strong` 邊框，focus 時亮藍邊框＋光環。
- **頁籤**：底線式，選中項海軍藍文字＋2px 底線。
- **分段控制**：淺灰軌道，選中項白底微陰影。
- **表格**：表頭 `surface-sunken`（#EEF2F7）、列高 44px、hover 列 #F7F9FC、勾選列淺藍。
- **側欄**：白底，選中項淺藍底＋海軍藍字。

## Do's and Don'ts

- Do 用表格與清楚的層級呈現大量資料
- Do 保持小圓角與細線，讓畫面穩定
- Do 用海軍藍只標示主要動作與選中狀態
- Don't 使用大面積彩色或漸層
- Don't 用大字級營造氣勢，層級靠字重與間距
- Don't 在同一畫面放多個主要按鈕

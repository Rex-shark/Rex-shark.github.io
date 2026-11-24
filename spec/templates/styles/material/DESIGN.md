---
version: alpha
name: Material Material Design
description: Material 3 的語彙：淡紫白畫布、色調分層的表面、紫色主色與次要色容器，膠囊按鈕、12px 卡片與 28px 對話框，清楚、親切、好上手。
colors:
  primary: "#6750A4"
  on-primary: "#FFFFFF"
  primary-hover: "#5A4593"
  secondary: "#625B71"
  tertiary: "#7D5260"
  neutral: "#FEF7FF"
  background: "{colors.neutral}"
  surface: "#F7F2FA"
  surface-raised: "#FFFFFF"
  surface-sunken: "#ECE6F0"
  on-surface: "#1D1B20"
  on-surface-variant: "#49454F"
  on-surface-subtle: "#5C5862"
  outline: "#CAC4D0"
  outline-strong: "#79747E"
  disabled: "#E6E0E9"
  on-disabled: "#5C5862"
  scrim: "#1D1B2066"
  accent-container: "#E8DEF8"
  on-accent-container: "#1D192B"
  inverse-surface: "#322F35"
  on-inverse-surface: "#F5EFF7"
  success: "#2E6B45"
  success-container: "#DDEEDF"
  on-success-container: "#22512F"
  warning: "#7E520C"
  warning-container: "#F7E6C9"
  on-warning-container: "#6A400A"
  error: "#B3261E"
  on-error: "#FFFFFF"
  error-container: "#F9DEDC"
  on-error-container: "#8C1D16"
  info: "#1F5E8C"
  info-container: "#DCE9F3"
  on-info-container: "#174A6E"
  chart-1: "#6750A4"
  chart-2: "#7D5260"
  chart-3: "#006A6A"
  chart-4: "#B58B00"
typography:
  display:
    fontFamily: Roboto, Noto Sans TC
    fontSize: 57px
    fontWeight: 400
    lineHeight: 1.1
  headline-lg:
    fontFamily: Roboto, Noto Sans TC
    fontSize: 34px
    fontWeight: 400
    lineHeight: 1.2
  headline-md:
    fontFamily: Roboto, Noto Sans TC
    fontSize: 26px
    fontWeight: 400
    lineHeight: 1.3
  headline-sm:
    fontFamily: Roboto, Noto Sans TC
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.4
  title-md:
    fontFamily: Roboto, Noto Sans TC
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-lg:
    fontFamily: Roboto, Noto Sans TC
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.75
  body-md:
    fontFamily: Roboto, Noto Sans TC
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: Roboto, Noto Sans TC
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
  label-lg:
    fontFamily: Roboto, Noto Sans TC
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.01em
  label-md:
    fontFamily: Roboto, Noto Sans TC
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Roboto, Noto Sans TC
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.01em
  number-xl:
    fontFamily: Roboto
    fontSize: 32px
    fontWeight: 400
    lineHeight: 1.1
    fontFeature: "'tnum' 1"
  number-md:
    fontFamily: Roboto
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    fontFeature: "'tnum' 1"
rounded:
  none: 0px
  sm: 8px
  md: 12px
  lg: 12px
  xl: 28px
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
  row-height: 52px
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
    rounded: "{rounded.full}"
    padding: 18px
    height: 40px
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
    rounded: "{rounded.full}"
    padding: 18px
    height: 40px
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
    rounded: "{rounded.full}"
  link:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
  link-on-page:
    backgroundColor: "{colors.background}"
    textColor: "{colors.primary}"
  input:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    height: 40px
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
    backgroundColor: "{colors.accent-container}"
    textColor: "{colors.on-accent-container}"
    typography: "{typography.label-lg}"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
  chip-selected:
    backgroundColor: "{colors.accent-container}"
    textColor: "{colors.on-accent-container}"
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
    height: 52px
  table-row-hover:
    backgroundColor: "{colors.surface-sunken}"
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
  rating-star:
    backgroundColor: "{colors.tertiary}"
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

> 靈感來源：daisyUI UI Design Trends #005「Material Design」（https://trends.daisyui.com/）的公開風格描述，並參考 Google Material 3 公開規範。只借用風格語彙，配色數值與裝飾圖形皆為原創，**不使用其範例程式碼、截圖或情緒板圖片**。

# Material Material Design

## Overview

**清楚、親切、有系統。** Material 3 的語彙：淡紫白畫布、依色調分層的表面（越重要越亮）、紫色主色、柔和的次要色容器，膠囊按鈕、12px 卡片、28px 對話框。一看就知道怎麼操作，適合講求好上手的產品。

- **適合推薦給**：App 與 SaaS、Android 生態產品、教育與公共服務、新創 MVP、內部工具。
- **情緒目標**：客戶看到時覺得「很專業、很好用、跟大廠一樣可靠」。
- **密度**：中等（控制項 40px、表格列高 52px）。
- **個性所在**：次要色容器（淡紫）當選中狀態、膠囊按鈕、卡片的兩層柔和陰影。

## Colors

色彩策略是**色調系統**：每個角色都有「色＋上方文字色」一組。

- **Background（#FEF7FF）**、**Surface 容器（#F7F2FA）**、**最亮容器（#FFFFFF）**、**高容器（#ECE6F0）**：依層級使用。
- **Primary 紫（#6750A4）**：主要按鈕、連結、開關、focus、頁籤底線。
- **Secondary container（#E8DEF8）＋ on（#1D192B）**：側欄選中、選中 chip、分段控制選中項、選中列。
- **Tertiary（#7D5260）**：評分星等、徽章點綴。
- **狀態色**：Material 慣用的綠／琥珀／紅／藍，徽章用淺色容器＋深字。
- **圖表**：紫、酒紅、青綠、金黃。

## Typography

**Roboto** ＋ **Noto Sans TC**。標題 400 字重（Material 3 的 display／headline 不加粗），主標 57px；標籤 500 字重、字距 0.01em；內文 16px、行高 1.7；數字 Roboto 等寬。

## Layout

- **前台**：最大寬度 1200px、12 欄、欄距 24px。
- **後台**：側欄 240px，與畫布同色、不加分隔線；選中項是膠囊形的次要色容器。
- **間距系統**：4px 為單位，常用 8 / 12 / 16 / 24 / 32 / 48。

## Elevation & Depth

以**色調＋陰影**表示層級。卡片 Level 1：`0 1px 2px rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15)`；浮層 Level 3：`0 2px 3px rgba(0,0,0,0.3), 0 6px 10px 4px rgba(0,0,0,0.15)`。卡片不加邊框。

## Shapes

按鈕、chip、徽章用全圓膠囊；輸入框 8px（取 `rounded.sm`）；卡片 12px；對話框 28px。

## Components

- **按鈕**：高 40px 膠囊。主要按鈕紫底白字；次要按鈕為外框按鈕（透明底＋1px `outline-strong`）。
- **chip／分段控制**：選中項用次要色容器（淡紫底深字），不用主色實心。
- **頁籤**：選中項文字變紫並有 3px 底線。
- **側欄**：選中項膠囊形淡紫底。
- **focus**：2px 紫色外框。

## Do's and Don'ts

- Do 選中狀態用次要色容器，主色留給主要動作
- Do 卡片靠陰影分層、不加邊框
- Do 標題用 400 字重，靠字級建立層級
- Don't 自創 Material 規範以外的形狀（例如直角按鈕）
- Don't 同一畫面出現多個紫色實心主要按鈕

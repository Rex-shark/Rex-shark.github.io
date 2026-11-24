---
version: alpha
name: Metro 方塊 Metro / Modern UI
description: 以字為主的扁平方塊：白底、灰色磁磚、單一青綠強調色，全部直角、細字大標題、無多餘裝飾，資訊像看板一樣直接。
colors:
  primary: "#00796B"
  on-primary: "#FFFFFF"
  primary-hover: "#005F54"
  secondary: "#5C2D91"
  tertiary: "#D24726"
  neutral: "#FFFFFF"
  background: "{colors.neutral}"
  surface: "#F2F2F2"
  surface-raised: "#FFFFFF"
  surface-sunken: "#E6E6E6"
  on-surface: "#1F1F1F"
  on-surface-variant: "#454545"
  on-surface-subtle: "#595959"
  outline: "#E1E1E1"
  outline-strong: "#8A8A8A"
  disabled: "#EBEBEB"
  on-disabled: "#595959"
  scrim: "#1F1F1F80"
  accent-container: "#D5EFEB"
  on-accent-container: "#004F46"
  inverse-surface: "#1F1F1F"
  on-inverse-surface: "#FFFFFF"
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
  chart-1: "#00796B"
  chart-2: "#D24726"
  chart-3: "#5C2D91"
  chart-4: "#F2A900"
typography:
  display:
    fontFamily: Open Sans, Noto Sans TC
    fontSize: 64px
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Open Sans, Noto Sans TC
    fontSize: 34px
    fontWeight: 300
    lineHeight: 1.2
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Open Sans, Noto Sans TC
    fontSize: 26px
    fontWeight: 300
    lineHeight: 1.3
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Open Sans, Noto Sans TC
    fontSize: 20px
    fontWeight: 300
    lineHeight: 1.4
  title-md:
    fontFamily: Open Sans, Noto Sans TC
    fontSize: 16px
    fontWeight: 300
    lineHeight: 1.5
  body-lg:
    fontFamily: Open Sans, Noto Sans TC
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.75
  body-md:
    fontFamily: Open Sans, Noto Sans TC
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: Open Sans, Noto Sans TC
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
  label-lg:
    fontFamily: Open Sans, Noto Sans TC
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.2
  label-md:
    fontFamily: Open Sans, Noto Sans TC
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.2
  label-sm:
    fontFamily: Open Sans, Noto Sans TC
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.2
  number-xl:
    fontFamily: Open Sans
    fontSize: 32px
    fontWeight: 300
    lineHeight: 1.1
    fontFeature: "'tnum' 1"
  number-md:
    fontFamily: Open Sans
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.4
    fontFeature: "'tnum' 1"
rounded:
  none: 0px
  sm: 0px
  md: 0px
  lg: 0px
  xl: 0px
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
    rounded: "{rounded.none}"
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
    rounded: "{rounded.none}"
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
    rounded: "{rounded.none}"
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
    rounded: "{rounded.none}"
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
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-lg}"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
  chip-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  badge-neutral:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.none}"
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
    height: 48px
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

> 靈感來源：daisyUI UI Design Trends #006「Metro / Modern UI」（https://trends.daisyui.com/）的公開風格描述。只借用風格語彙，配色數值與裝飾圖形皆為原創，**不使用其範例程式碼、截圖或情緒板圖片**。

# Metro 方塊 Metro / Modern UI

## Overview

**以字為主、方塊、直接。** 白底上的灰色磁磚，全部直角，細字大標題，選中狀態用青綠實心方塊，幾乎沒有陰影與裝飾，像車站看板與資訊亭一樣直接好讀。

- **適合推薦給**：媒體與新聞、交通與公共資訊、企業入口網站、數據看板、科技產品。
- **情緒目標**：客戶看到時覺得「很乾淨、很現代、資訊一目了然」。
- **密度**：中等偏緊（控制項 40px、表格列高 48px）。
- **個性所在**：細字（300）超大標題、灰色磁磚卡片、青綠實心選中項、全直角。

## Colors

- **Background 白（#FFFFFF）**、**磁磚（#F2F2F2）**、**深一階（#E6E6E6）**。
- **Primary 青綠（#00796B）**：主要按鈕、連結、開關、側欄選中、分段控制選中、toast 底。
- **Secondary 紫（#5C2D91）**、**Tertiary 橘（#D24726）**：圖表與點綴，Metro 常見的多色磁磚語彙。
- **focus**：2px 近黑外框（Metro 的焦點框是實線黑框）。
- **狀態色**：標準綠／琥珀／紅／藍。

## Typography

**Open Sans**（接近 Segoe 的人文無襯線）＋ **Noto Sans TC**。標題 300 細字、主標 64px、字距 −0.01em；標籤 600；內文 16px。標題越大越細，是 Metro 的標誌。

## Layout

- 內容貼齊網格與邊緣（edge-to-edge），磁磚之間 8–16px 等距。
- **後台**：側欄 240px 白底＋1px 細線，選中項整列青綠實心。
- **間距系統**：4px 為單位。

## Elevation & Depth

**沒有陰影**。層級只靠底色（白 → 灰磁磚 → 深灰 hover）。浮層用 1px 中灰邊框區隔。

## Shapes

**全部直角**（0px），包括按鈕、輸入框、卡片、對話框、chip、徽章；只有開關與步驟節點保留圓形。

## Components

- **按鈕**：高 40px 直角。主要按鈕青綠實心白字；次要按鈕灰色實心、無邊框。
- **卡片**：灰色磁磚、無邊框、無陰影，hover 變深一階。
- **頁籤**：選中項下方 2px 青綠線，未選項不加底線軌道。
- **toast**：青綠實心＋白字。
- **focus**：2px 近黑外框。

## Do's and Don'ts

- Do 讓字當主角：細字大標題、清楚的層級
- Do 全部直角、無陰影
- Do 用單一強調色表示選中
- Don't 加漸層、圓角或擬物陰影
- Don't 用粗體大標題（Metro 的大標題是細的）

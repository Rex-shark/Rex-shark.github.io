---
version: alpha
name: Aqua 果凍 Aqua UI
description: 2000 年代初的果凍光澤：細條紋灰底、金屬感頂部列、像糖果一樣有高光的藍色膠囊按鈕，介面晶亮、圓潤、帶一點懷舊。
colors:
  primary: "#1A63B3"
  on-primary: "#FFFFFF"
  primary-hover: "#155497"
  secondary: "#1A61B5"
  tertiary: "#B86A10"
  neutral: "#ECECEC"
  background: "{colors.neutral}"
  surface: "#FAFAFA"
  surface-raised: "#FFFFFF"
  surface-sunken: "#E2E2E2"
  on-surface: "#1C1C1C"
  on-surface-variant: "#444444"
  on-surface-subtle: "#575757"
  outline: "#CCCCCC"
  outline-strong: "#8F8F8F"
  disabled: "#E6E6E6"
  on-disabled: "#575757"
  scrim: "#00000059"
  accent-container: "#D6E7FA"
  on-accent-container: "#134A87"
  inverse-surface: "#2B2B2B"
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
  chart-1: "#1F6FC8"
  chart-2: "#3FB34F"
  chart-3: "#F5A623"
  chart-4: "#D0021B"
typography:
  display:
    fontFamily: Lucida Grande, Noto Sans, Noto Sans TC
    fontSize: 44px
    fontWeight: 700
    lineHeight: 1.1
  headline-lg:
    fontFamily: Lucida Grande, Noto Sans, Noto Sans TC
    fontSize: 34px
    fontWeight: 700
    lineHeight: 1.2
  headline-md:
    fontFamily: Lucida Grande, Noto Sans, Noto Sans TC
    fontSize: 26px
    fontWeight: 700
    lineHeight: 1.3
  headline-sm:
    fontFamily: Lucida Grande, Noto Sans, Noto Sans TC
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.4
  title-md:
    fontFamily: Lucida Grande, Noto Sans, Noto Sans TC
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1.5
  body-lg:
    fontFamily: Lucida Grande, Noto Sans, Noto Sans TC
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.75
  body-md:
    fontFamily: Lucida Grande, Noto Sans, Noto Sans TC
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: Lucida Grande, Noto Sans, Noto Sans TC
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
  label-lg:
    fontFamily: Lucida Grande, Noto Sans, Noto Sans TC
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.2
  label-md:
    fontFamily: Lucida Grande, Noto Sans, Noto Sans TC
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.2
  label-sm:
    fontFamily: Lucida Grande, Noto Sans, Noto Sans TC
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.2
  number-xl:
    fontFamily: Lucida Grande
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.1
    fontFeature: "'tnum' 1"
  number-md:
    fontFamily: Lucida Grande
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.4
    fontFeature: "'tnum' 1"
rounded:
  none: 0px
  sm: 4px
  md: 6px
  lg: 8px
  xl: 10px
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
    rounded: "{rounded.full}"
    padding: 18px
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
    rounded: "{rounded.full}"
    padding: 18px
    height: 36px
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
    textColor: "{colors.secondary}"
  link-on-page:
    backgroundColor: "{colors.background}"
    textColor: "{colors.secondary}"
  input:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    height: 36px
  input-placeholder:
    backgroundColor: "{colors.surface-raised}"
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
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
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
    height: 44px
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

> 靈感來源：daisyUI UI Design Trends #012「Aqua UI」（https://trends.daisyui.com/）的公開風格描述。只借用風格語彙，配色數值與裝飾圖形皆為原創，**不使用其範例程式碼、截圖或情緒板圖片**。

# Aqua 果凍 Aqua UI

## Overview

**晶亮、圓潤、懷舊。** 2000 年代初桌面系統的語彙：細條紋灰底、金屬感的頂部列、像糖果一樣有高光的藍色膠囊按鈕。介面看起來是「濕潤、透光」的。

- **適合推薦給**：懷舊與復古品牌、設計與創意社群、音樂與播放器、活動網站、Mac 生態工具。
- **情緒目標**：客戶看到時覺得「好懷念、好亮眼、很有個性」。
- **密度**：中等偏緊（控制項 36px、表格列高 44px）。
- **個性所在**：果凍高光按鈕、細條紋背景、金屬頂部列、藍色實心選中項。

## Colors

- **Background（#ECECEC）**＋白色細條紋；**面板（#FAFAFA）**；**凹槽（#E2E2E2）**。
- **Primary 果凍藍（#1A63B3）**：主要按鈕、側欄選中、分段控制與頁籤選中；**連結（#1A61B5）**。
- **focus**：2px 亮藍（#3B8BE5）外光暈。
- **圖表**：藍、綠、橙、紅，晶亮的高飽和色。

## Typography

**Lucida Grande**（系統字；其他平台退回 **Noto Sans**）＋ **Noto Sans TC**。標題 700、主標 44px；內文 13–16px。

## Layout

- **後台**：側欄淡藍灰半透明底＋右側細線，像來源清單。
- 面板是有細邊框的白色視窗。

## Elevation & Depth

**果凍高光**：主要按鈕 `inset 0 12px 10px -8px 白70%`（上半部高光）＋ `inset 0 -8px 10px -4px 深藍35%`（下半部透光）＋ 1px 深藍邊；次要按鈕是白色果凍。面板只有輕微投影。

## Shapes

按鈕、chip、徽章全圓膠囊；輸入框 6px；卡片 8px；對話框 10px。

## Components

- **按鈕**：膠囊果凍。主要按鈕藍色、次要按鈕白色，按下時改為內凹。
- **頂部列**：金屬灰、上緣白線、下緣深線。
- **分段控制／頁籤**：選中項為藍色果凍。
- **背景裝飾**：2px 間隔的白色細條紋。
- **focus**：亮藍外框。

## Do's and Don'ts

- Do 高光集中在按鈕上半部、透光在下半部
- Do 藍色只給主要動作與選中狀態
- Don't 使用系統原版圖示或視窗按鈕（商標）
- Don't 讓條紋對比過強而干擾閱讀

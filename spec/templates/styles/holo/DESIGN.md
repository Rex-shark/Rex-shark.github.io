---
version: alpha
name: 全像虹彩 Holographic / Iridescent
description: 珍珠般的全像光澤：淡紫白畫布上漂著粉、青、紫的虹彩光暈，面板帶雙色光邊，像角度一變就換顏色的雷射卡。
colors:
  primary: "#5B3FD6"
  on-primary: "#FFFFFF"
  primary-hover: "#4A30BD"
  secondary: "#0F5C75"
  tertiary: "#D9468F"
  neutral: "#F3F0FA"
  background: "{colors.neutral}"
  surface: "#FCFBFF"
  surface-raised: "#FFFFFF"
  surface-sunken: "#EAE5F5"
  on-surface: "#1E1A2E"
  on-surface-variant: "#474060"
  on-surface-subtle: "#565071"
  outline: "#DDD6EE"
  outline-strong: "#9C93B8"
  disabled: "#ECE8F5"
  on-disabled: "#565071"
  scrim: "#1E1A2E66"
  accent-container: "#DDF4FA"
  on-accent-container: "#0C4A5E"
  inverse-surface: "#1E1A2E"
  on-inverse-surface: "#FCFBFF"
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
  chart-1: "#5B3FD6"
  chart-2: "#22A6C9"
  chart-3: "#E0569B"
  chart-4: "#7FCB62"
typography:
  display:
    fontFamily: Sora, Noto Sans TC
    fontSize: 54px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora, Noto Sans TC
    fontSize: 34px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Sora, Noto Sans TC
    fontSize: 26px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Sora, Noto Sans TC
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
  title-md:
    fontFamily: Sora, Noto Sans TC
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.5
  body-lg:
    fontFamily: Sora, Noto Sans TC
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.75
  body-md:
    fontFamily: Sora, Noto Sans TC
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: Sora, Noto Sans TC
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
  label-lg:
    fontFamily: Sora, Noto Sans TC
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.01em
  label-md:
    fontFamily: Sora, Noto Sans TC
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Sora, Noto Sans TC
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.01em
  number-xl:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.1
    fontFeature: "'tnum' 1"
  number-md:
    fontFamily: Sora
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.4
    fontFeature: "'tnum' 1"
rounded:
  none: 0px
  sm: 10px
  md: 14px
  lg: 20px
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
  control-height: 44px
  row-height: 54px
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
    height: 44px
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
    height: 44px
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
    height: 44px
  input-placeholder:
    backgroundColor: "{colors.surface-raised}"
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
    textColor: "{colors.on-accent-container}"
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
    height: 54px
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

> 靈感來源：daisyUI UI Design Trends #014「Holographic / Iridescent UI」（https://trends.daisyui.com/）的公開風格描述。只借用風格語彙，配色數值與裝飾圖形皆為原創，**不使用其範例程式碼、截圖或情緒板圖片**。

# 全像虹彩 Holographic / Iridescent

## Overview

**珍珠、虹彩、未來感。** 淡紫白畫布上漂著粉、青、紫的虹彩光暈，面板是半透明的珍珠白，邊緣帶一粉一青的雙色光，主按鈕兩側也有虹彩光，像角度一變就換顏色的雷射卡。

- **適合推薦給**：美妝與香氛、時尚與潮流、音樂與活動、Web3 與科技新創、Z 世代品牌。
- **情緒目標**：客戶看到時覺得「好夢幻、很新、很潮」。
- **密度**：中等（控制項 44px、表格列高 54px）。
- **個性所在**：面板左上粉光、右下青光的雙色光邊、虹彩背景、主按鈕的雙色光暈。

## Colors

- **Background（#F3F0FA）**＋虹彩光暈（粉、青、紫、薄荷，低不透明度）。
- **面板**：白 74% ＋模糊；**對比計算以 surface（#FCFBFF）為準**。
- **Primary 電光紫（#5B3FD6）**：主要按鈕、開關、focus。**Secondary 深青（#0F5C75）**：連結。
- **Tertiary 莓粉（#D9468F）**：評分星等。
- **Accent container 冰青（#DDF4FA）**：側欄選中、選中列。

## Typography

**Sora**（幾何、帶未來感）＋ **Noto Sans TC**。標題 600、字距 −0.02em、主標 54px；標籤 600。

## Layout

- **後台**：側欄是浮在畫布上的珍珠面板（四周 12px、20px 圓角）。
- 面板之間 20–24px，讓雙色光有空間。

## Elevation & Depth

**雙色光邊**：面板 `-8px -8px 24px 粉14%` ＋ `8px 8px 24px 青16%` ＋頂邊白色高光＋模糊。浮層更強。主要按鈕 `-3px 0 12px 粉` ＋ `3px 0 12px 青`。開啟「減少透明度」時面板改實色。

## Shapes

圓潤：輸入框 14px、卡片 20px、對話框 28px；按鈕、chip、徽章全圓膠囊。

## Components

- **按鈕**：主要按鈕電光紫＋白字＋雙色光暈；次要按鈕半透明白。
- **分段控制**：選中項白底＋雙色光。
- **背景裝飾**：兩團大型虹彩光暈（錐形漸層＋模糊），極緩慢旋轉；減少動態時靜止。
- **focus**：2px 紫色外框。

## Do's and Don'ts

- Do 虹彩只在背景與光邊，文字永遠在實色或高不透明度面板上
- Do 雙色光固定「左上粉、右下青」
- Don't 使用彩虹漸層文字或彩虹按鈕底色
- Don't 讓虹彩光暈高對比、快速變化

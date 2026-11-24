---
version: alpha
name: 新藝術 Art Nouveau
description: 新藝術的植物曲線：奶油畫布、深梅紫文字、霧青綠主色與玫瑰、古金點綴；卡片上方圓弧、下方直角，像拱門與窗框，角落有原創的藤蔓曲線。
colors:
  primary: "#2F6B64"
  on-primary: "#FFFBF2"
  primary-hover: "#24564F"
  secondary: "#8E4F5F"
  tertiary: "#A07C34"
  neutral: "#F5EEDD"
  background: "{colors.neutral}"
  surface: "#FAF5E8"
  surface-raised: "#FFFBF2"
  surface-sunken: "#EBE5CF"
  on-surface: "#3A1E34"
  on-surface-variant: "#5C4255"
  on-surface-subtle: "#684E61"
  outline: "#DDD3B6"
  outline-strong: "#A9A07E"
  disabled: "#ECE5D2"
  on-disabled: "#684E61"
  scrim: "#3A1E3466"
  accent-container: "#E2EBDD"
  on-accent-container: "#2A4A3A"
  inverse-surface: "#3A1E34"
  on-inverse-surface: "#FAF5E8"
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
  chart-1: "#2F6B64"
  chart-2: "#8E4F5F"
  chart-3: "#A07C34"
  chart-4: "#6C5A8E"
typography:
  display:
    fontFamily: Elsie, Noto Serif TC
    fontSize: 56px
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: 0.01em
  headline-lg:
    fontFamily: Elsie, Noto Serif TC
    fontSize: 34px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.01em
  headline-md:
    fontFamily: Elsie, Noto Serif TC
    fontSize: 26px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0.01em
  headline-sm:
    fontFamily: Elsie, Noto Serif TC
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.4
  title-md:
    fontFamily: Elsie, Noto Serif TC
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.5
  body-lg:
    fontFamily: Lora, Noto Serif TC
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.75
  body-md:
    fontFamily: Lora, Noto Serif TC
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: Lora, Noto Serif TC
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
  label-lg:
    fontFamily: Lora, Noto Serif TC
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.02em
  label-md:
    fontFamily: Lora, Noto Serif TC
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Lora, Noto Serif TC
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.02em
  number-xl:
    fontFamily: Lora
    fontSize: 32px
    fontWeight: 500
    lineHeight: 1.1
    fontFeature: "'tnum' 1"
  number-md:
    fontFamily: Lora
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    fontFeature: "'tnum' 1"
rounded:
  none: 0px
  sm: 8px
  md: 14px
  lg: 28px
  xl: 80px
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
    rounded: "{rounded.full}"
    padding: 18px
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
    rounded: "{rounded.full}"
    padding: 18px
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
    height: 42px
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
    height: 56px
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

> 靈感來源：daisyUI UI Design Trends #048「Art Nouveau」（https://trends.daisyui.com/）的公開風格描述；卡片「上圓下方」的拱門形狀為 Rex 指定。只借用風格語彙，配色數值與裝飾圖形皆為原創，**不使用其範例程式碼、截圖或情緒板圖片**。

# 新藝術 Art Nouveau

## Overview

**優雅、植物、拱門。** 新藝術運動的語彙：奶油色畫布、深梅紫文字、霧青綠主色，加上玫瑰與古金點綴。卡片**上方兩角圓弧、下方直角**，像拱門與老窗框；大圖用更高的拱形。角落有原創的藤蔓曲線。

- **適合推薦給**：花藝與植栽、美容與 SPA、婚禮與活動、旅宿與茶館、精品包裝與老字號。
- **情緒目標**：客戶看到時覺得「好優雅、有故事、很細膩」。
- **密度**：中等（控制項 42px、表格列高 56px）。
- **個性所在**：上圓下方的拱門卡片、Elsie 裝飾標題、角落藤蔓曲線、霧青綠膠囊按鈕。

## Colors

柔和的植物色調，不用數位原色。

- **Background 奶油（#F5EEDD）**、**卡片（#FAF5E8）**、**凹槽（#EBE5CF）**。
- **On-surface 深梅紫（#3A1E34）**：所有文字的主色。
- **Primary 霧青綠（#2F6B64）**：主要按鈕、開關、focus、分段控制選中。
- **Secondary 玫瑰（#8E4F5F）**：連結。
- **Tertiary 古金（#A07C34）**：評分星等、裝飾線。
- **Outline 鼠尾草（#A9A07E）**：卡片邊框。
- **Accent container 淡鼠尾草（#E2EBDD）**：側欄選中、選中列。

## Typography

標題 **Elsie**（新藝術時期風格的裝飾字），內文 **Lora**（優雅好讀的襯線），中文一律 **Noto Serif TC**（明體）。裝飾字只用在標題與短名稱，內文一律用好讀的襯線。主標 56px。

## Layout

- 高挑的構圖：大圖用拱形框，區塊之間留白充足。
- **後台**：側欄 240px 鼠尾草凹槽底＋右側細線，選中項膠囊形淡鼠尾草。
- **間距系統**：4px 為單位。

## Elevation & Depth

**以線框取代陰影**：卡片 1px 鼠尾草邊框、無陰影；浮層才有柔和梅紫陰影。

## Shapes

**拱門**是這個風格的核心：

- 卡片：`border-radius: 28px 28px 0 0`（上圓下方），由 `--tpl-card-radius` 提供。
- 大圖與主視覺：`80px 80px 0 0`（`--tpl-card-radius-xl`，手機 48px）。
- 按鈕、chip、徽章：全圓膠囊；輸入框 8px；對話框維持四角 28px（浮層不做拱門，避免底部看起來被切掉）。

## Components

- **按鈕**：膠囊。主要按鈕霧青綠＋奶油白字；次要按鈕卡片底＋鼠尾草框。
- **卡片**：上圓下方、1px 鼠尾草框。
- **分段控制**：外框細線，選中項霧青綠實心。
- **頁籤**：選中項 2px 霧青綠底線。
- **背景裝飾**：右上與左下的原創藤蔓曲線（鼠尾草、古金），低不透明度、不可互動。
- **focus**：2px 霧青綠外框。

## Do's and Don'ts

- Do 卡片與大圖一律上圓下方
- Do 裝飾字只用在標題，內文用好讀的襯線
- Do 色彩維持柔和的植物色調
- Don't 使用數位感的高飽和原色
- Don't 讓藤蔓裝飾壓到文字或按鈕

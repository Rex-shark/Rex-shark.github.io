---
version: alpha
name: 黃昏城市 Dusk City
description: 深石油藍的暮色畫布，夕陽橘主色與沙色點綴，幾何無襯線字，底部一道地平線光暈與城市剪影，安靜而溫暖。
colors:
  primary: "#F2954B"
  on-primary: "#2A1405"
  primary-hover: "#F7AE6E"
  secondary: "#E3CE93"
  tertiary: "#E0662A"
  neutral: "#0B2C38"
  background: "{colors.neutral}"
  surface: "#113845"
  surface-raised: "#17434F"
  surface-sunken: "#0E3340"
  on-surface: "#F4E7D0"
  on-surface-variant: "#CFD8D6"
  on-surface-subtle: "#A7B9BC"
  outline: "#24505D"
  outline-strong: "#4B7A86"
  disabled: "#1A3E4A"
  on-disabled: "#A7B9BC"
  scrim: "#04161DAA"
  accent-container: "#4A2A17"
  on-accent-container: "#F8C79A"
  inverse-surface: "#F4E7D0"
  on-inverse-surface: "#0B2C38"
  success: "#7FD39A"
  success-container: "#163F2C"
  on-success-container: "#A6E5BA"
  warning: "#F2C462"
  warning-container: "#433514"
  on-warning-container: "#F6D88E"
  error: "#F08A7E"
  on-error: "#2A0A06"
  error-container: "#4A1C18"
  on-error-container: "#F7B5AC"
  info: "#8CC2E8"
  info-container: "#173A52"
  on-info-container: "#B5D8F0"
  chart-1: "#F2954B"
  chart-2: "#E3CE93"
  chart-3: "#6FB7C9"
  chart-4: "#D9667A"
typography:
  display:
    fontFamily: Jost, Noto Sans TC
    fontSize: 54px
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: 0.01em
  headline-lg:
    fontFamily: Jost, Noto Sans TC
    fontSize: 34px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.01em
  headline-md:
    fontFamily: Jost, Noto Sans TC
    fontSize: 26px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0.01em
  headline-sm:
    fontFamily: Jost, Noto Sans TC
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.4
  title-md:
    fontFamily: Jost, Noto Sans TC
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.5
  body-lg:
    fontFamily: Jost, Noto Sans TC
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.75
  body-md:
    fontFamily: Jost, Noto Sans TC
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: Jost, Noto Sans TC
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
  label-lg:
    fontFamily: Jost, Noto Sans TC
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.03em
  label-md:
    fontFamily: Jost, Noto Sans TC
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.03em
  label-sm:
    fontFamily: Jost, Noto Sans TC
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.03em
  number-xl:
    fontFamily: Jost
    fontSize: 32px
    fontWeight: 500
    lineHeight: 1.1
    fontFeature: "'tnum' 1"
  number-md:
    fontFamily: Jost
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    fontFeature: "'tnum' 1"
rounded:
  none: 0px
  sm: 6px
  md: 10px
  lg: 14px
  xl: 20px
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
    rounded: "{rounded.md}"
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
    rounded: "{rounded.md}"
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
    rounded: "{rounded.md}"
    height: 44px
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
    rounded: "{rounded.md}"
  chip-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  badge-neutral:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.md}"
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

> 靈感來源：CSS Zen Garden #177「Zen City Morning」（Ray Henry）。只借用風格語彙（城市剪影、暮色漸層、深藍配暖橘），配色數值、圖形與版面皆為原創；原作為 CC BY-NC-SA 授權且註明不可複製，**不得使用原作的圖片、CSS 或可辨識的版面**。

# 黃昏城市 Dusk City

## Overview

**溫暖的暗色、城市、靜謐。** 太陽剛落下的城市：深石油藍的天色，夕陽橘的主色，沙色的次要強調，幾何感的無襯線字。畫面底部有一道淡淡的地平線光暈與城市剪影，介面本身則乾淨、有適度圓角。

- **適合推薦給**：旅宿與城市導覽、酒吧與夜間餐飲、影像與音樂、建築與不動產、生活風格 App。
- **情緒目標**：客戶看到時覺得「有氣氛、很放鬆、質感好」。
- **密度**：中等（控制項 44px、表格列高 56px）。
- **個性所在**：夕陽橘主按鈕與 hover 光暈、底部的地平線光暈與剪影、沙色連結。

## Colors

色彩策略是**深石油藍畫布＋夕陽橘主色＋沙色點綴**，暖冷對比。

- **Background 石油藍（#0B2C38）**：畫布；卡片 `surface`（#113845）、浮層 `surface-raised`（#17434F），越上層越亮。
- **On-surface 暖白（#F4E7D0）**：不用純白，帶一點夕陽的暖。
- **Primary 夕陽橘（#F2954B）**：主要按鈕、開關、選中 chip、focus，配深棕字（不用白字）。
- **Secondary 沙色（#E3CE93）**：連結、次要強調。
- **Tertiary 赤橘（#E0662A）**：評分星等、裝飾。
- **圖表**：夕陽橘、沙色、霧藍（#6FB7C9）、暮粉（#D9667A）。
- **狀態色**：高明度的綠／黃／紅／藍，徽章用「深色底＋淺色字」。

## Typography

**Jost**（幾何無襯線，帶 1920 年代現代主義感）＋ **Noto Sans TC**。

- **標題**：500 字重、字距 0.01em，主標 54px；不用粗體，靠尺寸與留白。
- **內文**：16px、行高 1.7。
- **標籤**：500 字重、字距 0.03em。
- **數字**：Jost 等寬數字。

## Layout

- **前台**：最大寬度 1200px、12 欄、欄距 24px；區塊之間 96px。
- **後台**：側欄 240px，半透明的深一階石油藍；內容區卡片之間 24px。
- **間距系統**：4px 為單位。

## Elevation & Depth

**亮度越高、層級越高。** 畫布 → 卡片 → 浮層依序變亮，搭配深色陰影 `0 10px 30px rgba(2,16,22,0.28)`；主要按鈕 hover 出現夕陽橘光暈。頁首與側欄用半透明＋模糊，捲動時看得到下方內容。

## Shapes

中等圓角：控制項 10px、輸入框 10px、卡片 14px、對話框 20px。chip 與徽章同控制項圓角。

## Components

- **按鈕**：高 44px、10px 圓角。主要按鈕夕陽橘＋深棕字，hover 變亮並出現光暈；次要按鈕卡片底＋1px 線框。
- **側欄**：選中項深橘棕底＋淺橘字。
- **頁籤**：選中項下方 2px 夕陽橘線。
- **背景裝飾**：底部一道地平線光暈（夕陽橘，極低不透明度）與一排深色城市剪影，固定在畫面底部、不隨內容捲動、不可互動；剪影比畫布更深，不會降低文字對比。手機上降低不透明度。
- **focus**：2px 夕陽橘外框。

## Do's and Don'ts

- Do 主要按鈕用夕陽橘配深棕字
- Do 層級用亮度區分，越上層越亮
- Do 裝飾只放在畫面底部，保持內容區乾淨
- Don't 用純白文字或純黑背景
- Don't 讓光暈變成大面積漸層背景
- Don't 把沙色或夕陽橘用在大段內文

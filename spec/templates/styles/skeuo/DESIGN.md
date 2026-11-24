---
version: alpha
name: 擬物 Skeuomorphism
description: 擬物的實體感：亞麻布紋畫布、帶斜面與投影的面板、凸起的按鈕與壓入的輸入框、光澤藍主按鈕，像一台做工細緻的老器材。
colors:
  primary: "#2D63A6"
  on-primary: "#FFFFFF"
  primary-hover: "#24538C"
  secondary: "#2D63A6"
  tertiary: "#B07A20"
  neutral: "#E6E1D6"
  background: "{colors.neutral}"
  surface: "#F6F3EC"
  surface-raised: "#FFFDF8"
  surface-sunken: "#DCD6C8"
  on-surface: "#2B2520"
  on-surface-variant: "#4E463E"
  on-surface-subtle: "#5C534A"
  outline: "#CFC7B6"
  outline-strong: "#9E937E"
  disabled: "#E2DCD0"
  on-disabled: "#5C534A"
  scrim: "#2B252066"
  accent-container: "#DCE6F3"
  on-accent-container: "#1F4777"
  inverse-surface: "#2B2520"
  on-inverse-surface: "#F6F3EC"
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
  chart-1: "#2D63A6"
  chart-2: "#B07A20"
  chart-3: "#5B7A3A"
  chart-4: "#A24B3C"
typography:
  display:
    fontFamily: PT Sans, Noto Sans TC
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.1
  headline-lg:
    fontFamily: PT Sans, Noto Sans TC
    fontSize: 34px
    fontWeight: 700
    lineHeight: 1.2
  headline-md:
    fontFamily: PT Sans, Noto Sans TC
    fontSize: 26px
    fontWeight: 700
    lineHeight: 1.3
  headline-sm:
    fontFamily: PT Sans, Noto Sans TC
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.4
  title-md:
    fontFamily: PT Sans, Noto Sans TC
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1.5
  body-lg:
    fontFamily: PT Sans, Noto Sans TC
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.75
  body-md:
    fontFamily: PT Sans, Noto Sans TC
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: PT Sans, Noto Sans TC
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
  label-lg:
    fontFamily: PT Sans, Noto Sans TC
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.01em
  label-md:
    fontFamily: PT Sans, Noto Sans TC
    fontSize: 13px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.01em
  label-sm:
    fontFamily: PT Sans, Noto Sans TC
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.01em
  number-xl:
    fontFamily: PT Sans
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.1
    fontFeature: "'tnum' 1"
  number-md:
    fontFamily: PT Sans
    fontSize: 14px
    fontWeight: 700
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
    rounded: "{rounded.md}"
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
    rounded: "{rounded.md}"
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
    rounded: "{rounded.md}"
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
    rounded: "{rounded.md}"
    height: 40px
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

> 靈感來源：daisyUI UI Design Trends #008「Skeuomorphism」（https://trends.daisyui.com/）的公開風格描述。只借用風格語彙，配色數值與裝飾圖形皆為原創，**不使用其範例程式碼、截圖或情緒板圖片**。

# 擬物 Skeuomorphism

## Overview

**實體、觸感、做工細緻。** 介面像一台實體器材：亞麻布紋的畫布、有斜面與投影的面板、按下去會凹的按鈕、壓進表面的輸入框、光澤藍的主按鈕。每個元件都看得出「可以按、可以轉」。

- **適合推薦給**：音樂與音響、相機與器材、手錶與文具、懷舊遊戲、工藝品牌。
- **情緒目標**：客戶看到時覺得「有質感、有溫度、很耐看」。
- **密度**：中等（控制項 40px、表格列高 52px）。
- **個性所在**：亞麻布紋、面板上緣白色高光＋多層投影、主按鈕的斜面光澤、凹陷的分段控制軌道。

## Colors

- **Background 亞麻（#E6E1D6）**＋細緻布紋；**面板（#F6F3EC）**；**凹槽（#DCD6C8）**。
- **Primary 光澤藍（#2D63A6）**：主要按鈕、連結、開關、focus；按鈕帶 1px 深藍邊與上亮下暗斜面。
- **Tertiary 黃銅（#B07A20）**：評分星等與點綴。
- **Accent container（#DCE6F3）**：側欄選中、選中列。
- **文字**：深褐灰（#2B2520），不用純黑。

## Typography

**PT Sans**（帶一點人文味的無襯線，像器材上的標示）＋ **Noto Sans TC**。標題、標籤 700；主標 48px。

## Layout

- **後台**：側欄 240px，凹槽色底＋右側雙線（亮線＋暗線）形成刻痕。
- 面板之間 20–24px，讓投影有空間。

## Elevation & Depth

以**斜面與投影**表示實體高度：面板 `inset 0 1px 0 白90%`（上緣高光）＋ `0 2px 3px` ＋ `0 8px 18px` 兩層暖色投影；次要按鈕凸起、按下時改內凹 `inset 0 2px 4px`；輸入框與分段控制軌道內凹。

## Shapes

中小圓角：控制項 6px、卡片 8px、對話框 10px，像金屬沖壓件。

## Components

- **按鈕**：主要按鈕光澤藍＋斜面；次要按鈕米白凸起，按下內凹。
- **輸入框**：亮底＋內凹陰影。
- **分段控制／頁籤**：凹槽軌道裡放一顆凸起的選中鍵。
- **背景裝飾**：細緻亞麻布紋，極低對比，不影響文字。
- **focus**：2px 藍色外框。

## Do's and Don'ts

- Do 讓每個可按的元件都有凸起或內凹的線索
- Do 光源統一來自上方（上亮下暗）
- Do 布紋與材質保持極低對比
- Don't 使用照片級材質圖片（版權與載入成本）
- Don't 讓陰影方向不一致

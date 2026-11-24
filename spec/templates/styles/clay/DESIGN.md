---
version: alpha
name: 黏土擬態 Claymorphism
description: 黏土般鼓起的元件：淡紫畫布、粉彩表面、超大圓角，外側柔和投影加內側亮暗陰影，像捏出來的膠泥玩具，可愛又有份量。
colors:
  primary: "#6B48D6"
  on-primary: "#FFFFFF"
  primary-hover: "#5A3BBE"
  secondary: "#6B48D6"
  tertiary: "#B86A10"
  neutral: "#EFE9FA"
  background: "{colors.neutral}"
  surface: "#FBF8FF"
  surface-raised: "#FFFFFF"
  surface-sunken: "#E6DEF6"
  on-surface: "#2A2340"
  on-surface-variant: "#4B4366"
  on-surface-subtle: "#5C5577"
  outline: "#DDD3F0"
  outline-strong: "#A79BC6"
  disabled: "#E8E2F4"
  on-disabled: "#5C5577"
  scrim: "#2A234066"
  accent-container: "#FFE3CF"
  on-accent-container: "#7A3A08"
  inverse-surface: "#2A2340"
  on-inverse-surface: "#FBF8FF"
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
  chart-1: "#6B48D6"
  chart-2: "#F29E4C"
  chart-3: "#4CB8A8"
  chart-4: "#E76F9C"
typography:
  display:
    fontFamily: Fredoka, Noto Sans TC
    fontSize: 52px
    fontWeight: 600
    lineHeight: 1.1
  headline-lg:
    fontFamily: Fredoka, Noto Sans TC
    fontSize: 34px
    fontWeight: 600
    lineHeight: 1.2
  headline-md:
    fontFamily: Fredoka, Noto Sans TC
    fontSize: 26px
    fontWeight: 600
    lineHeight: 1.3
  headline-sm:
    fontFamily: Fredoka, Noto Sans TC
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
  title-md:
    fontFamily: Fredoka, Noto Sans TC
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.5
  body-lg:
    fontFamily: Nunito, Noto Sans TC
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.75
  body-md:
    fontFamily: Nunito, Noto Sans TC
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: Nunito, Noto Sans TC
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
  label-lg:
    fontFamily: Nunito, Noto Sans TC
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.01em
  label-md:
    fontFamily: Nunito, Noto Sans TC
    fontSize: 13px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Nunito, Noto Sans TC
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.01em
  number-xl:
    fontFamily: Fredoka
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.1
    fontFeature: "'tnum' 1"
  number-md:
    fontFamily: Fredoka
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.4
    fontFeature: "'tnum' 1"
rounded:
  none: 0px
  sm: 14px
  md: 18px
  lg: 28px
  xl: 36px
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
  control-height: 46px
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
    height: 46px
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
    height: 46px
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
    height: 46px
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

> 靈感來源：daisyUI UI Design Trends #011「Claymorphism」（https://trends.daisyui.com/）的公開風格描述。只借用風格語彙，配色數值與裝飾圖形皆為原創，**不使用其範例程式碼、截圖或情緒板圖片**。

# 黏土擬態 Claymorphism

## Overview

**可愛、鼓鼓的、有份量。** 元件像捏出來的膠泥：淡紫畫布上的粉彩表面、超大圓角，外側柔和投影加上內側一亮一暗的陰影，看起來是「鼓起來」而不是「浮起來」。

- **適合推薦給**：兒童與教育、寵物品牌、遊戲與娛樂、B2C App、甜點與零食。
- **情緒目標**：客戶看到時覺得「好可愛、好親切、想點點看」。
- **密度**：寬鬆（控制項 46px、表格列高 56px）。
- **個性所在**：內外雙陰影的鼓起感、膠囊按鈕、漂浮的黏土色球裝飾、圓潤的 Fredoka 標題。

## Colors

- **Background 淡紫（#EFE9FA）**、**表面（#FBF8FF）**、**凹槽（#E6DEF6）**。
- **Primary 葡萄紫（#6B48D6）**：主要按鈕、連結、開關、focus。
- **Accent container 蜜桃（#FFE3CF）＋ on（#7A3A08）**：側欄選中、選中列、徽章。
- **Tertiary 焦糖（#B86A10）**：評分星等。
- **圖表**：紫、杏橘、薄荷、莓粉。

## Typography

標題 **Fredoka**（圓潤幾何）、內文 **Nunito**（圓體）、中文 **Noto Sans TC**。標題 600、主標 52px；標籤 700。

## Layout

- **後台**：側欄是浮在畫布上的黏土面板（四周留 12px、28px 圓角）。
- 元件之間間距要大（≥ 20px），讓陰影有空間。

## Elevation & Depth

**內外雙陰影**：面板 `inset -8px -8px 16px` 紫色微暗 ＋ `inset 8px 8px 16px` 白色高光 ＋ `0 14px 28px` 紫色投影。主要按鈕同理但更強；輸入框與軌道只用內陰影（凹下去）。

## Shapes

超大圓角：輸入框 18px、卡片 28px、對話框 36px；按鈕、chip、徽章全圓膠囊。

## Components

- **按鈕**：膠囊、鼓起；主要按鈕紫色＋白字，次要按鈕白色鼓起。
- **分段控制／頁籤**：凹槽軌道裡的白色鼓起選中鍵。
- **背景裝飾**：幾顆漂浮的粉彩黏土球（同樣有內外陰影），不可互動。
- **focus**：2px 紫色外框。

## Do's and Don'ts

- Do 每個面都用「內亮、內暗、外投影」三層表現鼓起
- Do 大圓角、大間距
- Do 粉彩配深色文字，確保對比
- Don't 使用直角或細線框
- Don't 把粉彩色拿來當文字

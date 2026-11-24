---
version: alpha
name: 透疊色面 Layered Planes
description: 薄荷底上疊放半透明的青、萊姆與紅色色面，直角、窄體大字與寬字距標籤，像一張張色紙錯落疊在桌上。
colors:
  primary: "#C8243F"
  on-primary: "#FFFFFF"
  primary-hover: "#A91B33"
  secondary: "#246F82"
  tertiary: "#9C7A12"
  neutral: "#DDEEE4"
  background: "{colors.neutral}"
  surface: "#F7FBF8"
  surface-raised: "#FFFFFF"
  surface-sunken: "#E8F3EC"
  on-surface: "#2B2F3A"
  on-surface-variant: "#474E5C"
  on-surface-subtle: "#58606E"
  outline: "#C4DCCF"
  outline-strong: "#8FB3A2"
  disabled: "#E2ECE6"
  on-disabled: "#545E68"
  scrim: "#2B2F3A66"
  accent-container: "#EEF199"
  on-accent-container: "#3D4012"
  inverse-surface: "#2B2F3A"
  on-inverse-surface: "#F7FBF8"
  success: "#2D6A45"
  success-container: "#D9EEDF"
  on-success-container: "#1F4F31"
  warning: "#7E520C"
  warning-container: "#F6E8C6"
  on-warning-container: "#5F3D08"
  error: "#B3261E"
  on-error: "#FFFFFF"
  error-container: "#F9DEDC"
  on-error-container: "#8C1D16"
  info: "#235E8A"
  info-container: "#DBE8F3"
  on-info-container: "#1A4A6D"
  chart-1: "#C8243F"
  chart-2: "#3FA3B8"
  chart-3: "#2B2F3A"
  chart-4: "#B9BC2E"
typography:
  display:
    fontFamily: Barlow Condensed, Noto Sans TC
    fontSize: 60px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: 0.01em
  headline-lg:
    fontFamily: Barlow Condensed, Noto Sans TC
    fontSize: 34px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.01em
  headline-md:
    fontFamily: Barlow Condensed, Noto Sans TC
    fontSize: 26px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0.01em
  headline-sm:
    fontFamily: Barlow Condensed, Noto Sans TC
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
  title-md:
    fontFamily: Barlow Condensed, Noto Sans TC
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.5
  body-lg:
    fontFamily: Barlow, Noto Sans TC
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.75
  body-md:
    fontFamily: Barlow, Noto Sans TC
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: Barlow, Noto Sans TC
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
  label-lg:
    fontFamily: Barlow, Noto Sans TC
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.08em
  label-md:
    fontFamily: Barlow, Noto Sans TC
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.08em
  label-sm:
    fontFamily: Barlow, Noto Sans TC
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.08em
  number-xl:
    fontFamily: Barlow Condensed
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.1
    fontFeature: "'tnum' 1"
  number-md:
    fontFamily: Barlow Condensed
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
    rounded: "{rounded.none}"
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
    rounded: "{rounded.none}"
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
    rounded: "{rounded.none}"
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
    rounded: "{rounded.none}"
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

> 靈感來源：CSS Zen Garden #217「Verde Moderna」（Dave Shea）。只借用風格語彙（半透明色面重疊、窄體大字、寬字距大寫標籤），配色數值、圖形與版面皆為原創；原作為 CC BY-NC-SA 授權且註明不可複製，**不得使用原作的圖片、CSS 或可辨識的版面**。

# 透疊色面 Layered Planes

## Overview

**清爽、錯落、有節奏。** 薄荷色畫布上，卡片像一張張半透明色紙：每張下方都錯位疊著一片青色色面，浮層則疊紅色。全部直角，標題用窄體大字、標籤拉寬字距，像版畫海報的構成。

- **適合推薦給**：藝文與展覽、活動與市集、設計與廣告公司、出版與獨立刊物、年輕品牌。
- **情緒目標**：客戶看到時覺得「很有設計感、很新鮮，但不吵」。
- **密度**：中等（控制項 44px、表格列高 54px）。
- **個性所在**：卡片右下方 8px 錯位的半透明青色色面、紅色主按鈕的錯位陰影、萊姆色選中標記、全部直角。

## Colors

色彩策略是**薄荷畫布＋半透明色面＋紅色主色**，色面之間靠透明度疊出第三種顏色。

- **Background 薄荷（#DDEEE4）**：整個畫布。
- **卡片**：`surface`（#F7FBF8）94% 不透明，下方錯位一片青色 `rgba(63,163,184,0.32)`。
- **Primary 紅（#C8243F）**：主要按鈕、選中 chip、開關、focus、頁籤底線，配白字。
- **Secondary 深青（#246F82）**：連結。
- **萊姆（accent-container #EEF199）**：側欄選中項、選中列、徽章底，配深橄欖字。
- **Tertiary 赭黃（#9C7A12）**：只用於評分星等這類圖形。
- **圖表**：紅、青（#3FA3B8）、石板灰、橄欖黃。

## Typography

標題 **Barlow Condensed**（窄體），內文 **Barlow**，中文 **Noto Sans TC**。

- **標題**：600 字重、主標 60px，窄體讓大字不佔寬度。
- **內文**：16px、行高 1.7。
- **標籤**：600 字重、字距 0.08em，英文標籤呈現寬鬆的海報感。
- **數字**：Barlow Condensed，KPI 32px。

## Layout

- **前台**：最大寬度 1200px、12 欄、欄距 24px；區塊之間 96px。卡片的錯位色面會多佔 8px，網格間距要預留。
- **後台**：側欄 240px，底色是 14% 透明度的青色色面。
- **間距系統**：4px 為單位。

## Elevation & Depth

**以錯位色面取代陰影。** 卡片 `8px 8px 0` 青色 32%；浮層 `12px 12px 0` 紅色 28%；主要按鈕 `4px 4px 0` 青色 45%。沒有模糊陰影。開啟「減少透明度」時，卡片改為實色 `surface`。

## Shapes

**全部直角**：按鈕、輸入框、卡片、對話框、chip、徽章都是 0 圓角。只有開關與步驟節點保留圓形。

## Components

- **按鈕**：高 44px 直角。主要按鈕紅底白字＋錯位青色色面；次要按鈕薄荷白底＋1px 石板灰邊框。
- **分段控制**：外框 1px 線，選中項石板灰實心反白。
- **頁籤**：選中項下方 3px 紅線。
- **側欄**：選中項萊姆底＋深橄欖字。
- **背景裝飾**：畫布右上與左下兩片大型半透明色面（青、萊姆），互相交疊；不可互動、不壓在文字正後方，手機上降低。
- **focus**：2px 紅色外框。

## Do's and Don'ts

- Do 讓色面錯位、半透明疊出新顏色
- Do 全部直角，標題用窄體
- Do 萊姆只當底色，配深橄欖字
- Don't 使用模糊陰影或圓角
- Don't 把萊姆或亮青當文字顏色
- Don't 一張卡片疊超過一片色面

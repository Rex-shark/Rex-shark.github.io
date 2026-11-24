---
version: alpha
name: 企業專業 2 Enterprise II
description: 白底配深翠綠與暖灰中性色，小圓角、資訊密度高；卡片左上與右下直角、右上與左下圓弧，形成對角的葉形，穩定又有辨識度。
colors:
  primary: "#0B5D4B"
  on-primary: "#FFFFFF"
  primary-hover: "#084536"
  secondary: "#2F7A64"
  tertiary: "#B07A1E"
  neutral: "#F4F6F5"
  background: "{colors.neutral}"
  surface: "#FFFFFF"
  surface-raised: "#FFFFFF"
  surface-hover: "#F7F9F8"
  surface-sunken: "#EEF2F0"
  on-surface: "#13201B"
  on-surface-variant: "#43524B"
  on-surface-subtle: "#5A6862"
  outline: "#D9E0DC"
  outline-strong: "#B6C2BC"
  disabled: "#EEF1EF"
  on-disabled: "#5A6862"
  scrim: "#13201B66"
  accent: "#0E7A5F"
  on-accent: "#FFFFFF"
  accent-container: "#E2F1EB"
  on-accent-container: "#0B5D4B"
  inverse-surface: "#13201B"
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
  chart-1: "#0B5D4B"
  chart-2: "#2F7A64"
  chart-3: "#8FC9B4"
  chart-4: "#B07A1E"
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

> 與「企業專業」同一套結構、密度與元件規則，只換配色與卡片形狀。卡片「左上右下直角、右上左下圓弧」為 Rex 指定（2026-11-24；最初是左方右圓的 D 字形，同日改為對角葉形）。

# 企業專業 2 Enterprise II

## Overview

**穩健、紮實、有辨識度。** 白底、深翠綠主色、帶一點綠調的暖灰中性色，小圓角、資訊密度高。卡片**左上、右下直角，右上、左下圓弧**，形成對角的葉形：兩個直角維持網格感與嚴謹，兩個圓角帶出流動感，讓企業介面多一個記憶點。

- **適合推薦給**：銀行與投資、能源與環境、醫藥與生技、物流與供應鏈、顧問與會計。
- **情緒目標**：客戶看到時覺得「穩重、可靠、有質感，又不死板」。
- **密度**：高（控制項 36–40px、表格列高 44–48px，與企業專業相同）。
- **個性所在**：對角葉形卡片、深翠綠主按鈕、綠調暖灰的分隔與表頭。

## Colors

- **Background 白（#FFFFFF）**、**淺灰（#F7F9F8／#F4F6F5／#EEF2F0）**：帶極淡綠調的中性灰，比冷藍灰溫和。
- **Primary 深翠綠（#0B5D4B）**：主要按鈕、選中 chip、目前步驟，配白字。
- **Accent 翠綠（#0E7A5F）**：連結、focus、開關。**Accent container（#E2F1EB）**：側欄選中、選中列、徽章。
- **Secondary（#2F7A64）**、**Tertiary 古金（#B07A1E）**：圖表與評分星等。
- **Info 維持藍色（#1F5FBF）**，避免與成功綠混淆。
- **文字**：近黑綠（#13201B）、次要（#43524B）、提示（#5A6862）。

## Typography

與企業專業相同：**IBM Plex Sans** ＋ **Noto Sans TC**，標題 600、數字等寬，字級偏小以容納高密度資訊。

## Layout

與企業專業相同：滿版側欄（無間距）、12 欄網格、緊湊的表格與表單。卡片之間 16–24px。

## Elevation & Depth

與企業專業相同：細邊框＋極淡陰影，浮層才有明顯陰影。

## Shapes

**對角葉形**是與企業專業最大的差別：

- 卡片：`border-radius: 0 20px 0 20px`（`--tpl-card-radius`；順序為左上、右上、右下、左下）。
- 大圖與主視覺：`0 40px 0 40px`（`--tpl-card-radius-xl`）。
- 按鈕、輸入框、chip、徽章維持 2–4px 小圓角；對話框四角 8px（浮層不做葉形）。

## Components

與企業專業相同，只換顏色：主要按鈕深翠綠＋白字；連結、focus、開關翠綠；側欄選中項淡綠底＋深翠綠字；表頭綠調淺灰。

## Do's and Don'ts

- Do 卡片一律左上右下直角、右上左下圓弧
- Do 維持高資訊密度與小圓角控制項
- Do Info 用藍、Success 用綠，兩者分開
- Don't 讓按鈕或輸入框也做成葉形
- Don't 在同一畫面混用一般圓角卡片

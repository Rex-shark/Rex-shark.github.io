---
version: alpha
name: 液態金屬 Chrome / Liquid Metal
description: 鏡面金屬與液態銀：近黑石墨畫布、帶上亮下暗斜面的面板、拋光銀色膠囊主按鈕，背景有低調的液態金屬光斑，高反差、冷冽、俐落。
colors:
  primary: "#DCE2EA"
  on-primary: "#111418"
  primary-hover: "#F2F5F8"
  secondary: "#A9C7E8"
  tertiary: "#C9D1DC"
  neutral: "#0E1013"
  background: "{colors.neutral}"
  surface: "#181B20"
  surface-raised: "#22262D"
  surface-sunken: "#121418"
  on-surface: "#EEF1F5"
  on-surface-variant: "#C3C9D2"
  on-surface-subtle: "#9AA2AE"
  outline: "#2C313A"
  outline-strong: "#4D5562"
  disabled: "#1E2228"
  on-disabled: "#9AA2AE"
  scrim: "#000000AA"
  accent-container: "#2A3340"
  on-accent-container: "#D6E4F5"
  inverse-surface: "#EEF1F5"
  on-inverse-surface: "#0E1013"
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
  chart-1: "#DCE2EA"
  chart-2: "#7FB2E5"
  chart-3: "#9AA2AE"
  chart-4: "#E8C77A"
typography:
  display:
    fontFamily: Unbounded, Noto Sans TC
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Unbounded, Noto Sans TC
    fontSize: 34px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Unbounded, Noto Sans TC
    fontSize: 26px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Unbounded, Noto Sans TC
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
  title-md:
    fontFamily: Unbounded, Noto Sans TC
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.5
  body-lg:
    fontFamily: Inter, Noto Sans TC
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.75
  body-md:
    fontFamily: Inter, Noto Sans TC
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: Inter, Noto Sans TC
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
  label-lg:
    fontFamily: Inter, Noto Sans TC
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.04em
  label-md:
    fontFamily: Inter, Noto Sans TC
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Inter, Noto Sans TC
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.04em
  number-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.1
    fontFeature: "'tnum' 1"
  number-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    fontFeature: "'tnum' 1"
rounded:
  none: 0px
  sm: 6px
  md: 10px
  lg: 14px
  xl: 18px
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
    height: 54px
  table-row-hover:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.on-surface}"
  table-row-selected:
    backgroundColor: "{colors.accent-container}"
    textColor: "{colors.on-accent-container}"
  switch-on:
    backgroundColor: "{colors.secondary}"
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

> 靈感來源：daisyUI UI Design Trends #015「Chrome / Liquid Metal」（https://trends.daisyui.com/）的公開風格描述。只借用風格語彙，配色數值與裝飾圖形皆為原創，**不使用其範例程式碼、截圖或情緒板圖片**。

# 液態金屬 Chrome / Liquid Metal

## Overview

**冷冽、鏡面、高反差。** 近黑石墨畫布上，面板有上亮下暗的金屬斜面，主按鈕是拋光銀色的膠囊，背景有低調的液態銀光斑與一道水平高光。像汽車、機械錶與高階 3C 的發表會。

- **適合推薦給**：汽車與機車、3C 與硬體、音樂與電子、運動與機能服飾、科技發表會。
- **情緒目標**：客戶看到時覺得「很酷、很精密、很高級」。
- **密度**：中等（控制項 44px、表格列高 54px）。
- **個性所在**：拋光銀主按鈕、面板頂邊高光、寬體 Unbounded 標題、液態銀光斑。

## Colors

- **Background 石墨黑（#0E1013）**、**面板（#181B20）**、**浮層（#22262D）**、**凹槽（#121418）**。
- **Primary 拋光銀（#DCE2EA）＋深字（#111418）**：主要按鈕、選中 chip、目前步驟。
- **Secondary 冰藍（#A9C7E8）**：連結、開關、focus。
- **文字**：冷白（#EEF1F5）、銀灰（#C3C9D2）、鋼灰（#9AA2AE）。
- **狀態色**：高明度，徽章深底淺字。

## Typography

標題 **Unbounded**（寬體幾何，像金屬銘牌），內文 **Inter**，中文 **Noto Sans TC**。標題 600、主標 48px；標籤 500、字距 0.04em。

## Layout

- **後台**：側欄半透明石墨＋右側細高光線。
- 版面規整、留白充足，讓金屬質感有呼吸空間。

## Elevation & Depth

**金屬斜面**：面板 `inset 0 1px 0 白14%`（頂邊高光）＋ `inset 0 -1px 0 黑60%`（底邊暗線）＋ `0 12px 32px` 深投影。主按鈕 `inset 0 1px 0 白` ＋ `inset 0 -3px 6px` 暗部 ＋ 外圈 1px 白20%。輸入框內凹。

## Shapes

輸入框 10px、卡片 14px、對話框 18px；按鈕、chip、徽章全圓膠囊。

## Components

- **按鈕**：主要按鈕拋光銀膠囊＋深字；次要按鈕石墨凸起。
- **分段控制**：選中項較亮的石墨＋頂邊高光。
- **背景裝飾**：兩團液態銀光斑（徑向漸層）與一道水平高光線，極低不透明度，不可互動。
- **focus**：2px 冰藍外框。

## Do's and Don'ts

- Do 光源統一在上方：頂邊亮、底邊暗
- Do 銀色只給主要動作，其他維持石墨層次
- Don't 使用照片級金屬貼圖
- Don't 讓光斑高對比或覆蓋文字區

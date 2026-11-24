---
version: alpha
name: Fluent Fluent Design
description: Fluent 2 的語彙：淺灰畫布上的白色卡片、細緻的兩層陰影、壓克力模糊的頂部列，4–8px 小圓角與品牌藍，克制而有層次。
colors:
  primary: "#0F6CBD"
  on-primary: "#FFFFFF"
  primary-hover: "#115EA3"
  secondary: "#115EA3"
  tertiary: "#8764B8"
  neutral: "#F5F5F5"
  background: "{colors.neutral}"
  surface: "#FFFFFF"
  surface-raised: "#FFFFFF"
  surface-sunken: "#EBEBEB"
  on-surface: "#242424"
  on-surface-variant: "#424242"
  on-surface-subtle: "#5C5C5C"
  outline: "#E0E0E0"
  outline-strong: "#8A8A8A"
  disabled: "#F0F0F0"
  on-disabled: "#5C5C5C"
  scrim: "#00000066"
  accent-container: "#EBF3FC"
  on-accent-container: "#0F548C"
  inverse-surface: "#292929"
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
  chart-1: "#0F6CBD"
  chart-2: "#8764B8"
  chart-3: "#038387"
  chart-4: "#CA5010"
typography:
  display:
    fontFamily: Segoe UI, Noto Sans, Noto Sans TC
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.1
  headline-lg:
    fontFamily: Segoe UI, Noto Sans, Noto Sans TC
    fontSize: 34px
    fontWeight: 600
    lineHeight: 1.2
  headline-md:
    fontFamily: Segoe UI, Noto Sans, Noto Sans TC
    fontSize: 26px
    fontWeight: 600
    lineHeight: 1.3
  headline-sm:
    fontFamily: Segoe UI, Noto Sans, Noto Sans TC
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
  title-md:
    fontFamily: Segoe UI, Noto Sans, Noto Sans TC
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.5
  body-lg:
    fontFamily: Segoe UI, Noto Sans, Noto Sans TC
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.75
  body-md:
    fontFamily: Segoe UI, Noto Sans, Noto Sans TC
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: Segoe UI, Noto Sans, Noto Sans TC
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
  label-lg:
    fontFamily: Segoe UI, Noto Sans, Noto Sans TC
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.2
  label-md:
    fontFamily: Segoe UI, Noto Sans, Noto Sans TC
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.2
  label-sm:
    fontFamily: Segoe UI, Noto Sans, Noto Sans TC
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.2
  number-xl:
    fontFamily: Segoe UI
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.1
    fontFeature: "'tnum' 1"
  number-md:
    fontFamily: Segoe UI
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.4
    fontFeature: "'tnum' 1"
rounded:
  none: 0px
  sm: 4px
  md: 4px
  lg: 8px
  xl: 12px
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
    rounded: "{rounded.md}"
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
    rounded: "{rounded.md}"
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
    height: 36px
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
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.on-surface}"
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

> 靈感來源：daisyUI UI Design Trends #007「Fluent Design」（https://trends.daisyui.com/）的公開風格描述，並參考 Microsoft Fluent 2 公開規範。只借用風格語彙，配色數值與裝飾圖形皆為原創，**不使用其範例程式碼、截圖或情緒板圖片**。

# Fluent Fluent Design

## Overview

**克制、有層次、像作業系統。** Fluent 2 的語彙：淺灰畫布上的白色卡片、細緻的兩層陰影（一圈 2px 輪廓陰影＋一層落地陰影）、壓克力模糊的頂部列、4–8px 小圓角與品牌藍。專業而不冰冷。

- **適合推薦給**：企業軟體與 SaaS、生產力工具、B2B 後台、教育平台、微軟生態整合。
- **情緒目標**：客戶看到時覺得「很穩、很專業、像正式的系統」。
- **密度**：中等偏緊（控制項 36px、表格列高 48px）。
- **個性所在**：兩層細陰影、壓克力頂部列、輸入框底部那條較深的線、3px 頁籤底線。

## Colors

- **Background（#F5F5F5）**、**卡片（#FFFFFF）**、**hover／選中（#EBEBEB）**。
- **Primary 品牌藍（#0F6CBD）**：主要按鈕、開關、頁籤底線；**連結（#115EA3）**。
- **Accent container（#EBF3FC）**：選中列、徽章、已完成步驟。
- **focus**：2px 近黑外框（Fluent 的鍵盤焦點是高對比框）。
- **背景**：極淡的藍紫色雲霧（Mica 材質的意象），只在畫布，不影響文字對比。

## Typography

**Segoe UI Variable**（Windows 系統字；其他平台退回 **Noto Sans**）＋ **Noto Sans TC**。標題與標籤 600 字重；主標 48px；內文 14–16px。

## Layout

- **後台**：側欄 240px 與畫布同色、無分隔線，選中項淺灰底。
- **間距系統**：4px 為單位，常用 4 / 8 / 12 / 16 / 20 / 24 / 32。

## Elevation & Depth

| 層級 | 實作 |
|---|---|
| 卡片（shadow4） | `0 0 2px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.14)` |
| 浮層（shadow16） | `0 0 2px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.14)` |
| 頂部列 | 白 82% ＋ `blur(30px) saturate(125%)`（壓克力） |

開啟「減少透明度」時，頂部列改實色。

## Shapes

小圓角：控制項與輸入框 4px、卡片 8px、對話框 12px。

## Components

- **按鈕**：高 36px、4px 圓角。主要按鈕品牌藍；次要按鈕白底＋1px #D1D1D1。
- **輸入框**：白底、1px 灰框，底部多一條較深的線（Fluent 輸入框的特徵）。
- **分段控制**：灰色軌道、選中項白底＋兩層細陰影。
- **頁籤**：選中項 3px 品牌藍底線。
- **focus**：2px 近黑外框。

## Do's and Don'ts

- Do 用兩層細陰影表示卡片與浮層
- Do 保持小圓角與克制的用色
- Do 頂部列使用壓克力模糊並提供實色退路
- Don't 使用大面積漸層或強烈色塊
- Don't 用大圓角或膠囊形主要按鈕

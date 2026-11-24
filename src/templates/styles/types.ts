import type { ComponentType, CSSProperties } from 'react'

export type StyleSlug =
  | 'minimal'
  | 'enterprise'
  | 'enterprise2'
  | 'wabi'
  | 'soft'
  | 'brutal'
  | 'glass'
  | 'glass2'
  | 'midcentury'
  | 'planes'
  | 'curio'
  | 'material'
  | 'metro'
  | 'fluent'
  | 'skeuo'
  | 'wood'
  | 'clay'
  | 'aqua'
  | 'holo'
  | 'nouveau'
  | 'tech'
  | 'luxury'
  | 'dusk'
  | 'chrome'

/**
 * 每種風格都必須提供的變數。共用元件只引用這些變數。
 * 色彩類對應 DESIGN.md 的 colors token；材質類對應 DESIGN.md 內文的陰影、邊框、模糊規格。
 */
export const COMMON_VARS = [
  // ── 色彩（DESIGN.md colors，缺的由風格檔以既有色補齊）
  '--tpl-primary', '--tpl-on-primary', '--tpl-primary-hover',
  '--tpl-secondary', '--tpl-tertiary', '--tpl-neutral', '--tpl-background',
  '--tpl-surface', '--tpl-surface-raised', '--tpl-on-surface', '--tpl-on-surface-variant', '--tpl-on-surface-subtle',
  '--tpl-outline', '--tpl-outline-strong', '--tpl-disabled', '--tpl-on-disabled', '--tpl-scrim',
  '--tpl-success', '--tpl-success-container', '--tpl-on-success-container',
  '--tpl-warning', '--tpl-warning-container', '--tpl-on-warning-container',
  '--tpl-error', '--tpl-error-container', '--tpl-on-error-container', '--tpl-on-error',
  '--tpl-info', '--tpl-info-container', '--tpl-on-info-container',
  '--tpl-chart-1', '--tpl-chart-2', '--tpl-chart-3', '--tpl-chart-4',
  // ── 語意角色（對應 DESIGN.md components）
  '--tpl-accent', '--tpl-on-accent', '--tpl-link', '--tpl-focus-ring',
  '--tpl-selected-bg', '--tpl-selected-fg',
  '--tpl-chip-selected-bg', '--tpl-chip-selected-fg',
  '--tpl-nav-active-bg', '--tpl-nav-active-fg',
  '--tpl-switch-on', '--tpl-switch-off', '--tpl-switch-thumb',
  '--tpl-step-done-bg', '--tpl-step-done-fg',
  '--tpl-tooltip-bg', '--tpl-tooltip-fg', '--tpl-toast-bg', '--tpl-toast-fg',
  '--tpl-badge-accent-bg', '--tpl-badge-accent-fg', '--tpl-badge-neutral-bg', '--tpl-badge-neutral-fg',
  '--tpl-table-header-bg', '--tpl-table-header-fg', '--tpl-row-hover-bg',
  '--tpl-btn-secondary-bg', '--tpl-btn-secondary-hover-bg', '--tpl-btn-secondary-border', '--tpl-ghost-hover-bg',
  '--tpl-skeleton', '--tpl-primary-glow', '--tpl-heading-tracking',
  '--tpl-seg-track-bg', '--tpl-seg-track-shadow', '--tpl-seg-active-bg', '--tpl-seg-active-fg', '--tpl-seg-active-shadow',
  '--tpl-tab-track-bg', '--tpl-tab-track-shadow', '--tpl-tab-active-bg', '--tpl-tab-active-fg', '--tpl-tab-active-shadow',
  // ── 材質
  '--tpl-shell-inset', '--tpl-shell-radius', '--tpl-sidebar-bg', '--tpl-sidebar-border', '--tpl-sidebar-shadow',
  '--tpl-header-bg', '--tpl-header-border', '--tpl-header-shadow', '--tpl-header-backdrop',
  '--tpl-panel-bg', '--tpl-panel-hover-bg', '--tpl-panel-border', '--tpl-panel-shadow', '--tpl-panel-backdrop',
  '--tpl-overlay-bg', '--tpl-overlay-border', '--tpl-overlay-shadow', '--tpl-overlay-backdrop',
  '--tpl-control-shadow', '--tpl-control-shadow-pressed', '--tpl-primary-shadow',
  '--tpl-input-bg', '--tpl-input-border', '--tpl-input-shadow',
  // ── 形狀、尺寸、字體
  '--tpl-radius-sm', '--tpl-radius-md', '--tpl-radius-lg', '--tpl-radius-xl', '--tpl-radius-control',
  '--tpl-control-h', '--tpl-heading-weight', '--tpl-label-weight',
  '--tpl-border-width', '--tpl-row-h', '--tpl-label-tracking', '--tpl-primary-border',
  '--tpl-font-sans', '--tpl-font-heading', '--tpl-font-numeric',
] as const

export type CommonVar = (typeof COMMON_VARS)[number]
export type TplVars = Record<CommonVar, string> & Record<`--tpl-${string}`, string>

export interface TplStyle {
  slug: StyleSlug
  meta: {
    name: string
    nameEn: string
    tagline: string
    suitableFor: string[]
    /** 色票（顯示在工具列與說明側欄） */
    swatches: string[]
    fontsLabel: string
    /** 亮色或暗色，展示器用來決定瀏覽器捲軸等配色 */
    scheme: 'light' | 'dark'
  }
  /** Google Fonts CSS 網址（null 表示不需外部字體） */
  fontsHref: string | null
  vars: TplVars
  /** 窄於 768px 時覆寫（例如柔和 UI 陰影減半） */
  compactVars?: Partial<TplVars>
  /** 使用者開啟「減少透明度」時覆寫 */
  reducedTransparencyVars?: Partial<TplVars>
  /** 額外套在外框上的樣式（例如柔和 UI 禁止偽粗體） */
  frameStyle?: CSSProperties
  /** 純裝飾背景（aria-hidden、不可互動），掛在捲動容器後方 */
  Decor?: ComponentType
  /** 讀取 DESIGN.md 原文（風格說明側欄用） */
  loadDesignDoc: () => Promise<string>
}

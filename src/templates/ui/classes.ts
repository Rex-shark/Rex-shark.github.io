/**
 * 共用 class 片段。全部是完整字面值，Tailwind 才掃描得到；樣式只取自 --tpl-* 變數。
 */

/** focus-visible 外框 */
export const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tpl-focus-ring)'

/**
 * 面板材質（卡片、側欄、表格容器）：簡約＝白底細線、玻璃＝毛玻璃、柔和＝凸起。
 * --tpl-panel-image 為選用的材質紋理（例如實木的木紋），沒設就是 none。
 */
export const panel =
  'border-(length:--tpl-border-width) border-(--tpl-panel-border) bg-(--tpl-panel-bg) [background-image:var(--tpl-panel-image,none)] shadow-(--tpl-panel-shadow) [backdrop-filter:var(--tpl-panel-backdrop)]'

/** 浮層材質（下拉、對話框、抽屜） */
export const overlaySurface =
  'border-(length:--tpl-border-width) border-(--tpl-overlay-border) bg-(--tpl-overlay-bg) text-(--tpl-on-surface) shadow-(--tpl-overlay-shadow) [backdrop-filter:var(--tpl-overlay-backdrop)]'

/** 標題字 */
export const heading =
  'font-(family-name:--tpl-font-heading) [font-weight:var(--tpl-heading-weight)] tracking-(--tpl-heading-tracking) text-(--tpl-on-surface)'

/** 標籤字重（按鈕、表頭、chip） */
export const labelWeight = '[font-weight:var(--tpl-label-weight)] tracking-(--tpl-label-tracking)'

/** 數字（金額、數量）：等寬數字 */
export const numeric = 'font-(family-name:--tpl-font-numeric) tabular-nums lining-nums'

/** 次要文字 */
export const muted = 'text-(--tpl-on-surface-variant)'

/** 輸入框 */
export const inputBase =
  'h-(--tpl-control-h) w-full rounded-(--tpl-radius-md) border-(length:--tpl-border-width) border-(--tpl-input-border) bg-(--tpl-input-bg) px-3.5 text-sm text-(--tpl-on-surface) shadow-(--tpl-input-shadow) transition-[border-color,box-shadow] duration-150 placeholder:text-(--tpl-on-surface-subtle) outline-none focus:border-(--tpl-focus-ring) focus:ring-3 focus:ring-(--tpl-focus-ring)/25 aria-invalid:border-(--tpl-error) aria-invalid:focus:ring-(--tpl-error)/25 disabled:cursor-not-allowed disabled:bg-(--tpl-disabled) disabled:text-(--tpl-on-disabled)'

/** 浮層元件共同的進出場動畫（base-ui data-starting-style / data-ending-style） */
export const popIn =
  'origin-(--transform-origin) transition-[opacity,scale] duration-150 ease-out data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 motion-reduce:transition-none'

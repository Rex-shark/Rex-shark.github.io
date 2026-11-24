/** 金額：NT$1,280 */
export function formatNT(value: number): string {
  return `NT$${Math.round(value).toLocaleString('en-US')}`
}

/** 千分位數字：1,862 */
export function formatNumber(value: number): string {
  return value.toLocaleString('en-US')
}

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']

/** 日期：2026/11/09；withWeekday 時加（一） */
export function formatDate(date: Date, withWeekday = false): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}/${m}/${d}${withWeekday ? `（${WEEKDAYS[date.getDay()]}）` : ''}`
}

export function weekdayLabel(date: Date): string {
  return WEEKDAYS[date.getDay()]
}

/** 增減：+12.4% / −0.4%（減號用 U+2212） */
export function formatDelta(value: number, unit = '%'): string {
  const sign = value > 0 ? '+' : value < 0 ? '−' : ''
  return `${sign}${Math.abs(value)}${unit}`
}

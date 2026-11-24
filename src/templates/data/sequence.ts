/**
 * 跨版型共用的訂單流水號：儀表板最新一筆是 QS-261109-0418，
 * 購物網站下單從 0419 開始，同一次瀏覽再下單依序遞增。重新整理或重設購物網站時回到 0419。
 */
const FIRST = 419
let next = FIRST

export function nextOrderId(): string {
  return `QS-261109-${String(next++).padStart(4, '0')}`
}

export function resetOrderSequence() {
  next = FIRST
}

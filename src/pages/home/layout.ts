/** 牌桌版面計算：所有卡片都用同一套「畫面座標（卡片中心點）」定位，換位置時同一張卡直接飛過去 */

/** 卡面設計稿寬度；實際卡寬不同時整張卡面等比縮放 */
export const FACE_W = 172
export const FACE_H = Math.round(FACE_W * 1.4)

const TOP_BAR = 64

export interface Layout {
  narrow: boolean
  cardW: number
  cardH: number
  /** 手牌露出畫面的高度（下半截藏在畫面外） */
  handPeek: number
  /** 拖曳中的卡片中心高於這條線就算打出 */
  playLineY: number
  board: { top: number; bottom: number }
}

export interface Pose {
  cx: number
  cy: number
  rotate: number
  scale: number
}

export function computeLayout(vw: number, vh: number): Layout {
  const narrow = vw < 900
  const cardW = narrow ? 118 : FACE_W
  const cardH = Math.round(cardW * 1.4)
  const handPeek = Math.round(cardH * (narrow ? 0.66 : 0.62))
  const top = TOP_BAR + 8
  const bottom = vh - handPeek - 12

  return {
    narrow,
    cardW,
    cardH,
    handPeek,
    playLineY: bottom - cardH * 0.3,
    board: { top, bottom },
  }
}

/* ───── 決鬥場地：我方 2 × 5 格 ───── */

export type ZoneKind = 'monster' | 'spell'

const COLS = 5
/** 上排怪獸區、下排魔陷區；格子編號 = 列 × 5 + 欄 */
export const ZONE_ROWS: ZoneKind[][] = [Array(COLS).fill('monster'), Array(COLS).fill('spell')]

/** 點一下打出時依這個順序找空格：先怪獸區中間往外，再魔陷區 */
export const PLAY_SLOTS = [2, 1, 3, 0, 4, 7, 6, 8, 5, 9]

/** 卡片區格子的寬高比（直式卡） */
const ZONE_RATIO = 0.7
/** 格子最高多少，避免大螢幕上整片場地大到壓迫 */
const ZONE_MAX_H = 260

export interface Mat {
  left: number
  top: number
  width: number
  height: number
  gap: number
  pad: number
  zoneW: number
  zoneH: number
  /** 每一格的中心點，索引同格子編號 */
  centers: { cx: number; cy: number }[]
  /** 放在格子裡的卡片縮放比例（相對手牌卡寬） */
  cardScale: number
}

/** 場地尺寸與位置：依牌桌可用高度、畫面寬度（桌機扣掉兩側擺模型的空間）自動縮放 */
export function computeMat(l: Layout, vw: number): Mat {
  const gap = l.narrow ? 8 : 12
  const pad = l.narrow ? 12 : 18
  const side = l.narrow ? 8 : Math.min(220, Math.max(130, vw * 0.12))
  const boardH = l.board.bottom - l.board.top
  let h = Math.min(ZONE_MAX_H, (boardH - pad * 2 - gap) / 2)
  let w = h * ZONE_RATIO
  const maxW = (vw - side * 2 - pad * 2 - gap * (COLS - 1)) / COLS
  if (w > maxW) {
    w = maxW
    h = w / ZONE_RATIO
  }
  const width = w * COLS + gap * (COLS - 1) + pad * 2
  const height = h * 2 + gap + pad * 2
  const left = (vw - width) / 2
  const top = l.board.top + (boardH - height) / 2
  const centers = ZONE_ROWS.flatMap((row, r) =>
    row.map((_, c) => ({
      cx: left + pad + c * (w + gap) + w / 2,
      cy: top + pad + r * (h + gap) + h / 2,
    })),
  )
  const cardScale = Math.min((w * 0.88) / l.cardW, (h * 0.88) / l.cardH)
  return { left, top, width, height, gap, pad, zoneW: w, zoneH: h, centers, cardScale }
}

/** 離 (x, y) 最近的空格；taken 是已經有卡的格子（拖曳中那張卡自己的格子要先拿掉，算空） */
export function nearestOpenSlot(mat: Mat, taken: Set<number>, x: number, y: number) {
  let best = -1
  let bestD = Infinity
  for (const i of PLAY_SLOTS) {
    if (taken.has(i)) continue
    const c = mat.centers[i]
    const d = Math.hypot(c.cx - x, c.cy - y)
    if (d < bestD) {
      best = i
      bestD = d
    }
  }
  return best
}

export const HOVER_SCALE = 1.32

/** 手牌第 i 張（共 n 張）的扇形位置；hovered 為滑鼠停留的那張（index），左右鄰居會讓開 */
export function handPose(i: number, n: number, hovered: number | null, l: Layout, vw: number, vh: number): Pose {
  const maxSpread = vw - l.cardW - (l.narrow ? 48 : 160)
  const spacing = n > 1 ? Math.min(l.cardW * 0.8, maxSpread / (n - 1)) : 0
  const off = i - (n - 1) / 2

  let cx = vw / 2 + off * spacing
  let cy = vh - l.handPeek + l.cardH / 2 + off * off * (l.narrow ? 3 : 6)
  let rotate = off * (l.narrow ? 3 : 5)
  let scale = 1

  if (hovered !== null) {
    if (i === hovered) {
      cy = vh - (l.cardH * HOVER_SCALE) / 2 - 14
      rotate = 0
      scale = HOVER_SCALE
    } else {
      const d = i - hovered
      cx += (Math.sign(d) * l.cardW * 0.36) / Math.abs(d) ** 0.6
    }
  }
  return { cx, cy, rotate, scale }
}

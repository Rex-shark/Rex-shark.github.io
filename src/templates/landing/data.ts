import { formatNT } from '../lib/format'

/** 方案介紹頁（森林盒子 Qingsen Box）專屬假資料。權威來源：spec/templates/landing.md */

export const SECTIONS = [
  { id: 'land-how', label: '怎麼運作' },
  { id: 'land-plans', label: '方案' },
  { id: 'land-box', label: '本月內容' },
  { id: 'land-faq', label: '常見問題' },
] as const

export const SECTION_IDS = SECTIONS.map((s) => s.id)

export type PlanKey = 'light' | 'forest' | 'craft'
export type Billing = 'monthly' | 'yearly'

export interface Plan {
  key: PlanKey
  name: string
  monthly: number
  /** 年繳換算每月（約） */
  yearlyPerMonth: number
  yearlyTotal: number
  summary: string
  popular?: boolean
}

export const PLANS: Plan[] = [
  { key: 'light', name: '輕盒', monthly: 690, yearlyPerMonth: 575, yearlyTotal: 6900, summary: '3 件生活小物' },
  { key: 'forest', name: '森林盒', monthly: 1290, yearlyPerMonth: 1075, yearlyTotal: 12900, summary: '4–5 件，含 1 件餐廚或織品', popular: true },
  { key: 'craft', name: '工匠盒', monthly: 2490, yearlyPerMonth: 2075, yearlyTotal: 24900, summary: '5–6 件，每季加送 1 件工匠作品' },
]

/** 方案比較表：true＝包含、false＝不包含、字串＝數值 */
export const FEATURES: { label: string; values: Record<PlanKey, boolean | string> }[] = [
  { label: '每月選物件數', values: { light: '3', forest: '4–5', craft: '5–6' } },
  { label: '工匠故事卡', values: { light: true, forest: true, craft: true } },
  { label: '免運配送', values: { light: true, forest: true, craft: true } },
  { label: '餐廚或織品大件', values: { light: false, forest: true, craft: true } },
  { label: '每季工匠作品', values: { light: false, forest: false, craft: true } },
  { label: '手作課程 9 折', values: { light: false, forest: true, craft: true } },
  { label: '新品搶先購', values: { light: false, forest: false, craft: true } },
]

export const STEPS_HOW = [
  { title: '選一個方案', text: '三種盒子大小，月繳或年繳都可以。' },
  { title: '每月 15 日出貨', text: '選品團隊依季節挑選，附上每件商品的工匠故事卡。' },
  { title: '隨時暫停或取消', text: '下個出貨日前 5 天在會員中心操作即可，不綁約。' },
]

/** 本月盒子內容（11 月・森林盒）：單買合計 580 + 760 + 450 + 1,080 = 2,870 */
export const BOX_ITEMS = [
  { productId: 'P04', variant: '苔綠' },
  { productId: 'P08', variant: '雪松' },
  { productId: 'P12', variant: '薑黃' },
  { productId: 'P09' },
]

export const REVIEWS = [
  { name: '林雨潔', plan: '森林盒', duration: '14 個月', text: '每個月最期待 15 號，拆箱像收到朋友寄來的禮物。' },
  { name: '陳柏翰', plan: '輕盒', duration: '6 個月', text: '剛搬新家，靠輕盒慢慢把家裡佈置起來，不用自己煩惱挑什麼。' },
  { name: '黃思妤', plan: '工匠盒', duration: '2 年', text: '工匠作品每一季都很驚喜，家裡的木作擺件幾乎都是盒子裡來的。' },
]

export const FAQ = [
  { q: '可以指定不要某些商品嗎？', a: '可以在會員中心設定不收香氛類或指定顏色偏好，選品時會避開。' },
  { q: '什麼時候扣款？', a: '月繳於每月 10 日扣款；年繳於訂閱當天一次扣款。' },
  { q: '可以暫停嗎？', a: '可以，下個出貨日前 5 天暫停，最長可暫停 3 個月。' },
  { q: '可以送禮嗎？', a: '可以，訂閱時開啟「送禮」並填寫收禮人資料，盒中會附上你的祝福卡。' },
  { q: '年繳中途取消怎麼算？', a: '依已出貨月數以月繳價格計算，差額退回原付款方式。' },
]

/** 應付金額：月繳「NT$X ／ 月」、年繳「NT$X ／ 年」 */
export function amountLabel(plan: PlanKey, billing: Billing) {
  const p = PLANS.find((x) => x.key === plan)!
  return billing === 'monthly' ? `${formatNT(p.monthly)} ／ 月` : `${formatNT(p.yearlyTotal)} ／ 年`
}

export const START_MONTHS = [
  { value: '2026-12', label: '2026 年 12 月', month: 12 },
  { value: '2027-01', label: '2027 年 1 月', month: 1 },
] as const

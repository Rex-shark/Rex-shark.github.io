/** 後台儀表板專屬假資料。權威來源：spec/templates/dashboard.md（資料時間固定 2026 年 11 月） */

export const PERIOD_LABEL = '2026 年 11 月'

export type OrderStatus = 'unpaid' | 'paid' | 'shipping' | 'done' | 'cancelled'
export type PaymentMethod = '信用卡' | 'LINE Pay' | 'ATM 轉帳' | '貨到付款'

export const STATUS_LABEL: Record<OrderStatus, string> = {
  unpaid: '待付款',
  paid: '已付款',
  shipping: '出貨中',
  done: '已完成',
  cancelled: '已取消',
}

export const STATUS_ORDER: OrderStatus[] = ['unpaid', 'paid', 'shipping', 'done', 'cancelled']

export interface OrderItem {
  productId: string
  /** 規格選項名稱（例如「霧白」「大」） */
  variant?: string
  qty: number
  /** 單價（含規格加價） */
  unitPrice: number
}

export interface Order {
  id: string
  customer: string
  createdAt: string
  items: OrderItem[]
  payment: PaymentMethod
  status: OrderStatus
}

/** 未滿 NT$1,500 運費 NT$100 */
export const FREE_SHIPPING = 1500
export const SHIPPING_FEE = 100
export const DEMO_ADDRESS = '台北市大安區示範路 100 號'

export const orderSubtotal = (o: Order) => o.items.reduce((s, i) => s + i.unitPrice * i.qty, 0)
export const orderShipping = (o: Order) => (orderSubtotal(o) >= FREE_SHIPPING ? 0 : SHIPPING_FEE)
export const orderTotal = (o: Order) => orderSubtotal(o) + orderShipping(o)

/** 12 筆訂單（依日期降冪）。金額由商品計算，與規格表一致 */
export const ORDERS: Order[] = [
  { id: 'QS-261109-0418', customer: '林雨潔', createdAt: '2026/11/09 14:32', items: [{ productId: 'P04', variant: '霧白', qty: 2, unitPrice: 580 }], payment: 'LINE Pay', status: 'paid' },
  { id: 'QS-261109-0417', customer: '陳柏翰', createdAt: '2026/11/09 11:05', items: [{ productId: 'P01', variant: '小', qty: 1, unitPrice: 4680 }], payment: '信用卡', status: 'paid' },
  { id: 'QS-261109-0416', customer: '黃思妤', createdAt: '2026/11/09 09:47', items: [{ productId: 'P08', variant: '雪松', qty: 3, unitPrice: 760 }], payment: 'ATM 轉帳', status: 'unpaid' },
  { id: 'QS-261108-0415', customer: '張家豪', createdAt: '2026/11/08 21:18', items: [{ productId: 'P03', qty: 1, unitPrice: 8900 }], payment: '信用卡', status: 'shipping' },
  { id: 'QS-261108-0414', customer: '吳佩珊', createdAt: '2026/11/08 16:40', items: [{ productId: 'P07', qty: 1, unitPrice: 890 }, { productId: 'P09', qty: 1, unitPrice: 1080 }], payment: 'LINE Pay', status: 'shipping' },
  { id: 'QS-261108-0413', customer: '劉冠廷', createdAt: '2026/11/08 10:12', items: [{ productId: 'P10', variant: '燕麥', qty: 2, unitPrice: 720 }], payment: '貨到付款', status: 'shipping' },
  { id: 'QS-261107-0412', customer: '蔡宜蓁', createdAt: '2026/11/07 19:56', items: [{ productId: 'P02', qty: 1, unitPrice: 6200 }], payment: '信用卡', status: 'done' },
  { id: 'QS-261107-0411', customer: '鄭宇軒', createdAt: '2026/11/07 13:24', items: [{ productId: 'P12', variant: '藍染', qty: 2, unitPrice: 450 }], payment: 'ATM 轉帳', status: 'cancelled' },
  { id: 'QS-261106-0410', customer: '許雅雯', createdAt: '2026/11/06 20:03', items: [{ productId: 'P11', variant: '六人', qty: 1, unitPrice: 1780 }], payment: '信用卡', status: 'done' },
  { id: 'QS-261106-0409', customer: '楊承恩', createdAt: '2026/11/06 15:31', items: [{ productId: 'P05', variant: '中', qty: 1, unitPrice: 1280 }, { productId: 'P04', variant: '炭黑', qty: 1, unitPrice: 580 }], payment: 'LINE Pay', status: 'done' },
  { id: 'QS-261105-0408', customer: '林雨潔', createdAt: '2026/11/05 12:08', items: [{ productId: 'P08', variant: '白茶', qty: 1, unitPrice: 760 }], payment: '信用卡', status: 'done' },
  { id: 'QS-261105-0407', customer: '黃思妤', createdAt: '2026/11/05 09:15', items: [{ productId: 'P01', variant: '大', qty: 1, unitPrice: 5480 }], payment: 'ATM 轉帳', status: 'done' },
]

export interface Kpi {
  key: string
  label: string
  value: string
  /** 與上月比較的文字 */
  delta: string
  /** 數字方向 */
  direction: 'up' | 'down'
  /** 這個變化是好是壞（退貨率下降是好事） */
  good: boolean
}

export const KPIS: Kpi[] = [
  { key: 'revenue', label: '本月營收', value: 'NT$1,284,600', delta: '+12.4%', direction: 'up', good: true },
  { key: 'orders', label: '訂單數', value: '1,862', delta: '+8.1%', direction: 'up', good: true },
  { key: 'aov', label: '平均客單價', value: 'NT$690', delta: '+3.9%', direction: 'up', good: true },
  { key: 'returns', label: '退貨率', value: '2.3%', delta: '−0.4 個百分點', direction: 'down', good: true },
]

/** 營收（單位：千元） */
export const REVENUE_12M = [
  { label: '2025/12', value: 812 },
  { label: '2026/01', value: 768 },
  { label: '02', value: 845 },
  { label: '03', value: 901 },
  { label: '04', value: 934 },
  { label: '05', value: 988 },
  { label: '06', value: 1042 },
  { label: '07', value: 1016 },
  { label: '08', value: 1097 },
  { label: '09', value: 1121 },
  { label: '10', value: 1143 },
  { label: '11', value: 1284.6 },
]

export const REVENUE_7D = [
  { label: '11/03', value: 38.2 },
  { label: '11/04', value: 41.5 },
  { label: '11/05', value: 36.9 },
  { label: '11/06', value: 44.8 },
  { label: '11/07', value: 52.3 },
  { label: '11/08', value: 61.7 },
  { label: '11/09', value: 57.4 },
]

export type ActivityKind = 'order' | 'review' | 'stock' | 'status' | 'soldout' | 'product'

export const ACTIVITY: { time: string; text: string; kind: ActivityKind }[] = [
  { time: '5 分鐘前', text: '林雨潔 下了一筆訂單 QS-261109-0418', kind: 'order' },
  { time: '32 分鐘前', text: '黃思妤 評論了「雪松大豆蠟燭」★★★★★', kind: 'review' },
  { time: '1 小時前', text: '藤編休閒椅 庫存剩 3 件', kind: 'stock' },
  { time: '3 小時前', text: '何雅琪 將 QS-261108-0415 標記為出貨中', kind: 'status' },
  { time: '今天 08:00', text: '手沖咖啡壺 已售完', kind: 'soldout' },
  { time: '昨天', text: '新增商品「棉麻桌巾」', kind: 'product' },
]

export interface Notification {
  id: string
  text: string
  time: string
  read: boolean
  /** 點擊時開啟的訂單 */
  orderId?: string
}

export const NOTIFICATIONS: Notification[] = [
  { id: 'n1', text: '新訂單 QS-261109-0418', time: '5 分鐘前', read: false, orderId: 'QS-261109-0418' },
  { id: 'n2', text: '藤編休閒椅 庫存剩 3 件', time: '1 小時前', read: false },
  { id: 'n3', text: '手沖咖啡壺 已售完', time: '今天 08:00', read: false },
  { id: 'n4', text: '黃思妤 給了 5 星評論', time: '昨天', read: true },
]

export interface StoreSettings {
  storeName: string
  email: string
  phone: string
  intro: string
  notifyOrder: boolean
  notifyLowStock: boolean
  weeklyReport: boolean
  marketing: boolean
  lowStock: number
  language: 'zh-TW' | 'en' | 'ja'
  timezone: 'Asia/Taipei' | 'Asia/Tokyo' | 'UTC'
}

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: '青森選物',
  email: 'hello@qingsen.example.com',
  phone: '02-2700-0000',
  intro: '來自台灣的木作與生活選物品牌，與在地工匠合作，做能用很久的東西。',
  notifyOrder: true,
  notifyLowStock: true,
  weeklyReport: false,
  marketing: false,
  lowStock: 10,
  language: 'zh-TW',
  timezone: 'Asia/Taipei',
}

import { createStore } from '../lib/store'
import { PRODUCTS, productById, type CategorySlug, type Product } from '../data/catalog'
import { resetOrderSequence } from '../data/sequence'

/**
 * 購物網站狀態（模組層級，風格之外）。對應 spec/templates/shop.md。
 * 切換風格不會重置；工具列「重設」呼叫 reset()。
 */

export type ShopPage = 'list' | 'detail' | 'checkout' | 'done'
export type PriceRange = 'all' | 'under1000' | '1000to3000' | 'over3000'
export type SortKey = 'recommended' | 'priceAsc' | 'priceDesc' | 'rating' | 'newest'
export type Shipping = 'home' | 'store'
export type Payment = 'card' | 'linepay' | 'atm' | 'cod'

export const FREE_SHIPPING = 1500
export const SHIPPING_FEE: Record<Shipping, number> = { home: 100, store: 60 }
export const COUPON_CODE = 'QINGSEN10'

export const PRICE_LABEL: Record<PriceRange, string> = {
  all: '全部價格',
  under1000: 'NT$1,000 以下',
  '1000to3000': 'NT$1,000–3,000',
  over3000: 'NT$3,000 以上',
}

export const SORT_LABEL: Record<SortKey, string> = {
  recommended: '推薦',
  priceAsc: '價格低到高',
  priceDesc: '價格高到低',
  rating: '評分最高',
  newest: '最新上架',
}

export const PAYMENT_LABEL: Record<Payment, string> = {
  card: '信用卡',
  linepay: 'LINE Pay',
  atm: 'ATM 轉帳',
  cod: '貨到付款',
}

export const SHIPPING_LABEL: Record<Shipping, string> = { home: '宅配', store: '超商取貨' }

export interface CartLine {
  /** productId + 規格，同商品同規格合併 */
  key: string
  productId: string
  variant?: string
  qty: number
}

export interface Filters {
  category: CategorySlug | 'all'
  price: PriceRange
  inStock: boolean
  favOnly: boolean
  keyword: string
  sort: SortKey
}

export interface PlacedOrder {
  id: string
  lines: CartLine[]
  subtotal: number
  discount: number
  shippingFee: number
  total: number
  shipping: Shipping
  payment: Payment
}

export interface ShopState {
  version: number
  page: ShopPage
  detailId: string | null
  filters: Filters
  favorites: string[]
  cart: CartLine[]
  coupon: string | null
  cartOpen: boolean
  announcementClosed: boolean
  /** 列表骨架屏只在第一次進入時顯示 */
  listLoaded: boolean
  /** 從詳情頁返回時還原列表捲動位置 */
  listScroll: number
  lastOrder: PlacedOrder | null
}

const DEFAULT_FILTERS: Filters = { category: 'all', price: 'all', inStock: false, favOnly: false, keyword: '', sort: 'recommended' }

let version = 0

function init(): ShopState {
  resetOrderSequence()
  return {
    version: version++,
    page: 'list',
    detailId: null,
    filters: { ...DEFAULT_FILTERS },
    favorites: [],
    cart: [],
    coupon: null,
    cartOpen: false,
    announcementClosed: false,
    listLoaded: false,
    listScroll: 0,
    lastOrder: null,
  }
}

export type ShopAction =
  | { type: 'goList'; filters?: Partial<Filters>; resetFilters?: boolean }
  | { type: 'openDetail'; id: string; listScroll?: number }
  | { type: 'goCheckout' }
  | { type: 'setFilter'; patch: Partial<Filters> }
  | { type: 'clearFilters' }
  | { type: 'toggleFavorite'; id: string }
  | { type: 'addToCart'; productId: string; variant?: string; qty: number }
  | { type: 'setQty'; key: string; qty: number }
  | { type: 'removeLine'; key: string }
  | { type: 'restoreLine'; line: CartLine; index: number }
  | { type: 'setCoupon'; code: string | null }
  | { type: 'cart'; open: boolean }
  | { type: 'closeAnnouncement' }
  | { type: 'listLoaded' }
  | { type: 'placeOrder'; order: PlacedOrder }
  | { type: 'continueShopping' }

function reducer(s: ShopState, a: ShopAction): ShopState {
  switch (a.type) {
    case 'goList':
      return {
        ...s,
        page: 'list',
        cartOpen: false,
        filters: a.resetFilters ? { ...DEFAULT_FILTERS, ...a.filters } : { ...s.filters, ...a.filters },
        // 從頁首導覽或 Logo 回列表時不還原捲動
        listScroll: a.filters || a.resetFilters ? 0 : s.listScroll,
      }
    case 'openDetail':
      return { ...s, page: 'detail', detailId: a.id, cartOpen: false, listScroll: a.listScroll ?? s.listScroll }
    case 'goCheckout':
      return { ...s, page: 'checkout', cartOpen: false }
    case 'setFilter':
      return { ...s, filters: { ...s.filters, ...a.patch } }
    case 'clearFilters':
      return { ...s, filters: { ...DEFAULT_FILTERS, sort: s.filters.sort } }
    case 'toggleFavorite':
      return {
        ...s,
        favorites: s.favorites.includes(a.id) ? s.favorites.filter((f) => f !== a.id) : [...s.favorites, a.id],
      }
    case 'addToCart': {
      const key = `${a.productId}|${a.variant ?? ''}`
      const product = productById(a.productId)
      // 上限以整個商品計算：同商品不同規格共用 min(庫存, 10)
      const add = Math.min(a.qty, maxQty(product) - qtyInCart(s.cart, a.productId))
      if (add <= 0) return { ...s, cartOpen: true }
      const existing = s.cart.find((l) => l.key === key)
      const cart = existing
        ? s.cart.map((l) => (l.key === key ? { ...l, qty: l.qty + add } : l))
        : [...s.cart, { key, productId: a.productId, variant: a.variant, qty: add }]
      return { ...s, cart, cartOpen: true }
    }
    case 'setQty':
      return { ...s, cart: s.cart.map((l) => (l.key === a.key ? { ...l, qty: Math.max(1, Math.min(a.qty, lineMax(s.cart, l))) } : l)) }
    case 'removeLine':
      return { ...s, cart: s.cart.filter((l) => l.key !== a.key) }
    case 'restoreLine': {
      if (s.cart.some((l) => l.key === a.line.key)) return s
      // 復原時同商品可能已加入其他規格：仍以整個商品上限為準
      const qty = Math.min(a.line.qty, maxQty(productById(a.line.productId)) - qtyInCart(s.cart, a.line.productId))
      if (qty <= 0) return s
      const cart = [...s.cart]
      cart.splice(Math.min(a.index, cart.length), 0, { ...a.line, qty })
      return { ...s, cart }
    }
    case 'setCoupon':
      return { ...s, coupon: a.code }
    case 'cart':
      return { ...s, cartOpen: a.open }
    case 'closeAnnouncement':
      return { ...s, announcementClosed: true }
    case 'listLoaded':
      return { ...s, listLoaded: true }
    case 'placeOrder':
      return { ...s, page: 'done', lastOrder: a.order }
    case 'continueShopping':
      return { ...s, page: 'list', cart: [], coupon: null, listScroll: 0 }
  }
}

export const shopStore = createStore(init, reducer)
export const dispatch = shopStore.dispatch

// ── 計算 ─────────────────────────────────────────────

/** 數量上限：min(庫存, 10)，以整個商品計算（同商品不同規格共用） */
export const maxQty = (p: Product | undefined) => Math.max(0, Math.min(p?.stock ?? 0, 10))

/** 購物車內某商品（所有規格）的總件數 */
export const qtyInCart = (cart: CartLine[], productId: string, exceptKey?: string) =>
  cart.reduce((n, l) => (l.productId === productId && l.key !== exceptKey ? n + l.qty : n), 0)

/** 購物車某一列可調到的上限：商品上限扣掉同商品其他規格的件數 */
export const lineMax = (cart: CartLine[], line: CartLine) => Math.max(1, maxQty(productById(line.productId)) - qtyInCart(cart, line.productId, line.key))

export function unitPrice(productId: string, variant?: string): number {
  const p = productById(productId)
  if (!p) return 0
  const delta = p.variant?.options.find((o) => o.name === variant)?.priceDelta ?? 0
  return p.price + delta
}

export const discountPercent = (p: Product) => (p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0)

export function cartTotals(cart: CartLine[], coupon: string | null, shipping: Shipping = 'home') {
  const subtotal = cart.reduce((sum, l) => sum + unitPrice(l.productId, l.variant) * l.qty, 0)
  const discount = coupon === COUPON_CODE ? Math.round(subtotal * 0.1) : 0
  const afterDiscount = subtotal - discount
  const shippingFee = cart.length === 0 || afterDiscount >= FREE_SHIPPING ? 0 : SHIPPING_FEE[shipping]
  return { subtotal, discount, afterDiscount, shippingFee, total: afterDiscount + shippingFee, count: cart.reduce((n, l) => n + l.qty, 0) }
}

function inPriceRange(price: number, range: PriceRange) {
  if (range === 'under1000') return price < 1000
  if (range === '1000to3000') return price >= 1000 && price <= 3000
  if (range === 'over3000') return price > 3000
  return true
}

export function filterProducts(f: Filters, favorites: string[]): Product[] {
  const q = f.keyword.trim()
  const list = PRODUCTS.filter(
    (p) =>
      (f.category === 'all' || p.category === f.category) &&
      inPriceRange(p.price, f.price) &&
      (!f.inStock || p.stock > 0) &&
      (!f.favOnly || favorites.includes(p.id)) &&
      (!q || p.name.includes(q) || p.description.includes(q)),
  )
  const sorted = [...list]
  switch (f.sort) {
    case 'priceAsc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'priceDesc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
    case 'newest':
      return sorted.sort((a, b) => Number(b.tag === '新品') - Number(a.tag === '新品') || b.id.localeCompare(a.id))
    default:
      return sorted
  }
}

export const TW_COUNTIES = [
  '臺北市', '新北市', '桃園市', '臺中市', '臺南市', '高雄市', '基隆市', '新竹市', '嘉義市', '新竹縣', '苗栗縣',
  '彰化縣', '南投縣', '雲林縣', '嘉義縣', '屏東縣', '宜蘭縣', '花蓮縣', '臺東縣', '澎湖縣', '金門縣', '連江縣',
]

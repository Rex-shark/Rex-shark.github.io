import { createStore } from '../lib/store'
import { PRODUCTS, type CategorySlug, type ProductTag } from '../data/catalog'
import type { SortDir } from '../ui/Table'
import { INITIAL_SETTINGS, NOTIFICATIONS, ORDERS, type Notification, type Order, type OrderStatus, type StoreSettings } from './data'

/**
 * 後台儀表板狀態（模組層級，風格之外）。
 * 切換風格不會重置；工具列「重設」或設定頁「清除示範資料」呼叫 reset()。
 */

export type DashPage = 'overview' | 'orders' | 'products' | 'settings'
export type OrderTab = 'all' | OrderStatus
export type OrderSortKey = 'createdAt' | 'total'

export interface AdminProduct {
  id: string
  name: string
  category: CategorySlug
  price: number
  originalPrice?: number
  stock: number
  monthlySales: number
  tags: ProductTag[]
  published: boolean
}

export interface DashState {
  /** 每次重設 +1，用來讓頁面上的暫存表單一併重來 */
  version: number
  page: DashPage
  orders: Order[]
  products: AdminProduct[]
  settings: StoreSettings
  notifications: Notification[]
  orderQuery: string
  orderTab: OrderTab
  orderSort: { key: OrderSortKey; dir: SortDir }
  orderPage: number
  selectedOrders: string[]
  openOrderId: string | null
  productCategory: CategorySlug | 'all'
  productQuery: string
  productView: 'table' | 'cards'
  revenueRange: '7d' | '12m'
}

let version = 0

function init(): DashState {
  return {
    version: version++,
    page: 'overview',
    orders: ORDERS.map((o) => ({ ...o, items: o.items.map((i) => ({ ...i })) })),
    products: PRODUCTS.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      originalPrice: p.originalPrice,
      stock: p.stock,
      monthlySales: p.monthlySales,
      tags: p.tag ? [p.tag] : [],
      published: p.id !== 'P06',
    })),
    settings: { ...INITIAL_SETTINGS },
    notifications: NOTIFICATIONS.map((n) => ({ ...n })),
    orderQuery: '',
    orderTab: 'all',
    orderSort: { key: 'createdAt', dir: 'desc' },
    orderPage: 1,
    selectedOrders: [],
    openOrderId: null,
    productCategory: 'all',
    productQuery: '',
    productView: 'table',
    revenueRange: '12m',
  }
}

export type DashAction =
  | { type: 'page'; page: DashPage }
  | { type: 'orderQuery'; query: string }
  | { type: 'globalSearch'; query: string }
  | { type: 'orderTab'; tab: OrderTab }
  | { type: 'orderSort'; key: OrderSortKey }
  | { type: 'orderPage'; page: number }
  | { type: 'selectOrders'; ids: string[]; selected: boolean }
  | { type: 'clearSelection' }
  | { type: 'markShipping'; ids: string[] }
  | { type: 'setStatus'; id: string; status: OrderStatus }
  | { type: 'openOrder'; id: string | null }
  | { type: 'readNotification'; id: string }
  | { type: 'readAllNotifications' }
  | { type: 'productCategory'; category: CategorySlug | 'all' }
  | { type: 'productQuery'; query: string }
  | { type: 'productView'; view: 'table' | 'cards' }
  | { type: 'togglePublished'; id: string }
  | { type: 'addProduct'; product: AdminProduct }
  | { type: 'saveSettings'; settings: StoreSettings }
  | { type: 'revenueRange'; range: '7d' | '12m' }

function reducer(s: DashState, a: DashAction): DashState {
  switch (a.type) {
    case 'page':
      return { ...s, page: a.page }
    case 'orderQuery':
      // 篩選條件或頁碼改變就清除勾選，批次操作只作用在畫面上看得到的訂單
      return { ...s, orderQuery: a.query, orderPage: 1, selectedOrders: [] }
    case 'globalSearch':
      return { ...s, page: 'orders', orderQuery: a.query, orderTab: 'all', orderPage: 1, selectedOrders: [] }
    case 'orderTab':
      return { ...s, orderTab: a.tab, orderPage: 1, selectedOrders: [] }
    case 'orderSort':
      return {
        ...s,
        orderSort: { key: a.key, dir: s.orderSort.key === a.key && s.orderSort.dir === 'desc' ? 'asc' : 'desc' },
        orderPage: 1,
      }
    case 'orderPage':
      return { ...s, orderPage: a.page, selectedOrders: [] }
    case 'selectOrders': {
      const set = new Set(s.selectedOrders)
      a.ids.forEach((id) => (a.selected ? set.add(id) : set.delete(id)))
      return { ...s, selectedOrders: [...set] }
    }
    case 'clearSelection':
      return { ...s, selectedOrders: [] }
    case 'markShipping': {
      const ids = new Set(a.ids)
      return {
        ...s,
        orders: s.orders.map((o) => (ids.has(o.id) && o.status === 'paid' ? { ...o, status: 'shipping' } : o)),
        selectedOrders: [],
      }
    }
    case 'setStatus':
      return { ...s, orders: s.orders.map((o) => (o.id === a.id ? { ...o, status: a.status } : o)) }
    case 'openOrder':
      return { ...s, openOrderId: a.id }
    case 'readNotification':
      return { ...s, notifications: s.notifications.map((n) => (n.id === a.id ? { ...n, read: true } : n)) }
    case 'readAllNotifications':
      return { ...s, notifications: s.notifications.map((n) => ({ ...n, read: true })) }
    case 'productCategory':
      return { ...s, productCategory: a.category }
    case 'productQuery':
      return { ...s, productQuery: a.query }
    case 'productView':
      return { ...s, productView: a.view }
    case 'togglePublished':
      return { ...s, products: s.products.map((p) => (p.id === a.id ? { ...p, published: !p.published } : p)) }
    case 'addProduct':
      return { ...s, products: [a.product, ...s.products] }
    case 'saveSettings':
      return { ...s, settings: a.settings }
    case 'revenueRange':
      return { ...s, revenueRange: a.range }
  }
}

export const dashStore = createStore(init, reducer)
export const dispatch = dashStore.dispatch

/** 待處理訂單數（待付款＋已付款），顯示在側欄徽章 */
export const pendingCount = (orders: Order[]) => orders.filter((o) => o.status === 'unpaid' || o.status === 'paid').length

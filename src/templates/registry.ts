import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

export type TemplateStatus = 'ready' | 'building' | 'planned'

/** 版型分組；新增分組時加在這裡，工具列與總覽依此順序顯示 */
export const TEMPLATE_GROUPS = ['後台系統', '前台網站', '內部'] as const
export type TemplateGroup = (typeof TEMPLATE_GROUPS)[number]

export interface TemplateEntry {
  slug: string
  name: string
  /** 工具列版型面板的分組 */
  group: TemplateGroup
  /** 對應的客戶情境 */
  scenario: string
  description: string
  status: TemplateStatus
  /** 不列在總覽頁（例如元件總覽） */
  hidden?: boolean
  View?: LazyExoticComponent<ComponentType>
  /** 工具列「重設」：把該版型狀態恢復為初始資料 */
  reset?: () => void
}

/** 版型清單。順序即總覽頁與工具列順序。對應 spec/templates/README.md 第 2.1 節 */
export const TEMPLATES: TemplateEntry[] = [
  {
    slug: 'dashboard',
    group: '後台系統',
    name: '後台儀表板',
    scenario: '管理後台、內部系統、SaaS 後台',
    description: 'KPI、營收趨勢圖、訂單表格（篩選、排序、分頁、批次操作）、商品管理與設定表單。',
    status: 'ready',
    View: lazy(() => import('./dashboard/View')),
    reset: () => {
      import('./dashboard/state').then((m) => m.dashStore.reset())
    },
  },
  {
    slug: 'shop',
    group: '前台網站',
    name: '購物網站',
    scenario: '電商、品牌官方商城',
    description: '商品列表與篩選、商品詳情、購物車、結帳流程與訂購完成。',
    status: 'ready',
    View: lazy(() => import('./shop/View')),
    reset: () => {
      import('./shop/state').then((m) => m.shopStore.reset())
    },
  },
  {
    slug: 'corporate',
    group: '前台網站',
    name: '公司官網',
    scenario: '企業形象站、品牌官網',
    description: '品牌理念、服務項目、門市據點、最新消息、徵才、常見問題與聯絡表單。',
    status: 'ready',
    View: lazy(() => import('./corporate/View')),
    reset: () => {
      import('./corporate/state').then((m) => m.corpStore.reset())
    },
  },
  {
    slug: 'landing',
    group: '前台網站',
    name: '方案介紹頁',
    scenario: '訂閱制、SaaS 產品頁、活動 Landing page',
    description: '月繳／年繳價格切換、方案比較表、本月內容、訂閱者回饋與訂閱對話框。',
    status: 'ready',
    View: lazy(() => import('./landing/View')),
    reset: () => {
      import('./landing/state').then((m) => m.landingStore.reset())
    },
  },
  {
    slug: 'kit',
    group: '內部',
    name: '元件總覽',
    scenario: '風格驗收用',
    description: '所有共用元件在各種狀態下的樣子。',
    status: 'ready',
    hidden: true,
    View: lazy(() => import('./kit/KitView')),
  },
]

export const getTemplate = (slug: string | undefined) => TEMPLATES.find((t) => t.slug === slug)

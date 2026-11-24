import { useEffect } from 'react'
import { useStore } from '../lib/store'
import { useTplScroll } from '../viewer/context'
import { dashStore } from './state'
import { Sidebar, Topbar } from './Shell'
import OrderDrawer from './OrderDrawer'
import Overview from './pages/Overview'
import Orders from './pages/Orders'
import Products from './pages/Products'
import Settings from './pages/Settings'

const PAGES = { overview: Overview, orders: Orders, products: Products, settings: Settings }

/**
 * 後台儀表板（spec/templates/dashboard.md）。
 * 子頁用 store 的 page 切換，不開新路由；重設時 version 改變，整個儀表板重新掛載以清掉暫存表單。
 */
export default function DashboardView() {
  const page = useStore(dashStore, (s) => s.page)
  const version = useStore(dashStore, (s) => s.version)
  const scrollEl = useTplScroll()
  const Page = PAGES[page]

  // 換頁時回到頂端（捲動容器是範本外框，不是 window）
  useEffect(() => {
    scrollEl?.scrollTo({ top: 0 })
  }, [page, scrollEl])

  return (
    <div key={version} className="flex min-h-(--tpl-view-h)">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        {/* 主內容區自己是容器：頁面內的斷點依「扣掉側欄後」的實際寬度判斷 */}
        <main className="@container flex-1 px-4 pt-5 pb-10 @3xl:px-6 @5xl:px-8 @5xl:pt-7">
          <Page />
        </main>
      </div>
      <OrderDrawer />
    </div>
  )
}

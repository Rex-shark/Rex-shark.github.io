import { useEffect } from 'react'
import { useStore } from '../lib/store'
import { useTplScroll } from '../viewer/context'
import { shopStore } from './state'
import { Announcement, Footer, Header } from './Shell'
import CartDrawer from './Cart'
import List from './pages/List'
import Detail from './pages/Detail'
import Checkout from './pages/Checkout'
import Done from './pages/Done'

/**
 * 購物網站（spec/templates/shop.md）。
 * 列表 → 詳情 → 結帳 → 完成用 store 的 page 切換，不開新路由。
 * 從詳情頁回列表時還原原本的捲動位置；其他換頁回到頂端。
 */
export default function ShopView() {
  const page = useStore(shopStore, (s) => s.page)
  const detailId = useStore(shopStore, (s) => s.detailId)
  const version = useStore(shopStore, (s) => s.version)
  const scrollEl = useTplScroll()

  useEffect(() => {
    if (!scrollEl) return
    const target = page === 'list' ? shopStore.getState().listScroll : 0
    requestAnimationFrame(() => scrollEl.scrollTo({ top: target }))
  }, [page, detailId, scrollEl])

  return (
    <div key={version} className="flex min-h-(--tpl-view-h) flex-col">
      <Announcement />
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pt-6 @3xl:px-8 @3xl:pt-8">
        {page === 'list' && <List />}
        {page === 'detail' && <Detail key={detailId} />}
        {page === 'checkout' && <Checkout />}
        {page === 'done' && <Done />}
      </main>
      <Footer />
      <CartDrawer />
    </div>
  )
}

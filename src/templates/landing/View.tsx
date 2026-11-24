import { useStore } from '../lib/store'
import { landingStore } from './state'
import { Box, Cta, Faq, Footer, Hero, How, Nav, Plans, Reviews } from './Sections'
import SubscribeDialog from './SubscribeDialog'

/**
 * 方案介紹頁（spec/templates/landing.md）：月訂閱「森林盒子」Landing page。
 * 區塊順序固定：主視覺 → 怎麼運作 → 方案與比較表 → 本月內容 → 訂閱者回饋 → FAQ → 結尾行動區 → 頁尾。
 */
export default function LandingView() {
  const version = useStore(landingStore, (s) => s.version)
  return (
    <div key={version} className="min-h-(--tpl-view-h)">
      <Nav />
      <main>
        <Hero />
        <How />
        <Plans />
        <Box />
        <Reviews />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <SubscribeDialog />
    </div>
  )
}

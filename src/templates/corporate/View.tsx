import { useStore } from '../lib/store'
import { corpStore } from './state'
import { BackToTop, Footer, Nav } from './Shell'
import { About, Hero, Services, Story } from './sections/Intro'
import { News, Stores, Team, Testimonials } from './sections/Middle'
import { Careers, Contact, Faq } from './sections/Closing'

/**
 * 公司官網（spec/templates/corporate.md）：單頁長捲動。
 * 區塊順序固定：主視覺 → 關於 → 服務 → 品牌故事 → 門市 → 消息 → 團隊 → 好評 → 加入我們 → FAQ → 聯絡 → 頁尾。
 */
export default function CorporateView() {
  const version = useStore(corpStore, (s) => s.version)
  return (
    <div key={version} className="min-h-(--tpl-view-h)">
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Story />
        <Stores />
        <News />
        <Team />
        <Testimonials />
        <Careers />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

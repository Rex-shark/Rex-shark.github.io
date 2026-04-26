import { useEffect } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}
import StyleGallery from '@/pages/StyleGallery'
import MinimalBusiness from '@/pages/styles/MinimalBusiness'
import HandDrawn from '@/pages/styles/HandDrawn'
import Cyberpunk from '@/pages/styles/Cyberpunk'
import JapaneseMinimal from '@/pages/styles/JapaneseMinimal'
import Vaporwave from '@/pages/styles/Vaporwave'
import Macbook from '@/pages/styles/Macbook'
import Steampunk from '@/pages/styles/Steampunk'
import SwissModern from '@/pages/styles/SwissModern'
import PixelArt from '@/pages/styles/PixelArt'
import SoftUi from '@/pages/styles/SoftUi'
import Glassmorphism from '@/pages/styles/Glassmorphism'
import Claymorphism from '@/pages/styles/Claymorphism'
import MicroInteractions from '@/pages/styles/MicroInteractions'
import BentoGrid from '@/pages/styles/BentoGrid'
import AntiPolish from '@/pages/styles/AntiPolish'
import SpatialUi from '@/pages/styles/SpatialUi'
import IdeTerminal from '@/pages/styles/IdeTerminal'
import AccessibleEthical from '@/pages/styles/AccessibleEthical'
import GithubProfile from '@/pages/styles/GithubProfile'

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<StyleGallery />} />
        <Route path="/styles/minimal-business" element={<MinimalBusiness />} />
        <Route path="/styles/hand-drawn" element={<HandDrawn />} />
        <Route path="/styles/cyberpunk" element={<Cyberpunk />} />
        <Route path="/styles/japanese-minimal" element={<JapaneseMinimal />} />
        <Route path="/styles/vaporwave" element={<Vaporwave />} />
        <Route path="/styles/macbook" element={<Macbook />} />
        <Route path="/styles/steampunk" element={<Steampunk />} />
        <Route path="/styles/swiss-modern" element={<SwissModern />} />
        <Route path="/styles/pixel-art" element={<PixelArt />} />
        <Route path="/styles/soft-ui" element={<SoftUi />} />
        <Route path="/styles/glassmorphism" element={<Glassmorphism />} />
        <Route path="/styles/claymorphism" element={<Claymorphism />} />
        <Route path="/styles/micro-interactions" element={<MicroInteractions />} />
        <Route path="/styles/bento-grid" element={<BentoGrid />} />
        <Route path="/styles/anti-polish" element={<AntiPolish />} />
        <Route path="/styles/spatial-ui" element={<SpatialUi />} />
        <Route path="/styles/ide-terminal" element={<IdeTerminal />} />
        <Route path="/styles/accessible-ethical" element={<AccessibleEthical />} />
        <Route path="/styles/github-profile" element={<GithubProfile />} />
      </Routes>
    </HashRouter>
  )
}

export default App

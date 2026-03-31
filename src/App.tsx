import { HashRouter, Routes, Route } from 'react-router'
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

function App() {
  return (
    <HashRouter>
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
      </Routes>
    </HashRouter>
  )
}

export default App

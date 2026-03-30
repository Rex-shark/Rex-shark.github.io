import { HashRouter, Routes, Route } from 'react-router'
import StyleGallery from '@/pages/StyleGallery'
import MinimalBusiness from '@/pages/styles/MinimalBusiness'
import HandDrawn from '@/pages/styles/HandDrawn'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<StyleGallery />} />
        <Route path="/styles/minimal-business" element={<MinimalBusiness />} />
        <Route path="/styles/hand-drawn" element={<HandDrawn />} />
      </Routes>
    </HashRouter>
  )
}

export default App

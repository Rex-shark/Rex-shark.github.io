import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router'
const Home = lazy(() => import('@/pages/home/Home'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}
// 首頁牌桌直接打包；其他頁面都 lazy 載入，首頁不用下載 23 個風格頁與專案頁
const StyleGallery = lazy(() => import('@/pages/StyleGallery'))
const MinimalBusiness = lazy(() => import('@/pages/styles/MinimalBusiness'))
const HandDrawn = lazy(() => import('@/pages/styles/HandDrawn'))
const Cyberpunk = lazy(() => import('@/pages/styles/Cyberpunk'))
const JapaneseMinimal = lazy(() => import('@/pages/styles/JapaneseMinimal'))
const Vaporwave = lazy(() => import('@/pages/styles/Vaporwave'))
const Macbook = lazy(() => import('@/pages/styles/Macbook'))
const Steampunk = lazy(() => import('@/pages/styles/Steampunk'))
const SwissModern = lazy(() => import('@/pages/styles/SwissModern'))
const PixelArt = lazy(() => import('@/pages/styles/PixelArt'))
const SoftUi = lazy(() => import('@/pages/styles/SoftUi'))
const Glassmorphism = lazy(() => import('@/pages/styles/Glassmorphism'))
const Claymorphism = lazy(() => import('@/pages/styles/Claymorphism'))
const MicroInteractions = lazy(() => import('@/pages/styles/MicroInteractions'))
const BentoGrid = lazy(() => import('@/pages/styles/BentoGrid'))
const AntiPolish = lazy(() => import('@/pages/styles/AntiPolish'))
const SpatialUi = lazy(() => import('@/pages/styles/SpatialUi'))
const IdeTerminal = lazy(() => import('@/pages/styles/IdeTerminal'))
const AccessibleEthical = lazy(() => import('@/pages/styles/AccessibleEthical'))
const GithubProfile = lazy(() => import('@/pages/styles/GithubProfile'))
const AiNative = lazy(() => import('@/pages/styles/AiNative'))
const Editorial = lazy(() => import('@/pages/styles/Editorial'))
const GlassmorphismPink = lazy(() => import('@/pages/styles/GlassmorphismPink'))
const SoftUiPro = lazy(() => import('@/pages/styles/SoftUiPro'))
const Finalist = lazy(() => import('@/pages/styles/Finalist'))
const ThreadsBot = lazy(() => import('@/pages/projects/ThreadsBot'))
const AiChatroom = lazy(() => import('@/pages/projects/AiChatroom'))
const RpgmakerCharacterForge = lazy(() => import('@/pages/projects/RpgmakerCharacterForge'))
const Drama3 = lazy(() => import('@/pages/projects/Drama3'))
const FishingWork = lazy(() => import('@/pages/projects/FishingWork'))
const PokemonAgentPets = lazy(() => import('@/pages/projects/PokemonAgentPets'))
const VrmChatWidget = lazy(() => import('@/pages/projects/VrmChatWidget'))
const CodexForge = lazy(() => import('@/pages/projects/CodexForge'))

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* 經典版：原本的正式首頁（2026-11-17 首頁改為牌桌後轉為備份） */}
        <Route path="/classic" element={<Finalist />} />
        <Route path="/gallery" element={<StyleGallery />} />
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
        <Route path="/styles/ai-native" element={<AiNative />} />
        <Route path="/styles/editorial" element={<Editorial />} />
        <Route path="/styles/glassmorphism-pink" element={<GlassmorphismPink />} />
        <Route path="/styles/soft-ui-pro" element={<SoftUiPro />} />
        <Route path="/styles/finalist" element={<Finalist />} />
        <Route path="/projects/threads-bot" element={<ThreadsBot />} />
        <Route path="/projects/ai-chatroom" element={<AiChatroom />} />
        <Route path="/projects/rpgmaker-character-forge" element={<RpgmakerCharacterForge />} />
        <Route path="/projects/drama-3" element={<Drama3 />} />
        <Route path="/projects/fishing-work" element={<FishingWork />} />
        <Route path="/projects/pokemon-agent-pets" element={<PokemonAgentPets />} />
        <Route path="/projects/vrm-chat-widget" element={<VrmChatWidget />} />
        <Route path="/projects/codex-forge" element={<CodexForge />} />
      </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App

import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import StyleCard from '@/components/gallery/StyleCard'

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

/* 簡約商務預覽 */
function MinimalPreview() {
  return (
    <div className="w-full h-full bg-[#FAFAFA] flex flex-col items-center justify-center gap-3 px-8">
      <div className="w-10 h-10 rounded-full bg-[#18181B]" />
      <div className="w-32 h-2.5 rounded-full bg-[#18181B]" />
      <div className="w-24 h-2 rounded-full bg-[#3F3F46]/40" />
      <div className="flex gap-2 mt-1">
        <div className="w-16 h-6 rounded bg-[#2563EB]" />
        <div className="w-16 h-6 rounded border border-[#18181B]/20" />
      </div>
    </div>
  )
}

/* 手繪風格預覽 */
function HandDrawnPreview() {
  return (
    <div className="w-full h-full bg-[#FAFAF8] flex items-center justify-center relative overflow-hidden">
      {/* 紙張紋理模擬 */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 24px,
            #C4A77D33 24px,
            #C4A77D33 25px
          )`,
        }}
      />
      <div className="relative flex flex-col items-center gap-3">
        {/* 手繪圓圈頭像 */}
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <circle
            cx="22" cy="22" r="19"
            stroke="#1A1A1A" strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="4 2"
          />
          <circle cx="22" cy="18" r="7" stroke="#1A1A1A" strokeWidth="2" fill="#C4A77D44" />
          <path d="M9 38 Q22 30 35 38" stroke="#1A1A1A" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
        {/* 手寫風文字線條 */}
        <div className="flex flex-col gap-1.5 items-center">
          <div
            className="h-3 rounded-sm bg-[#1A1A1A]"
            style={{ width: '7rem', transform: 'rotate(-1deg)' }}
          />
          <div
            className="h-2 rounded-sm bg-[#4A4A4A]/50"
            style={{ width: '5rem', transform: 'rotate(0.5deg)' }}
          />
        </div>
        {/* 手繪按鈕 */}
        <div
          className="px-4 py-1.5 border-2 border-[#1A1A1A] rounded"
          style={{ transform: 'rotate(-1.5deg)', background: '#C4A77D33' }}
        >
          <div className="w-12 h-2 bg-[#1A1A1A] rounded-sm" />
        </div>
      </div>
    </div>
  )
}

/* 賽博龐克預覽 */
function CyberpunkPreview() {
  return (
    <div className="w-full h-full bg-[#0D0D0D] flex flex-col items-center justify-center gap-3 relative overflow-hidden">
      {/* 掃描線 */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)`,
        }}
      />
      {/* HUD 頭像 */}
      <div className="relative">
        <div
          className="w-10 h-10 bg-[#0D0D0D] border border-[#00FFFF]/40"
          style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)' }}
        />
        <div className="absolute -top-px -left-px w-2 h-px bg-[#00FFFF]" />
        <div className="absolute -top-px -left-px w-px h-2 bg-[#00FFFF]" />
      </div>
      {/* 霓虹文字 */}
      <div
        className="w-20 h-2.5 rounded-sm"
        style={{ background: '#00FFFF', boxShadow: '0 0 8px #00FFFF60' }}
      />
      <div
        className="w-14 h-1.5 rounded-sm"
        style={{ background: '#FF00FF', boxShadow: '0 0 6px #FF00FF40', opacity: 0.7 }}
      />
      {/* 按鈕 */}
      <div className="flex gap-2 mt-1">
        <div className="w-14 h-5 border border-[#00FF00]/50" style={{ background: '#00FF0010' }} />
        <div className="w-14 h-5 border border-[#FF00FF]/50" style={{ background: '#FF00FF10' }} />
      </div>
    </div>
  )
}

/* 極簡日式預覽 */
function JapaneseMinimalPreview() {
  return (
    <div className="w-full h-full bg-[#F5F1EB] flex flex-col items-center justify-center gap-3 relative overflow-hidden">
      {/* 圓相 */}
      <svg width="50" height="50" viewBox="0 0 100 100" fill="none" className="opacity-15">
        <path
          d="M50 10 C75 10 90 30 90 50 C90 72 72 90 52 90 C32 90 12 75 10 55 C8 35 25 12 48 10"
          stroke="#8B7355" strokeWidth="2.5" strokeLinecap="round"
        />
      </svg>
      {/* 文字線條 */}
      <div className="w-20 h-2 bg-[#2C2C2C] rounded-sm" />
      <div className="w-14 h-1.5 bg-[#8B7355]/40 rounded-sm" />
      {/* 按鈕 */}
      <div className="flex gap-2 mt-1">
        <div className="w-14 h-5 border border-[#2C2C2C] rounded-sm" />
        <div className="w-14 h-5 bg-[#2C2C2C] rounded-sm" />
      </div>
    </div>
  )
}

/* 瑞士現代主義預覽 */
function SwissModernPreview() {
  return (
    <div className="w-full h-full bg-[#FFFFFF] flex flex-col relative overflow-hidden">
      {/* 左側紅色邊欄 */}
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-[#FF0000]" />
      {/* 頂部粗線 */}
      <div className="absolute top-0 left-4 right-0 h-1 bg-[#000000]" />
      {/* 內容區 */}
      <div className="ml-6 mt-4 flex flex-col gap-3 flex-1 justify-center pr-4">
        {/* 超大標題 */}
        <div className="w-20 h-8 bg-[#000000]" style={{ borderRadius: 0 }} />
        {/* 紅色強調線 */}
        <div className="flex items-center gap-1">
          <div className="w-4 h-1 bg-[#FF0000]" />
          <div className="w-12 h-px bg-[#000000]/20" />
        </div>
        {/* 文字行 */}
        <div className="w-24 h-1.5 bg-[#333333]/60" style={{ borderRadius: 0 }} />
        <div className="w-16 h-1.5 bg-[#333333]/30" style={{ borderRadius: 0 }} />
        {/* 按鈕行：黑色矩形 */}
        <div className="flex gap-2 mt-2">
          <div className="w-14 h-5 bg-[#000000]" style={{ borderRadius: 0 }} />
          <div className="w-14 h-5 border-2 border-[#000000]" style={{ borderRadius: 0 }} />
        </div>
      </div>
      {/* 右下角幾何裝飾 */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-1">
        <div className="w-4 h-4 bg-[#FF0000]" />
        <div className="w-4 h-4 border-2 border-[#000000]" />
        <div className="w-4 h-4 bg-[#000000]" />
      </div>
      {/* 底部粗線 */}
      <div className="absolute bottom-0 left-4 right-0 h-1 bg-[#000000]" />
    </div>
  )
}

/* 蒸汽龐克預覽 */
function SteampunkPreview() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-3 relative overflow-hidden"
      style={{ background: '#1A0E08' }}
    >
      {/* 皮革紋路背景 */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 8px,
            rgba(139,90,43,1) 8px,
            rgba(139,90,43,1) 9px
          )`,
        }}
      />
      {/* 齒輪 SVG */}
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className="opacity-80">
        <polygon
          points="22,2 24.5,8 30,6 29,12 35,14 31,19 36,23 31,27 35,32 29,34 30,40 24.5,38 22,44 19.5,38 14,40 15,34 9,32 13,27 8,23 13,19 9,14 15,12 14,6 19.5,8"
          fill="#B87333"
          stroke="#8B5A2B"
          strokeWidth="1"
          opacity="0.8"
        />
        <circle cx="22" cy="23" r="7" fill="#8B5A2B" opacity="0.8" />
        <circle cx="22" cy="23" r="3" fill="#1A0E08" />
      </svg>
      {/* 文字線條 */}
      <div
        className="w-20 h-2.5"
        style={{ background: 'linear-gradient(90deg, #8B5A2B, #DAA520, #8B5A2B)', boxShadow: '0 0 6px rgba(218,165,32,0.4)' }}
      />
      <div className="w-14 h-1.5" style={{ background: '#8B5A2B', opacity: 0.6 }} />
      {/* 銅色按鈕 */}
      <div className="flex gap-2 mt-1">
        <div
          className="w-16 h-5 border"
          style={{ borderColor: '#8B5A2B', background: 'linear-gradient(135deg, #8B5A2B55, #B8733355)' }}
        />
        <div className="w-16 h-5 border" style={{ borderColor: '#8B5A2B50' }} />
      </div>
    </div>
  )
}

/* 蘋果風格預覽 */
function MacbookPreview() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-3 px-6 relative overflow-hidden"
      style={{ background: '#F2F2F7' }}
    >
      {/* 毛玻璃視窗卡片 */}
      <div
        className="w-full max-w-[160px] overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(12px)',
          borderRadius: '12px',
          border: '0.5px solid rgba(0,0,0,0.12)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        }}
      >
        {/* 視窗標題列 */}
        <div
          className="flex items-center gap-1 px-3 h-6"
          style={{ background: 'rgba(246,246,246,0.9)', borderBottom: '0.5px solid rgba(0,0,0,0.1)' }}
        >
          <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
          <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
          <div className="w-2 h-2 rounded-full bg-[#28C840]" />
        </div>
        {/* 內容模擬 */}
        <div className="px-3 py-3 flex flex-col gap-2">
          <div className="w-8 h-8 rounded-full bg-[#0071E3]/20 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-[#0071E3]" />
          </div>
          <div className="h-2 rounded-full bg-[#1C1C1E]" style={{ width: '70%' }} />
          <div className="h-1.5 rounded-full bg-[#8E8E93]/40" style={{ width: '50%' }} />
          <div className="flex gap-1.5 mt-1">
            <div className="h-5 rounded-full bg-[#0071E3] flex-1" />
            <div
              className="h-5 rounded-full flex-1"
              style={{ border: '0.5px solid rgba(0,0,0,0.18)', background: 'rgba(255,255,255,0.8)' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* 蒸氣波預覽 */
function VaporwavePreview() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-3 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #1A1A2E 0%, #2D1B69 50%, #FF71CE 100%)' }}
    >
      {/* 透視網格 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 opacity-20"
        style={{
          background: 'linear-gradient(rgba(255,113,206,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,113,206,0.5) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          transform: 'perspective(200px) rotateX(60deg)',
          transformOrigin: 'center top',
        }}
      />
      {/* 太陽 */}
      <div
        className="w-10 h-10 rounded-full"
        style={{ background: 'linear-gradient(180deg, #FF71CE, #FFD700)', boxShadow: '0 0 15px #FF71CE60' }}
      />
      {/* 文字 */}
      <div className="w-20 h-2.5 rounded-sm" style={{ background: '#01CDFE', boxShadow: '0 0 6px #01CDFE60' }} />
      <div className="w-14 h-1.5 rounded-sm bg-[#B967FF]/70" />
      {/* 按鈕 */}
      <div className="flex gap-2 mt-1">
        <div className="w-14 h-5 border border-[#FF71CE]/60 rounded" style={{ background: '#FF71CE15' }} />
        <div className="w-14 h-5 border border-[#01CDFE]/60 rounded" style={{ background: '#01CDFE15' }} />
      </div>
    </div>
  )
}

/* 像素藝術預覽 */
function PixelArtPreview() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 relative overflow-hidden" style={{ background: '#0D0D1A' }}>
      {/* 頂部彩虹像素條 */}
      <div className="absolute top-0 left-0 right-0 h-2 flex">
        {['#FF0000','#39FF14','#00BFFF','#FFD700','#FF0000','#39FF14','#00BFFF','#FFD700'].map((c, i) => (
          <div key={i} className="flex-1" style={{ background: c }} />
        ))}
      </div>
      {/* 像素螢幕框 */}
      <div className="relative" style={{ border: '2px solid #39FF14', boxShadow: '0 0 8px #39FF1440', padding: '4px' }}>
        <div className="w-10 h-10 bg-[#0D0D1A]" />
        {/* 像素角落裝飾 */}
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#39FF14]" />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#39FF14]" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#39FF14]" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#39FF14]" />
      </div>
      {/* 點陣文字模擬 */}
      <div className="w-20 h-2.5" style={{ background: '#39FF14', boxShadow: '0 0 6px #39FF1450', imageRendering: 'pixelated' }} />
      <div className="w-14 h-1.5" style={{ background: '#C8D8E8', opacity: 0.5 }} />
      {/* 像素按鈕 */}
      <div className="flex gap-2 mt-1">
        <div className="w-14 h-5 border-2 border-[#39FF14]" style={{ background: '#39FF1415' }} />
        <div className="w-14 h-5 border-2 border-[#00BFFF]" style={{ background: '#00BFFF15' }} />
      </div>
    </div>
  )
}

/* 柔和UI預覽 */
function SoftUiPreview() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-6" style={{ background: '#E8ECF0' }}>
      {/* Neumorphism 凸起頭像 */}
      <div
        className="w-12 h-12 rounded-full"
        style={{
          background: '#E8ECF0',
          boxShadow: '4px 4px 8px #c5c9ce, -4px -4px 8px #ffffff',
        }}
      />
      {/* 凸起文字區 */}
      <div
        className="w-24 h-2.5 rounded-full"
        style={{ background: '#E8ECF0', boxShadow: '2px 2px 4px #c5c9ce, -2px -2px 4px #ffffff' }}
      />
      <div
        className="w-16 h-2 rounded-full"
        style={{ background: '#E8ECF0', boxShadow: '2px 2px 4px #c5c9ce, -2px -2px 4px #ffffff' }}
      />
      {/* 凹陷按鈕 */}
      <div className="flex gap-2 mt-1">
        <div
          className="w-14 h-5 rounded-lg"
          style={{ background: '#7C9FD4', boxShadow: '2px 2px 4px #c5c9ce, -2px -2px 4px #ffffff' }}
        />
        <div
          className="w-14 h-5 rounded-lg"
          style={{ background: '#E8ECF0', boxShadow: 'inset 2px 2px 4px #c5c9ce, inset -2px -2px 4px #ffffff' }}
        />
      </div>
    </div>
  )
}

const styles = [
  {
    title: '簡約商務',
    subtitle: 'Minimal Business',
    description: '乾淨俐落的黑白配色，大量留白，彰顯專業感。適合展示技術能力與專案成果。',
    to: '/styles/minimal-business',
    accentColor: '#2563EB',
    bgColor: '#FFFFFF',
    textColor: '#09090B',
    preview: <MinimalPreview />,
  },
  {
    title: '手繪插圖',
    subtitle: 'Hand Drawn',
    description: '米白底色搭配手繪線條，溫暖有個性。讓人留下深刻的第一印象。',
    to: '/styles/hand-drawn',
    accentColor: '#B5651D',
    bgColor: '#FDF8F2',
    textColor: '#1A1A1A',
    preview: <HandDrawnPreview />,
  },
  {
    title: '賽博龐克',
    subtitle: 'Cyberpunk',
    description: '深黑底色搭配霓虹光暈，終端機美學與 HUD 介面。科幻感十足。',
    to: '/styles/cyberpunk',
    accentColor: '#00FFFF',
    bgColor: '#0D0D0D',
    textColor: '#E0E0E0',
    preview: <CyberpunkPreview />,
  },
  {
    title: '極簡日式',
    subtitle: 'Japanese Minimal',
    description: '侘寂美學，大量留白與自然色調。圓相裝飾、極致簡約的禪風設計。',
    to: '/styles/japanese-minimal',
    accentColor: '#8B7355',
    bgColor: '#F5F1EB',
    textColor: '#2C2C2C',
    preview: <JapaneseMinimalPreview />,
  },
  {
    title: '蒸氣波',
    subtitle: 'Vaporwave',
    description: '80-90 年代復古懷舊，粉紫漸層落日、透視網格與霓虹光暈。',
    to: '/styles/vaporwave',
    accentColor: '#FF71CE',
    bgColor: '#1A1A2E',
    textColor: '#E0D7FF',
    preview: <VaporwavePreview />,
  },
  {
    title: '蘋果風格',
    subtitle: 'macOS Design',
    description: '仿 Apple 設計語言，毛玻璃質感、精緻圓角與大量留白。極致簡約而不失細節。',
    to: '/styles/macbook',
    accentColor: '#0071E3',
    bgColor: '#F2F2F7',
    textColor: '#1C1C1E',
    preview: <MacbookPreview />,
  },
  {
    title: '蒸汽龐克',
    subtitle: 'Steampunk',
    description: '維多利亞工業美學，銅製齒輪、皮革質感與蒸汽機械。時間的歷史感與精密機械之美。',
    to: '/styles/steampunk',
    accentColor: '#B87333',
    bgColor: '#2C1810',
    textColor: '#E8D5A3',
    preview: <SteampunkPreview />,
  },
  {
    title: '瑞士現代主義',
    subtitle: 'Swiss Modern',
    description: '嚴謹網格、Helvetica 排版美學。黑白紅三色，大膽字型層級，幾何圖形裝飾，文字即設計。',
    to: '/styles/swiss-modern',
    accentColor: '#FF0000',
    bgColor: '#FFFFFF',
    textColor: '#000000',
    preview: <SwissModernPreview />,
  },
  {
    title: '像素藝術',
    subtitle: 'Pixel Art',
    description: '8-bit 復古電玩美學，像素點陣字型搭配 CRT 掃描線，重現懷舊 chiptune 氛圍。',
    to: '/styles/pixel-art',
    accentColor: '#39FF14',
    bgColor: '#0D0D1A',
    textColor: '#C8D8E8',
    preview: <PixelArtPreview />,
  },
  {
    title: '柔和UI進化版',
    subtitle: 'Soft UI / Neumorphism',
    description: '如同實體按鈕的柔和凸起凹陷效果，粉彩色系搭配極簡設計語言。',
    to: '/styles/soft-ui',
    accentColor: '#7C9FD4',
    bgColor: '#E8ECF0',
    textColor: '#4A5568',
    preview: <SoftUiPreview />,
  },
]

export default function StyleGallery() {
  return (
    <div className="min-h-screen bg-[#F4F4F5] flex flex-col">
      {/* 頁首 */}
      <motion.header
        className="pt-16 pb-10 text-center px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-400 mb-3">
          Rex · 個人網站
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-3">
          選擇你喜歡的風格
        </h1>
        <p className="text-zinc-500 text-base max-w-md mx-auto">
          點擊卡片預覽不同設計風格，找到最適合的方向
        </p>
      </motion.header>

      {/* 卡片列表 */}
      <main className="flex-1 px-6 pb-16">
        <motion.div
          className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {styles.map((style) => (
            <motion.div key={style.to} variants={cardVariants}>
              <StyleCard {...style} />
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* 頁尾 */}
      <motion.footer
        className="text-center py-8 text-xs text-zinc-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Rex · rexrex10050@gmail.com
      </motion.footer>
    </div>
  )
}

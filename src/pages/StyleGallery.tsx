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

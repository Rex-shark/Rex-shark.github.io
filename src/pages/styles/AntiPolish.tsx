import { Link } from 'react-router'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Mail } from 'lucide-react'
import { handleHashClick } from '@/lib/utils'
import {
  profile,
  skillGroups as sharedSkillGroups,
  allSkills,
  projects as sharedProjects,
  type SkillGroupKey,
} from '@/data/profile'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

/* ── 噪點 SVG 濾鏡 ── */
function NoiseSvgFilter() {
  return (
    <svg className="absolute w-0 h-0" aria-hidden="true">
      <defs>
        <filter id="noise-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feBlend in="SourceGraphic" mode="multiply" />
        </filter>
      </defs>
    </svg>
  )
}

/* ── 划痕裝飾 ── */
function ScratchLines() {
  return (
    <svg
      className="pointer-events-none fixed inset-0 w-full h-full opacity-[0.04] z-0"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1440 900"
    >
      <line x1="120" y1="0" x2="100" y2="900" stroke="white" strokeWidth="1" />
      <line x1="380" y1="0" x2="360" y2="900" stroke="white" strokeWidth="0.5" />
      <line x1="700" y1="0" x2="690" y2="900" stroke="white" strokeWidth="1.5" />
      <line x1="950" y1="0" x2="970" y2="900" stroke="white" strokeWidth="0.5" />
      <line x1="1200" y1="0" x2="1180" y2="900" stroke="white" strokeWidth="1" />
      <line x1="1400" y1="0" x2="1420" y2="900" stroke="white" strokeWidth="0.8" />
      <line x1="0" y1="200" x2="1440" y2="210" stroke="white" strokeWidth="0.5" />
      <line x1="0" y1="550" x2="1440" y2="540" stroke="white" strokeWidth="0.8" />
      <line x1="0" y1="750" x2="1440" y2="760" stroke="white" strokeWidth="0.3" />
    </svg>
  )
}

/* ── 膠帶裝飾 ── */
function TapeStrip({ color = '#F5F500', style }: { color?: string; style?: React.CSSProperties }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        background: color,
        opacity: 0.7,
        mixBlendMode: 'multiply',
        ...style,
      }}
    />
  )
}

/* ── 手寫感標籤 ── */
function ZineTag({ children, rotate = 0, color = '#F5F500' }: { children: React.ReactNode; rotate?: number; color?: string }) {
  return (
    <span
      style={{
        display: 'inline-block',
        background: color,
        color: '#000',
        fontFamily: "'Courier Prime', monospace",
        fontWeight: 700,
        fontSize: '0.7rem',
        padding: '2px 6px',
        transform: `rotate(${rotate}deg)`,
        border: '2px solid #000',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        lineHeight: 1.4,
      }}
    >
      {children}
    </span>
  )
}

const rawEntrance: Variants = {
  hidden: { opacity: 0, y: 30, skewY: 2 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: 'easeOut' as const },
  }),
}

/* ─── 資料（內容來自 src/data/profile.ts，這裡只補上本頁的配色、旋轉角度等裝飾） ─── */
const SKILL_GROUP_DECOR: Record<SkillGroupKey, { accent: string; rotate: string; tapeLeft: string }> = {
  backend: { accent: '#FF2200', rotate: '-1deg', tapeLeft: '18%' },
  frontend: { accent: '#F5F500', rotate: '0.8deg', tapeLeft: '62%' },
  data: { accent: '#FF2200', rotate: '-0.6deg', tapeLeft: '40%' },
  ai: { accent: '#F5F500', rotate: '0.3deg', tapeLeft: '12%' },
  design: { accent: '#FF2200', rotate: '1deg', tapeLeft: '55%' },
}

const skillGroups = sharedSkillGroups.map((g) => ({ ...g, ...SKILL_GROUP_DECOR[g.key] }))

/* 技能貼紙的旋轉角度（純裝飾，依 index 循環） */
const STICKER_ROTATE = [-2, 1.5, -1, 2, 0, -1.5]

/* 由 profile 推導的主題化文字 */
const ROLE_TAGS = profile.titleEn.split(' & ')
const MARQUEE_TEXT = sharedSkillGroups.map((g) => g.labelEn.toUpperCase()).join(' ★ ')

const PROJECT_DECOR = [
  { rotate: '-2deg', accent: '#F5F500' },
  { rotate: '1.5deg', accent: '#FF2200' },
  { rotate: '-1deg', accent: '#F5F500' },
  { rotate: '1deg', accent: '#FF2200' },
  { rotate: '-1.2deg', accent: '#F5F500' },
]

const projects = sharedProjects.map((p, i) => ({
  ...p,
  ...PROJECT_DECOR[i % PROJECT_DECOR.length],
  num: String(i + 1).padStart(3, '0'),
}))

/* 5 張卡：lg 為 3 + 2（6 欄格線），md 為 2 + 2 + 1（最後一張橫跨） */
function projectSpan(i: number, total: number) {
  const lg = i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'
  const md = i === total - 1 && total % 2 === 1 ? 'md:col-span-2' : ''
  return `${md} ${lg}`
}

/* ── 技能貼紙（純標籤，不帶任何熟練度） ── */
function SkillSticker({ label, index, accent }: { label: string; index: number; accent: string }) {
  const variant = index % 3
  const palette =
    variant === 0
      ? { background: accent, color: '#000', border: '2px solid #000' }
      : variant === 1
        ? { background: 'transparent', color: '#F0F0F0', border: '2px solid #F0F0F0' }
        : { background: '#F0F0F0', color: '#000', border: '2px solid #000' }
  return (
    <span
      style={{
        ...palette,
        display: 'inline-block',
        maxWidth: '100%',
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.82rem',
        fontWeight: 700,
        letterSpacing: '0.03em',
        lineHeight: 1.35,
        padding: '5px 10px',
        overflowWrap: 'anywhere',
        transform: `rotate(${STICKER_ROTATE[index % STICKER_ROTATE.length]}deg)`,
        boxShadow: variant === 1 ? 'none' : `3px 3px 0 ${variant === 0 ? '#F0F0F0' : accent}`,
      }}
    >
      {label}
    </span>
  )
}

/* ── 主元件 ── */
export default function AntiPolish() {
  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{
        background: '#0D0D0D',
        color: '#F0F0F0',
        fontFamily: "'Space Mono', monospace",
      }}
    >
      {/* 載入字型 */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Anton&display=swap"
      />

      {/* 噪點濾鏡定義 */}
      <NoiseSvgFilter />

      {/* 划痕背景 */}
      <ScratchLines />

      {/* 噪點覆蓋層 */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.12]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
        aria-hidden="true"
      />

      {/* 格線背景 */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(#F5F500 1px, transparent 1px),
            linear-gradient(90deg, #F5F500 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* ── 導覽列 ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: '#000',
          borderBottom: '3px solid #F5F500',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-between">
          <Link
            to="/gallery"
            className="flex items-center gap-1.5 cursor-pointer"
            style={{
              fontFamily: "'Courier Prime', monospace",
              fontSize: '0.8rem',
              color: '#F5F500',
              textDecoration: 'none',
              fontWeight: 700,
              letterSpacing: '0.05em',
            }}
          >
            <ArrowLeft size={14} />
            [返回設計實驗室]
          </Link>
          <div
            className="hidden sm:flex items-center"
            style={{ gap: '0', borderLeft: '2px solid #F5F500' }}
          >
            {[
              { label: 'WHO', href: '#about' },
              { label: 'SKILLS', href: '#skills' },
              { label: 'WORK', href: '#projects' },
              { label: 'CONTACT', href: '#contact' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={handleHashClick}
                className="cursor-pointer"
                style={{
                  display: 'block',
                  padding: '0 12px',
                  height: '48px',
                  lineHeight: '48px',
                  fontFamily: "'Courier Prime', monospace",
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: '#F0F0F0',
                  borderRight: '2px solid #F5F500',
                  textDecoration: 'none',
                  transition: 'background 0ms, color 0ms',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = '#F5F500'
                  ;(e.currentTarget as HTMLAnchorElement).style.color = '#000'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
                  ;(e.currentTarget as HTMLAnchorElement).style.color = '#F0F0F0'
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-12">

        {/* ── HERO ── */}
        <section id="about" className="relative min-h-screen flex items-center" style={{ borderBottom: '4px solid #F5F500' }}>

          {/* 大背景文字 ANTI */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
            aria-hidden="true"
          >
            <span
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 'clamp(120px, 22vw, 280px)',
                color: 'transparent',
                WebkitTextStroke: '2px #F5F500',
                opacity: 0.06,
                letterSpacing: '-0.02em',
                lineHeight: 1,
                userSelect: 'none',
              }}
            >
              ANTI
            </span>
          </div>

          <div className="max-w-6xl mx-auto px-4 py-20 w-full relative">
            {/* 頂部標籤列 */}
            <div className="flex flex-wrap gap-2 mb-8">
              <ZineTag rotate={-2}>ISSUE #001</ZineTag>
              {ROLE_TAGS.map((role, i) => (
                <ZineTag key={role} rotate={i % 2 === 0 ? 1 : -1} color={i % 2 === 0 ? '#FF2200' : '#F5F500'}>
                  {role}
                </ZineTag>
              ))}
              <ZineTag rotate={2} color="#FF2200">{profile.location}</ZineTag>
            </div>

            <div className="flex flex-col lg:flex-row items-start gap-12">
              {/* 照片區 */}
              <motion.div
                className="relative flex-shrink-0"
                initial={{ opacity: 0, x: -40, rotate: -5 }}
                animate={{ opacity: 1, x: 0, rotate: -3 }}
                transition={{ duration: 0.5, ease: 'easeOut' as const }}
              >
                {/* 膠帶效果 */}
                <TapeStrip
                  color="#F5F500"
                  style={{
                    width: '64px',
                    height: '20px',
                    position: 'absolute',
                    top: '-8px',
                    left: '50%',
                    transform: 'translateX(-50%) rotate(-1deg)',
                    zIndex: 10,
                  }}
                />
                <div
                  style={{
                    width: '200px',
                    height: '200px',
                    border: '4px solid #F0F0F0',
                    outline: '2px solid #FF2200',
                    outlineOffset: '4px',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <img src={profile.avatar} alt={profile.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.1) brightness(0.95)' }} />
                  {/* 覆蓋噪點 */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.08\'/%3E%3C/svg%3E")',
                      opacity: 0.5,
                      mixBlendMode: 'overlay',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
                {/* 角落數字 */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-16px',
                    right: '-8px',
                    fontFamily: "'Courier Prime', monospace",
                    fontSize: '0.65rem',
                    color: '#F5F500',
                    letterSpacing: '0.1em',
                    background: '#000',
                    padding: '2px 4px',
                    border: '1px solid #F5F500',
                  }}
                >
                  FIG. 01
                </div>
              </motion.div>

              {/* 文字區 */}
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15, ease: 'easeOut' as const }}
              >
                {/* 名字主標題 */}
                <div className="relative mb-4" style={{ overflow: 'visible' }}>
                  <h1
                    style={{
                      fontFamily: "'Anton', sans-serif",
                      fontSize: 'clamp(72px, 14vw, 140px)',
                      lineHeight: 0.9,
                      letterSpacing: '-0.02em',
                      color: '#F0F0F0',
                      margin: 0,
                    }}
                  >
                    {profile.name.toUpperCase()}
                  </h1>
                  {/* 螢光黃底色貼在部份文字後 */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      left: 0,
                      height: '12px',
                      width: '60%',
                      background: '#F5F500',
                      zIndex: -1,
                      opacity: 0.9,
                    }}
                    aria-hidden="true"
                  />
                </div>

                {/* 職稱 */}
                <div
                  style={{
                    fontFamily: "'Courier Prime', monospace",
                    fontSize: '1rem',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#FF2200',
                    marginBottom: '16px',
                    borderLeft: '4px solid #FF2200',
                    paddingLeft: '12px',
                  }}
                >
                  {profile.title}
                </div>

                {/* 簡介框 */}
                <div
                  style={{
                    border: '2px solid #F0F0F0',
                    padding: '16px',
                    marginBottom: '24px',
                    maxWidth: '520px',
                    position: 'relative',
                    background: 'rgba(245,245,0,0.03)',
                  }}
                >
                  {/* 角標 */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '-1px',
                      left: '-1px',
                      width: '12px',
                      height: '12px',
                      borderTop: '3px solid #F5F500',
                      borderLeft: '3px solid #F5F500',
                    }}
                    aria-hidden="true"
                  />
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-1px',
                      right: '-1px',
                      width: '12px',
                      height: '12px',
                      borderBottom: '3px solid #F5F500',
                      borderRight: '3px solid #F5F500',
                    }}
                    aria-hidden="true"
                  />
                  {profile.intro.map((line, i) => (
                    <p
                      key={line}
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '0.85rem',
                        lineHeight: 1.7,
                        color: '#B0B0B0',
                        marginTop: i === 0 ? 0 : '10px',
                      }}
                    >
                      {line}
                    </p>
                  ))}
                </div>

                {/* CTA 按鈕 */}
                <div className="flex flex-wrap gap-3">
                  <motion.a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-2 cursor-pointer"
                    style={{
                      background: '#F5F500',
                      color: '#000',
                      fontFamily: "'Courier Prime', monospace",
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '10px 20px',
                      border: '2px solid #000',
                      textDecoration: 'none',
                      boxShadow: '4px 4px 0 #FF2200',
                    }}
                    whileHover={{ x: 2, y: 2, boxShadow: '2px 2px 0 #FF2200' }}
                    whileTap={{ x: 4, y: 4, boxShadow: '0px 0px 0 #FF2200' }}
                  >
                    <Mail size={14} />
                    聯絡我
                  </motion.a>
                  <motion.a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 cursor-pointer"
                    style={{
                      background: 'transparent',
                      color: '#F0F0F0',
                      fontFamily: "'Courier Prime', monospace",
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '10px 20px',
                      border: '2px solid #F0F0F0',
                      textDecoration: 'none',
                      boxShadow: '4px 4px 0 #F5F500',
                    }}
                    whileHover={{ x: 2, y: 2, boxShadow: '2px 2px 0 #F5F500' }}
                    whileTap={{ x: 4, y: 4, boxShadow: '0px 0px 0 #F5F500' }}
                  >
                    <GithubIcon className="w-4 h-4" />
                    GitHub
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* 底部裝飾標語 */}
          <div
            className="absolute bottom-0 left-0 right-0 overflow-hidden"
            style={{ borderTop: '2px solid #F5F500', height: '28px', background: '#F5F500' }}
            aria-hidden="true"
          >
            <div
              style={{
                display: 'flex',
                gap: '32px',
                fontFamily: "'Courier Prime', monospace",
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: '#000',
                lineHeight: '28px',
                whiteSpace: 'nowrap',
                paddingLeft: '16px',
              }}
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i}>{MARQUEE_TEXT} ★</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── 技能區塊 ── */}
        <section id="skills" className="relative" style={{ borderBottom: '4px solid #FF2200' }}>
          <div className="max-w-6xl mx-auto px-4 py-20">

            {/* 區塊標題 */}
            <motion.div
              className="mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={rawEntrance}
              custom={0}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '16px',
                  borderBottom: '4px solid #F5F500',
                  paddingBottom: '8px',
                  marginBottom: '4px',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Courier Prime', monospace",
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: '#F5F500',
                  }}
                >
                  §02
                </span>
                <h2
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: 'clamp(36px, 6vw, 64px)',
                    lineHeight: 1,
                    letterSpacing: '-0.01em',
                    color: '#F0F0F0',
                    margin: 0,
                    transform: 'skewX(-2deg)',
                    display: 'inline-block',
                  }}
                >
                  SKILLS
                </h2>
                <span
                  style={{
                    fontFamily: "'Courier Prime', monospace",
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#FF2200',
                    letterSpacing: '0.1em',
                    marginLeft: 'auto',
                    alignSelf: 'center',
                  }}
                >
                  {allSkills.length} ITEMS LISTED
                </span>
              </div>
            </motion.div>

            {/* 技能分組：膠帶貼紙式純標籤；AI 組項目多，橫跨兩欄 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row-dense gap-x-8 gap-y-12">
              {skillGroups.map((group, gi) => (
                <motion.div
                  key={group.key}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={rawEntrance}
                  custom={gi}
                  className={`relative ${group.key === 'ai' ? 'md:col-span-2' : ''}`}
                  style={{
                    rotate: group.rotate,
                    border: `3px solid ${group.accent}`,
                    background: '#111',
                    padding: '28px 20px 22px',
                    boxShadow: `6px 6px 0 ${group.accent}`,
                  }}
                >
                  {/* 膠帶 */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      top: '-11px',
                      left: group.tapeLeft,
                      width: '72px',
                      height: '20px',
                      background: group.accent === '#F5F500' ? '#FF2200' : '#F5F500',
                      opacity: 0.85,
                      transform: `rotate(${gi % 2 === 0 ? -3 : 2}deg)`,
                    }}
                  />

                  {/* 分組標題 */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      flexWrap: 'wrap',
                      gap: '4px 10px',
                      borderBottom: '2px dashed #333',
                      paddingBottom: '10px',
                      marginBottom: '16px',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "'Anton', sans-serif",
                        fontSize: '1.6rem',
                        lineHeight: 1,
                        letterSpacing: '0.02em',
                        color: group.accent,
                        margin: 0,
                        textTransform: 'uppercase',
                      }}
                    >
                      {group.labelEn}
                    </h3>
                    <span
                      style={{
                        fontFamily: "'Courier Prime', monospace",
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        color: '#888',
                      }}
                    >
                      / {group.label}
                    </span>
                  </div>

                  {/* 技能貼紙 */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 10px' }}>
                    {group.skills.map((skill, i) => (
                      <SkillSticker key={skill} label={skill} index={i} accent={group.accent} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 專案區塊 ── */}
        <section id="projects" className="relative" style={{ borderBottom: '4px solid #F5F500' }}>
          <div className="max-w-6xl mx-auto px-4 py-20">

            {/* 區塊標題 */}
            <motion.div
              className="mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={rawEntrance}
              custom={0}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '16px',
                  borderBottom: '4px solid #FF2200',
                  paddingBottom: '8px',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Courier Prime', monospace",
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: '#FF2200',
                  }}
                >
                  §03
                </span>
                <h2
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: 'clamp(36px, 6vw, 64px)',
                    lineHeight: 1,
                    letterSpacing: '-0.01em',
                    color: '#F0F0F0',
                    margin: 0,
                  }}
                >
                  WORK
                </h2>
              </div>
            </motion.div>

            {/* 專案卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-6 gap-y-12">
              {projects.map((project, i) => (
                <motion.div
                  key={project.slug}
                  className={`relative ${projectSpan(i, projects.length)}`}
                  style={{
                    rotate: project.rotate,
                    border: `3px solid ${project.accent}`,
                    background: '#111',
                    boxShadow: `6px 6px 0 ${project.accent}`,
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={rawEntrance}
                  custom={i}
                  whileHover={{
                    x: 3,
                    y: 3,
                    boxShadow: `3px 3px 0 ${project.accent}`,
                  }}
                  whileTap={{
                    x: 6,
                    y: 6,
                    boxShadow: `0px 0px 0 ${project.accent}`,
                  }}
                >
                  {/* 號碼標 */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      top: '-16px',
                      left: '12px',
                      fontFamily: "'Courier Prime', monospace",
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      background: project.accent,
                      color: '#000',
                      padding: '2px 8px',
                      border: '2px solid #000',
                    }}
                  >
                    {project.num}
                  </div>

                  {/* GitHub repo 連結（放在 Link 之外，避免巢狀連結） */}
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} GitHub repo`}
                    className="cursor-pointer"
                    style={{
                      position: 'absolute',
                      top: '-16px',
                      right: '12px',
                      zIndex: 2,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontFamily: "'Courier Prime', monospace",
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      background: '#000',
                      color: project.accent,
                      padding: '2px 8px',
                      border: `2px solid ${project.accent}`,
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = project.accent
                      e.currentTarget.style.color = '#000'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#000'
                      e.currentTarget.style.color = project.accent
                    }}
                  >
                    <GithubIcon className="w-3 h-3" />
                    REPO
                  </a>

                  {/* 整張卡連到站內頁 */}
                  <Link
                    to={project.to}
                    className="flex flex-col h-full cursor-pointer"
                    style={{ padding: '24px 20px 20px', textDecoration: 'none' }}
                  >
                    <h3
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        letterSpacing: '0.03em',
                        color: '#F0F0F0',
                        marginBottom: '10px',
                        lineHeight: 1.3,
                        overflowWrap: 'anywhere',
                      }}
                    >
                      {project.title}
                    </h3>

                    <p
                      style={{
                        fontFamily: "'Courier Prime', monospace",
                        fontSize: '0.8rem',
                        lineHeight: 1.65,
                        color: '#888',
                        marginBottom: '14px',
                      }}
                    >
                      {project.desc}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontFamily: "'Courier Prime', monospace",
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: '#000',
                            background: project.accent,
                            padding: '2px 6px',
                            border: '1px solid #000',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        marginTop: '16px',
                        fontFamily: "'Courier Prime', monospace",
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        color: project.accent,
                      }}
                    >
                      READ MORE
                      <ArrowUpRight size={12} />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 聯絡區塊 ── */}
        <section id="contact" className="relative" style={{ borderBottom: '4px solid #F0F0F0' }}>
          <div className="max-w-6xl mx-auto px-4 py-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={rawEntrance}
              custom={0}
            >
              {/* 標題 */}
              <div
                style={{
                  borderBottom: '4px solid #F5F500',
                  paddingBottom: '8px',
                  marginBottom: '40px',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '16px',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Courier Prime', monospace",
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: '#F5F500',
                  }}
                >
                  §04
                </span>
                <h2
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: 'clamp(36px, 6vw, 64px)',
                    lineHeight: 1,
                    letterSpacing: '-0.01em',
                    color: '#F0F0F0',
                    margin: 0,
                  }}
                >
                  CONTACT
                </h2>
              </div>

              {/* 內容 */}
              <div className="flex flex-col md:flex-row gap-12 items-start">
                {/* 左側文字 */}
                <div className="flex-1">
                  <p
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.85rem',
                      lineHeight: 1.8,
                      color: '#888',
                      maxWidth: '420px',
                      marginBottom: '24px',
                    }}
                  >
                    合作提案、技術交流、或只是說聲好。
                    <br />
                    直接寄信，不繞彎子。
                  </p>

                  <motion.a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-3 cursor-pointer"
                    style={{
                      fontFamily: "'Courier Prime', monospace",
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      letterSpacing: '0.05em',
                      color: '#000',
                      background: '#F5F500',
                      padding: '12px 24px',
                      border: '2px solid #000',
                      textDecoration: 'none',
                      boxShadow: '5px 5px 0 #FF2200',
                      display: 'inline-flex',
                    }}
                    whileHover={{ x: 3, y: 3, boxShadow: '2px 2px 0 #FF2200' }}
                    whileTap={{ x: 5, y: 5, boxShadow: '0px 0px 0 #FF2200' }}
                  >
                    <Mail size={16} />
                    {profile.email}
                  </motion.a>
                </div>

                {/* 右側資訊欄 */}
                <div
                  style={{
                    border: '2px solid #333',
                    padding: '20px',
                    minWidth: '220px',
                    background: 'rgba(245,245,0,0.03)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Courier Prime', monospace",
                      fontSize: '0.65rem',
                      letterSpacing: '0.2em',
                      color: '#F5F500',
                      fontWeight: 700,
                      borderBottom: '1px solid #333',
                      paddingBottom: '8px',
                      marginBottom: '12px',
                    }}
                  >
                    CONTACT INFO
                  </div>
                  {[
                    { label: 'EMAIL', value: profile.email },
                    { label: 'GITHUB', value: profile.githubHandle },
                    { label: 'LOCATION', value: profile.location },
                  ].map((row) => (
                    <div key={row.label} style={{ marginBottom: '8px' }}>
                      <div
                        style={{
                          fontFamily: "'Courier Prime', monospace",
                          fontSize: '0.6rem',
                          letterSpacing: '0.15em',
                          color: '#555',
                          fontWeight: 700,
                        }}
                      >
                        {row.label}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: '0.75rem',
                          color: row.label === 'LOCATION' ? '#F5F500' : '#B0B0B0',
                          wordBreak: 'break-all',
                        }}
                      >
                        {row.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer
        style={{
          background: '#000',
          borderTop: '3px solid #F5F500',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
          }}
        >
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
            style={{
              color: '#F5F500',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: "'Courier Prime', monospace",
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textDecoration: 'none',
            }}
          >
            <GithubIcon className="w-4 h-4" />
            {profile.githubHandle}
          </a>
          <span style={{ color: '#333' }}>|</span>
          <span
            style={{
              fontFamily: "'Courier Prime', monospace",
              fontSize: '0.7rem',
              color: '#555',
              letterSpacing: '0.08em',
            }}
          >
            BUILT WITH REACT + VITE
          </span>
        </div>
        <div
          style={{
            fontFamily: "'Courier Prime', monospace",
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            color: '#333',
          }}
        >
          © {new Date().getFullYear()} {profile.name.toUpperCase()} ━ NO RULES NO POLISH
        </div>
      </footer>
    </div>
  )
}

import { Link } from 'react-router'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowLeft, Mail, ExternalLink } from 'lucide-react'

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

const skills = [
  { name: 'Java', level: 'EXPERT', bar: 92, color: '#FF2200' },
  { name: 'Spring Boot', level: 'EXPERT', bar: 88, color: '#F5F500' },
  { name: 'Spring Security', level: 'ADVANCED', bar: 80, color: '#FF2200' },
  { name: 'JPA/Hibernate', level: 'ADVANCED', bar: 78, color: '#F5F500' },
  { name: 'React', level: 'SOLID', bar: 75, color: '#FF2200' },
  { name: 'TypeScript', level: 'SOLID', bar: 73, color: '#F5F500' },
  { name: 'Tailwind CSS', level: 'SOLID', bar: 70, color: '#FF2200' },
  { name: 'PostgreSQL', level: 'SOLID', bar: 72, color: '#F5F500' },
  { name: 'Docker', level: 'WORKING', bar: 65, color: '#FF2200' },
  { name: 'GitHub Actions', level: 'WORKING', bar: 60, color: '#F5F500' },
  { name: '系統分析設計', level: 'EXPERT', bar: 85, color: '#FF2200' },
]

const projects = [
  {
    title: '個人網站',
    desc: 'React + Vite 建構的 GitHub Pages 作品集，探索多種 UI 設計風格。',
    tags: ['React', 'TypeScript', 'Tailwind'],
    href: 'https://github.com/Rex-shark',
    rotate: '-2deg',
    offsetX: 0,
    accent: '#F5F500',
    num: '001',
  },
  {
    title: 'Spring Boot API 範例',
    desc: '完整的 RESTful API，含 JWT 認證、RBAC 權限控管與 OpenAPI 文件。',
    tags: ['Java', 'Spring Boot', 'JWT'],
    href: 'https://github.com/Rex-shark',
    rotate: '1.5deg',
    offsetX: 0,
    accent: '#FF2200',
    num: '002',
  },
  {
    title: '系統分析設計教學',
    desc: 'UML、需求分析到系統設計的完整教學系列，含實戰案例解析。',
    tags: ['系統分析', 'UML', '教學'],
    href: 'https://github.com/Rex-shark',
    rotate: '-1deg',
    offsetX: 0,
    accent: '#F5F500',
    num: '003',
  },
]

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
            to="/"
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
            [返回風格選擇]
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
              <ZineTag rotate={1} color="#FF2200">JAVA DEV</ZineTag>
              <ZineTag rotate={-1}>FULL STACK</ZineTag>
              <ZineTag rotate={2} color="#FF2200">SYSTEM ANALYST</ZineTag>
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
                  <img src="/me.png" alt="Rex" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.1) brightness(0.95)' }} />
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
                    REX
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
                  Java 全端工程師 &amp; 系統分析師
                </div>

                {/* 簡介框 */}
                <div
                  style={{
                    border: '2px solid #F0F0F0',
                    padding: '16px',
                    marginBottom: '24px',
                    maxWidth: '480px',
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
                  <p
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.85rem',
                      lineHeight: 1.7,
                      color: '#B0B0B0',
                    }}
                  >
                    熱衷設計穩健的後端架構，持續分享 Java、Spring Boot 與系統設計的實戰經驗。
                    不寫廢話，只做有用的東西。
                  </p>
                </div>

                {/* CTA 按鈕 */}
                <div className="flex flex-wrap gap-3">
                  <motion.a
                    href="mailto:rexrex10050@gmail.com"
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
                    href="https://github.com/Rex-shark"
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
                <span key={i}>JAVA ★ SPRING ★ REACT ★ SYSTEM DESIGN</span>
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
                  {skills.length} ITEMS LISTED
                </span>
              </div>
            </motion.div>

            {/* 技能列表 */}
            <div className="space-y-3">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={rawEntrance}
                  custom={i}
                  className="relative"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 80px 200px',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 12px',
                    borderLeft: `4px solid ${skill.color}`,
                    background: 'rgba(255,255,255,0.02)',
                  }}
                >
                  {/* 技能名稱 */}
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      color: '#F0F0F0',
                    }}
                  >
                    {skill.name}
                  </span>
                  {/* 等級標籤 */}
                  <span
                    style={{
                      fontFamily: "'Courier Prime', monospace",
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      color: skill.color,
                      border: `1px solid ${skill.color}`,
                      padding: '2px 6px',
                      textAlign: 'center',
                      background: 'transparent',
                    }}
                  >
                    {skill.level}
                  </span>
                  {/* 進度條 */}
                  <div
                    style={{
                      height: '10px',
                      background: '#1A1A1A',
                      border: '1px solid #333',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <motion.div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        height: '100%',
                        background: skill.color,
                      }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.bar}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.04, ease: 'easeOut' as const }}
                    />
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((project, i) => (
                <motion.a
                  key={project.title}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative cursor-pointer"
                  style={{
                    border: `3px solid ${project.accent}`,
                    padding: '20px',
                    background: '#111',
                    textDecoration: 'none',
                    transform: `rotate(${project.rotate})`,
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

                  {/* 外部連結圖示 */}
                  <ExternalLink
                    size={12}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      color: project.accent,
                      opacity: 0.5,
                    }}
                  />

                  <h3
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      letterSpacing: '0.03em',
                      color: '#F0F0F0',
                      marginBottom: '10px',
                      lineHeight: 1.3,
                    }}
                  >
                    {project.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "'Courier Prime', monospace",
                      fontSize: '0.8rem',
                      lineHeight: 1.6,
                      color: '#888',
                      marginBottom: '14px',
                    }}
                  >
                    {project.desc}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
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
                </motion.a>
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
                    href="mailto:rexrex10050@gmail.com"
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
                    rexrex10050@gmail.com
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
                    { label: 'EMAIL', value: 'rexrex10050@gmail.com' },
                    { label: 'GITHUB', value: 'Rex-shark' },
                    { label: 'STATUS', value: 'OPEN TO WORK' },
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
                          color: row.label === 'STATUS' ? '#F5F500' : '#B0B0B0',
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
            href="https://github.com/Rex-shark"
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
            Rex-shark
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
          © 2025 REX ━ NO RULES NO POLISH
        </div>
      </footer>
    </div>
  )
}

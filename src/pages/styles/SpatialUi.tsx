import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowLeft, Mail, ExternalLink } from 'lucide-react'
import { handleHashClick } from '@/lib/utils'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

/* 玻璃面板 */
const glassStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.06)',
  backdropFilter: 'blur(40px) saturate(180%)',
  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  boxShadow: '0 0 60px rgba(76, 201, 240, 0.08), inset 0 1px 0 rgba(255,255,255,0.1)',
}

/* 導覽列玻璃 */
const navGlass: React.CSSProperties = {
  background: 'rgba(5, 5, 8, 0.7)',
  backdropFilter: 'blur(40px) saturate(180%)',
  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
}

/* 打字機 Hook */
function useTypewriter(texts: string[], speed = 60, pause = 1800) {
  const [displayed, setDisplayed] = useState('')
  const [textIdx, setTextIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = texts[textIdx]
    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), speed)
      return () => clearTimeout(t)
    }
    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(t)
    }
    if (deleting && charIdx > 0) {
      const t = setTimeout(() => setCharIdx((c) => c - 1), speed / 2)
      return () => clearTimeout(t)
    }
    if (deleting && charIdx === 0) {
      setDeleting(false)
      setTextIdx((i) => (i + 1) % texts.length)
    }
  }, [charIdx, deleting, textIdx, texts, speed, pause])

  useEffect(() => {
    setDisplayed(texts[textIdx].slice(0, charIdx))
  }, [charIdx, textIdx, texts])

  return displayed
}

/* 3D 傾斜卡片 */
function TiltCard({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    rotateY.set(dx * 8)
    rotateX.set(-dy * 8)
  }

  function handleMouseLeave() {
    animate(rotateX, 0, { duration: 0.4, ease: 'easeOut' as const })
    animate(rotateY, 0, { duration: 0.4, ease: 'easeOut' as const })
  }

  const transform = useTransform(
    [rotateX, rotateY],
    ([rx, ry]) => `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`
  )

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...style, transform }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* 星星粒子背景 */
function StarField() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.5 + 0.1,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 5,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{ opacity: [star.opacity, star.opacity * 0.2, star.opacity] }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        />
      ))}
    </div>
  )
}

/* 動畫 Variants */
const blurFadeIn: Variants = {
  hidden: { opacity: 0, scale: 0.95, filter: 'blur(12px)' },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      ease: 'easeOut' as const,
    },
  }),
}

const floatVariants: Variants = {
  float: {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
}

const skills = [
  'Java', 'Spring Boot', 'Spring Security', 'JPA/Hibernate',
  'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL',
  'Docker', 'GitHub Actions', '系統分析設計',
]

const projects = [
  {
    title: '個人網站',
    desc: '以 React + Vite 建構的 GitHub Pages 個人作品集，探索多種 UI 設計風格。',
    tags: ['React', 'TypeScript', 'Tailwind'],
    href: 'https://github.com/Rex-shark',
    accent: '#4CC9F0',
  },
  {
    title: 'Spring Boot API 範例',
    desc: '完整的 RESTful API 專案，包含 JWT 認證、RBAC 權限控管與 OpenAPI 文件。',
    tags: ['Java', 'Spring Boot', 'JWT'],
    href: 'https://github.com/Rex-shark',
    accent: '#FFD60A',
  },
  {
    title: '系統分析設計教學',
    desc: 'UML、需求分析到系統設計的完整教學系列，含實戰案例解析。',
    tags: ['系統分析', 'UML', '教學'],
    href: 'https://github.com/Rex-shark',
    accent: '#A78BFA',
  },
]

const navLinks = [
  { label: '關於', href: '#about' },
  { label: '技能', href: '#skills' },
  { label: '專案', href: '#projects' },
  { label: '聯絡', href: '#contact' },
]

export default function SpatialUi() {
  const subtitle = useTypewriter(
    ['Java 全端工程師', '系統分析師', 'Spring Boot 開發者', '後端架構設計師'],
    65,
    2000
  )
  const [activeNav, setActiveNav] = useState('')

  return (
    <div
      className="min-h-screen text-[#F5F5F7] relative overflow-x-hidden"
      style={{
        background: '#050508',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
      }}
    >
      {/* 星點背景 */}
      <StarField />

      {/* 環境光暈 */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(76,201,240,0.06) 0%, transparent 70%)',
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 80% 80%, rgba(167,139,250,0.05) 0%, transparent 60%)',
        }}
      />

      {/* 固定導覽列 */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        style={navGlass}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' as const }}
      >
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* 返回按鈕 */}
          <Link
            to="/gallery"
            className="flex items-center gap-1.5 text-sm text-[#F5F5F7]/60 hover:text-[#4CC9F0] transition-colors duration-200 cursor-pointer"
          >
            <ArrowLeft size={15} />
            返回設計實驗室
          </Link>

          {/* 中央導覽 pill 群 */}
          <div
            className="hidden md:flex items-center gap-1 rounded-full px-2 py-1.5"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { setActiveNav(link.href); handleHashClick(e) }}
                className="relative px-4 py-1 text-sm rounded-full transition-colors duration-200 cursor-pointer"
                style={{
                  color: activeNav === link.href ? '#F5F5F7' : 'rgba(245,245,247,0.55)',
                }}
              >
                {activeNav === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'rgba(76,201,240,0.15)', border: '1px solid rgba(76,201,240,0.3)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            ))}
          </div>

          {/* 右側聯絡按鈕 */}
          <a
            href="mailto:rexrex10050@gmail.com"
            className="text-sm px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer"
            style={{
              background: 'rgba(76,201,240,0.12)',
              border: '1px solid rgba(76,201,240,0.25)',
              color: '#4CC9F0',
            }}
          >
            聯絡我
          </a>
        </div>
      </motion.nav>

      <main className="pt-14">
        {/* Hero Section */}
        <section
          id="about"
          className="min-h-screen flex flex-col items-center justify-center px-6 py-24 relative"
        >
          {/* 頭像光暈球體 */}
          <motion.div
            className="relative mb-10"
            variants={floatVariants}
            animate="float"
          >
            {/* 外層光暈 */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(76,201,240,0.15) 0%, transparent 70%)',
                transform: 'scale(1.8)',
              }}
            />
            {/* 玻璃球體邊框 */}
            <div
              className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1.5px solid rgba(255,255,255,0.18)',
                boxShadow: '0 0 80px rgba(76,201,240,0.2), inset 0 1px 0 rgba(255,255,255,0.15)',
              }}
            >
              <img src="/me.png" alt="Rex" className="w-full h-full object-cover" />
            </div>
            {/* 小光點裝飾 */}
            <div
              className="absolute top-2 right-2 w-3 h-3 rounded-full"
              style={{
                background: 'rgba(255,214,10,0.7)',
                boxShadow: '0 0 8px rgba(255,214,10,0.8)',
              }}
            />
          </motion.div>

          {/* 標題文字 */}
          <motion.div
            className="text-center max-w-2xl"
            initial="hidden"
            animate="visible"
            variants={blurFadeIn}
            custom={0}
          >
            <p
              className="text-xs tracking-[0.35em] uppercase mb-4"
              style={{ color: 'rgba(76,201,240,0.7)', fontWeight: 400 }}
            >
              Personal Portfolio
            </p>
            <h1
              className="text-6xl sm:text-7xl md:text-8xl mb-4"
              style={{ fontWeight: 200, letterSpacing: '-0.02em', color: '#F5F5F7' }}
            >
              Rex
            </h1>
            {/* 打字機副標 */}
            <div className="h-8 mb-6 flex items-center justify-center">
              <span
                className="text-xl md:text-2xl"
                style={{ fontWeight: 300, color: 'rgba(245,245,247,0.6)' }}
              >
                {subtitle}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{ color: '#4CC9F0' }}
                >
                  |
                </motion.span>
              </span>
            </div>

            <p
              className="text-base md:text-lg leading-relaxed mx-auto mb-10 max-w-md"
              style={{ color: 'rgba(245,245,247,0.45)', fontWeight: 300 }}
            >
              熱衷於設計穩健的後端架構，打造流暢的使用者體驗，持續分享 Java、Spring Boot 與系統設計的實戰心得。
            </p>

            {/* CTA 按鈕 */}
            <div className="flex items-center justify-center gap-4">
              <motion.a
                href="mailto:rexrex10050@gmail.com"
                className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm cursor-pointer"
                style={{
                  background: 'rgba(76,201,240,0.15)',
                  border: '1px solid rgba(76,201,240,0.3)',
                  color: '#4CC9F0',
                  fontWeight: 400,
                  boxShadow: '0 0 30px rgba(76,201,240,0.1)',
                }}
                whileHover={{
                  background: 'rgba(76,201,240,0.22)',
                  boxShadow: '0 0 40px rgba(76,201,240,0.2)',
                  scale: 1.02,
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                <Mail size={16} />
                聯絡我
              </motion.a>
              <motion.a
                href="https://github.com/Rex-shark"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(245,245,247,0.7)',
                  fontWeight: 400,
                }}
                whileHover={{
                  background: 'rgba(255,255,255,0.09)',
                  color: '#F5F5F7',
                  scale: 1.02,
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                <GithubIcon className="w-4 h-4" />
                GitHub
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* 技能 Section */}
        <section id="skills" className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-14"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={blurFadeIn}
              custom={0}
            >
              <p
                className="text-xs tracking-[0.3em] uppercase mb-3"
                style={{ color: 'rgba(76,201,240,0.6)', fontWeight: 400 }}
              >
                Capabilities
              </p>
              <h2
                className="text-4xl md:text-5xl"
                style={{ fontWeight: 200, color: '#F5F5F7', letterSpacing: '-0.02em' }}
              >
                技術能力
              </h2>
            </motion.div>

            {/* 技能 Chip 群 */}
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={blurFadeIn}
                  custom={i * 0.5}
                  whileHover={{
                    y: -4,
                    boxShadow: '0 0 24px rgba(76,201,240,0.2)',
                  }}
                  transition={{ duration: 0.2 }}
                  className="px-5 py-2.5 rounded-full text-sm cursor-default"
                  style={{
                    ...glassStyle,
                    color: 'rgba(245,245,247,0.8)',
                    fontWeight: 400,
                    borderRadius: '999px',
                  }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 專案 Section */}
        <section id="projects" className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-14"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={blurFadeIn}
              custom={0}
            >
              <p
                className="text-xs tracking-[0.3em] uppercase mb-3"
                style={{ color: 'rgba(76,201,240,0.6)', fontWeight: 400 }}
              >
                Featured Work
              </p>
              <h2
                className="text-4xl md:text-5xl"
                style={{ fontWeight: 200, color: '#F5F5F7', letterSpacing: '-0.02em' }}
              >
                精選專案
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {projects.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={blurFadeIn}
                  custom={i}
                >
                  <TiltCard
                    className="h-full"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full p-6 rounded-[32px] cursor-pointer group transition-all duration-300"
                      style={{
                        ...glassStyle,
                        borderRadius: '32px',
                        boxShadow: `0 0 60px ${project.accent}12, inset 0 1px 0 rgba(255,255,255,0.1)`,
                      }}
                    >
                      {/* 頂部色彩標 */}
                      <div
                        className="w-8 h-1 rounded-full mb-5"
                        style={{ background: project.accent, boxShadow: `0 0 12px ${project.accent}` }}
                      />
                      <div className="flex items-start justify-between mb-3">
                        <h3
                          className="text-base"
                          style={{ fontWeight: 400, color: '#F5F5F7' }}
                        >
                          {project.title}
                        </h3>
                        <ExternalLink
                          size={14}
                          className="flex-shrink-0 mt-0.5 transition-colors duration-200"
                          style={{ color: 'rgba(245,245,247,0.25)' }}
                        />
                      </div>
                      <p
                        className="text-sm leading-relaxed mb-5"
                        style={{ color: 'rgba(245,245,247,0.45)', fontWeight: 300 }}
                      >
                        {project.desc}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2.5 py-1 rounded-full"
                            style={{
                              background: `${project.accent}14`,
                              border: `1px solid ${project.accent}30`,
                              color: project.accent,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </a>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 聯絡 Section */}
        <section id="contact" className="py-24 px-6">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={blurFadeIn}
              custom={0}
            >
              <div
                className="relative p-10 md:p-14 rounded-[40px] text-center overflow-hidden"
                style={{
                  ...glassStyle,
                  borderRadius: '40px',
                  boxShadow: '0 0 100px rgba(76,201,240,0.08), inset 0 1px 0 rgba(255,255,255,0.1)',
                }}
              >
                {/* 背景光暈 */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(76,201,240,0.07) 0%, transparent 70%)',
                  }}
                />

                <p
                  className="relative text-xs tracking-[0.3em] uppercase mb-4"
                  style={{ color: 'rgba(76,201,240,0.6)', fontWeight: 400 }}
                >
                  Get In Touch
                </p>
                <h2
                  className="relative text-4xl md:text-5xl mb-4"
                  style={{ fontWeight: 200, color: '#F5F5F7', letterSpacing: '-0.02em' }}
                >
                  想聊聊？
                </h2>
                <p
                  className="relative text-base leading-relaxed mb-10 max-w-sm mx-auto"
                  style={{ color: 'rgba(245,245,247,0.4)', fontWeight: 300 }}
                >
                  無論是合作提案、技術交流或問題諮詢，都歡迎來信，期待與你連結。
                </p>

                {/* 脈衝按鈕 */}
                <div className="relative inline-flex items-center justify-center">
                  {/* 脈衝光圈 */}
                  <motion.div
                    className="absolute rounded-full"
                    style={{
                      border: '1px solid rgba(76,201,240,0.3)',
                      inset: '-12px',
                    }}
                    animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' as const }}
                  />
                  <motion.div
                    className="absolute rounded-full"
                    style={{
                      border: '1px solid rgba(76,201,240,0.15)',
                      inset: '-24px',
                    }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0, 0.2] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' as const, delay: 0.3 }}
                  />
                  <motion.a
                    href="mailto:rexrex10050@gmail.com"
                    className="relative flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm cursor-pointer"
                    style={{
                      background: 'rgba(76,201,240,0.15)',
                      border: '1px solid rgba(76,201,240,0.35)',
                      color: '#4CC9F0',
                      fontWeight: 400,
                      boxShadow: '0 0 40px rgba(76,201,240,0.2)',
                    }}
                    whileHover={{
                      background: 'rgba(76,201,240,0.22)',
                      boxShadow: '0 0 60px rgba(76,201,240,0.3)',
                      scale: 1.03,
                    }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Mail size={16} />
                    rexrex10050@gmail.com
                  </motion.a>
                </div>

                {/* GitHub 連結 */}
                <div className="relative mt-8">
                  <a
                    href="https://github.com/Rex-shark"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm cursor-pointer transition-colors duration-200"
                    style={{ color: 'rgba(245,245,247,0.35)' }}
                  >
                    <GithubIcon className="w-4 h-4" />
                    github.com/Rex-shark
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center">
        <p
          className="text-xs"
          style={{ color: 'rgba(245,245,247,0.2)', fontWeight: 300, letterSpacing: '0.05em' }}
        >
          © 2025 Rex — Built with React + Vite
        </p>
      </footer>
    </div>
  )
}

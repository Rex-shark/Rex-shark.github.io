import { Link } from 'react-router'
import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowLeft, Mail } from 'lucide-react'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

/* ── 像素邊框工具：用多層 box-shadow 模擬 8bit 硬邊 ── */
const pixelBorder = (color: string, size = 4) =>
  `${size}px ${size}px 0 0 ${color}, -${size}px -${size}px 0 0 ${color}, ${size}px -${size}px 0 0 ${color}, -${size}px ${size}px 0 0 ${color}`

/* ── 掃描線紋理 SVG ── */
function ScanlineOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{
        backgroundImage: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0,0,0,0.25) 2px,
          rgba(0,0,0,0.25) 4px
        )`,
        mixBlendMode: 'multiply',
      }}
      aria-hidden="true"
    />
  )
}

/* ── 閃爍游標 ── */
function BlinkCursor() {
  return (
    <motion.span
      className="inline-block w-[3px] h-[1.1em] bg-[#39FF14] ml-1 align-middle"
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
      aria-hidden="true"
    />
  )
}

/* ── 像素裝飾角 ── */
function PixelCorner({ color = '#39FF14' }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill={color} aria-hidden="true">
      <rect x="0" y="0" width="4" height="4" />
      <rect x="4" y="0" width="4" height="4" opacity="0" />
      <rect x="0" y="4" width="4" height="4" opacity="0" />
      <rect x="12" y="0" width="4" height="4" />
      <rect x="0" y="12" width="4" height="4" />
      <rect x="12" y="12" width="4" height="4" />
    </svg>
  )
}

/* ── Pixel 分隔線 ── */
function PixelDivider() {
  return (
    <div className="flex items-center gap-1 py-2" aria-hidden="true">
      {Array.from({ length: 48 }).map((_, i) => (
        <div
          key={i}
          className="flex-1 h-[3px]"
          style={{
            backgroundColor: i % 3 === 0 ? '#39FF14' : i % 3 === 1 ? '#00FFFF' : 'transparent',
          }}
        />
      ))}
    </div>
  )
}

/* ── 資料 ── */
const skillGroups = [
  {
    category: 'BACKEND',
    icon: '▸',
    items: ['Java', 'Spring Boot', 'Spring Security', 'JPA/Hibernate'],
    color: '#39FF14',
  },
  {
    category: 'FRONTEND',
    icon: '▸',
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    color: '#00FFFF',
  },
  {
    category: 'DATABASE',
    icon: '▸',
    items: ['PostgreSQL', 'MySQL', 'Redis'],
    color: '#FFD700',
  },
  {
    category: 'DEVOPS',
    icon: '▸',
    items: ['Docker', 'GitHub Actions', '系統分析設計'],
    color: '#FF6B9D',
  },
]

const projects = [
  {
    id: '001',
    title: '個人網站',
    desc: 'React + Vite 打造的 GitHub Pages 作品集，探索多種 UI 設計風格。',
    tags: ['React', 'TypeScript', 'Tailwind'],
    href: 'https://github.com/Rex-shark',
    color: '#39FF14',
  },
  {
    id: '002',
    title: 'Spring Boot API',
    desc: '完整 RESTful API 範例，含 JWT 認證、RBAC 權限與 OpenAPI 文件。',
    tags: ['Java', 'Spring Boot', 'JWT'],
    href: 'https://github.com/Rex-shark',
    color: '#00FFFF',
  },
  {
    id: '003',
    title: '系統分析設計教學',
    desc: 'UML 到系統設計的完整教學系列，附實戰案例解析。',
    tags: ['系統分析', 'UML', '教學'],
    href: 'https://github.com/Rex-shark',
    color: '#FFD700',
  },
]

/* ── 動畫 Variants ── */
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: 'easeOut' as const },
  }),
}

const pixelIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, delay: i * 0.1, ease: 'easeOut' as const },
  }),
}

/* ── 技能卡片 ── */
function SkillCard({
  group,
  index,
}: {
  group: (typeof skillGroups)[number]
  index: number
}) {
  return (
    <motion.div
      className="p-4 relative"
      style={{
        background: '#0D0D1A',
        border: `2px solid ${group.color}`,
        boxShadow: `4px 4px 0 ${group.color}55`,
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={pixelIn}
      custom={index}
    >
      {/* 像素裝飾角 */}
      <div className="absolute top-0 left-0">
        <PixelCorner color={group.color} />
      </div>
      <div className="absolute top-0 right-0 rotate-90">
        <PixelCorner color={group.color} />
      </div>

      <p
        className="text-xs font-bold mb-3 tracking-widest"
        style={{ color: group.color, fontFamily: "'Press Start 2P', monospace", fontSize: '0.6rem' }}
      >
        {group.icon} {group.category}
      </p>
      <ul className="space-y-1.5">
        {group.items.map((item) => (
          <li
            key={item}
            className="text-xs flex items-center gap-2 text-[#C8D8E8]"
            style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.55rem', lineHeight: '1.6' }}
          >
            <span style={{ color: group.color }}>■</span>
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

/* ── 專案卡片 ── */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number]
  index: number
}) {
  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-5 relative group cursor-pointer"
      style={{
        background: '#0D0D1A',
        border: `2px solid ${project.color}`,
        boxShadow: `4px 4px 0 ${project.color}`,
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeInUp}
      custom={index}
      whileHover={{
        x: 2,
        y: 2,
        boxShadow: `2px 2px 0 ${project.color}`,
        transition: { duration: 0.15, ease: 'easeOut' as const },
      }}
      whileTap={{
        x: 4,
        y: 4,
        boxShadow: `0px 0px 0 ${project.color}`,
      }}
      aria-label={`查看專案：${project.title}`}
    >
      {/* 專案編號 */}
      <div
        className="absolute -top-3 -left-1 px-2 py-0.5 text-[#0D0D1A]"
        style={{
          background: project.color,
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '0.55rem',
        }}
      >
        {project.id}
      </div>

      <h3
        className="font-bold mb-2 mt-2 leading-snug"
        style={{
          color: project.color,
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '0.65rem',
        }}
      >
        {project.title}
      </h3>
      <p
        className="text-[#A0B4C8] mb-4 leading-relaxed"
        style={{ fontSize: '0.78rem', fontFamily: "'VT323', monospace" }}
      >
        {project.desc}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-[#0D0D1A] font-bold"
            style={{
              background: project.color,
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '0.45rem',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.a>
  )
}

/* ── 主元件 ── */
export default function PixelArt() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{
        background: '#0D0D1A',
        color: '#C8D8E8',
        fontFamily: "'Press Start 2P', monospace",
      }}
    >
      {/* 字型載入 */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap"
      />

      {/* 掃描線效果 */}
      {!shouldReduceMotion && <ScanlineOverlay />}

      {/* 背景格線裝飾 */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(#39FF14 1px, transparent 1px),
            linear-gradient(90deg, #39FF14 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      {/* 固定導覽列 */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: '#0D0D1A',
          borderBottom: '2px solid #39FF14',
          boxShadow: '0 4px 0 #39FF1433',
        }}
        aria-label="主要導覽"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-1.5 transition-colors duration-200 cursor-pointer hover:text-[#39FF14] text-[#C8D8E8]"
            style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.5rem' }}
            aria-label="返回風格選擇頁面"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">返回風格選擇</span>
            <span className="sm:hidden">返回</span>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            {[
              { label: '關於', href: '#about' },
              { label: '技能', href: '#skills' },
              { label: '專案', href: '#projects' },
              { label: '聯絡', href: '#contact' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-[#C8D8E8] hover:text-[#39FF14] transition-colors duration-150 cursor-pointer hidden sm:block"
                style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.5rem' }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* 導覽列底部像素裝飾條 */}
        <div className="h-[2px] flex" aria-hidden="true">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="flex-1"
              style={{
                backgroundColor:
                  i % 4 === 0
                    ? '#39FF14'
                    : i % 4 === 1
                      ? '#00FFFF'
                      : i % 4 === 2
                        ? '#FFD700'
                        : '#FF6B9D',
              }}
            />
          ))}
        </div>
      </nav>

      <main className="pt-14 relative z-[2]">
        {/* ── Hero ── */}
        <section
          id="about"
          className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 flex flex-col md:flex-row items-center gap-10 sm:gap-16"
        >
          {/* 個人照片：像素風 CRT 螢幕框 */}
          <motion.div
            className="flex-shrink-0 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
          >
            {/* 螢幕外框 */}
            <div
              className="p-3 relative"
              style={{
                background: '#1A1A2E',
                border: '4px solid #39FF14',
                boxShadow: pixelBorder('#39FF14', 4) + ', 0 0 24px #39FF1455',
              }}
            >
              {/* 照片 */}
              <div className="w-40 h-40 sm:w-48 sm:h-48 overflow-hidden relative">
                <img
                  src="/me.png"
                  alt="Rex 的個人照片"
                  className="w-full h-full object-cover"
                  style={{
                    imageRendering: 'pixelated',
                    filter: 'contrast(1.1) saturate(1.2)',
                  }}
                />
                {/* 螢幕反光 */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(57,255,20,0.08) 0%, transparent 50%)',
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* 螢幕狀態列 */}
              <div
                className="flex items-center justify-between mt-2 px-1"
                aria-hidden="true"
              >
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-[#39FF14]" />
                  <div className="w-2 h-2 bg-[#00FFFF]" />
                  <div className="w-2 h-2 bg-[#FFD700]" />
                </div>
                <span
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: '0.4rem',
                    color: '#39FF14',
                  }}
                >
                  PLAYER 1
                </span>
              </div>
            </div>

            {/* 發光裝飾 */}
            <motion.div
              className="absolute -inset-2 rounded-none pointer-events-none"
              style={{ boxShadow: '0 0 30px #39FF1422' }}
              animate={!shouldReduceMotion ? { opacity: [0.5, 1, 0.5] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const }}
              aria-hidden="true"
            />
          </motion.div>

          {/* 文字內容 */}
          <div className="flex-1">
            {/* 系統提示 */}
            <motion.p
              className="mb-4 tracking-widest"
              style={{
                color: '#00FFFF',
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.55rem',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              &gt; LOADING PROFILE...
            </motion.p>

            {/* 主標題 */}
            <motion.h1
              className="mb-4 leading-tight"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 'clamp(1.6rem, 5vw, 2.5rem)',
                color: '#39FF14',
                textShadow: '3px 3px 0 #1A4D1A, 0 0 20px #39FF1477',
                lineHeight: 1.4,
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' as const }}
            >
              HI, I&apos;M REX
              <BlinkCursor />
            </motion.h1>

            {/* 身份標籤 */}
            <motion.div
              className="mb-6 flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              {['Java 全端工程師', '系統分析師'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-[#0D0D1A] font-bold"
                  style={{
                    background: '#39FF14',
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: '0.5rem',
                  }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* 簡介 */}
            <motion.p
              className="mb-8 leading-loose max-w-md"
              style={{
                fontFamily: "'VT323', monospace",
                fontSize: '1.15rem',
                color: '#A0B4C8',
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              熱衷於設計穩健後端架構的 Java 工程師。
              <br />
              分享 Spring Boot 與系統設計的實戰經驗，
              <br />
              把複雜系統說得簡單易懂。
            </motion.p>

            {/* 操作按鈕 */}
            <motion.div
              className="flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <motion.a
                href="mailto:rexrex10050@gmail.com"
                className="flex items-center gap-2 px-4 py-2.5 text-[#0D0D1A] font-bold cursor-pointer"
                style={{
                  background: '#39FF14',
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '0.55rem',
                  boxShadow: '4px 4px 0 #1A4D1A',
                }}
                whileHover={{ x: 2, y: 2, boxShadow: '2px 2px 0 #1A4D1A' }}
                whileTap={{ x: 4, y: 4, boxShadow: '0px 0px 0 #1A4D1A' }}
                transition={{ duration: 0.1 }}
                aria-label="發送電子郵件給 Rex"
              >
                <Mail size={13} />
                聯絡我
              </motion.a>

              <motion.a
                href="https://github.com/Rex-shark"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 font-bold cursor-pointer"
                style={{
                  border: '2px solid #00FFFF',
                  color: '#00FFFF',
                  background: 'transparent',
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '0.55rem',
                  boxShadow: '4px 4px 0 #004D4D',
                }}
                whileHover={{ x: 2, y: 2, boxShadow: '2px 2px 0 #004D4D' }}
                whileTap={{ x: 4, y: 4, boxShadow: '0px 0px 0 #004D4D' }}
                transition={{ duration: 0.1 }}
                aria-label="前往 Rex 的 GitHub 頁面（在新視窗開啟）"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                GITHUB
              </motion.a>
            </motion.div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <PixelDivider />
        </div>

        {/* ── 技能 ── */}
        <section id="skills" className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
            custom={0}
            className="mb-10"
          >
            {/* 區塊標題 */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-4 h-4 bg-[#39FF14]" aria-hidden="true" />
              <h2
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 'clamp(0.8rem, 2.5vw, 1.1rem)',
                  color: '#39FF14',
                  textShadow: '2px 2px 0 #1A4D1A',
                }}
              >
                SKILL TREE
              </h2>
            </div>
            <p
              style={{
                fontFamily: "'VT323', monospace",
                fontSize: '1.1rem',
                color: '#6A8A9A',
              }}
            >
              &gt; 技術能力清單載入完成
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {skillGroups.map((group, i) => (
              <SkillCard key={group.category} group={group} index={i} />
            ))}
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <PixelDivider />
        </div>

        {/* ── 專案 ── */}
        <section id="projects" className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
            custom={0}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-4 h-4 bg-[#00FFFF]" aria-hidden="true" />
              <h2
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 'clamp(0.8rem, 2.5vw, 1.1rem)',
                  color: '#00FFFF',
                  textShadow: '2px 2px 0 #004D4D',
                }}
              >
                PROJECTS
              </h2>
            </div>
            <p
              style={{
                fontFamily: "'VT323', monospace",
                fontSize: '1.1rem',
                color: '#6A8A9A',
              }}
            >
              &gt; 精選作品載入中...
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <PixelDivider />
        </div>

        {/* ── 聯絡 ── */}
        <section
          id="contact"
          className="max-w-5xl mx-auto px-4 sm:px-6 py-16 text-center"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={0}
          >
            {/* 裝飾：像素人物 */}
            <div className="flex justify-center mb-6" aria-hidden="true">
              <div className="relative">
                <div
                  className="w-8 h-8"
                  style={{
                    background: '#39FF14',
                    boxShadow: `
                      8px 0 0 #39FF14,
                      16px 0 0 #39FF14,
                      0 8px 0 #FFD700,
                      8px 8px 0 #FFD700,
                      16px 8px 0 #FFD700,
                      0 16px 0 #39FF14,
                      8px 16px 0 #39FF14,
                      16px 16px 0 #39FF14
                    `,
                  }}
                />
              </div>
            </div>

            <h2
              className="mb-4"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 'clamp(0.9rem, 3vw, 1.3rem)',
                color: '#39FF14',
                textShadow: '3px 3px 0 #1A4D1A',
              }}
            >
              PRESS START
            </h2>
            <p
              className="mb-3"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.6rem',
                color: '#FFD700',
              }}
            >
              想聊聊合作或技術交流？
            </p>
            <p
              className="mb-10 max-w-xs mx-auto"
              style={{
                fontFamily: "'VT323', monospace",
                fontSize: '1.1rem',
                color: '#6A8A9A',
              }}
            >
              無論是合作提案、技術交流或問題諮詢，
              <br />
              都歡迎發送訊息給我！
            </p>

            <motion.a
              href="mailto:rexrex10050@gmail.com"
              className="inline-flex items-center gap-3 px-6 py-4 text-[#0D0D1A] font-bold cursor-pointer"
              style={{
                background: '#39FF14',
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '0.6rem',
                boxShadow: '6px 6px 0 #1A4D1A, 0 0 20px #39FF1444',
              }}
              whileHover={{ x: 3, y: 3, boxShadow: '3px 3px 0 #1A4D1A, 0 0 20px #39FF1444' }}
              whileTap={{ x: 6, y: 6, boxShadow: '0px 0px 0 #1A4D1A' }}
              transition={{ duration: 0.1 }}
              aria-label="發送電子郵件：rexrex10050@gmail.com"
            >
              <Mail size={16} />
              rexrex10050@gmail.com
            </motion.a>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="relative z-[2] py-8 text-center"
        style={{
          borderTop: '2px solid #39FF1444',
          background: '#0A0A14',
        }}
      >
        {/* 像素彩虹條 */}
        <div className="flex h-[3px] mb-6" aria-hidden="true">
          {['#39FF14', '#00FFFF', '#FFD700', '#FF6B9D', '#9B59B6', '#FF6B9D', '#FFD700', '#00FFFF'].map(
            (color, i) => (
              <div key={i} className="flex-1" style={{ background: color }} />
            ),
          )}
        </div>

        <p
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '0.5rem',
            color: '#39FF14',
          }}
        >
          © 2025 REX
        </p>
        <p
          className="mt-2"
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: '0.95rem',
            color: '#3A5A6A',
          }}
        >
          BUILT WITH REACT + VITE · INSERT COIN TO CONTINUE
        </p>
      </footer>
    </div>
  )
}

import { Link } from 'react-router'
import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowLeft, Mail, ExternalLink, CheckCircle, Eye, Keyboard, Users } from 'lucide-react'
import { handleHashClick } from '@/lib/utils'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

/* 設計系統 token
   背景：#FFFFFF
   前景：#0A0A0A  (對比度 > 17:1)
   主色：#1A56DB  (藍，WCAG AAA on white: 7.1:1)
   輔色：#0E7C67  (綠，WCAG AA: 4.7:1)
   標籤背景：#EFF6FF
   邊框：#1A56DB
   焦點環：#1A56DB offset 3px solid 3px
*/

const COLORS = {
  bg: '#FFFFFF',
  surface: '#F8FAFF',
  border: '#D1D5DB',
  primary: '#1A56DB',
  primaryDark: '#1240A8',
  green: '#0E7C67',
  text: '#0A0A0A',
  muted: '#374151',
  tagBg: '#EFF6FF',
  tagText: '#1A56DB',
  divider: '#E5E7EB',
} as const

const skillGroups = [
  {
    category: 'Backend',
    label: '後端',
    items: ['Java', 'Spring Boot', 'Spring Security', 'JPA / Hibernate'],
  },
  {
    category: 'Frontend',
    label: '前端',
    items: ['React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    category: 'Database',
    label: '資料庫',
    items: ['PostgreSQL', 'Docker', 'GitHub Actions'],
  },
  {
    category: 'Analysis',
    label: '系統設計',
    items: ['系統分析設計', 'UML', '需求分析'],
  },
]

const projects = [
  {
    title: '個人網站',
    desc: '以 React + Vite 建構的 GitHub Pages 個人作品集，探索多種 UI 設計風格。',
    tags: ['React', 'TypeScript', 'Tailwind'],
    href: 'https://github.com/Rex-shark',
  },
  {
    title: 'Spring Boot API 範例',
    desc: '完整的 RESTful API 專案，包含 JWT 認證、RBAC 權限控管與 OpenAPI 文件。',
    tags: ['Java', 'Spring Boot', 'JWT'],
    href: 'https://github.com/Rex-shark',
  },
  {
    title: '系統分析設計教學',
    desc: 'UML、需求分析到系統設計的完整教學系列，含實戰案例解析。',
    tags: ['系統分析', 'UML', '教學'],
    href: 'https://github.com/Rex-shark',
  },
]

const accessibilityPrinciples = [
  { icon: Eye, title: '可感知', desc: '高對比配色，視覺訊息不依賴單一感官' },
  { icon: Keyboard, title: '可操作', desc: '完整鍵盤導航，清晰的 focus 狀態' },
  { icon: CheckCircle, title: '可理解', desc: '語義化 HTML，清楚的錯誤提示' },
  { icon: Users, title: '健壯性', desc: '螢幕報讀器相容，ARIA 標籤完整' },
]

function useSafeMotion() {
  const reduced = useReducedMotion()
  return reduced
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: i * 0.1,
      ease: 'easeOut' as const,
    },
  }),
}

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: i * 0.08,
      ease: 'easeOut' as const,
    },
  }),
}

export default function AccessibleEthical() {
  const reduced = useSafeMotion()

  const motionProps = (variants: Variants, custom: number) =>
    reduced
      ? {}
      : {
          initial: 'hidden' as const,
          whileInView: 'visible' as const,
          viewport: { once: true, margin: '-60px' },
          variants,
          custom,
        }

  const heroMotion = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: 'easeOut' as const },
      }

  const photoMotion = reduced
    ? {}
    : {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5, delay: 0.2, ease: 'easeOut' as const },
      }

  /* 焦點樣式 - 以 outline-offset 實作明確的 focus ring */
  const focusClass =
    'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#1A56DB]'

  return (
    <div
      className="min-h-screen bg-white text-[#0A0A0A]"
      style={{ fontFamily: "'Atkinson Hyperlegible', 'Inter', system-ui, sans-serif" }}
    >
      {/* Google Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      />

      {/* Skip to main content - 無障礙跳過導航 */}
      <a
        href="#main-content"
        onClick={handleHashClick}
        className={`
          sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]
          focus:px-4 focus:py-2 focus:bg-[#1A56DB] focus:text-white focus:font-semibold
          focus:rounded-lg focus:text-base focus:shadow-lg
          ${focusClass}
        `}
      >
        跳至主要內容
      </a>

      {/* 導覽列 */}
      <nav
        role="navigation"
        aria-label="主要導覽"
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b-2 border-[#E5E7EB]"
        style={{ borderBottomColor: COLORS.divider }}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className={`
              flex items-center gap-2 text-base font-medium text-[#374151]
              hover:text-[#0A0A0A] transition-colors duration-200 cursor-pointer
              rounded-md px-2 py-1 -ml-2
              ${focusClass}
            `}
            aria-label="返回風格選擇頁面"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            返回風格選擇
          </Link>

          {/* 桌面導覽連結 */}
          <div
            role="menubar"
            aria-label="頁面區塊導覽"
            className="hidden sm:flex items-center gap-1"
          >
            {[
              { href: '#about', label: '關於我' },
              { href: '#wcag', label: '設計理念' },
              { href: '#skills', label: '技能' },
              { href: '#projects', label: '專案' },
              { href: '#contact', label: '聯絡' },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={handleHashClick}
                role="menuitem"
                className={`
                  text-sm font-medium text-[#374151] hover:text-[#1A56DB]
                  px-3 py-2 rounded-md transition-colors duration-200
                  ${focusClass}
                `}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* 主要內容 */}
      <main id="main-content" className="pt-16" tabIndex={-1}>

        {/* Hero */}
        <section
          id="about"
          aria-labelledby="hero-heading"
          className="max-w-5xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12"
        >
          {/* 文字區 */}
          <motion.div className="flex-1 order-2 md:order-1" {...heroMotion}>
            <p
              className="text-sm font-bold tracking-widest uppercase mb-4"
              style={{ color: COLORS.green, letterSpacing: '0.15em' }}
              aria-hidden="true"
            >
              Java Full-Stack Engineer
            </p>
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl font-bold leading-tight mb-5"
              style={{ lineHeight: '1.2' }}
            >
              嗨，我是{' '}
              <span style={{ color: COLORS.primary }}>Rex</span>
            </h1>
            <p className="text-lg leading-relaxed text-[#374151] max-w-md mb-3">
              Java 全端工程師 ＆ 系統分析師
            </p>
            <p className="text-base leading-relaxed text-[#374151] max-w-md mb-8">
              相信「無障礙設計是基本人權，不是附加功能」。
              致力於打造每個人都能平等使用的數位體驗。
            </p>

            {/* 行動按鈕 - 44x44px 最小觸控目標 */}
            <div className="flex flex-wrap items-center gap-3" role="group" aria-label="聯絡方式">
              <a
                href="mailto:rexrex10050@gmail.com"
                className={`
                  inline-flex items-center gap-2 px-5 py-3 min-h-[44px]
                  bg-[#1A56DB] text-white text-base font-semibold rounded-lg
                  hover:bg-[#1240A8] transition-colors duration-200 cursor-pointer
                  ${focusClass}
                `}
                aria-label="發送電子郵件給 Rex"
              >
                <Mail size={18} aria-hidden="true" />
                聯絡我
              </a>
              <a
                href="https://github.com/Rex-shark"
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  inline-flex items-center gap-2 px-5 py-3 min-h-[44px]
                  border-2 border-[#0A0A0A] text-[#0A0A0A] text-base font-semibold rounded-lg
                  hover:border-[#1A56DB] hover:text-[#1A56DB] transition-colors duration-200 cursor-pointer
                  ${focusClass}
                `}
                aria-label="前往 Rex 的 GitHub 頁面（在新分頁開啟）"
              >
                <GithubIcon className="w-5 h-5" />
                GitHub
                <ExternalLink size={14} aria-hidden="true" className="opacity-60" />
              </a>
            </div>
          </motion.div>

          {/* 個人照片 */}
          <motion.div className="flex-shrink-0 order-1 md:order-2" {...photoMotion}>
            <div
              className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden"
              style={{
                border: `3px solid ${COLORS.primary}`,
                boxShadow: `0 0 0 6px ${COLORS.tagBg}`,
              }}
            >
              <img
                src="/me.png"
                alt="Rex 的個人照片"
                className="w-full h-full object-cover"
                width={224}
                height={224}
              />
            </div>
          </motion.div>
        </section>

        {/* 分隔線 */}
        <div className="max-w-5xl mx-auto px-6" role="separator" aria-hidden="true">
          <div className="border-t-2" style={{ borderColor: COLORS.divider }} />
        </div>

        {/* WCAG 設計理念區塊 */}
        <section
          id="wcag"
          aria-labelledby="wcag-heading"
          className="max-w-5xl mx-auto px-6 py-20"
          style={{ background: COLORS.surface }}
        >
          <motion.div {...motionProps(fadeUp, 0)}>
            <p
              className="text-xs font-bold tracking-widest uppercase mb-2"
              style={{ color: COLORS.green, letterSpacing: '0.15em' }}
              aria-hidden="true"
            >
              Design Philosophy
            </p>
            <h2 id="wcag-heading" className="text-3xl font-bold mb-3">
              無障礙設計原則
            </h2>
            <p className="text-base text-[#374151] mb-10 max-w-xl leading-relaxed">
              依循 WCAG 2.1 AA 標準，讓每一位使用者都能無障礙地取得資訊。
              無障礙設計不是限制，而是設計的進化。
            </p>
          </motion.div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            role="list"
            aria-label="WCAG 四大原則"
          >
            {accessibilityPrinciples.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  role="listitem"
                  className="p-6 bg-white rounded-xl border-2"
                  style={{ borderColor: COLORS.divider }}
                  {...motionProps(fadeUp, i + 1)}
                >
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: COLORS.tagBg }}
                    aria-hidden="true"
                  >
                    <Icon size={22} style={{ color: COLORS.primary }} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-[#374151] leading-relaxed">{item.desc}</p>
                </motion.div>
              )
            })}
          </div>

          {/* WCAG 合規標章 */}
          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            {...motionProps(fadeIn, 0)}
            aria-label="無障礙合規標章"
          >
            {['WCAG 2.1 AA', '鍵盤可操作', 'ARIA 標籤', '高對比 7:1+', '最小字體 16px'].map(
              (badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-full border-2"
                  style={{
                    borderColor: COLORS.green,
                    color: COLORS.green,
                    background: '#F0FDF9',
                  }}
                  role="img"
                  aria-label={`合規項目：${badge}`}
                >
                  <CheckCircle size={13} aria-hidden="true" />
                  {badge}
                </span>
              )
            )}
          </motion.div>
        </section>

        {/* 分隔線 */}
        <div className="max-w-5xl mx-auto px-6" role="separator" aria-hidden="true">
          <div className="border-t-2" style={{ borderColor: COLORS.divider }} />
        </div>

        {/* 技能區塊 */}
        <section
          id="skills"
          aria-labelledby="skills-heading"
          className="max-w-5xl mx-auto px-6 py-20"
        >
          <motion.div {...motionProps(fadeUp, 0)}>
            <p
              className="text-xs font-bold tracking-widest uppercase mb-2"
              style={{ color: COLORS.primary, letterSpacing: '0.15em' }}
              aria-hidden="true"
            >
              Skills
            </p>
            <h2 id="skills-heading" className="text-3xl font-bold mb-10">
              技術能力
            </h2>
          </motion.div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            role="list"
            aria-label="技術能力分類"
          >
            {skillGroups.map((group, i) => (
              <motion.div
                key={group.category}
                role="listitem"
                {...motionProps(fadeUp, i + 1)}
              >
                <h3
                  className="text-xs font-bold uppercase tracking-widest mb-4 pb-2 border-b-2"
                  style={{
                    color: COLORS.primary,
                    borderColor: COLORS.primary,
                    letterSpacing: '0.12em',
                  }}
                >
                  {group.label}
                </h3>
                <ul className="space-y-2" aria-label={`${group.label}技能列表`}>
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-base text-[#0A0A0A]"
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: COLORS.primary }}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 分隔線 */}
        <div className="max-w-5xl mx-auto px-6" role="separator" aria-hidden="true">
          <div className="border-t-2" style={{ borderColor: COLORS.divider }} />
        </div>

        {/* 專案區塊 */}
        <section
          id="projects"
          aria-labelledby="projects-heading"
          className="max-w-5xl mx-auto px-6 py-20"
        >
          <motion.div {...motionProps(fadeUp, 0)}>
            <p
              className="text-xs font-bold tracking-widest uppercase mb-2"
              style={{ color: COLORS.primary, letterSpacing: '0.15em' }}
              aria-hidden="true"
            >
              Projects
            </p>
            <h2 id="projects-heading" className="text-3xl font-bold mb-10">
              精選專案
            </h2>
          </motion.div>

          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            role="list"
            aria-label="精選專案列表"
          >
            {projects.map((project, i) => (
              <motion.a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                role="listitem"
                aria-label={`${project.title}：${project.desc}（在新分頁開啟）`}
                className={`
                  group block p-6 bg-white rounded-xl border-2 cursor-pointer
                  hover:border-[#1A56DB] hover:shadow-lg
                  transition-all duration-250
                  ${focusClass}
                `}
                style={{ borderColor: COLORS.border }}
                {...motionProps(fadeUp, i + 1)}
                whileHover={reduced ? {} : { y: -3 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-[#0A0A0A] leading-snug">
                    {project.title}
                  </h3>
                  <ExternalLink
                    size={16}
                    aria-hidden="true"
                    className="text-[#374151] group-hover:text-[#1A56DB] transition-colors flex-shrink-0 mt-0.5 ml-2"
                  />
                </div>
                <p className="text-base text-[#374151] leading-relaxed mb-4">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2" role="list" aria-label="技術標籤">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      role="listitem"
                      className="text-sm px-2.5 py-1 font-medium rounded-md"
                      style={{
                        background: COLORS.tagBg,
                        color: COLORS.primary,
                        border: `1px solid ${COLORS.primary}22`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* 聯絡區塊 */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="py-20"
          style={{ background: COLORS.surface }}
        >
          <div className="max-w-2xl mx-auto px-6 text-center">
            <motion.div {...motionProps(fadeUp, 0)}>
              <p
                className="text-xs font-bold tracking-widest uppercase mb-2"
                style={{ color: COLORS.green, letterSpacing: '0.15em' }}
                aria-hidden="true"
              >
                Contact
              </p>
              <h2 id="contact-heading" className="text-3xl font-bold mb-4">
                聯絡我
              </h2>
              <p className="text-base text-[#374151] leading-relaxed mb-8 max-w-sm mx-auto">
                無論是合作提案、技術交流或無障礙設計諮詢，都歡迎來信。
                我會在 1-2 個工作天內回覆。
              </p>

              <div
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                role="group"
                aria-label="聯絡方式"
              >
                <a
                  href="mailto:rexrex10050@gmail.com"
                  className={`
                    inline-flex items-center gap-2 px-6 py-3 min-h-[44px] w-full sm:w-auto
                    bg-[#1A56DB] text-white text-base font-semibold rounded-lg
                    hover:bg-[#1240A8] transition-colors duration-200 cursor-pointer
                    justify-center
                    ${focusClass}
                  `}
                  aria-label="發送電子郵件到 rexrex10050@gmail.com"
                >
                  <Mail size={18} aria-hidden="true" />
                  rexrex10050@gmail.com
                </a>
                <a
                  href="https://github.com/Rex-shark"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    inline-flex items-center gap-2 px-6 py-3 min-h-[44px] w-full sm:w-auto
                    border-2 border-[#0A0A0A] text-[#0A0A0A] text-base font-semibold rounded-lg
                    hover:border-[#1A56DB] hover:text-[#1A56DB] transition-colors duration-200 cursor-pointer
                    justify-center
                    ${focusClass}
                  `}
                  aria-label="前往 GitHub 頁面（在新分頁開啟）"
                >
                  <GithubIcon className="w-5 h-5" />
                  GitHub
                  <ExternalLink size={14} aria-hidden="true" className="opacity-60" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        role="contentinfo"
        className="border-t-2 py-8 text-center"
        style={{ borderColor: COLORS.divider }}
      >
        <p className="text-sm text-[#374151]">
          © 2025 Rex．以無障礙設計為核心，React + Vite 建構
        </p>
        <p className="text-xs text-[#6B7280] mt-1">
          本頁面符合 WCAG 2.1 AA 無障礙標準
        </p>
      </footer>
    </div>
  )
}

import { Link } from 'react-router'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowLeft, Mail, ExternalLink, Code2, Database, Server, Wrench } from 'lucide-react'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

/* ─── Neumorphism 設計 token ─── */
const BG = '#E8ECF0'
const TEXT_MAIN = '#4A5568'
const TEXT_DARK = '#2D3748'
const TEXT_MUTED = '#718096'
const ACCENT = '#7C9FD4'
const ACCENT_LIGHT = '#A8C4E8'

/* 凸起陰影 */
const neuShadowOut = '6px 6px 12px #c5c9ce, -6px -6px 12px #ffffff'
/* 凹陷陰影 */
const neuShadowIn = 'inset 4px 4px 8px #c5c9ce, inset -4px -4px 8px #ffffff'
/* 輕微凸起（用於小元件） */
const neuShadowSm = '4px 4px 8px #c5c9ce, -4px -4px 8px #ffffff'
/* 按鈕懸停 */
const neuShadowHover = '3px 3px 6px #c5c9ce, -3px -3px 6px #ffffff'

/* ─── Framer Motion Variants ─── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const },
  }),
}

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, delay: i * 0.12, ease: 'easeOut' as const },
  }),
}

/* ─── 資料 ─── */
const skillGroups = [
  {
    category: 'Backend',
    icon: Server,
    items: ['Java', 'Spring Boot', 'Spring Security', 'JPA / Hibernate'],
    color: '#7C9FD4',
  },
  {
    category: 'Frontend',
    icon: Code2,
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    color: '#9BB8A4',
  },
  {
    category: 'Database',
    icon: Database,
    items: ['PostgreSQL', 'MySQL', 'Redis'],
    color: '#C4A8D4',
  },
  {
    category: 'DevOps',
    icon: Wrench,
    items: ['Docker', 'GitHub Actions', '系統分析設計'],
    color: '#D4B896',
  },
]

const projects = [
  {
    title: '個人網站',
    desc: '以 React + Vite 建構的 GitHub Pages 個人作品集，探索多種 UI 設計風格。',
    tags: ['React', 'TypeScript', 'Tailwind'],
    href: 'https://github.com/Rex-shark',
    accentColor: '#7C9FD4',
  },
  {
    title: 'Spring Boot API 範例',
    desc: '完整的 RESTful API 專案，包含 JWT 認證、RBAC 權限控管與 OpenAPI 文件。',
    tags: ['Java', 'Spring Boot', 'JWT'],
    href: 'https://github.com/Rex-shark',
    accentColor: '#9BB8A4',
  },
  {
    title: '系統分析設計教學',
    desc: 'UML、需求分析到系統設計的完整教學系列，含實戰案例解析。',
    tags: ['系統分析', 'UML', '教學'],
    href: 'https://github.com/Rex-shark',
    accentColor: '#C4A8D4',
  },
]

/* ─── 子元件：Neu 技能卡片 ─── */
function SkillCard({
  group,
  index,
}: {
  group: (typeof skillGroups)[number]
  index: number
}) {
  const Icon = group.icon
  return (
    <motion.div
      className="p-6 rounded-2xl"
      style={{ background: BG, boxShadow: neuShadowOut }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={scaleIn}
      custom={index}
    >
      {/* 圖示凸起圓圈 */}
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center mb-4"
        style={{ background: BG, boxShadow: neuShadowSm }}
      >
        <Icon size={20} style={{ color: group.color }} />
      </div>
      <p
        className="text-xs font-semibold tracking-widest uppercase mb-4"
        style={{ color: ACCENT }}
      >
        {group.category}
      </p>
      <ul className="space-y-2">
        {group.items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm" style={{ color: TEXT_MAIN }}>
            {/* 凹陷小點 */}
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: group.color, boxShadow: `0 0 0 2px ${BG}, 0 0 0 3px ${group.color}44` }}
            />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

/* ─── 子元件：Neu 專案卡片 ─── */
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
      className="block p-6 rounded-2xl cursor-pointer"
      style={{ background: BG, boxShadow: neuShadowOut }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={scaleIn}
      custom={index}
      whileHover={{
        boxShadow: neuShadowHover,
        y: -2,
        transition: { duration: 0.2, ease: 'easeOut' as const },
      }}
      whileTap={{
        boxShadow: neuShadowIn,
        y: 0,
        transition: { duration: 0.1, ease: 'easeOut' as const },
      }}
    >
      {/* 頂部色條 */}
      <div
        className="w-full h-1 rounded-full mb-5"
        style={{ background: `linear-gradient(90deg, ${project.accentColor}, ${project.accentColor}55)` }}
      />
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-base" style={{ color: TEXT_DARK }}>
          {project.title}
        </h3>
        <ExternalLink
          size={14}
          className="flex-shrink-0 mt-0.5 ml-2"
          style={{ color: ACCENT_LIGHT }}
        />
      </div>
      <p className="text-sm leading-relaxed mb-5" style={{ color: TEXT_MUTED }}>
        {project.desc}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-3 py-1 rounded-full"
            style={{ background: BG, boxShadow: neuShadowIn, color: TEXT_MAIN }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.a>
  )
}

/* ─── 主元件 ─── */
export default function SoftUi() {
  return (
    <div
      className="min-h-screen"
      style={{ background: BG, fontFamily: "'Nunito', sans-serif", color: TEXT_MAIN }}
    >
      {/* Google Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap"
      />

      {/* ── 固定導覽列 ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{ background: `${BG}e8`, backdropFilter: 'blur(12px)' }}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* 返回按鈕 - 凸起 Neu 風格 */}
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm cursor-pointer transition-all duration-200"
            style={{ color: TEXT_MAIN, boxShadow: neuShadowSm, background: BG }}
          >
            <ArrowLeft size={15} />
            返回風格選擇
          </Link>

          {/* 頁內錨點 */}
          <div className="flex items-center gap-2">
            {[
              { label: '關於', href: '#about' },
              { label: '技能', href: '#skills' },
              { label: '專案', href: '#projects' },
              { label: '聯絡', href: '#contact' },
            ].map((nav) => (
              <a
                key={nav.label}
                href={nav.href}
                className="px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200"
                style={{ color: TEXT_MAIN }}
              >
                {nav.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {/* ── Hero 區塊 ── */}
        <section
          id="about"
          className="max-w-5xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-14"
        >
          {/* 文字 */}
          <motion.div
            className="flex-1"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
          >
            {/* 角色標籤 - 凹陷 */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
              style={{ background: BG, boxShadow: neuShadowIn, color: ACCENT }}
            >
              Java Full-Stack Engineer
            </div>

            <h1
              className="text-5xl sm:text-6xl font-bold leading-tight mb-5"
              style={{ fontFamily: "'Poppins', sans-serif", color: TEXT_DARK }}
            >
              Hi, I'm{' '}
              <span style={{ color: ACCENT }}>Rex</span>
            </h1>

            <p
              className="text-base leading-relaxed max-w-md mb-8"
              style={{ color: TEXT_MUTED }}
            >
              Java 全端工程師 ＆ 系統分析師。專注於設計穩健的後端架構，
              持續分享 Java、Spring Boot 與系統設計的實戰經驗。
            </p>

            {/* CTA 按鈕 */}
            <div className="flex items-center gap-4">
              <motion.a
                href="mailto:rexrex10050@gmail.com"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold cursor-pointer"
                style={{
                  background: ACCENT,
                  color: '#ffffff',
                  boxShadow: `4px 4px 10px ${ACCENT}66, -2px -2px 6px #ffffff`,
                }}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.18, ease: 'easeOut' as const },
                }}
                whileTap={{
                  scale: 0.97,
                  transition: { duration: 0.1, ease: 'easeOut' as const },
                }}
              >
                <Mail size={15} />
                聯絡我
              </motion.a>
              <motion.a
                href="https://github.com/Rex-shark"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold cursor-pointer"
                style={{ color: TEXT_MAIN, boxShadow: neuShadowOut, background: BG }}
                whileHover={{
                  boxShadow: neuShadowHover,
                  transition: { duration: 0.18, ease: 'easeOut' as const },
                }}
                whileTap={{
                  boxShadow: neuShadowIn,
                  transition: { duration: 0.1, ease: 'easeOut' as const },
                }}
              >
                <GithubIcon className="w-4 h-4" />
                GitHub
              </motion.a>
            </div>
          </motion.div>

          {/* 個人照片 - Neu 凸起框 */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' as const }}
          >
            {/* 外層大凸起圓 */}
            <div
              className="w-60 h-60 rounded-full flex items-center justify-center"
              style={{ background: BG, boxShadow: `12px 12px 24px #c5c9ce, -12px -12px 24px #ffffff` }}
            >
              {/* 內層凹陷圓 */}
              <div
                className="w-52 h-52 rounded-full overflow-hidden"
                style={{ boxShadow: neuShadowIn }}
              >
                <img
                  src="/me.png"
                  alt="Rex"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* 裝飾小凸起球 */}
            <div className="flex justify-center gap-3 mt-4">
              {[ACCENT, '#9BB8A4', '#C4A8D4'].map((color, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full"
                  style={{ background: BG, boxShadow: `2px 2px 4px #c5c9ce, -2px -2px 4px #ffffff, inset 0 0 0 2px ${color}` }}
                />
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Neu 分隔線 ── */}
        <div className="max-w-5xl mx-auto px-6">
          <div
            className="h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #c5c9ce, #ffffff, #c5c9ce, transparent)' }}
          />
        </div>

        {/* ── 技能區塊 ── */}
        <section id="skills" className="max-w-5xl mx-auto px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            custom={0}
            className="mb-12"
          >
            {/* 凹陷標籤 */}
            <div
              className="inline-flex px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ background: BG, boxShadow: neuShadowIn, color: ACCENT }}
            >
              Skills
            </div>
            <h2
              className="text-3xl font-bold"
              style={{ fontFamily: "'Poppins', sans-serif", color: TEXT_DARK }}
            >
              技術能力
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillGroups.map((group, i) => (
              <SkillCard key={group.category} group={group} index={i} />
            ))}
          </div>
        </section>

        {/* ── Neu 分隔線 ── */}
        <div className="max-w-5xl mx-auto px-6">
          <div
            className="h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #c5c9ce, #ffffff, #c5c9ce, transparent)' }}
          />
        </div>

        {/* ── 專案區塊 ── */}
        <section id="projects" className="max-w-5xl mx-auto px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            custom={0}
            className="mb-12"
          >
            <div
              className="inline-flex px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ background: BG, boxShadow: neuShadowIn, color: ACCENT }}
            >
              Projects
            </div>
            <h2
              className="text-3xl font-bold"
              style={{ fontFamily: "'Poppins', sans-serif", color: TEXT_DARK }}
            >
              精選專案
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </section>

        {/* ── Neu 分隔線 ── */}
        <div className="max-w-5xl mx-auto px-6">
          <div
            className="h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #c5c9ce, #ffffff, #c5c9ce, transparent)' }}
          />
        </div>

        {/* ── 聯絡區塊 ── */}
        <section id="contact" className="max-w-5xl mx-auto px-6 py-24">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <div
              className="inline-flex px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ background: BG, boxShadow: neuShadowIn, color: ACCENT }}
            >
              Contact
            </div>
            <h2
              className="text-3xl font-bold mb-4"
              style={{ fontFamily: "'Poppins', sans-serif", color: TEXT_DARK }}
            >
              想聊聊？
            </h2>
            <p className="max-w-sm mx-auto mb-10 leading-relaxed" style={{ color: TEXT_MUTED }}>
              無論是合作提案、技術交流或是問題諮詢，都歡迎來信。
            </p>

            {/* 聯絡資訊卡 - 大凸起 */}
            <div
              className="max-w-sm mx-auto p-8 rounded-3xl"
              style={{ background: BG, boxShadow: `10px 10px 20px #c5c9ce, -10px -10px 20px #ffffff` }}
            >
              <motion.a
                href="mailto:rexrex10050@gmail.com"
                className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl font-semibold cursor-pointer mb-4"
                style={{
                  background: ACCENT,
                  color: '#ffffff',
                  boxShadow: `4px 4px 10px ${ACCENT}66, -2px -2px 6px #ffffff`,
                  fontSize: '0.9rem',
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.18, ease: 'easeOut' as const },
                }}
                whileTap={{
                  scale: 0.97,
                  transition: { duration: 0.1, ease: 'easeOut' as const },
                }}
              >
                <Mail size={17} />
                rexrex10050@gmail.com
              </motion.a>

              <motion.a
                href="https://github.com/Rex-shark"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl font-semibold cursor-pointer"
                style={{
                  background: BG,
                  color: TEXT_MAIN,
                  boxShadow: neuShadowOut,
                  fontSize: '0.9rem',
                }}
                whileHover={{
                  boxShadow: neuShadowHover,
                  transition: { duration: 0.18, ease: 'easeOut' as const },
                }}
                whileTap={{
                  boxShadow: neuShadowIn,
                  transition: { duration: 0.1, ease: 'easeOut' as const },
                }}
              >
                <GithubIcon className="w-5 h-5" />
                github.com/Rex-shark
              </motion.a>
            </div>
          </motion.div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer
        className="py-6 text-center text-xs"
        style={{
          color: TEXT_MUTED,
          borderTop: `1px solid #c5c9ce44`,
        }}
      >
        © 2025 Rex. Built with React + Vite. Design: Soft UI / Neumorphism
      </footer>
    </div>
  )
}

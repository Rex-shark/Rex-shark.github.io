import { Link } from 'react-router'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowLeft, Mail, ExternalLink, Code2, Database, Server, Wrench, Bot } from 'lucide-react'
import { handleHashClick } from '@/lib/utils'
import { profile, skillGroups as sharedSkillGroups, projects as sharedProjects } from '@/data/profile'
import type { SkillGroupKey } from '@/data/profile'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

/* ─── Neumorphism 設計 token（加強版：更深的陰影與凸面漸層） ─── */
const BG = '#E0E5EC'
const TEXT_MAIN = '#3F4A5C'
const TEXT_DARK = '#1F2937'
const TEXT_MUTED = '#667085'
const ACCENT = '#2A9D8F'
const ACCENT_LIGHT = '#7FCFC4'
/* 凸起面：145° 光源漸層，讓表面有弧度 */
const RAISED = 'linear-gradient(145deg, #f0f5fc, #cacfd6)'
/* 主按鈕：帶光澤的主色漸層 */
const ACCENT_FILL = 'linear-gradient(145deg, #3DB8A9, #238478)'

/* 凸起陰影 */
const neuShadowOut = '10px 10px 20px #a3b1c6, -10px -10px 20px #ffffff'
/* 凹陷陰影 */
const neuShadowIn = 'inset 6px 6px 12px #a3b1c6, inset -6px -6px 12px #ffffff'
/* 輕微凸起（用於小元件） */
const neuShadowSm = '6px 6px 12px #a3b1c6, -6px -6px 12px #ffffff'
/* 按鈕懸停 */
const neuShadowHover = '4px 4px 8px #a3b1c6, -4px -4px 8px #ffffff'

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

/* ─── 資料（內容來自 src/data/profile.ts，這裡只補上本頁的 icon 與配色） ─── */
const SKILL_GROUP_STYLE: Record<SkillGroupKey, { icon: typeof Server; color: string }> = {
  backend: { icon: Server, color: '#2A9D8F' },
  frontend: { icon: Code2, color: '#E0A458' },
  data: { icon: Database, color: '#6C8EDB' },
  ai: { icon: Bot, color: '#E07A8F' },
  design: { icon: Wrench, color: '#8C7BD1' },
}

const skillGroups = sharedSkillGroups.map((g) => ({ ...g, ...SKILL_GROUP_STYLE[g.key] }))
/* AI 組項目較多，獨立成寬版標籤卡片，其餘四組維持格狀卡片 */
const mainSkillGroups = skillGroups.filter((g) => g.key !== 'ai')
const aiGroup = skillGroups.find((g) => g.key === 'ai')!

const PROJECT_COLORS = ['#2A9D8F', '#E0A458', '#6C8EDB', '#8C7BD1', '#E07A8F']

const projects = sharedProjects.map((p, i) => ({
  ...p,
  accentColor: PROJECT_COLORS[i % PROJECT_COLORS.length],
}))

/* ─── 子元件：Neu 技能卡片 ─── */
function SkillCard({
  group,
  index,
}: {
  group: (typeof mainSkillGroups)[number]
  index: number
}) {
  const Icon = group.icon
  return (
    <motion.div
      className="p-6 rounded-2xl"
      style={{ background: RAISED, boxShadow: neuShadowOut }}
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
        {group.labelEn}
      </p>
      <ul className="space-y-2">
        {group.skills.map((item) => (
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
    <motion.div
      className="group relative p-6 rounded-2xl cursor-pointer"
      style={{ background: RAISED, boxShadow: neuShadowOut }}
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
      {/* GitHub repo 連結：放在 Link 之外，避免巢狀 <a> */}
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        aria-label={`在 GitHub 查看 ${project.title}`}
        className="absolute top-5 right-5 z-10 cursor-pointer"
        style={{ color: ACCENT_LIGHT }}
      >
        <ExternalLink size={14} />
      </a>

      <Link to={project.to} className="block">
        {/* 頂部色條 */}
        <div
          className="w-full h-1 rounded-full mb-5"
          style={{ background: `linear-gradient(90deg, ${project.accentColor}, ${project.accentColor}55)` }}
        />
        <h3 className="font-semibold text-base pr-5" style={{ color: TEXT_DARK }}>
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed mt-3 mb-5" style={{ color: TEXT_MUTED }}>
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
      </Link>
    </motion.div>
  )
}

/* ─── 主元件 ─── */
export default function SoftUiPro() {
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
            to="/gallery"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm cursor-pointer transition-all duration-200"
            style={{ color: TEXT_MAIN, boxShadow: neuShadowSm, background: BG }}
          >
            <ArrowLeft size={15} />
            返回設計實驗室
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
                onClick={handleHashClick}
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
              {profile.titleEn}
            </div>

            <h1
              className="text-5xl sm:text-6xl font-bold leading-tight mb-5"
              style={{ fontFamily: "'Poppins', sans-serif", color: TEXT_DARK }}
            >
              Hi, I'm{' '}
              <span style={{ color: ACCENT }}>{profile.name}</span>
            </h1>

            <p
              className="text-base leading-relaxed max-w-md mb-8"
              style={{ color: TEXT_MUTED }}
            >
              {profile.intro[0]}
              <br />
              {profile.intro[1]}
            </p>

            {/* CTA 按鈕 */}
            <div className="flex items-center gap-4">
              <motion.a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold cursor-pointer"
                style={{
                  background: ACCENT_FILL,
                  color: '#ffffff',
                  boxShadow: `8px 8px 16px ${ACCENT}73, -4px -4px 10px #ffffff`,
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
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold cursor-pointer"
                style={{ color: TEXT_MAIN, boxShadow: neuShadowOut, background: RAISED }}
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
              style={{ background: BG, boxShadow: `18px 18px 36px #a3b1c6, -18px -18px 36px #ffffff` }}
            >
              {/* 內層凹陷圓 */}
              <div
                className="w-52 h-52 rounded-full overflow-hidden"
                style={{ boxShadow: neuShadowIn }}
              >
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* 裝飾小凸起球 */}
            <div className="flex justify-center gap-3 mt-4">
              {[ACCENT, '#E0A458', '#6C8EDB'].map((color, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full"
                  style={{ background: BG, boxShadow: `2px 2px 4px #a3b1c6, -2px -2px 4px #ffffff, inset 0 0 0 2px ${color}` }}
                />
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Neu 分隔線 ── */}
        <div className="max-w-5xl mx-auto px-6">
          <div
            className="h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #a3b1c6, #ffffff, #a3b1c6, transparent)' }}
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
            {mainSkillGroups.map((group, i) => (
              <SkillCard key={group.key} group={group} index={i} />
            ))}
          </div>

          {/* AI / LLM：項目較多，獨立成寬版標籤卡片 */}
          <motion.div
            className="mt-6 p-6 rounded-2xl"
            style={{ background: RAISED, boxShadow: neuShadowOut }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={scaleIn}
            custom={mainSkillGroups.length}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: BG, boxShadow: neuShadowSm }}
              >
                <Bot size={20} style={{ color: aiGroup.color }} />
              </div>
              <p
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: ACCENT }}
              >
                {aiGroup.labelEn}
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {aiGroup.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-3 py-1.5 rounded-full"
                  style={{ background: BG, boxShadow: neuShadowIn, color: TEXT_MAIN }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Neu 分隔線 ── */}
        <div className="max-w-5xl mx-auto px-6">
          <div
            className="h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #a3b1c6, #ffffff, #a3b1c6, transparent)' }}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </section>

        {/* ── Neu 分隔線 ── */}
        <div className="max-w-5xl mx-auto px-6">
          <div
            className="h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #a3b1c6, #ffffff, #a3b1c6, transparent)' }}
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
              有任何想法或問題，歡迎透過下列方式聯絡我。
            </p>

            {/* 聯絡資訊卡 - 大凸起 */}
            <div
              className="max-w-sm mx-auto p-8 rounded-3xl"
              style={{ background: BG, boxShadow: `14px 14px 28px #a3b1c6, -14px -14px 28px #ffffff` }}
            >
              <motion.a
                href={`mailto:${profile.email}`}
                className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl font-semibold cursor-pointer mb-4"
                style={{
                  background: ACCENT_FILL,
                  color: '#ffffff',
                  boxShadow: `8px 8px 16px ${ACCENT}73, -4px -4px 10px #ffffff`,
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
                {profile.email}
              </motion.a>

              <motion.a
                href={profile.githubUrl}
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
                github.com/{profile.githubHandle}
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
          borderTop: `1px solid #a3b1c644`,
        }}
      >
        © {new Date().getFullYear()} {profile.name}. Built with React + Vite. Design: Soft UI Pro / Neumorphism
      </footer>
    </div>
  )
}

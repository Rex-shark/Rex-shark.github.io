import { Link } from 'react-router'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowLeft, Mail, ChevronRight, Code2, Server, Database, Layers, Bot } from 'lucide-react'
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

/* macOS 視窗三點裝飾 */
function WindowDots() {
  return (
    <div className="flex gap-1.5">
      <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
      <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
      <div className="w-3 h-3 rounded-full bg-[#28C840]" />
    </div>
  )
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' as const },
  }),
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

/* 資料來自 src/data/profile.ts，這裡只補上本頁的 icon、配色與版面欄寬 */
const SKILL_GROUP_STYLE: Record<SkillGroupKey, { icon: typeof Server; color: string }> = {
  backend: { icon: Server, color: '#0071E3' },
  frontend: { icon: Code2, color: '#AF52DE' },
  data: { icon: Database, color: '#34C759' },
  ai: { icon: Bot, color: '#FF9500' },
  design: { icon: Layers, color: '#FF2D55' },
}

const skillGroups = sharedSkillGroups.map((g) => ({ ...g, ...SKILL_GROUP_STYLE[g.key] }))

/* 5 張卡：上排 3 張、下排 2 張（lg 以 6 欄格線對齊）；sm 兩欄時第一張橫跨整列 */
const PROJECT_SPAN = [
  'sm:col-span-2 lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-3',
  'lg:col-span-3',
]

const projects = sharedProjects.map((p, i) => ({
  ...p,
  span: PROJECT_SPAN[i] ?? 'lg:col-span-2',
}))

export default function Macbook() {
  return (
    <div
      className="min-h-screen text-[#1C1C1E]"
      style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif",
        background: '#F2F2F7',
      }}
    >
      {/* 導覽列 - macOS menu bar 風格 */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-12 flex items-center px-6"
        style={{
          background: 'rgba(242,242,247,0.72)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '0.5px solid rgba(0,0,0,0.12)',
        }}
      >
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
          {/* 左側 - 返回 */}
          <Link
            to="/gallery"
            className="flex items-center gap-1.5 text-[13px] text-[#0071E3] hover:text-[#0077ED] transition-colors duration-150 cursor-pointer font-medium"
          >
            <ArrowLeft size={14} />
            返回設計實驗室
          </Link>

          {/* 右側 - 錨點導覽 */}
          <div className="flex items-center gap-6">
            {[
              { label: '關於', href: '#about' },
              { label: '技能', href: '#skills' },
              { label: '專案', href: '#projects' },
              { label: '聯絡', href: '#contact' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={handleHashClick}
                className="text-[13px] text-[#1C1C1E]/70 hover:text-[#1C1C1E] transition-colors duration-150 font-medium cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="pt-12">
        {/* Hero 區塊 */}
        <section id="about" className="max-w-5xl mx-auto px-6 py-24">
          <div className="flex flex-col md:flex-row items-center gap-14">
            {/* 文字內容 */}
            <motion.div
              className="flex-1"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.p
                className="text-[13px] font-semibold tracking-widest uppercase mb-4"
                style={{ color: '#0071E3', letterSpacing: '0.12em' }}
                variants={fadeUp}
                custom={0}
              >
                {profile.titleEn}
              </motion.p>
              <motion.h1
                className="font-bold leading-tight mb-5"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', letterSpacing: '-0.02em' }}
                variants={fadeUp}
                custom={1}
              >
                Hi, I'm{' '}
                <span style={{ color: '#0071E3' }}>{profile.name}</span>
              </motion.h1>
              <motion.div className="mb-8 max-w-md" variants={fadeUp} custom={2}>
                <p
                  className="text-[17px] font-semibold mb-3"
                  style={{ color: '#1C1C1E', letterSpacing: '-0.01em' }}
                >
                  {profile.title}
                </p>
                <div className="space-y-2">
                  {profile.intro.map((line) => (
                    <p
                      key={line}
                      className="text-[16px]"
                      style={{ color: '#3C3C43', lineHeight: 1.65 }}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
              <motion.div className="flex items-center gap-3" variants={fadeUp} custom={3}>
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-[15px] font-semibold transition-all duration-200 cursor-pointer hover:brightness-90"
                  style={{ background: '#0071E3', letterSpacing: '-0.01em' }}
                >
                  <Mail size={15} />
                  聯絡我
                </a>
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[15px] font-semibold transition-all duration-200 cursor-pointer"
                  style={{
                    background: 'rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '0.5px solid rgba(0,0,0,0.18)',
                    color: '#1C1C1E',
                    letterSpacing: '-0.01em',
                  }}
                >
                  <GithubIcon className="w-4 h-4" />
                  GitHub
                </a>
              </motion.div>
            </motion.div>

            {/* 照片 - macOS 視窗風格 */}
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' as const }}
            >
              <div
                className="overflow-hidden"
                style={{
                  borderRadius: '18px',
                  boxShadow: '0 4px 48px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)',
                  border: '0.5px solid rgba(0,0,0,0.1)',
                  background: 'rgba(255,255,255,0.9)',
                }}
              >
                {/* 視窗標題列 */}
                <div
                  className="flex items-center px-4 h-10"
                  style={{
                    background: 'rgba(246,246,246,0.95)',
                    borderBottom: '0.5px solid rgba(0,0,0,0.1)',
                  }}
                >
                  <WindowDots />
                  <span className="mx-auto text-[12px] font-medium" style={{ color: '#3C3C43' }}>
                    {profile.name} · 個人照片
                  </span>
                </div>
                {/* 照片 */}
                <div className="w-56 h-56">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 分隔線 */}
        <div className="max-w-5xl mx-auto px-6">
          <div style={{ height: '0.5px', background: 'rgba(0,0,0,0.1)' }} />
        </div>

        {/* 技能區塊 */}
        <section id="skills" className="max-w-5xl mx-auto px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            custom={0}
            className="mb-10"
          >
            <p
              className="text-[12px] font-semibold tracking-widest uppercase mb-2"
              style={{ color: '#0071E3' }}
            >
              Skills
            </p>
            <h2
              className="text-[28px] font-bold"
              style={{ letterSpacing: '-0.02em' }}
            >
              技術能力
            </h2>
          </motion.div>

          {/* 「系統設定」式視窗：每組一張分組清單，不帶任何熟練度數值 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeUp}
            custom={1}
            className="overflow-hidden"
            style={{
              borderRadius: '18px',
              border: '0.5px solid rgba(0,0,0,0.1)',
              boxShadow: '0 4px 48px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.06)',
              background: 'rgba(236,236,240,0.85)',
            }}
          >
            <div
              className="flex items-center px-4 h-10"
              style={{
                background: 'rgba(246,246,246,0.95)',
                borderBottom: '0.5px solid rgba(0,0,0,0.1)',
              }}
            >
              <WindowDots />
              <span className="mx-auto pr-12 text-[12px] font-medium" style={{ color: '#3C3C43' }}>
                系統設定 — 技術能力
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 grid-flow-dense gap-5 p-4 sm:p-6">
              {skillGroups.map((group) => {
                const Icon = group.icon
                const wide = group.key === 'ai'
                return (
                  <div key={group.key} className={wide ? 'sm:col-span-2' : ''}>
                    <div className="flex items-center gap-2.5 mb-2 px-1">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: group.color }}
                      >
                        <Icon size={14} color="white" />
                      </div>
                      <span className="text-[14px] font-semibold" style={{ color: '#1C1C1E' }}>
                        {group.label}
                      </span>
                      <span className="text-[12px]" style={{ color: '#8E8E93' }}>
                        {group.labelEn}
                      </span>
                    </div>
                    <ul
                      className={`overflow-hidden ${wide ? 'grid grid-cols-1 sm:grid-cols-2' : ''}`}
                      style={{
                        background: 'rgba(255,255,255,0.92)',
                        borderRadius: '12px',
                        border: '0.5px solid rgba(0,0,0,0.08)',
                      }}
                    >
                      {group.skills.map((skill) => (
                        <li
                          key={skill}
                          className="flex items-center justify-between gap-3 px-4 py-2.5"
                          style={{ boxShadow: 'inset 0 -0.5px 0 rgba(0,0,0,0.08)' }}
                        >
                          <span
                            className="text-[14px] font-medium min-w-0 break-words"
                            style={{ color: '#1C1C1E' }}
                          >
                            {skill}
                          </span>
                          <ChevronRight size={14} className="flex-shrink-0" style={{ color: '#C7C7CC' }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </section>

        {/* 分隔線 */}
        <div className="max-w-5xl mx-auto px-6">
          <div style={{ height: '0.5px', background: 'rgba(0,0,0,0.1)' }} />
        </div>

        {/* 專案區塊 */}
        <section id="projects" className="max-w-5xl mx-auto px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            custom={0}
            className="mb-10"
          >
            <p
              className="text-[12px] font-semibold tracking-widest uppercase mb-2"
              style={{ color: '#0071E3' }}
            >
              Projects
            </p>
            <h2
              className="text-[28px] font-bold"
              style={{ letterSpacing: '-0.02em' }}
            >
              精選專案
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
            {projects.map((project, i) => (
              <motion.div
                key={project.slug}
                className={`group relative ${project.span}`}
                style={{
                  background: 'rgba(255,255,255,0.72)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: '16px',
                  border: '0.5px solid rgba(0,0,0,0.1)',
                  boxShadow: '0 2px 20px rgba(0,0,0,0.05)',
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
                custom={i}
                whileHover={{
                  y: -3,
                  boxShadow: '0 8px 32px rgba(0,113,227,0.12)',
                  transition: { duration: 0.2, ease: 'easeOut' as const },
                }}
              >
                {/* 整張卡連到站內頁 */}
                <Link to={project.to} className="flex flex-col h-full p-6 cursor-pointer">
                  {/* 視窗標題列：三點 + 由 slug 推導的視窗名稱 */}
                  <div className="flex items-center gap-3 mb-4 pr-9">
                    <WindowDots />
                    <span className="text-[11px] font-medium truncate" style={{ color: '#8E8E93' }}>
                      {project.slug}
                    </span>
                  </div>
                  <h3
                    className="font-semibold text-[16px] mb-2 group-hover:text-[#0071E3] transition-colors duration-200"
                    style={{ letterSpacing: '-0.01em' }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-[13px] leading-relaxed mb-4 flex-1"
                    style={{ color: '#3C3C43' }}
                  >
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2 py-0.5 font-medium rounded-full"
                        style={{
                          background: 'rgba(0,113,227,0.08)',
                          color: '#0071E3',
                          border: '0.5px solid rgba(0,113,227,0.2)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>

                {/* GitHub repo 連結放在 Link 之外，避免巢狀 <a> */}
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} 的 GitHub 原始碼`}
                  title="GitHub 原始碼"
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-[#8E8E93] hover:text-[#0071E3] hover:bg-black/5 transition-colors duration-200 cursor-pointer"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 分隔線 */}
        <div className="max-w-5xl mx-auto px-6">
          <div style={{ height: '0.5px', background: 'rgba(0,0,0,0.1)' }} />
        </div>

        {/* 聯絡區塊 */}
        <section id="contact" className="max-w-5xl mx-auto px-6 py-24 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.p
              className="text-[12px] font-semibold tracking-widest uppercase mb-3"
              style={{ color: '#0071E3' }}
              variants={fadeUp}
              custom={0}
            >
              Contact
            </motion.p>
            <motion.h2
              className="font-bold mb-4"
              style={{ fontSize: '2rem', letterSpacing: '-0.02em' }}
              variants={fadeUp}
              custom={1}
            >
              想聊聊嗎？
            </motion.h2>
            <motion.p
              className="text-[16px] mb-10 max-w-sm mx-auto"
              style={{ color: '#3C3C43', lineHeight: 1.65 }}
              variants={fadeUp}
              custom={2}
            >
              技術交流或任何想法，都歡迎來信。
            </motion.p>

            {/* 聯絡卡片 */}
            <motion.div
              className="inline-block"
              variants={fadeUp}
              custom={3}
            >
              <div
                className="p-6 text-left"
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: '18px',
                  border: '0.5px solid rgba(0,0,0,0.1)',
                  boxShadow: '0 4px 32px rgba(0,0,0,0.08)',
                  minWidth: '300px',
                }}
              >
                {/* 視窗標題列 */}
                <div className="flex items-center gap-2 mb-5">
                  <WindowDots />
                  <span
                    className="ml-auto text-[12px] font-medium"
                    style={{ color: '#8E8E93' }}
                  >
                    新郵件
                  </span>
                </div>
                <div className="space-y-3 mb-5">
                  <div style={{ borderBottom: '0.5px solid rgba(0,0,0,0.08)', paddingBottom: '10px' }}>
                    <span className="text-[12px] font-medium" style={{ color: '#8E8E93' }}>收件人</span>
                    <p className="text-[14px] mt-0.5 break-all" style={{ color: '#1C1C1E' }}>{profile.email}</p>
                  </div>
                  <div style={{ borderBottom: '0.5px solid rgba(0,0,0,0.08)', paddingBottom: '10px' }}>
                    <span className="text-[12px] font-medium" style={{ color: '#8E8E93' }}>主旨</span>
                    <p className="text-[14px] mt-0.5" style={{ color: '#8E8E93' }}>你好，{profile.name}！我想...</p>
                  </div>
                </div>
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-white text-[15px] font-semibold transition-all duration-200 cursor-pointer hover:brightness-90"
                  style={{ background: '#0071E3', letterSpacing: '-0.01em' }}
                >
                  <Mail size={15} />
                  傳送郵件
                </a>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="py-6 text-center text-[12px]"
        style={{
          borderTop: '0.5px solid rgba(0,0,0,0.1)',
          color: '#8E8E93',
        }}
      >
        © {new Date().getFullYear()} {profile.name}. Built with React + Vite.
      </footer>
    </div>
  )
}

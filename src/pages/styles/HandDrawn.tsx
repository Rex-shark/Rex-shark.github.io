import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail } from 'lucide-react'
import { profile, skillGroups, projects } from '@/data/profile'
import type { SkillGroup, SkillGroupKey, Project } from '@/data/profile'
import { handleHashClick } from '@/lib/utils'

const KALAM = "'Kalam', cursive"
const CAVEAT = "'Caveat', cursive"

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

/* ── 本頁的裝飾設定（內容來自 src/data/profile.ts，這裡只補手繪風的外觀） ── */

/** 便利貼：紙色、歪斜角度、在格線中佔的寬度。AI 組項目最多，給兩欄寬。 */
const NOTE_STYLE: Record<SkillGroupKey, { paper: string; rotate: number; span: string }> = {
  backend: { paper: '#FFF4C9', rotate: -1.2, span: '' },
  frontend: { paper: '#F6E7D8', rotate: 0.9, span: '' },
  data: { paper: '#E8EFDD', rotate: -0.6, span: '' },
  ai: { paper: '#FBE6DC', rotate: 0.5, span: 'md:col-span-2' },
  design: { paper: '#E9E6F2', rotate: -1, span: '' },
}

/** 專案卡：每張的歪斜角度，依 index 對應。 */
const CARD_ROTATE = [-1, 0.8, -0.5, 0.6, -0.8]

/* ── 手繪小零件 ─────────────────────────────────────────── */

/* 手繪底線裝飾 */
function SketchUnderline() {
  return (
    <svg viewBox="0 0 120 10" className="w-24 h-2.5" fill="none">
      <path d="M2 7 Q30 2 60 6 Q90 9 118 4" stroke="#C4A77D" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

/* 手繪分隔線 */
function SketchDivider({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 800 12" className="w-full h-3" fill="none">
      <path d={d} stroke="#C4A77D" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  )
}

/* 用筆圈起來的標題：圈線在捲動進場時「畫」出來 */
function CircledLabel({ children, delay }: { children: string; delay: number }) {
  return (
    <span className="relative inline-block px-3 py-0.5">
      <svg
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full overflow-visible"
        fill="none"
      >
        <motion.path
          d="M8 22 C6 8 38 3 62 4 C86 5 97 12 95 22 C93 33 66 38 40 36 C18 35 3 30 9 16"
          stroke="#1A1A1A"
          strokeWidth="1.8"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay, duration: 0.6, ease: 'easeOut' as const }}
        />
      </svg>
      <span className="relative text-xl font-bold" style={{ fontFamily: KALAM }}>
        {children}
      </span>
    </span>
  )
}

/* 清單前面那一撇手繪勾勾 */
function SketchTick() {
  return (
    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 mt-1.5 flex-shrink-0" fill="none">
      <path d="M2 9 Q5 11 6.5 14 Q9 6 14 2" stroke="#C4A77D" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ── 技能便利貼 ─────────────────────────────────────────── */
function SkillNote({ group, index }: { group: SkillGroup; index: number }) {
  const { paper, rotate, span } = NOTE_STYLE[group.key]
  const isWide = span !== ''

  return (
    <motion.div
      className={`relative px-5 pt-8 pb-5 border border-[#1A1A1A]/15 ${span}`}
      style={{ background: paper, rotate, boxShadow: '3px 4px 0 rgba(74,74,74,0.18)' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.45, ease: 'easeOut' as const }}
    >
      {/* 紙膠帶 */}
      <div
        className="absolute -top-3 left-1/2 w-20 h-6 -translate-x-1/2 bg-[#C4A77D]/55 border-x border-dashed border-[#FAFAF8]/80"
        style={{ rotate: `${-rotate * 2}deg` }}
      />

      <div className="flex items-baseline justify-between gap-3 mb-3">
        <CircledLabel delay={index * 0.08 + 0.25}>{group.label}</CircledLabel>
        <span className="text-base text-[#4A4A4A]/70">{group.labelEn}</span>
      </div>

      <ul className={isWide ? 'grid grid-cols-1 sm:grid-cols-2 gap-x-6' : ''}>
        {group.skills.map((skill) => (
          <li
            key={skill}
            className="flex items-start gap-2 py-1 text-lg leading-snug text-[#1A1A1A] border-b border-dashed border-[#4A4A4A]/20"
          >
            <SketchTick />
            <span>{skill}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

/* ── 專案卡 ─────────────────────────────────────────────── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  // 5 張卡排成「上 2 寬、下 3 窄」；平板兩欄時最後一張補滿整列
  const span = index < 2 ? 'md:col-span-3' : 'md:col-span-2'
  const isLast = index === projects.length - 1

  return (
    <motion.article
      className={`relative flex flex-col bg-white border-2 border-[#1A1A1A] rounded ${span} ${isLast ? 'sm:col-span-2' : ''}`}
      style={{ rotate: CARD_ROTATE[index % CARD_ROTATE.length], boxShadow: '4px 4px 0 #C4A77D' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.45, ease: 'easeOut' as const }}
      whileHover={{ x: 2, y: 2, boxShadow: '2px 2px 0 #C4A77D' }}
      whileTap={{ x: 4, y: 4, boxShadow: '0px 0px 0 #C4A77D' }}
    >
      {/* 整張卡連到站內頁：after 偽元素把點擊範圍撐滿整張卡 */}
      <Link to={project.to} className="flex-1 block p-5 pb-3 cursor-pointer after:absolute after:inset-0">
        <span className="text-base text-[#C4A77D]">No.{index + 1}</span>
        <h3 className="text-xl font-bold mb-2 leading-tight" style={{ fontFamily: KALAM }}>
          {project.title}
        </h3>
        <p className="text-sm text-[#4A4A4A] leading-relaxed mb-3">{project.desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 border border-[#C4A77D] text-[#1A1A1A] rounded"
              style={{ background: '#C4A77D22' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>

      {/* repo 連結放在 Link 之外，用 z-10 疊在撐滿的點擊層上面，避免巢狀 <a> */}
      <div className="flex justify-end px-5 pb-4 pt-2 mt-2 border-t border-dashed border-[#4A4A4A]/25">
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} 的 GitHub 原始碼`}
          className="relative z-10 flex items-center gap-1.5 text-base text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors cursor-pointer"
        >
          <GithubIcon size={14} />
          原始碼
        </a>
      </div>
    </motion.article>
  )
}

const NAV_ITEMS = [
  { label: '關於', href: '#about' },
  { label: '技能', href: '#skills' },
  { label: '專案', href: '#projects' },
  { label: '聯絡', href: '#contact' },
]

export default function HandDrawn() {
  return (
    <div
      className="min-h-screen text-[#1A1A1A] relative"
      style={{
        background: '#FAFAF8',
        fontFamily: CAVEAT,
      }}
    >
      {/* 載入 Google Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Kalam:wght@300;400;700&display=swap"
      />

      {/* 紙張橫線紋理 */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 27px,
            #4A4A4A 27px,
            #4A4A4A 28px
          )`,
        }}
      />

      {/* 導覽列 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAF8]/90 backdrop-blur border-b border-[#4A4A4A]/10">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            to="/gallery"
            className="flex items-center gap-1.5 text-sm text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors cursor-pointer"
            style={{ fontFamily: CAVEAT, fontSize: '1rem' }}
          >
            <ArrowLeft size={15} />
            返回設計實驗室
          </Link>
          <div className="flex items-center gap-5">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleHashClick}
                className="text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                style={{ fontSize: '1.05rem' }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="relative pt-14 max-w-4xl mx-auto px-6">
        {/* Hero */}
        <section id="about" className="py-20 flex flex-col md:flex-row items-center gap-12">
          {/* 個人照片 - 手繪邊框感 */}
          <motion.div
            className="flex-shrink-0 relative"
            initial={{ opacity: 0, rotate: -4 }}
            animate={{ opacity: 1, rotate: -2 }}
            transition={{ duration: 0.7, ease: 'easeOut' as const }}
          >
            <div
              className="w-44 h-44 overflow-hidden"
              style={{
                borderRadius: '42% 58% 55% 45% / 48% 42% 58% 52%',
                border: '3px solid #1A1A1A',
                boxShadow: '4px 4px 0 #C4A77D',
              }}
            >
              <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
            </div>
            {/* 裝飾點 */}
            <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full border-2 border-[#C4A77D] bg-[#FAFAF8]" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-[#C4A77D]" />
          </motion.div>

          {/* 文字 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-[#4A4A4A] text-lg mb-1">嗨，我是</p>
            <h1 className="text-6xl sm:text-7xl font-bold text-[#1A1A1A] mb-2" style={{ fontFamily: KALAM }}>
              {profile.name} ✦
            </h1>
            <SketchUnderline />
            <p className="text-2xl text-[#1A1A1A] mt-4 mb-3">{profile.title}</p>
            <div className="mb-6 max-w-md space-y-1.5">
              {profile.intro.map((line) => (
                <p key={line} className="text-lg text-[#4A4A4A] leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <motion.a
                href={`mailto:${profile.email}`}
                className="relative flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] text-[#FAFAF8] text-base rounded cursor-pointer"
                style={{ boxShadow: '3px 3px 0 #C4A77D' }}
                whileHover={{ x: 1, y: 1, boxShadow: '2px 2px 0 #C4A77D' }}
                whileTap={{ x: 3, y: 3, boxShadow: '0px 0px 0 #C4A77D' }}
              >
                <Mail size={15} />
                聯絡我
              </motion.a>
              <motion.a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 border-2 border-[#1A1A1A] text-base rounded cursor-pointer"
                style={{ boxShadow: '3px 3px 0 #4A4A4A' }}
                whileHover={{ x: 1, y: 1, boxShadow: '2px 2px 0 #4A4A4A' }}
                whileTap={{ x: 3, y: 3, boxShadow: '0px 0px 0 #4A4A4A' }}
              >
                <GithubIcon size={15} />
                GitHub
              </motion.a>
            </div>
          </motion.div>
        </section>

        <SketchDivider d="M0 6 Q200 2 400 6 Q600 10 800 5" />

        {/* 技能：依分組貼成一面便利貼牆，不標熟練度 */}
        <section id="skills" className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-4xl font-bold mb-1"
              style={{ fontFamily: KALAM, transform: 'rotate(-1deg)', display: 'inline-block' }}
            >
              技能 & 工具
            </h2>
            <SketchUnderline />
          </motion.div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
            {skillGroups.map((group, i) => (
              <SkillNote key={group.key} group={group} index={i} />
            ))}
          </div>
        </section>

        <SketchDivider d="M0 7 Q200 3 400 7 Q600 11 800 6" />

        {/* 專案 */}
        <section id="projects" className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-4xl font-bold mb-1"
              style={{ fontFamily: KALAM, transform: 'rotate(0.8deg)', display: 'inline-block' }}
            >
              精選專案
            </h2>
            <SketchUnderline />
          </motion.div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </section>

        {/* 聯絡 */}
        <section id="contact" className="py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-4xl font-bold mb-3"
              style={{ fontFamily: KALAM, transform: 'rotate(-0.5deg)', display: 'inline-block' }}
            >
              想聊聊嗎？
            </h2>
            <p className="text-lg text-[#4A4A4A] mb-8 max-w-xs mx-auto leading-relaxed">
              技術交流、或只是打個招呼都好！
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 px-7 py-3 bg-[#1A1A1A] text-[#FAFAF8] text-lg rounded cursor-pointer"
                style={{ boxShadow: '4px 4px 0 #C4A77D', fontFamily: CAVEAT }}
                whileHover={{ x: 2, y: 2, boxShadow: '2px 2px 0 #C4A77D' }}
                whileTap={{ x: 4, y: 4, boxShadow: '0px 0px 0 #C4A77D' }}
              >
                <Mail size={16} />
                {profile.email}
              </motion.a>
              <motion.a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 border-2 border-[#1A1A1A] text-lg rounded cursor-pointer"
                style={{ boxShadow: '4px 4px 0 #4A4A4A', fontFamily: CAVEAT }}
                whileHover={{ x: 2, y: 2, boxShadow: '2px 2px 0 #4A4A4A' }}
                whileTap={{ x: 4, y: 4, boxShadow: '0px 0px 0 #4A4A4A' }}
              >
                <GithubIcon size={16} />
                {profile.githubHandle}
              </motion.a>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="relative border-t-2 border-dashed border-[#4A4A4A]/20 py-6 text-center text-sm text-[#4A4A4A]/60">
        © {new Date().getFullYear()} {profile.name} ✦ {profile.location}
      </footer>
    </div>
  )
}

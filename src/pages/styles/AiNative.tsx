import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft,
  Mail,
  User,
  Wrench,
  CheckCircle2,
  Sparkles,
  FolderGit2,
} from 'lucide-react'
import { profile, skillGroups, projects } from '@/data/profile'
import type { SkillGroup, Project } from '@/data/profile'

/* ── 視覺 token：AI-Native UI（中性底 + 單一強調色） ── */
const ACCENT = '#6366F1'
const SUCCESS = '#10B981'
const TEXT_MUTED = '#52525B'
const TEXT_FAINT = '#A1A1AA'

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

/* 打字指示器：三點脈動 */
function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: ACCENT }}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' as const }}
        />
      ))}
    </div>
  )
}

/* 使用者訊息（右側） */
function UserMessage({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, ease: 'easeOut' as const }}
      className="flex items-start gap-3 justify-end"
    >
      <div className="max-w-[82%] rounded-2xl rounded-tr-sm bg-[#EEF2FF] border border-[#C7D2FE] px-4 py-2.5">
        <p className="text-[15px] leading-relaxed text-[#312E81]">{text}</p>
      </div>
      <div className="w-8 h-8 rounded-full bg-[#E4E4E7] flex items-center justify-center flex-shrink-0 mt-0.5">
        <User size={15} className="text-[#71717A]" />
      </div>
    </motion.div>
  )
}

/* Agent 訊息：打字指示 → 逐字串流 → children（context 卡 / tool call 結果）淡入 */
function AgentReply({
  text,
  delay = 0,
  showHeader = false,
  children,
}: {
  text: string
  delay?: number
  showHeader?: boolean
  children?: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState<'idle' | 'typing' | 'streaming' | 'done'>('idle')
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView || phase !== 'idle') return
    if (reduced) {
      const t = window.setTimeout(() => {
        setPhase('done')
        setCount(text.length)
      }, 0)
      return () => window.clearTimeout(t)
    }
    const t = window.setTimeout(() => setPhase('typing'), delay)
    return () => window.clearTimeout(t)
  }, [inView, phase, reduced, delay, text.length])

  useEffect(() => {
    if (phase !== 'typing') return
    const t = window.setTimeout(() => setPhase('streaming'), 650)
    return () => window.clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase !== 'streaming') return
    let i = 0
    const id = window.setInterval(() => {
      i += 3
      setCount(Math.min(i, text.length))
      if (i >= text.length) {
        window.clearInterval(id)
        setPhase('done')
      }
    }, 16)
    return () => window.clearInterval(id)
  }, [phase, text])

  return (
    <div ref={ref} className="flex items-start gap-3">
      <div className="relative flex-shrink-0">
        <img
          src={profile.avatar}
          alt={profile.name}
          className={
            showHeader
              ? 'w-11 h-11 rounded-full object-cover ring-2 ring-[#6366F1]/25'
              : 'w-8 h-8 rounded-full object-cover ring-1 ring-[#6366F1]/20 mt-0.5'
          }
        />
        {showHeader && (
          <span
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ring-2 ring-white"
            style={{ background: SUCCESS }}
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        {showHeader && (
          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="text-sm font-semibold text-[#09090B]">Rex Agent</span>
            <span className="text-[11px] text-[#A1A1AA]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              online
            </span>
          </div>
        )}
        <div className="inline-block max-w-full rounded-2xl rounded-tl-sm bg-white border border-[#E4E4E7] px-4 py-3 shadow-sm">
          {phase === 'typing' && <TypingDots />}
          {(phase === 'streaming' || phase === 'done') && (
            <p className="text-[15px] leading-relaxed text-[#09090B] whitespace-pre-line">
              {text.slice(0, count)}
            </p>
          )}
        </div>
        {phase === 'done' && children && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' as const }}
            className="mt-3"
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  )
}

/* 技能：context 卡片，左邊框強調色 */
function SkillContextCard({ group, index }: { group: SkillGroup; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3, ease: 'easeOut' as const }}
      className="rounded-lg border border-[#E4E4E7] bg-white pl-3.5 pr-4 py-3"
      style={{ borderLeft: `3px solid ${ACCENT}` }}
    >
      <div className="flex items-baseline gap-2 mb-1.5">
        <span className="text-xs font-semibold text-[#09090B]">{group.label}</span>
        <span
          className="text-[10px] uppercase tracking-wide"
          style={{ color: TEXT_FAINT, fontFamily: "'JetBrains Mono', monospace" }}
        >
          {group.labelEn}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {group.skills.map((skill) => (
          <span key={skill} className="text-xs px-2 py-0.5 rounded-md bg-[#F4F4F5] text-[#3F3F46]">
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

/* 專案卡：可點擊（站內用 Link 撐滿卡片，GitHub 用獨立外連，避免巢狀 <a>） */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.3, ease: 'easeOut' as const }}
      className="relative flex flex-col rounded-xl border border-[#E4E4E7] bg-white p-4 hover:border-[#6366F1]/40 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <h4 className="font-semibold text-sm text-[#09090B] leading-snug">
          <Link to={project.to} className="hover:text-[#6366F1] transition-colors cursor-pointer after:absolute after:inset-0">
            {project.title}
          </Link>
        </h4>
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} 的 GitHub Repo`}
          className="relative z-10 text-[#A1A1AA] hover:text-[#6366F1] transition-colors flex-shrink-0 cursor-pointer"
        >
          <GithubIcon size={13} />
        </a>
      </div>
      <p className="text-xs leading-relaxed mb-3" style={{ color: TEXT_MUTED }}>
        {project.desc}
      </p>
      <div className="mt-auto flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-1.5 py-0.5 rounded bg-[#F4F4F5] text-[#52525B]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

/* 專案區：以 tool call 呈現（list_projects() 執行中 → 完成 → 回傳結果） */
function ProjectsToolResult() {
  const reduced = useReducedMotion()
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t = window.setTimeout(() => setDone(true), reduced ? 0 : 900)
    return () => window.clearTimeout(t)
  }, [reduced])

  return (
    <div className="space-y-3">
      <div
        className="flex items-center gap-2 rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] px-3.5 py-2.5 text-xs"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        <Wrench size={13} style={{ color: ACCENT }} className="flex-shrink-0" />
        <span className="text-[#3F3F46]">list_projects()</span>
        <span className="ml-auto flex items-center gap-1.5">
          {done ? (
            <>
              <CheckCircle2 size={13} style={{ color: SUCCESS }} />
              <span style={{ color: SUCCESS }}>完成</span>
            </>
          ) : (
            <>
              <motion.span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: ACCENT }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' as const }}
              />
              <span style={{ color: ACCENT }}>執行中</span>
            </>
          )}
        </span>
      </div>
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' as const }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* 底部快捷 chip：捲動到對應對話段落 */
function scrollToSection(id: string) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
}

const QUICK_ACTIONS: { id: string; label: string; icon: ReactNode }[] = [
  { id: 'skills-turn', label: '看技能', icon: <Sparkles size={14} /> },
  { id: 'projects-turn', label: '看專案', icon: <FolderGit2 size={14} /> },
  { id: 'contact-turn', label: '聯絡方式', icon: <Mail size={14} /> },
]

export default function AiNative() {
  const reduced = useReducedMotion()

  const heroText = `嗨，我是 ${profile.name} 的 Agent。\n${profile.title}。\n\n${profile.intro.join('\n')}`
  const skillsIntroText = '這是我目前主要使用的技術，依領域整理成幾組給你參考：'
  const projectsIntroText = '幫你叫用一下 list_projects()，以下是目前列出的代表作品：'
  const contactText = '最直接的聯絡方式是 Email，也歡迎到 GitHub 看程式碼：'

  return (
    <div
      className="min-h-screen text-[#09090B]"
      style={{ background: '#F5F5F5', fontFamily: "'Inter', sans-serif" }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
      />

      <h1 className="sr-only">{profile.name} · Rex Agent（AI 原生介面）</h1>

      {/* 導覽列：像 AI 產品頂欄，右側顯示 agent 名稱與線上狀態 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur border-b border-[#E4E4E7]">
        <div className="max-w-2xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link
            to="/gallery"
            className="flex items-center gap-1.5 text-sm cursor-pointer transition-colors"
            style={{ color: TEXT_MUTED }}
          >
            <ArrowLeft size={15} />
            返回設計實驗室
          </Link>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              {!reduced && (
                <span
                  className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                  style={{ background: SUCCESS }}
                />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: SUCCESS }} />
            </span>
            <span className="text-sm font-semibold text-[#09090B]">Rex Agent</span>
          </div>
        </div>
      </nav>

      <main className="pt-14 max-w-2xl mx-auto px-5">
        {/* Hero：Agent 開場訊息 */}
        <section id="hero-turn" className="pt-10 pb-8">
          <AgentReply text={heroText} delay={300} showHeader />
        </section>

        {/* 技能：以對話輪次呈現 */}
        <section id="skills-turn" className="py-8 space-y-5 scroll-mt-20">
          <h2 className="sr-only">技能</h2>
          <UserMessage text="你的技能組合大概是什麼？" />
          <AgentReply text={skillsIntroText} delay={200}>
            <div className="space-y-2.5">
              {skillGroups.map((group, i) => (
                <SkillContextCard key={group.key} group={group} index={i} />
              ))}
            </div>
          </AgentReply>
        </section>

        {/* 專案：以 tool call 呈現 */}
        <section id="projects-turn" className="py-8 space-y-5 scroll-mt-20">
          <h2 className="sr-only">專案</h2>
          <UserMessage text="可以看幾個代表作品嗎？" />
          <AgentReply text={projectsIntroText} delay={200}>
            <ProjectsToolResult />
          </AgentReply>
        </section>

        {/* 聯絡 */}
        <section id="contact-turn" className="py-8 space-y-5 scroll-mt-20">
          <h2 className="sr-only">聯絡</h2>
          <UserMessage text="要怎麼聯絡到你？" />
          <AgentReply text={contactText} delay={200}>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-colors cursor-pointer hover:opacity-90"
                style={{ background: ACCENT }}
              >
                <Mail size={14} />
                {profile.email}
              </a>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#E4E4E7] text-sm font-medium text-[#09090B] hover:border-[#6366F1]/50 transition-colors cursor-pointer"
              >
                <GithubIcon size={14} />
                {profile.githubHandle}
              </a>
            </div>
          </AgentReply>
        </section>

        <footer
          className="pt-6 pb-8 text-center text-xs border-t border-[#E4E4E7]"
          style={{ color: TEXT_FAINT, fontFamily: "'JetBrains Mono', monospace" }}
        >
          © {new Date().getFullYear()} {profile.name} · session ended
        </footer>
      </main>

      {/* 底部固定快捷列：不可自由輸入，只提供示範對話 chip */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-t border-[#E4E4E7]">
        <div className="max-w-2xl mx-auto px-5 py-3">
          <div className="flex flex-wrap items-center gap-2">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.id}
                type="button"
                onClick={() => scrollToSection(action.id)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#E4E4E7] bg-[#FAFAFA] text-sm text-[#3F3F46] hover:border-[#6366F1]/50 hover:text-[#6366F1] transition-colors duration-200 cursor-pointer"
              >
                {action.icon}
                {action.label}
              </button>
            ))}
            <span
              className="ml-auto hidden sm:inline text-[11px]"
              style={{ color: TEXT_FAINT, fontFamily: "'JetBrains Mono', monospace" }}
            >
              示範對話・非即時 AI
            </span>
          </div>
          <p
            className="mt-1 text-[11px] sm:hidden"
            style={{ color: TEXT_FAINT, fontFamily: "'JetBrains Mono', monospace" }}
          >
            示範對話・非即時 AI
          </p>
        </div>
      </div>

      {/* 撐開空間，避免內容被固定底部快捷列蓋住 */}
      <div className="h-20" aria-hidden="true" />
    </div>
  )
}

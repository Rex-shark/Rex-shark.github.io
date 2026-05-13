import { useState, useRef } from 'react'
import { Link } from 'react-router'
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import {
  Mail,
  ExternalLink,
  Code2,
  Database,
  Server,
  Wrench,
  Star,
  ArrowRight,
  Calendar,
  BookOpen,
  Play,
  FileText,
} from 'lucide-react'
import { handleHashClick } from '@/lib/utils'

/* ─── GitHub Icon ─── */
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

/* ─── Ripple 按鈕（僅用於主要 CTA）─── */
interface RippleButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: 'primary' | 'outline'
  type?: 'button' | 'submit'
}

function RippleButton({ children, className = '', onClick, variant = 'primary', type = 'button' }: RippleButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])
  const btnRef = useRef<HTMLButtonElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()
    setRipples((prev) => [...prev, { x, y, id }])
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600)
    onClick?.()
  }

  const base =
    variant === 'primary'
      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
      : 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50'

  return (
    <motion.button
      ref={btnRef}
      type={type}
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`relative overflow-hidden px-6 py-3 rounded-xl font-semibold cursor-pointer transition-colors ${base} ${className}`}
    >
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{ left: r.x - 40, top: r.y - 40, width: 80, height: 80 }}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' as const }}
        />
      ))}
      {children}
    </motion.button>
  )
}

/* ─── 3D Tilt 卡片（專案區保留）─── */
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6])
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springRotateX, rotateY: springRotateY, transformStyle: 'preserve-3d' }}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  )
}

/* ─── 輕微縮放 SkillTag（收斂版）─── */
function SkillTag({ label, color }: { label: string; color: string }) {
  return (
    <motion.span
      whileHover={{ scale: 1.05, transition: { duration: 0.15, ease: 'easeOut' as const } }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer select-none transition-shadow hover:shadow-sm"
      style={{ background: `${color}14`, color, border: `1.5px solid ${color}35` }}
    >
      {label}
    </motion.span>
  )
}

/* ─── 底線滑入導覽連結 ─── */
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      onClick={handleHashClick}
      className="relative text-slate-600 hover:text-indigo-600 text-sm font-medium transition-colors cursor-pointer"
      whileHover="hover"
    >
      {children}
      <motion.span
        className="absolute bottom-0 left-0 h-0.5 bg-indigo-500 rounded-full"
        variants={{ hover: { width: '100%' }, initial: { width: '0%' } }}
        initial="initial"
        style={{ width: '0%' }}
        transition={{ duration: 0.22, ease: 'easeOut' as const }}
      />
    </motion.a>
  )
}

/* ─── 資料 ─── */
const skillGroups = [
  {
    label: '後端',
    icon: Server,
    color: '#6366F1',
    skills: ['Java', 'Spring Boot', 'Spring Security', 'JPA/Hibernate'],
  },
  {
    label: '前端',
    icon: Code2,
    color: '#8B5CF6',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    label: '資料庫 / DevOps',
    icon: Database,
    color: '#06B6D4',
    skills: ['PostgreSQL', 'Docker', 'GitHub Actions'],
  },
  {
    label: '系統設計',
    icon: Wrench,
    color: '#10B981',
    skills: ['系統分析', 'UML', 'ERD'],
  },
]

interface Project {
  title: string
  desc: string
  tags: string[]
  color: string
  stars: number
  href: string
  to?: string
}

const projects: Project[] = [
  {
    title: '個人網站',
    desc: '用 20 種不同設計風格實作的個人網站（即本站），最終選定 Finalist 為正式首頁。React 19 + Vite 8 + Tailwind v4，部署於 GitHub Pages。',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    color: '#6366F1',
    stars: 0,
    href: 'https://github.com/Rex-shark/Rex-shark.github.io',
    to: '/gallery',
  },
  {
    title: 'Spring Boot API 範例',
    desc: '完整的 RESTful API 範例，包含 JWT 認證、角色控管、JPA 資料存取層。',
    tags: ['Java', 'Spring Boot', 'PostgreSQL'],
    color: '#8B5CF6',
    stars: 0,
    href: 'https://github.com/Rex-shark',
    to: '/projects/spring-boot-api',
  },
  {
    title: 'ThreadsBot',
    desc: '本地 LLM 自動爬新聞、改寫成 Threads 貼文。Spring Boot 3 + Spring AI + Ollama，零 API 成本。',
    tags: ['Java', 'Spring AI', 'Ollama'],
    color: '#10B981',
    stars: 0,
    href: 'https://github.com/Rex-shark/ThreadsBot',
    to: '/projects/threads-bot',
  },
  {
    title: 'Claude Code 原始碼研究',
    desc: '從 sourcemap 還原 Claude Code v2.1.88，拆解 6 層架構與 14 區塊 System Prompt 設計，整理成 5 篇深度筆記。非官方研究，版權歸 Anthropic。',
    tags: ['TypeScript', 'Research', 'AI Agent'],
    color: '#9333EA',
    stars: 0,
    href: 'https://github.com/Rex-shark/claude-code-sourcemap',
    to: '/projects/claude-code-sourcemap',
  },
]

/* ─── 好文分享：tag 配色與來源類型偵測 ─── */
const TAG_COLOR: Record<string, string> = {
  AI: '#6366F1',
  Agent: '#8B5CF6',
  Skills: '#10B981',
  GitHub: '#475569',
  UIUX: '#EC4899',
  'AI 生圖': '#F43F5E',
  '筆記': '#F59E0B',
  Java: '#EA580C',
}

function getSourceType(url: string): 'video' | 'repo' | 'article' {
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'video'
  if (url.includes('github.com')) return 'repo'
  return 'article'
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

interface Article {
  title: string
  url: string
  tags: string[]
  date: string
}

/* 來源：spec/article/data.md（不要直接編輯這個陣列，改 data.md 後同步） */
const articles: Article[] = [
  {
    title: 'mattpocock-skills：真實工程師常用技能庫，github 超火開源 AI 程式設計技能組合',
    url: 'https://www.youtube.com/watch?v=2nwnpyX90NY',
    tags: ['AI', 'Skills', 'GitHub'],
    date: '2026-04',
  },
  {
    title: 'Claude Code 之父 Boris Cherny 親授：8 個你沒在用的進階技巧',
    url: 'https://www.techhanlin.tw/claude-code-tips-boris-cherny-advanced-techniques/',
    tags: ['AI'],
    date: '2026-04',
  },
  {
    title: '就算沒有設計師，你的專案也能長得像蘋果！AI 時代必備的 UI 魔法書',
    url: 'https://github.com/VoltAgent/awesome-design-md',
    tags: ['AI', 'UIUX', 'Skills', 'GitHub'],
    date: '2026-04',
  },
  {
    title: '設計風格視覺網站',
    url: 'https://getdesign.md/',
    tags: ['UIUX'],
    date: '2026-04',
  },
  {
    title: 'RAG 技術深度解析與商業化落地指南！從原理到工程實戰！',
    url: 'https://www.youtube.com/watch?v=orGQR7sNpSk',
    tags: ['AI'],
    date: '2026-04',
  },
  {
    title: '200 份文件 10 秒變 Markdown？微軟開源 MarkItDown 從安裝到接進 AI Agent',
    url: 'https://www.youtube.com/watch?v=J3BLAA_cAiY',
    tags: ['AI', '筆記', 'Skills', 'GitHub'],
    date: '2026-04',
  },
  {
    title: 'Z-Image Turbo 本地安裝指南：文生圖 AI 模型',
    url: 'https://www.freedidi.com/22006.html',
    tags: ['AI', 'AI 生圖'],
    date: '2026-04',
  },
  {
    title: 'Obsidian 必裝插件｜新手第一週就該知道的 8 個神器',
    url: 'https://www.youtube.com/watch?v=VthfkQFQJJg',
    tags: ['筆記'],
    date: '2026-04',
  },
  {
    title: '矽谷頂尖 AI 大佬如何搭建個人 AI 知識庫？從 0 開始用 Claude Code + Obsidian 搭建 Karpathy 的 LLM Wiki 知識庫',
    url: 'https://www.youtube.com/watch?v=CTyx5XF2KVA',
    tags: ['AI', '筆記', 'Skills', 'GitHub'],
    date: '2026-04',
  },
  {
    title: '最近爆火的 Harness Engineering',
    url: 'https://www.youtube.com/watch?v=3DlXq9nsQOE',
    tags: ['AI', 'Agent'],
    date: '2026-04',
  },
  {
    title: 'ComfyUI 是什麼？快速認識新一代圖像生成工具',
    url: 'https://www.leadadds.com/zh/learning-centre/what-is-comfyui/',
    tags: ['AI', 'AI 生圖'],
    date: '2026-04',
  },
  {
    title: '這套數萬星的開源配置讓 AI 瞬間變身資深工程師！',
    url: 'https://github.com/affaan-m/everything-claude-code',
    tags: ['AI', 'Skills', 'GitHub'],
    date: '2026-04',
  },
  {
    title: '從 Prompt 到 Harness：Agent 生產化三層演化鏈',
    url: 'https://www.youtube.com/watch?v=Mr78CQpNmsg',
    tags: ['AI', 'Agent'],
    date: '2026-04',
  },
  {
    title: 'Camiol 用 JAVA + Heroku CLI 建立自己的 Line Robot',
    url: 'https://hackmd.io/@camiol/rkkacf-j5',
    tags: ['Java'],
    date: '2026-04',
  },
  {
    title: '你的數位足跡安全嗎？用這款萬星 GitHub 工具，一鍵搜出你註冊過的 3000 個網站！',
    url: 'https://www.facebook.com/groups/datasci.tw/permalink/26677549721895732/',
    tags: ['GitHub'],
    date: '2026-04',
  },
  {
    title: '用 Superpowers 幫你的 Coding Agent 建立標準 SOP！',
    url: 'https://github.com/obra/superpowers',
    tags: ['AI', 'Agent', 'Skills', 'GitHub'],
    date: '2026-04',
  },
]

const aboutCards = [
  {
    icon: Server,
    color: '#6366F1',
    title: '目前職位',
    content: 'Java 全端工程師 & 系統分析師，專注後端服務設計與系統整合。',
  },
  {
    icon: Code2,
    color: '#8B5CF6',
    title: '專長領域',
    content: 'Spring Boot 微服務、RESTful API 設計、資料庫架構規劃。',
  },
  {
    icon: BookOpen,
    color: '#06B6D4',
    title: '技術興趣',
    content: '系統分析方法論、效能調優、技術文章撰寫與知識分享。',
  },
]

/* ─── 動畫 Variants ─── */
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
}

/* ─── 文章列表項目 ─── */
function SourceTypeIcon({ type }: { type: 'video' | 'repo' | 'article' }) {
  if (type === 'video') return <Play size={14} className="text-rose-500 fill-rose-500" />
  if (type === 'repo') return <GithubIcon className="w-3.5 h-3.5 text-slate-700" />
  return <FileText size={14} className="text-indigo-500" />
}

function ArticleRow({ article, index }: { article: Article; index: number }) {
  const [hovered, setHovered] = useState(false)
  const sourceType = getSourceType(article.url)
  const domain = getDomain(article.url)

  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0, x: hovered ? 4 : 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' as const, delay: index * 0.04 }}
      className="group flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-5 px-5 py-4 rounded-xl cursor-pointer transition-colors duration-150 no-underline"
      style={{ backgroundColor: hovered ? '#F8F8FF' : 'transparent' }}
    >
      {/* 左側：來源類型 icon */}
      <div className="flex items-center gap-1.5 shrink-0 sm:pt-0.5">
        <SourceTypeIcon type={sourceType} />
        <span className="sm:hidden text-[11px] text-slate-400 uppercase tracking-wide">
          {sourceType === 'video' ? '影片' : sourceType === 'repo' ? '倉庫' : '文章'}
        </span>
      </div>

      {/* 中間：標題 + 來源網域 + tags */}
      <div className="flex-1 min-w-0">
        <div className="relative inline-block">
          <span className="font-semibold text-slate-900 text-sm leading-snug group-hover:text-indigo-700 transition-colors">
            {article.title}
          </span>
          <AnimatePresence>
            {hovered && (
              <motion.span
                key="underline"
                className="absolute bottom-0 left-0 h-0.5 bg-indigo-500 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                exit={{ width: '0%' }}
                transition={{ duration: 0.22, ease: 'easeOut' as const }}
              />
            )}
          </AnimatePresence>
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1.5">
          {domain && (
            <span className="text-[11px] text-slate-400 truncate max-w-[180px]">{domain}</span>
          )}
          {article.tags.map((tag) => {
            const color = TAG_COLOR[tag] ?? '#64748B'
            return (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap"
                style={{
                  backgroundColor: `${color}14`,
                  color,
                  border: `1px solid ${color}30`,
                }}
              >
                {tag}
              </span>
            )
          })}
        </div>
      </div>

      {/* 右側：日期 */}
      <div className="flex items-center gap-1 text-slate-400 text-xs whitespace-nowrap shrink-0 sm:w-20 justify-end sm:pt-0.5">
        <Calendar size={11} />
        {article.date}
      </div>
    </motion.a>
  )
}

/* ─── 文章篩選與列表 ─── */
function ArticleFilterAndList() {
  const [activeTag, setActiveTag] = useState<string>('全部')

  const allTags = ['全部', ...Object.keys(TAG_COLOR)]

  const filtered = activeTag === '全部'
    ? articles
    : articles.filter((a) => a.tags.includes(activeTag))

  const getCount = (name: string) =>
    name === '全部' ? articles.length : articles.filter((a) => a.tags.includes(name)).length

  return (
    <>
      {/* 篩選 chip */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {allTags.map((tag) => {
          const color = tag === '全部' ? '#6366F1' : (TAG_COLOR[tag] ?? '#64748B')
          const isActive = activeTag === tag
          const count = getCount(tag)
          if (count === 0 && tag !== '全部') return null
          return (
            <motion.button
              key={tag}
              onClick={() => setActiveTag(tag)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15, ease: 'easeOut' as const }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors duration-150"
              style={{
                backgroundColor: isActive ? color : `${color}10`,
                color: isActive ? '#FFFFFF' : color,
                border: `1px solid ${isActive ? color : `${color}30`}`,
              }}
            >
              {tag}
              <span
                className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold"
                style={{
                  backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : `${color}1F`,
                  color: isActive ? '#FFFFFF' : color,
                }}
              >
                {count}
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* 文章列表 */}
      <motion.div
        key={activeTag}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' as const }}
        className="divide-y divide-slate-100"
      >
        {filtered.map((article, index) => (
          <ArticleRow key={article.url} article={article} index={index} />
        ))}
        {filtered.length === 0 && (
          <div className="py-12 text-center text-slate-400 text-sm">這個分類目前沒有文章</div>
        )}
      </motion.div>
    </>
  )
}

/* ─── 主元件 ─── */
export default function Finalist() {
  return (
    <div
      className="min-h-screen bg-white text-slate-800"
      style={{ fontFamily: "'Inter', 'system-ui', sans-serif" }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
      />

      {/* 固定導覽列 */}
      <motion.nav
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' as const }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200/70"
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          <Link
            to="/"
            className="text-slate-900 font-bold text-lg tracking-tight hover:text-indigo-600 transition-colors cursor-pointer"
          >
            Rex<span className="text-indigo-500">.</span>
          </Link>
          <div className="hidden md:flex items-center gap-7">
            <NavLink href="#about">關於</NavLink>
            <NavLink href="#skills">技能</NavLink>
            <NavLink href="#projects">專案</NavLink>
            <NavLink href="#articles">文章</NavLink>
            <NavLink href="#contact">聯絡</NavLink>
          </div>
          <motion.div whileHover={{ x: 3 }} transition={{ type: 'spring', stiffness: 400 }}>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 transition-colors text-sm font-medium cursor-pointer"
            >
              設計實驗室
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </motion.nav>

      {/* ─── Hero ─── */}
      <section id="hero" className="pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-14">
          {/* 文字 */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center md:text-left"
          >
            <motion.p
              variants={itemVariants}
              className="text-indigo-500 font-semibold text-xs tracking-widest uppercase mb-3"
            >
              Java Full-Stack Engineer & System Analyst
            </motion.p>
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl font-extrabold text-slate-900 mb-5 leading-tight"
            >
              Hi, I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
                Rex
              </span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-slate-500 text-lg leading-relaxed max-w-lg mb-9"
            >
              從後端核心架構到前端使用者體驗，為複雜需求提供優雅的系統解決方案。
              目前專注於 Agentic Engineering，探索 AI Agent 在軟體工程中的無限可能。
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 justify-center md:justify-start"
            >
              <RippleButton
                variant="primary"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="flex items-center gap-2">
                  查看作品
                  <ArrowRight size={15} />
                </span>
              </RippleButton>
            </motion.div>
          </motion.div>

          {/* 照片 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, type: 'spring', stiffness: 180 }}
            className="relative shrink-0"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' as const }}
              className="relative"
            >
              {/* 裝飾光圈 */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-200 to-violet-200 blur-xl opacity-60 scale-110" />
              <div className="relative w-52 h-52 rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-indigo-200">
                <img src="/me.png" alt="Rex" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            {/* 在線指示器 */}
            <motion.div
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
              className="absolute -bottom-2 -right-2 bg-emerald-400 rounded-full w-6 h-6 border-4 border-white"
            />
          </motion.div>
        </div>
      </section>

      {/* ─── 關於我（三欄資訊卡）─── */}
      <motion.section
        id="about"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="py-16 px-6 bg-slate-50/70"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-indigo-500 font-semibold text-xs tracking-widest uppercase mb-2">About Me</p>
            <h2 className="text-3xl font-bold text-slate-900">關於我</h2>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-5"
          >
            {aboutCards.map((card) => (
              <motion.div
                key={card.title}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' as const } }}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${card.color}14` }}
                >
                  <card.icon size={18} style={{ color: card.color }} />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">{card.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{card.content}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ─── 技能 ─── */}
      <motion.section
        id="skills"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="py-20 px-6 bg-white"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-indigo-500 font-semibold text-xs tracking-widest uppercase mb-2">Skills</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">技術能力</h2>
            <p className="text-slate-400 text-sm">懸停標籤，感受輕微縮放回饋</p>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {skillGroups.map((group) => (
              <motion.div
                key={group.label}
                variants={itemVariants}
                className="bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:border-indigo-100 transition-colors duration-200"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: `${group.color}14` }}
                  >
                    <group.icon size={15} style={{ color: group.color }} />
                  </div>
                  <span className="font-semibold text-slate-700 text-sm">{group.label}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((s) => (
                    <SkillTag key={s} label={s} color={group.color} />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ─── 精選專案 ─── */}
      <motion.section
        id="projects"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="py-20 px-6 bg-slate-50/70"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-indigo-500 font-semibold text-xs tracking-widest uppercase mb-2">Projects</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">精選專案</h2>
            <p className="text-slate-400 text-sm">懸停卡片，感受 3D 傾斜效果</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((p) => {
              const cardInner = (
                <div className="h-full bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-lg hover:shadow-indigo-100 transition-shadow duration-300 group">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${p.color}14`, color: p.color }}
                    >
                      <GithubIcon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1 text-slate-400 text-xs">
                      <Star size={12} />
                      {p.stars}
                    </div>
                  </div>
                  <h3
                    className={`font-bold text-slate-900 mb-2 ${p.to ? 'group-hover:text-indigo-600 transition-colors' : ''}`}
                  >
                    {p.title}
                    {p.to && (
                      <ArrowRight
                        size={14}
                        className="inline-block ml-1 -mt-0.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                      />
                    )}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: `${p.color}12`, color: p.color }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-indigo-500 transition-colors cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              )
              return (
                <TiltCard key={p.title} className="h-full">
                  {p.to ? (
                    <Link to={p.to} className="block h-full cursor-pointer">
                      {cardInner}
                    </Link>
                  ) : (
                    cardInner
                  )}
                </TiltCard>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* ─── 好文分享 ─── */}
      <motion.section
        id="articles"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="py-20 px-6 bg-white"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-indigo-500 font-semibold text-xs tracking-widest uppercase mb-2">Bookmarks</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">好文分享</h2>
            <p className="text-slate-400 text-sm">看到的好文章、影片、開源專案，按主題整理</p>
          </div>

          <ArticleFilterAndList />
        </div>
      </motion.section>

      {/* ─── 聯絡 ─── */}
      <motion.section
        id="contact"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="py-24 px-6 bg-gradient-to-br from-indigo-50 to-violet-50"
      >
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-indigo-500 font-semibold text-xs tracking-widest uppercase mb-3">Contact</p>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">想聊聊？</h2>
          <p className="text-slate-500 mb-10 leading-relaxed text-lg">
            無論是合作提案、技術交流或任何問題，都歡迎隨時聯繫。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <RippleButton
              variant="primary"
              onClick={() => window.open('mailto:rexrex10050@gmail.com')}
            >
              <span className="flex items-center gap-2">
                <Mail size={16} />
                寄信給我
              </span>
            </RippleButton>
            <motion.a
              href="https://github.com/Rex-shark"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 border-indigo-300 text-indigo-600 hover:bg-indigo-50 transition-colors duration-200 cursor-pointer"
            >
              <GithubIcon className="w-4 h-4" />
              GitHub
              <ExternalLink size={13} />
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-slate-100">
        <p className="text-slate-400 text-sm">© 2025 Rex · Java 全端工程師 & 系統分析師</p>
        <p className="text-slate-300 text-xs mt-1">Built with React + Vite · Deployed on GitHub Pages</p>
      </footer>
    </div>
  )
}

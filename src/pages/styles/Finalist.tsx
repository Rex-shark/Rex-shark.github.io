import { useState, useRef } from 'react'
import { Link } from 'react-router'
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import {
  ArrowLeft,
  Mail,
  ExternalLink,
  Code2,
  Database,
  Server,
  Wrench,
  Star,
  Download,
  ArrowRight,
  Calendar,
  Clock,
  BookOpen,
  ChevronRight,
} from 'lucide-react'

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
      className="relative text-slate-600 hover:text-indigo-600 text-sm font-medium transition-colors"
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
    desc: '風格導覽型個人網站，展示多種設計風格，使用 React + Vite 部署於 GitHub Pages。',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    color: '#6366F1',
    stars: 12,
    href: 'https://github.com/Rex-shark',
  },
  {
    title: 'Spring Boot API 範例',
    desc: '完整的 RESTful API 範例，包含 JWT 認證、角色控管、JPA 資料存取層。',
    tags: ['Java', 'Spring Boot', 'PostgreSQL'],
    color: '#8B5CF6',
    stars: 28,
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
    title: '系統分析設計教學',
    desc: 'UML、需求分析、架構設計的完整教材，適合想學習系統設計的開發者。',
    tags: ['系統設計', 'UML', '架構'],
    color: '#06B6D4',
    stars: 19,
    href: 'https://github.com/Rex-shark',
  },
]

interface Article {
  category: string
  categoryColor: string
  date: string
  readTime: string
  title: string
  summary: string
}

const articles: Article[] = [
  {
    category: '技術分享',
    categoryColor: '#3B82F6',
    date: '2025-04-22',
    readTime: '10 min read',
    title: 'Spring Boot 3 整合 JWT 認證：從零到生產的完整實作',
    summary: '手把手實作 JWT 簽發、刷新與黑名單機制，並比較 Spring Security 6 的設計變化。',
  },
  {
    category: '系統分析',
    categoryColor: '#8B5CF6',
    date: '2025-04-08',
    readTime: '15 min read',
    title: '從需求訪談到資料模型：一次完整的系統分析流程',
    summary: '以一個真實的進銷存系統為例，記錄訪談、用例圖、ERD 到資料字典的完整推導過程。',
  },
  {
    category: '工作心得',
    categoryColor: '#EC4899',
    date: '2025-03-25',
    readTime: '6 min read',
    title: '工程師如何寫好系統分析文件：給後端開發者的實用指南',
    summary: '好的 SA 文件能省下 70% 的重工，分享四個關鍵章節與常見錯誤。',
  },
  {
    category: '學習筆記',
    categoryColor: '#10B981',
    date: '2025-03-12',
    readTime: '8 min read',
    title: 'React 19 Compiler 試用心得：自動 memo 化的真實效益',
    summary: '實測 React 19 編譯器在中型專案的效能提升與限制，附 before/after 比較。',
  },
  {
    category: '技術分享',
    categoryColor: '#3B82F6',
    date: '2025-02-28',
    readTime: '12 min read',
    title: 'Tailwind CSS v4 + Vite 8 升級實戰：踩坑與最佳實踐',
    summary: '升級過程中遇到的設定變化、CSS 變數新寫法、以及效能改善的具體數據。',
  },
  {
    category: '系統分析',
    categoryColor: '#8B5CF6',
    date: '2025-02-14',
    readTime: '11 min read',
    title: 'ERD 設計實戰：從多對多關聯到第三正規化的決策過程',
    summary: '透過電商訂單系統範例，說明何時該拆關聯表、何時該反正規化，以及索引策略的取捨。',
  },
  {
    category: '工作心得',
    categoryColor: '#EC4899',
    date: '2025-01-30',
    readTime: '7 min read',
    title: '從工程師到系統分析師：兩年轉型路上的五個體悟',
    summary: '記錄從寫程式到帶需求的角色轉換，分享那些前端工程師職涯沒人告訴你的軟實力修練。',
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
function ArticleRow({ article, index }: { article: Article; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      role="link"
      tabIndex={0}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0, x: hovered ? 4 : 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' as const, delay: index * 0.04 }}
      className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 px-5 py-4 rounded-xl cursor-pointer transition-colors duration-150"
      style={{ backgroundColor: hovered ? '#F8F8FF' : 'transparent' }}
    >
      {/* 左側：類別 + 日期 */}
      <div className="flex items-center gap-3 sm:w-52 shrink-0">
        <span
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap"
          style={{
            backgroundColor: `${article.categoryColor}14`,
            color: article.categoryColor,
            border: `1px solid ${article.categoryColor}30`,
          }}
        >
          {article.category}
        </span>
        <span className="flex items-center gap-1 text-slate-400 text-xs whitespace-nowrap">
          <Calendar size={11} />
          {article.date}
        </span>
      </div>

      {/* 中間：標題 + 摘要 */}
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
        <p className="text-slate-500 text-xs mt-0.5 leading-relaxed line-clamp-1">{article.summary}</p>
      </div>

      {/* 右側：閱讀時間 */}
      <div className="flex items-center gap-1.5 text-slate-400 text-xs whitespace-nowrap shrink-0 sm:w-24 justify-end">
        <Clock size={11} />
        {article.readTime}
      </div>
    </motion.div>
  )
}

/* ─── 文章篩選與列表 ─── */
function ArticleFilterAndList() {
  const [activeCategory, setActiveCategory] = useState<string>('全部')

  const categories = [
    { name: '全部', color: '#6366F1' },
    { name: '技術分享', color: '#3B82F6' },
    { name: '系統分析', color: '#8B5CF6' },
    { name: '工作心得', color: '#EC4899' },
    { name: '學習筆記', color: '#10B981' },
  ]

  const filtered = activeCategory === '全部'
    ? articles
    : articles.filter((a) => a.category === activeCategory)

  const getCount = (name: string) =>
    name === '全部' ? articles.length : articles.filter((a) => a.category === name).length

  return (
    <>
      {/* 篩選 chip */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.name
          const count = getCount(cat.name)
          return (
            <motion.button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15, ease: 'easeOut' as const }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors duration-150"
              style={{
                backgroundColor: isActive ? cat.color : `${cat.color}10`,
                color: isActive ? '#FFFFFF' : cat.color,
                border: `1px solid ${isActive ? cat.color : `${cat.color}30`}`,
              }}
            >
              {cat.name}
              <span
                className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold"
                style={{
                  backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : `${cat.color}1F`,
                  color: isActive ? '#FFFFFF' : cat.color,
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
        key={activeCategory}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' as const }}
        className="divide-y divide-slate-100"
      >
        {filtered.map((article, index) => (
          <ArticleRow key={article.title} article={article} index={index} />
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
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.div whileHover={{ x: -3 }} transition={{ type: 'spring', stiffness: 400 }}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors text-sm font-medium cursor-pointer"
            >
              <ArrowLeft size={15} />
              返回風格選擇
            </Link>
          </motion.div>
          <div className="hidden sm:flex items-center gap-7">
            <NavLink href="#about">關於</NavLink>
            <NavLink href="#skills">技能</NavLink>
            <NavLink href="#projects">專案</NavLink>
            <NavLink href="#articles">文章</NavLink>
            <NavLink href="#contact">聯絡</NavLink>
          </div>
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
              熱衷於後端系統架構設計與系統分析方法論，擅長以 Spring Boot 打造穩健的 API 服務，並持續透過技術文章分享實戰經驗與學習心得。
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
              <motion.a
                href="#"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 border-slate-300 text-slate-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors duration-200 cursor-pointer"
              >
                <Download size={15} />
                下載履歷
              </motion.a>
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

      {/* ─── 最新文章 ─── */}
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
            <p className="text-indigo-500 font-semibold text-xs tracking-widest uppercase mb-2">Articles</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">最新文章</h2>
            <p className="text-slate-400 text-sm">懸停列，感受位移與底線效果</p>
          </div>

          <ArticleFilterAndList />

          <div className="mt-8 text-center">
            <motion.button
              type="button"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.18, ease: 'easeOut' as const }}
              className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 font-medium text-sm cursor-pointer transition-colors bg-transparent border-0"
            >
              查看所有文章
              <ChevronRight size={15} />
            </motion.button>
          </div>
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

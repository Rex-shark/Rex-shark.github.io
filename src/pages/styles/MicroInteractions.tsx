import { useState, useRef } from 'react'
import { Link } from 'react-router'
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowLeft, Mail, ExternalLink, Code2, Database, Server, Wrench, Bot, Hand } from 'lucide-react'
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

/* ─── Ripple 按鈕元件 ─── */
interface RippleButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: 'primary' | 'outline'
}

function RippleButton({ children, className = '', onClick, variant = 'primary' }: RippleButtonProps) {
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
      onClick={handleClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
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

/* ─── 3D Tilt 卡片 ─── */
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8])
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
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  )
}

/* ─── 彈跳技能 Tag ─── */
function SkillTag({ label, icon: Icon, color }: { label: string; icon?: React.ElementType; color: string }) {
  return (
    <motion.span
      whileHover={{ scale: 1.15, rotate: [-1, 1, -1, 0], transition: { rotate: { duration: 0.3 } } }}
      whileTap={{ scale: 0.9 }}
      className="inline-flex max-w-full items-center gap-1.5 px-3 py-1.5 rounded-2xl text-sm font-medium text-left cursor-pointer select-none"
      style={{ background: `${color}18`, color, border: `1.5px solid ${color}40` }}
    >
      {Icon && <Icon size={13} />}
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
      className="relative text-slate-600 hover:text-indigo-600 text-sm font-medium transition-colors"
      whileHover="hover"
    >
      {children}
      <motion.span
        className="absolute bottom-0 left-0 h-0.5 bg-indigo-500 rounded-full"
        variants={{ hover: { width: '100%' }, initial: { width: '0%' } }}
        initial="initial"
        style={{ width: '0%' }}
        transition={{ duration: 0.25, ease: 'easeOut' as const }}
      />
    </motion.a>
  )
}

/* ─── 資料（內容來自 src/data/profile.ts，這裡只補上本頁的 icon、配色與版面） ─── */
const SKILL_GROUP_STYLE: Record<SkillGroupKey, { icon: typeof Server; color: string; span: string }> = {
  backend: { icon: Server, color: '#6366F1', span: '' },
  frontend: { icon: Code2, color: '#8B5CF6', span: '' },
  data: { icon: Database, color: '#06B6D4', span: '' },
  // AI 組項目多、字串長，佔兩欄
  ai: { icon: Bot, color: '#EC4899', span: 'sm:col-span-2' },
  design: { icon: Wrench, color: '#10B981', span: '' },
}

const skillGroups = sharedSkillGroups.map((g) => ({ ...g, ...SKILL_GROUP_STYLE[g.key] }))

const PROJECT_COLORS = ['#6366F1', '#8B5CF6', '#06B6D4', '#EC4899', '#10B981']
// 5 張卡：md 以上為 3 + 2（6 欄格線）
const PROJECT_SPAN = ['md:col-span-2', 'md:col-span-2', 'md:col-span-2', 'md:col-span-3', 'md:col-span-3']

const projects = sharedProjects.map((p, i) => ({
  ...p,
  color: PROJECT_COLORS[i % PROJECT_COLORS.length],
  span: PROJECT_SPAN[i % PROJECT_SPAN.length],
}))

/* ─── 動畫 Variants ─── */
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
}

export default function MicroInteractions() {
  return (
    <div className="min-h-screen bg-[#F8F9FF] text-slate-800" style={{ fontFamily: "'Inter', 'system-ui', sans-serif" }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" />

      {/* 導覽列 */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60"
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.div whileHover={{ x: -3 }} transition={{ type: 'spring', stiffness: 400 }}>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors text-sm font-medium"
            >
              <ArrowLeft size={16} />
              返回設計實驗室
            </Link>
          </motion.div>
          <div className="hidden sm:flex items-center gap-6">
            <NavLink href="#about">關於</NavLink>
            <NavLink href="#skills">技能</NavLink>
            <NavLink href="#projects">專案</NavLink>
            <NavLink href="#contact">聯絡</NavLink>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section id="about" className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* 照片 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 200 }}
            whileHover={{ rotate: 3, scale: 1.03 }}
            className="relative shrink-0"
          >
            <div className="w-44 h-44 rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-indigo-200">
              <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
            </div>
            {/* 脈動裝飾點（純微互動裝飾，不代表任何狀態） */}
            <motion.div
              aria-hidden="true"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -bottom-2 -right-2 bg-indigo-400 rounded-full w-6 h-6 border-4 border-white"
            />
          </motion.div>

          {/* 文字 */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center md:text-left"
          >
            <motion.p variants={itemVariants} className="text-indigo-500 font-semibold text-sm tracking-widest uppercase mb-2">
              {profile.title}
            </motion.p>
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4"
            >
              {profile.name}
              <motion.span
                aria-hidden="true"
                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                transition={{ duration: 1.5, delay: 1, repeat: Infinity, repeatDelay: 3 }}
                className="inline-block ml-3 align-middle text-indigo-500 origin-bottom"
              >
                <Hand className="w-9 h-9 sm:w-11 sm:h-11" strokeWidth={2.2} />
              </motion.span>
            </motion.h1>
            <motion.div variants={itemVariants} className="max-w-md mb-8 space-y-2 mx-auto md:mx-0">
              {profile.intro.map((line) => (
                <p key={line} className="text-slate-500 text-lg leading-relaxed">
                  {line}
                </p>
              ))}
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 justify-center md:justify-start">
              <RippleButton variant="primary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                聯絡我
              </RippleButton>
              <RippleButton variant="outline" onClick={() => window.open(profile.githubUrl, '_blank', 'noopener,noreferrer')}>
                GitHub
              </RippleButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 技能 */}
      <motion.section
        id="skills"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="py-20 px-6 bg-white"
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-slate-900 mb-2 text-center"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            技能專長
          </motion.h2>
          <motion.p className="text-slate-400 text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            懸停技能標籤，感受彈跳回饋
          </motion.p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skillGroups.map((group) => (
              <motion.div
                key={group.label}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className={`bg-slate-50 rounded-2xl p-5 border border-slate-100 ${group.span}`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${group.color}18` }}>
                    <group.icon size={16} style={{ color: group.color }} />
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

      {/* 專案 */}
      <motion.section
        id="projects"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="py-20 px-6"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">專案作品</h2>
          <p className="text-slate-400 text-center mb-12">懸停卡片，感受 3D 傾斜效果</p>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {projects.map((p) => (
              <TiltCard key={p.slug} className={`relative h-full ${p.span}`}>
                {/* 整張卡連到站內頁；repo 連結放在 Link 之外（絕對定位），避免巢狀 <a> */}
                <Link
                  to={p.to}
                  className="flex flex-col h-full bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-lg hover:shadow-indigo-100 transition-shadow cursor-pointer focus-visible:outline-2 focus-visible:outline-indigo-500"
                >
                  <div className="mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${p.color}15`, color: p.color }}>
                      <GithubIcon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{p.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4 grow">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${p.color}12`, color: p.color }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </Link>
                <motion.a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`在 GitHub 開啟 ${p.title}`}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  className="absolute top-6 right-6 inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer px-2 py-1 rounded-lg hover:bg-indigo-50"
                >
                  GitHub
                  <ExternalLink size={12} />
                </motion.a>
              </TiltCard>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 聯絡 */}
      <motion.section
        id="contact"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="py-20 px-6 bg-white"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">聯絡我</h2>
          <p className="text-slate-500 mb-10 leading-relaxed">技術交流或任何問題，歡迎來信聯繫。</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <RippleButton variant="primary" onClick={() => { window.location.href = `mailto:${profile.email}` }}>
              <span className="flex items-center gap-2">
                <Mail size={16} />
                {profile.email}
              </span>
            </RippleButton>
            <RippleButton variant="outline" onClick={() => window.open(profile.githubUrl, '_blank', 'noopener,noreferrer')}>
              <span className="flex items-center gap-2">
                <GithubIcon className="w-4 h-4" />
                GitHub
                <ExternalLink size={13} />
              </span>
            </RippleButton>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-400 text-sm border-t border-slate-100">
        © {new Date().getFullYear()} {profile.name} · {profile.title}
      </footer>
    </div>
  )
}

import { Link } from 'react-router'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowLeft, Mail, ExternalLink, Code2, Database, Server, Wrench, Globe, GitBranch, BookOpen } from 'lucide-react'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

/* ─── Bento 卡片元件 ─── */
interface BentoCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  colSpan?: number
  rowSpan?: number
  accent?: string
}

function BentoCard({ children, className = '', style }: BentoCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`rounded-2xl border border-white/10 overflow-hidden cursor-pointer ${className}`}
      style={{ background: '#1A1A1E', ...style }}
    >
      {children}
    </motion.div>
  )
}

/* ─── 資料 ─── */
const skillGroups = [
  { label: 'Java', icon: Server, color: '#F97316', bg: '#F9731615', desc: '後端主力' },
  { label: 'Spring Boot', icon: Server, color: '#22C55E', bg: '#22C55E15', desc: 'REST API' },
  { label: 'React', icon: Code2, color: '#38BDF8', bg: '#38BDF815', desc: '前端框架' },
  { label: 'PostgreSQL', icon: Database, color: '#A78BFA', bg: '#A78BFA15', desc: '關聯式資料庫' },
  { label: 'Docker', icon: Wrench, color: '#FB7185', bg: '#FB718515', desc: '容器化部署' },
  { label: 'TypeScript', icon: Code2, color: '#FBBF24', bg: '#FBBF2415', desc: '型別安全' },
]

const projects = [
  {
    title: '個人網站',
    desc: '風格導覽型個人網站，展示多種設計風格，使用 React + Vite 部署於 GitHub Pages。',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    color: '#38BDF8',
    icon: Globe,
    featured: true,
  },
  {
    title: 'Spring Boot API 範例',
    desc: '完整的 RESTful API 範例，包含 JWT 認證、角色控管。',
    tags: ['Java', 'Spring Boot'],
    color: '#22C55E',
    icon: GitBranch,
    featured: false,
  },
  {
    title: '系統分析設計教學',
    desc: 'UML、需求分析、架構設計完整教材。',
    tags: ['UML', '架構'],
    color: '#A78BFA',
    icon: BookOpen,
    featured: false,
  },
]

/* ─── 動畫 ─── */
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export default function BentoGrid() {
  return (
    <div
      className="min-h-screen text-white"
      style={{
        background: '#0F0F11',
        fontFamily: "'Inter', 'system-ui', sans-serif",
      }}
    >
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" />

      {/* 背景點陣紋理 */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* 導覽列 */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/10"
        style={{ background: 'rgba(15,15,17,0.85)', backdropFilter: 'blur(16px)' }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.div whileHover={{ x: -3 }} transition={{ type: 'spring', stiffness: 400 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium">
              <ArrowLeft size={16} />
              返回風格選擇
            </Link>
          </motion.div>
          <div className="hidden sm:flex items-center gap-6">
            {['技能', '專案', '聯絡'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="text-white/50 hover:text-white transition-colors text-sm font-medium"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </motion.nav>

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">

        {/* Hero Bento Grid */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-12 gap-4 mb-6"
          id="about"
        >
          {/* 照片格 4 cols × 2 rows */}
          <motion.div variants={itemVariants} className="col-span-12 sm:col-span-4 row-span-2">
            <BentoCard className="h-full min-h-[280px] flex flex-col items-center justify-center p-8 gap-4">
              <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-white/20">
                <img src="/me.png" alt="Rex" className="w-full h-full object-cover" />
              </div>
              <div className="text-center">
                <p className="text-white/40 text-xs tracking-widest uppercase mb-1">Java 工程師</p>
                <p className="text-white/80 text-sm">系統分析師</p>
              </div>
            </BentoCard>
          </motion.div>

          {/* 名字大格 8 cols */}
          <motion.div variants={itemVariants} className="col-span-12 sm:col-span-8">
            <BentoCard
              className="p-8 flex flex-col justify-center min-h-[120px]"
              style={{ background: 'linear-gradient(135deg, #1E1B4B, #312E81)' }}
            >
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-2">
                Rex
              </h1>
              <p className="text-indigo-300 text-lg">Java 全端工程師 & 系統分析師</p>
            </BentoCard>
          </motion.div>

          {/* 簡介格 5 cols */}
          <motion.div variants={itemVariants} className="col-span-12 sm:col-span-5">
            <BentoCard className="p-6 h-full">
              <p className="text-white/60 text-sm leading-relaxed">
                熱愛構建優雅的系統架構，從後端 API 設計到前端互動體驗，致力於讓每行程式碼都有意義。
              </p>
            </BentoCard>
          </motion.div>

          {/* Email 格 3 cols */}
          <motion.div variants={itemVariants} className="col-span-12 sm:col-span-3">
            <BentoCard
              className="p-5 h-full flex items-center gap-3"
              style={{ background: '#1A1A2E' }}
            >
              <Mail size={18} className="text-indigo-400 shrink-0" />
              <span className="text-white/50 text-xs break-all">rexrex10050@gmail.com</span>
            </BentoCard>
          </motion.div>
        </motion.section>

        {/* 技能 Bento */}
        <motion.section
          id="技能"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mb-6"
        >
          <motion.h2
            variants={itemVariants}
            className="text-white/30 text-xs tracking-widest uppercase font-medium mb-4"
          >
            技能專長
          </motion.h2>
          <div className="grid grid-cols-12 gap-4">
            {skillGroups.map((s) => (
              <motion.div key={s.label} variants={itemVariants} className="col-span-6 sm:col-span-4 lg:col-span-2">
                <BentoCard className="p-5 h-full flex flex-col gap-3" style={{ background: s.bg }}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${s.color}25` }}>
                    <s.icon size={16} style={{ color: s.color }} />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{s.label}</p>
                    <p className="text-white/40 text-xs mt-0.5">{s.desc}</p>
                  </div>
                </BentoCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 專案 Bento */}
        <motion.section
          id="專案"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mb-6"
        >
          <motion.h2
            variants={itemVariants}
            className="text-white/30 text-xs tracking-widest uppercase font-medium mb-4"
          >
            專案作品
          </motion.h2>
          <div className="grid grid-cols-12 gap-4">
            {/* Featured 大格 */}
            {(() => {
              const FeaturedIcon = projects[0].icon
              return (
            <motion.div variants={itemVariants} className="col-span-12 md:col-span-8">
              <BentoCard
                className="p-8 min-h-[180px] flex flex-col justify-between"
                style={{ background: `linear-gradient(135deg, ${projects[0].color}18, ${projects[0].color}08)`, borderColor: `${projects[0].color}30` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${projects[0].color}25` }}>
                    <FeaturedIcon size={20} style={{ color: projects[0].color }} />
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full border" style={{ color: projects[0].color, borderColor: `${projects[0].color}40` }}>
                    精選
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{projects[0].title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">{projects[0].desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {projects[0].tags.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full" style={{ background: `${projects[0].color}15`, color: projects[0].color }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </BentoCard>
            </motion.div>
              )
            })()}

            {/* 兩個小格 */}
            <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
              {projects.slice(1).map((p) => {
                const PIcon = p.icon
                return (
                <motion.div key={p.title} variants={itemVariants} className="flex-1">
                  <BentoCard
                    className="p-5 h-full flex flex-col justify-between"
                    style={{ background: `${p.color}08`, borderColor: `${p.color}20` }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${p.color}20` }}>
                        <PIcon size={14} style={{ color: p.color }} />
                      </div>
                      <h3 className="font-semibold text-white text-sm">{p.title}</h3>
                    </div>
                    <p className="text-white/40 text-xs leading-relaxed mb-3">{p.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${p.color}12`, color: p.color }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </BentoCard>
                </motion.div>
              )})}
            </div>
          </div>
        </motion.section>

        {/* 聯絡 Bento */}
        <motion.section
          id="聯絡"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-white/30 text-xs tracking-widest uppercase font-medium mb-4"
          >
            聯絡我
          </motion.h2>
          <div className="grid grid-cols-12 gap-4">
            <motion.div variants={itemVariants} className="col-span-12 md:col-span-7">
              <BentoCard
                className="p-8"
                style={{ background: 'linear-gradient(135deg, #1E1B4B, #0F0F11)' }}
              >
                <h3 className="text-2xl font-bold text-white mb-2">開始合作</h3>
                <p className="text-white/50 text-sm mb-6 leading-relaxed">有任何專案想法或技術問題，歡迎隨時聯繫。</p>
                <a
                  href="mailto:rexrex10050@gmail.com"
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition-colors text-white px-5 py-2.5 rounded-xl text-sm font-medium cursor-pointer"
                >
                  <Mail size={15} />
                  rexrex10050@gmail.com
                </a>
              </BentoCard>
            </motion.div>

            <motion.div variants={itemVariants} className="col-span-12 md:col-span-5">
              <BentoCard className="p-8 h-full flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-4">
                  <GithubIcon className="w-8 h-8 text-white/60" />
                  <span className="text-white/60 font-medium">Rex-shark</span>
                </div>
                <p className="text-white/30 text-sm mb-5">探索更多開源專案與程式碼</p>
                <a
                  href="https://github.com/Rex-shark"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 transition-colors text-white/70 hover:text-white px-4 py-2 rounded-xl text-sm cursor-pointer"
                >
                  查看 GitHub
                  <ExternalLink size={12} />
                </a>
              </BentoCard>
            </motion.div>
          </div>
        </motion.section>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center text-white/20 text-sm border-t border-white/5">
        © 2025 Rex · Java 全端工程師
      </footer>
    </div>
  )
}

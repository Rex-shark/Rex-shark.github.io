import { Link } from 'react-router'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowLeft, Mail, ExternalLink, Code2, Server, Database, Layers } from 'lucide-react'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

// ── 動畫 Variants ──────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' as const },
  }),
}

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const },
  }),
}

// ── 資料 ───────────────────────────────────────────────────────
const skillGroups = [
  {
    icon: Server,
    category: 'Backend',
    items: ['Java', 'Spring Boot', 'Spring Security', 'JPA / Hibernate'],
    gradient: 'from-violet-500/30 to-purple-600/20',
    accent: '#a78bfa',
  },
  {
    icon: Code2,
    category: 'Frontend',
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    gradient: 'from-sky-500/30 to-blue-600/20',
    accent: '#38bdf8',
  },
  {
    icon: Database,
    category: 'Database',
    items: ['PostgreSQL', 'MySQL', 'Redis'],
    gradient: 'from-emerald-500/30 to-teal-600/20',
    accent: '#34d399',
  },
  {
    icon: Layers,
    category: 'DevOps',
    items: ['Docker', 'GitHub Actions', 'Linux', 'Nginx'],
    gradient: 'from-rose-500/30 to-pink-600/20',
    accent: '#fb7185',
  },
]

const projects = [
  {
    title: '個人網站',
    desc: '以 React + Vite 建構的 GitHub Pages 個人作品集，探索多種 UI 設計風格，展示前端技術深度。',
    tags: ['React', 'TypeScript', 'Tailwind'],
    href: 'https://github.com/Rex-shark',
    gradient: 'from-violet-500/20 via-purple-500/10 to-transparent',
    accentBorder: 'rgba(167,139,250,0.35)',
  },
  {
    title: 'Spring Boot API 範例',
    desc: '完整的 RESTful API 專案，包含 JWT 認證、RBAC 權限控管與 OpenAPI 文件，可作為後端起手式。',
    tags: ['Java', 'Spring Boot', 'JWT'],
    href: 'https://github.com/Rex-shark',
    gradient: 'from-sky-500/20 via-blue-500/10 to-transparent',
    accentBorder: 'rgba(56,189,248,0.35)',
  },
  {
    title: '系統分析設計教學',
    desc: 'UML、需求分析到系統設計的完整教學系列，含實戰案例解析，適合入門與進階學習。',
    tags: ['系統分析', 'UML', '教學'],
    href: 'https://github.com/Rex-shark',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    accentBorder: 'rgba(52,211,153,0.35)',
  },
]

// ── 裝飾光暈元件 ───────────────────────────────────────────────
function GlowOrb({
  className,
  color,
}: {
  className: string
  color: string
}) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-3xl opacity-30 ${className}`}
      style={{ background: color }}
      aria-hidden="true"
    />
  )
}

// ── 玻璃卡片 ───────────────────────────────────────────────────
function GlassCard({
  children,
  className = '',
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.12] ${className}`}
      style={{
        background: 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// ── 主元件 ─────────────────────────────────────────────────────
export default function Glassmorphism() {
  return (
    <div
      className="min-h-screen text-white relative overflow-x-hidden"
      style={{
        fontFamily: "'Inter', sans-serif",
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      }}
    >
      {/* Google Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap"
      />

      {/* 背景光暈裝飾 */}
      <GlowOrb className="w-[600px] h-[600px] -top-40 -left-40" color="rgba(139,92,246,1)" />
      <GlowOrb className="w-[500px] h-[500px] top-1/3 -right-32" color="rgba(56,189,248,1)" />
      <GlowOrb className="w-[400px] h-[400px] bottom-0 left-1/4" color="rgba(167,139,250,1)" />

      {/* 格線紋理 */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── 導覽列 ── */}
      <nav
        className="fixed top-4 left-4 right-4 z-50 rounded-2xl border border-white/[0.12]"
        style={{
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <ArrowLeft size={15} />
            返回風格選擇
          </Link>
          <div className="hidden sm:flex items-center gap-6">
            {[
              { label: '關於', href: '#about' },
              { label: '技能', href: '#skills' },
              { label: '專案', href: '#projects' },
              { label: '聯絡', href: '#contact' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-sm text-white/60 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {label}
              </a>
            ))}
            <a
              href="mailto:rexrex10050@gmail.com"
              className="text-sm px-4 py-1.5 rounded-xl text-white font-medium transition-all duration-200 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, rgba(139,92,246,0.7), rgba(56,189,248,0.7))',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              聯絡我
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        {/* ── Hero ── */}
        <section id="about" className="max-w-5xl mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row items-center gap-14">
            {/* 文字 */}
            <motion.div
              className="flex-1"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0}
            >
              <motion.p
                className="text-sm font-medium tracking-[0.2em] uppercase mb-4"
                style={{
                  background: 'linear-gradient(90deg, #a78bfa, #38bdf8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                custom={0}
              >
                Java Full-Stack Engineer
              </motion.p>
              <h1
                className="text-5xl sm:text-6xl font-extrabold leading-tight mb-5"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Hi, I'm{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #a78bfa 0%, #38bdf8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Rex
                </span>
              </h1>
              <p className="text-white/60 text-lg leading-relaxed max-w-md mb-8">
                Java 全端工程師 ＆ 系統分析師。專注於設計穩健的後端架構，
                持續分享 Java、Spring Boot 與系統設計的實戰經驗。
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <motion.a
                  href="mailto:rexrex10050@gmail.com"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-200 cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139,92,246,0.8), rgba(56,189,248,0.8))',
                    border: '1px solid rgba(255,255,255,0.2)',
                    boxShadow: '0 0 20px rgba(139,92,246,0.3)',
                  }}
                  whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(139,92,246,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Mail size={15} />
                  聯絡我
                </motion.a>
                <motion.a
                  href="https://github.com/Rex-shark"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white/80 hover:text-white transition-all duration-200 cursor-pointer"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(8px)',
                  }}
                  whileHover={{ scale: 1.03, background: 'rgba(255,255,255,0.12)' } as Parameters<typeof motion.a>[0]['whileHover']}
                  whileTap={{ scale: 0.97 }}
                >
                  <GithubIcon className="w-4 h-4" />
                  GitHub
                </motion.a>
              </div>
            </motion.div>

            {/* 照片 */}
            <motion.div
              className="flex-shrink-0 relative"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            >
              {/* 光暈環 */}
              <div
                className="absolute inset-0 rounded-full blur-2xl opacity-50"
                style={{
                  background: 'radial-gradient(circle, rgba(139,92,246,0.6) 0%, rgba(56,189,248,0.3) 60%, transparent 100%)',
                  transform: 'scale(1.2)',
                }}
                aria-hidden="true"
              />
              {/* 旋轉邊框 */}
              <div
                className="w-52 h-52 rounded-full p-[3px] relative"
                style={{
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.8), rgba(56,189,248,0.8), rgba(167,139,250,0.6))',
                }}
              >
                <div
                  className="w-full h-full rounded-full overflow-hidden"
                  style={{
                    background: 'rgba(15,12,41,0.6)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <img
                    src="/me.png"
                    alt="Rex - Java 全端工程師"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 技能 ── */}
        <section id="skills" className="max-w-5xl mx-auto px-6 py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            custom={0}
            className="mb-10"
          >
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-2"
              style={{
                background: 'linear-gradient(90deg, #a78bfa, #38bdf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Skills
            </p>
            <h2
              className="text-3xl font-extrabold text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              技術能力
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {skillGroups.map((group, i) => {
              const Icon = group.icon
              return (
                <motion.div
                  key={group.category}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <GlassCard
                    className={`p-5 h-full bg-gradient-to-br ${group.gradient}`}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${group.accent}22`, border: `1px solid ${group.accent}44` }}
                      >
                        <Icon size={16} style={{ color: group.accent }} />
                      </div>
                      <p
                        className="text-xs font-semibold tracking-wider uppercase"
                        style={{ color: group.accent }}
                      >
                        {group.category}
                      </p>
                    </div>
                    <ul className="space-y-2">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-white/75">
                          <span
                            className="w-1 h-1 rounded-full flex-shrink-0"
                            style={{ background: group.accent }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* ── 專案 ── */}
        <section id="projects" className="max-w-5xl mx-auto px-6 py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            custom={0}
            className="mb-10"
          >
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-2"
              style={{
                background: 'linear-gradient(90deg, #a78bfa, #38bdf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Projects
            </p>
            <h2
              className="text-3xl font-extrabold text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              精選專案
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {projects.map((project, i) => (
              <motion.a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  borderColor: 'rgba(255,255,255,0.1)',
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
                custom={i}
                whileHover={{
                  y: -6,
                  borderColor: project.accentBorder,
                  background: 'rgba(255,255,255,0.1)',
                  transition: { duration: 0.25 },
                } as Parameters<typeof motion.a>[0]['whileHover']}
              >
                {/* 頂部漸層裝飾 */}
                <div
                  className={`h-1.5 w-full bg-gradient-to-r ${project.gradient}`}
                  style={{
                    background: `linear-gradient(90deg, ${project.accentBorder.replace('0.35', '0.8')}, transparent)`,
                  }}
                />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-white">{project.title}</h3>
                    <ExternalLink
                      size={14}
                      className="text-white/30 group-hover:text-white/70 transition-colors duration-200 flex-shrink-0 mt-0.5"
                    />
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed mb-4">{project.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-0.5 rounded-full text-white/70"
                        style={{
                          background: 'rgba(255,255,255,0.08)',
                          border: '1px solid rgba(255,255,255,0.12)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* ── 聯絡 ── */}
        <section id="contact" className="max-w-5xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <GlassCard
              className="max-w-xl mx-auto p-10"
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 8px 40px rgba(139,92,246,0.15)',
              }}
            >
              <h2
                className="text-3xl font-extrabold mb-3"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                想聊聊？
              </h2>
              <p className="text-white/50 mb-8 max-w-sm mx-auto leading-relaxed">
                無論是合作提案、技術交流或是問題諮詢，都歡迎來信。
              </p>
              <motion.a
                href="mailto:rexrex10050@gmail.com"
                className="inline-flex items-center gap-2.5 px-7 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.85), rgba(56,189,248,0.85))',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 0 24px rgba(139,92,246,0.35)',
                }}
                whileHover={{ scale: 1.04, boxShadow: '0 0 36px rgba(139,92,246,0.55)' }}
                whileTap={{ scale: 0.97 }}
              >
                <Mail size={16} />
                rexrex10050@gmail.com
              </motion.a>
            </GlassCard>
          </motion.div>
        </section>
      </main>

      <footer
        className="py-6 text-center text-xs text-white/25 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        © 2025 Rex. Built with React + Vite.
      </footer>
    </div>
  )
}

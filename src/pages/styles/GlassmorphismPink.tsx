import { Link } from 'react-router'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowLeft, Mail, ExternalLink, Code2, Server, Database, Layers, Bot } from 'lucide-react'
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

// ── 資料（內容來自 src/data/profile.ts，這裡只補上本頁的 icon 與配色） ──
const SKILL_GROUP_STYLE: Record<SkillGroupKey, { icon: typeof Server; gradient: string; accent: string }> = {
  backend: { icon: Server, gradient: 'from-pink-500/30 to-fuchsia-600/20', accent: '#f472b6' },
  frontend: { icon: Code2, gradient: 'from-rose-300/30 to-pink-500/20', accent: '#fda4af' },
  data: { icon: Database, gradient: 'from-fuchsia-500/30 to-purple-600/20', accent: '#e879f9' },
  ai: { icon: Bot, gradient: 'from-rose-500/30 to-red-500/20', accent: '#fb7185' },
  design: { icon: Layers, gradient: 'from-amber-500/30 to-orange-600/20', accent: '#fbbf24' },
}

const skillGroups = sharedSkillGroups.map((g) => ({ ...g, ...SKILL_GROUP_STYLE[g.key] }))
/* AI 組項目較多，獨立成寬版徽章卡片，其餘四組維持格狀卡片 */
const mainSkillGroups = skillGroups.filter((g) => g.key !== 'ai')
const aiGroup = skillGroups.find((g) => g.key === 'ai')!

const PROJECT_ACCENTS = ['#f472b6', '#fda4af', '#e879f9', '#fb923c', '#fb7185']

const projects = sharedProjects.map((p, i) => {
  const accent = PROJECT_ACCENTS[i % PROJECT_ACCENTS.length]
  return {
    ...p,
    accent,
    accentBorder: `${accent}59`,
  }
})

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
        background: 'rgba(255,236,245,0.08)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// ── 主元件 ─────────────────────────────────────────────────────
export default function GlassmorphismPink() {
  return (
    <div
      className="min-h-screen text-white relative overflow-x-hidden"
      style={{
        fontFamily: "'Inter', sans-serif",
        background: 'linear-gradient(135deg, #1f0a1a 0%, #5a1843 50%, #2d0f2a 100%)',
      }}
    >
      {/* Google Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap"
      />

      {/* 背景光暈裝飾 */}
      <GlowOrb className="w-[600px] h-[600px] -top-40 -left-40" color="rgba(236,72,153,1)" />
      <GlowOrb className="w-[500px] h-[500px] top-1/3 -right-32" color="rgba(253,164,175,1)" />
      <GlowOrb className="w-[400px] h-[400px] bottom-0 left-1/4" color="rgba(244,114,182,1)" />

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
          background: 'rgba(255,236,245,0.07)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link
            to="/gallery"
            className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <ArrowLeft size={15} />
            返回設計實驗室
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
                onClick={handleHashClick}
                className="text-sm text-white/60 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {label}
              </a>
            ))}
            <a
              href={`mailto:${profile.email}`}
              className="text-sm px-4 py-1.5 rounded-xl text-white font-medium transition-all duration-200 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, rgba(236,72,153,0.7), rgba(253,164,175,0.7))',
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
                  background: 'linear-gradient(90deg, #f472b6, #fda4af)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                custom={0}
              >
                {profile.titleEn}
              </motion.p>
              <h1
                className="text-5xl sm:text-6xl font-extrabold leading-tight mb-5"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Hi, I'm{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #f472b6 0%, #fda4af 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {profile.name}
                </span>
              </h1>
              <p className="text-white/60 text-lg leading-relaxed max-w-md mb-8">
                {profile.intro[0]}
                <br />
                {profile.intro[1]}
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <motion.a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-200 cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, rgba(236,72,153,0.8), rgba(253,164,175,0.8))',
                    border: '1px solid rgba(255,255,255,0.2)',
                    boxShadow: '0 0 20px rgba(236,72,153,0.3)',
                  }}
                  whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(236,72,153,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Mail size={15} />
                  聯絡我
                </motion.a>
                <motion.a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white/80 hover:text-white transition-all duration-200 cursor-pointer"
                  style={{
                    background: 'rgba(255,236,245,0.08)',
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
                  background: 'radial-gradient(circle, rgba(236,72,153,0.6) 0%, rgba(253,164,175,0.3) 60%, transparent 100%)',
                  transform: 'scale(1.2)',
                }}
                aria-hidden="true"
              />
              {/* 旋轉邊框 */}
              <div
                className="w-52 h-52 rounded-full p-[3px] relative"
                style={{
                  background: 'linear-gradient(135deg, rgba(236,72,153,0.8), rgba(253,164,175,0.8), rgba(244,114,182,0.6))',
                }}
              >
                <div
                  className="w-full h-full rounded-full overflow-hidden"
                  style={{
                    background: 'rgba(31,10,26,0.6)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <img
                    src={profile.avatar}
                    alt={`${profile.name} - ${profile.title}`}
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
                background: 'linear-gradient(90deg, #f472b6, #fda4af)',
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
            {mainSkillGroups.map((group, i) => {
              const Icon = group.icon
              return (
                <motion.div
                  key={group.key}
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
                        {group.labelEn}
                      </p>
                    </div>
                    <ul className="space-y-2">
                      {group.skills.map((item) => (
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

          {/* AI / LLM：項目較多，獨立成寬版徽章卡片 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeUp}
            custom={mainSkillGroups.length}
            className="mt-5"
          >
            <GlassCard className={`p-5 bg-gradient-to-br ${aiGroup.gradient}`}>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${aiGroup.accent}22`, border: `1px solid ${aiGroup.accent}44` }}
                >
                  <Bot size={16} style={{ color: aiGroup.accent }} />
                </div>
                <p
                  className="text-xs font-semibold tracking-wider uppercase"
                  style={{ color: aiGroup.accent }}
                >
                  {aiGroup.labelEn}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {aiGroup.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1 rounded-full text-white/75"
                    style={{ background: `${aiGroup.accent}18`, border: `1px solid ${aiGroup.accent}44` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </GlassCard>
          </motion.div>
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
                background: 'linear-gradient(90deg, #f472b6, #fda4af)',
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, i) => (
              <motion.div
                key={project.slug}
                className="group relative rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden"
                style={{
                  background: 'rgba(255,236,245,0.07)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
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
                } as Parameters<typeof motion.div>[0]['whileHover']}
              >
                {/* 頂部漸層裝飾 */}
                <div
                  className="h-1.5 w-full"
                  style={{
                    background: `linear-gradient(90deg, ${project.accent}CC, transparent)`,
                  }}
                />
                {/* GitHub repo 連結：放在 Link 之外，避免巢狀 <a> */}
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`在 GitHub 查看 ${project.title}`}
                  className="absolute top-4 right-4 z-10 text-white/30 hover:text-white/70 transition-colors duration-200 cursor-pointer"
                >
                  <ExternalLink size={14} />
                </a>
                <Link to={project.to} className="block p-5">
                  <h3 className="font-semibold text-white pr-6 mb-3">{project.title}</h3>
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
                </Link>
              </motion.div>
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
                boxShadow: '0 8px 40px rgba(236,72,153,0.15)',
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
                有任何想法或問題，歡迎透過下列方式聯絡我。
              </p>
              <motion.a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2.5 px-7 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, rgba(236,72,153,0.85), rgba(253,164,175,0.85))',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 0 24px rgba(236,72,153,0.35)',
                }}
                whileHover={{ scale: 1.04, boxShadow: '0 0 36px rgba(236,72,153,0.55)' }}
                whileTap={{ scale: 0.97 }}
              >
                <Mail size={16} />
                {profile.email}
              </motion.a>
            </GlassCard>
          </motion.div>
        </section>
      </main>

      <footer
        className="py-6 text-center text-xs text-white/25 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        © {new Date().getFullYear()} {profile.name}. Built with React + Vite.
      </footer>
    </div>
  )
}

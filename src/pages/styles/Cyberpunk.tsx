import { Link } from 'react-router'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Mail, Terminal } from 'lucide-react'
import { handleHashClick } from '@/lib/utils'
import {
  profile,
  skillGroups as sharedSkillGroups,
  projects as sharedProjects,
  type SkillGroupKey,
} from '@/data/profile'

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const },
  }),
}

/* ─── 資料（內容來自 src/data/profile.ts，這裡只補上本頁的霓虹配色） ─── */
const SKILL_GROUP_COLOR: Record<SkillGroupKey, string> = {
  backend: '#00FF00',
  frontend: '#00FFFF',
  data: '#FF00FF',
  ai: '#FFD700',
  design: '#FF6B00',
}

const skills = sharedSkillGroups.map((g) => ({
  ...g,
  category: g.labelEn.toUpperCase(),
  color: SKILL_GROUP_COLOR[g.key],
}))

const PROJECT_ACCENTS = ['#00FFFF', '#00FF00', '#FF00FF', '#FFD700', '#FF6B00']

const projects = sharedProjects.map((p, i) => ({
  ...p,
  /* 主題化標題由 slug 推導，不另寫一份 */
  exe: `> ${p.slug.replace(/-/g, '_')}.exe`,
  accent: PROJECT_ACCENTS[i % PROJECT_ACCENTS.length],
}))

/* 5 張卡：lg 為 3 + 2（6 欄格線），sm 為 2 + 2 + 1（最後一張橫跨） */
function projectSpan(i: number, total: number) {
  const lg = i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'
  const sm = i === total - 1 && total % 2 === 1 ? 'sm:col-span-2' : ''
  return `${sm} ${lg}`
}

/* 掃描線覆蓋層 */
function Scanlines() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 opacity-[0.04]"
      style={{
        backgroundImage: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(255,255,255,0.05) 2px,
          rgba(255,255,255,0.05) 4px
        )`,
      }}
    />
  )
}

/* 霓虹光暈文字 */
function NeonText({
  children,
  color,
  className = '',
}: {
  children: React.ReactNode
  color: string
  className?: string
}) {
  return (
    <span
      className={className}
      style={{
        color,
        textShadow: `0 0 7px ${color}, 0 0 20px ${color}40, 0 0 40px ${color}20`,
      }}
    >
      {children}
    </span>
  )
}

/* HUD 角落裝飾 */
function HudCorner({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const rotations = { tl: '0deg', tr: '90deg', bl: '270deg', br: '180deg' }
  const positions = {
    tl: 'top-0 left-0',
    tr: 'top-0 right-0',
    bl: 'bottom-0 left-0',
    br: 'bottom-0 right-0',
  }
  return (
    <div
      className={`absolute ${positions[position]} w-4 h-4 pointer-events-none`}
      style={{ transform: `rotate(${rotations[position]})` }}
    >
      <div className="absolute top-0 left-0 w-full h-px bg-[#00FFFF]/60" />
      <div className="absolute top-0 left-0 h-full w-px bg-[#00FFFF]/60" />
    </div>
  )
}

/* 技能模組列 - 終端風格（不帶任何熟練度數值） */
function TerminalModule({ label, color, delay }: { label: string; color: string; delay: number }) {
  return (
    <motion.div
      className="flex items-start gap-3 font-mono text-sm"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' as const }}
    >
      <span
        className="flex-shrink-0 text-xs leading-5 tracking-wider"
        style={{ color, textShadow: `0 0 8px ${color}60` }}
      >
        [LOADED]
      </span>
      <span className="text-[#C0C0C0] leading-5 break-words min-w-0">{label}</span>
    </motion.div>
  )
}

export default function Cyberpunk() {
  return (
    <div
      className="min-h-screen bg-[#0D0D0D] text-[#E0E0E0] relative"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap"
      />
      <Scanlines />

      {/* 導覽列 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D0D]/95 backdrop-blur border-b border-[#00FFFF]/20">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            to="/gallery"
            className="flex items-center gap-1.5 text-sm text-[#00FFFF]/70 hover:text-[#00FFFF] transition-colors cursor-pointer font-mono"
          >
            <ArrowLeft size={15} />
            cd ../
          </Link>
          <div className="flex items-center gap-5">
            {[
              { label: '// about', href: '#about' },
              { label: '// skills', href: '#skills' },
              { label: '// projects', href: '#projects' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={handleHashClick}
                className="text-xs text-[#666] hover:text-[#00FF00] transition-colors font-mono"
              >
                {item.label}
              </a>
            ))}
            <a
              href={`mailto:${profile.email}`}
              className="text-xs px-3 py-1.5 border border-[#FF00FF]/50 text-[#FF00FF] hover:bg-[#FF00FF]/10 transition-colors cursor-pointer font-mono"
            >
              &gt; contact
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-14">
        {/* Hero */}
        <section id="about" className="max-w-5xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="flex-1"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
          >
            <motion.p
              className="text-xs font-mono text-[#666] mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#00FF00]">$</span> cat ~/profile.txt
            </motion.p>
            <h1
              className="text-5xl sm:text-6xl font-black leading-tight mb-2 tracking-wider"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              <NeonText color="#00FFFF">{profile.name.toUpperCase()}</NeonText>
            </h1>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#00FF00] animate-pulse" />
              <p className="text-sm text-[#00FF00] font-mono">SYSTEM.ONLINE</p>
            </div>
            <p className="text-[#A0A0A0] text-base leading-relaxed max-w-lg mb-8 font-mono text-sm">
              <span className="text-[#666]">&gt;</span>{' '}
              <span className="text-[#E0E0E0]">{profile.title}</span>
              {profile.intro.map((line) => (
                <span key={line}>
                  <br />
                  <span className="text-[#666]">&gt;</span> {line}
                </span>
              ))}
            </p>
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 px-5 py-2.5 border border-[#00FF00]/50 text-[#00FF00] text-sm font-mono hover:bg-[#00FF00]/10 hover:shadow-[0_0_15px_rgba(0,255,0,0.15)] transition-all duration-200 cursor-pointer"
              >
                <Mail size={14} />
                ./contact.sh
              </a>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 border border-[#FF00FF]/50 text-[#FF00FF] text-sm font-mono hover:bg-[#FF00FF]/10 hover:shadow-[0_0_15px_rgba(255,0,255,0.15)] transition-all duration-200 cursor-pointer"
              >
                <GithubIcon size={14} />
                github
              </a>
            </div>
          </motion.div>

          {/* 個人照片 - HUD 風格 */}
          <motion.div
            className="flex-shrink-0 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative p-1">
              <HudCorner position="tl" />
              <HudCorner position="tr" />
              <HudCorner position="bl" />
              <HudCorner position="br" />
              <div
                className="w-52 h-52 overflow-hidden"
                style={{
                  clipPath: 'polygon(8% 0, 100% 0, 100% 92%, 92% 100%, 0 100%, 0 8%)',
                  border: '1px solid rgba(0,255,255,0.3)',
                }}
              >
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                  style={{ filter: 'saturate(0.7) contrast(1.1)' }}
                />
                {/* 覆蓋層 */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/60 to-transparent" />
              </div>
              {/* HUD 標籤 */}
              <div className="absolute -bottom-4 left-0 right-0 text-center">
                <span className="text-[10px] font-mono text-[#00FFFF]/60 tracking-widest">
                  ID:{profile.githubHandle.toUpperCase()} // STATUS:ACTIVE
                </span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 分隔線 */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-t border-[#00FFFF]/10 relative">
            <div className="absolute left-0 top-0 w-16 h-px bg-[#00FFFF]/60" />
            <div className="absolute right-0 top-0 w-16 h-px bg-[#FF00FF]/60" />
          </div>
        </div>

        {/* 技能 */}
        <section id="skills" className="max-w-5xl mx-auto px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            custom={0}
          >
            <div className="flex items-center gap-2 mb-2">
              <Terminal size={16} className="text-[#00FF00]" />
              <p className="text-xs font-mono text-[#666]">$ skill --list --verbose</p>
            </div>
            <h2
              className="text-3xl font-bold mb-10 tracking-wider"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              <NeonText color="#00FF00">SKILLS</NeonText>
            </h2>
          </motion.div>
          {/* AI 組項目多、字串長：橫跨兩欄並在組內再分兩欄；dense 讓 design 組補進空格 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 grid-flow-row-dense gap-x-12 gap-y-10">
            {skills.map((group, gi) => {
              const wide = group.key === 'ai'
              return (
                <motion.div
                  key={group.key}
                  className={`relative border border-[#222] p-5 ${wide ? 'sm:col-span-2' : ''}`}
                  style={{ borderColor: `${group.color}25` }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={fadeUp}
                  custom={gi}
                >
                  <div className="flex items-baseline justify-between gap-3 mb-4">
                    <p
                      className="text-xs font-mono tracking-[0.3em]"
                      style={{ color: group.color, textShadow: `0 0 8px ${group.color}40` }}
                    >
                      [{group.category}]
                    </p>
                    <p className="text-[10px] font-mono text-[#555] tracking-widest">// {group.label}</p>
                  </div>
                  <div
                    className={
                      wide ? 'grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2' : 'space-y-2'
                    }
                  >
                    {group.skills.map((item, i) => (
                      <TerminalModule
                        key={item}
                        label={item}
                        color={group.color}
                        delay={Math.min(i, 6) * 0.05}
                      />
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* 分隔線 */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-t border-[#FF00FF]/10 relative">
            <div className="absolute left-0 top-0 w-16 h-px bg-[#FF00FF]/60" />
            <div className="absolute right-0 top-0 w-16 h-px bg-[#00FF00]/60" />
          </div>
        </div>

        {/* 專案 */}
        <section id="projects" className="max-w-5xl mx-auto px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            custom={0}
          >
            <div className="flex items-center gap-2 mb-2">
              <Terminal size={16} className="text-[#FF00FF]" />
              <p className="text-xs font-mono text-[#666]">$ ls ~/projects/</p>
            </div>
            <h2
              className="text-3xl font-bold mb-10 tracking-wider"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              <NeonText color="#FF00FF">PROJECTS</NeonText>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
            {projects.map((project, i) => (
              <motion.div
                key={project.slug}
                className={`group relative bg-[#0D0D0D] border overflow-hidden ${projectSpan(i, projects.length)}`}
                style={{
                  borderColor: `${project.accent}30`,
                  clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
                custom={i}
                whileHover={{
                  borderColor: project.accent,
                  boxShadow: `0 0 20px ${project.accent}15, inset 0 0 20px ${project.accent}05`,
                }}
              >
                {/* 頂部裝飾線 */}
                <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{ background: `linear-gradient(90deg, transparent, ${project.accent}40, transparent)` }} />

                {/* 整張卡連到站內頁 */}
                <Link to={project.to} className="flex flex-col h-full p-5 cursor-pointer">
                  <h3
                    className="font-mono text-sm font-bold break-all pr-8 mb-1"
                    style={{ color: project.accent }}
                  >
                    {project.exe}
                  </h3>
                  <p className="text-xs font-mono text-[#C0C0C0] mb-3">
                    <span className="text-[#555]">//</span> {project.title}
                  </p>
                  <p className="text-xs text-[#888] leading-relaxed mb-4 font-mono">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 font-mono border"
                        style={{
                          borderColor: `${project.accent}30`,
                          color: project.accent,
                          background: `${project.accent}08`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-[10px] font-mono text-[#555] group-hover:text-[#AAA] transition-colors tracking-widest">
                    ./open
                    <ArrowUpRight size={11} />
                  </span>
                </Link>

                {/* GitHub repo 連結（放在 Link 之外，避免巢狀連結） */}
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} GitHub repo`}
                  title="GitHub repo"
                  className="absolute top-4 right-4 z-10 text-[#555] hover:text-[#E0E0E0] transition-colors cursor-pointer"
                >
                  <GithubIcon size={15} />
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 聯絡 */}
        <section id="contact" className="max-w-5xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <p className="text-xs font-mono text-[#666] mb-4">$ echo "reach_out" | mail</p>
            <h2
              className="text-3xl font-bold mb-4 tracking-wider"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              <NeonText color="#00FFFF">CONNECT</NeonText>
            </h2>
            <p className="text-[#888] mb-8 max-w-sm mx-auto font-mono text-sm">
              技術交流或合作提案，隨時建立連線。
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#00FFFF]/50 text-[#00FFFF] font-mono text-sm hover:bg-[#00FFFF]/10 hover:shadow-[0_0_20px_rgba(0,255,255,0.15)] transition-all duration-200 cursor-pointer"
            >
              <Mail size={15} />
              {profile.email}
            </a>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-[#333]/50 py-6 text-center">
        <p className="text-[10px] font-mono text-[#444] tracking-widest">
          &copy; {new Date().getFullYear()} {profile.name.toUpperCase()} // SYSTEM.VERSION.3.0 // ALL.RIGHTS.RESERVED
        </p>
      </footer>
    </div>
  )
}

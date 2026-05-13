import { Link } from 'react-router'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowLeft, Mail, ExternalLink, Terminal } from 'lucide-react'
import { handleHashClick } from '@/lib/utils'

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

const skills = [
  { category: 'BACKEND', items: ['Java', 'Spring Boot', 'Spring Security', 'JPA / Hibernate'], color: '#00FF00' },
  { category: 'FRONTEND', items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'], color: '#00FFFF' },
  { category: 'DATABASE', items: ['PostgreSQL', 'MySQL', 'Redis'], color: '#FF00FF' },
  { category: 'DEVOPS', items: ['Docker', 'GitHub Actions', 'Linux', 'Nginx'], color: '#FFD700' },
]

const projects = [
  {
    title: '> personal_site.exe',
    desc: 'React + Vite 建構的 GitHub Pages 個人作品集，探索多種 UI 設計風格。',
    tags: ['React', 'TypeScript', 'Tailwind'],
    href: 'https://github.com/Rex-shark',
    accent: '#00FFFF',
  },
  {
    title: '> spring_api.jar',
    desc: '完整的 RESTful API 專案，包含 JWT 認證、RBAC 權限控管與 OpenAPI 文件。',
    tags: ['Java', 'Spring Boot', 'JWT'],
    href: 'https://github.com/Rex-shark',
    accent: '#00FF00',
  },
  {
    title: '> sys_design.md',
    desc: 'UML、需求分析到系統設計的完整教學系列，含實戰案例解析。',
    tags: ['系統分析', 'UML', '教學'],
    href: 'https://github.com/Rex-shark',
    accent: '#FF00FF',
  },
]

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

/* 技能進度條 - 終端風格 */
function TerminalSkillBar({ label, level, color, delay }: { label: string; level: number; color: string; delay: number }) {
  const blocks = 20
  const filled = Math.round((level / 100) * blocks)
  return (
    <motion.div
      className="flex items-center gap-3 font-mono text-sm"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
    >
      <span className="w-28 text-[#A0A0A0] flex-shrink-0">{label}</span>
      <span style={{ color }}>
        {'['}
        <span style={{ color }}>{'█'.repeat(filled)}</span>
        <span className="text-[#333]">{'░'.repeat(blocks - filled)}</span>
        {']'}
      </span>
      <span className="text-[#666] text-xs">{level}%</span>
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
              href="mailto:rexrex10050@gmail.com"
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
              <NeonText color="#00FFFF">REX</NeonText>
            </h1>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#00FF00] animate-pulse" />
              <p className="text-sm text-[#00FF00] font-mono">SYSTEM.ONLINE</p>
            </div>
            <p className="text-[#A0A0A0] text-base leading-relaxed max-w-lg mb-8 font-mono text-sm">
              <span className="text-[#666]">&gt;</span> Java 全端工程師 ＆ 系統分析師。
              <br />
              <span className="text-[#666]">&gt;</span> 專注後端架構設計，持續分享 Java、Spring Boot 與系統設計的實戰經驗。
            </p>
            <div className="flex items-center gap-3">
              <a
                href="mailto:rexrex10050@gmail.com"
                className="flex items-center gap-2 px-5 py-2.5 border border-[#00FF00]/50 text-[#00FF00] text-sm font-mono hover:bg-[#00FF00]/10 hover:shadow-[0_0_15px_rgba(0,255,0,0.15)] transition-all duration-200 cursor-pointer"
              >
                <Mail size={14} />
                ./contact.sh
              </a>
              <a
                href="https://github.com/Rex-shark"
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
                  src="/me.png"
                  alt="Rex"
                  className="w-full h-full object-cover"
                  style={{ filter: 'saturate(0.7) contrast(1.1)' }}
                />
                {/* 覆蓋層 */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/60 to-transparent" />
              </div>
              {/* HUD 標籤 */}
              <div className="absolute -bottom-4 left-0 right-0 text-center">
                <span className="text-[10px] font-mono text-[#00FFFF]/60 tracking-widest">
                  ID:REX-SHARK // STATUS:ACTIVE
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
            {skills.map((group, gi) => (
              <motion.div
                key={group.category}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
                custom={gi}
              >
                <p
                  className="text-xs font-mono tracking-[0.3em] mb-4"
                  style={{ color: group.color, textShadow: `0 0 8px ${group.color}40` }}
                >
                  [{group.category}]
                </p>
                <div className="space-y-2">
                  {group.items.map((item, i) => (
                    <TerminalSkillBar
                      key={item}
                      label={item}
                      level={95 - gi * 5 - i * 4}
                      color={group.color}
                      delay={gi * 0.1 + i * 0.05}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {projects.map((project, i) => (
              <motion.a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 bg-[#0D0D0D] border border-[#333] hover:border-opacity-100 transition-all duration-300 cursor-pointer relative overflow-hidden"
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
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${project.accent}40, transparent)` }} />

                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-mono text-sm font-bold" style={{ color: project.accent }}>
                    {project.title}
                  </h3>
                  <ExternalLink
                    size={13}
                    className="text-[#444] group-hover:text-[#888] transition-colors flex-shrink-0 mt-0.5"
                  />
                </div>
                <p className="text-xs text-[#888] leading-relaxed mb-4 font-mono">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
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
              </motion.a>
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
              合作提案、技術交流或問題諮詢，隨時建立連線。
            </p>
            <a
              href="mailto:rexrex10050@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#00FFFF]/50 text-[#00FFFF] font-mono text-sm hover:bg-[#00FFFF]/10 hover:shadow-[0_0_20px_rgba(0,255,255,0.15)] transition-all duration-200 cursor-pointer"
            >
              <Mail size={15} />
              rexrex10050@gmail.com
            </a>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-[#333]/50 py-6 text-center">
        <p className="text-[10px] font-mono text-[#444] tracking-widest">
          &copy; 2025 REX // SYSTEM.VERSION.3.0 // ALL.RIGHTS.RESERVED
        </p>
      </footer>
    </div>
  )
}

import { Link } from 'react-router'
import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowLeft, Mail, Cog, Wrench, Cpu, Database, DraftingCompass } from 'lucide-react'
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

/* 旋轉齒輪 SVG 裝飾 */
function GearSVG({
  size = 60,
  className = '',
  teeth = 8,
}: {
  size?: number
  className?: string
  teeth?: number
}) {
  const cx = size / 2
  const cy = size / 2
  const outerR = size * 0.42
  const innerR = size * 0.28
  const toothH = size * 0.1
  const holeR = size * 0.1

  const points: string[] = []
  for (let i = 0; i < teeth * 2; i++) {
    const angle = (i * Math.PI) / teeth - Math.PI / 2
    const r = i % 2 === 0 ? outerR + toothH : outerR
    points.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`)
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      className={className}
    >
      <polygon
        points={points.join(' ')}
        fill="#B87333"
        stroke="#8B5A2B"
        strokeWidth={size * 0.025}
        opacity={0.7}
      />
      <circle cx={cx} cy={cy} r={innerR} fill="#8B5A2B" opacity={0.7} />
      <circle cx={cx} cy={cy} r={holeR} fill="#1A0E08" />
    </svg>
  )
}

/* 裝飾用壓力錶：純視覺，不代表任何數值（無刻度讀數、無百分比，指針只是隨機擺動） */
function DecorGauge({ index = 0, size = 64 }: { index?: number; size?: number }) {
  const reduceMotion = useReducedMotion()
  const c = size / 2
  const faceR = size * 0.4
  const ticks = Array.from({ length: 9 }, (_, i) => -120 + i * 30)

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }} aria-hidden="true">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
        <circle cx={c} cy={c} r={size * 0.47} fill="#8B5A2B" stroke="#DAA520" strokeWidth={1} />
        <circle cx={c} cy={c} r={faceR} fill="#1A0E08" stroke="#B87333" strokeWidth={1.5} />
        {ticks.map((deg) => {
          const rad = ((deg - 90) * Math.PI) / 180
          const r1 = faceR * 0.72
          const r2 = faceR * 0.92
          return (
            <line
              key={deg}
              x1={c + r1 * Math.cos(rad)}
              y1={c + r1 * Math.sin(rad)}
              x2={c + r2 * Math.cos(rad)}
              y2={c + r2 * Math.sin(rad)}
              stroke="#B87333"
              strokeWidth={1}
              opacity={0.7}
            />
          )
        })}
      </svg>
      <motion.div
        className="absolute"
        style={{
          left: c - 1,
          bottom: c,
          width: 2,
          height: faceR * 0.8,
          background: 'linear-gradient(180deg, #DAA520, #B87333)',
          transformOrigin: '50% 100%',
          boxShadow: '0 0 4px rgba(218,165,32,0.5)',
        }}
        animate={reduceMotion ? { rotate: 0 } : { rotate: [-40, 25, -15, 40, -5, -40] }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 6 + index * 0.7, repeat: Infinity, ease: 'easeInOut' as const }
        }
      />
      <div
        className="absolute w-2 h-2 rounded-full"
        style={{
          left: c - 4,
          top: c - 4,
          background: 'radial-gradient(circle at 35% 35%, #DAA520, #8B5A2B)',
        }}
      />
    </div>
  )
}

/* 鉚釘裝飾 */
function Rivet({ className = '', small = false }: { className?: string; small?: boolean }) {
  return (
    <div
      className={`${small ? 'w-2 h-2' : 'w-3 h-3'} rounded-full ${className}`}
      style={{
        background: 'radial-gradient(circle at 35% 35%, #DAA520, #8B5A2B)',
        boxShadow: '0 1px 2px rgba(0,0,0,0.6)',
      }}
    />
  )
}

/* 金屬分隔線 */
function SteamDivider() {
  return (
    <div className="relative flex items-center gap-4 my-2">
      <Rivet />
      <div
        className="flex-1 h-px"
        style={{
          background: 'linear-gradient(90deg, #8B5A2B, #B87333 40%, #DAA520 50%, #B87333 60%, #8B5A2B)',
        }}
      />
      <GearSVG size={28} teeth={6} />
      <div
        className="flex-1 h-px"
        style={{
          background: 'linear-gradient(90deg, #8B5A2B, #B87333 40%, #DAA520 50%, #B87333 60%, #8B5A2B)',
        }}
      />
      <Rivet />
    </div>
  )
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: 'easeOut' as const },
  }),
}

/* 資料來自 src/data/profile.ts，這裡只補上本頁的 icon 與版面欄寬 */
const SKILL_GROUP_ICON: Record<SkillGroupKey, typeof Cog> = {
  backend: Cog,
  frontend: Wrench,
  data: Database,
  ai: Cpu,
  design: DraftingCompass,
}

const skillGroups = sharedSkillGroups.map((g) => ({ ...g, icon: SKILL_GROUP_ICON[g.key] }))

/* 5 張卡：上排 3 張、下排 2 張（lg 以 6 欄格線對齊）；sm 兩欄時第一張橫跨整列 */
const PROJECT_SPAN = [
  'sm:col-span-2 lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-3',
  'lg:col-span-3',
]

const projects = sharedProjects.map((p, i) => ({
  ...p,
  span: PROJECT_SPAN[i] ?? 'lg:col-span-2',
}))

/* 羅馬數字（專案編號與 Footer 年份用） */
function toRoman(num: number): string {
  const table: [number, string][] = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ]
  let n = num
  let out = ''
  for (const [value, symbol] of table) {
    while (n >= value) {
      out += symbol
      n -= value
    }
  }
  return out
}

export default function Steampunk() {
  return (
    <div
      className="min-h-screen text-[#E8D5A3] relative overflow-x-hidden"
      style={{
        background: '#1A0E08',
        fontFamily: "'Special Elite', cursive",
      }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Special+Elite&family=IM+Fell+English:ital@0;1&display=swap"
      />

      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 50%, rgba(139,90,43,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(139,90,43,0.06) 0%, transparent 40%),
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(139,90,43,0.02) 10px,
              rgba(139,90,43,0.02) 11px
            )
          `,
        }}
      />

      <motion.div
        className="pointer-events-none fixed top-[-60px] right-[-60px] opacity-[0.06]"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <GearSVG size={200} teeth={16} />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed bottom-[-80px] left-[-80px] opacity-[0.05]"
        animate={{ rotate: -360 }}
        transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
      >
        <GearSVG size={260} teeth={20} />
      </motion.div>

      <nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur"
        style={{
          background: 'rgba(26,14,8,0.92)',
          borderBottom: '2px solid #8B5A2B',
          boxShadow: '0 2px 12px rgba(0,0,0,0.6), 0 1px 0 rgba(184,115,51,0.3)',
        }}
      >
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Rivet />
            <Link
              to="/gallery"
              className="flex items-center gap-1.5 text-sm text-[#B87333] hover:text-[#DAA520] transition-colors duration-200 cursor-pointer"
            >
              <ArrowLeft size={15} />
              返回設計實驗室
            </Link>
          </div>

          <div className="flex items-center gap-5">
            {([
              { label: '關於', href: '#about' },
              { label: '技能', href: '#skills' },
              { label: '專案', href: '#projects' },
              { label: '聯絡', href: '#contact' },
            ] as const).map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={handleHashClick}
                className="text-sm text-[#C4A67A] hover:text-[#DAA520] transition-colors duration-200"
              >
                {label}
              </a>
            ))}
            <Rivet />
          </div>
        </div>
      </nav>

      <main className="pt-14">
        <section id="about" className="max-w-5xl mx-auto px-6 py-24">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              className="flex-shrink-0 relative"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' as const }}
            >
              <div
                className="relative w-52 h-52"
                style={{
                  border: '3px solid #8B5A2B',
                  boxShadow: `
                    0 0 0 1px #DAA52050,
                    0 0 0 6px #1A0E08,
                    0 0 0 8px #8B5A2B,
                    4px 4px 16px rgba(0,0,0,0.8)
                  `,
                }}
              >
                <Rivet className="absolute -top-2 -left-2" />
                <Rivet className="absolute -top-2 -right-2" />
                <Rivet className="absolute -bottom-2 -left-2" />
                <Rivet className="absolute -bottom-2 -right-2" />

                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                  style={{ filter: 'sepia(20%) contrast(1.05) brightness(0.95)' }}
                />

                <div
                  className="absolute bottom-0 left-0 right-0 h-6 flex items-center justify-center gap-2 opacity-80"
                  style={{ background: 'rgba(26,14,8,0.7)', borderTop: '1px solid #8B5A2B' }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: '#B87333' }} />
                  <div className="w-12 h-1 rounded-full" style={{ background: '#8B5A2B' }} />
                  <div className="w-2 h-2 rounded-full" style={{ background: '#B87333' }} />
                </div>
              </div>

              <motion.div
                className="absolute -right-8 top-1/2 -translate-y-1/2"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <GearSVG size={32} teeth={8} />
              </motion.div>
            </motion.div>

            <motion.div
              className="flex-1"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0}
            >
              <div
                className="inline-block px-4 py-1 mb-4 text-xs tracking-[0.25em] uppercase"
                style={{
                  border: '1px solid #8B5A2B',
                  background: 'linear-gradient(90deg, #1A0E08, #2C1810, #1A0E08)',
                  color: '#B87333',
                  boxShadow: 'inset 0 1px 0 rgba(218,165,32,0.2)',
                }}
              >
                {profile.titleEn}
              </div>

              <h1
                className="text-5xl sm:text-6xl font-bold leading-tight mb-4"
                style={{
                  fontFamily: "'IM Fell English', serif",
                  color: '#DAA520',
                  textShadow: '2px 2px 8px rgba(218,165,32,0.3), 0 0 20px rgba(184,115,51,0.2)',
                }}
              >
                {profile.name}
              </h1>

              <p
                className="text-lg leading-relaxed max-w-md mb-2"
                style={{ color: '#C4A67A', fontFamily: "'IM Fell English', serif", fontStyle: 'italic' }}
              >
                {profile.title}
              </p>
              <div className="max-w-md mb-8 space-y-2">
                {profile.intro.map((line) => (
                  <p key={line} className="text-sm leading-relaxed" style={{ color: '#A08060' }}>
                    {line}
                  </p>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <motion.a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #8B5A2B, #B87333)',
                    border: '1px solid #DAA520',
                    color: '#1A0E08',
                    fontWeight: 700,
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
                  }}
                  whileHover={{ scale: 1.03, boxShadow: '2px 2px 12px rgba(184,115,51,0.5), inset 0 1px 0 rgba(255,255,255,0.1)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                >
                  <Mail size={15} />
                  聯絡我
                </motion.a>
                <motion.a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 text-sm cursor-pointer"
                  style={{
                    background: 'transparent',
                    border: '1px solid #8B5A2B',
                    color: '#B87333',
                    boxShadow: '2px 2px 6px rgba(0,0,0,0.4)',
                  }}
                  whileHover={{
                    borderColor: '#DAA520',
                    color: '#DAA520',
                    boxShadow: '2px 2px 10px rgba(218,165,32,0.3)',
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  <GithubIcon className="w-4 h-4" />
                  GitHub
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6">
          <SteamDivider />
        </div>

        <section id="skills" className="max-w-5xl mx-auto px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            custom={0}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              >
                <GearSVG size={36} teeth={8} />
              </motion.div>
              <h2
                className="text-3xl font-bold"
                style={{
                  fontFamily: "'IM Fell English', serif",
                  color: '#DAA520',
                  textShadow: '1px 1px 6px rgba(218,165,32,0.3)',
                }}
              >
                技術能力
              </h2>
            </div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#8B5A2B] ml-11">Technical Skills</p>
          </motion.div>

          {/* 每組一塊黃銅面板；壓力錶僅為裝飾，不代表任何數值 */}
          <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-dense gap-5">
            {skillGroups.map((group, gi) => (
              <motion.div
                key={group.key}
                className={`p-5 relative ${group.key === 'ai' ? 'md:col-span-2' : ''}`}
                style={{
                  border: '1px solid #8B5A2B',
                  background: 'linear-gradient(135deg, #1A0E08, #2C1810)',
                  boxShadow: 'inset 0 1px 0 rgba(184,115,51,0.2), 2px 2px 8px rgba(0,0,0,0.4)',
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
                custom={gi}
              >
                <Rivet small className="absolute top-1.5 left-1.5" />
                <Rivet small className="absolute top-1.5 right-1.5" />
                <Rivet small className="absolute bottom-1.5 left-1.5" />
                <Rivet small className="absolute bottom-1.5 right-1.5" />

                <div className="flex items-center gap-4 mb-4">
                  <DecorGauge index={gi} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <group.icon size={16} className="flex-shrink-0" style={{ color: '#B87333' }} />
                      <h3
                        className="text-lg font-bold"
                        style={{ fontFamily: "'IM Fell English', serif", color: '#DAA520' }}
                      >
                        {group.label}
                      </h3>
                    </div>
                    <p className="text-[11px] tracking-[0.2em] uppercase mt-0.5" style={{ color: '#8B5A2B' }}>
                      {group.labelEn}
                    </p>
                  </div>
                </div>

                <div
                  className="h-px mb-4"
                  style={{ background: 'linear-gradient(90deg, #8B5A2B, #B87333 50%, transparent)' }}
                />

                {/* 黃銅銘牌 */}
                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2 px-2.5 py-1.5 text-xs leading-snug max-w-full"
                      style={{
                        background: 'linear-gradient(180deg, #CD853F, #B87333 45%, #8B5A2B)',
                        border: '1px solid #DAA520',
                        color: '#1A0E08',
                        fontWeight: 700,
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), 1px 2px 4px rgba(0,0,0,0.6)',
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: '#1A0E08', opacity: 0.55 }}
                      />
                      <span className="min-w-0 break-words">{skill}</span>
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: '#1A0E08', opacity: 0.55 }}
                      />
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6">
          <SteamDivider />
        </div>

        <section id="projects" className="max-w-5xl mx-auto px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            custom={0}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              >
                <GearSVG size={36} teeth={10} />
              </motion.div>
              <h2
                className="text-3xl font-bold"
                style={{
                  fontFamily: "'IM Fell English', serif",
                  color: '#DAA520',
                  textShadow: '1px 1px 6px rgba(218,165,32,0.3)',
                }}
              >
                精選專案
              </h2>
            </div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#8B5A2B] ml-11">Featured Projects</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.slug}
                className={`group relative ${project.span}`}
                style={{
                  background: 'linear-gradient(135deg, #1A0E08, #2C1810, #1A0E08)',
                  border: '1px solid #8B5A2B',
                  boxShadow: '0 0 0 1px rgba(218,165,32,0.1), 3px 3px 10px rgba(0,0,0,0.6)',
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
                custom={i}
                whileHover={{
                  boxShadow: '0 0 0 1px rgba(218,165,32,0.3), 3px 3px 14px rgba(184,115,51,0.4)',
                  borderColor: '#B87333',
                }}
                transition={{ duration: 0.2 }}
              >
                <Rivet small className="absolute top-2 left-2 pointer-events-none" />
                <Rivet small className="absolute top-2 right-2 pointer-events-none" />
                <Rivet small className="absolute bottom-2 left-2 pointer-events-none" />
                <Rivet small className="absolute bottom-2 right-2 pointer-events-none" />

                {/* 整張卡連到站內頁 */}
                <Link to={project.to} className="flex flex-col h-full p-6 cursor-pointer">
                  <span className="text-[11px] tracking-[0.25em] mb-2" style={{ color: '#8B5A2B' }}>
                    No. {toRoman(i + 1)}
                  </span>
                  <h3
                    className="font-bold mb-3 pr-10"
                    style={{
                      fontFamily: "'IM Fell English', serif",
                      color: '#DAA520',
                      fontSize: '1.05rem',
                    }}
                  >
                    {project.title}
                  </h3>

                  <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: '#A08060' }}>
                    {project.desc}
                  </p>

                  <div
                    className="h-px mb-3"
                    style={{ background: 'linear-gradient(90deg, transparent, #8B5A2B, transparent)' }}
                  />

                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5"
                        style={{
                          border: '1px solid #8B5A2B',
                          color: '#B87333',
                          background: 'rgba(139,90,43,0.15)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>

                {/* GitHub repo 連結放在 Link 之外，避免巢狀 <a> */}
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} 的 GitHub 原始碼`}
                  title="GitHub 原始碼"
                  className="absolute top-5 right-6 p-1.5 text-[#8B5A2B] hover:text-[#DAA520] transition-colors duration-200 cursor-pointer"
                  style={{ border: '1px solid #8B5A2B', background: '#1A0E08' }}
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6">
          <SteamDivider />
        </div>

        <section id="contact" className="max-w-5xl mx-auto px-6 py-20">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              >
                <GearSVG size={48} teeth={12} />
              </motion.div>
            </div>

            <h2
              className="text-4xl font-bold mb-3"
              style={{
                fontFamily: "'IM Fell English', serif",
                color: '#DAA520',
                textShadow: '2px 2px 10px rgba(218,165,32,0.3)',
              }}
            >
              想聊聊？
            </h2>
            <p
              className="text-base mb-10 max-w-sm mx-auto leading-relaxed"
              style={{ color: '#A08060', fontStyle: 'italic' }}
            >
              技術交流或任何想法，<br />
              歡迎傳送您的電報。
            </p>

            <div
              className="inline-block px-8 py-6 mb-6 text-left"
              style={{
                border: '2px solid #8B5A2B',
                background: 'linear-gradient(135deg, #1A0E08, #2C1810)',
                boxShadow: '0 0 0 1px rgba(218,165,32,0.15), 4px 4px 16px rgba(0,0,0,0.7)',
              }}
            >
              <div className="flex justify-between mb-4">
                <Rivet />
                <div
                  className="text-xs tracking-[0.3em] uppercase"
                  style={{ color: '#8B5A2B' }}
                >
                  Communication Terminal
                </div>
                <Rivet />
              </div>

              <div className="flex flex-col gap-3">
                <motion.a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 px-5 py-3 cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #8B5A2B, #B87333)',
                    border: '1px solid #DAA520',
                    color: '#1A0E08',
                    fontWeight: 700,
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.5)',
                  }}
                  whileHover={{
                    boxShadow: '2px 2px 14px rgba(218,165,32,0.5)',
                    scale: 1.02,
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                >
                  <Mail size={16} />
                  {profile.email}
                </motion.a>

                <motion.a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 cursor-pointer"
                  style={{
                    background: 'transparent',
                    border: '1px solid #8B5A2B',
                    color: '#B87333',
                    boxShadow: '2px 2px 6px rgba(0,0,0,0.4)',
                  }}
                  whileHover={{
                    borderColor: '#DAA520',
                    color: '#DAA520',
                    boxShadow: '2px 2px 10px rgba(218,165,32,0.3)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <GithubIcon className="w-4 h-4" />
                  github.com/{profile.githubHandle}
                </motion.a>
              </div>

              <div className="flex justify-between mt-4">
                <Rivet />
                <Rivet />
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer
        className="py-6 text-center text-xs relative"
        style={{
          borderTop: '2px solid #8B5A2B',
          color: '#8B5A2B',
          background: 'linear-gradient(180deg, #1A0E08, #0D0804)',
        }}
      >
        <div className="flex items-center justify-center gap-3 mb-1">
          <Rivet />
          <span style={{ letterSpacing: '0.15em' }}>
            {profile.name.toUpperCase()} &bull; {toRoman(new Date().getFullYear())}
          </span>
          <Rivet />
        </div>
        <span className="text-xs" style={{ color: '#5A3A1A' }}>
          Built with React + Vite &bull; Powered by Steam &amp; Code
        </span>
      </footer>
    </div>
  )
}

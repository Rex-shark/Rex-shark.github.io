import { Link } from 'react-router'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowLeft, Mail, ExternalLink, Code2, Database, Layers, Cpu } from 'lucide-react'
import { handleHashClick } from '@/lib/utils'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

/* ── 黏土感卡片陰影工具函式 ── */
const clayShadow = (color: string, depth = 1) => {
  const m = depth
  return `0 ${2 * m}px ${4 * m}px ${color}44, 0 ${4 * m}px ${8 * m}px ${color}22, inset 0 -${2 * m}px ${3 * m}px rgba(0,0,0,0.12), inset 0 ${m}px ${2 * m}px rgba(255,255,255,0.55)`
}

/* ── Framer Motion Variants ── */
const floatIn: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: i * 0.1,
      ease: 'easeOut' as const,
    },
  }),
}

const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.75 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 260,
      damping: 18,
      delay: i * 0.08,
    },
  }),
}

/* ── 資料定義 ── */
const skillGroups = [
  {
    category: 'Backend',
    icon: Code2,
    color: '#FF6B6B',
    bg: '#FFF0F0',
    items: ['Java', 'Spring Boot', 'Spring Security', 'JPA / Hibernate'],
  },
  {
    category: 'Frontend',
    icon: Layers,
    color: '#4ECDC4',
    bg: '#F0FFFE',
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
  },
  {
    category: 'Database',
    icon: Database,
    color: '#FFE66D',
    bg: '#FFFDE7',
    items: ['PostgreSQL', 'MySQL', 'Redis'],
  },
  {
    category: 'DevOps',
    icon: Cpu,
    color: '#A78BFA',
    bg: '#F5F0FF',
    items: ['Docker', 'GitHub Actions', 'Linux', 'Nginx'],
  },
]

const projects = [
  {
    title: '個人網站',
    desc: '以 React + Vite 建構的 GitHub Pages 個人作品集，探索多種 UI 設計風格。',
    tags: ['React', 'TypeScript', 'Tailwind'],
    href: 'https://github.com/Rex-shark',
    color: '#FF6B6B',
    bg: 'linear-gradient(135deg, #FFF5F5 0%, #FFE4E4 100%)',
  },
  {
    title: 'Spring Boot API 範例',
    desc: '完整的 RESTful API 專案，包含 JWT 認證、RBAC 權限控管與 OpenAPI 文件。',
    tags: ['Java', 'Spring Boot', 'JWT'],
    href: 'https://github.com/Rex-shark',
    color: '#4ECDC4',
    bg: 'linear-gradient(135deg, #F0FFFE 0%, #D5F5F3 100%)',
  },
  {
    title: '系統分析設計教學',
    desc: 'UML、需求分析到系統設計的完整教學系列，含實戰案例解析。',
    tags: ['系統分析', 'UML', '教學'],
    href: 'https://github.com/Rex-shark',
    color: '#A78BFA',
    bg: 'linear-gradient(135deg, #F5F0FF 0%, #E8DFFE 100%)',
  },
]

/* ── 裝飾性 Blob 泡泡 ── */
function ClayBlob({
  size,
  color,
  style,
}: {
  size: number
  color: string
  style?: React.CSSProperties
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        background: color,
        borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%',
        boxShadow: clayShadow(color, 2),
        position: 'absolute',
        ...style,
      }}
    />
  )
}

/* ── 技能標籤 ── */
function SkillTag({ label, color }: { label: string; color: string }) {
  return (
    <motion.span
      className="inline-block px-3 py-1 text-sm font-semibold text-white rounded-2xl cursor-default"
      style={{
        background: color,
        boxShadow: clayShadow(color, 0.6),
      }}
      whileHover={{ scale: 1.08, y: -2 }}
      transition={{ type: 'spring' as const, stiffness: 400, damping: 15 }}
    >
      {label}
    </motion.span>
  )
}

export default function Claymorphism() {
  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{
        background: 'linear-gradient(160deg, #FFF9F0 0%, #F0F9FF 40%, #F5F0FF 100%)',
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      {/* Google Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Fredoka+One&display=swap"
      />

      {/* 背景裝飾 Blob */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <ClayBlob
          size={320}
          color="#FFB3BA"
          style={{ top: '-80px', right: '-60px', opacity: 0.35 }}
        />
        <ClayBlob
          size={240}
          color="#B3E5FC"
          style={{ bottom: '10%', left: '-60px', opacity: 0.3 }}
        />
        <ClayBlob
          size={180}
          color="#C8E6C9"
          style={{ top: '40%', right: '-40px', opacity: 0.28 }}
        />
        <ClayBlob
          size={140}
          color="#FFE0B2"
          style={{ top: '60%', left: '5%', opacity: 0.25 }}
        />
      </div>

      {/* ── 導覽列 ── */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div
          className="mx-4 mt-3 px-5 h-14 flex items-center justify-between rounded-3xl"
          style={{
            background: 'rgba(255,255,255,0.75)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 4px 16px rgba(167,139,250,0.15), 0 1px 4px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
          }}
        >
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm font-700 text-[#6B7280] hover:text-[#A78BFA] transition-colors cursor-pointer"
            style={{ fontWeight: 700 }}
          >
            <ArrowLeft size={15} />
            返回風格選擇
          </Link>
          <div className="hidden sm:flex items-center gap-1">
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
                className="px-3 py-1.5 text-sm font-semibold text-[#6B7280] hover:text-[#A78BFA] rounded-2xl hover:bg-[#A78BFA]/10 transition-all cursor-pointer"
              >
                {label}
              </a>
            ))}
            <a
              href="mailto:rexrex10050@gmail.com"
              className="ml-2 px-4 py-1.5 text-sm font-bold text-white rounded-2xl cursor-pointer transition-transform hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #A78BFA 0%, #818CF8 100%)',
                boxShadow: clayShadow('#A78BFA', 0.8),
              }}
            >
              聯絡我
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* ── Hero ── */}
        <section id="about" className="max-w-5xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10">
          {/* 文字區 */}
          <motion.div
            className="flex-1"
            initial="hidden"
            animate="visible"
            variants={floatIn}
            custom={0}
          >
            {/* 身份標籤 */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-sm font-bold text-white"
              style={{
                background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
                boxShadow: clayShadow('#FF6B6B', 0.7),
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <span className="w-2 h-2 rounded-full bg-white/80" />
              Java 全端工程師
            </motion.div>

            <h1
              className="text-5xl sm:text-6xl font-black leading-tight mb-4 text-[#1F2937]"
              style={{ fontFamily: "'Fredoka One', cursive" }}
            >
              嗨，我是
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #A78BFA 0%, #60A5FA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Rex
              </span>
            </h1>

            <p className="text-[#4B5563] text-lg leading-relaxed max-w-md mb-8 font-semibold">
              Java 全端工程師 ＆ 系統分析師。
              <br />
              喜歡將複雜系統化繁為簡，打造流暢好用的後端服務。
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <motion.a
                href="mailto:rexrex10050@gmail.com"
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-2xl cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
                  boxShadow: clayShadow('#FF6B6B', 0.9),
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97, y: 0 }}
                transition={{ type: 'spring' as const, stiffness: 400, damping: 15 }}
              >
                <Mail size={15} />
                聯絡我
              </motion.a>
              <motion.a
                href="https://github.com/Rex-shark"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-[#374151] rounded-2xl cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #F3F4F6 100%)',
                  boxShadow: clayShadow('#9CA3AF', 0.9),
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97, y: 0 }}
                transition={{ type: 'spring' as const, stiffness: 400, damping: 15 }}
              >
                <GithubIcon className="w-4 h-4" />
                GitHub
              </motion.a>
            </div>
          </motion.div>

          {/* 照片 */}
          <motion.div
            className="flex-shrink-0 relative"
            initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.2, type: 'spring', stiffness: 180, damping: 18 }}
          >
            {/* 外圈裝飾 */}
            <div
              className="absolute -inset-4 rounded-full opacity-30"
              style={{
                background: 'conic-gradient(from 0deg, #FF6B6B, #FFE66D, #4ECDC4, #A78BFA, #FF6B6B)',
                filter: 'blur(12px)',
              }}
            />
            {/* 照片容器 */}
            <div
              className="relative w-52 h-52 overflow-hidden"
              style={{
                borderRadius: '60% 40% 55% 45% / 45% 55% 45% 55%',
                boxShadow: `${clayShadow('#A78BFA', 2)}, 0 0 0 4px rgba(255,255,255,0.8)`,
              }}
            >
              <img src="/me.png" alt="Rex" className="w-full h-full object-cover" />
            </div>
            {/* 裝飾小球 */}
            <motion.div
              className="absolute -top-3 -right-3 w-10 h-10 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #FFE66D 0%, #FFB347 100%)',
                boxShadow: clayShadow('#FFE66D', 0.8),
              }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -bottom-2 -left-3 w-8 h-8 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #4ECDC4 0%, #44B8B0 100%)',
                boxShadow: clayShadow('#4ECDC4', 0.7),
              }}
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
            <motion.div
              className="absolute top-1/2 -right-5 w-6 h-6 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
                boxShadow: clayShadow('#FF6B6B', 0.6),
              }}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
          </motion.div>
        </section>

        {/* ── 技能 ── */}
        <section id="skills" className="max-w-5xl mx-auto px-6 py-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={floatIn}
            custom={0}
            className="mb-10"
          >
            <div
              className="inline-block px-4 py-1 rounded-full text-xs font-bold text-white mb-3"
              style={{
                background: 'linear-gradient(135deg, #4ECDC4 0%, #44B8B0 100%)',
                boxShadow: clayShadow('#4ECDC4', 0.5),
              }}
            >
              SKILLS
            </div>
            <h2
              className="text-4xl font-black text-[#1F2937]"
              style={{ fontFamily: "'Fredoka One', cursive" }}
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
                  viewport={{ once: true, margin: '-50px' }}
                  variants={popIn}
                  custom={i}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: 'spring' as const, stiffness: 300, damping: 18 }}
                  className="p-5 rounded-3xl cursor-default"
                  style={{
                    background: group.bg,
                    boxShadow: clayShadow(group.color, 1.2),
                  }}
                >
                  {/* 類別圖示 */}
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4"
                    style={{
                      background: `linear-gradient(135deg, ${group.color} 0%, ${group.color}CC 100%)`,
                      boxShadow: clayShadow(group.color, 0.7),
                    }}
                  >
                    <Icon size={20} color="white" />
                  </div>
                  <p className="text-xs font-black uppercase tracking-widest text-[#9CA3AF] mb-3">
                    {group.category}
                  </p>
                  <ul className="space-y-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm font-semibold text-[#374151]">
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: group.color }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>

          {/* 個別技能標籤雲 */}
          <motion.div
            className="mt-8 flex flex-wrap gap-2.5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={floatIn}
            custom={1}
          >
            {[
              { label: 'Java', color: '#FF6B6B' },
              { label: 'Spring Boot', color: '#FF8E53' },
              { label: 'Spring Security', color: '#FFB347' },
              { label: 'JPA/Hibernate', color: '#FFD93D' },
              { label: 'React', color: '#4ECDC4' },
              { label: 'TypeScript', color: '#45B7D1' },
              { label: 'Tailwind CSS', color: '#96CEB4' },
              { label: 'PostgreSQL', color: '#6C5CE7' },
              { label: 'Docker', color: '#A78BFA' },
              { label: 'GitHub Actions', color: '#74B9FF' },
              { label: '系統分析設計', color: '#FD79A8' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={popIn}
                custom={i}
              >
                <SkillTag label={s.label} color={s.color} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── 專案 ── */}
        <section id="projects" className="max-w-5xl mx-auto px-6 py-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={floatIn}
            custom={0}
            className="mb-10"
          >
            <div
              className="inline-block px-4 py-1 rounded-full text-xs font-bold text-white mb-3"
              style={{
                background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
                boxShadow: clayShadow('#FF6B6B', 0.5),
              }}
            >
              PROJECTS
            </div>
            <h2
              className="text-4xl font-black text-[#1F2937]"
              style={{ fontFamily: "'Fredoka One', cursive" }}
            >
              精選專案
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-6 rounded-3xl cursor-pointer"
                style={{
                  background: project.bg,
                  boxShadow: clayShadow(project.color, 1.4),
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={popIn}
                custom={i}
                whileHover={{ y: -8, scale: 1.02, boxShadow: clayShadow(project.color, 2) }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring' as const, stiffness: 280, damping: 16 }}
              >
                {/* 頂部色塊 */}
                <div
                  className="w-12 h-12 rounded-2xl mb-4 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${project.color} 0%, ${project.color}AA 100%)`,
                    boxShadow: clayShadow(project.color, 0.8),
                  }}
                >
                  <ExternalLink size={18} color="white" />
                </div>
                <h3
                  className="text-lg font-black text-[#1F2937] mb-2 group-hover:text-current transition-colors"
                  style={{ fontFamily: "'Fredoka One', cursive" }}
                >
                  {project.title}
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed mb-4 font-semibold">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-0.5 rounded-full font-bold text-white"
                      style={{
                        background: project.color,
                        boxShadow: clayShadow(project.color, 0.4),
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

        {/* ── 聯絡 ── */}
        <section id="contact" className="max-w-5xl mx-auto px-6 py-14 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={floatIn}
            custom={0}
          >
            {/* 大型 CTA 卡片 */}
            <div
              className="relative overflow-hidden rounded-[2.5rem] px-8 py-14"
              style={{
                background: 'linear-gradient(135deg, #FFF5F5 0%, #F5F0FF 50%, #F0F9FF 100%)',
                boxShadow: clayShadow('#A78BFA', 2),
              }}
            >
              {/* 背景裝飾 Blob */}
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 w-48 h-48 opacity-20"
                style={{
                  background: '#A78BFA',
                  borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%',
                  transform: 'translate(30%, -30%)',
                }}
              />
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 w-36 h-36 opacity-15"
                style={{
                  background: '#FF6B6B',
                  borderRadius: '50% 50% 60% 40% / 55% 45% 55% 45%',
                  transform: 'translate(-30%, 30%)',
                }}
              />

              <div className="relative z-10">
                <h2
                  className="text-4xl font-black text-[#1F2937] mb-4"
                  style={{ fontFamily: "'Fredoka One', cursive" }}
                >
                  想聊聊嗎？
                </h2>
                <p className="text-[#4B5563] font-semibold mb-8 max-w-sm mx-auto leading-relaxed">
                  無論是合作提案、技術交流或是問題諮詢，隨時歡迎來信！
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <motion.a
                    href="mailto:rexrex10050@gmail.com"
                    className="flex items-center gap-2 px-7 py-3.5 text-base font-bold text-white rounded-2xl cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
                      boxShadow: clayShadow('#FF6B6B', 1.2),
                    }}
                    whileHover={{ scale: 1.06, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring' as const, stiffness: 400, damping: 15 }}
                  >
                    <Mail size={18} />
                    rexrex10050@gmail.com
                  </motion.a>
                  <motion.a
                    href="https://github.com/Rex-shark"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-7 py-3.5 text-base font-bold text-[#374151] rounded-2xl cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #FFFFFF 0%, #F3F4F6 100%)',
                      boxShadow: clayShadow('#9CA3AF', 1.2),
                    }}
                    whileHover={{ scale: 1.06, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring' as const, stiffness: 400, damping: 15 }}
                  >
                    <GithubIcon className="w-5 h-5" />
                    GitHub
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="py-6 text-center text-sm font-semibold text-[#9CA3AF]">
        © 2025 Rex. Built with React + Vite.
      </footer>
    </div>
  )
}

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

/* macOS 視窗三點裝飾 */
function WindowDots() {
  return (
    <div className="flex gap-1.5">
      <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
      <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
      <div className="w-3 h-3 rounded-full bg-[#28C840]" />
    </div>
  )
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' as const },
  }),
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const skillGroups = [
  {
    category: 'Backend',
    icon: Server,
    items: [
      { name: 'Java', pct: 92 },
      { name: 'Spring Boot', pct: 88 },
      { name: 'Spring Security', pct: 82 },
      { name: 'JPA / Hibernate', pct: 80 },
    ],
  },
  {
    category: 'Frontend',
    icon: Code2,
    items: [
      { name: 'React', pct: 78 },
      { name: 'TypeScript', pct: 80 },
      { name: 'Tailwind CSS', pct: 82 },
    ],
  },
  {
    category: 'Database & DevOps',
    icon: Database,
    items: [
      { name: 'PostgreSQL', pct: 75 },
      { name: 'Docker', pct: 70 },
      { name: 'GitHub Actions', pct: 72 },
    ],
  },
  {
    category: '系統設計',
    icon: Layers,
    items: [
      { name: '系統分析設計', pct: 85 },
    ],
  },
]

const projects = [
  {
    title: '個人網站',
    desc: '以 React + Vite 建構的 GitHub Pages 個人作品集，探索多種 UI 設計風格，展示前端開發能力。',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    href: 'https://github.com/Rex-shark',
  },
  {
    title: 'Spring Boot API 範例',
    desc: '完整的 RESTful API 專案，包含 JWT 認證、RBAC 權限控管與 OpenAPI 自動化文件。',
    tags: ['Java', 'Spring Boot', 'JWT'],
    href: 'https://github.com/Rex-shark',
  },
  {
    title: '系統分析設計教學',
    desc: 'UML、需求分析到系統設計的完整教學系列，含實戰案例解析與設計模式應用。',
    tags: ['系統分析', 'UML', '教學'],
    href: 'https://github.com/Rex-shark',
  },
]

/* macOS 風格進度條 */
function AppleProgressBar({ pct, delay }: { pct: number; delay: number }) {
  return (
    <div className="h-1.5 bg-black/8 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ background: 'linear-gradient(90deg, #0071E3, #34AADC)' }}
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.7, ease: 'easeOut' as const }}
      />
    </div>
  )
}

export default function Macbook() {
  return (
    <div
      className="min-h-screen text-[#1C1C1E]"
      style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif",
        background: '#F2F2F7',
      }}
    >
      {/* 導覽列 - macOS menu bar 風格 */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-12 flex items-center px-6"
        style={{
          background: 'rgba(242,242,247,0.72)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '0.5px solid rgba(0,0,0,0.12)',
        }}
      >
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
          {/* 左側 - 返回 */}
          <Link
            to="/"
            className="flex items-center gap-1.5 text-[13px] text-[#0071E3] hover:text-[#0077ED] transition-colors duration-150 cursor-pointer font-medium"
          >
            <ArrowLeft size={14} />
            返回風格選擇
          </Link>

          {/* 右側 - 錨點導覽 */}
          <div className="flex items-center gap-6">
            {[
              { label: '關於', href: '#about' },
              { label: '技能', href: '#skills' },
              { label: '專案', href: '#projects' },
              { label: '聯絡', href: '#contact' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[13px] text-[#1C1C1E]/70 hover:text-[#1C1C1E] transition-colors duration-150 font-medium cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="pt-12">
        {/* Hero 區塊 */}
        <section id="about" className="max-w-5xl mx-auto px-6 py-24">
          <div className="flex flex-col md:flex-row items-center gap-14">
            {/* 文字內容 */}
            <motion.div
              className="flex-1"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.p
                className="text-[13px] font-semibold tracking-widest uppercase mb-4"
                style={{ color: '#0071E3', letterSpacing: '0.12em' }}
                variants={fadeUp}
                custom={0}
              >
                Java Full-Stack Engineer
              </motion.p>
              <motion.h1
                className="font-bold leading-tight mb-5"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', letterSpacing: '-0.02em' }}
                variants={fadeUp}
                custom={1}
              >
                Hi, I'm{' '}
                <span style={{ color: '#0071E3' }}>Rex</span>
              </motion.h1>
              <motion.p
                className="text-[17px] leading-relaxed mb-8 max-w-md"
                style={{ color: '#3C3C43', lineHeight: 1.65 }}
                variants={fadeUp}
                custom={2}
              >
                Java 全端工程師 ＆ 系統分析師。熱衷於設計穩健的後端架構，並持續分享
                Java、Spring Boot 與系統設計的實戰經驗。
              </motion.p>
              <motion.div className="flex items-center gap-3" variants={fadeUp} custom={3}>
                <a
                  href="mailto:rexrex10050@gmail.com"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-[15px] font-semibold transition-all duration-200 cursor-pointer hover:brightness-90"
                  style={{ background: '#0071E3', letterSpacing: '-0.01em' }}
                >
                  <Mail size={15} />
                  聯絡我
                </a>
                <a
                  href="https://github.com/Rex-shark"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[15px] font-semibold transition-all duration-200 cursor-pointer"
                  style={{
                    background: 'rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '0.5px solid rgba(0,0,0,0.18)',
                    color: '#1C1C1E',
                    letterSpacing: '-0.01em',
                  }}
                >
                  <GithubIcon className="w-4 h-4" />
                  GitHub
                </a>
              </motion.div>
            </motion.div>

            {/* 照片 - macOS 視窗風格 */}
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' as const }}
            >
              <div
                className="overflow-hidden"
                style={{
                  borderRadius: '18px',
                  boxShadow: '0 4px 48px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)',
                  border: '0.5px solid rgba(0,0,0,0.1)',
                  background: 'rgba(255,255,255,0.9)',
                }}
              >
                {/* 視窗標題列 */}
                <div
                  className="flex items-center px-4 h-10"
                  style={{
                    background: 'rgba(246,246,246,0.95)',
                    borderBottom: '0.5px solid rgba(0,0,0,0.1)',
                  }}
                >
                  <WindowDots />
                  <span className="mx-auto text-[12px] font-medium" style={{ color: '#3C3C43' }}>
                    Rex · 個人照片
                  </span>
                </div>
                {/* 照片 */}
                <div className="w-56 h-56">
                  <img
                    src="/me.png"
                    alt="Rex"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 分隔線 */}
        <div className="max-w-5xl mx-auto px-6">
          <div style={{ height: '0.5px', background: 'rgba(0,0,0,0.1)' }} />
        </div>

        {/* 技能區塊 */}
        <section id="skills" className="max-w-5xl mx-auto px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            custom={0}
            className="mb-10"
          >
            <p
              className="text-[12px] font-semibold tracking-widest uppercase mb-2"
              style={{ color: '#0071E3' }}
            >
              Skills
            </p>
            <h2
              className="text-[28px] font-bold"
              style={{ letterSpacing: '-0.02em' }}
            >
              技術能力
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {skillGroups.map((group, gi) => {
              const Icon = group.icon
              return (
                <motion.div
                  key={group.category}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={fadeUp}
                  custom={gi}
                  className="p-5"
                  style={{
                    background: 'rgba(255,255,255,0.72)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderRadius: '16px',
                    border: '0.5px solid rgba(0,0,0,0.1)',
                    boxShadow: '0 2px 20px rgba(0,0,0,0.05)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ background: '#0071E3' }}
                    >
                      <Icon size={14} color="white" />
                    </div>
                    <span className="text-[13px] font-semibold" style={{ color: '#3C3C43' }}>
                      {group.category}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {group.items.map((item, ii) => (
                      <div key={item.name}>
                        <div className="flex justify-between mb-1">
                          <span className="text-[14px] font-medium" style={{ color: '#1C1C1E' }}>
                            {item.name}
                          </span>
                          <span className="text-[12px]" style={{ color: '#8E8E93' }}>
                            {item.pct}%
                          </span>
                        </div>
                        <AppleProgressBar pct={item.pct} delay={gi * 0.1 + ii * 0.06} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* 分隔線 */}
        <div className="max-w-5xl mx-auto px-6">
          <div style={{ height: '0.5px', background: 'rgba(0,0,0,0.1)' }} />
        </div>

        {/* 專案區塊 */}
        <section id="projects" className="max-w-5xl mx-auto px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            custom={0}
            className="mb-10"
          >
            <p
              className="text-[12px] font-semibold tracking-widest uppercase mb-2"
              style={{ color: '#0071E3' }}
            >
              Projects
            </p>
            <h2
              className="text-[28px] font-bold"
              style={{ letterSpacing: '-0.02em' }}
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
                className="group block p-6 cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.72)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: '16px',
                  border: '0.5px solid rgba(0,0,0,0.1)',
                  boxShadow: '0 2px 20px rgba(0,0,0,0.05)',
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
                custom={i}
                whileHover={{
                  y: -3,
                  boxShadow: '0 8px 32px rgba(0,113,227,0.12)',
                  transition: { duration: 0.2, ease: 'easeOut' as const },
                }}
              >
                {/* 視窗三點 */}
                <div className="flex items-start justify-between mb-4">
                  <WindowDots />
                  <ExternalLink
                    size={14}
                    className="text-[#8E8E93] group-hover:text-[#0071E3] transition-colors duration-200 flex-shrink-0"
                  />
                </div>
                <h3
                  className="font-semibold text-[16px] mb-2"
                  style={{ color: '#1C1C1E', letterSpacing: '-0.01em' }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-[13px] leading-relaxed mb-4"
                  style={{ color: '#3C3C43' }}
                >
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2 py-0.5 font-medium rounded-full"
                      style={{
                        background: 'rgba(0,113,227,0.08)',
                        color: '#0071E3',
                        border: '0.5px solid rgba(0,113,227,0.2)',
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

        {/* 分隔線 */}
        <div className="max-w-5xl mx-auto px-6">
          <div style={{ height: '0.5px', background: 'rgba(0,0,0,0.1)' }} />
        </div>

        {/* 聯絡區塊 */}
        <section id="contact" className="max-w-5xl mx-auto px-6 py-24 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.p
              className="text-[12px] font-semibold tracking-widest uppercase mb-3"
              style={{ color: '#0071E3' }}
              variants={fadeUp}
              custom={0}
            >
              Contact
            </motion.p>
            <motion.h2
              className="font-bold mb-4"
              style={{ fontSize: '2rem', letterSpacing: '-0.02em' }}
              variants={fadeUp}
              custom={1}
            >
              想聊聊嗎？
            </motion.h2>
            <motion.p
              className="text-[16px] mb-10 max-w-sm mx-auto"
              style={{ color: '#3C3C43', lineHeight: 1.65 }}
              variants={fadeUp}
              custom={2}
            >
              無論是合作提案、技術交流或問題諮詢，都歡迎來信。
            </motion.p>

            {/* 聯絡卡片 */}
            <motion.div
              className="inline-block"
              variants={fadeUp}
              custom={3}
            >
              <div
                className="p-6 text-left"
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: '18px',
                  border: '0.5px solid rgba(0,0,0,0.1)',
                  boxShadow: '0 4px 32px rgba(0,0,0,0.08)',
                  minWidth: '300px',
                }}
              >
                {/* 視窗標題列 */}
                <div className="flex items-center gap-2 mb-5">
                  <WindowDots />
                  <span
                    className="ml-auto text-[12px] font-medium"
                    style={{ color: '#8E8E93' }}
                  >
                    新郵件
                  </span>
                </div>
                <div className="space-y-3 mb-5">
                  <div style={{ borderBottom: '0.5px solid rgba(0,0,0,0.08)', paddingBottom: '10px' }}>
                    <span className="text-[12px] font-medium" style={{ color: '#8E8E93' }}>收件人</span>
                    <p className="text-[14px] mt-0.5" style={{ color: '#1C1C1E' }}>rexrex10050@gmail.com</p>
                  </div>
                  <div style={{ borderBottom: '0.5px solid rgba(0,0,0,0.08)', paddingBottom: '10px' }}>
                    <span className="text-[12px] font-medium" style={{ color: '#8E8E93' }}>主旨</span>
                    <p className="text-[14px] mt-0.5" style={{ color: '#8E8E93' }}>你好，Rex！我想...</p>
                  </div>
                </div>
                <a
                  href="mailto:rexrex10050@gmail.com"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-white text-[15px] font-semibold transition-all duration-200 cursor-pointer hover:brightness-90"
                  style={{ background: '#0071E3', letterSpacing: '-0.01em' }}
                >
                  <Mail size={15} />
                  傳送郵件
                </a>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="py-6 text-center text-[12px]"
        style={{
          borderTop: '0.5px solid rgba(0,0,0,0.1)',
          color: '#8E8E93',
        }}
      >
        © 2025 Rex. Built with React + Vite.
      </footer>
    </div>
  )
}

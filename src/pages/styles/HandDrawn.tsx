import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail } from 'lucide-react'

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

const skills = [
  { label: 'Java', pct: 92 },
  { label: 'Spring Boot', pct: 88 },
  { label: 'React / TypeScript', pct: 78 },
  { label: 'PostgreSQL', pct: 75 },
  { label: 'Docker', pct: 70 },
  { label: '系統分析設計', pct: 85 },
]

const projects = [
  {
    title: '個人網站',
    desc: 'React + Vite 建構的作品集，探索多種 UI 設計風格。',
    tags: ['React', 'TypeScript', 'Tailwind'],
    rotate: '-1deg',
    href: 'https://github.com/Rex-shark',
  },
  {
    title: 'Spring Boot API',
    desc: 'RESTful API 完整範例，含 JWT 認證與 OpenAPI 文件。',
    tags: ['Java', 'Spring Boot', 'JWT'],
    rotate: '0.8deg',
    href: 'https://github.com/Rex-shark',
  },
  {
    title: '系統分析教學',
    desc: 'UML 到系統設計的實戰教學系列。',
    tags: ['系統分析', 'UML'],
    rotate: '-0.5deg',
    href: 'https://github.com/Rex-shark',
  },
]

/* 手繪底線裝飾 */
function SketchUnderline() {
  return (
    <svg viewBox="0 0 120 10" className="w-24 h-2.5" fill="none">
      <path d="M2 7 Q30 2 60 6 Q90 9 118 4" stroke="#C4A77D" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

/* 技能進度條（手繪風） */
function SketchBar({ label, pct, delay }: { label: string; pct: number; delay: number }) {
  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.45 }}
    >
      <div className="flex justify-between mb-1">
        <span className="text-sm text-[#1A1A1A]" style={{ fontFamily: "'Caveat', cursive" }}>
          {label}
        </span>
        <span className="text-xs text-[#4A4A4A]">{pct}%</span>
      </div>
      <div className="h-3 bg-[#E8DDD0] rounded-full overflow-hidden" style={{ transform: 'rotate(-0.3deg)' }}>
        <motion.div
          className="h-full bg-[#C4A77D] rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2, duration: 0.7, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}

export default function HandDrawn() {
  return (
    <div
      className="min-h-screen text-[#1A1A1A] relative"
      style={{
        background: '#FAFAF8',
        fontFamily: "'Caveat', cursive",
      }}
    >
      {/* 載入 Google Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Kalam:wght@300;400;700&display=swap"
      />

      {/* 紙張橫線紋理 */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 27px,
            #4A4A4A 27px,
            #4A4A4A 28px
          )`,
        }}
      />

      {/* 導覽列 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAF8]/90 backdrop-blur border-b border-[#4A4A4A]/10">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors cursor-pointer"
            style={{ fontFamily: "'Caveat', cursive", fontSize: '1rem' }}
          >
            <ArrowLeft size={15} />
            返回風格選擇
          </Link>
          <div className="flex items-center gap-5">
            {['關於', '技能', '專案', '聯絡'].map((item, i) => (
              <a
                key={item}
                href={`#${['about', 'skills', 'projects', 'contact'][i]}`}
                className="text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors"
                style={{ fontSize: '1.05rem' }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="pt-14 max-w-4xl mx-auto px-6">
        {/* Hero */}
        <section id="about" className="py-20 flex flex-col md:flex-row items-center gap-12">
          {/* 個人照片 - 手繪邊框感 */}
          <motion.div
            className="flex-shrink-0 relative"
            initial={{ opacity: 0, rotate: -4 }}
            animate={{ opacity: 1, rotate: -2 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div
              className="w-44 h-44 overflow-hidden"
              style={{
                borderRadius: '42% 58% 55% 45% / 48% 42% 58% 52%',
                border: '3px solid #1A1A1A',
                boxShadow: '4px 4px 0 #C4A77D',
              }}
            >
              <img src="/me.png" alt="Rex" className="w-full h-full object-cover" />
            </div>
            {/* 裝飾點 */}
            <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full border-2 border-[#C4A77D] bg-[#FAFAF8]" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-[#C4A77D]" />
          </motion.div>

          {/* 文字 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-[#4A4A4A] text-lg mb-1">嗨，我是</p>
            <h1 className="text-6xl sm:text-7xl font-bold text-[#1A1A1A] mb-2" style={{ fontFamily: "'Kalam', cursive" }}>
              Rex ✦
            </h1>
            <SketchUnderline />
            <p className="text-xl text-[#4A4A4A] mt-4 mb-6 max-w-sm leading-relaxed">
              Java 全端工程師 ＆ 系統分析師
              <br />
              喜歡把複雜的系統說得簡單易懂 ✨
            </p>
            <div className="flex items-center gap-3">
              <motion.a
                href="mailto:rexrex10050@gmail.com"
                className="relative flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] text-[#FAFAF8] text-base rounded cursor-pointer"
                style={{ boxShadow: '3px 3px 0 #C4A77D' }}
                whileHover={{ x: 1, y: 1, boxShadow: '2px 2px 0 #C4A77D' }}
                whileTap={{ x: 3, y: 3, boxShadow: '0px 0px 0 #C4A77D' }}
              >
                <Mail size={15} />
                聯絡我
              </motion.a>
              <motion.a
                href="https://github.com/Rex-shark"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 border-2 border-[#1A1A1A] text-base rounded cursor-pointer"
                style={{ boxShadow: '3px 3px 0 #4A4A4A' }}
                whileHover={{ x: 1, y: 1, boxShadow: '2px 2px 0 #4A4A4A' }}
                whileTap={{ x: 3, y: 3, boxShadow: '0px 0px 0 #4A4A4A' }}
              >
                <GithubIcon size={15} />
                GitHub
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* 手繪分隔線 */}
        <svg viewBox="0 0 800 12" className="w-full h-3 mb-0" fill="none">
          <path d="M0 6 Q200 2 400 6 Q600 10 800 5" stroke="#C4A77D" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        </svg>

        {/* 技能 */}
        <section id="skills" className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-4xl font-bold mb-1"
              style={{ fontFamily: "'Kalam', cursive", transform: 'rotate(-1deg)', display: 'inline-block' }}
            >
              技能 & 工具
            </h2>
            <SketchUnderline />
          </motion.div>
          <div className="mt-8 max-w-lg">
            {skills.map((s, i) => (
              <SketchBar key={s.label} label={s.label} pct={s.pct} delay={i * 0.08} />
            ))}
          </div>
        </section>

        {/* 手繪分隔線 */}
        <svg viewBox="0 0 800 12" className="w-full h-3" fill="none">
          <path d="M0 7 Q200 3 400 7 Q600 11 800 6" stroke="#C4A77D" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        </svg>

        {/* 專案 */}
        <section id="projects" className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-4xl font-bold mb-1"
              style={{ fontFamily: "'Kalam', cursive", transform: 'rotate(0.8deg)', display: 'inline-block' }}
            >
              精選專案
            </h2>
            <SketchUnderline />
          </motion.div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {projects.map((project, i) => (
              <motion.a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-5 bg-white border-2 border-[#1A1A1A] rounded cursor-pointer"
                style={{
                  transform: `rotate(${project.rotate})`,
                  boxShadow: '4px 4px 0 #C4A77D',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                whileHover={{ x: 2, y: 2, boxShadow: '2px 2px 0 #C4A77D' }}
                whileTap={{ x: 4, y: 4, boxShadow: '0px 0px 0 #C4A77D' }}
              >
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Kalam', cursive" }}>
                  {project.title}
                </h3>
                <p className="text-sm text-[#4A4A4A] leading-relaxed mb-3">{project.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 border border-[#C4A77D] text-[#1A1A1A] rounded"
                      style={{ background: '#C4A77D22' }}
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
        <section id="contact" className="py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-4xl font-bold mb-3"
              style={{ fontFamily: "'Kalam', cursive", transform: 'rotate(-0.5deg)', display: 'inline-block' }}
            >
              想聊聊嗎？ ☕
            </h2>
            <p className="text-lg text-[#4A4A4A] mb-8 max-w-xs mx-auto leading-relaxed">
              合作提案、技術交流、或只是打個招呼都好！
            </p>
            <motion.a
              href="mailto:rexrex10050@gmail.com"
              className="inline-flex items-center gap-2 px-7 py-3 bg-[#1A1A1A] text-[#FAFAF8] text-lg rounded cursor-pointer"
              style={{ boxShadow: '4px 4px 0 #C4A77D', fontFamily: "'Caveat', cursive" }}
              whileHover={{ x: 2, y: 2, boxShadow: '2px 2px 0 #C4A77D' }}
              whileTap={{ x: 4, y: 4, boxShadow: '0px 0px 0 #C4A77D' }}
            >
              <Mail size={16} />
              rexrex10050@gmail.com
            </motion.a>
          </motion.div>
        </section>
      </main>

      <footer className="border-t-2 border-dashed border-[#4A4A4A]/20 py-6 text-center text-sm text-[#4A4A4A]/60">
        © 2025 Rex ✦ 用心做的網站
      </footer>
    </div>
  )
}

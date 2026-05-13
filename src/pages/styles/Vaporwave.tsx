import { Link } from 'react-router'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowLeft, Mail, ExternalLink } from 'lucide-react'
import { handleHashClick } from '@/lib/utils'

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

/* 透視網格背景 */
function PerspectiveGrid() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[40vh] overflow-hidden opacity-30">
      <div
        className="w-full h-full"
        style={{
          background: `
            linear-gradient(rgba(255,113,206,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,113,206,0.4) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: 'perspective(400px) rotateX(60deg)',
          transformOrigin: 'center top',
        }}
      />
    </div>
  )
}

/* 落日裝飾 */
function SunsetOrb() {
  return (
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      <div
        className="w-40 h-40 rounded-full opacity-50"
        style={{
          background: 'linear-gradient(180deg, #FF6B6B 0%, #FF71CE 40%, #B967FF 70%, #05D9E8 100%)',
          filter: 'blur(40px)',
        }}
      />
    </div>
  )
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' as const },
  }),
}

const glowPulse: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
}

const skills = [
  { category: 'Backend', items: ['Java', 'Spring Boot', 'Spring Security', 'JPA / Hibernate'] },
  { category: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'] },
  { category: 'Database', items: ['PostgreSQL', 'MySQL', 'Redis'] },
  { category: 'DevOps', items: ['Docker', 'GitHub Actions', 'Linux', 'Nginx'] },
]

const projects = [
  {
    title: '個人網站',
    desc: '以 React + Vite 建構的 GitHub Pages 個人作品集，探索多種 UI 設計風格。',
    tags: ['React', 'TypeScript', 'Tailwind'],
    href: 'https://github.com/Rex-shark',
  },
  {
    title: 'Spring Boot API 範例',
    desc: '完整的 RESTful API 專案，包含 JWT 認證、RBAC 權限控管與 OpenAPI 文件。',
    tags: ['Java', 'Spring Boot', 'JWT'],
    href: 'https://github.com/Rex-shark',
  },
  {
    title: '系統分析設計教學',
    desc: 'UML、需求分析到系統設計的完整教學系列，含實戰案例解析。',
    tags: ['系統分析', 'UML', '教學'],
    href: 'https://github.com/Rex-shark',
  },
]

export default function Vaporwave() {
  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #1a0533 0%, #2d1b69 30%, #1a0533 100%)',
        fontFamily: "'Orbitron', sans-serif",
      }}
    >
      {/* Google Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&display=swap"
      />

      {/* 導覽列 */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur border-b border-[#FF71CE]/20" style={{ background: 'rgba(26,5,51,0.85)' }}>
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            to="/gallery"
            className="flex items-center gap-1.5 text-sm text-[#B967FF]/80 hover:text-[#FF71CE] transition-colors duration-200 cursor-pointer"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            <ArrowLeft size={15} />
            返回設計實驗室
          </Link>
          <div className="flex items-center gap-5" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            <a href="#about" onClick={handleHashClick} className="text-sm text-[#B967FF]/80 hover:text-[#FF71CE] transition-colors duration-200">關於</a>
            <a href="#skills" onClick={handleHashClick} className="text-sm text-[#B967FF]/80 hover:text-[#FF71CE] transition-colors duration-200">技能</a>
            <a href="#projects" onClick={handleHashClick} className="text-sm text-[#B967FF]/80 hover:text-[#FF71CE] transition-colors duration-200">專案</a>
            <a
              href="mailto:rexrex10050@gmail.com"
              className="text-sm px-3.5 py-1.5 rounded-lg border border-[#FF71CE]/50 text-[#FF71CE] hover:bg-[#FF71CE]/15 transition-all duration-200 cursor-pointer"
              style={{ textShadow: '0 0 8px rgba(255,113,206,0.5)' }}
            >
              聯絡我
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-14 relative z-10">
        {/* Hero */}
        <section id="about" className="max-w-5xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-12 relative">
          <SunsetOrb />

          <motion.div
            className="flex-1 relative z-10"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
          >
            <p
              className="text-xs font-semibold tracking-[0.3em] uppercase mb-4"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                color: '#05D9E8',
                textShadow: '0 0 10px rgba(5,217,232,0.6)',
              }}
            >
              Java Full-Stack Engineer
            </p>
            <h1
              className="text-5xl sm:text-7xl font-black leading-tight mb-5"
              style={{
                background: 'linear-gradient(135deg, #FF71CE 0%, #B967FF 50%, #05D9E8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 20px rgba(185,103,255,0.4))',
              }}
            >
              Hi, I'm
              <br />
              Rex
            </h1>
            <p
              className="text-lg leading-relaxed max-w-md mb-8"
              style={{ fontFamily: "'Rajdhani', sans-serif", color: '#D4B8FF' }}
            >
              Java 全端工程師 ＆ 系統分析師。熱衷於設計穩健的後端架構，並持續分享 Java、Spring Boot 與系統設計的實戰經驗。
            </p>
            <div className="flex items-center gap-3">
              <motion.a
                href="mailto:rexrex10050@gmail.com"
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg cursor-pointer transition-all duration-200"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  background: 'linear-gradient(135deg, #FF71CE, #B967FF)',
                  color: '#fff',
                  boxShadow: '0 0 20px rgba(255,113,206,0.3)',
                }}
                whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(255,113,206,0.5)' }}
                whileTap={{ scale: 0.97 }}
              >
                <Mail size={15} />
                聯絡我
              </motion.a>
              <motion.a
                href="https://github.com/Rex-shark"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 border border-[#05D9E8]/50 text-[#05D9E8] text-sm font-medium rounded-lg cursor-pointer transition-all duration-200"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  textShadow: '0 0 8px rgba(5,217,232,0.4)',
                }}
                whileHover={{ scale: 1.03, borderColor: '#05D9E8', boxShadow: '0 0 20px rgba(5,217,232,0.3)' }}
                whileTap={{ scale: 0.97 }}
              >
                <GithubIcon size={15} />
                GitHub
              </motion.a>
            </div>
          </motion.div>

          {/* 個人照片 */}
          <motion.div
            className="flex-shrink-0 relative"
            initial="hidden"
            animate="visible"
            variants={glowPulse}
          >
            <div
              className="w-52 h-52 rounded-2xl overflow-hidden relative"
              style={{
                border: '2px solid rgba(185,103,255,0.5)',
                boxShadow: '0 0 30px rgba(185,103,255,0.3), inset 0 0 30px rgba(255,113,206,0.1)',
              }}
            >
              <img
                src="/me.png"
                alt="Rex"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, transparent 50%, rgba(26,5,51,0.4) 100%)',
                }}
              />
            </div>
            {/* 霓虹角落裝飾 */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#FF71CE]" style={{ boxShadow: '-2px -2px 8px rgba(255,113,206,0.4)' }} />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#05D9E8]" style={{ boxShadow: '2px 2px 8px rgba(5,217,232,0.4)' }} />
          </motion.div>
        </section>

        {/* 分隔線 */}
        <div className="max-w-5xl mx-auto px-6">
          <div
            className="h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #FF71CE, #B967FF, #05D9E8, transparent)' }}
          />
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
            <p
              className="text-xs font-semibold tracking-[0.3em] uppercase mb-2"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                color: '#05D9E8',
                textShadow: '0 0 8px rgba(5,217,232,0.5)',
              }}
            >
              Skills
            </p>
            <h2
              className="text-3xl font-bold mb-10"
              style={{
                color: '#FF71CE',
                textShadow: '0 0 15px rgba(255,113,206,0.4)',
              }}
            >
              技術能力
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {skills.map((group, i) => (
              <motion.div
                key={group.category}
                className="p-5 rounded-xl"
                style={{
                  background: 'rgba(185,103,255,0.06)',
                  border: '1px solid rgba(185,103,255,0.15)',
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
                custom={i}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-3"
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    color: '#B967FF',
                    textShadow: '0 0 6px rgba(185,103,255,0.4)',
                  }}
                >
                  {group.category}
                </p>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm flex items-center gap-2"
                      style={{ fontFamily: "'Rajdhani', sans-serif", color: '#D4B8FF' }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{
                          background: '#FF71CE',
                          boxShadow: '0 0 6px rgba(255,113,206,0.6)',
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 分隔線 */}
        <div className="max-w-5xl mx-auto px-6">
          <div
            className="h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #05D9E8, #B967FF, #FF71CE, transparent)' }}
          />
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
            <p
              className="text-xs font-semibold tracking-[0.3em] uppercase mb-2"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                color: '#05D9E8',
                textShadow: '0 0 8px rgba(5,217,232,0.5)',
              }}
            >
              Projects
            </p>
            <h2
              className="text-3xl font-bold mb-10"
              style={{
                color: '#FF71CE',
                textShadow: '0 0 15px rgba(255,113,206,0.4)',
              }}
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
                className="group block p-6 rounded-2xl cursor-pointer transition-all duration-300"
                style={{
                  background: 'rgba(45,27,105,0.6)',
                  border: '1px solid rgba(185,103,255,0.2)',
                  backdropFilter: 'blur(8px)',
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
                custom={i}
                whileHover={{
                  borderColor: 'rgba(255,113,206,0.5)',
                  boxShadow: '0 0 30px rgba(255,113,206,0.15), inset 0 0 30px rgba(185,103,255,0.05)',
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3
                    className="font-semibold"
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      color: '#FF71CE',
                      fontSize: '1.1rem',
                    }}
                  >
                    {project.title}
                  </h3>
                  <ExternalLink
                    size={14}
                    className="flex-shrink-0 mt-0.5 transition-colors duration-200"
                    style={{ color: 'rgba(185,103,255,0.4)' }}
                  />
                </div>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ fontFamily: "'Rajdhani', sans-serif", color: '#D4B8FF' }}
                >
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-md"
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        background: 'rgba(5,217,232,0.1)',
                        color: '#05D9E8',
                        border: '1px solid rgba(5,217,232,0.2)',
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
        <section className="max-w-5xl mx-auto px-6 py-20 text-center relative">
          <PerspectiveGrid />
          <motion.div
            className="relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2
              className="text-3xl font-bold mb-4"
              style={{
                color: '#FF71CE',
                textShadow: '0 0 15px rgba(255,113,206,0.4)',
              }}
            >
              想聊聊？
            </h2>
            <p
              className="mb-8 max-w-sm mx-auto"
              style={{ fontFamily: "'Rajdhani', sans-serif", color: '#D4B8FF' }}
            >
              無論是合作提案、技術交流或是問題諮詢，都歡迎來信。
            </p>
            <motion.a
              href="mailto:rexrex10050@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 font-medium rounded-xl cursor-pointer"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                background: 'linear-gradient(135deg, #FF71CE, #B967FF)',
                color: '#fff',
                boxShadow: '0 0 25px rgba(255,113,206,0.3)',
              }}
              whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(255,113,206,0.5)' }}
              whileTap={{ scale: 0.97 }}
            >
              <Mail size={16} />
              rexrex10050@gmail.com
            </motion.a>
          </motion.div>
        </section>
      </main>

      <footer
        className="relative z-10 py-6 text-center text-xs"
        style={{
          borderTop: '1px solid rgba(185,103,255,0.2)',
          color: 'rgba(185,103,255,0.4)',
          fontFamily: "'Rajdhani', sans-serif",
        }}
      >
        © 2025 Rex. Built with React + Vite.
      </footer>
    </div>
  )
}

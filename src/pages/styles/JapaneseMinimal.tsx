import { Link } from 'react-router'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowLeft, Mail, ExternalLink } from 'lucide-react'

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

/* 圓相（Ensō）裝飾 SVG */
function Enso({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none">
      <path
        d="M100 20 C155 20 180 60 180 100 C180 145 150 178 105 180 C65 182 28 152 22 110 C16 68 45 25 90 20"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.15"
      />
    </svg>
  )
}

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
}

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

const skills = [
  { category: '後端', items: ['Java', 'Spring Boot', 'Spring Security', 'JPA / Hibernate'] },
  { category: '前端', items: ['React', 'TypeScript', 'Tailwind CSS'] },
  { category: '資料庫', items: ['PostgreSQL'] },
  { category: '維運', items: ['Docker', 'GitHub Actions'] },
  { category: '分析', items: ['系統分析設計'] },
]

const projects = [
  {
    title: '個人網站',
    desc: '以 React + Vite 建構的個人作品集，探索多種 UI 設計風格的可能性。',
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

export default function JapaneseMinimal() {
  return (
    <div
      className="min-h-screen text-[#2C2C2C]"
      style={{
        background: '#F7F5F0',
        fontFamily: "'Zen Kaku Gothic New', 'Noto Sans TC', sans-serif",
      }}
    >
      {/* 載入 Google Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@300;400;500;700&family=Noto+Serif+TC:wght@300;400;600;700&display=swap"
      />

      {/* 導覽列 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F7F5F0]/85 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-[#8C8578] hover:text-[#2C2C2C] transition-colors duration-200 cursor-pointer"
          >
            <ArrowLeft size={15} />
            返回風格選擇
          </Link>
          <div className="flex items-center gap-6">
            {['關於', '技能', '專案', '聯絡'].map((item, i) => (
              <a
                key={item}
                href={`#${['about', 'skills', 'projects', 'contact'][i]}`}
                className="text-sm text-[#8C8578] hover:text-[#2C2C2C] transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        {/* 極細底線 */}
        <div className="h-px bg-[#2C2C2C]/[0.06]" />
      </nav>

      <main className="pt-14">
        {/* Hero */}
        <section id="about" className="max-w-4xl mx-auto px-6 py-28 relative">
          {/* 背景圓相裝飾 */}
          <Enso className="absolute top-8 right-0 w-72 h-72 text-[#8C8578] pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center gap-16 relative">
            {/* 個人照片 */}
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
            >
              <div className="relative">
                <div className="w-48 h-48 rounded-full overflow-hidden ring-1 ring-[#2C2C2C]/[0.08]">
                  <img
                    src="/me.png"
                    alt="Rex"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* 小印章裝飾 */}
                <div className="absolute -bottom-2 -right-2 w-10 h-10 flex items-center justify-center">
                  <div
                    className="w-9 h-9 border-2 border-[#C75C3A] rounded-sm flex items-center justify-center"
                    style={{ transform: 'rotate(5deg)' }}
                  >
                    <span
                      className="text-[#C75C3A] text-xs font-bold"
                      style={{ fontFamily: "'Noto Serif TC', serif" }}
                    >
                      力
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 文字 */}
            <motion.div
              className="flex-1 text-center md:text-left"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              custom={0}
            >
              <p className="text-sm tracking-[0.3em] text-[#8C8578] mb-4">
                全端工程師 ・ 系統分析師
              </p>
              <h1
                className="text-5xl sm:text-6xl font-light mb-6 tracking-tight"
                style={{ fontFamily: "'Noto Serif TC', serif" }}
              >
                Rex
              </h1>
              <div className="w-12 h-px bg-[#2C2C2C]/20 mb-6 mx-auto md:mx-0" />
              <p className="text-[#5A5549] text-base leading-[1.9] max-w-sm">
                以簡潔為本，構築穩健的後端架構。持續分享 Java、Spring Boot 與系統設計的實踐心得。
              </p>
              <div className="flex items-center gap-4 mt-8 justify-center md:justify-start">
                <a
                  href="mailto:rexrex10050@gmail.com"
                  className="group flex items-center gap-2 px-5 py-2.5 bg-[#2C2C2C] text-[#F7F5F0] text-sm tracking-wider hover:bg-[#3D3D3D] transition-colors duration-200 cursor-pointer"
                >
                  <Mail size={14} />
                  聯絡我
                </a>
                <a
                  href="https://github.com/Rex-shark"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 border border-[#2C2C2C]/20 text-sm tracking-wider hover:border-[#2C2C2C]/50 transition-colors duration-200 cursor-pointer"
                >
                  <GithubIcon size={14} />
                  GitHub
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 分隔裝飾：枯山水線條 */}
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-[#2C2C2C]/[0.06]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#8C8578]/30" />
            <div className="flex-1 h-px bg-[#2C2C2C]/[0.06]" />
          </div>
        </div>

        {/* 技能 */}
        <section id="skills" className="max-w-4xl mx-auto px-6 py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeIn}
            custom={0}
          >
            <p className="text-xs tracking-[0.3em] text-[#8C8578] mb-2 uppercase">Skills</p>
            <h2
              className="text-3xl font-light mb-16"
              style={{ fontFamily: "'Noto Serif TC', serif" }}
            >
              技術能力
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {skills.map((group) => (
              <motion.div key={group.category} variants={staggerItem}>
                <p
                  className="text-xs tracking-[0.2em] text-[#8C8578] mb-4 pb-2 border-b border-[#2C2C2C]/[0.06]"
                >
                  {group.category}
                </p>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm text-[#2C2C2C]">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 分隔裝飾 */}
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-[#2C2C2C]/[0.06]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#8C8578]/30" />
            <div className="flex-1 h-px bg-[#2C2C2C]/[0.06]" />
          </div>
        </div>

        {/* 專案 */}
        <section id="projects" className="max-w-4xl mx-auto px-6 py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeIn}
            custom={0}
          >
            <p className="text-xs tracking-[0.3em] text-[#8C8578] mb-2 uppercase">Projects</p>
            <h2
              className="text-3xl font-light mb-16"
              style={{ fontFamily: "'Noto Serif TC', serif" }}
            >
              精選專案
            </h2>
          </motion.div>

          <div className="space-y-6">
            {projects.map((project, i) => (
              <motion.a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block py-8 px-6 -mx-6 hover:bg-[#EDE9E0]/50 transition-colors duration-250 cursor-pointer"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeIn}
                custom={i}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="text-xs text-[#8C8578] tracking-wider"
                        style={{ fontFamily: "'Noto Serif TC', serif" }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="w-6 h-px bg-[#2C2C2C]/15" />
                      <h3
                        className="text-lg font-normal text-[#2C2C2C]"
                        style={{ fontFamily: "'Noto Serif TC', serif" }}
                      >
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-sm text-[#5A5549] leading-relaxed ml-[3.75rem] mb-3">
                      {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 ml-[3.75rem]">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 text-[#8C8578] border border-[#2C2C2C]/[0.08] bg-[#F7F5F0]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ExternalLink
                    size={14}
                    className="text-[#8C8578]/40 group-hover:text-[#2C2C2C]/60 transition-colors duration-200 flex-shrink-0 mt-1"
                  />
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* 分隔裝飾 */}
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-[#2C2C2C]/[0.06]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#8C8578]/30" />
            <div className="flex-1 h-px bg-[#2C2C2C]/[0.06]" />
          </div>
        </div>

        {/* 聯絡 */}
        <section id="contact" className="max-w-4xl mx-auto px-6 py-28 text-center relative">
          <Enso className="absolute bottom-4 left-0 w-56 h-56 text-[#8C8578] pointer-events-none" />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="relative"
          >
            <p className="text-xs tracking-[0.3em] text-[#8C8578] mb-4">一期一會</p>
            <h2
              className="text-3xl font-light mb-4"
              style={{ fontFamily: "'Noto Serif TC', serif" }}
            >
              想聊聊？
            </h2>
            <p className="text-[#5A5549] mb-10 max-w-xs mx-auto leading-relaxed">
              無論是合作提案、技術交流或問題諮詢，都歡迎來信。
            </p>
            <a
              href="mailto:rexrex10050@gmail.com"
              className="inline-flex items-center gap-2 px-7 py-3 bg-[#2C2C2C] text-[#F7F5F0] text-sm tracking-wider hover:bg-[#3D3D3D] transition-colors duration-200 cursor-pointer"
            >
              <Mail size={14} />
              rexrex10050@gmail.com
            </a>
          </motion.div>
        </section>
      </main>

      <footer className="py-8 text-center text-xs text-[#8C8578]/50 tracking-wider">
        <div className="w-6 h-px bg-[#2C2C2C]/[0.06] mx-auto mb-4" />
        © 2025 Rex
      </footer>
    </div>
  )
}

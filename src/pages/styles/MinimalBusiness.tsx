import { Link } from 'react-router'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowLeft, Mail } from 'lucide-react'
import { handleHashClick } from '@/lib/utils'
import { profile, skillGroups, projects } from '@/data/profile'
import type { SkillGroupKey } from '@/data/profile'

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
    transition: { duration: 0.55, delay: i * 0.1, ease: 'easeOut' as const },
  }),
}

/* 技能區：AI 組項目較多，於 sm 以上佔兩欄寬度 */
const AI_KEY: SkillGroupKey = 'ai'

export default function MinimalBusiness() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#09090B]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
      />

      {/* 導覽列 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAFA]/90 backdrop-blur border-b border-black/6">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            to="/gallery"
            className="flex items-center gap-1.5 text-sm text-[#3F3F46] hover:text-[#09090B] transition-colors cursor-pointer"
          >
            <ArrowLeft size={15} />
            返回設計實驗室
          </Link>
          <div className="flex items-center gap-5">
            <a href="#about" onClick={handleHashClick} className="text-sm text-[#3F3F46] hover:text-[#09090B] transition-colors">關於</a>
            <a href="#skills" onClick={handleHashClick} className="text-sm text-[#3F3F46] hover:text-[#09090B] transition-colors">技能</a>
            <a href="#projects" onClick={handleHashClick} className="text-sm text-[#3F3F46] hover:text-[#09090B] transition-colors">專案</a>
            <a
              href={`mailto:${profile.email}`}
              className="text-sm px-3.5 py-1.5 bg-[#18181B] text-white rounded-lg hover:bg-[#2563EB] transition-colors cursor-pointer"
            >
              聯絡我
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
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#2563EB] mb-4">
              {profile.titleEn}
            </p>
            <h1
              className="text-5xl sm:text-6xl font-bold leading-tight mb-5"
              style={{ fontFamily: "'Archivo', sans-serif" }}
            >
              Hi, I'm
              <br />
              <span className="text-[#2563EB]">{profile.name}</span>
            </h1>
            <div className="text-[#3F3F46] text-lg leading-relaxed max-w-md mb-8 space-y-2">
              {profile.intro.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#18181B] text-white text-sm font-medium rounded-lg hover:bg-[#2563EB] transition-colors cursor-pointer"
              >
                <Mail size={15} />
                聯絡我
              </a>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 border border-[#18181B]/20 text-sm font-medium rounded-lg hover:border-[#18181B]/50 transition-colors cursor-pointer"
              >
                <GithubIcon size={15} />
                GitHub
              </a>
            </div>
          </motion.div>

          {/* 個人照片 */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-52 h-52 rounded-2xl overflow-hidden border-2 border-[#18181B]/8 shadow-lg">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </section>

        {/* 分隔線 */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-t border-black/8" />
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
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#2563EB] mb-2">Skills</p>
            <h2
              className="text-3xl font-bold mb-10"
              style={{ fontFamily: "'Archivo', sans-serif" }}
            >
              技術能力
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {skillGroups.map((group, i) => (
              <motion.div
                key={group.key}
                className={group.key === AI_KEY ? 'sm:col-span-2' : ''}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
                custom={i}
              >
                <p className="text-xs font-semibold text-[#3F3F46] uppercase tracking-wider mb-3">
                  {group.label}
                </p>
                <ul
                  className={
                    group.key === AI_KEY
                      ? 'grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5'
                      : 'space-y-1.5'
                  }
                >
                  {group.skills.map((skill) => (
                    <li key={skill} className="text-sm text-[#09090B] flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#2563EB] flex-shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 分隔線 */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-t border-black/8" />
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
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#2563EB] mb-2">Projects</p>
            <h2
              className="text-3xl font-bold mb-10"
              style={{ fontFamily: "'Archivo', sans-serif" }}
            >
              精選專案
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, i) => (
              <motion.div
                key={project.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
                custom={i}
                className="relative h-full p-6 bg-white border border-black/8 rounded-2xl hover:border-[#2563EB]/30 hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-semibold text-[#09090B]">
                    <Link to={project.to} className="after:absolute after:inset-0">
                      {project.title}
                    </Link>
                  </h3>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} GitHub Repo`}
                    className="relative z-10 text-[#3F3F46]/40 hover:text-[#2563EB] transition-colors flex-shrink-0 mt-0.5 cursor-pointer"
                  >
                    <GithubIcon size={14} />
                  </a>
                </div>
                <p className="text-sm text-[#3F3F46] leading-relaxed mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 bg-[#F4F4F5] text-[#3F3F46] rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 聯絡 */}
        <section className="max-w-5xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2
              className="text-3xl font-bold mb-4"
              style={{ fontFamily: "'Archivo', sans-serif" }}
            >
              想聊聊？
            </h2>
            <p className="text-[#3F3F46] mb-8 max-w-sm mx-auto">
              無論是合作提案、技術交流或是問題諮詢，都歡迎來信。
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#18181B] text-white font-medium rounded-xl hover:bg-[#2563EB] transition-colors cursor-pointer"
            >
              <Mail size={16} />
              {profile.email}
            </a>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-black/8 py-6 text-center text-xs text-[#3F3F46]/60">
        © {new Date().getFullYear()} {profile.name}. Built with React + Vite.
      </footer>
    </div>
  )
}

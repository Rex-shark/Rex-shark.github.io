import { Link } from 'react-router'
import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Mail } from 'lucide-react'
import { handleHashClick } from '@/lib/utils'
import { profile, skillGroups, projects } from '@/data/profile'

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

/* ── 字型（襯線標題 / 襯線內文 / 等寬 meta，皆補上中文 fallback） ── */
const HEADING = { fontFamily: "'Fraunces', 'Noto Serif TC', serif" }
const BODY = { fontFamily: "'Newsreader', 'Noto Serif TC', serif" }
const MONO = { fontFamily: "'Space Mono', 'Noto Serif TC', monospace" }

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: 'easeOut' as const },
  }),
}

const NAV_ITEMS = [
  { label: '自述', href: '#about' },
  { label: '本期索引', href: '#skills' },
  { label: '本期專題', href: '#projects' },
  { label: '編輯部', href: '#contact' },
]

export default function Editorial() {
  const reduced = useReducedMotion()
  const now = new Date()
  const year = now.getFullYear()
  // 裝飾用刊號：期數跟著當月，避免年份動態、期數寫死而對不上
  const issue = String(now.getMonth() + 1).padStart(2, '0')

  /* 捲動進場動畫；尊重 prefers-reduced-motion 時直接不套用進場動畫，元素維持預設可見狀態 */
  const reveal = reduced
    ? {}
    : { initial: 'hidden' as const, whileInView: 'visible' as const, viewport: { once: true, margin: '-80px' } }

  return (
    <div className="min-h-screen bg-[#F7F4EC] text-[#1A1613]" style={BODY}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,500;1,9..144,600&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Space+Mono:wght@400;700&family=Noto+Serif+TC:wght@400;500;600;700&display=swap"
      />

      {/* 刊頭導覽列：雙線（border-double）模擬雜誌刊頭下緣的粗細雙線 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F7F4EC]/95 backdrop-blur border-b-4 border-double border-[#1A1613]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link
            to="/gallery"
            className="flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#5C554C] hover:text-[#1A1613] transition-colors duration-200 cursor-pointer flex-shrink-0"
            style={MONO}
          >
            <ArrowLeft size={14} />
            返回設計實驗室
          </Link>

          <span
            className="hidden sm:block text-lg tracking-[0.2em] uppercase font-semibold"
            style={HEADING}
          >
            {profile.name}
          </span>

          <div className="hidden md:flex items-center gap-5 text-[11px] uppercase tracking-[0.2em] flex-shrink-0" style={MONO}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleHashClick}
                className="text-[#5C554C] hover:text-[#1F4E3C] transition-colors duration-200 cursor-pointer"
              >
                {item.label}
              </a>
            ))}
            <a
              href={`mailto:${profile.email}`}
              className="px-3 py-1.5 bg-[#1A1613] text-[#F7F4EC] hover:bg-[#1F4E3C] transition-colors duration-200 cursor-pointer"
            >
              聯絡
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {/* ── 封面 Hero ───────────────────────────────────── */}
        <section id="hero" className="max-w-6xl mx-auto px-6 pt-14 pb-16">
          <motion.div
            className="flex items-center justify-between text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#5C554C] mb-6"
            style={MONO}
            initial={reduced ? false : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span>Vol. {year} · Issue {issue}</span>
            <span className="hidden sm:inline">{profile.roles.join(' · ')}</span>
          </motion.div>
          <div className="border-t-2 border-[#1A1613] mb-10" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
            <motion.div
              className="md:col-span-7"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#1F4E3C] mb-4" style={MONO}>
                Cover Story
              </p>
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl leading-[0.98] font-semibold mb-6"
                style={HEADING}
              >
                {profile.name}
              </h1>
              <p className="text-2xl sm:text-3xl italic leading-snug mb-6 text-[#1A1613]/90" style={HEADING}>
                {profile.title}
              </p>
              <p className="text-sm sm:text-base uppercase tracking-[0.15em] text-[#5C554C] mb-8" style={MONO}>
                {profile.titleEn}
              </p>
              <div className="flex items-center gap-6 text-sm">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 underline underline-offset-4 decoration-[#1A1613]/30 hover:decoration-[#1F4E3C] hover:text-[#1F4E3C] transition-colors duration-200 cursor-pointer"
                >
                  <Mail size={15} />
                  聯絡我
                </a>
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 underline underline-offset-4 decoration-[#1A1613]/30 hover:decoration-[#1F4E3C] hover:text-[#1F4E3C] transition-colors duration-200 cursor-pointer"
                >
                  <GithubIcon size={15} />
                  {profile.githubHandle}
                </a>
              </div>
            </motion.div>

            <motion.figure
              className="md:col-span-5 md:col-start-8"
              initial={reduced ? false : { opacity: 0, scale: 0.96 }}
              animate={reduced ? undefined : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            >
              <div className="border-2 border-[#1A1613] p-2 bg-white">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full aspect-[4/5] object-cover grayscale-[15%] contrast-[1.05]"
                />
              </div>
              <figcaption
                className="mt-3 text-[11px] uppercase tracking-[0.2em] text-[#5C554C] flex items-center justify-between"
                style={MONO}
              >
                <span>Fig. 01 — {profile.name}</span>
                <span>{profile.location}</span>
              </figcaption>
            </motion.figure>
          </div>
        </section>

        {/* ── 自述：drop cap + pull quote ─────────────────── */}
        <section id="about" className="max-w-6xl mx-auto px-6 py-20 border-t-4 border-double border-[#1A1613]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <motion.div className="md:col-span-7" {...reveal} variants={fadeUp} custom={0}>
              <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#1F4E3C] mb-2" style={MONO}>
                Profile
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold mb-8" style={HEADING}>
                自述
              </h2>
              <div className="space-y-6 text-lg sm:text-xl leading-[1.9]">
                <p className="first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-7xl first-letter:font-bold first-letter:leading-[0.8] first-letter:text-[#1F4E3C]">
                  {profile.intro[0]}
                </p>
                <p>{profile.intro[1]}</p>
              </div>
            </motion.div>

            <motion.aside className="md:col-span-5" {...reveal} variants={fadeUp} custom={1}>
              <blockquote className="border-l-4 border-[#1F4E3C] pl-6 py-1">
                <p className="text-2xl sm:text-3xl italic leading-snug" style={HEADING}>
                  「{profile.intro[1]}」
                </p>
                <footer className="mt-5 text-xs uppercase tracking-[0.25em] text-[#5C554C]" style={MONO}>
                  — {profile.name}
                </footer>
              </blockquote>
            </motion.aside>
          </div>
        </section>

        {/* ── 本期索引：技能以多欄目錄呈現 ─────────────────── */}
        <section id="skills" className="max-w-6xl mx-auto px-6 py-20 border-t-4 border-double border-[#1A1613]">
          <motion.div {...reveal} variants={fadeUp} custom={0}>
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#1F4E3C] mb-2" style={MONO}>
              Index
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold mb-12" style={HEADING}>
              本期索引
            </h2>
          </motion.div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-10">
            {skillGroups.map((group, gi) => (
              <motion.div
                key={group.key}
                className="break-inside-avoid mb-10"
                {...reveal}
                variants={fadeUp}
                custom={gi + 1}
              >
                <h3
                  className="flex items-baseline justify-between gap-2 text-xs uppercase tracking-[0.25em] text-[#1F4E3C] mb-3 pb-2 border-b-2 border-[#1F4E3C]"
                  style={MONO}
                >
                  <span>{group.label}</span>
                  <span className="text-[#1A1613]/35 normal-case tracking-normal">{group.labelEn}</span>
                </h3>
                <ul>
                  {group.skills.map((skill, si) => (
                    <li
                      key={skill}
                      className="flex items-baseline justify-between gap-3 py-2 border-b border-dotted border-[#1A1613]/25"
                    >
                      <span className="italic text-[15px]" style={HEADING}>
                        {skill}
                      </span>
                      <span className="text-[10px] text-[#5C554C] flex-shrink-0" style={MONO}>
                        {String(si + 1).padStart(2, '0')}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── 本期專題：專案以雜誌特稿排版呈現 ────────────── */}
        <section id="projects" className="max-w-6xl mx-auto px-6 py-20 border-t-4 border-double border-[#1A1613]">
          <motion.div {...reveal} variants={fadeUp} custom={0}>
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#1F4E3C] mb-2" style={MONO}>
              Features
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4" style={HEADING}>
              本期專題
            </h2>
          </motion.div>

          <div className="mt-8 divide-y divide-[#1A1613]/15">
            {projects.map((project, i) => (
              <motion.article
                key={project.slug}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 py-10 group"
                {...reveal}
                variants={fadeUp}
                custom={i + 1}
              >
                <div className="md:col-span-2">
                  <span
                    className="text-5xl sm:text-6xl font-semibold text-[#1F4E3C]/20 group-hover:text-[#1F4E3C]/40 transition-colors duration-300"
                    style={HEADING}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="md:col-span-8">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-[#5C554C] mb-2" style={MONO}>
                    Feature / {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-semibold mb-3 leading-tight" style={HEADING}>
                    <Link
                      to={project.to}
                      className="hover:text-[#1F4E3C] transition-colors duration-200 cursor-pointer inline-flex items-center gap-2"
                    >
                      {project.title}
                      <ArrowUpRight size={20} className="opacity-40 group-hover:opacity-100 transition-opacity duration-200" />
                    </Link>
                  </h3>
                  <p className="text-base leading-relaxed text-[#3A3530] mb-4 max-w-2xl">{project.desc}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] uppercase tracking-[0.15em] text-[#5C554C]" style={MONO}>
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2 flex md:justify-end items-start">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} 的 GitHub 原始碼`}
                    className="relative z-10 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] text-[#5C554C] hover:text-[#1F4E3C] transition-colors duration-200 cursor-pointer"
                    style={MONO}
                  >
                    <GithubIcon size={13} />
                    Repo
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ── 編輯部（版權頁 / 聯絡資訊）───────────────────── */}
        <section id="contact" className="max-w-6xl mx-auto px-6 py-20 border-t-4 border-double border-[#1A1613]">
          <motion.div {...reveal} variants={fadeUp} custom={0}>
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#1F4E3C] mb-2" style={MONO}>
              Colophon
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold mb-12" style={HEADING}>
              編輯部
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-sm"
            {...reveal}
            variants={fadeUp}
            custom={1}
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#5C554C] mb-2" style={MONO}>
                總編輯
              </p>
              <p className="text-xl mb-1" style={HEADING}>
                {profile.name}
              </p>
              <p className="text-[#5C554C]">{profile.title}</p>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#5C554C] mb-2" style={MONO}>
                聯絡信箱
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 underline underline-offset-4 decoration-[#1A1613]/30 hover:decoration-[#1F4E3C] hover:text-[#1F4E3C] transition-colors duration-200 cursor-pointer"
              >
                <Mail size={14} />
                {profile.email}
              </a>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#5C554C] mb-2" style={MONO}>
                社群 / 地點
              </p>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 underline underline-offset-4 decoration-[#1A1613]/30 hover:decoration-[#1F4E3C] hover:text-[#1F4E3C] transition-colors duration-200 cursor-pointer"
              >
                <GithubIcon size={14} />
                {profile.githubHandle}
              </a>
              <p className="text-[#5C554C] mt-2">{profile.location}</p>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-[#1A1613]/20 py-6">
        <div
          className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] uppercase tracking-[0.2em] text-[#5C554C]"
          style={MONO}
        >
          <span>© {year} {profile.name}</span>
          <span>Printed on the Web — React + Vite</span>
        </div>
      </footer>
    </div>
  )
}

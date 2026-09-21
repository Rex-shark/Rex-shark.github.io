import { Link } from 'react-router'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Mail } from 'lucide-react'
import { profile, skillGroups, allSkills, projects } from '@/data/profile'
import { handleHashClick } from '@/lib/utils'

/* ── Google Fonts: Inter + IBM Plex Mono ─────────────────── */

/* ── 自訂 GitHub Icon ─────────────────────────────────────── */
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

/* ── Framer Motion Variants ───────────────────────────────── */
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: 'easeOut' as const },
  }),
}

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

/* ── 共用字型與編號工具 ───────────────────────────────────── */
const MONO = "'IBM Plex Mono', monospace"
const INTER = "'Inter', sans-serif"

/** 1 → "01"：瑞士風的兩位數編號，全部由資料的 index / length 推導 */
const pad2 = (n: number) => String(n).padStart(2, '0')

const YEAR = new Date().getFullYear()

/* ── 主元件 ───────────────────────────────────────────────── */
export default function SwissModern() {
  return (
    <div
      className="min-h-screen bg-[#FFFFFF] text-[#000000]"
      style={{ fontFamily: INTER }}
    >
      {/* Google Fonts 載入 */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=IBM+Plex+Mono:wght@400;500;700&display=swap"
      />

      {/* ── 導覽列 ─────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFFFFF] border-b-4 border-[#000000]">
        <div className="max-w-screen-xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            to="/gallery"
            className="flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase text-[#000000] hover:text-[#FF0000] transition-colors duration-150 cursor-pointer"
            style={{ fontFamily: MONO }}
          >
            <ArrowLeft size={14} strokeWidth={2.5} />
            返回設計實驗室
          </Link>

          {/* 中央紅色識別線 */}
          <div className="hidden md:flex items-center gap-0">
            <div className="w-3 h-3 bg-[#FF0000]" />
            <span
              className="text-xs font-bold tracking-[0.2em] uppercase ml-2"
              style={{ fontFamily: MONO }}
            >
              {profile.name}
            </span>
          </div>

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
                onClick={handleHashClick}
                className="text-xs font-bold tracking-[0.1em] uppercase text-[#000000] hover:text-[#FF0000] transition-colors duration-150"
                style={{ fontFamily: MONO }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="pt-14">
        {/* ── Hero 區塊 ──────────────────────────────────────── */}
        <section id="about" className="border-b-4 border-[#000000]">
          <div className="max-w-screen-xl mx-auto">
            {/* 12 欄網格佈局 */}
            <div className="grid grid-cols-12 min-h-[calc(100vh-3.5rem)]">

              {/* 左側：紅色色塊 + 數字 */}
              <div className="col-span-1 bg-[#FF0000] flex flex-col items-center justify-between py-12 border-r-4 border-[#000000]">
                <span
                  className="text-[#FFFFFF] text-xs font-bold tracking-[0.2em] uppercase"
                  style={{
                    fontFamily: MONO,
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)',
                  }}
                >
                  {YEAR}
                </span>
                {/* 中央幾何裝飾 */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-4 h-4 bg-[#FFFFFF]" />
                  <div className="w-px h-12 bg-[#FFFFFF]/50" />
                  <div className="w-4 h-4 border-2 border-[#FFFFFF]" />
                </div>
                <span
                  className="text-[#FFFFFF] text-xs font-bold tracking-[0.2em] uppercase"
                  style={{
                    fontFamily: MONO,
                    writingMode: 'vertical-rl',
                  }}
                >
                  PORTFOLIO
                </span>
              </div>

              {/* 主要內容：7 欄 */}
              <motion.div
                className="col-span-7 px-10 py-16 flex flex-col justify-center border-r-4 border-[#000000]"
                initial="hidden"
                animate="visible"
                variants={slideLeft}
              >
                {/* 標籤行 */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px flex-1 bg-[#000000]" />
                  <span
                    className="text-xs font-bold tracking-[0.2em] uppercase text-[#FF0000]"
                    style={{ fontFamily: MONO }}
                  >
                    {profile.titleEn}
                  </span>
                </div>

                {/* 超大標題 */}
                <h1
                  className="font-black leading-none tracking-tight uppercase mb-6"
                  style={{
                    fontSize: 'clamp(4rem, 10vw, 9rem)',
                    fontFamily: INTER,
                    letterSpacing: '-0.04em',
                  }}
                >
                  {profile.name}
                </h1>

                {/* 副標題線 */}
                <div className="flex items-center gap-0 mb-6">
                  <div className="w-8 h-1 bg-[#FF0000]" />
                  <div className="w-full h-px bg-[#000000]/20 ml-2" />
                </div>

                <p className="text-lg font-black leading-snug mb-4 text-[#000000]">
                  {profile.title}
                </p>
                <div className="max-w-lg mb-10 space-y-2">
                  {profile.intro.map((line) => (
                    <p key={line} className="text-base font-medium leading-relaxed text-[#333333]">
                      {line}
                    </p>
                  ))}
                </div>

                {/* 行動按鈕 */}
                <div className="flex items-center gap-0">
                  <motion.a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-2 px-8 py-3 bg-[#000000] text-[#FFFFFF] text-xs font-bold tracking-[0.15em] uppercase cursor-pointer hover:bg-[#FF0000] transition-colors duration-200"
                    style={{ fontFamily: MONO }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Mail size={14} />
                    聯絡我
                  </motion.a>
                  <motion.a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-8 py-3 border-2 border-[#000000] text-[#000000] text-xs font-bold tracking-[0.15em] uppercase cursor-pointer hover:bg-[#000000] hover:text-[#FFFFFF] transition-colors duration-200"
                    style={{ fontFamily: MONO }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    GitHub
                  </motion.a>
                </div>

                {/* 底部資訊欄 */}
                <div className="mt-auto pt-12 flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FF0000]" />
                    <span
                      className="text-xs text-[#666666]"
                      style={{ fontFamily: MONO }}
                    >
                      {profile.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 border border-[#000000]" />
                    <span
                      className="text-xs text-[#666666]"
                      style={{ fontFamily: MONO }}
                    >
                      {profile.location}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* 右側：照片區塊 4 欄 */}
              <motion.div
                className="col-span-4 relative overflow-hidden bg-[#F0F0F0]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                {/* 網格裝飾線 */}
                <div
                  className="absolute inset-0 opacity-[0.06] pointer-events-none"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, #000 1px, transparent 1px),
                      linear-gradient(to bottom, #000 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                  }}
                />

                {/* 幾何裝飾：右上角紅色矩形 */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#FF0000]" />

                {/* 照片 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-48 h-48 overflow-hidden border-4 border-[#000000] relative"
                    style={{ boxShadow: '8px 8px 0 #FF0000' }}
                  >
                    <img
                      src={profile.avatar}
                      alt={`${profile.name} — ${profile.title}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* 幾何裝飾：左下角 */}
                <div className="absolute bottom-8 left-8 flex flex-col gap-2">
                  <div className="w-6 h-6 bg-[#000000]" />
                  <div className="w-6 h-6 border-2 border-[#000000]" />
                  <div className="w-6 h-6 bg-[#FF0000]" />
                </div>

                {/* 右下角文字 */}
                <div
                  className="absolute bottom-6 right-6"
                  style={{
                    writingMode: 'vertical-rl',
                    fontFamily: MONO,
                  }}
                >
                  <span className="text-xs font-bold tracking-[0.15em] uppercase text-[#000000]/30">
                    {profile.githubHandle}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── 技能區塊：純排版，不標熟練度 ──────────────────── */}
        <section id="skills" className="border-b-4 border-[#000000]">
          <div className="max-w-screen-xl mx-auto grid grid-cols-12">

            {/* 左側標題欄：3 欄 */}
            <div className="col-span-12 md:col-span-3 md:border-r-4 border-[#000000] px-8 py-16 bg-[#000000]">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={slideLeft}
              >
                <div className="w-8 h-1 bg-[#FF0000] mb-6" />
                <h2
                  className="font-black text-[#FFFFFF] leading-none mb-4"
                  style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontFamily: INTER, letterSpacing: '-0.03em' }}
                >
                  SKILLS
                </h2>
                <p className="text-xs text-[#FFFFFF]/50 leading-relaxed" style={{ fontFamily: MONO }}>
                  技術能力<br />
                  {pad2(skillGroups.length)} 個領域 / {pad2(allSkills.length)} 項
                </p>

                {/* 分組索引 */}
                <ol className="mt-12 flex flex-col gap-3">
                  {skillGroups.map((group, i) => (
                    <li
                      key={group.key}
                      className="flex items-baseline gap-3 text-xs tracking-[0.12em] uppercase"
                      style={{ fontFamily: MONO }}
                    >
                      <span className="font-bold text-[#FF0000]">{pad2(i + 1)}</span>
                      <span className="text-[#FFFFFF]/60">{group.labelEn}</span>
                    </li>
                  ))}
                </ol>
              </motion.div>
            </div>

            {/* 右側 9 欄：每組一列 = 編號(1) + 分組標題(2) + 技能清單(6) */}
            <div className="col-span-12 md:col-span-9">
              {skillGroups.map((group, i) => (
                <motion.div
                  key={group.key}
                  className="grid grid-cols-9 gap-x-6 px-8 md:px-10 py-10 border-b-2 border-[#000000] last:border-b-0"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={fadeIn}
                  custom={i}
                >
                  <div
                    className="col-span-2 md:col-span-1 text-3xl font-black leading-none text-[#FF0000]"
                    style={{ fontFamily: INTER, letterSpacing: '-0.03em' }}
                  >
                    {pad2(i + 1)}
                  </div>

                  <div className="col-span-7 md:col-span-2 mb-6 md:mb-0">
                    <h3
                      className="text-xl font-black leading-tight text-[#000000]"
                      style={{ fontFamily: INTER, letterSpacing: '-0.02em' }}
                    >
                      {group.label}
                    </h3>
                    <span
                      className="block mt-1 text-xs font-bold tracking-[0.12em] uppercase text-[#666666]"
                      style={{ fontFamily: MONO }}
                    >
                      {group.labelEn}
                    </span>
                  </div>

                  <ul className="col-span-9 md:col-span-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 content-start">
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        className="border-t border-[#000000]/20 py-2.5 text-sm font-medium leading-snug text-[#000000]"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 專案區塊 ───────────────────────────────────────── */}
        <section id="projects" className="border-b-4 border-[#000000]">
          <div className="max-w-screen-xl mx-auto">
            {/* 標題列 */}
            <div className="border-b-4 border-[#000000] px-10 py-6 flex items-center justify-between bg-[#FF0000]">
              <h2
                className="font-black text-[#FFFFFF] tracking-tight"
                style={{ fontSize: '2rem', fontFamily: INTER, letterSpacing: '-0.03em' }}
              >
                PROJECTS
              </h2>
              <span
                className="text-xs font-bold tracking-[0.2em] uppercase text-[#FFFFFF]/70"
                style={{ fontFamily: MONO }}
              >
                精選專案 — {pad2(projects.length)}
              </span>
            </div>

            {/* 專案卡片：6 欄網格，上排 2 張各佔 3 欄、下排 3 張各佔 2 欄。
                格線用 gap + 黑底露出，任何斷點都不必逐張算邊框。 */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-1 bg-[#000000]">
              {projects.map((project, i) => (
                <motion.article
                  key={project.slug}
                  className={`group relative flex flex-col p-8 bg-[#FFFFFF] hover:bg-[#000000] transition-colors duration-200 ${
                    i < 2 ? 'md:col-span-3' : 'md:col-span-2'
                  }`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={fadeIn}
                  custom={i}
                >
                  {/* 整張卡連到站內頁：after 偽元素把點擊範圍撐滿整張卡 */}
                  <Link to={project.to} className="flex-1 block cursor-pointer after:absolute after:inset-0">
                    {/* 索引數字 */}
                    <div
                      className="text-6xl font-black leading-none mb-4 text-[#000000]/10 group-hover:text-[#FFFFFF]/10 transition-colors duration-200 select-none"
                      style={{ fontFamily: INTER }}
                    >
                      {pad2(i + 1)}
                    </div>

                    {/* 標題 */}
                    <h3
                      className="text-lg font-black mb-3 pr-8 text-[#000000] group-hover:text-[#FFFFFF] transition-colors duration-200"
                      style={{ fontFamily: INTER, letterSpacing: '-0.02em' }}
                    >
                      {project.title}
                    </h3>

                    {/* 紅線 */}
                    <div className="w-6 h-1 bg-[#FF0000] mb-4 group-hover:w-12 transition-all duration-300" />

                    {/* 描述 */}
                    <p className="text-sm leading-relaxed text-[#555555] group-hover:text-[#CCCCCC] transition-colors duration-200 mb-6">
                      {project.desc}
                    </p>

                    {/* 標籤 */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-bold px-2 py-0.5 border border-[#000000]/30 text-[#000000] group-hover:border-[#FFFFFF]/30 group-hover:text-[#FFFFFF] transition-colors duration-200"
                          style={{ fontFamily: MONO }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>

                  {/* repo 連結放在 Link 之外，用 z-10 疊在撐滿的點擊層上面，避免巢狀 <a> */}
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} 的 GitHub 原始碼`}
                    className="relative z-10 self-start mt-8 flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase text-[#000000] group-hover:text-[#FFFFFF] hover:text-[#FF0000]! transition-colors duration-200 cursor-pointer"
                    style={{ fontFamily: MONO }}
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    Source
                  </a>

                  {/* 右上角箭頭 */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <ArrowUpRight size={16} className="text-[#FFFFFF]" />
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 聯絡區塊 ───────────────────────────────────────── */}
        <section id="contact" className="border-b-4 border-[#000000]">
          <div className="max-w-screen-xl mx-auto grid grid-cols-12">
            {/* 左側大文字 */}
            <div className="col-span-8 px-10 py-20 border-r-4 border-[#000000]">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={0}
              >
                <span
                  className="text-xs font-bold tracking-[0.2em] uppercase text-[#FF0000] block mb-8"
                  style={{ fontFamily: MONO }}
                >
                  Contact
                </span>
                <h2
                  className="font-black leading-none mb-8"
                  style={{
                    fontSize: 'clamp(3rem, 8vw, 7rem)',
                    fontFamily: INTER,
                    letterSpacing: '-0.04em',
                  }}
                >
                  想聊聊？
                </h2>
                <div className="flex items-center gap-0 mb-10">
                  <div className="w-12 h-1.5 bg-[#FF0000]" />
                  <div className="w-32 h-px bg-[#000000]/20 ml-0" />
                </div>
                <p className="text-base font-medium text-[#555555] max-w-md leading-relaxed mb-10">
                  技術交流或任何想法，歡迎隨時來信。
                </p>
                <motion.a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-3 px-10 py-4 bg-[#000000] text-[#FFFFFF] text-sm font-bold tracking-[0.15em] uppercase cursor-pointer hover:bg-[#FF0000] transition-colors duration-200"
                  style={{ fontFamily: MONO }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail size={16} />
                  {profile.email}
                </motion.a>
              </motion.div>
            </div>

            {/* 右側裝飾 */}
            <div className="col-span-4 bg-[#F0F0F0] flex flex-col items-center justify-center gap-6 py-20">
              {/* 幾何圖形組合 */}
              <motion.div
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut' as const }}
              >
                {/* 大圓 */}
                <div className="w-24 h-24 border-4 border-[#000000] rounded-full flex items-center justify-center">
                  <div className="w-10 h-10 bg-[#FF0000]" />
                </div>
                {/* 矩形 */}
                <div className="w-24 h-6 bg-[#000000]" />
                {/* 小圓組 */}
                <div className="flex gap-3">
                  <div className="w-4 h-4 bg-[#FF0000]" />
                  <div className="w-4 h-4 border-2 border-[#000000]" />
                  <div className="w-4 h-4 bg-[#000000]" />
                </div>
              </motion.div>

              {/* GitHub 連結 */}
              <motion.a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border-2 border-[#000000] text-[#000000] text-xs font-bold tracking-[0.15em] uppercase cursor-pointer hover:bg-[#000000] hover:text-[#FFFFFF] transition-colors duration-200"
                style={{ fontFamily: MONO }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <GithubIcon className="w-4 h-4" />
                GitHub
              </motion.a>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="bg-[#000000] py-8">
        <div className="max-w-screen-xl mx-auto px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-[#FF0000]" />
            <span
              className="text-xs font-bold tracking-[0.2em] uppercase text-[#FFFFFF]"
              style={{ fontFamily: MONO }}
            >
              {profile.name}
            </span>
            <div className="w-px h-3 bg-[#FFFFFF]/20" />
            <span
              className="text-xs text-[#FFFFFF]/40"
              style={{ fontFamily: MONO }}
            >
              {profile.titleEn}
            </span>
          </div>
          <span
            className="text-xs text-[#FFFFFF]/30"
            style={{ fontFamily: MONO }}
          >
            © {YEAR} {profile.name}. Built with React + Vite.
          </span>
        </div>
      </footer>
    </div>
  )
}

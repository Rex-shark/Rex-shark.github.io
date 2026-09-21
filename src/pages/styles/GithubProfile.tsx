import { Link } from 'react-router'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowLeft, Mail, BookOpen, MapPin, ExternalLink } from 'lucide-react'
import { handleHashClick } from '@/lib/utils'
import { profile, skillGroups, projects } from '@/data/profile'
import type { Project, SkillGroupKey } from '@/data/profile'

// ── GitHub Octocat SVG ──────────────────────────────────────────────
function OctocatIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

// ── 顏色常數 ────────────────────────────────────────────────────────
const C = {
  canvas:         '#0D1117',
  canvasSubtle:   '#161B22',
  border:         '#30363D',
  borderHover:    '#8B949E',
  fg:             '#E6EDF3',
  fgMuted:        '#8B949E',
  successGreen:   '#238636',
  successGreenHover: '#2EA043',
  brightGreen:    '#3FB950',
  accentBlue:     '#58A6FF',
  orange:         '#E3B341',
}

// ── Framer Motion Variants ──────────────────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: 'easeOut' as const },
  }),
}

// ── Pinned Repo 卡片（資料來自 src/data/profile.ts，這裡只補本頁的語言色點與版面） ──
const LANG_COLOR: Record<string, string> = {
  React:       '#61DAFB',
  Java:        '#B07219',
  TypeScript:  '#3178C6',
  'Spring AI': '#6DB33F',
  Python:      '#3572A5',
}

// 5 張卡：lg 為 3 + 2（6 欄格線），sm 為 2 + 2 + 1（最後一張橫跨）
const PINNED_SPAN = [
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-3',
  'sm:col-span-2 lg:col-span-3',
]

/** 由 repo 網址最後一段推導 repo 名稱 */
function repoNameOf(href: string): string {
  return href.split('/').filter(Boolean).pop() ?? href
}

function PinnedRepoCard({ project, index }: { project: Project; index: number }) {
  const lang = project.tags[0]
  const restTags = project.tags.slice(1)

  return (
    <motion.div
      className={`relative flex flex-col p-4 rounded-md cursor-pointer transition-colors duration-200 ${PINNED_SPAN[index % PINNED_SPAN.length]}`}
      style={{
        background: C.canvasSubtle,
        border: `1px solid ${C.border}`,
        borderRadius: 6,
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      custom={index + 1}
      whileHover={{
        borderColor: C.borderHover,
        transition: { duration: 0.15 },
      }}
    >
      <div className="flex items-center gap-2 mb-1 min-w-0">
        <BookOpen size={14} style={{ color: C.fgMuted, flexShrink: 0 }} />
        {/* 整張卡可點：Link 的 ::after 撐滿卡片，repo 連結以 z-10 疊在上層，避免巢狀 <a> */}
        <Link
          to={project.to}
          className="min-w-0 truncate cursor-pointer hover:underline after:absolute after:inset-0 after:content-['']"
          style={{ color: C.accentBlue, fontWeight: 600, fontSize: 14 }}
        >
          {repoNameOf(project.href)}
        </Link>
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`在 GitHub 開啟 ${repoNameOf(project.href)}`}
          title="在 GitHub 開啟"
          className="relative z-10 ml-auto flex items-center gap-1 px-1.5 py-0.5 rounded-full cursor-pointer transition-colors duration-150"
          style={{
            border: `1px solid ${C.border}`,
            color: C.fgMuted,
            fontSize: 11,
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = C.fg
            e.currentTarget.style.borderColor = C.borderHover
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = C.fgMuted
            e.currentTarget.style.borderColor = C.border
          }}
        >
          <OctocatIcon size={11} />
          Repo
          <ExternalLink size={10} />
        </a>
      </div>
      <p style={{ color: C.fg, fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
        {project.title}
      </p>
      <p style={{ color: C.fgMuted, fontSize: 13, lineHeight: 1.6, flexGrow: 1 }}>
        {project.desc}
      </p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3">
        <div className="flex items-center gap-1.5">
          <span
            style={{
              width: 12, height: 12, borderRadius: '50%',
              backgroundColor: LANG_COLOR[lang] ?? C.fgMuted, flexShrink: 0,
              display: 'inline-block',
            }}
          />
          <span style={{ fontSize: 12, color: C.fgMuted }}>{lang}</span>
        </div>
        {restTags.map(t => (
          <span key={t} style={{ fontSize: 12, color: C.fgMuted }}>{t}</span>
        ))}
      </div>
    </motion.div>
  )
}

// ── Shields.io 風格 Badge（label = 技能分組、value = 技能名；不帶版本號） ──
const GROUP_BADGE_COLOR: Record<SkillGroupKey, string> = {
  backend:  '#B07219',
  frontend: '#3178C6',
  data:     '#336791',
  ai:       '#8957E5',
  design:   '#9E6A03',
}

function Badge({ label, value, valueBg }: { label: string; value: string; valueBg: string }) {
  return (
    <span className="inline-flex max-w-full rounded overflow-hidden" style={{ fontSize: 12, minHeight: 20 }}>
      <span style={{ background: '#555', color: '#fff', padding: '0 6px', lineHeight: '20px', whiteSpace: 'nowrap', flexShrink: 0 }}>
        {label}
      </span>
      {/* 長字串（如 Claude Code（Skills / Subagent / Hooks））在窄螢幕允許換行，不撐破版面 */}
      <span style={{ background: valueBg, color: '#fff', padding: '0 6px', lineHeight: '20px', minWidth: 0 }}>
        {value}
      </span>
    </span>
  )
}

// ── 主元件 ─────────────────────────────────────────────────────────
export default function GithubProfile() {
  const sysFont = '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif'
  const monoFont = '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace'

  return (
    <div
      className="min-h-screen"
      style={{ background: C.canvas, color: C.fg, fontFamily: sysFont }}
    >
      {/* JetBrains Mono for code blocks */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
      />

      {/* ── 導覽列（GitHub header 風格） ──────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: C.canvasSubtle,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-between gap-4">
          {/* 左側 */}
          <div className="flex items-center gap-4">
            <Link
              to="/gallery"
              className="flex items-center gap-1.5 text-xs cursor-pointer transition-colors duration-150"
              style={{ color: C.fgMuted }}
              onMouseEnter={e => (e.currentTarget.style.color = C.fg)}
              onMouseLeave={e => (e.currentTarget.style.color = C.fgMuted)}
            >
              <ArrowLeft size={13} />
              返回設計實驗室
            </Link>
            <div style={{ width: 1, height: 16, background: C.border }} />
            <div className="flex items-center gap-2" style={{ color: C.fg }}>
              <OctocatIcon size={22} />
              <span style={{ fontSize: 15, fontWeight: 600, color: C.fg }}>{profile.githubHandle}</span>
            </div>
          </div>

          {/* 右側錨點 */}
          <div className="hidden sm:flex items-center gap-1">
            {[
              { label: '概覽', href: '#overview' },
              { label: '專案', href: '#pinned' },
              { label: '技能', href: '#skills' },
              { label: '聯絡', href: '#contact' },
            ].map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleHashClick}
                className="px-3 py-1.5 rounded-md text-xs cursor-pointer transition-colors duration-150"
                style={{ color: C.fgMuted }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = C.fg
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = C.fgMuted
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="pt-12">
        {/* ── Profile 區塊 ────────────────────────────────────── */}
        <section id="overview" className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">

            {/* 左欄：Profile Card */}
            <motion.div
              className="flex-shrink-0 md:w-64 lg:w-72"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' as const }}
            >
              {/* 大頭照 */}
              <div className="mb-4">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full rounded-full object-cover"
                  style={{
                    aspectRatio: '1/1',
                    border: `2px solid ${C.border}`,
                    maxWidth: 260,
                  }}
                />
              </div>

              {/* 名字與身份 */}
              <h1 style={{ fontSize: 24, fontWeight: 700, color: C.fg, lineHeight: 1.25 }}>{profile.name}</h1>
              <p style={{ fontSize: 20, fontWeight: 300, color: C.fgMuted, marginTop: 2, marginBottom: 8 }}>
                @{profile.githubHandle}
              </p>
              <p style={{ fontSize: 14, color: C.fg, lineHeight: 1.6, marginBottom: 16 }}>
                {profile.title}
              </p>

              {/* 前往 GitHub（取代原本沒有功能的 Follow 按鈕） */}
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-1.5 rounded-md text-sm font-medium cursor-pointer transition-colors duration-150"
                style={{
                  background: C.successGreen,
                  color: '#fff',
                  border: `1px solid rgba(240,246,252,0.1)`,
                }}
                onMouseEnter={e => (e.currentTarget.style.background = C.successGreenHover)}
                onMouseLeave={e => (e.currentTarget.style.background = C.successGreen)}
              >
                <OctocatIcon size={15} />
                在 GitHub 上查看
              </a>

              {/* 基本資訊 */}
              <div className="mt-4 space-y-1.5">
                <div className="flex items-center gap-2" style={{ color: C.fgMuted, fontSize: 14 }}>
                  <MapPin size={15} />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-2 min-w-0" style={{ color: C.fgMuted, fontSize: 14 }}>
                  <Mail size={15} style={{ flexShrink: 0 }} />
                  <a
                    href={`mailto:${profile.email}`}
                    style={{ color: C.accentBlue }}
                    className="cursor-pointer hover:underline truncate"
                  >
                    {profile.email}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* 右欄：README 風格內容 */}
            <motion.div
              className="flex-1 min-w-0"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' as const }}
            >
              {/* README.md 容器 */}
              <div
                className="rounded-md overflow-hidden"
                style={{
                  border: `1px solid ${C.border}`,
                  background: C.canvasSubtle,
                }}
              >
                {/* 檔案標題列 */}
                <div
                  className="flex items-center gap-2 px-4 py-2.5"
                  style={{
                    borderBottom: `1px solid ${C.border}`,
                    background: C.canvas,
                  }}
                >
                  <BookOpen size={14} style={{ color: C.fgMuted }} />
                  <span style={{ fontSize: 13, color: C.fg, fontFamily: monoFont }}>README.md</span>
                </div>

                {/* Markdown 內容 */}
                <div className="p-6">
                  <h2 style={{ fontSize: 22, fontWeight: 700, color: C.fg, marginBottom: 8, borderBottom: `1px solid ${C.border}`, paddingBottom: 8 }}>
                    Hi there, I'm {profile.name}
                  </h2>

                  <p style={{ fontSize: 14, color: C.accentBlue, lineHeight: 1.8, marginBottom: 8 }}>
                    {profile.title}
                  </p>
                  {profile.intro.map(line => (
                    <p key={line} style={{ fontSize: 14, color: C.fg, lineHeight: 1.8, marginBottom: 8 }}>
                      {line}
                    </p>
                  ))}

                  <h3 style={{ fontSize: 16, fontWeight: 600, color: C.fg, marginBottom: 8, marginTop: 20 }}>
                    About Me
                  </h3>
                  <ul style={{ fontSize: 14, color: C.fgMuted, lineHeight: 2, paddingLeft: 20, listStyleType: 'disc' }}>
                    {skillGroups.map(g => (
                      <li key={g.key}>
                        <span style={{ color: C.brightGreen }}>{g.labelEn}</span>：{g.skills.join(', ')}
                      </li>
                    ))}
                  </ul>

                  <h3 style={{ fontSize: 16, fontWeight: 600, color: C.fg, marginBottom: 8, marginTop: 20 }}>
                    Profile
                  </h3>

                  {/* 程式碼區塊 */}
                  <div
                    className="rounded-md p-4"
                    style={{
                      background: C.canvas,
                      border: `1px solid ${C.border}`,
                      fontFamily: 'JetBrains Mono, ' + monoFont,
                      fontSize: 13,
                      lineHeight: 1.8,
                      overflowX: 'auto',
                    }}
                  >
                    <div><span style={{ color: C.fgMuted }}>//</span> <span style={{ color: C.fgMuted }}>Developer Profile</span></div>
                    <div>
                      <span style={{ color: '#FF7B72' }}>const</span>{' '}
                      <span style={{ color: C.accentBlue }}>{profile.name.toLowerCase()}</span>{' '}
                      <span style={{ color: C.fg }}>=</span>{' '}
                      <span style={{ color: C.fg }}>{'{'}</span>
                    </div>
                    {[
                      { k: 'name', v: profile.name },
                      { k: 'role', v: profile.titleEn },
                      { k: 'location', v: profile.location },
                    ].map(row => (
                      <div key={row.k} style={{ paddingLeft: 16 }}>
                        <span style={{ color: C.orange }}>{row.k}</span>
                        <span style={{ color: C.fg }}>: </span>
                        <span style={{ color: '#A5D6FF' }}>"{row.v}"</span>
                        <span style={{ color: C.fg }}>,</span>
                      </div>
                    ))}
                    <div style={{ paddingLeft: 16 }}>
                      <span style={{ color: C.orange }}>focus</span>
                      <span style={{ color: C.fg }}>: [</span>
                      {skillGroups.map((g, i) => (
                        <span key={g.key}>
                          <span style={{ color: '#A5D6FF' }}>"{g.labelEn}"</span>
                          {i < skillGroups.length - 1 && <span style={{ color: C.fg }}>, </span>}
                        </span>
                      ))}
                      <span style={{ color: C.fg }}>],</span>
                    </div>
                    <div><span style={{ color: C.fg }}>{'}'}</span></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Pinned Repos ─────────────────────────────────────── */}
        <section id="pinned" className="max-w-6xl mx-auto px-4 py-6">
          <motion.h3
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            style={{ fontSize: 14, fontWeight: 600, color: C.fg, marginBottom: 12 }}
          >
            Pinned
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {projects.map((p, i) => (
              <PinnedRepoCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </section>

        {/* ── 技能區塊 ─────────────────────────────────────────── */}
        <section id="skills" className="max-w-6xl mx-auto px-4 py-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            custom={0}
            className="rounded-md p-5"
            style={{ border: `1px solid ${C.border}`, background: C.canvasSubtle }}
          >
            <h3 style={{ fontSize: 14, fontWeight: 600, color: C.fg, marginBottom: 16 }}>
              Tech Stack
            </h3>

            {/* 技術棧：依 skillGroups 分組的 badge，不帶比例與版本號 */}
            <div>
              {skillGroups.map((g, gi) => (
                <div
                  key={g.key}
                  className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 py-3"
                  style={{ borderTop: gi === 0 ? 'none' : `1px solid ${C.border}` }}
                >
                  <div className="flex items-center gap-1.5 sm:w-40 flex-shrink-0" style={{ paddingTop: 1 }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: GROUP_BADGE_COLOR[g.key], display: 'inline-block', flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: C.fg }}>{g.label}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 min-w-0">
                    {g.skills.map(skill => (
                      <Badge key={skill} label={g.key} value={skill} valueBg={GROUP_BADGE_COLOR[g.key]} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── 聯絡區塊 ─────────────────────────────────────────── */}
        <section id="contact" className="max-w-6xl mx-auto px-4 py-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            custom={0}
            className="rounded-md p-6"
            style={{ border: `1px solid ${C.border}`, background: C.canvasSubtle }}
          >
            {/* Markdown --- 分隔線 */}
            <div style={{ borderTop: `1px solid ${C.border}`, marginBottom: 20 }} />

            <h2 style={{ fontSize: 22, fontWeight: 700, color: C.fg, marginBottom: 4 }}>
              Contact
            </h2>
            <p style={{ fontSize: 14, color: C.fgMuted, marginBottom: 20, lineHeight: 1.7 }}>
              技術交流或任何問題，都歡迎來信聯絡。
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer transition-colors duration-150 text-sm"
                style={{
                  background: C.successGreen,
                  color: '#fff',
                  border: `1px solid rgba(240,246,252,0.1)`,
                }}
                onMouseEnter={e => (e.currentTarget.style.background = C.successGreenHover)}
                onMouseLeave={e => (e.currentTarget.style.background = C.successGreen)}
              >
                <Mail size={15} />
                {profile.email}
              </a>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer transition-colors duration-150 text-sm"
                style={{
                  background: 'transparent',
                  color: C.fg,
                  border: `1px solid ${C.border}`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = C.borderHover
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = C.border
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <OctocatIcon size={15} />
                {profile.githubUrl.replace('https://', '')}
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer
        className="text-center py-6 mt-4"
        style={{
          borderTop: `1px solid ${C.border}`,
          fontSize: 12,
          color: C.fgMuted,
        }}
      >
        &copy; {new Date().getFullYear()} {profile.githubHandle} &middot; Built with React + Vite &middot; Deployed on GitHub Pages
      </footer>
    </div>
  )
}

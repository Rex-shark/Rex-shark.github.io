import { Link } from 'react-router'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowLeft, Mail, Star, BookOpen, MapPin, Building2 } from 'lucide-react'
import { handleHashClick } from '@/lib/utils'

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
  // contribution heatmap
  heat0: '#161B22',
  heat1: '#0E4429',
  heat2: '#006D32',
  heat3: '#26A641',
  heat4: '#39D353',
}

// ── Framer Motion Variants ──────────────────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: 'easeOut' as const },
  }),
}

// ── 貢獻熱力圖 ──────────────────────────────────────────────────────
const HEAT_COLORS = [C.heat0, C.heat1, C.heat2, C.heat3, C.heat4]

function generateContribData(): number[] {
  const data: number[] = []
  const seed = [0,0,0,1,0,0,0,1,2,1,0,0,2,3,2,1,0,0,0,2,4,3,2,1,0,0,1,2,3,4,3,2,1,0,0,0,1,1,2,3,2,1,0,0,2,3,4,3,2,1,0]
  for (let i = 0; i < 52 * 7; i++) {
    const base = seed[i % seed.length]
    const jitter = Math.sin(i * 0.31 + 1.7) > 0.5 ? 1 : 0
    data.push(Math.min(4, Math.max(0, base + (i % 7 === 0 || i % 7 === 6 ? 0 : jitter))))
  }
  return data
}

const contribData = generateContribData()
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function ContribGraph() {
  const weeks = 52
  const days = 7
  // 月份標籤：每 4 週放一個
  const monthLabels = Array.from({ length: 13 }, (_, i) => ({
    label: MONTHS[i % 12],
    col: i * 4,
  }))

  return (
    <div className="overflow-x-auto">
      {/* 月份標籤 */}
      <div className="flex mb-1" style={{ paddingLeft: 20 }}>
        {monthLabels.map((m, i) => (
          <div
            key={i}
            className="text-xs flex-shrink-0"
            style={{
              width: m.col === 0 ? 0 : `${4 * 14}px`,
              color: C.fgMuted,
              fontSize: 11,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
            }}
          >
            {m.label}
          </div>
        ))}
      </div>

      <div className="flex gap-0.5">
        {/* 星期標籤 */}
        <div className="flex flex-col gap-0.5 mr-1.5" style={{ marginTop: 2 }}>
          {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((d, i) => (
            <div
              key={i}
              style={{
                width: 14, height: 11,
                fontSize: 9,
                color: C.fgMuted,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                textAlign: 'right',
                paddingRight: 2,
                lineHeight: '11px',
              }}
            >
              {d}
            </div>
          ))}
        </div>

        {/* 方格 grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${weeks}, 11px)`,
            gridTemplateRows: `repeat(${days}, 11px)`,
            gap: 2,
          }}
        >
          {Array.from({ length: weeks }, (_, w) =>
            Array.from({ length: days }, (_, d) => {
              const idx = w * days + d
              const level = contribData[idx] ?? 0
              return (
                <div
                  key={`${w}-${d}`}
                  title={`Level ${level}`}
                  style={{
                    width: 11, height: 11,
                    borderRadius: 2,
                    backgroundColor: HEAT_COLORS[level],
                    border: `1px solid rgba(255,255,255,0.04)`,
                  }}
                />
              )
            })
          )}
        </div>
      </div>

      {/* 凡例 */}
      <div className="flex items-center gap-1 mt-2 justify-end">
        <span style={{ fontSize: 11, color: C.fgMuted }}>Less</span>
        {HEAT_COLORS.map((c, i) => (
          <div key={i} style={{ width: 11, height: 11, borderRadius: 2, backgroundColor: c, border: '1px solid rgba(255,255,255,0.04)' }} />
        ))}
        <span style={{ fontSize: 11, color: C.fgMuted }}>More</span>
      </div>
    </div>
  )
}

// ── Pinned Repo 卡片 ────────────────────────────────────────────────
interface PinnedRepo {
  name: string
  description: string
  language: string
  langColor: string
  stars: number
  href: string
}

const pinnedRepos: PinnedRepo[] = [
  {
    name: 'rex-shark.github.io',
    description: '個人作品集網站，探索多種 UI 設計風格，以 React + Vite 建構並部署於 GitHub Pages。',
    language: 'TypeScript',
    langColor: '#3178C6',
    stars: 3,
    href: 'https://github.com/Rex-shark',
  },
  {
    name: 'spring-boot-api-demo',
    description: '完整的 RESTful API 範例專案，含 JWT 認證、RBAC 權限控管與 OpenAPI 文件。',
    language: 'Java',
    langColor: '#B07219',
    stars: 12,
    href: 'https://github.com/Rex-shark',
  },
  {
    name: 'system-analysis-guide',
    description: '從 UML 到系統設計的完整教學系列，含需求分析與實戰案例解析。',
    language: 'Markdown',
    langColor: '#083FA1',
    stars: 7,
    href: 'https://github.com/Rex-shark',
  },
]

function PinnedRepoCard({ repo, index }: { repo: PinnedRepo; index: number }) {
  return (
    <motion.a
      href={repo.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col p-4 rounded-md cursor-pointer transition-colors duration-200"
      style={{
        background: C.canvasSubtle,
        border: `1px solid ${C.border}`,
        borderRadius: 6,
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      custom={index}
      whileHover={{
        borderColor: C.borderHover,
        transition: { duration: 0.15 },
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <BookOpen size={14} style={{ color: C.fgMuted, flexShrink: 0 }} />
        <span style={{ color: C.accentBlue, fontWeight: 600, fontSize: 14 }}>
          {repo.name}
        </span>
        <span
          className="ml-auto px-1.5 py-0.5 text-xs rounded-full"
          style={{
            border: `1px solid ${C.border}`,
            color: C.fgMuted,
            fontSize: 11,
            whiteSpace: 'nowrap',
          }}
        >
          Public
        </span>
      </div>
      <p style={{ color: C.fgMuted, fontSize: 13, lineHeight: 1.6, flexGrow: 1 }}>
        {repo.description}
      </p>
      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center gap-1.5">
          <span
            style={{
              width: 12, height: 12, borderRadius: '50%',
              backgroundColor: repo.langColor, flexShrink: 0,
              display: 'inline-block',
            }}
          />
          <span style={{ fontSize: 12, color: C.fgMuted }}>{repo.language}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star size={13} style={{ color: C.fgMuted }} />
          <span style={{ fontSize: 12, color: C.fgMuted }}>{repo.stars}</span>
        </div>
      </div>
    </motion.a>
  )
}

// ── 語言統計條 ──────────────────────────────────────────────────────
const langStats = [
  { name: 'Java',       pct: 45, color: '#B07219' },
  { name: 'TypeScript', pct: 30, color: '#3178C6' },
  { name: 'CSS',        pct: 12, color: '#563D7C' },
  { name: 'HTML',       pct: 8,  color: '#E34C26' },
  { name: 'Other',      pct: 5,  color: '#8B949E' },
]

// ── Shields.io 風格 Badge ───────────────────────────────────────────
const skillBadges = [
  { label: 'java',            value: '21',        labelBg: '#555', valueBg: '#B07219' },
  { label: 'spring-boot',     value: '3.x',       labelBg: '#555', valueBg: '#6DB33F' },
  { label: 'spring-security', value: 'JWT',       labelBg: '#555', valueBg: '#6DB33F' },
  { label: 'JPA/Hibernate',   value: 'ORM',       labelBg: '#555', valueBg: '#59666C' },
  { label: 'react',           value: '19',        labelBg: '#555', valueBg: '#20232A' },
  { label: 'typescript',      value: 'strict',    labelBg: '#555', valueBg: '#3178C6' },
  { label: 'tailwind-css',    value: 'v4',        labelBg: '#555', valueBg: '#0EA5E9' },
  { label: 'postgresql',      value: '16',        labelBg: '#555', valueBg: '#336791' },
  { label: 'docker',          value: 'compose',   labelBg: '#555', valueBg: '#2496ED' },
  { label: 'github-actions',  value: 'CI/CD',     labelBg: '#555', valueBg: '#2088FF' },
  { label: '系統分析設計',     value: 'UML',       labelBg: '#555', valueBg: '#E3B341' },
]

function Badge({ label, value, labelBg, valueBg }: { label: string; value: string; labelBg: string; valueBg: string }) {
  return (
    <span className="inline-flex rounded overflow-hidden" style={{ fontSize: 12, height: 20, flexShrink: 0 }}>
      <span style={{ background: labelBg, color: '#fff', padding: '0 6px', lineHeight: '20px', whiteSpace: 'nowrap' }}>
        {label}
      </span>
      <span style={{ background: valueBg, color: '#fff', padding: '0 6px', lineHeight: '20px', whiteSpace: 'nowrap' }}>
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
              to="/"
              className="flex items-center gap-1.5 text-xs cursor-pointer transition-colors duration-150"
              style={{ color: C.fgMuted }}
              onMouseEnter={e => (e.currentTarget.style.color = C.fg)}
              onMouseLeave={e => (e.currentTarget.style.color = C.fgMuted)}
            >
              <ArrowLeft size={13} />
              返回風格選擇
            </Link>
            <div style={{ width: 1, height: 16, background: C.border }} />
            <div className="flex items-center gap-2" style={{ color: C.fg }}>
              <OctocatIcon size={22} />
              <span style={{ fontSize: 15, fontWeight: 600, color: C.fg }}>Rex-shark</span>
            </div>
          </div>

          {/* 右側錨點 */}
          <div className="hidden sm:flex items-center gap-1">
            {[
              { label: '概覽', href: '#overview' },
              { label: '貢獻', href: '#contributions' },
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
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {/* 大頭照 */}
              <div className="mb-4">
                <img
                  src="/me.png"
                  alt="Rex"
                  className="w-full rounded-full object-cover"
                  style={{
                    aspectRatio: '1/1',
                    border: `2px solid ${C.border}`,
                    maxWidth: 260,
                  }}
                />
              </div>

              {/* 名字與身份 */}
              <h1 style={{ fontSize: 24, fontWeight: 700, color: C.fg, lineHeight: 1.25 }}>Rex</h1>
              <p style={{ fontSize: 20, fontWeight: 300, color: C.fgMuted, marginTop: 2, marginBottom: 8 }}>
                @Rex-shark
              </p>
              <p style={{ fontSize: 14, color: C.fg, lineHeight: 1.6, marginBottom: 16 }}>
                Java 全端工程師 &amp; 系統分析師。熱衷穩健後端架構設計，持續分享 Java、Spring Boot 與系統設計實戰經驗。
              </p>

              {/* Follow 按鈕 */}
              <button
                className="w-full py-1.5 rounded-md text-sm font-medium cursor-pointer transition-colors duration-150"
                style={{
                  background: C.successGreen,
                  color: '#fff',
                  border: `1px solid rgba(240,246,252,0.1)`,
                }}
                onMouseEnter={e => (e.currentTarget.style.background = C.successGreenHover)}
                onMouseLeave={e => (e.currentTarget.style.background = C.successGreen)}
              >
                Follow
              </button>

              {/* 基本資訊 */}
              <div className="mt-4 space-y-1.5">
                <div className="flex items-center gap-2" style={{ color: C.fgMuted, fontSize: 14 }}>
                  <Building2 size={15} />
                  <span>Freelance / Open to Work</span>
                </div>
                <div className="flex items-center gap-2" style={{ color: C.fgMuted, fontSize: 14 }}>
                  <MapPin size={15} />
                  <span>Taiwan</span>
                </div>
                <div className="flex items-center gap-2" style={{ color: C.fgMuted, fontSize: 14 }}>
                  <Mail size={15} />
                  <a
                    href="mailto:rexrex10050@gmail.com"
                    style={{ color: C.accentBlue }}
                    className="cursor-pointer hover:underline"
                  >
                    rexrex10050@gmail.com
                  </a>
                </div>
              </div>

              {/* stats */}
              <div className="flex gap-4 mt-4">
                {[
                  { count: '22', label: 'followers' },
                  { count: '8',  label: 'following' },
                ].map(s => (
                  <div key={s.label} style={{ fontSize: 14, color: C.fg }}>
                    <span style={{ fontWeight: 700 }}>{s.count}</span>{' '}
                    <span style={{ color: C.fgMuted }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 右欄：README 風格內容 */}
            <motion.div
              className="flex-1 min-w-0"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
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
                    Hi there, I'm Rex
                  </h2>

                  <p style={{ fontSize: 14, color: C.fg, lineHeight: 1.8, marginBottom: 16 }}>
                    我是一位專注於 <span style={{ color: C.accentBlue }}>Java 全端開發</span>與<span style={{ color: C.accentBlue }}>系統分析設計</span>的工程師。
                    喜歡設計穩健、可擴展的後端架構，也熱衷於把複雜的系統概念用清晰的方式呈現出來。
                  </p>

                  <h3 style={{ fontSize: 16, fontWeight: 600, color: C.fg, marginBottom: 8, marginTop: 20 }}>
                    About Me
                  </h3>
                  <ul style={{ fontSize: 14, color: C.fgMuted, lineHeight: 2, paddingLeft: 20, listStyleType: 'disc' }}>
                    <li><span style={{ color: C.brightGreen }}>Backend</span>：Spring Boot, Spring Security, JPA/Hibernate</li>
                    <li><span style={{ color: C.brightGreen }}>Frontend</span>：React, TypeScript, Tailwind CSS</li>
                    <li><span style={{ color: C.brightGreen }}>DevOps</span>：Docker, GitHub Actions, PostgreSQL</li>
                    <li><span style={{ color: C.brightGreen }}>Specialty</span>：系統分析設計、UML、需求分析</li>
                  </ul>

                  <h3 style={{ fontSize: 16, fontWeight: 600, color: C.fg, marginBottom: 8, marginTop: 20 }}>
                    Current Focus
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
                    }}
                  >
                    <div><span style={{ color: C.fgMuted }}>//</span> <span style={{ color: C.fgMuted }}>Developer Profile</span></div>
                    <div>
                      <span style={{ color: '#FF7B72' }}>const</span>{' '}
                      <span style={{ color: C.accentBlue }}>rex</span>{' '}
                      <span style={{ color: C.fg }}>=</span>{' '}
                      <span style={{ color: C.fg }}>{'{'}</span>
                    </div>
                    <div style={{ paddingLeft: 16 }}>
                      <span style={{ color: C.orange }}>name</span>
                      <span style={{ color: C.fg }}>: </span>
                      <span style={{ color: '#A5D6FF' }}>"Rex"</span>
                      <span style={{ color: C.fg }}>,</span>
                    </div>
                    <div style={{ paddingLeft: 16 }}>
                      <span style={{ color: C.orange }}>role</span>
                      <span style={{ color: C.fg }}>: </span>
                      <span style={{ color: '#A5D6FF' }}>"Java Full-Stack Engineer"</span>
                      <span style={{ color: C.fg }}>,</span>
                    </div>
                    <div style={{ paddingLeft: 16 }}>
                      <span style={{ color: C.orange }}>focus</span>
                      <span style={{ color: C.fg }}>: [</span>
                      <span style={{ color: '#A5D6FF' }}>"Spring Boot"</span>
                      <span style={{ color: C.fg }}>, </span>
                      <span style={{ color: '#A5D6FF' }}>"System Design"</span>
                      <span style={{ color: C.fg }}>],</span>
                    </div>
                    <div style={{ paddingLeft: 16 }}>
                      <span style={{ color: C.orange }}>available</span>
                      <span style={{ color: C.fg }}>: </span>
                      <span style={{ color: '#79C0FF' }}>true</span>
                    </div>
                    <div><span style={{ color: C.fg }}>{'}'}</span></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 貢獻熱力圖 ──────────────────────────────────────── */}
        <section id="contributions" className="max-w-6xl mx-auto px-4 py-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            custom={0}
            className="rounded-md p-5"
            style={{ border: `1px solid ${C.border}`, background: C.canvasSubtle }}
          >
            <h3 style={{ fontSize: 14, color: C.fg, marginBottom: 16, fontWeight: 600 }}>
              Rex's contributions in the last year
            </h3>
            <ContribGraph />
          </motion.div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {pinnedRepos.map((repo, i) => (
              <PinnedRepoCard key={repo.name} repo={repo} index={i + 1} />
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
              Languages &amp; Technologies
            </h3>

            {/* 語言比例條 */}
            <div className="mb-4">
              <div className="flex rounded-full overflow-hidden" style={{ height: 8 }}>
                {langStats.map((l, i) => (
                  <motion.div
                    key={l.name}
                    style={{ width: `${l.pct}%`, background: l.color }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
                    className="origin-left"
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-3 mt-3">
                {langStats.map(l => (
                  <div key={l.name} className="flex items-center gap-1.5">
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: l.color, display: 'inline-block' }} />
                    <span style={{ fontSize: 12, color: C.fg }}>{l.name}</span>
                    <span style={{ fontSize: 12, color: C.fgMuted }}>{l.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 技能 Badge */}
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16, marginTop: 8 }}>
              <p style={{ fontSize: 12, color: C.fgMuted, marginBottom: 10 }}>Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {skillBadges.map(b => (
                  <Badge key={b.label} {...b} />
                ))}
              </div>
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
              📫 Contact
            </h2>
            <p style={{ fontSize: 14, color: C.fgMuted, marginBottom: 20, lineHeight: 1.7 }}>
              無論是合作提案、技術交流或是問題諮詢，都歡迎聯絡。
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:rexrex10050@gmail.com"
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
                rexrex10050@gmail.com
              </a>
              <a
                href="https://github.com/Rex-shark"
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
                github.com/Rex-shark
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
        &copy; 2025 Rex-shark &middot; Built with React + Vite &middot; Deployed on GitHub Pages
      </footer>
    </div>
  )
}

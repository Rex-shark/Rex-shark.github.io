import { Link } from 'react-router'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Star,
  GitFork,
  Eye,
  Shield,
  Database,
  Zap,
  Lock,
  CheckCircle2,
  Terminal,
  Server,
} from 'lucide-react'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

const techStack = [
  { name: 'Java 21', color: '#B07219' },
  { name: 'Spring Boot 3.2', color: '#6DB33F' },
  { name: 'Spring Security 6', color: '#6DB33F' },
  { name: 'JPA / Hibernate', color: '#59666C' },
  { name: 'PostgreSQL 16', color: '#336791' },
  { name: 'JWT', color: '#000000' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'JUnit 5', color: '#25A162' },
]

const features = [
  {
    icon: Lock,
    title: 'JWT 認證與授權',
    desc: 'Access Token + Refresh Token 雙令牌機制，支援 token 黑名單與自動續期。',
    color: '#6366F1',
  },
  {
    icon: Shield,
    title: '角色權限控管',
    desc: '基於 Spring Security 6 的 method-level 授權，搭配 @PreAuthorize 細粒度控制。',
    color: '#8B5CF6',
  },
  {
    icon: Database,
    title: 'JPA 資料存取',
    desc: 'Repository 模式 + Specification 動態查詢，支援軟刪除、稽核欄位、樂觀鎖。',
    color: '#06B6D4',
  },
  {
    icon: Zap,
    title: '統一例外處理',
    desc: '@RestControllerAdvice 全域異常攔截，回傳一致的錯誤格式與 traceId。',
    color: '#F59E0B',
  },
]

const apiExamples = [
  {
    method: 'POST',
    methodColor: '#10B981',
    path: '/api/v1/auth/login',
    desc: '使用者登入，回傳 access + refresh token',
  },
  {
    method: 'POST',
    methodColor: '#10B981',
    path: '/api/v1/auth/refresh',
    desc: '使用 refresh token 換新的 access token',
  },
  {
    method: 'GET',
    methodColor: '#3B82F6',
    path: '/api/v1/users/me',
    desc: '取得當前登入使用者資訊（需 Bearer token）',
  },
  {
    method: 'GET',
    methodColor: '#3B82F6',
    path: '/api/v1/products?page=0&size=20',
    desc: '分頁查詢產品列表，支援排序與條件過濾',
  },
  {
    method: 'PUT',
    methodColor: '#F59E0B',
    path: '/api/v1/products/{id}',
    desc: '更新產品資訊（需 ROLE_ADMIN 權限）',
  },
  {
    method: 'DELETE',
    methodColor: '#EF4444',
    path: '/api/v1/products/{id}',
    desc: '軟刪除產品（標記 deleted_at，不實際刪除）',
  },
]

const setupSteps = [
  {
    title: 'Clone 專案',
    code: 'git clone https://github.com/Rex-shark/spring-boot-api-demo.git\ncd spring-boot-api-demo',
  },
  {
    title: '啟動 PostgreSQL',
    code: 'docker compose up -d postgres',
  },
  {
    title: '設定環境變數',
    code: 'cp .env.example .env\n# 編輯 .env 設定 DB_URL、JWT_SECRET',
  },
  {
    title: '執行應用程式',
    code: './mvnw spring-boot:run\n# 服務啟動於 http://localhost:8080',
  },
]

export default function SpringBootApiDemo() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: '"Inter", system-ui, sans-serif' }}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
      />

      {/* 頂部導覽 */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            to="/styles/finalist"
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 text-sm font-medium transition-colors cursor-pointer group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform duration-200"
            />
            返回首頁
          </Link>
          <a
            href="https://github.com/Rex-shark"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors cursor-pointer"
          >
            <GithubIcon className="w-4 h-4" />
            在 GitHub 上查看
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 py-16 border-b border-slate-100 bg-gradient-to-br from-indigo-50/40 to-violet-50/40">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold mb-5">
              <Server size={12} />
              Backend Project
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Spring Boot API 範例
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed mb-6">
              完整的 RESTful API 範例專案，涵蓋 JWT 認證、角色權限控管、JPA 資料存取、統一例外處理、單元測試與 Docker 部署。
              適合作為新專案的起始模板，或學習 Spring Boot 3 + Spring Security 6 最佳實踐的參考。
            </p>
            <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">
              <div className="inline-flex items-center gap-1.5">
                <Star size={15} className="text-amber-400" />
                <span className="font-semibold text-slate-700">28</span>
                stars
              </div>
              <div className="inline-flex items-center gap-1.5">
                <GitFork size={15} />
                <span className="font-semibold text-slate-700">5</span>
                forks
              </div>
              <div className="inline-flex items-center gap-1.5">
                <Eye size={15} />
                <span className="font-semibold text-slate-700">42</span>
                watching
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-6 py-12 border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs font-bold tracking-widest text-indigo-500 uppercase mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {techStack.map((t) => (
              <span
                key={t.name}
                className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border"
                style={{
                  backgroundColor: `${t.color}10`,
                  color: t.color,
                  borderColor: `${t.color}30`,
                }}
              >
                {t.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 bg-slate-50/60">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">主要功能</h2>
          <p className="text-slate-500 text-sm mb-10">企業級後端應用所需的核心模組</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, ease: 'easeOut' as const, delay: i * 0.06 }}
                className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:shadow-indigo-100/40 hover:-translate-y-1 transition-all duration-200 cursor-default"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${f.color}14`, color: f.color }}
                >
                  <f.icon size={20} />
                </div>
                <h3 className="font-bold text-slate-900 mb-1.5">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* API Examples */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">API 端點</h2>
          <p className="text-slate-500 text-sm mb-8">部分 RESTful 路由示意</p>
          <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
            {apiExamples.map((api, i) => (
              <div
                key={api.path}
                className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 px-5 py-3.5 ${
                  i !== apiExamples.length - 1 ? 'border-b border-slate-100' : ''
                } hover:bg-slate-50/70 transition-colors`}
              >
                <span
                  className="inline-flex items-center justify-center px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide w-16 shrink-0"
                  style={{ backgroundColor: `${api.methodColor}14`, color: api.methodColor }}
                >
                  {api.method}
                </span>
                <code
                  className="font-mono text-sm text-slate-800 shrink-0"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                >
                  {api.path}
                </code>
                <span className="text-slate-500 text-sm sm:ml-auto sm:text-right">{api.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Setup */}
      <section className="px-6 py-16 bg-slate-900 text-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 text-indigo-400 mb-3">
            <Terminal size={16} />
            <span className="text-xs font-bold tracking-widest uppercase">Quick Start</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">本地啟動</h2>
          <p className="text-slate-400 text-sm mb-10">四個步驟在本機跑起來</p>
          <div className="space-y-5">
            {setupSteps.map((step, i) => (
              <div key={step.title} className="flex gap-4">
                <div className="shrink-0 w-9 h-9 rounded-full bg-indigo-500/15 border border-indigo-400/30 flex items-center justify-center text-indigo-300 font-bold text-sm">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-400" />
                    {step.title}
                  </h3>
                  <pre
                    className="bg-slate-950/70 border border-slate-800 rounded-lg p-3.5 overflow-x-auto text-sm text-slate-300"
                    style={{ fontFamily: '"JetBrains Mono", monospace' }}
                  >
                    <code>{step.code}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-6 py-16 border-t border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">想了解更多？</h2>
          <p className="text-slate-500 mb-8">前往 GitHub 查看完整原始碼，歡迎 Fork、Star 或提 issue 討論。</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://github.com/Rex-shark"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <GithubIcon className="w-4 h-4" />
              查看 GitHub Repo
            </a>
            <Link
              to="/styles/finalist"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-slate-200 text-slate-700 font-semibold text-sm hover:border-indigo-300 hover:text-indigo-600 transition-colors cursor-pointer"
            >
              <ArrowLeft size={15} />
              返回首頁
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 border-t border-slate-100 text-center text-slate-400 text-xs">
        © 2025 Rex · Spring Boot API Demo
      </footer>
    </div>
  )
}

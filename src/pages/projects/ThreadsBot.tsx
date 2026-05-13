import { Link } from 'react-router'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Newspaper,
  Sparkles,
  Send,
  Clock,
  Database,
  Terminal,
  CheckCircle2,
  Server,
  Lightbulb,
  AlertTriangle,
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
  { name: 'Spring Boot 3.5', color: '#6DB33F' },
  { name: 'Spring AI', color: '#6DB33F' },
  { name: 'Ollama', color: '#000000' },
  { name: 'WebMagic', color: '#5B8DEF' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'Threads API', color: '#000000' },
]

const features = [
  {
    icon: Newspaper,
    title: '多來源新聞爬蟲',
    desc: '以 WebMagic + Jsoup 解析自由時報、TechCrunch，支援 scan-range 與 max-articles 控制掃描深度，並用 source_url 唯一鍵去重避免重複入庫。',
    color: '#6366F1',
  },
  {
    icon: Sparkles,
    title: '本地 LLM 文章改寫',
    desc: '透過 Spring AI 串接本機 Ollama，用 gemma4:e4b 把長新聞改寫為 500 字內的 Threads 貼文，全程不出機器；溫度、top-k、top-p、repeat-penalty 皆可調。',
    color: '#8B5CF6',
  },
  {
    icon: Send,
    title: 'Threads 兩階段發布',
    desc: '依 Threads Graph API 規範，先建立 media container 再正式發布，回傳 media_id 作為外部追蹤 ID；成功與失敗都寫入 publish log。',
    color: '#06B6D4',
  },
  {
    icon: Clock,
    title: '排程與開關控制',
    desc: '爬蟲、AI 生成各有獨立的 cron 與 enabled 開關，透過 @ConditionalOnProperty 控制是否註冊；開發階段預設全關，正式上線再依需求啟用。',
    color: '#F59E0B',
  },
  {
    icon: Database,
    title: '完整資料留痕',
    desc: '三張表（crawl_article、ai_generated_post、post_publish_log）形成完整審計鏈，從原文 → AI 改寫 → 發布結果都可回溯。',
    color: '#10B981',
  },
]

const apiExamples = [
  { method: 'POST', methodColor: '#10B981', path: '/api/crawler/ltn/execute', desc: '觸發自由時報爬蟲' },
  { method: 'GET', methodColor: '#3B82F6', path: '/api/crawler/ltn/status', desc: '查詢自由時報爬蟲狀態' },
  { method: 'POST', methodColor: '#10B981', path: '/api/crawler/techcrunch/execute', desc: '觸發 TechCrunch 爬蟲' },
  { method: 'POST', methodColor: '#10B981', path: '/api/ai-generation/execute', desc: '觸發 AI 改寫一篇 PENDING 文章' },
  { method: 'GET', methodColor: '#3B82F6', path: '/api/ai-generation/pending-count', desc: '查詢待 AI 處理文章數' },
  { method: 'POST', methodColor: '#10B981', path: '/api/threads-publish/execute', desc: '自動挑一篇 DRAFT 發布到 Threads' },
  { method: 'POST', methodColor: '#10B981', path: '/api/threads-publish/{aiPostId}', desc: '指定 AI 文章 ID 發布' },
  { method: 'GET', methodColor: '#3B82F6', path: '/api/threads-publish/pending-count', desc: '查詢待發布文章數' },
]

const tables = [
  {
    name: 'crawl_article',
    desc: '爬蟲原始文章',
    statuses: ['PENDING', 'PROCESSED', 'FAILED'],
    color: '#6366F1',
  },
  {
    name: 'ai_generated_post',
    desc: 'AI 改寫後貼文',
    statuses: ['DRAFT', 'PUBLISHED', 'FAILED'],
    color: '#8B5CF6',
  },
  {
    name: 'post_publish_log',
    desc: '每次發布結果',
    statuses: ['PENDING', 'SUCCESS', 'FAILED'],
    color: '#06B6D4',
  },
]

const setupSteps = [
  {
    title: '安裝 Ollama 並拉模型',
    code: 'ollama pull gemma4:e4b',
  },
  {
    title: '建立資料庫',
    code: 'CREATE DATABASE my_db_threads_bot;',
  },
  {
    title: '設定環境',
    code: 'cp src/main/resources/application-dev.yaml.example src/main/resources/application-dev.yaml\n# 編輯填入 DB 帳密、Threads Access Token 與 User ID',
  },
  {
    title: '啟動',
    code: './mvnw spring-boot:run\n# http://localhost:8080',
  },
]

const highlights = [
  '零 API 成本：核心改寫走本地 Ollama，沒有月費、沒有 token 帳單。',
  '完整可審計：三表結構保留「原文 → AI 文 → 發布結果」全鏈路，問題可追溯。',
  '可關可開：每個階段有獨立 enabled / cron，可以只開爬蟲、只開 AI、或全自動。',
  'Spring 生態整合：示範 Spring AI、WebMagic、Spring Retry、Scheduling、JPA 在單一專案中協作。',
  'Prompt 自主可調：Prompt 全在自己 codebase，可隨時為個人風格微調。',
]

const limitations = [
  'Threads 不支援自動定時發文：發文步驟目前需手動觸發或自行包排程。',
  'Token 期限：Threads 長期 Token 約 60 天需手動換發。',
  '模型 context 上限：原文太長會超出 gemma4:e4b context window，需自行截斷或換大模型。',
  'schema 採用 ddl-auto: update：適合個人專案，正式環境建議改 Flyway / Liquibase。',
]

export default function ThreadsBot() {
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
            to="/"
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 text-sm font-medium transition-colors cursor-pointer group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
            返回首頁
          </Link>
          <a
            href="https://github.com/Rex-shark/ThreadsBot"
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
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold mb-5">
              <Server size={12} />
              Backend / Automation
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              ThreadsBot
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed mb-4">
              用本地 LLM（Ollama）自動爬取新聞、改寫成社群貼文，並發布到 Threads，全程不依賴付費 AI API。
            </p>
            <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
              市面上的自動化方案多半綁 OpenAI / Claude API，長期成本高、內容也受平台政策約束。ThreadsBot 走完全本地化路線：資料、模型、發布流程全部收在自己機器上，免月費、可離線運作、Prompt 可自訂。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: 'easeOut' as const, delay: 0.1 }}
            className="justify-self-center"
          >
            <img
              src="/projects/threads-bot/hero-threads-post.png"
              alt="Threads 實際發文成果"
              className="rounded-2xl border border-slate-200 shadow-lg shadow-indigo-100/40 max-h-[600px] w-auto hover:-translate-y-1 transition-transform duration-300"
            />
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
          <p className="text-slate-500 text-sm mb-10">爬蟲、AI 改寫、自動發文，三段流程彼此解耦</p>
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

          {/* Ollama 回應截圖 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-8"
          >
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Ollama 本地回應實測
            </p>
            <img
              src="/projects/threads-bot/ollama-response.png"
              alt="Ollama 終端機回應"
              className="rounded-2xl border border-slate-200 hover:-translate-y-1 transition-transform duration-300 w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* 系統架構 */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">系統架構</h2>
          <p className="text-slate-500 text-sm mb-8">
            爬蟲 → AI 改寫 → 發文，三階段透過 PostgreSQL 解耦，可獨立觸發或排程執行
          </p>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 overflow-x-auto">
            <img
              src="/projects/threads-bot/architecture-flow.svg"
              alt="ThreadsBot 系統架構流程圖"
              className="mx-auto max-w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="px-6 py-16 bg-slate-50/60">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">API 端點</h2>
          <p className="text-slate-500 text-sm mb-8">每個階段都可獨立透過 REST API 手動觸發</p>
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

      {/* 資料模型 */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">資料模型</h2>
          <p className="text-slate-500 text-sm mb-8">
            三張表形成 1—N—N 關聯：<code className="font-mono text-xs">crawl_article</code> → <code className="font-mono text-xs">ai_generated_post</code> → <code className="font-mono text-xs">post_publish_log</code>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {tables.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Database size={16} style={{ color: t.color }} />
                  <code
                    className="font-mono text-sm font-bold text-slate-900"
                    style={{ fontFamily: '"JetBrains Mono", monospace' }}
                  >
                    {t.name}
                  </code>
                </div>
                <p className="text-slate-500 text-sm mb-4">{t.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {t.statuses.map((s) => (
                    <span
                      key={s}
                      className="text-[11px] px-2 py-0.5 rounded-full font-mono"
                      style={{
                        background: `${t.color}12`,
                        color: t.color,
                        fontFamily: '"JetBrains Mono", monospace',
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <motion.img
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            src="/projects/threads-bot/db-records.png"
            alt="crawl_article 表實際資料"
            className="rounded-2xl border border-slate-200 w-full hover:-translate-y-1 transition-transform duration-300"
          />
        </div>
      </section>

      {/* Quick Start */}
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

      {/* 設計亮點 / 已知限制 */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl border border-indigo-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb size={18} className="text-indigo-600" />
              <h3 className="font-bold text-slate-900">設計亮點</h3>
            </div>
            <ul className="space-y-3">
              {highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm text-slate-600 leading-relaxed">
                  <span className="text-indigo-500 shrink-0">•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50/60 rounded-2xl border border-amber-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={18} className="text-amber-600" />
              <h3 className="font-bold text-slate-900">已知限制 / 誠實揭露</h3>
            </div>
            <ul className="space-y-3">
              {limitations.map((l) => (
                <li key={l} className="flex gap-2 text-sm text-slate-600 leading-relaxed">
                  <span className="text-amber-500 shrink-0">•</span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 border-t border-slate-100 bg-gradient-to-br from-indigo-50/40 to-violet-50/40">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">想看更多細節？</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            原始碼、README、設定範例都在 GitHub repo，歡迎 fork 自己玩。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://github.com/Rex-shark/ThreadsBot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <GithubIcon className="w-4 h-4" />
              查看 GitHub Repo
            </a>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-slate-200 text-slate-700 font-semibold text-sm hover:border-indigo-300 hover:text-indigo-600 transition-colors cursor-pointer"
            >
              <ArrowLeft size={15} />
              返回首頁
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 border-t border-slate-100 text-center text-slate-400 text-xs">
        © 2025 Rex · ThreadsBot
      </footer>
    </div>
  )
}

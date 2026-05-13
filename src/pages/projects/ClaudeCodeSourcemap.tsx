import { Link } from 'react-router'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  BookOpen,
  AlertTriangle,
  ExternalLink,
  ShieldAlert,
  Layers,
  Sparkles,
  Workflow,
  Wrench,
  ListChecks,
  GitBranch,
  Type,
  Scale,
} from 'lucide-react'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

const REPO_URL = 'https://github.com/Rex-shark/claude-code-sourcemap'

const techStack = [
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Node.js', color: '#5FA04E' },
  { name: 'Ink (React)', color: '#61DAFB' },
  { name: 'Source Map', color: '#9333EA' },
  { name: 'Research', color: '#F59E0B' },
  { name: 'AI Agent', color: '#6366F1' },
]

const breakdown = [
  { label: '還原檔案總數', value: '4756 個' },
  { label: 'TypeScript / TSX 原始檔', value: '1884 個' },
  { label: '內建工具實作（Bash、FileEdit、Grep、MCP 等）', value: '30+ 個' },
  { label: 'Slash command 實作（commit、review、config 等）', value: '40+ 個' },
  { label: 'Anthropic 內建子代理（subagent）', value: '多個' },
]

type Note = {
  index: number
  title: string
  file: string
  lines: string
  subtitle: string
  summary: string
  sections: string[]
  url: string
  starred?: boolean
}

const notes: Note[] = [
  {
    index: 1,
    title: '架構分析',
    file: 'architecture-analysis.md',
    lines: '397 行',
    subtitle: 'Claude Code 怎麼把 LLM 變成穩定的 AI 程式設計助理',
    summary:
      '拆解 Claude Code 的 6 層架構（CLI 入口 → 命令層 → Query Engine → 工具系統 → 服務層 / 工具函式層）。技術棧採用 Node.js ESM + TypeScript + Ink（Terminal React），單檔 bundle，僅 @img/sharp 為 optional native。',
    sections: [
      '整體專案概覽（目錄結構）',
      '六層架構分層圖',
      '42 個工具目錄的職責劃分',
      '86 個子命令的組織方式',
    ],
    url: 'https://github.com/Rex-shark/claude-code-sourcemap/blob/master/docs/architecture-analysis.md',
  },
  {
    index: 2,
    title: 'Prompt 完整分析',
    file: 'prompts-analysis.md',
    lines: '765 行',
    subtitle: 'System Prompt 14 個區塊的完整解構，含原文與繁中翻譯',
    summary:
      'Claude Code 每次對話組合一個結構化 System Prompt，分為 7 個靜態區塊（可快取）+ 7 個動態區塊。靜態包含角色介紹、系統行為、任務執行、謹慎行動、工具使用、語氣風格、輸出效率；動態則注入會話指引、CLAUDE.md 記憶、環境資訊、語言、輸出風格、MCP 指令、暫存目錄。',
    sections: [
      'System Prompt 的「快取邊界」設計（__SYSTEM_PROMPT_DYNAMIC_BOUNDARY__）',
      '角色介紹中的安全宣告',
      '工具使用指引：何時用 Bash、Grep、Glob、Read',
      'Tone & Style 區塊如何約束 AI 的回應長度與格式',
    ],
    url: 'https://github.com/Rex-shark/claude-code-sourcemap/blob/master/docs/prompts-analysis.md',
    starred: true,
  },
  {
    index: 3,
    title: 'Slash Command Prompts',
    file: 'command-prompts.md',
    lines: '984 行',
    subtitle: '14 個 slash command 的完整提示詞集錄',
    summary:
      '詳列 /init、/commit、/review、/ultrareview、/security-review、/pr-comments、/insights、/compact、/ultraplan、/statusline、/brief、/thinkback 等指令的完整 prompt 內容與設計理由。是學習「如何把工程流程編碼成 prompt」的最佳範例集。',
    sections: [
      '/init：建立 CLAUDE.md 的引導式問答流程',
      '/commit：怎麼讓 LLM 寫出符合專案風格的 commit message',
      '/ultrareview：多代理協作的 code review 流程',
      '/compact：對話壓縮的觸發條件與摘要要求',
    ],
    url: 'https://github.com/Rex-shark/claude-code-sourcemap/blob/master/docs/command-prompts.md',
  },
  {
    index: 4,
    title: 'Plan Mode Prompts',
    file: 'plan-mode-prompts.md',
    lines: '657 行',
    subtitle: '「Plan 模式」的多層 prompt 工作流拆解',
    summary:
      'Plan Mode 不是單一 prompt，而是由多層 prompt 在不同階段注入。包含 EnterPlanMode 工具觸發、5 階段工作流主體、迭代式訪談變體、Phase 4 A/B 測試、Plan Agent 子代理、ExitPlanMode 收尾，以及與 Auto Mode 的對照。',
    sections: [
      '從觸發到結束的完整生命週期',
      '為什麼要 5 階段（不是一次性丟整個計畫）',
      '迭代式訪談與單次規劃的取捨',
    ],
    url: 'https://github.com/Rex-shark/claude-code-sourcemap/blob/master/docs/plan-mode-prompts.md',
  },
  {
    index: 5,
    title: 'Subagent 學習指南',
    file: 'subagent-learning-guide.md',
    lines: '460 行',
    subtitle: '用 Claude Code 原始碼學打造「Writer + Reviewer」雙 Agent 系統',
    summary:
      'Claude Code 原始碼中的 verificationAgent.ts、coordinatorMode.ts、generalPurposeAgent.ts 提供了完整的多代理協作範本。本筆記示範如何直接借用：Coordinator 派工 → Writer 寫 code → Reviewer 唯讀審查並輸出 VERDICT: PASS/FAIL/PARTIAL → FAIL 則回傳給 Writer 重做。',
    sections: [
      '⭐⭐⭐ verificationAgent.ts：Reviewer 的藍本（含 documented failure patterns 設計）',
      '⭐⭐ coordinatorMode.ts：派工與結果整合',
      '⭐ generalPurposeAgent.ts：可改造為 Writer Agent',
      '結構化輸出（VERDICT: 關鍵字）作為自動化流程的協議',
    ],
    url: 'https://github.com/Rex-shark/claude-code-sourcemap/blob/master/docs/subagent-learning-guide.md',
    starred: true,
  },
]

const insights = [
  {
    icon: Layers,
    title: '快取友善的 Prompt 切分',
    desc: '靜態區塊放前面、動態區塊放後面，中間用明確邊界標記，最大化 prompt cache 命中率。',
  },
  {
    icon: ShieldAlert,
    title: '安全護欄前置',
    desc: '把「不該做什麼」寫在 prompt 開頭，而非附加在結尾，避免被後續上下文稀釋。',
  },
  {
    icon: Wrench,
    title: '每個工具獨立指引',
    desc: 'Bash / Read / Edit 都有專屬段落，不是只給函式簽章讓 AI 猜怎麼用。',
  },
  {
    icon: ListChecks,
    title: '明確列出失敗模式',
    desc: '例如 verificationAgent 寫了「你會避免做檢查」、「你會被前 80% 的成果迷惑」，比抽象的「請認真」有效。',
  },
  {
    icon: Workflow,
    title: '結構化輸出作為協議',
    desc: 'VERDICT: PASS/FAIL 不是給人看的，是給 Coordinator 解析的，這讓自動化工作流可行。',
  },
  {
    icon: GitBranch,
    title: '權限分層',
    desc: 'Writer 可寫 / Reviewer 唯讀，把信任邊界寫進系統，而不只是寫進 prompt。',
  },
  {
    icon: Type,
    title: '語氣風格簡潔條列',
    desc: '用條列規則約束 AI 回應風格，比長篇描述有效。',
  },
]

const legalPoints = [
  '此為非官方還原版本，並非由 Anthropic 發布或背書。',
  '原始碼版權（Copyright）歸 Anthropic, PBC 所有。',
  '本 repo 與本頁面內容僅供個人學習與研究用途。',
  '不可作為商業用途，亦不得以此版本再發行衍生產品。',
]

const codeSnippet = `// extract-sources.js (節錄)
const map = JSON.parse(
  fs.readFileSync('cli.js.map', 'utf8')
);

map.sources.forEach((src, i) => {
  const content = map.sourcesContent[i];
  if (!content) return;
  const out = path.join('sources', src);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, content);
});

// → 還原 4756 個檔案、1884 個 .ts / .tsx`

export default function ClaudeCodeSourcemap() {
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
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-violet-600 text-sm font-medium transition-colors cursor-pointer group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
            返回首頁
          </Link>
          <a
            href={REPO_URL}
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
      <section className="px-6 py-16 border-b border-slate-100 bg-gradient-to-br from-violet-50/60 via-purple-50/40 to-fuchsia-50/30">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold mb-4">
              <BookOpen size={12} />
              Research / AI Agent
            </div>

            {/* Disclaimer badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-amber-100 text-amber-800 border border-amber-200 text-[12px] font-semibold mb-5">
              <AlertTriangle size={13} />
              非官方還原 · 僅供研究
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Claude Code 原始碼研究
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed mb-4">
              從 sourcemap 還原 Claude Code v2.1.88，並深度拆解架構與 prompt 設計。
            </p>
            <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
              從 <code className="font-mono text-xs">@anthropic-ai/claude-code@2.1.88</code> npm 套件附帶的 source map 還原 TypeScript 原始碼（4756 個檔案、1884 個 .ts/.tsx），並寫成 5 篇深度分析筆記，拆解業界頂尖 AI Agent 的工程實作與 Prompt 設計。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: 'easeOut' as const, delay: 0.1 }}
            className="justify-self-center w-full"
          >
            <div className="rounded-2xl border border-violet-200/70 bg-slate-950 shadow-xl shadow-violet-200/40 overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 border-b border-slate-800">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                <span
                  className="ml-3 text-[11px] text-slate-400"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                >
                  extract-sources.js
                </span>
              </div>
              <pre
                className="p-4 text-[12px] leading-relaxed text-violet-100 overflow-x-auto"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                <code>{codeSnippet}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 為什麼做這個 / 拆解了什麼 */}
      <section className="px-6 py-16 border-b border-slate-100">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-xs font-bold tracking-widest text-violet-600 uppercase mb-3">
              Why
            </h2>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">為什麼做這個</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">
              Claude Code 是 Anthropic 官方推出的 AI 程式設計助理，內部如何讓 LLM 穩定完成複雜工程任務？官方沒釋出 source code，但 npm 套件意外保留了 source map。透過提取 <code className="font-mono text-xs">cli.js.map</code> 的 <code className="font-mono text-xs">sourcesContent</code> 欄位，可以還原幾乎完整的 TypeScript 原始碼。
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              對自己想做 AI Agent 系統（例如 Coordinator + Writer + Reviewer 多代理協作）的工程師來說，這是一份直接可借鑑的範本。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h2 className="text-xs font-bold tracking-widest text-violet-600 uppercase mb-3">
              What
            </h2>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">拆解了什麼</h3>
            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              {breakdown.map((b, i) => (
                <div
                  key={b.label}
                  className={`flex items-center justify-between px-5 py-3 text-sm ${
                    i !== breakdown.length - 1 ? 'border-b border-slate-100' : ''
                  } hover:bg-violet-50/40 transition-colors`}
                >
                  <span className="text-slate-600">{b.label}</span>
                  <span className="font-mono font-semibold text-violet-700">{b.value}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-3">
              還原版本：<code className="font-mono">@anthropic-ai/claude-code v2.1.88</code> ·
              已寫成 5 篇、共 ~3263 行分析文件
            </p>
          </motion.div>
        </div>
      </section>

      {/* 五篇分析筆記 */}
      <section className="px-6 py-16 bg-slate-50/60">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs font-bold tracking-widest text-violet-600 uppercase mb-3">
            Notes
          </h2>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">五篇分析筆記</h3>
          <p className="text-slate-500 text-sm mb-10">頁面核心。每篇皆為獨立 markdown，可在 GitHub 上閱讀完整原文。</p>

          <div className="space-y-5">
            {notes.map((n, i) => (
              <motion.article
                key={n.file}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: 'easeOut' as const, delay: i * 0.08 }}
                className={`bg-white rounded-2xl border border-slate-100 p-6 sm:p-7 hover:shadow-lg hover:shadow-violet-100/50 transition-all duration-200 ${
                  n.starred ? 'border-l-4 border-l-violet-600' : ''
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-violet-100 text-violet-700 text-xs font-bold">
                        {n.index}
                      </span>
                      <h4 className="text-xl font-bold text-slate-900">{n.title}</h4>
                      {n.starred && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-semibold">
                          <Sparkles size={11} />
                          重點推薦
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{n.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] shrink-0">
                    <code
                      className="px-2 py-1 rounded bg-slate-100 text-slate-600 font-mono"
                      style={{ fontFamily: '"JetBrains Mono", monospace' }}
                    >
                      {n.file}
                    </code>
                    <span className="text-slate-400 font-mono">{n.lines}</span>
                  </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-5">{n.summary}</p>

                <div className="rounded-xl bg-violet-50/50 border border-violet-100 p-4 mb-5">
                  <p className="text-[11px] font-bold tracking-widest text-violet-700 uppercase mb-2">
                    重點章節
                  </p>
                  <ul className="space-y-1.5">
                    {n.sections.map((s) => (
                      <li
                        key={s}
                        className="flex gap-2 text-sm text-slate-700 leading-relaxed"
                      >
                        <span className="text-violet-500 shrink-0">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={n.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-700 hover:text-violet-900 transition-colors"
                >
                  在 GitHub 看完整原文
                  <ExternalLink size={14} />
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Prompt Engineering 見解 */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs font-bold tracking-widest text-violet-600 uppercase mb-3">
            Insights
          </h2>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">對 Prompt Engineering 的 7 點見解</h3>
          <p className="text-slate-500 text-sm mb-10">
            從這次拆解歸納出的設計原則，是這份筆記最有差異化的部分。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((it, i) => (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, ease: 'easeOut' as const, delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-slate-100 p-5 hover:border-violet-200 hover:shadow-md hover:shadow-violet-100/40 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: '#9333EA14', color: '#9333EA' }}
                  >
                    <it.icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 mb-1.5 text-sm">
                      {i + 1}. {it.title}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{it.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-6 py-12 border-t border-slate-100 bg-slate-50/60">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs font-bold tracking-widest text-violet-600 uppercase mb-4">
            Tech Stack
          </h2>
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

      {/* 法律宣告 */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/60 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Scale size={20} className="text-amber-700" />
              <h3 className="text-lg font-bold text-amber-900">法律宣告 / Disclaimer</h3>
            </div>
            <ul className="space-y-3">
              {legalPoints.map((p) => (
                <li key={p} className="flex gap-2.5 text-sm text-amber-900 leading-relaxed">
                  <AlertTriangle size={15} className="text-amber-600 shrink-0 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-amber-800/80 mt-5 leading-relaxed">
              如為原權利人並認為本 repo 不應公開，請透過 GitHub issue 聯繫，將立即下架相關內容。
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 border-t border-slate-100 bg-gradient-to-br from-violet-50/60 to-fuchsia-50/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">想看完整還原碼與筆記？</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            還原原始碼、5 篇 markdown 分析筆記、extract 腳本都在 GitHub。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-violet-700 text-white font-semibold text-sm hover:bg-violet-800 transition-colors cursor-pointer"
            >
              <GithubIcon className="w-4 h-4" />
              在 GitHub 上查看完整還原碼
            </a>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-slate-200 text-slate-700 font-semibold text-sm hover:border-violet-300 hover:text-violet-700 transition-colors cursor-pointer"
            >
              <ArrowLeft size={15} />
              返回首頁
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 border-t border-slate-100 text-center text-slate-400 text-xs">
        <p className="mb-1">© 2026 Rex · Claude Code 原始碼研究筆記</p>
        <p>非官方還原 · 原始碼版權歸 Anthropic 所有 · 僅供研究用途</p>
      </footer>
    </div>
  )
}

import { Link } from 'react-router'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Brain,
  ScanEye,
  MessageSquareQuote,
  ShieldCheck,
  Users,
  Pencil,
  Music,
  Code2,
  Presentation,
  Video,
  Sheet,
  AlertTriangle,
  Scale,
  Bot,
} from 'lucide-react'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

const REPO = 'https://github.com/Rex-shark/fishing-work'
const IMG = '/projects/fishing-work'

/* 配色沿用 fishing-work 的 DESIGN.md（VS Code Dark+） */
const C = {
  bg: '#1e1e1e',
  panel: '#252526',
  raised: '#2d2d30',
  line: '#3c3c3c',
  fg: '#d4d4d4',
  bright: '#ffffff',
  muted: '#9d9d9d',
  blue: '#3794ff',
  purple: '#c586c0',
  teal: '#4ec9b0',
  yellow: '#dcdcaa',
  orange: '#ce9178',
  status: '#007acc',
}
const MONO = { fontFamily: '"JetBrains Mono", ui-monospace, monospace' }

const games = [
  {
    icon: Pencil,
    name: '我畫你猜',
    disguise: 'VS Code／PowerPoint／Meet／Excel',
    desc: '畫師自訂題目作畫，其他人看畫在聊天室猜題，越快猜對分數越高；四套偽裝外觀任選。',
    color: C.blue,
  },
  {
    icon: Brain,
    name: '繪圖比賽',
    disguise: 'PowerPoint',
    desc: '出題後所有人同時畫 2 分鐘，AI 逐張打分、投影片揭曉名次與 AI 評語；附參考圖就是「像不像比賽」。',
    color: C.purple,
    ai: true,
  },
  {
    icon: Music,
    name: '猜歌',
    disguise: 'Google Meet',
    desc: '選題庫（指定歌手、台灣熱門、西洋熱門、動漫熱門），所有人同時聽 Apple Music 30 秒試聽、打字猜歌名。',
    color: C.teal,
  },
]

const disguises = [
  { icon: Code2, label: 'VS Code', src: `${IMG}/draw-guess-vscode.webp`, alt: '我畫你猜的 VS Code 偽裝：畫布在編輯區，TERMINAL 是聊天猜題' },
  { icon: Presentation, label: 'PowerPoint', src: `${IMG}/draw-guess-ppt.webp`, alt: '我畫你猜的 PowerPoint 偽裝' },
  { icon: Video, label: 'Google Meet', src: `${IMG}/draw-guess-meet.webp`, alt: '我畫你猜的 Google Meet 偽裝' },
  { icon: Sheet, label: 'Excel', src: `${IMG}/draw-guess-excel.webp`, alt: '我畫你猜的 Excel 偽裝' },
]

/* 一回合繪圖比賽裡 AI 經手的步驟 */
const pipeline = [
  { step: '01', title: '交卷就排隊評分', desc: 'server 收到一張就排進評分佇列（一次一張），不等全部交卷。', who: 'server' },
  { step: '02', title: 'Clef 看圖打分', desc: '本機 Ollama 的 Clef 決策模型判斷像不像題目，回 0～100 分與信心值；1280×720 原圖約 2.4 秒一張。', who: 'Clef' },
  { step: '03', title: '全部評完才揭曉', desc: '分數與排名只由 Clef 決定，投影片瀏覽依名次揭曉每個人的畫。', who: 'server' },
  { step: '04', title: 'ミオ寫評語，晚到補上', desc: '每張評完分就交給 gemma4 寫一句評語；揭曉不等它，寫好自動補在卡片上。', who: 'gemma4' },
  { step: '05', title: '第一名重寫稱讚版', desc: '名次揭曉時才知道誰第一，當下改用稱讚版提示詞重寫；失敗就退回原本那句。', who: 'gemma4' },
]

const fallbacks = [
  '連不上 Ollama 或模型不存在：該回合自動改用隨機評分，畫面標「隨機評分」；之後開了 Ollama 也不用重啟，下一回合就恢復 AI 評分。',
  '錯誤分類：只跟這張圖有關的錯誤（HTTP 400／413／415／422）只讓那張退回隨機；上游不可用（斷線、逾時、5xx、模型不存在）才整回合降級。',
  '評語單張逾時 30 秒；同一回合連續兩次失敗才跳過剩下的評語，下一回合再試。',
  '啟動時先送一張 1×1 的圖暖機，把 Clef 載進記憶體常駐 30 分鐘（冷啟動第一張約 13 秒）。',
  '兩個模型同時常駐約 71 GB；32 GB 的機器設 COMMENT=off 只留評分，或再加 JUDGE=random 完全不用 AI。',
]

const team = [
  { role: '海圖', en: 'Chart', desc: '架構師、規格負責人：釐清需求、寫 spec 與 plan、做設計決策；不寫業務程式。' },
  { role: '水手長', en: 'Bosun', desc: '工程師：依 plan 與 spec 拆任務、派工給子代理，並驗收它們的產出。' },
  { role: '事務長', en: 'Purser', desc: '助手：查資料、環境與工具操作、文件整理等非開發事務。' },
  { role: 'acceptance-reviewer', en: '子代理', desc: '獨立驗收：不相信實作回報，自己重跑測試與建置、比對契約、補寫協定測試、用瀏覽器實際操作。' },
]

const techStack = [
  'React 19',
  'Vite 8',
  'TypeScript',
  'Tailwind CSS v4',
  'Zustand',
  'Node.js',
  'Express 5',
  'Socket.IO 4',
  'Ollama',
  'Clef 27B（NVFP4）',
  'gemma4 26B',
  'Vitest',
  'Docker',
  'Cloudflare Tunnel',
]

const limitations = [
  '沒有登入機制，只靠網址不外流；外網分享時網址公開即任何人都能進來（房間上限 50 人）。',
  '分數只存在伺服器記憶體，重啟歸零；繪圖比賽歷史只存在各自的瀏覽器（最近 5 場）。',
  'AI 評分與評語需要本機 Ollama 與足夠記憶體；沒有時退回隨機評分、沒有評語。',
  '語音輸入（whisper.cpp 語音轉文字）暫緩：區網只能用 http，瀏覽器不開放麥克風。',
  '猜歌需要 server 與每位玩家都連得到 Apple 的網域，公司網路擋掉時聽不到聲音。',
]

function Shot({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="min-w-0">
      <img
        decoding="async"
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full rounded-lg border hover:-translate-y-1 transition-transform duration-300"
        style={{ borderColor: C.line }}
      />
      {caption && (
        <figcaption className="text-xs mt-2.5 leading-relaxed" style={{ color: C.muted }}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function Eyebrow({ children, color = C.blue }: { children: string; color?: string }) {
  return (
    <p className="text-xs font-medium tracking-[0.14em] uppercase mb-3" style={{ ...MONO, color }}>
      {children}
    </p>
  )
}

export default function FishingWork() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: C.bg, color: C.fg, fontFamily: '"Inter", "Noto Sans TC", system-ui, sans-serif' }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+TC:wght@400;500;700&display=swap"
      />

      {/* 頂部導覽 */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b" style={{ backgroundColor: `${C.bg}E6`, borderColor: C.line }}>
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors cursor-pointer group hover:text-white"
            style={{ color: C.muted }}
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
            返回首頁
          </Link>
          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors cursor-pointer hover:text-white"
          >
            <GithubIcon className="w-4 h-4" />
            在 GitHub 上查看
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 pt-16 pb-14 border-b" style={{ borderColor: C.line }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
          >
            <Eyebrow>AI / Realtime / Full-Stack</Eyebrow>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5" style={{ color: C.bright }}>
              fishing-work
            </h1>
            <p className="text-lg max-w-3xl leading-relaxed mb-4" style={{ color: C.fg }}>
              部署在本機、同事透過公司區網進來玩的遊戲平台。三款遊戲的畫面都偽裝成上班會開的軟體，而繪圖比賽的評審是<strong style={{ color: C.bright }}>跑在本機的 AI 模型</strong>：一個看圖打分，一個扮評審講評。
            </p>
            <p className="text-sm max-w-3xl leading-relaxed mb-7" style={{ color: C.muted }}>
              開一個網址就能玩，暱稱即身分，不用安裝也不用帳號。AI 全部跑在本機 Ollama，不連雲端服務；模型沒開也照樣能玩。
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: ScanEye, text: 'Clef 看圖打分', color: C.purple },
                { icon: MessageSquareQuote, text: 'gemma4 扮評審寫評語', color: C.teal },
                { icon: ShieldCheck, text: '模型不在自動退回', color: C.yellow },
              ].map((chip) => (
                <span
                  key={chip.text}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm border"
                  style={{ borderColor: `${chip.color}55`, backgroundColor: `${chip.color}14`, color: chip.color }}
                >
                  <chip.icon size={14} />
                  {chip.text}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="mt-10">
            <Shot
              src={`${IMG}/draw-contest-reveal.webp`}
              alt="繪圖比賽揭曉：每張畫的 AI 分數、名次與評審ミオ的一句評語"
              caption="繪圖比賽揭曉（PowerPoint 偽裝）：分數與名次由 Clef 評定，每張畫下方是評審ミオ的評語，第一名拿到稱讚版"
            />
          </div>
        </div>
      </section>

      {/* AI 應用：一回合裡 AI 做了什麼 */}
      <section className="px-6 py-16" style={{ backgroundColor: C.panel }}>
        <div className="max-w-5xl mx-auto">
          <Eyebrow color={C.purple}>AI in the loop</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: C.bright }}>
            一回合繪圖比賽，AI 經手的五個步驟
          </h2>
          <p className="text-sm mb-10 max-w-3xl leading-relaxed" style={{ color: C.muted }}>
            兩個本機模型分工：Clef 只管分數，gemma4 只管文字。評語晚到不擋揭曉，分數失敗也有退路。
          </p>
          <ol className="space-y-3">
            {pipeline.map((p, i) => {
              const tone = p.who === 'Clef' ? C.purple : p.who === 'gemma4' ? C.teal : C.muted
              return (
                <motion.li
                  key={p.step}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="flex gap-4 items-start rounded-lg border px-5 py-4"
                  style={{ backgroundColor: C.bg, borderColor: C.line }}
                >
                  <span className="shrink-0 text-sm font-medium pt-0.5" style={{ ...MONO, color: tone }}>
                    {p.step}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <p className="font-semibold text-sm" style={{ color: C.bright }}>{p.title}</p>
                      <span
                        className="text-[11px] px-1.5 py-px rounded border"
                        style={{ ...MONO, color: tone, borderColor: `${tone}55` }}
                      >
                        {p.who}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{p.desc}</p>
                  </div>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* AI 應用細節 */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto space-y-14">
          {/* Clef 評分員 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="min-w-0">
              <Eyebrow color={C.purple}>AI 應用 1 · 評分員</Eyebrow>
              <h3 className="text-xl font-bold mb-3" style={{ color: C.bright }}>Clef 看圖打分</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: C.fg }}>
                每張交卷的畫由本機 Ollama 上的 Clef 決策模型看圖評分，回傳 0～100 分與信心值，判斷「畫得像不像題目」。
              </p>
              <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2 text-sm">
                <dt style={{ color: C.muted }}>模型</dt>
                <dd style={{ ...MONO, color: C.orange }} className="break-all">clef:27b-nvfp4（約 18 GB）</dd>
                <dt style={{ color: C.muted }}>介面</dt>
                <dd style={{ ...MONO, color: C.orange }} className="break-all">POST /v1/systemone</dd>
                <dt style={{ color: C.muted }}>速度</dt>
                <dd>1280×720 原圖約 2.4 秒一張，所以拿掉了縮圖步驟</dd>
                <dt style={{ color: C.muted }}>佇列</dt>
                <dd>一次一張，交卷就評，不等全部交完</dd>
              </dl>
            </div>
            <Shot
              src={`${IMG}/draw-contest-drawing.webp`}
              alt="繪圖比賽作畫中：所有人同時在自己的畫布上畫同一個題目"
              caption="作畫中：所有人同時畫同一題，2 分鐘後自動交卷"
            />
          </div>

          {/* 像不像比賽 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="min-w-0 md:order-2">
              <Eyebrow color={C.purple}>AI 應用 2 · 雙圖比對</Eyebrow>
              <h3 className="text-xl font-bold mb-3" style={{ color: C.bright }}>像不像比賽</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: C.fg }}>
                出題者附一張參考圖，大家照著畫；Clef 同時看參考圖和作品，分別回答相似度（5 級）與完成度（3 級），再合成分數。只看形狀、構圖與主體，不管顏色與線條粗細。
              </p>
              <pre
                className="text-[13px] rounded-lg border px-4 py-3 overflow-x-auto mb-4"
                style={{ ...MONO, backgroundColor: C.panel, borderColor: C.line, color: C.yellow }}
              >
                score = round(100 × (0.9 × 相似度/4 + 0.1 × 完成度/2))
              </pre>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border px-4 py-3" style={{ borderColor: C.line, backgroundColor: C.panel }}>
                  <p className="text-3xl font-bold tabular-nums" style={{ color: C.teal }}>84</p>
                  <p className="text-xs mt-1" style={{ color: C.muted }}>照著參考圖畫</p>
                </div>
                <div className="rounded-lg border px-4 py-3" style={{ borderColor: C.line, backgroundColor: C.panel }}>
                  <p className="text-3xl font-bold tabular-nums" style={{ color: C.orange }}>9</p>
                  <p className="text-xs mt-1" style={{ color: C.muted }}>亂畫</p>
                </div>
              </div>
              <p className="text-xs mt-2" style={{ color: C.muted }}>真 Clef 驗收實測。參考圖由瀏覽器先縮到長邊 1280、轉 JPEG 再上傳。</p>
            </div>
            <div className="md:order-1 min-w-0">
              <Shot
                src={`${IMG}/draw-contest-mimic.webp`}
                alt="像不像比賽：作畫中右上角浮動的參考圖面板"
                caption="像不像比賽：作畫時右上角有參考圖面板，可放大或收合"
              />
            </div>
          </div>

          {/* 評審ミオ */}
          <div
            className="rounded-xl border p-6 sm:p-8"
            style={{ borderColor: `${C.teal}55`, backgroundColor: `${C.teal}0D` }}
          >
            <Eyebrow color={C.teal}>AI 應用 3 · 評審</Eyebrow>
            <h3 className="text-xl font-bold mb-3" style={{ color: C.bright }}>gemma4 扮評審「ミオ」寫評語</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <p className="text-sm leading-relaxed" style={{ color: C.fg }}>
                每張畫配一句評語，顯示在揭曉卡片上。由本機的 <span style={{ ...MONO, color: C.orange }}>gemma4:26b-mlx-bf16</span>（約 52.5 GB）以毒舌小惡魔的少女人設產生；像不像比賽時評語也會對照參考圖講。
              </p>
              <ul className="space-y-2 text-sm" style={{ color: C.fg }}>
                <li className="flex gap-2"><span style={{ color: C.teal }}>›</span>繁體中文台灣用語、一句 60 字內、帶參賽者暱稱</li>
                <li className="flex gap-2"><span style={{ color: C.teal }}>›</span>關閉思考（<span style={MONO}>think: false</span>），輸出上限 120 token</li>
                <li className="flex gap-2"><span style={{ color: C.teal }}>›</span>揭曉不等評語，寫好再補；等待中顯示「ミオ：正在寫評語」</li>
                <li className="flex gap-2"><span style={{ color: C.teal }}>›</span>第一名在揭曉當下重寫成稱讚版，失敗退回原本那句</li>
              </ul>
            </div>
          </div>

          {/* 容錯 */}
          <div>
            <Eyebrow color={C.yellow}>AI 應用 4 · 容錯</Eyebrow>
            <h3 className="text-xl font-bold mb-2" style={{ color: C.bright }}>模型不在，遊戲照玩</h3>
            <p className="text-sm mb-6" style={{ color: C.muted }}>AI 是加分項，不是單點故障：每一種失敗都有明確的退路，而且只影響該影響的範圍。</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {fallbacks.map((f) => (
                <li
                  key={f}
                  className="flex gap-3 rounded-lg border px-4 py-3 text-sm leading-relaxed"
                  style={{ borderColor: C.line, backgroundColor: C.panel }}
                >
                  <ShieldCheck size={16} className="shrink-0 mt-0.5" style={{ color: C.yellow }} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* AI 協作開發 */}
      <section className="px-6 py-16 border-y" style={{ backgroundColor: C.panel, borderColor: C.line }}>
        <div className="max-w-5xl mx-auto">
          <Eyebrow color={C.blue}>AI 應用 5 · 開發流程</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: C.bright }}>
            用 AI 團隊把它做出來
          </h2>
          <p className="text-sm mb-10 max-w-3xl leading-relaxed" style={{ color: C.muted }}>
            整個專案用 Claude Code 以計畫驅動開發：每個功能先寫成 Epic 計畫與規格契約，再由多個 session 分工實作與驗收。到 2026-11 共完成 20 個 Epic，每個都經過驗收與 Rex 實測。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {team.map((t, i) => (
              <motion.div
                key={t.role}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="rounded-lg border p-5"
                style={{ borderColor: C.line, backgroundColor: C.bg }}
              >
                <div className="flex items-center gap-2 mb-2">
                  {t.en === '子代理' ? <Bot size={16} style={{ color: C.blue }} /> : <Users size={16} style={{ color: C.blue }} />}
                  <p className="font-semibold" style={{ color: C.bright }}>{t.role}</p>
                  <span className="text-xs" style={{ ...MONO, color: C.muted }}>{t.en}</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: C.fg }}>{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 三款遊戲 */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <Eyebrow>Games</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-bold mb-10" style={{ color: C.bright }}>三款遊戲，四套偽裝</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {games.map((g) => (
              <div
                key={g.name}
                className="rounded-lg border p-5"
                style={{ borderColor: g.ai ? `${C.purple}66` : C.line, backgroundColor: C.panel }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <g.icon size={18} style={{ color: g.color }} />
                  <h3 className="font-semibold" style={{ color: C.bright }}>{g.name}</h3>
                  {g.ai && (
                    <span className="ml-auto text-[11px] px-1.5 py-px rounded" style={{ ...MONO, color: C.purple, backgroundColor: `${C.purple}1F` }}>
                      AI 評審
                    </span>
                  )}
                </div>
                <p className="text-xs mb-3" style={{ ...MONO, color: C.muted }}>偽裝：{g.disguise}</p>
                <p className="text-sm leading-relaxed" style={{ color: C.fg }}>{g.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-sm font-semibold mb-4" style={{ color: C.bright }}>我畫你猜的四套偽裝</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {disguises.map((d) => (
              <figure key={d.label} className="min-w-0">
                <img decoding="async" src={d.src} alt={d.alt} loading="lazy" className="w-full rounded-lg border" style={{ borderColor: C.line }} />
                <figcaption className="flex items-center gap-1.5 text-xs mt-2" style={{ color: C.muted }}>
                  <d.icon size={13} />
                  {d.label}
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="text-sm font-semibold mb-4" style={{ color: C.bright }}>猜歌（Meet 偽裝）</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Shot src={`${IMG}/song-guess-playing.webp`} alt="猜歌播放中：同步播放 30 秒試聽、聊天室打字猜歌名" caption="播放中：所有人同時聽 30 秒試聽" />
            <Shot src={`${IMG}/song-guess-reveal.webp`} alt="猜歌揭曉：歌名、歌手、封面與本首得分" caption="揭曉：歌名、歌手、封面與本首得分" />
          </div>
        </div>
      </section>

      {/* 技術棧 */}
      <section className="px-6 py-12 border-t" style={{ borderColor: C.line }}>
        <div className="max-w-5xl mx-auto">
          <Eyebrow>Tech Stack</Eyebrow>
          <div className="flex flex-wrap gap-2 mb-4">
            {techStack.map((t) => (
              <span key={t} className="px-3 py-1.5 rounded-md text-sm border" style={{ ...MONO, borderColor: C.line, backgroundColor: C.panel }}>
                {t}
              </span>
            ))}
          </div>
          <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
            單一 Node 程序同時提供三款遊戲的網頁與 Socket.IO 即時連線，不需要資料庫；換電腦用 Docker 一行部署，外網分享用 Cloudflare Tunnel。
          </p>
        </div>
      </section>

      {/* 已知限制 / 聲明 */}
      <section className="px-6 py-14 border-t" style={{ borderColor: C.line }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg border p-6" style={{ borderColor: C.line, backgroundColor: C.panel }}>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={18} style={{ color: C.yellow }} />
              <h3 className="font-semibold" style={{ color: C.bright }}>已知限制</h3>
            </div>
            <ul className="space-y-3">
              {limitations.map((l) => (
                <li key={l} className="flex gap-2 text-sm leading-relaxed">
                  <span className="shrink-0" style={{ color: C.muted }}>•</span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border p-6" style={{ borderColor: C.line, backgroundColor: C.panel }}>
            <div className="flex items-center gap-2 mb-4">
              <Scale size={18} style={{ color: C.muted }} />
              <h3 className="font-semibold" style={{ color: C.bright }}>聲明</h3>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: C.fg }}>
              偽裝外觀模仿 VS Code、PowerPoint、Google Meet、Excel 的介面，相關商標屬於各自的公司，本專案與這些公司無關。猜歌的試聽與封面由玩家的瀏覽器直接向 Apple 取得。
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 border-t" style={{ borderColor: C.line, backgroundColor: C.panel }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3" style={{ color: C.bright }}>想看更多細節？</h2>
          <p className="mb-8 leading-relaxed text-sm" style={{ color: C.muted }}>
            評分器與評語器的契約、錯誤分類、提示詞規則都寫在 repo 的 spec/draw-contest/；每個 Epic 的設計決策與踩雷紀錄在 plan/。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-semibold text-sm text-white transition-opacity hover:opacity-90 cursor-pointer"
              style={{ backgroundColor: C.status }}
            >
              <GithubIcon className="w-4 h-4" />
              查看 GitHub Repo
            </a>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border font-semibold text-sm transition-colors cursor-pointer hover:text-white"
              style={{ borderColor: C.line }}
            >
              <ArrowLeft size={15} />
              返回首頁
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-6 py-3 text-xs" style={{ ...MONO, backgroundColor: C.status, color: '#ffffff' }}>
        <div className="max-w-5xl mx-auto flex flex-wrap justify-between gap-2">
          <span>© 2026 Rex · fishing-work</span>
          <span>Ollama · Clef · gemma4</span>
        </div>
      </footer>
    </div>
  )
}

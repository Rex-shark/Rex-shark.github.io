import { Link } from 'react-router'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  AudioLines,
  Users,
  Drama,
  Languages,
  Radio,
  Layers,
  FileAudio,
  Lightbulb,
  AlertTriangle,
  Terminal,
  Scale,
  Cpu,
  OctagonAlert,
} from 'lucide-react'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

const REPO = 'https://github.com/Rex-shark/drama-3'

/* 配色沿用 drama-3 的「紙張與墨」設計指南 */
const INK = '#121212'
const PAPER = '#f1f1ef'
const CARD = '#fbfbf9'
const MUTED = '#595957'
const LINE = '#d2d2ce'
const ALERT = '#B42318'

const MONO = { fontFamily: '"IBM Plex Mono", ui-monospace, monospace' }
const DISPLAY = { fontFamily: '"Lexend", "Noto Sans TC", sans-serif' }

const techStack = [
  'Fish Audio Drama 3',
  'mlx-audio',
  'MLX / Metal',
  'Python 3.12',
  'FastAPI',
  'uv',
  'React 19',
  'Vite',
  '純 CSS',
  'Oxlint',
]

const capabilities = [
  {
    icon: AudioLines,
    title: '聲音複製',
    desc: '每個角色上傳或錄製 10–30 秒參考音檔加逐字稿，可多段；沒有參考音檔則由模型自行配音。',
  },
  {
    icon: Users,
    title: '多角色劇本',
    desc: '最多 16 個角色，逐行指定角色，不用手打 <|speaker:N|> 標籤。',
  },
  {
    icon: Drama,
    title: '表演控制',
    desc: '點狀標籤 [laughs] [sighs] [pause]、區間標籤 <whisper>…</whisper>、整句風格前綴、導演筆記。',
  },
  {
    icon: Languages,
    title: '跨語言',
    desc: '參考音檔與台詞語言可不同，支援 83 種語言。',
  },
  {
    icon: Radio,
    title: '長文與串流',
    desc: '自動分段、前段當後段上下文；串流模式收到第一段就開始播放。',
  },
  {
    icon: Layers,
    title: '版本切換',
    desc: '4bit / 8bit / bf16 三個量化版本，一次載入一個，取樣參數隨版本換預設。',
  },
  {
    icon: FileAudio,
    title: 'Take 卡紙',
    desc: '每次產生一張 take 卡紙，可播放、下載 WAV、重新產生；保留先前 12 張。',
  },
]

/* 一次產生的資料流 */
const dataFlow = [
  { step: '01', title: '收集角色', desc: '每角色 1 到 N 段參考音檔與逐字稿；瀏覽器端解碼任何格式並轉成 WAV，後端不需 ffmpeg' },
  { step: '02', title: '組成劇本文字', desc: '每行 <|speaker:N|> ＋ 風格前綴 ＋ 台詞，導演筆記用 Direction: / Line: 兩行格式' },
  { step: '03', title: 'multipart 送出', desc: 'text、三組等長的 ref_audio / ref_text / ref_speaker、取樣參數與 stream' },
  { step: '04', title: '後端驗證', desc: '角色編號 0–15、參考音檔 ≤ 60 秒、三組欄位等長、已載入模型，通過才存暫存檔' },
  { step: '05', title: '常駐執行緒推理', desc: '呼叫 model.generate(...)，內部一律逐段取，可把中止縮到約 0.3 秒' },
  { step: '06', title: '輸出', desc: '非串流累積片段編成 WAV；串流把每個片段轉 s16le PCM 即時寫出，兩者內容相同' },
  { step: '07', title: '清理', desc: '回應結束後刪除暫存檔' },
]

const syntax = [
  { type: '角色標籤', code: '<|speaker:N|>', example: '<|speaker:1|> 你來了。' },
  { type: '點狀標籤', code: '[tag]', example: '好吧，[sighs] 隨你。' },
  { type: '區間標籤', code: '<tag>…</tag>', example: '<whisper>別吵醒她</whisper>' },
  { type: '風格前綴', code: '[自然語言描述]', example: '[疲憊而溫柔] 我們明天再談。' },
  { type: '導演筆記', code: 'Direction: … / Line: …', example: 'Direction: 像在深夜廣播，語速慢' },
]

const interruptRates = [
  { scene: '一句塞 5 個表演標籤', rate: '4bit 3/3、8bit 2/3、bf16 3/3' },
  { scene: '無參考音檔的一般句子', rate: '8bit 3 次中 1 次' },
  { scene: '一般有參考音檔的句子', rate: '偶發' },
]

const variants = [
  { id: '4bit', disk: '22 GB', peak: '55 GB', load: '0.7 秒', rtf: '2.1x', note: '最快，標籤密集句最不穩' },
  { id: '8bit', disk: '39 GB', peak: '72 GB', load: '1.4 秒', rtf: '1.8x', note: '建議預設', recommended: true },
  { id: 'bf16', disk: '67 GB', peak: '103 GB', load: '8.6 秒', rtf: '1.3x', note: '128 GB 機器會到記憶體警告' },
]

const decisions = [
  {
    title: '自寫 FastAPI，不用 mlx-audio 內建 server',
    desc: '內建 /v1/audio/speech 只收一段參考音檔，且 ref_audio 必須是伺服器端路徑，無法上傳、無法多角色。',
  },
  {
    title: '只呼叫 mlx-audio 公開 API',
    desc: '只用 load_model 與 model.generate，不改第三方碼；上游更新時只需重跑 uv sync。',
  },
  {
    title: 'MLX 推理固定在一條常駐執行緒',
    desc: 'MLX 的 GPU stream 是每執行緒一份，換執行緒求值會拋 There is no Stream(gpu, 0)。所以用 max_workers=1 的執行緒池，不能用 asyncio.to_thread。',
  },
  {
    title: '忙碌時直接回 409，不排隊',
    desc: 'MLX 同一進程共用 GPU，一次只能做一件事。單人工具不需要佇列，排隊反而讓串流與狀態難以預期；前端在 busy 時禁用按鈕。',
  },
  {
    title: '每次產生結束清 MLX 快取',
    desc: 'MLX 保留緩衝快取，8bit 連續請求會從 40 GB 長到 76 GB 不回落；呼叫 mx.clear_cache() 換取穩定的記憶體用量。',
  },
  {
    title: '串流用 raw PCM，不用 WAV',
    desc: 'WAV header 需要總長度，串流時還不知道；改送 s16le 44.1 kHz mono，前端用 Web Audio 播放。',
  },
]

const commands = [
  { use: '後端環境（可重複執行）', cmd: 'bash server/setup.sh' },
  { use: '下載模型（擇一或全部）', cmd: 'bash models/download.sh 8bit' },
  { use: '啟動後端（:8793）', cmd: 'bash server/run-server.sh' },
  { use: '無模型時用模擬後端', cmd: 'MOCK=1 bash server/run-server.sh' },
  { use: '啟動前端（:5173）', cmd: 'cd frontend && npm install && npm run dev' },
]

const limitations = [
  '跑的不是 Fish Audio 官方推理：MLX 權重由社群（stickerdaniel）轉換，Fish Audio 未釋出也未背書。',
  'mlx-audio 對 Drama 3 的支援還沒進正式 release，本專案鎖在特定 commit，上游之後的變動不保證相容。',
  '中斷偵測抓不到「出聲之後才轉成低音量雜訊」的失敗，會拖到長度上限（約 47 秒）。',
  '麥克風錄音功能未在自動化測試中驗證（瀏覽器窗格無法授權麥克風）。',
  '同一段文字每次結果不同，沒有固定種子。',
  '載入秒數為檔案已在系統快取的熱載入，冷讀會更久。',
]

const notDoing = ['修改 take', '局部 infilling', '固定種子', '變速', '角色描述代替音檔']

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-[0.16em] mb-3" style={{ ...MONO, color: MUTED }}>
      {children}
    </p>
  )
}

export default function Drama3() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: PAPER, color: INK, fontFamily: '"Noto Sans TC", system-ui, sans-serif' }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600&family=Noto+Sans+TC:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
      />

      {/* 頂部導覽 */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md border-b"
        style={{ backgroundColor: `${PAPER}E6`, borderColor: LINE }}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-60 cursor-pointer group"
            style={{ color: MUTED }}
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
            返回首頁
          </Link>
          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-60 cursor-pointer"
          >
            <GithubIcon className="w-4 h-4" />
            在 GitHub 上查看
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 pt-16 pb-14 border-b" style={{ borderColor: LINE }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
          >
            <SectionLabel>AI / TTS / Local LLM Tooling</SectionLabel>
            <h1 className="text-4xl sm:text-6xl font-medium tracking-tight mb-5 leading-[1.05]" style={DISPLAY}>
              Drama 3 TTS 工作台
            </h1>
            <p className="text-lg sm:text-xl font-light max-w-3xl leading-relaxed mb-5" style={DISPLAY}>
              在 Apple Silicon Mac 上以圖形介面操作 Fish Audio Drama 3 文字轉語音模型：多角色、聲音複製、表演標籤、長文串流，全程本機、離線、不花錢。
            </p>
            <p className="text-sm max-w-3xl leading-relaxed" style={{ color: MUTED }}>
              Fish Audio 官方推理只支援 NVIDIA GPU，Mac 無法執行；社群雖有轉成 MLX 格式的權重，但 mlx-audio 內建 server 只收一段參考音檔、而且必須是伺服器端路徑。這個專案自寫一層 FastAPI，把多角色劇本、多段參考音檔上傳、表演標籤組字與串流播放做成一個本機工作台。
            </p>
          </motion.div>

          <img
            src="/projects/drama-3/workbench-light.jpg"
            alt="Drama 3 工作台亮色介面：左欄角色與參考音檔、中欄劇本行、右欄取樣參數與 take 卡紙"
            className="mt-10 w-full border hover:-translate-y-1 transition-transform duration-300"
            style={{ borderColor: LINE, boxShadow: '0 18px 40px -24px rgba(18,18,18,0.35)' }}
          />
          <p className="text-xs mt-3" style={{ ...MONO, color: MUTED }}>
            左欄建角色、中欄寫劇本、右欄按「產生」。截圖為接模擬後端時的畫面，真模型畫面相同，只是沒有頂端的橫幅。
          </p>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-6 py-12 border-b" style={{ borderColor: LINE }}>
        <div className="max-w-5xl mx-auto">
          <SectionLabel>Tech Stack</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {techStack.map((t) => (
              <span
                key={t}
                className="inline-flex items-center px-3 py-1.5 text-sm border"
                style={{ ...MONO, backgroundColor: CARD, borderColor: LINE }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 能做什麼 */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>Capabilities</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-medium mb-10" style={DISPLAY}>能做什麼</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, ease: 'easeOut' as const, delay: i * 0.04 }}
                className="border p-5 hover:-translate-y-1 transition-transform duration-200"
                style={{ backgroundColor: CARD, borderColor: LINE }}
              >
                <c.icon size={20} className="mb-4" strokeWidth={1.6} />
                <h3 className="font-medium mb-1.5" style={DISPLAY}>{c.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{c.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-xs mt-6" style={{ color: MUTED }}>
            不做的事（移植版沒有或需要改第三方碼）：{notDoing.join('、')}。
          </p>
        </div>
      </section>

      {/* 架構 */}
      <section className="px-6 py-16 border-y" style={{ backgroundColor: CARD, borderColor: LINE }}>
        <div className="max-w-5xl mx-auto">
          <SectionLabel>Architecture</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-medium mb-3" style={DISPLAY}>架構與一次產生的資料流</h2>
          <p className="text-sm mb-8" style={{ color: MUTED }}>
            後端是 mlx-audio 的薄封裝；<code style={MONO}>MOCK=1</code> 啟動可在沒有模型時開發前端，回傳測試音。
          </p>

          <div className="overflow-x-auto border mb-10" style={{ borderColor: LINE, backgroundColor: PAPER }}>
            <pre className="px-5 py-4 text-[13px] whitespace-pre" style={MONO}>
              瀏覽器 (Vite :5173) ──/api proxy──▶ FastAPI (:8793) ──▶ mlx-audio ──▶ MLX / Metal ──▶ models/
            </pre>
          </div>

          <div className="space-y-2.5">
            {dataFlow.map((d, i) => (
              <motion.div
                key={d.step}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="flex gap-4 items-start border px-5 py-4"
                style={{ borderColor: LINE, backgroundColor: PAPER }}
              >
                <span className="shrink-0 text-sm font-medium pt-0.5" style={MONO}>{d.step}</span>
                <div className="min-w-0">
                  <p className="font-medium text-sm mb-0.5">{d.title}</p>
                  <p className="text-sm leading-relaxed break-words" style={{ color: MUTED }}>{d.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 控制語法 */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>Control Syntax</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-medium mb-3" style={DISPLAY}>控制語法</h2>
          <p className="text-sm mb-8" style={{ color: MUTED }}>
            前端把劇本行組成文字，後端原樣送出；標籤是自由文字，模型靠語意理解，越常見越穩。
          </p>
          <div className="border overflow-hidden" style={{ borderColor: LINE, backgroundColor: CARD }}>
            {syntax.map((s, i) => (
              <div
                key={s.type}
                className={`flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-5 px-5 py-3.5 ${
                  i !== syntax.length - 1 ? 'border-b' : ''
                }`}
                style={{ borderColor: LINE }}
              >
                <span className="text-sm font-medium sm:w-24 shrink-0">{s.type}</span>
                <code className="text-[13px] sm:w-56 shrink-0 break-all" style={{ ...MONO, color: MUTED }}>
                  {s.code}
                </code>
                <code className="text-[13px] break-all" style={MONO}>{s.example}</code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 模型會中斷 */}
      <section className="px-6 py-16 border-y" style={{ backgroundColor: CARD, borderColor: LINE }}>
        <div className="max-w-5xl mx-auto">
          <SectionLabel>Known Model Behavior</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-medium mb-3" style={DISPLAY}>模型會中斷：偵測它，而不是假裝沒有</h2>
          <p className="text-sm mb-8 max-w-3xl leading-relaxed" style={{ color: MUTED }}>
            產生到一半會沒聲音，這是模型本身的行為，三個版本都會發生。中斷的樣子不是音訊變短，而是講幾秒後轉成靜音，一路拖到長度上限。
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
            <div className="lg:col-span-2 space-y-4">
              <div className="border" style={{ borderColor: LINE, backgroundColor: PAPER }}>
                <p className="px-5 pt-4 pb-2 text-[11px] uppercase tracking-[0.16em]" style={{ ...MONO, color: MUTED }}>
                  實測中斷率（2026-10-15）
                </p>
                {interruptRates.map((r) => (
                  <div key={r.scene} className="px-5 py-3 border-t" style={{ borderColor: LINE }}>
                    <p className="text-sm font-medium">{r.scene}</p>
                    <p className="text-[13px] mt-0.5" style={{ ...MONO, color: ALERT }}>{r.rate}</p>
                  </div>
                ))}
              </div>
              <div className="border p-5" style={{ borderColor: LINE, backgroundColor: PAPER }}>
                <div className="flex items-center gap-2 mb-2">
                  <OctagonAlert size={16} style={{ color: ALERT }} />
                  <p className="text-sm font-medium">後端的對策</p>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                  在取段迴圈偵測「出聲後連續 6 秒無聲」或「開頭 6 秒沒出聲」就主動停止，提示重新產生，通常重試一次就過。一行只放 1 到 2 個標籤、給參考音檔、句子短一點可降低中斷率。
                </p>
              </div>
            </div>
            <figure className="lg:col-span-3">
              <img
                src="/projects/drama-3/workbench-dark-early-stop.jpg"
                alt="Drama 3 工作台暗色介面，take 卡紙顯示「偵測到長時間無聲，已自動停止」的提示"
                className="w-full border hover:-translate-y-1 transition-transform duration-300"
                style={{ borderColor: LINE }}
              />
              <figcaption className="text-xs mt-3" style={{ ...MONO, color: MUTED }}>
                暗色模式：take 卡紙顯示「偵測到長時間無聲，已自動停止；若內容不完整請重新產生」
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 版本與硬體需求 */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <Cpu size={14} style={{ color: MUTED }} />
            <SectionLabel>Variants & Hardware</SectionLabel>
          </div>
          <h2 className="text-2xl sm:text-3xl font-medium mb-3" style={DISPLAY}>版本與硬體需求</h2>
          <p className="text-sm mb-8 max-w-3xl leading-relaxed" style={{ color: MUTED }}>
            實測機器：M5 Max、128 GB 統一記憶體。記憶體要看行程峰值而不是權重大小——產生中 MLX 快取會再多 28–30 GB。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {variants.map((v) => (
              <div
                key={v.id}
                className="border p-5"
                style={{
                  backgroundColor: v.recommended ? INK : CARD,
                  color: v.recommended ? PAPER : INK,
                  borderColor: v.recommended ? INK : LINE,
                }}
              >
                <div className="flex items-baseline justify-between mb-4">
                  <p className="text-2xl font-medium" style={DISPLAY}>{v.id}</p>
                  {v.recommended && (
                    <span className="text-[11px] uppercase tracking-[0.16em]" style={MONO}>建議預設</span>
                  )}
                </div>
                <dl className="grid grid-cols-2 gap-y-2 text-sm" style={MONO}>
                  <dt className="opacity-60">磁碟</dt>
                  <dd className="text-right">{v.disk}</dd>
                  <dt className="opacity-60">行程峰值</dt>
                  <dd className="text-right">{v.peak}</dd>
                  <dt className="opacity-60">載入（熱）</dt>
                  <dd className="text-right">{v.load}</dd>
                  <dt className="opacity-60">即時倍率</dt>
                  <dd className="text-right">{v.rtf}</dd>
                </dl>
                <p className="text-xs mt-4 pt-3 border-t opacity-70" style={{ borderColor: v.recommended ? '#ffffff30' : LINE }}>
                  {v.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 設計決策 */}
      <section className="px-6 py-16 border-y" style={{ backgroundColor: CARD, borderColor: LINE }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={14} style={{ color: MUTED }} />
            <SectionLabel>Design Decisions</SectionLabel>
          </div>
          <h2 className="text-2xl sm:text-3xl font-medium mb-10" style={DISPLAY}>關鍵設計決策</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {decisions.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, ease: 'easeOut' as const, delay: i * 0.04 }}
                className="border p-6"
                style={{ borderColor: LINE, backgroundColor: PAPER }}
              >
                <p className="text-[11px] mb-3" style={{ ...MONO, color: MUTED }}>
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="font-medium mb-2" style={DISPLAY}>{d.title}</h3>
                <p className="text-sm leading-relaxed break-words" style={{ color: MUTED }}>{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 快速開始 */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <Terminal size={14} style={{ color: MUTED }} />
            <SectionLabel>Quick Start</SectionLabel>
          </div>
          <h2 className="text-2xl sm:text-3xl font-medium mb-3" style={DISPLAY}>快速開始</h2>
          <p className="text-sm mb-8" style={{ color: MUTED }}>
            需要 Apple Silicon Mac、Homebrew、Node 20+；三個版本合計約 131 GB，可只下載其中一個。
          </p>
          <div className="border overflow-hidden" style={{ borderColor: LINE, backgroundColor: CARD }}>
            {commands.map((c, i) => (
              <div
                key={c.cmd}
                className={`flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-5 px-5 py-3.5 ${
                  i !== commands.length - 1 ? 'border-b' : ''
                }`}
                style={{ borderColor: LINE }}
              >
                <span className="text-sm sm:w-48 shrink-0" style={{ color: MUTED }}>{c.use}</span>
                <code className="text-[13px] break-all" style={MONO}>{c.cmd}</code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 已知限制 */}
      <section className="px-6 py-16 border-t" style={{ borderColor: LINE }}>
        <div className="max-w-5xl mx-auto">
          <div className="border p-6" style={{ borderColor: LINE, backgroundColor: CARD }}>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={18} style={{ color: MUTED }} />
              <h3 className="font-medium" style={DISPLAY}>已知限制 / 誠實揭露</h3>
            </div>
            <ul className="space-y-3">
              {limitations.map((l) => (
                <li key={l} className="flex gap-2 text-sm leading-relaxed" style={{ color: MUTED }}>
                  <span className="shrink-0">—</span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 授權與來源 */}
      <section className="px-6 pb-14">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Scale size={18} style={{ color: MUTED }} />
            <h3 className="font-medium" style={DISPLAY}>授權與來源</h3>
          </div>
          <p className="text-sm leading-relaxed mb-3" style={{ color: MUTED }}>
            本 repo 的程式碼以 <strong style={{ color: INK }}>MIT License</strong> 釋出；模型權重不在此授權範圍內，
            權重與輸出受{' '}
            <a
              href="https://huggingface.co/fishaudio/drama-3/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:opacity-60"
              style={{ color: INK }}
            >
              Fish Audio Community License
            </a>{' '}
            約束：禁止未經同意複製真人聲音、對外提供 TTS 服務需另簽授權、須標示 Built with Fish Audio。本專案定位為本機自用工具。
          </p>
          <p className="text-sm leading-relaxed mb-3" style={{ color: MUTED }}>
            模型原版來自 Fish Audio{' '}
            <a
              href="https://huggingface.co/fishaudio/drama-3"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:opacity-60"
              style={{ color: INK }}
            >
              fishaudio/drama-3
            </a>
            ；MLX 量化權重由 stickerdaniel 轉換；推理使用 Prince Canuma 的{' '}
            <a
              href="https://github.com/Blaizzy/mlx-audio"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:opacity-60"
              style={{ color: INK }}
            >
              mlx-audio
            </a>{' '}
            與 Apple 的{' '}
            <a
              href="https://github.com/ml-explore/mlx"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:opacity-60"
              style={{ color: INK }}
            >
              MLX
            </a>
            。本專案與 Fish Audio、Apple、mlx-audio 專案皆無隸屬關係。
          </p>
          <p className="text-xs uppercase tracking-[0.16em]" style={MONO}>Built with Fish Audio.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16" style={{ backgroundColor: INK, color: PAPER }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.16em] mb-3 opacity-70" style={MONO}>Open Source · MIT</p>
          <h2 className="text-2xl sm:text-3xl font-medium mb-3" style={DISPLAY}>想看更多細節？</h2>
          <p className="mb-8 leading-relaxed text-sm opacity-70">
            架構、模型能力範圍與控制語法、API 契約寫在 repo 的 spec/；開發過程的設計決策、踩雷紀錄與實測數據在 plan/。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium text-sm transition-opacity hover:opacity-80 cursor-pointer"
              style={{ backgroundColor: PAPER, color: INK }}
            >
              <GithubIcon className="w-4 h-4" />
              查看 GitHub Repo
            </a>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border font-medium text-sm transition-opacity hover:opacity-70 cursor-pointer"
              style={{ borderColor: '#ffffff40' }}
            >
              <ArrowLeft size={15} />
              返回首頁
            </Link>
          </div>
        </div>
      </section>

      <footer
        className="px-6 py-8 border-t text-center text-xs"
        style={{ ...MONO, borderColor: LINE, color: MUTED }}
      >
        © 2026 Rex · Drama 3 TTS 工作台
      </footer>
    </div>
  )
}

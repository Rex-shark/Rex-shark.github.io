import { Link } from 'react-router'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Bot,
  Mic,
  AudioLines,
  Smile,
  Eye,
  MousePointer2,
  PersonStanding,
  Users,
  Monitor,
  PanelBottomClose,
  Server,
  Wrench,
  Terminal,
  Scale,
  ArrowRight,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

const REPO = 'https://github.com/Rex-shark/vrm-chat-widget'
const TTS_FORK = 'https://github.com/Rex-shark/openai-edge-tts/tree/fixes'
const IMG = '/projects/vrm-chat-widget'
/** 截圖中的角色不是作者的，圖說都要註明 */
const MODEL_NOTE = '角色為 VRoid Project 的 AvatarSample_A'

/* 配色取自專案畫面：淡藍天空漸層、按鈕的奶油黃、送出鈕的粉紅、選中的藍 */
const C = {
  sky: '#e3edfc',
  skyLow: '#f4f7fc',
  card: '#ffffff',
  ink: '#1f2a44',
  muted: '#5b6782',
  line: '#d9e3f3',
  pink: '#d63d84',
  pinkSoft: '#fde7f1',
  blue: '#2f74c9',
  blueSoft: '#e4efff',
  butter: '#fdf1cf',
  butterInk: '#7a5a12',
}

const services: { icon: LucideIcon; name: string; tool: string; note: string; color: string }[] = [
  { icon: Bot, name: 'LLM 對話', tool: '本機 Ollama', note: '對話內容不經過雲端 AI 服務', color: C.blue },
  { icon: Mic, name: 'STT 語音輸入', tool: '本機 whisper.cpp', note: '錄音不會離開電腦', color: C.pink },
  { icon: AudioLines, name: 'TTS 語音回話', tool: 'openai-edge-tts（作者 fork）', note: '免費使用微軟 Edge 的朗讀聲音；要唸的回覆文字會送到微軟', color: C.butterInk },
]

const features: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Bot, title: 'AI 對話', desc: '透過 Ollama 呼叫本機 LLM。回覆開頭帶情緒標籤（例如 [happy]），角色依此換表情。' },
  { icon: AudioLines, title: '語音與對嘴', desc: '回覆用 TTS 唸出來，Web Audio AnalyserNode 即時取音量驅動嘴型；朗讀服務偶爾失敗時伺服器自動重試。' },
  { icon: Mic, title: '語音輸入', desc: '舞台版按 🎤 錄音，前端轉成 16kHz mono WAV 送到 whisper.cpp，文字填入輸入框讓你確認再送出。' },
  { icon: PersonStanding, title: '待機動作', desc: '呼吸、重心晃動、自動眨眼、偶爾瞟別處、手部小動作。' },
  { icon: Eye, title: '互動', desc: '視線跟著滑鼠；點角色的頭會害羞。' },
  { icon: MousePointer2, title: '動作播放', desc: '舞台版載入 Mixamo FBX 動作，即時重定向到 VRM 骨架。' },
  { icon: Users, title: '多角色', desc: '選單切換角色，選擇記在瀏覽器裡；新增角色只要加一筆設定。' },
]

const flow = [
  { path: 'POST /chat', target: 'Ollama', via: 'OpenAI 相容 API' },
  { path: 'POST /tts', target: 'openai-edge-tts', via: 'Rex-shark fork → 微軟 Edge 線上朗讀' },
  { path: 'POST /stt', target: 'whisper.cpp server', via: '本機辨識' },
]

const forkFixes = [
  { title: '鎖定 edge-tts 7.3.1，修好 403', ref: '上游 PR #62' },
  { title: 'SSE 串流修正', ref: '#64' },
  { title: 'PCM 低延遲串流', ref: '#63' },
]

const techStack = [
  { layer: '3D 顯示', tech: 'three.js 0.180.0、@pixiv/three-vrm 3.5.4（執行時從 CDN 載入）' },
  { layer: '動作', tech: 'Mixamo FBX → VRM 骨架重定向（pixiv/three-vrm 範例程式）' },
  { layer: '伺服器', tech: 'Node.js 18+，零相依 server.mjs（靜態檔＋同源代理）' },
  { layer: 'LLM', tech: 'Ollama（OpenAI 相容 API；模型可用 OLLAMA_MODEL 指定）' },
  { layer: 'TTS', tech: 'openai-edge-tts（Rex-shark fork，Docker）' },
  { layer: 'STT', tech: 'whisper.cpp server' },
  { layer: '前端音訊', tech: 'Web Audio AnalyserNode 對嘴、前端轉 16kHz mono WAV' },
]

const commands = [
  { use: '啟動（看得到角色與待機動作）', cmd: 'npm start' },
  { use: 'LLM：換成較小的模型', cmd: 'ollama pull gemma4:e4b && OLLAMA_MODEL=gemma4:e4b npm start' },
  { use: 'TTS：從 GitHub 直接建置 fork', cmd: 'docker build --build-arg INSTALL_FFMPEG=true -t openai-edge-tts-fork "https://github.com/Rex-shark/openai-edge-tts.git#fixes"' },
  { use: 'TTS：啟動', cmd: 'docker run -d -p 5050:5050 --restart unless-stopped openai-edge-tts-fork' },
  { use: 'STT（選用）', cmd: './build/bin/whisper-server -m models/ggml-large-v3-turbo.bin --port 8791' },
]

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45, ease: 'easeOut' as const },
}

function Eyebrow({ children, color = C.pink }: { children: string; color?: string }) {
  return (
    <p className="text-xs font-bold tracking-[0.16em] uppercase mb-3" style={{ color }}>
      {children}
    </p>
  )
}

function Shot({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="min-w-0">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full rounded-2xl border shadow-[0_10px_30px_-12px_rgba(47,116,201,0.35)]"
        style={{ borderColor: C.line }}
      />
      <figcaption className="text-xs mt-2.5 leading-relaxed" style={{ color: C.muted }}>
        {caption}
      </figcaption>
    </figure>
  )
}

export default function VrmChatWidget() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: C.skyLow, color: C.ink, fontFamily: '"Noto Sans TC", system-ui, sans-serif' }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&family=JetBrains+Mono:wght@400;500&display=swap"
      />

      {/* 頂部導覽 */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b" style={{ backgroundColor: 'rgba(244,247,252,0.85)', borderColor: C.line }}>
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium cursor-pointer group transition-colors hover:text-[#1f2a44]"
            style={{ color: C.muted }}
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
            返回首頁
          </Link>
          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium cursor-pointer transition-colors hover:text-[#1f2a44]"
            style={{ color: C.muted }}
          >
            <GithubIcon className="w-4 h-4" />
            在 GitHub 上查看
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 pt-14 pb-16" style={{ background: `linear-gradient(180deg, ${C.sky}, ${C.skyLow})` }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' as const }}>
            <Eyebrow>AI / 3D / Web</Eyebrow>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">VRM Chat Widget</h1>
            <p className="text-xl sm:text-2xl font-bold mb-5" style={{ color: C.blue }}>
              會聊天、會說話、有表情的 3D 虛擬角色
            </p>
            <p className="text-base max-w-3xl leading-relaxed mb-7" style={{ color: C.muted }}>
              在瀏覽器用 three-vrm 顯示 VRM 模型，串接本機 LLM、語音合成與語音辨識：她會用語音回你、嘴型跟著聲音動、依情緒換表情。全畫面的舞台版用來展示，泡泡版縮在網頁右下角，複製一個區塊就能嵌入任何頁面。
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: Bot, text: 'Ollama 本機對話', bg: C.blueSoft, fg: C.blue },
                { icon: AudioLines, text: '語音回話＋對嘴', bg: C.pinkSoft, fg: C.pink },
                { icon: Smile, text: '情緒標籤自動換表情', bg: C.butter, fg: C.butterInk },
              ].map((chip) => (
                <span
                  key={chip.text}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium"
                  style={{ backgroundColor: chip.bg, color: chip.fg }}
                >
                  <chip.icon size={14} />
                  {chip.text}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="mt-10">
            <Shot
              src={`${IMG}/stage.webp`}
              alt="舞台版：角色、表情與動作按鈕、對話泡泡與輸入列"
              caption={`舞台版：可切換角色、表情和動作，下方是聲音選單、🎤 語音輸入與送出（${MODEL_NOTE}，第三方模型需自行下載）`}
            />
          </div>
        </div>
      </section>

      {/* 三個服務 */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <Eyebrow color={C.blue}>Services</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">三個服務，兩個在本機</h2>
          <p className="text-sm mb-10 max-w-3xl leading-relaxed" style={{ color: C.muted }}>
            對話與語音辨識都跑在自己的電腦上；只有語音合成會連到微軟的線上朗讀服務。某個服務沒開時只有對應功能失效，角色照樣顯示與待機。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.map((s, i) => (
              <motion.div
                key={s.name}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                className="rounded-2xl border p-6"
                style={{ backgroundColor: C.card, borderColor: C.line }}
              >
                <s.icon size={22} style={{ color: s.color }} className="mb-3" />
                <h3 className="font-bold mb-1">{s.name}</h3>
                <p className="text-sm font-medium mb-2" style={{ color: s.color }}>
                  {s.tool}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
                  {s.note}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 兩種顯示模式 */}
      <section className="px-6 py-16 border-t" style={{ borderColor: C.line, backgroundColor: C.card }}>
        <div className="max-w-5xl mx-auto">
          <Eyebrow>Two modes</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-bold mb-10">舞台版與泡泡版</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Monitor,
                name: '舞台版',
                file: 'stage.html',
                desc: '全畫面展示，可切換角色、表情和動作，支援語音輸入。',
                src: 'stage',
                alt: '舞台版全畫面',
              },
              {
                icon: PanelBottomClose,
                name: '泡泡版',
                file: 'widget.html',
                desc: '縮在網頁右下角的虛擬助理。把 #widget 區塊連同樣式與 script 複製到你的頁面，就是一個角落助理。',
                src: 'widget',
                alt: '泡泡版嵌在示範網頁右下角',
              },
            ].map((m) => (
              <div key={m.name}>
                <div className="flex items-center gap-2 mb-2">
                  <m.icon size={18} style={{ color: C.blue }} />
                  <h3 className="font-bold">{m.name}</h3>
                  <code className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: C.blueSoft, color: C.blue, fontFamily: '"JetBrains Mono", monospace' }}>
                    {m.file}
                  </code>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: C.muted }}>
                  {m.desc}
                </p>
                <Shot src={`${IMG}/${m.src}.webp`} alt={m.alt} caption={MODEL_NOTE} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 功能 */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <Eyebrow color={C.blue}>Features</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-bold mb-10">她會做的事</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: (i % 3) * 0.06 }}
                className="rounded-2xl border p-5"
                style={{ backgroundColor: C.card, borderColor: C.line }}
              >
                <f.icon size={20} style={{ color: C.pink }} className="mb-3" />
                <h3 className="font-bold mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 表情與動作 */}
      <section className="px-6 py-16 border-t" style={{ borderColor: C.line, backgroundColor: C.card }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <Eyebrow>Expressions</Eyebrow>
            <h2 className="text-2xl font-bold mb-3">六種表情</h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: C.muted }}>
              可以用按鈕切換，AI 回覆時也會依情緒標籤自動換上，維持約 7 秒後淡回平常。
            </p>
            <Shot src={`${IMG}/expressions.webp`} alt="六種表情：平常、開心、生氣、難過、放鬆、驚訝" caption={`平常、開心、生氣、難過、放鬆、驚訝（${MODEL_NOTE}）`} />
          </div>
          <div>
            <Eyebrow color={C.blue}>Motions</Eyebrow>
            <h2 className="text-2xl font-bold mb-3">九個動作（舞台版）</h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: C.muted }}>
              Mixamo 動作一鍵播放，即時重定向到 VRM 骨架，播完自動淡回待機。動作檔依授權不能再散布，需要自行免費下載。
            </p>
            <Shot
              src={`${IMG}/motions.webp`}
              alt="九個動作：揮手、張望、搖頭、爭論、哭哭、醉醺醺、大爺站、施法、抓狂"
              caption={`揮手、張望、搖頭、爭論、哭哭、醉醺醺、大爺站、施法、抓狂；拍攝時鏡頭拉遠並隱藏介面（${MODEL_NOTE}）`}
            />
          </div>
        </div>
      </section>

      {/* 架構 */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <Eyebrow color={C.blue}>Architecture</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">一個零相依的 Node 伺服器做同源代理</h2>
          <p className="text-sm mb-10 max-w-3xl leading-relaxed" style={{ color: C.muted }}>
            server.mjs 供應 public/ 的靜態檔，並把三個 API 同源代理到本機服務，避開瀏覽器的 CORS 限制。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-[auto_auto_1fr] gap-4 items-center">
            <div className="rounded-2xl border p-5 text-center" style={{ backgroundColor: C.blueSoft, borderColor: C.line }}>
              <Monitor size={20} className="mx-auto mb-2" style={{ color: C.blue }} />
              <p className="font-bold text-sm">瀏覽器</p>
              <p className="text-xs mt-1" style={{ color: C.muted }}>
                stage.html／widget.html
              </p>
            </div>
            <div className="rounded-2xl border p-5 text-center" style={{ backgroundColor: C.card, borderColor: C.line }}>
              <Server size={20} className="mx-auto mb-2" style={{ color: C.pink }} />
              <p className="font-bold text-sm">server.mjs</p>
              <p className="text-xs mt-1" style={{ color: C.muted }}>
                靜態檔＋同源代理
              </p>
            </div>
            <ul className="space-y-2">
              {flow.map((f) => (
                <li
                  key={f.path}
                  className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border px-4 py-3 text-sm"
                  style={{ backgroundColor: C.card, borderColor: C.line }}
                >
                  <code className="font-medium" style={{ color: C.pink, fontFamily: '"JetBrains Mono", monospace' }}>
                    {f.path}
                  </code>
                  <ArrowRight size={14} style={{ color: C.muted }} />
                  <span className="font-bold">{f.target}</span>
                  <span className="text-xs" style={{ color: C.muted }}>
                    {f.via}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* TTS fork */}
      <section className="px-6 py-16 border-t" style={{ borderColor: C.line, backgroundColor: C.card }}>
        <div className="max-w-5xl mx-auto">
          <Eyebrow>TTS fork</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">自己 fork 修好語音合成</h2>
          <p className="text-sm mb-8 max-w-3xl leading-relaxed" style={{ color: C.muted }}>
            官方 openai-edge-tts 映像裡的 edge-tts 版本太舊，會被微軟朗讀服務拒絕（WebSocket 403），TTS 一律回 500。作者的{' '}
            <a href={TTS_FORK} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 cursor-pointer" style={{ color: C.blue }}>
              Rex-shark/openai-edge-tts（fixes 分支）
            </a>{' '}
            合併了上游尚未收下的三個修正，Docker 可以直接從 GitHub 建置。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {forkFixes.map((f) => (
              <div key={f.title} className="rounded-2xl border p-5" style={{ backgroundColor: C.butter, borderColor: '#f3e2a8' }}>
                <Wrench size={18} style={{ color: C.butterInk }} className="mb-2" />
                <p className="font-bold text-sm">{f.title}</p>
                <p className="text-xs mt-1" style={{ color: C.butterInk }}>
                  {f.ref}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 技術棧 */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <Eyebrow color={C.blue}>Stack</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">技術棧</h2>
          <dl className="rounded-2xl border overflow-hidden" style={{ backgroundColor: C.card, borderColor: C.line }}>
            {techStack.map((t, i) => (
              <div
                key={t.layer}
                className="grid grid-cols-[5.5rem_1fr] sm:grid-cols-[7rem_1fr] gap-4 px-5 py-3 text-sm"
                style={{ borderTop: i ? `1px solid ${C.line}` : undefined }}
              >
                <dt className="font-bold" style={{ color: C.blue }}>
                  {t.layer}
                </dt>
                <dd className="leading-relaxed">{t.tech}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 快速開始 */}
      <section className="px-6 py-16 border-t" style={{ borderColor: C.line, backgroundColor: C.card }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <Terminal size={14} style={{ color: C.pink }} />
            <Eyebrow>Quick start</Eyebrow>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">快速開始</h2>
          <p className="text-sm mb-8" style={{ color: C.muted }}>
            需要 Node.js 18 以上；只執行第一步就能看到角色和待機動作，要對話與語音再啟動後面的服務。
          </p>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: C.line }}>
            {commands.map((c, i) => (
              <div
                key={c.cmd}
                className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-5 px-5 py-3.5"
                style={{ borderTop: i ? `1px solid ${C.line}` : undefined, backgroundColor: C.skyLow }}
              >
                <span className="text-sm sm:w-56 shrink-0" style={{ color: C.muted }}>
                  {c.use}
                </span>
                <code className="text-[13px] break-all" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                  {c.cmd}
                </code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 角色與授權 */}
      <section className="px-6 py-14">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Scale size={18} style={{ color: C.muted }} />
            <h3 className="font-bold">角色與授權</h3>
          </div>
          <ul className="space-y-2 text-sm leading-relaxed" style={{ color: C.muted }}>
            <li>程式碼以 MIT 授權釋出，© 2026 Rex。</li>
            <li>repo 內附作者自製的 Lumi 系列四個角色（VRM Public License 1.0：可商用、可改作與再散布，需署名）。</li>
            <li>另支援四個 VRoid Hub 上的第三方角色（含截圖中的 AvatarSample），授權屬原作者，不隨 repo 散布，需自行下載；Mixamo 動作同樣需自行下載。</li>
            <li>openai-edge-tts 使用 Microsoft Edge 的線上朗讀服務，並非官方開放的 API，可能隨時失效；商用可改接 Azure AI Speech 等正式服務。</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 border-t" style={{ borderColor: C.line, background: `linear-gradient(180deg, ${C.skyLow}, ${C.sky})` }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">想自己養一個？</h2>
          <p className="mb-8 leading-relaxed text-sm" style={{ color: C.muted }}>
            原始碼、角色設定與環境變數說明都在 GitHub repo；新增角色只要在 avatar-modules.js 加一筆設定。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white transition-opacity hover:opacity-90 cursor-pointer"
              style={{ backgroundColor: C.pink }}
            >
              <GithubIcon className="w-4 h-4" />
              查看 GitHub Repo
            </a>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border font-semibold text-sm transition-colors cursor-pointer hover:bg-white"
              style={{ borderColor: C.line }}
            >
              <ArrowLeft size={15} />
              返回首頁
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-6 py-6 text-center text-xs" style={{ color: C.muted }}>
        © 2026 Rex · VRM Chat Widget
      </footer>
    </div>
  )
}

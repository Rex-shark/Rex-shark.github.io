import { Link } from 'react-router'
import { motion, MotionConfig } from 'framer-motion'
import {
  ArrowLeft,
  Lock,
  AtSign,
  Cat,
  Bot,
  FileText,
  Mic,
  Users,
  Settings2,
  MessagesSquare,
  Radio,
  Unlock,
  ShieldCheck,
  FlaskConical,
  ListChecks,
  ScrollText,
  ExternalLink,
  GitCompare,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

const IMG = '/projects/codex-forge'

/* 配色沿用 codex-forge 前台 forge-web 的 DESIGN.md（紙偶定格・日景） */
const C = {
  desk: '#c9925a',
  deskDark: '#9c6a3c',
  board: '#fbefd9',
  card: '#fff7e8',
  muted: '#f1e2c6',
  self: '#9c3f1d',
  selfFg: '#fff7e8',
  mustard: '#e8b04b',
  codexPaper: '#f7f4ec',
  codex: '#6d4f93',
  codexDeep: '#5d4280',
  codexFg: '#4a3360',
  fg: '#4a2c18',
  soft: '#6f4a30',
  link: '#963b1a',
  border: '#e2cba4',
  borderStrong: '#cfb286',
}
const MONO = { fontFamily: '"JetBrains Mono", ui-monospace, monospace' }

/* 痛點 */
const pains = [
  { title: '需求散落各處', desc: '散在通訊軟體、信件和會議紀錄裡。每次問 AI 都得重新整理脈絡、貼一大段，還常漏掉附件。' },
  { title: '關係人不會用 AI 工具', desc: '也不該要他們學。但他們的原話、畫的草圖、給的舊表單，才是最重要的輸入。' },
  { title: 'AI 的回覆要回到討論裡', desc: '讓承辦看得到「技術上可以這樣做」，而不是只留在某個人的終端機裡。' },
]

/* 典型流程，用三種紙重現 */
type Who = 'other' | 'self' | 'lumi' | 'cat'
const script: { who: Who; name: string; text: string }[] = [
  { who: 'other', name: '承辦', text: '（上傳舊表單的照片）現在要跑三層簽核。' },
  { who: 'other', name: 'PM', text: '線上化之後要不要支援代理人？' },
  { who: 'self', name: '擁有者', text: '@小助手Lumi 請整理大家的討論，畫出簽核流程，做一個表單原型' },
  { who: 'lumi', name: '小助手Lumi', text: 'Mermaid 流程圖＋待釐清的問題＋一個可以點的 HTML 原型' },
  { who: 'other', name: '承辦', text: '（點開原型）對，退件要回到申請人，不是回到上一關。' },
  { who: 'cat', name: '擁有者 → 小助手喵喵', text: '幫我整理成三點，下次開會用。→ 看完按「開放」，全房都看得到' },
]

const lumiInput = [
  '討論紀錄：上次成功諮詢之後累積的全部訊息加上這一則，含發言者的職稱與時間',
  '文件庫索引，以及這次附帶的文件與圖片；Word、PDF、Excel 先由 Apache Tika 抽成文字，圖片直接進 prompt',
  '三層組成的 AGENTS.md：平台憲法 → 擁有者補充的房間角色 → 系統產生的說明',
  '每間房一條 Codex 脈絡，預設續接（exec resume）；續接失敗自動改開新脈絡重跑，擁有者也可手動重置記憶',
]
const lumiOutput = [
  '回覆以 Markdown 渲染，含 Mermaid 與程式碼；頂部摘要列寫明「根據幾則討論」和用到哪些檔案',
  '產出的圖片直接顯示；.html 在聊天室裡用 sandbox iframe 預覽；其他產出變成檔案卡',
  '進度即時推播：排隊中 → 準備中 → 處理中 → 完成或失敗，擁有者可取消、重新送出',
  '連結 git 專案：Lumi 直接讀寫程式碼，系統前後各拍一次快照，算出「修改了 N 個檔案（+A −B）」並可一鍵還原；系統不 commit',
]

const mentionFlow = [
  { title: '送出訊息', desc: '擁有者送出含 @小助手Lumi 的訊息；訊息照常落庫，全員即時看到。' },
  { title: '交易提交後建立諮詢', desc: '偵測到擁有者的 @，建立一筆諮詢，狀態「排隊中」。' },
  { title: 'Worker 領取時才組 prompt', desc: '每房一次一筆：算範圍 → 鏡射檔案 → 重寫 AGENTS.md → 組 prompt 並落庫。' },
  { title: 'Codex 子程序', desc: 'exec --json（新脈絡）或 exec resume（續接）；JSONL 事件逐筆落庫，推播「處理中」。' },
  { title: '落地與推播', desc: '小助手的訊息、產出進檔案庫、脈絡回合 +1，推播給全房。' },
]

const catPoints = [
  '每間房右下角一隻 Live2D 貓：日景黑貓、夜景白貓。背後是 claude -p --output-format stream-json，回答逐字串流。',
  '只有主持人能提問。其他成員看得到貓、看得到牠忙不忙，但拿不到提問內容、工具呼叫和錯誤訊息。',
  '回答先給主持人看，按「開放」才給全房，標示「主持人交辦」，之後也可以收回。',
  '開放的回答會進入 Lumi 的討論紀錄，兩位 AI 互相知道對方。',
]

const features: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: MessagesSquare, title: '聊天室', desc: '回覆、軟刪除、未讀數、斷線補齊；STOMP over WebSocket 推播，重連後自動重新訂閱並補齊缺口。' },
  { icon: FileText, title: '附件不限類型與大小', desc: '圖片進圖片區、其他進文件區；文件可直接看文字版，iPhone 的 HEIC 在前端轉 JPEG。每個檔案都能標記要不要提供給小助手。' },
  { icon: Mic, title: '語音輸入', desc: '本機 whisper.cpp 把語音轉成文字填進輸入框，不會自動送出；錄音不留存。' },
  { icon: Users, title: '不開放註冊', desc: '帳號由管理員建立，成員由擁有者從既有帳號加入，並設定房內的顯示名稱與職稱；職稱會一起寫進送給 AI 的討論紀錄。' },
  { icon: Settings2, title: '擁有者的房間管理', desc: '改名稱與說明、開關小助手、補充小助手在這間房的角色（寫進 AGENTS.md）、重置記憶、封存房間。' },
  { icon: ShieldCheck, title: '後台看不到內容', desc: '蘋果風格後台，完整 RBAC；管理所有房間與諮詢紀錄，但只看得到 metadata。Codex CLI 搬家或被登出時前後台都會主動提示。' },
]

const principles = [
  { icon: Radio, title: '寫入走 REST，推播走 WebSocket', desc: '用戶端送進 WebSocket 的東西一律丟掉，否則 SimpleBroker 會把偽造的「小助手回覆」原樣廣播出去。斷線重連時再打一次 after= 就能補齊。' },
  { icon: Unlock, title: '系統不限制 AI', desc: '不擋工具、不設逾時、不限輸出；系統只做兩件事：整理輸入、接回輸出。安全邊界是「這台機器」與「擁有者邀請的成員」。' },
  { icon: Lock, title: '內容與 metadata 嚴格分開', desc: '訊息原文、提問、prompt 快照、貓還沒開放的回答都算內容，只給房間成員看；後台、操作日誌和跨房稽核只拿 metadata。' },
]

const practices: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: ScrollText, title: '規格驅動', desc: '聊天室、檔案、Codex 橋接、喵喵、後端標準各有規範，加上四份 Mermaid ERD；每個 Epic 記錄設計決策與踩雷，產品決策附日期與理由。' },
  { icon: Bot, title: '多個 AI session 分工', desc: '一個 session 負責規格，一個負責派工與驗收；實作交給後端、前端子代理，另有只驗不改的 UI 驗收子代理：開真的瀏覽器量 computed style、模擬真人動線、故意製造失敗，不採信自我回報。' },
  { icon: FlaskConical, title: '測試', desc: '整合測試以 Testcontainers 起真的 PostgreSQL 與 Redis；用假 CLI 腳本重現續接失敗、被殺、缺少 init 事件等序列。修 bug 做突變驗證：把修正改回去，確認測試真的會失敗。' },
  { icon: ListChecks, title: '全量 code review', desc: '分四段審過後端、安全、前台、後台，找到 18 條、已修 13 條：殘留的執行中狀態卡死佇列、改密碼後舊 token 仍有效、零寬字元冒充小助手、重連補齊漏訊息等。' },
]

const stats = [
  { value: '719', label: '後端測試', note: '83 個測試檔、約 26,000 行' },
  { value: '38k', label: '後端 Java', note: '291 個檔、約 38,000 行' },
  { value: '72', label: 'REST 端點', note: '17 個 Controller' },
  { value: '23', label: '資料表', note: 'RBAC 9・聊天室 4・Codex 6・喵喵 4' },
  { value: '25k', label: '前後台 TS／TSX', note: 'forge-web 約 17,000 行・forge-admin 約 8,000 行' },
  { value: '16', label: 'Epic', note: '規格與計畫約 7,800 行' },
]

const techStack = [
  { layer: '後端', items: 'Spring Boot 4.1・Java 25（virtual thread）・Spring Security 7・Hibernate 7・Jackson 3' },
  { layer: '資料', items: 'PostgreSQL 16（訊息以 id 游標分頁）・Redis（只放 token 黑名單與登入鎖定）' },
  { layer: '即時', items: 'STOMP over WebSocket（SimpleBroker）：CONNECT 帶 JWT，SUBSCRIBE 時檢查成員資格' },
  { layer: '檔案', items: 'Apache Tika 抽字・縮圖・HEIC 前端轉檔；HTML 預覽用只開 allow-scripts 的 sandbox iframe' },
  { layer: 'AI', items: 'Codex CLI（exec --json／exec resume）・Claude Code CLI（-p --output-format stream-json）：都以子程序執行，參數用陣列傳、不經 shell' },
  { layer: '前台', items: 'React 19・TypeScript・Vite・Tailwind CSS v4・shadcn/ui・Zustand・react-markdown + Mermaid・pixi-live2d-display' },
  { layer: '後台', items: 'React 19・TypeScript・Tailwind CSS v4・shadcn/ui（蘋果風格）' },
  { layer: '語音', items: 'whisper.cpp 本機 HTTP 伺服器' },
  { layer: '測試', items: 'JUnit・Testcontainers（真的 PostgreSQL、Redis、Tomcat）・模擬 CLI 事件序列的假 CLI 腳本' },
]

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45, ease: 'easeOut' as const },
}

function Shot({
  src,
  alt,
  caption,
  crop,
}: {
  src: string
  alt: string
  caption?: string
  /** 長圖只顯示上半部，另附原圖連結 */
  crop?: boolean
}) {
  return (
    <figure className="min-w-0">
      <div
        className="rounded-md overflow-hidden border-4 shadow-[0_6px_0_rgba(74,44,24,0.18)]"
        style={{ borderColor: C.card, backgroundColor: C.card }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={crop ? 'w-full aspect-[4/5] object-cover object-top' : 'w-full'}
        />
      </div>
      {(caption || crop) && (
        <figcaption className="text-xs mt-2.5 leading-relaxed" style={{ color: C.soft }}>
          {caption}
          {crop && (
            <>
              {' '}
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 underline underline-offset-2 cursor-pointer"
                style={{ color: C.link }}
              >
                看完整長圖
                <ExternalLink size={11} />
              </a>
            </>
          )}
        </figcaption>
      )}
    </figure>
  )
}

/* 標籤機貼紙風格的小標 */
function Eyebrow({ children }: { children: string }) {
  return (
    <p
      className="inline-block text-[11px] font-medium tracking-[0.14em] uppercase mb-3 px-2 py-0.5 rounded-sm"
      style={{ ...MONO, backgroundColor: C.fg, color: C.board }}
    >
      {children}
    </p>
  )
}

function SectionTitle({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div className="mb-10">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: C.fg }}>
        {title}
      </h2>
      {desc && (
        <p className="text-sm max-w-3xl leading-relaxed" style={{ color: C.soft }}>
          {desc}
        </p>
      )}
    </div>
  )
}

/* 一張紙：便條、卡片 */
function Paper({ children, className = '', tone = C.card }: { children: ReactNode; className?: string; tone?: string }) {
  return (
    <div
      className={`rounded-md border shadow-[0_3px_0_rgba(74,44,24,0.12)] ${className}`}
      style={{ backgroundColor: tone, borderColor: C.border }}
    >
      {children}
    </div>
  )
}

function ScriptLine({ who, name, text }: { who: Who; name: string; text: string }) {
  const self = who === 'self'
  const style =
    who === 'self'
      ? { backgroundColor: C.self, color: C.selfFg, borderColor: C.self }
      : who === 'lumi'
        ? { backgroundColor: C.codexPaper, color: C.codexFg, borderColor: C.border, borderLeft: `4px solid ${C.codex}` }
        : who === 'cat'
          ? { backgroundColor: C.muted, color: C.fg, borderColor: C.borderStrong, borderStyle: 'dashed' }
          : { backgroundColor: C.card, color: C.fg, borderColor: C.border }
  const tag =
    who === 'lumi'
      ? { backgroundColor: C.codex, color: '#ffffff' }
      : who === 'cat'
        ? { backgroundColor: C.fg, color: C.board }
        : { backgroundColor: C.mustard, color: C.fg }
  return (
    <li className={`flex ${self ? 'justify-end' : 'justify-start'}`}>
      <div className="max-w-[88%] sm:max-w-[75%]">
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-medium px-1.5 py-0.5 rounded-sm mb-1 ${self ? 'float-right' : ''}`}
          style={tag}
        >
          {who === 'lumi' && <Bot size={11} />}
          {who === 'cat' && <Cat size={11} />}
          {name}
        </span>
        <div className="clear-both rounded-md border px-4 py-2.5 text-sm leading-relaxed shadow-[0_2px_0_rgba(74,44,24,0.12)]" style={style}>
          {text}
        </div>
      </div>
    </li>
  )
}

export default function CodexForge() {
  return (
    <MotionConfig reducedMotion="user">
      <div
        className="min-h-screen"
        style={{ backgroundColor: C.board, color: C.fg, fontFamily: '"Noto Sans TC", system-ui, sans-serif' }}
      >
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&family=JetBrains+Mono:wght@400;500&display=swap"
        />

        {/* 頂部導覽：赤陶紅頂欄 */}
        <header className="sticky top-0 z-50 shadow-[0_3px_0_rgba(74,44,24,0.2)]" style={{ backgroundColor: C.self }}>
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium cursor-pointer group hover:opacity-80 transition-opacity"
              style={{ color: C.selfFg }}
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
              返回首頁
            </Link>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-sm"
              style={{ backgroundColor: C.mustard, color: C.fg }}
            >
              <Lock size={13} />
              私人專案・原始碼不公開
            </span>
          </div>
        </header>

        {/* Hero：牛皮紙桌面上的看板 */}
        <section className="px-4 sm:px-6 pt-10 pb-14" style={{ backgroundColor: C.desk }}>
          <div className="max-w-5xl mx-auto">
            <Paper tone={C.board} className="px-6 sm:px-10 pt-10 pb-8">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' as const }}
              >
                <Eyebrow>AI Integration / Full-Stack / Realtime</Eyebrow>
                <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3" style={{ color: C.fg }}>
                  codex-forge
                </h1>
                <p className="text-xl sm:text-2xl font-bold mb-5" style={{ color: C.link }}>
                  把 AI 技術顧問接進需求討論群聊
                </p>
                <p className="text-base max-w-3xl leading-relaxed mb-4">
                  非技術背景的關係人在聊天室裡用白話討論需求、上傳舊表單和草圖。專案擁有者打一個
                  <code className="mx-1 px-1.5 py-0.5 rounded-sm text-sm" style={{ ...MONO, backgroundColor: C.muted }}>
                    @小助手Lumi
                  </code>
                  ，後端就把累積的討論、文件和圖片整理成一份諮詢單，交給 <strong>OpenAI Codex CLI</strong>；回覆回到同一條時間軸，所有成員都看得到。
                </p>
                <p className="text-sm max-w-3xl leading-relaxed mb-7" style={{ color: C.soft }}>
                  它不是「AI 聊天介面」，而是把 AI 放進既有的協作流程：討論和諮詢在同一個地方、同一條時間軸，留下同一份紀錄。擁有者另有一位由 <strong>Claude Code CLI</strong> 驅動的私人助手「小助手喵喵」。
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { icon: AtSign, text: 'Codex CLI 當技術顧問', bg: C.codex, fg: '#ffffff' },
                    { icon: Cat, text: 'Claude Code 驅動的 Live2D 貓', bg: C.fg, fg: C.board },
                    { icon: GitCompare, text: '連結 git 專案、一鍵還原', bg: C.mustard, fg: C.fg },
                  ].map((chip) => (
                    <span
                      key={chip.text}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-sm font-medium shadow-[0_2px_0_rgba(74,44,24,0.18)]"
                      style={{ backgroundColor: chip.bg, color: chip.fg }}
                    >
                      <chip.icon size={14} />
                      {chip.text}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Paper>

            <div className="mt-8">
              <Shot
                src={`${IMG}/web-room-day.webp`}
                alt="前台房間頁日景：三種紙分辨發言者，右側是檔案面板，右下角是 Live2D 黑貓"
                caption="前台房間頁・日景：他人是米白便條、自己是赤陶紅紙條、小助手是影印紙配紫墨。截圖都是真實畫面，討論內容是虛構的示範資料，Lumi 和喵喵的回覆與產出則是真的呼叫結果。"
              />
            </div>
          </div>
        </section>

        {/* 為什麼做 */}
        <section className="px-6 py-16">
          <div className="max-w-5xl mx-auto">
            <SectionTitle
              eyebrow="Why"
              title="AI 從聊天室讀、往聊天室寫"
              desc="PM／SA 的日常，是跟承辦、主管、外部 PM 一起把需求談清楚，再自己設計與實作。系統只負責把輸入整理好、把輸出接回來，不限制 AI 能做什麼。"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {pains.map((p, i) => (
                <motion.div key={p.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.06 }}>
                  <Paper className="p-5 h-full">
                    <p className="text-xs font-medium mb-2" style={{ ...MONO, color: C.link }}>
                      痛點 0{i + 1}
                    </p>
                    <h3 className="font-bold mb-2">{p.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: C.soft }}>
                      {p.desc}
                    </p>
                  </Paper>
                </motion.div>
              ))}
            </div>

            <Paper tone={C.muted} className="p-5 sm:p-7">
              <p className="text-sm font-bold mb-5">典型的一段討論</p>
              <ol className="space-y-3">
                {script.map((s, i) => (
                  <ScriptLine key={i} {...s} />
                ))}
              </ol>
            </Paper>
          </div>
        </section>

        {/* 小助手Lumi */}
        <section className="px-6 py-16 border-t" style={{ backgroundColor: C.codexPaper, borderColor: C.border }}>
          <div className="max-w-5xl mx-auto">
            <SectionTitle
              eyebrow="AI 1 · Codex CLI"
              title="@小助手Lumi：群聊裡的技術顧問"
              desc="只有房間擁有者的 @ 會觸發，沒有按鈕、也不會自動觸發；成員打同樣的字只是一般文字。擁有者輸入 @ 時，清單裡會多出小助手。"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              {[
                { title: '輸入怎麼整理', items: lumiInput },
                { title: '輸出怎麼接回', items: lumiOutput },
              ].map((col) => (
                <Paper key={col.title} tone="#ffffff" className="p-6">
                  <h3 className="font-bold mb-4 pl-3 border-l-4" style={{ color: C.codexDeep, borderColor: C.codex }}>
                    {col.title}
                  </h3>
                  <ul className="space-y-3">
                    {col.items.map((t) => (
                      <li key={t} className="flex gap-2 text-sm leading-relaxed" style={{ color: C.codexFg }}>
                        <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-[1px]" style={{ backgroundColor: C.mustard }} />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </Paper>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <Shot
                src={`${IMG}/web-lumi-reply.webp`}
                alt="小助手Lumi 的回覆：根據 14 則討論的摘要列、Mermaid 簽核流程圖與 HTML 原型連結"
                caption="小助手Lumi 的回覆：「根據 14 則討論」摘要列與來源檔案、Mermaid 流程圖、HTML 原型連結。"
                crop
              />
              <div className="space-y-6">
                <Shot
                  src={`${IMG}/web-mention.webp`}
                  alt="擁有者輸入 @ 時的提及清單"
                  caption="擁有者輸入 @ 時，提及清單裡多出小助手。"
                />
                <Shot
                  src={`${IMG}/web-lumi-html-preview.webp`}
                  alt="AI 產出的簽核表單 HTML 原型在聊天室內預覽"
                  caption="AI 產出的 HTML 原型，直接在聊天室的 sandbox iframe 裡點著試。"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 一次 @ 的流程 */}
        <section className="px-6 py-16 border-t" style={{ borderColor: C.border }}>
          <div className="max-w-5xl mx-auto">
            <SectionTitle
              eyebrow="Sequence"
              title="一次 @小助手Lumi 的流程"
              desc="prompt 在 Worker 領取時才組，而不是建立時：排隊中的諮詢，範圍取決於前一筆有沒有成功。"
            />
            <ol className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {mentionFlow.map((s, i) => (
                <motion.li key={s.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.06 }}>
                  <Paper className="p-4 h-full">
                    <span
                      className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold mb-3"
                      style={{ ...MONO, backgroundColor: C.mustard, color: C.fg }}
                    >
                      {i + 1}
                    </span>
                    <h3 className="font-bold text-sm mb-1.5">{s.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: C.soft }}>
                      {s.desc}
                    </p>
                  </Paper>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* 小助手喵喵 */}
        <section className="px-6 py-16 border-t" style={{ backgroundColor: C.muted, borderColor: C.border }}>
          <div className="max-w-5xl mx-auto">
            <SectionTitle
              eyebrow="AI 2 · Claude Code CLI"
              title="小助手喵喵：擁有者的私人 Live2D 貓"
              desc="先私下問、看完再決定要不要給全房看。"
            />
            <Paper className="p-6 mb-8">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                {catPoints.map((t) => (
                  <li key={t} className="flex gap-2 text-sm leading-relaxed">
                    <Cat size={15} className="shrink-0 mt-0.5" style={{ color: C.link }} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </Paper>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Shot src={`${IMG}/web-cat-host.webp`} alt="主持人視角：貓的對話框與已開放給全房的回答" caption="主持人視角：私下提問，回答標示「已開放給全房」。" />
              <Shot src={`${IMG}/web-cat-member.webp`} alt="成員視角：開放後的回答標示主持人交辦" caption="成員視角：只看得到開放後的回答，標示「主持人交辦」。" />
            </div>
          </div>
        </section>

        {/* 其他功能 */}
        <section className="px-6 py-16 border-t" style={{ borderColor: C.border }}>
          <div className="max-w-5xl mx-auto">
            <SectionTitle eyebrow="Features" title="討論本身也要好用" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {features.map((f, i) => (
                <motion.div key={f.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: (i % 3) * 0.06 }}>
                  <Paper className="p-5 h-full">
                    <f.icon size={20} className="mb-3" style={{ color: C.link }} />
                    <h3 className="font-bold mb-2">{f.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: C.soft }}>
                      {f.desc}
                    </p>
                  </Paper>
                </motion.div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Shot src={`${IMG}/web-conversation.webp`} alt="討論的開頭：承辦說明現況並附上文件" caption="討論的開頭：承辦說明現況並附上文件。" />
              <Shot src={`${IMG}/web-doc-preview.webp`} alt="文件的文字版預覽" caption="文件的文字版預覽：AI 讀的就是這份文字。" />
              <Shot src={`${IMG}/web-room-settings.webp`} alt="房間設定：小助手開關、角色補充、重置記憶" caption="房間設定：開關小助手、補充角色、重置記憶。" />
            </div>
          </div>
        </section>

        {/* 紙偶定格 */}
        <section className="px-6 py-16" style={{ backgroundColor: C.deskDark }}>
          <div className="max-w-5xl mx-auto">
            <Paper tone={C.board} className="p-6 sm:p-8 mb-8">
              <Eyebrow>Visual</Eyebrow>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">前台視覺：紙偶定格</h2>
              <p className="text-sm max-w-3xl leading-relaxed" style={{ color: C.soft }}>
                整個畫面是一個劇場箱，每個面都是有厚度與紙紋的紙，動畫用 steps() 逐格播放；日景、夜景對應淺色與深色，夜景的貓換成白貓。文字對比是疊上紙紋之後量的，全部 ≥ 4.5:1；尊重 prefers-reduced-motion，375 px 寬的手機可以正常使用；只有圖示的按鈕一律有中文懸停提示。
              </p>
              <p className="text-xs mt-3" style={{ color: C.soft }}>
                這一頁的配色就取自它的設計規範：牛皮紙桌面、看板米色、赤陶紅、芥末黃、小助手的紫墨。
              </p>
            </Paper>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-start">
              <Shot src={`${IMG}/web-room-night.webp`} alt="夜景：深色的紙與白貓" />
              <div className="mx-auto w-48 md:w-52">
                <Shot src={`${IMG}/web-mobile.webp`} alt="375 寬手機版" />
              </div>
            </div>
          </div>
        </section>

        {/* 後台 */}
        <section className="px-6 py-16" style={{ backgroundColor: '#f5f5f7', color: '#1d1d1f' }}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-10">
              <p className="text-xs font-semibold tracking-[0.14em] uppercase mb-3" style={{ color: '#0066cc' }}>
                Admin
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">後台 forge-admin</h2>
              <p className="text-sm max-w-3xl leading-relaxed" style={{ color: '#6e6e73' }}>
                蘋果風格的管理後台：玻璃效果只用在側邊欄與頂欄，資料區一律實心，支援深色模式。完整 RBAC（帳號、角色、目錄／選單／按鈕三層權限樹、群組、操作日誌）。管理員不是房間成員就看不到討論，想看得先被加進成員。
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { src: 'admin-rooms', alt: '後台：專案聊天室列表', caption: '專案聊天室列表' },
                { src: 'admin-rooms-dark', alt: '後台：深色模式', caption: '深色模式' },
                { src: 'admin-consultations', alt: '後台：諮詢紀錄，只有狀態、用量等 metadata', caption: '諮詢紀錄：只有狀態、範圍則數、用量、CLI 版本等 metadata，看不到討論原文' },
                { src: 'admin-permissions', alt: '後台：權限樹', caption: '權限樹：目錄／選單／按鈕三層' },
              ].map((s) => (
                <figure key={s.src} className="min-w-0">
                  <img
                    src={`${IMG}/${s.src}.webp`}
                    alt={s.alt}
                    loading="lazy"
                    className="w-full rounded-xl border shadow-sm"
                    style={{ borderColor: '#d2d2d7' }}
                  />
                  <figcaption className="text-xs mt-2.5" style={{ color: '#6e6e73' }}>
                    {s.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* 設計原則 */}
        <section className="px-6 py-16">
          <div className="max-w-5xl mx-auto">
            <SectionTitle eyebrow="Principles" title="三個設計原則" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {principles.map((p, i) => (
                <motion.div key={p.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.06 }}>
                  <Paper className="p-5 h-full">
                    <p.icon size={20} className="mb-3" style={{ color: C.codex }} />
                    <h3 className="font-bold mb-2">{p.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: C.soft }}>
                      {p.desc}
                    </p>
                  </Paper>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 工程實踐與規模 */}
        <section className="px-6 py-16 border-t" style={{ backgroundColor: C.muted, borderColor: C.border }}>
          <div className="max-w-5xl mx-auto">
            <SectionTitle eyebrow="Engineering" title="工程實踐" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {practices.map((p) => (
                <Paper key={p.title} className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <p.icon size={18} style={{ color: C.link }} />
                    <h3 className="font-bold">{p.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: C.soft }}>
                    {p.desc}
                  </p>
                </Paper>
              ))}
            </div>

            <h3 className="font-bold mb-4">規模（2026-11-17）</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {stats.map((s) => (
                <Paper key={s.label} tone={C.card} className="p-4">
                  <p className="text-3xl font-black" style={{ ...MONO, color: C.self }}>
                    {s.value}
                  </p>
                  <p className="text-sm font-bold mt-1">{s.label}</p>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: C.soft }}>
                    {s.note}
                  </p>
                </Paper>
              ))}
            </div>
          </div>
        </section>

        {/* 技術棧 */}
        <section className="px-6 py-16 border-t" style={{ borderColor: C.border }}>
          <div className="max-w-5xl mx-auto">
            <SectionTitle
              eyebrow="Stack"
              title="技術棧"
              desc="全部服務跑在一台機器上：Spring Boot、PostgreSQL、Redis 和兩個前端，AI 用的是自己的 Codex 與 Claude 訂閱；需要對外時用 cloudflared tunnel 臨時開放。"
            />
            <Paper className="overflow-hidden">
              <dl>
                {techStack.map((t, i) => (
                  <div
                    key={t.layer}
                    className="grid grid-cols-[4.5rem_1fr] sm:grid-cols-[6rem_1fr] gap-4 px-5 py-3 text-sm"
                    style={{ borderTop: i ? `1px dashed ${C.border}` : undefined }}
                  >
                    <dt className="font-bold" style={{ color: C.link }}>
                      {t.layer}
                    </dt>
                    <dd className="leading-relaxed">{t.items}</dd>
                  </div>
                ))}
              </dl>
            </Paper>
          </div>
        </section>

        {/* 私人專案說明 */}
        <section className="px-6 py-16" style={{ backgroundColor: C.desk }}>
          <div className="max-w-3xl mx-auto">
            <Paper tone={C.board} className="p-8 text-center">
              <Lock size={22} className="mx-auto mb-3" style={{ color: C.link }} />
              <h2 className="text-2xl font-bold mb-3">私人專案</h2>
              <p className="mb-2 leading-relaxed text-sm">原始碼不公開，這一頁的文字與截圖可以公開展示。</p>
              <p className="mb-8 leading-relaxed text-xs" style={{ color: C.soft }}>
                小助手喵喵使用 Live2D 官方的免費範例模型「Tororo & Hijiki」與 Cubism SDK for Web 的 Cubism Core；依授權條款，這些素材不放進版控。
              </p>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm font-bold text-sm cursor-pointer shadow-[0_3px_0_rgba(74,44,24,0.25)] hover:-translate-y-0.5 transition-transform"
                style={{ backgroundColor: C.self, color: C.selfFg }}
              >
                <ArrowLeft size={15} />
                返回首頁看其他專案
              </Link>
            </Paper>
          </div>
        </section>

        <footer className="px-6 py-3 text-xs" style={{ ...MONO, backgroundColor: C.fg, color: C.board }}>
          <div className="max-w-5xl mx-auto flex flex-wrap justify-between gap-2">
            <span>© 2026 Rex · codex-forge</span>
            <span>Codex CLI · Claude Code CLI · Spring Boot 4</span>
          </div>
        </footer>
      </div>
    </MotionConfig>
  )
}

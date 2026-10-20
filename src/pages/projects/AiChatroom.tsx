import { Link } from 'react-router'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  MessageCircle,
  Users,
  MessagesSquare,
  AtSign,
  Brain,
  Settings2,
  ImagePlus,
  Mountain,
  Radio,
  Sparkles,
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

/* 部分截圖攝於 AI 角色由 Luna 更名為 Lumi 之前 */
const OLD_NAME_NOTE = '此截圖攝於角色更名前，畫面上的「Luna 🌙」即現在的 Lumi 🐾，功能相同。'

const techStack = [
  { name: 'Java 21', color: '#B07219' },
  { name: 'Spring Boot 3.5', color: '#6DB33F' },
  { name: 'Spring AI', color: '#6DB33F' },
  { name: 'WebSocket / STOMP', color: '#010101' },
  { name: 'Ollama', color: '#000000' },
  { name: 'Google Gemini', color: '#4285F4' },
  { name: 'ComfyUI', color: '#7C3AED' },
  { name: 'React 19', color: '#0EA5E9' },
  { name: 'Redis', color: '#DC382D' },
  { name: 'PostgreSQL', color: '#336791' },
]

const features = [
  {
    icon: MessageCircle,
    title: 'AI 泡泡 — Lumi 一對一陪聊',
    desc: '右下角全站浮窗，匿名訪客填個暱稱即可開聊，不需登入。SSE 逐字串流做打字機效果、可中斷；以 anonId 隔離記憶 + Redis 歷史還原（TTL 30 分）。',
    color: '#6366F1',
  },
  {
    icon: Users,
    title: '多人聊天室 — 多真人 + Lumi',
    desc: '房主開房取得 6 碼房號，他人輸房號 + 暱稱加入（暱稱去重）。WebSocket/STOMP 廣播至 /topic/room/{code}，在線成員列表即時更新、Lumi 常駐。',
    color: '#0EA5E9',
  },
  {
    icon: MessagesSquare,
    title: '三種訊息類型',
    desc: '群播（對全房 + Lumi）、定向（@某人含 @Lumi）、旁白（// 出戲閒聊，Lumi 看不到）。不同底色區分，前兩者進 AI、旁白不進。',
    color: '#8B5CF6',
  },
  {
    icon: AtSign,
    title: '對象快捷 chip（具記憶性）',
    desc: '輸入框上方一排 chip：對所有人 / 對 Lumi / 對每位成員 / 旁白，一鍵切換。送出後維持同一對象，記憶對象離開房間時自動退回「對所有人」。',
    color: '#EC4899',
  },
  {
    icon: Brain,
    title: 'Lumi 自主參與（逐則判斷）',
    desc: '每則 IC 訊息都進 AI，由 LLM 自主決定回應或回 [SKIP] 保持安靜，讓 Lumi 像群組成員而非有問必答。Redis 佇列 + 鎖序列化避免並發交錯。',
    color: '#10B981',
  },
  {
    icon: Settings2,
    title: 'Lumi 角色人設（房主可編輯）',
    desc: '房主可即時改 Lumi 角色設定（PUT /persona），立即生效、非房主不可見。人設以三引號結構化隔離 + 後端安全準則，防 prompt injection。',
    color: '#F59E0B',
  },
  {
    icon: ImagePlus,
    title: 'Lumi 情緒圖庫（看心情發圖）',
    desc: 'Function Calling 工具 sendLumiImage(emotion, intent) 依當下情緒/情境挑圖：emotion 主鍵（16 種）+ intent 次鍵（17 種），子集為空退回只比對情緒，最終隨機挑一張。圖庫 109 張、metadata.json 驅動，加圖免改碼；泡泡與多人房共用。',
    color: '#F43F5E',
  },
  {
    icon: Mountain,
    title: 'Lumi 自動換場 + 背景生圖',
    desc: 'Lumi 依對話自行判斷場景改變並呼叫 changeScene 工具，無需房主操作；場景描述送本機 ComfyUI 生成全房共享的背景圖，交叉淡入切換，中途加入的成員也看得到同一張。',
    color: '#7C3AED',
  },
]

const endpoints = [
  { method: 'POST', methodColor: '#10B981', path: '/api/v1/portal/ai/session', desc: '建立匿名泡泡 session' },
  { method: 'POST', methodColor: '#10B981', path: '/api/v1/portal/ai/chat/stream', desc: '泡泡 SSE 逐字串流' },
  { method: 'POST', methodColor: '#10B981', path: '/api/v1/rooms', desc: '開房，回 6 碼房號' },
  { method: 'GET', methodColor: '#3B82F6', path: '/api/v1/rooms/{code}/exists', desc: '房號是否存在' },
  { method: 'PUT', methodColor: '#F59E0B', path: '/api/v1/rooms/{code}/persona', desc: '房主更新 Lumi 人設' },
  { method: 'GET', methodColor: '#3B82F6', path: '/api/v1/lumi-images/**', desc: 'Lumi 情緒圖庫（公開靜態）' },
  { method: 'WS', methodColor: '#8B5CF6', path: '/ws → /topic/room/{code}', desc: '多人房 STOMP（join/send/leave）' },
]

/* 一次換場的流程 */
const sceneFlow = [
  { step: '01', title: 'Lumi 判斷換場', desc: '有人說「我們去海邊的夏日祭典吧」，Lumi 自行判斷場景改變並呼叫 changeScene 工具' },
  { step: '02', title: '場景文字立即生效', desc: '寫入 Redis 並廣播 SCENE_TEXT；下一則回話起，Lumi 的認知就跟著新場景' },
  { step: '03', title: '等 Lumi 回完話才生圖', desc: '生圖與聊天互搶 GPU，並行時聊天約慢 2–3 倍，所以延到該房 AI 回覆結束才開始' },
  { step: '04', title: 'ComfyUI 生成背景', desc: 'Qwen Image 2.1，896×592、16 步，實測約 40–60 秒；期間廣播 SCENE_GENERATING' },
  { step: '05', title: '全房淡入切換', desc: 'SCENE_UPDATE 帶回圖 URL，雙圖層先預載再交叉淡入；中途加入者由 JOINED 拿到同一張' },
]

const highlights = [
  'AI 是「群組成員」不是客服：Lumi 逐則自主判斷回應或沉默（[SKIP]），更貼近真人在群組裡的行為。',
  '兩種串流各司其職：一對一泡泡用 SSE、多人房用 WebSocket/STOMP，前端都做到打字機逐字效果。',
  '發話對象語意化：群播 / 定向 / 旁白三型 + 具記憶性的對象 chip，把「對誰說話」做成一級互動。',
  '雙 AI Provider 可切換：本地 Ollama 零成本開發、雲端 Gemini 完整 Tool 能力，一個設定切換。',
  '並發安全：多人同時發話時，AI 觸發走 Redis 佇列 + 鎖序列化，回應不交錯。',
  'Prompt injection 防護：房主自訂人設經結構化隔離 + 後端安全準則約束。',
  '生圖不拖慢聊天：場景文字與背景圖雙軌、生圖延到 AI 回完話才開始、每房 60 秒冷卻 + 最新優先，幾十秒的本機生圖不卡住即時對話。',
]

const limitations = [
  'Function Calling 需模型支援 Tool：Ollama 端若選不支援的模型，Lumi 不會觸發發圖（正常，非 bug）。',
  '換場由 LLM 自行判斷：同樣的話不一定每次都觸發 changeScene；非定向訊息 Lumi 也可能直接 [SKIP]。',
  '場景背景需要本機 ComfyUI：沒開時只有背景圖生不出來，聊天與場景文字不受影響。',
  '房間狀態存 Redis：房間 / 成員 / 訊息 / 佇列皆存 Redis，清空即遺失（個人專案取向）。',
  '預設啟動政策為手動：docker-compose 的 restart 設為 "no"，不隨開機自啟。',
  '派生自 RBAC 模板：底層仍帶 good-neighbor RBAC 後台，但非本專案展示重點。',
]

export default function AiChatroom() {
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
            href="https://github.com/Rex-shark/ai-chatroom"
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
      <section className="px-6 py-16 border-b border-slate-100 bg-gradient-to-br from-sky-50/50 to-indigo-50/40">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-semibold mb-5">
              <Radio size={12} />
              Full-Stack / AI / Realtime
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              ai-chatroom
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed mb-4">
              一個有 AI 夥伴 Lumi 🐾 隨行的多人即時聊天室：匿名訪客可與 Lumi 一對一陪聊，也能開房邀朋友多人同聊，Lumi 會以房間成員身分自主加入對話；聊到要換地方時，她還會自己換場，並生成全房共享的背景圖。
            </p>
            <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
              一般聊天室只有「人對人」，多數 AI 聊天又只有「人對 AI 一對一」。ai-chatroom 把兩者合一：在多真人房間裡放進一位 AI 成員 Lumi，讓她像群組裡真正的夥伴，自己判斷何時該講話、何時安靜。
            </p>
          </motion.div>

          <img
            src="/projects/ai-chatroom/scene-room-festival.png"
            alt="多人聊天室：Lumi 依對話換到「海邊的夏日祭典」，上方「當前場景」已更新，背景換成 ComfyUI 生成的祭典夜景"
            className="mt-10 rounded-2xl border border-slate-200 shadow-lg shadow-sky-100/50 w-full hover:-translate-y-1 transition-transform duration-300"
          />
          <p className="text-xs text-slate-400 mt-3">
            Lumi 依對話換到「海邊的夏日祭典」：上方「當前場景」即時更新，背景換成本機 ComfyUI 生成的祭典夜景
          </p>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-6 py-12 border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs font-bold tracking-widest text-sky-500 uppercase mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {techStack.map((t) => (
              <span
                key={t.name}
                className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border"
                style={{ backgroundColor: `${t.color}10`, color: t.color, borderColor: `${t.color}30` }}
              >
                {t.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 兩種聊天形態 */}
      <section className="px-6 py-16 bg-slate-50/60">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">兩種聊天形態，兩種串流技術</h2>
          <p className="text-slate-500 text-sm mb-10">通訊模型不同，刻意用了不同的即時技術</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
            >
              <div className="p-6">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-600 text-xs font-semibold mb-3">
                  <MessageCircle size={13} /> SSE · 一對一
                </div>
                <h3 className="font-bold text-slate-900 mb-1.5">AI 泡泡</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  單向逐字推送用 SSE 剛好夠用又輕，前端 fetch + ReadableStream 接成打字機效果。記憶以 anonId 隔離。
                </p>
              </div>
              <img
                src="/projects/ai-chatroom/ai-bubble.png"
                alt="AI 泡泡一對一對話（攝於角色更名前）"
                className="w-full border-t border-slate-100"
              />
              <p className="px-6 py-3 text-xs text-slate-400 border-t border-slate-100">{OLD_NAME_NOTE}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
            >
              <div className="p-6">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-sky-50 text-sky-600 text-xs font-semibold mb-3">
                  <Users size={13} /> WebSocket · 多人
                </div>
                <h3 className="font-bold text-slate-900 mb-1.5">多人聊天室</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  多對多 + 廣播天生需要雙向連線，用 STOMP over WebSocket 廣播至 /topic/room/&#123;code&#125;；每次呼叫 AI 時自 Redis 取最近幾則對話組進 prompt。
                </p>
              </div>
              <img
                src="/projects/ai-chatroom/room-chat.png"
                alt="多人聊天室房內回覆（攝於角色更名前）"
                className="w-full border-t border-slate-100"
              />
              <p className="px-6 py-3 text-xs text-slate-400 border-t border-slate-100">{OLD_NAME_NOTE}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 自動情境生圖 */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-violet-50 text-violet-600 text-xs font-semibold mb-3">
            <Mountain size={13} /> changeScene · ComfyUI
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">自動情境生圖：Lumi 自己換場</h2>
          <p className="text-slate-500 text-sm mb-10 max-w-3xl leading-relaxed">
            聊天中說「我們去海邊的夏日祭典吧」，Lumi 會自行判斷場景改變，不需房主操作。場景文字立即生效，背景圖約 40–60 秒後補上；每房 60 秒冷卻、連續換場只為最後一個場景生圖。沒開 ComfyUI 也能正常聊天，只是沒有背景圖。
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
            {[
              { src: '/projects/ai-chatroom/scene-bg-festival.jpg', alt: '自動生成的背景：海邊的夏日祭典，夜晚，紅燈籠與煙火', label: '海邊的夏日祭典' },
              { src: '/projects/ai-chatroom/scene-bg-onsen.jpg', alt: '自動生成的背景：山中溫泉旅館的庭院，雪夜與石燈籠', label: '山裡溫泉旅館的雪夜庭院' },
            ].map((img, i) => (
              <motion.figure
                key={img.src}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="rounded-2xl border border-slate-200 w-full hover:-translate-y-1 transition-transform duration-300"
                />
                <figcaption className="text-sm font-medium text-slate-700 mt-2">{img.label}</figcaption>
              </motion.figure>
            ))}
          </div>
          <p className="text-xs text-slate-400 mb-10">
            同一間房接連兩次換場自動生成的背景（896×592，16 步，各約 40–50 秒）
          </p>

          <div className="space-y-3">
            {sceneFlow.map((f, i) => (
              <motion.div
                key={f.step}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="flex gap-4 items-start bg-slate-50/70 rounded-xl border border-slate-100 px-5 py-4"
              >
                <span
                  className="shrink-0 text-sm font-bold text-violet-600 pt-0.5"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                >
                  {f.step}
                </span>
                <div>
                  <p className="font-semibold text-slate-900 text-sm mb-0.5">{f.title}</p>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 bg-slate-50/60">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">主要功能</h2>
          <p className="text-slate-500 text-sm mb-10">圍繞「讓 AI 當群組成員」的一系列設計</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, ease: 'easeOut' as const, delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:shadow-sky-100/40 hover:-translate-y-1 transition-all duration-200 cursor-default"
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

          {/* 開房畫面 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-8"
          >
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              開房 / 加入房間
            </p>
            <img
              src="/projects/ai-chatroom/rooms-lobby.png"
              alt="多人聊天室開房表單（攝於角色更名前）"
              className="rounded-2xl border border-slate-200 w-full hover:-translate-y-1 transition-transform duration-300"
            />
            <p className="text-xs text-slate-400 mt-3">{OLD_NAME_NOTE}</p>
          </motion.div>

          {/* Lumi 情緒圖庫實例 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-8"
          >
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Lumi 依情緒挑圖（emotion：embarrassed × intent：affection）
            </p>
            <img
              src="/projects/ai-chatroom/luna-emotion-image.png"
              alt="被誇獎後害羞，自主發出對應情緒的圖片（攝於角色更名前）"
              className="rounded-2xl border border-slate-200 w-full max-w-md mx-auto hover:-translate-y-1 transition-transform duration-300"
            />
            <p className="text-xs text-slate-400 mt-3 text-center">{OLD_NAME_NOTE}</p>
          </motion.div>
        </div>
      </section>

      {/* 通訊端點 */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">通訊端點</h2>
          <p className="text-slate-500 text-sm mb-8">REST + SSE + WebSocket/STOMP 並用</p>
          <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
            {endpoints.map((api, i) => (
              <div
                key={api.path}
                className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 px-5 py-3.5 ${
                  i !== endpoints.length - 1 ? 'border-b border-slate-100' : ''
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
          <p className="text-xs text-slate-400 mt-4 leading-relaxed">
            STOMP 事件：MESSAGE / MEMBER_JOIN / MEMBER_LEAVE / AI_TYPING / AI_TOKEN / AI_DONE / JOINED / ERROR / SCENE_TEXT / SCENE_GENERATING / SCENE_UPDATE / SCENE_ERROR
          </p>
        </div>
      </section>

      {/* 設計亮點 / 已知限制 */}
      <section className="px-6 py-16 bg-slate-50/60">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-sky-50 to-indigo-50 rounded-2xl border border-sky-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb size={18} className="text-sky-600" />
              <h3 className="font-bold text-slate-900">設計亮點</h3>
            </div>
            <ul className="space-y-3">
              {highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm text-slate-600 leading-relaxed">
                  <span className="text-sky-500 shrink-0">•</span>
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
      <section className="px-6 py-16 border-t border-slate-100 bg-gradient-to-br from-sky-50/50 to-indigo-50/40">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-sky-600 mb-3">
            <Sparkles size={16} />
            <span className="text-xs font-bold tracking-widest uppercase">Open Source</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">想看更多細節？</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            原始碼、README、部署設定都在 GitHub repo，採 Spring Boot 3 + React 19 + Docker Compose。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://github.com/Rex-shark/ai-chatroom"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <GithubIcon className="w-4 h-4" />
              查看 GitHub Repo
            </a>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-slate-200 text-slate-700 font-semibold text-sm hover:border-sky-300 hover:text-sky-600 transition-colors cursor-pointer"
            >
              <ArrowLeft size={15} />
              返回首頁
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 border-t border-slate-100 text-center text-slate-400 text-xs">
        © 2026 Rex · ai-chatroom
      </footer>
    </div>
  )
}

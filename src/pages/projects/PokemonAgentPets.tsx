import { Link } from 'react-router'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Eye,
  Lock,
  Gauge,
  GitFork,
  Footprints,
  Swords,
  Ruler,
  Monitor,
  Terminal,
  AlertTriangle,
  Scale,
  ArrowDown,
} from 'lucide-react'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

const REPO = 'https://github.com/Rex-shark/pokemon-agent-pets'
const IMG = '/projects/pokemon-agent-pets'

/* 夜空底（截圖本身是黑底）＋小島木頭色＋草地綠 */
const C = {
  bg: '#07090f',
  panel: '#10141f',
  line: '#232a3b',
  fg: '#dfe4ee',
  bright: '#ffffff',
  muted: '#8f98ad',
  wood: '#d39a5b',
  grass: '#8fd17a',
}
const MONO = { fontFamily: '"JetBrains Mono", ui-monospace, monospace' }

/* 泡泡狀態：顏色仿 App 裡的雲朵泡泡 */
const bubbles = [
  { session: 'mobile-app', text: '寫程式：login.ts', when: '在做事（讀檔、寫程式、跑指令、查資料…）', extra: '白色泡泡', fill: '#ffffff', border: '#c9d2e3', ink: '#1f2733' },
  { session: 'blog', text: '需要你確認：跑指令', when: '等你確認（權限、問問題、計畫）', extra: '跳動、停下來面向你、叮咚聲', fill: '#fff4c2', border: '#e7c64a', ink: '#5b4500' },
  { session: 'api-server', text: '跑指令失敗了', when: '工具失敗', extra: '播攻擊動作、低音提示聲', fill: '#ffe1de', border: '#e0786d', ink: '#7a1d14' },
  { session: 'data-pipeline', text: '整理記憶中…', when: '整理記憶（壓縮對話）', extra: '淡紫泡泡', fill: '#efe6ff', border: '#a98be0', ink: '#45297a' },
  { session: 'docs-site', text: '做完了！', when: '這一輪做完', extra: '播開心動作、上揚三音', fill: '#e1f7dc', border: '#6dbf5c', ink: '#1f5414' },
  { session: 'pokemon-ranch', text: 'Zzz…', when: '5 分鐘沒有動靜', extra: '躺下睡覺，下一個事件就醒來', fill: '#e6e9f0', border: '#9aa3b5', ink: '#3a4254' },
]

const lifecycle = [
  { title: '認養', desc: '新 session 第一次有動靜，就從牧場上還沒有的品種裡隨機認養一隻，重開 App 還在。' },
  { title: '放生', desc: 'session 結束後寵物留在牧場上；要拿掉從選單（macOS 的 Dock、Windows 的系統匣）「放生」。' },
]

const dailyLife = [
  { icon: Footprints, title: '各有各的地盤', desc: '陸地的在草地上逛，水系的在水裡游，兩棲的兩邊都去。' },
  { icon: Swords, title: '會打架', desc: '兩隻正面撞上有機率打一場，輸的冒著汗跑到另一頭。' },
  { icon: Ruler, title: '151 隻依體型分級', desc: '第一代 151 隻都有，卡比獸和小拉達站在一起看得出差別。' },
  { icon: Monitor, title: '兩種模式', desc: '置頂的小牧場（可以拖著搬、可以摸寵物），或鋪在桌面圖示底下的桌布模式（只有 macOS）。' },
]

const maps = [
  { file: 'map-lake-left', name: '左側海', desc: '沙灘、椰子樹，一座伸進海裡的木棧橋，寵物會走上去。' },
  { file: 'map-lake-center', name: '火山口湖', desc: '活火山，湖在山頂；水系在湖裡，其他寵物在山下的平地。' },
  { file: 'map-river', name: '中央河', desc: '一條微彎的河把牧場分成兩岸，上岸是營地與營火。' },
  { file: 'map-snow', name: '雪地', desc: '亮著燈的小木屋、松林、雪屋與雪人，天上飄雪。' },
  { file: 'map-sakura', name: '日式賞櫻', desc: '池泉庭園：瀑布石組、太鼓橋與鳥居、枝垂櫻、會動的鹿威し，花瓣飄落。' },
  { file: 'map-islet', name: '中央島', desc: '四面環海的沙島：大椰子樹、排球、沖上岸的包裹和半埋在沙裡的黃色橡皮艇。' },
  { file: 'map-moon', name: '月面基地', desc: '淡藍大玻璃罩、中央圓形水池，玻璃通道通到小島邊緣的門；罩外有隕石坑與 NPC。' },
  { file: 'map-undersea', name: '海底世界', desc: '整座島沉在海裡像一缸水族箱：罩裡是陸地，罩外水系浮在不同高度，珊瑚、海草、寶箱與魚群。' },
]

const flow = [
  { label: 'Claude Code／Codex', sub: '多個 session、子代理', note: 'hook 事件' },
  { label: 'hooks/', sub: 'pet-hook.sh／.mjs、codex-hook.py', note: 'POST 127.0.0.1:47821/hook' },
  { label: 'hook-server', sub: 'Electron 主行程', note: '' },
  { label: 'ranch-state', sub: '認養＋每個 session 的狀態機', note: 'IPC 快照' },
  { label: 'renderer', sub: 'three.js 牧場、寵物、泡泡、音效', note: '' },
]

const principles = [
  { icon: Eye, title: '隱私', desc: '只取用得到的欄位（session ID、事件名、工具名、工作目錄）。泡泡只留看不出隱私的描述；提示文字、指令本身、檔案內容、agent 的回覆讀完就丟，不保存、不寫 log。' },
  { icon: Lock, title: '安全', desc: '只聽 127.0.0.1，帶 Origin 標頭的請求一律拒絕，避免瀏覽器裡的網頁冒充 agent。' },
  { icon: Gauge, title: '不拖慢 agent', desc: 'hook 永遠成功結束、最多等 1 秒；桌寵沒開時連線立刻被拒。Claude Code 的 hook 不輸出任何東西，Codex 的只回空的 {}。' },
  { icon: GitFork, title: '子代理不另外養寵物', desc: '子代理的事件只算「這個 session 還有動靜」；子代理要權限時，主 session 的寵物一樣會變黃。' },
]

const techStack = ['TypeScript', 'Electron 45', 'Vite', 'three.js 0.187', 'Web Audio', 'Claude Code Hooks', 'Codex Hooks', 'macOS', 'Windows']

const commands = [
  { use: '安裝套件', cmd: 'cd agent-pets && npm install' },
  { use: '準備模型', cmd: '自行取得後放進 agent-pets/models/（見 repo 的 docs/install.md）' },
  { use: '安裝 hooks', cmd: '把 hooks/claude-settings.example.json 合併進 ~/.claude/settings.json' },
  { use: '開發模式', cmd: 'npm run dev' },
  { use: '打包 App', cmd: 'npm run dist:mac（Windows：npm run dist:win）' },
  { use: '展示網站', cmd: 'npm run showcase（可送假事件的活牧場＋151 隻動作圖鑑）' },
]

const limitations = [
  'repo 不含寶可夢模型，要自己取得並放進 agent-pets/models/；模型權利屬原權利方，只在自己的電腦上用。',
  '桌布模式只有 macOS；Windows 只有置頂小牧場。',
  '打包的 App 沒有簽章，給自己這台電腦用。',
]

function Bubble({ b }: { b: (typeof bubbles)[number] }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="rounded-2xl border-2 px-4 py-2 text-center shadow-lg max-w-full"
        style={{ backgroundColor: b.fill, borderColor: b.border, color: b.ink }}
      >
        <p className="text-[11px] opacity-70" style={MONO}>{b.session}</p>
        <p className="text-sm font-bold whitespace-nowrap">{b.text}</p>
      </div>
      {/* 雲朵泡泡的兩顆小尾巴 */}
      <span className="block w-3 h-3 rounded-full border-2 mt-1" style={{ backgroundColor: b.fill, borderColor: b.border }} />
      <span className="block w-2 h-2 rounded-full border-2 mt-0.5" style={{ backgroundColor: b.fill, borderColor: b.border }} />
    </div>
  )
}

export default function PokemonAgentPets() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: C.bg, color: C.fg, fontFamily: '"Nunito", "Noto Sans TC", system-ui, sans-serif' }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+TC:wght@400;500;700&display=swap"
      />

      {/* 頂部導覽 */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b" style={{ backgroundColor: `${C.bg}E0`, borderColor: C.line }}>
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors cursor-pointer group hover:text-white"
            style={{ color: C.muted }}
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
            返回首頁
          </Link>
          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors cursor-pointer hover:text-white"
          >
            <GithubIcon className="w-4 h-4" />
            在 GitHub 上查看
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 pt-16 pb-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
          >
            <p className="text-xs font-semibold tracking-[0.14em] uppercase mb-3" style={{ ...MONO, color: C.grass }}>
              AI Agent Tooling / Desktop App / 3D
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2" style={{ color: C.bright }}>
              寶可夢牧場 Agent
            </h1>
            <p className="text-lg font-semibold mb-5" style={{ color: C.wood }}>Pokemon Agent Pets</p>
            <p className="text-lg max-w-3xl leading-relaxed mb-4">
              讓 AI coding agent 的工作狀態「看得見」的桌寵。桌面上有一座 3D 等角小島，每個 Claude Code／Codex session 認養一隻第一代寶可夢；頭上的雲朵泡泡顯示 agent 正在做什麼，等你確認、出錯、做完時用顏色和音效提醒你。
            </p>
            <p className="text-sm max-w-3xl leading-relaxed" style={{ color: C.muted }}>
              同時開好幾個 session，不用一個個切回去看誰在等權限、誰出錯、誰做完了。macOS 與 Windows 都能用。
            </p>
          </motion.div>

          <figure className="mt-10">
            <img
              width={1200}
              height={750}
              decoding="async"
              src={`${IMG}/map-lake-left-pets.webp`}
              alt="左側海地圖上的寶可夢：兩隻走上木棧橋，水系在海裡游"
              className="w-full rounded-2xl"
            />
            <figcaption className="text-xs mt-3 text-center" style={{ color: C.muted }}>
              左側海地圖上的寶可夢：兩隻走上棧橋，水系在海裡游。放入模型後實際跑起來的樣子，角色屬於各自的權利方
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 泡泡狀態 */}
      <section className="px-6 py-16 border-t" style={{ borderColor: C.line, backgroundColor: C.panel }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ color: C.bright }}>看泡泡就知道 agent 在幹嘛</h2>
          <p className="text-sm mb-10" style={{ color: C.muted }}>每個 session 一隻寵物，泡泡上方是專案名稱，下面是正在做的事</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bubbles.map((b, i) => (
              <motion.div
                key={b.session}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="rounded-2xl border px-5 pt-6 pb-5 flex flex-col items-center text-center gap-4 min-w-0"
                style={{ borderColor: C.line, backgroundColor: C.bg }}
              >
                <Bubble b={b} />
                <div>
                  <p className="font-bold text-sm" style={{ color: C.bright }}>{b.when}</p>
                  <p className="text-xs mt-1" style={{ color: C.muted }}>{b.extra}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <figure className="mt-10">
            <img
              width={1200}
              height={750}
              decoding="async"
              src={`${IMG}/map-snow-pets.webp`}
              alt="雪地地圖上六隻寶可夢頭上各有一個泡泡：白色在做事、黃色等確認、紅色失敗、淡紫整理記憶、綠色做完"
              loading="lazy"
              className="w-full rounded-2xl"
            />
            <figcaption className="text-xs mt-3 text-center" style={{ color: C.muted }}>
              實際畫面：雪地上六個 session 同時在跑——白色在做事、黃色等你確認、紅色失敗、淡紫整理記憶、綠色做完（角色屬於各自的權利方）
            </figcaption>
          </figure>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
            {lifecycle.map((l) => (
              <div key={l.title} className="rounded-xl border px-5 py-4" style={{ borderColor: C.line }}>
                <p className="font-bold text-sm mb-1" style={{ color: C.wood }}>{l.title}</p>
                <p className="text-sm leading-relaxed">{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 寵物自己過日子 */}
      <section className="px-6 py-16 border-t" style={{ borderColor: C.line }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ color: C.bright }}>沒事的時候，寵物自己過日子</h2>
          <p className="text-sm mb-10" style={{ color: C.muted }}>音效用 Web Audio 現場合成，除了模型之外沒有其他素材檔</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dailyLife.map((d) => (
              <div key={d.title} className="flex gap-4 rounded-xl border p-5" style={{ borderColor: C.line, backgroundColor: C.panel }}>
                <d.icon size={20} className="shrink-0 mt-0.5" style={{ color: C.grass }} />
                <div>
                  <p className="font-bold mb-1" style={{ color: C.bright }}>{d.title}</p>
                  <p className="text-sm leading-relaxed">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 八張地圖 */}
      <section className="px-6 py-16 border-t" style={{ borderColor: C.line }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ color: C.bright }}>八張地圖</h2>
          <p className="text-sm mb-10" style={{ color: C.muted }}>從選單切換，也可以設成每次啟動隨機抽一張；兩個平台共用同一套地圖</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
            {maps.map((m) => (
              <figure key={m.file} className="min-w-0">
                <img
                  decoding="async"
                  src={`${IMG}/${m.file}.webp`}
                  alt={`${m.name}地圖：${m.desc}`}
                  loading="lazy"
                  className="w-full rounded-xl hover:-translate-y-1 transition-transform duration-300"
                />
                <figcaption className="mt-3">
                  <p className="font-bold" style={{ color: C.bright }}>{m.name}</p>
                  <p className="text-sm leading-relaxed mt-0.5" style={{ color: C.muted }}>{m.desc}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 運作方式 */}
      <section className="px-6 py-16 border-t" style={{ borderColor: C.line, backgroundColor: C.panel }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-10">
          <div className="min-w-0">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ color: C.bright }}>運作方式</h2>
            <p className="text-sm mb-8" style={{ color: C.muted }}>agent 的 hook 事件一路送到桌面上的 3D 牧場</p>
            <ol className="space-y-1">
              {flow.map((f, i) => (
                <li key={f.label}>
                  <div className="rounded-xl border px-4 py-3" style={{ borderColor: C.line, backgroundColor: C.bg }}>
                    <p className="font-bold text-sm" style={{ ...MONO, color: C.bright }}>{f.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: C.muted }}>{f.sub}</p>
                  </div>
                  {i < flow.length - 1 && (
                    <div className="flex items-center gap-2 py-1.5 pl-4 text-xs" style={{ color: C.wood }}>
                      <ArrowDown size={14} />
                      {f.note && <span style={MONO} className="break-all">{f.note}</span>}
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-extrabold mb-6 lg:mt-2" style={{ color: C.bright }}>設計重點</h3>
            <div className="space-y-3">
              {principles.map((p) => (
                <div key={p.title} className="flex gap-4 rounded-xl border p-5" style={{ borderColor: C.line, backgroundColor: C.bg }}>
                  <p.icon size={18} className="shrink-0 mt-0.5" style={{ color: C.wood }} />
                  <div>
                    <p className="font-bold text-sm mb-1" style={{ color: C.bright }}>{p.title}</p>
                    <p className="text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 技術棧與快速開始 */}
      <section className="px-6 py-16 border-t" style={{ borderColor: C.line }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-12">
            {techStack.map((t) => (
              <span key={t} className="px-3 py-1.5 rounded-lg text-sm border" style={{ ...MONO, borderColor: C.line, backgroundColor: C.panel }}>
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 mb-6">
            <Terminal size={20} style={{ color: C.grass }} />
            <h2 className="text-2xl font-extrabold" style={{ color: C.bright }}>快速開始</h2>
          </div>
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: C.line, backgroundColor: C.panel }}>
            {commands.map((c, i) => (
              <div
                key={c.use}
                className={`flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-5 px-5 py-3.5 ${i !== commands.length - 1 ? 'border-b' : ''}`}
                style={{ borderColor: C.line }}
              >
                <span className="text-sm sm:w-28 shrink-0" style={{ color: C.muted }}>{c.use}</span>
                <code className="text-[13px] break-all" style={MONO}>{c.cmd}</code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 已知限制 / 聲明 */}
      <section className="px-6 py-14 border-t" style={{ borderColor: C.line }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border p-6" style={{ borderColor: C.line, backgroundColor: C.panel }}>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={18} style={{ color: C.wood }} />
              <h3 className="font-bold" style={{ color: C.bright }}>已知限制</h3>
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
          <div className="rounded-xl border p-6" style={{ borderColor: C.line, backgroundColor: C.panel }}>
            <div className="flex items-center gap-2 mb-4">
              <Scale size={18} style={{ color: C.muted }} />
              <h3 className="font-bold" style={{ color: C.bright }}>聲明與素材來源</h3>
            </div>
            <p className="text-sm leading-relaxed mb-3">
              非官方的粉絲專案，與任天堂、Creatures、GAME FREAK、The Pokémon Company 無關，也未獲背書。寶可夢（Pokémon）及相關名稱是各權利方的商標。
            </p>
            <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
              頁面上兩張有寶可夢的截圖是放入模型後實際跑起來的樣子，只當示意，角色屬於各自的權利方。repo 不包含、不散布寶可夢模型（模型來源 06wj/pokemon）；屬性資料取自 06wj/pokemon 的 pokemonTypes.ts（MIT），官方身高體重取自 PokeAPI；hook 腳本的規則參考 claude-office 與 pixel-agents。
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 border-t" style={{ borderColor: C.line, backgroundColor: C.panel }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-extrabold mb-3" style={{ color: C.bright }}>想養一座自己的牧場？</h2>
          <p className="mb-8 leading-relaxed text-sm" style={{ color: C.muted }}>
            安裝步驟寫在 repo 的 docs/install.md，每一步都有確認方式，可以直接交給你的 AI agent 照著做。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90 cursor-pointer"
              style={{ backgroundColor: C.wood, color: C.bg }}
            >
              <GithubIcon className="w-4 h-4" />
              查看 GitHub Repo
            </a>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border font-bold text-sm transition-colors cursor-pointer hover:text-white"
              style={{ borderColor: C.line }}
            >
              <ArrowLeft size={15} />
              返回首頁
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 border-t text-center text-xs" style={{ borderColor: C.line, color: C.muted }}>
        © 2026 Rex · 寶可夢牧場 Agent（Pokemon Agent Pets）· 非官方粉絲專案
      </footer>
    </div>
  )
}

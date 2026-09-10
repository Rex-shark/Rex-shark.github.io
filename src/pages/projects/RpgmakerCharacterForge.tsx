import { Link } from 'react-router'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Workflow,
  FileCode2,
  Layers,
  Smile,
  ShieldCheck,
  LayoutGrid,
  Archive,
  Sparkles,
  Lightbulb,
  AlertTriangle,
  Terminal,
  Scale,
  Swords,
} from 'lucide-react'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

const REPO = 'https://github.com/Rex-shark/rpgmaker-character-forge'

const techStack = [
  { name: 'Python 3.10+', color: '#3776AB' },
  { name: 'ComfyUI', color: '#7C3AED' },
  { name: 'Codex Agent', color: '#10A37F' },
  { name: 'BEN2 去背', color: '#0891B2' },
  { name: '4x-UltraSharpV2', color: '#DB2777' },
  { name: 'React 19', color: '#0EA5E9' },
  { name: 'Tailwind CSS v4', color: '#38BDF8' },
  { name: 'Docker Compose', color: '#2496ED' },
  { name: 'Cloudflare', color: '#F38020' },
]

/* 最終產物規格 */
const outputs = [
  {
    label: '全身立繪',
    size: '432 × 576',
    note: '透明 PNG',
    color: '#D97706',
  },
  {
    label: 'Face 圖 · 16 表情',
    size: '576 × 288 × 2 張',
    note: '4×2 排列，每格 144 × 144',
    color: '#059669',
  },
  {
    label: '敵人戰鬥圖',
    size: '432 × 576',
    note: '透明 sv_enemies PNG',
    color: '#7C3AED',
  },
]

/* 六個 Job */
const jobs = [
  { id: 1, input: '單人行走圖', output: '全身立繪' },
  { id: 2, input: '單人行走圖 ＋ face 圖', output: '全身立繪' },
  { id: 3, input: '完成立繪', output: '16 表情 face 圖' },
  { id: 4, input: '完成立繪 ＋ 單人行走圖', output: 'sv_enemies 戰鬥圖' },
  { id: 5, input: '單人行走圖', output: '立繪 ＋ face 圖 ＋ 戰鬥圖', highlight: true },
  { id: 6, input: '單人行走圖 ＋ face 圖', output: '立繪 ＋ 戰鬥圖' },
]

/* Pipeline 步驟 */
const pipeline = [
  { step: '01', title: '準備參考圖', desc: 'Job 1／5／6 先用 ComfyUI 把行走圖 4× 放大（4x-UltraSharpV2）' },
  { step: '02', title: 'Agent 分析', desc: '分析實際要交給繪圖工具的那張參考圖，而非原始像素圖' },
  { step: '03', title: '組合提示詞', desc: '系統規格 ＋ 圖片觀察 ＋ 使用者提示詞 → composed_prompt.json' },
  { step: '04', title: '純黑背景生圖', desc: '繪圖工具在 #000000 背景上作畫，不畫場景、地面、陰影或框線' },
  { step: '05', title: 'ComfyUI 後處理', desc: 'BEN2 去背、置中縮放到固定尺寸，face 圖再上下切成兩張' },
  { step: '06', title: 'AI 視覺驗證', desc: 'Agent 比對原始參考 / 黑底原圖 / 透明成品，寫入 ai_validation.json' },
  { step: '07', title: '整理輸出', desc: '通過才進 runs/<角色>/output/，並複製一份位元組相同的原始參考圖' },
]

/* 16 表情固定順序 */
const expressions = [
  '中立', '微笑／開心', '生氣', '受傷／痛苦',
  '驚訝', '悲傷／擔心', '堅定／嚴肅', '戰敗／昏厥',
  '害羞', '鬼臉', '大哭', '水汪汪大眼',
  '挑逗', '睡覺', '困惑／疑問', '嘟嘴',
]

const features = [
  {
    icon: Workflow,
    title: '六個 Job 覆蓋不同起點',
    desc: '手上有什麼就跑哪個 Job：只有行走圖跑 Job 5 一次到底；已有立繪只想補 face 圖跑 Job 3。Job 3／4 可直接接續已通過驗證的 Job 1 run，不用重新丟圖。',
    color: '#D97706',
  },
  {
    icon: FileCode2,
    title: '提示詞規格化（不靠運氣）',
    desc: '每份全身生圖提示詞都必須逐字以固定英文前綴開頭，使用者提示詞不可覆蓋，用來擋掉三視圖、角色設定表、轉面圖、並排人物等常見生圖災難。比例也是硬規格：6.5～7 頭身，禁止超大頭與五頭身以下。',
    color: '#7C3AED',
  },
  {
    icon: Layers,
    title: 'ComfyUI 三套工作流',
    desc: '4× 放大、黑底去背並縮成 432×576、face 原圖去背後切成兩張 576×288。共用執行器會動態替換唯一的 LoadImage 與終端 SaveImage，不必為了 JSON 內的預設檔名去改 ComfyUI。',
    color: '#0891B2',
  },
  {
    icon: Smile,
    title: '16 表情固定順序',
    desc: '表情順序寫死，方便直接對應 RPG Maker 的表情索引。每格是朝畫面左側約 15～20° 的頭肩近拍；即使立繪面向右側也必須重繪為朝左，兩眼保持可見。',
    color: '#059669',
  },
  {
    icon: ShieldCheck,
    title: 'AI 視覺驗證（產出自己驗收）',
    desc: '五項判準：同一人物、單人單姿勢單視角、無重大缺失或錯誤裁切、去背後沒吃掉重要細節、透明 PNG 可用。同時附明確的容忍清單——一像素細邊、Alpha 低殘值等不得單獨造成失敗。',
    color: '#DC2626',
  },
  {
    icon: LayoutGrid,
    title: '靜態角色圖鑑',
    desc: '通過驗證的 run 用 publish_character.py 發布到圖鑑：角色清單切換、行走圖動畫預覽、立繪與戰鬥圖並排、透明／暗色／亮色三種底色切換檢查去背邊緣、Face 切割逐格檢查。純靜態，不連後端。',
    color: '#0EA5E9',
  },
  {
    icon: Archive,
    title: '安全的 run 管理',
    desc: '既有 run 預設不覆寫，要取代舊結果才用 --force。每次通過驗證都會把本次使用的輸入圖複製進 output/，且必須與原始輸入位元組完全相同，不得縮放或重新編碼。',
    color: '#64748B',
  },
]

const commands = [
  { use: '安裝 Python 依賴', cmd: 'python3 -m pip install -r tools/requirements.txt' },
  { use: '確認 ComfyUI 連線', cmd: 'curl -sS http://127.0.0.1:8188/system_stats' },
  { use: '切割八人合併行走圖', cmd: 'python3 tools/sprites/split_character_sheet.py <圖> --output-dir <目錄>' },
  { use: '執行 Job（在 Codex 內）', cmd: '執行 job5' },
  { use: '發布到角色圖鑑', cmd: 'python3 tools/gallery/publish_character.py workspace/job05/runs/<角色>' },
  { use: '本機 Docker 展示', cmd: 'docker compose up -d --build' },
]

const highlights = [
  '把「生圖」變成有規格的 Job：三層規格檔鎖住不可協商的部分（尺寸、單人單視角、黑底、身份一致），使用者提示詞只能在容許範圍內調整。',
  'AI 產出由 AI 驗收，但驗收標準是寫死的：五項判準 + 明確的容忍清單，避免「太寬鬆放行爛圖」與「太嚴格永遠不過」兩種失敗。',
  '生成與後處理分離：繪圖工具只負責黑底原圖，尺寸／去背／切割全交給 ComfyUI 工作流，換繪圖工具不用改後處理。',
  '一次指令、多階段生圖：Job 5 內部是三次獨立生圖，中間有驗證閘門，避免一路錯到底。',
  '成果可展示也可驗收：圖鑑的亮／暗／透明三種底色切換，就是為了肉眼確認去背品質。',
]

const limitations = [
  '需要本機 ComfyUI：必須有可在 http://127.0.0.1:8188 連線的 ComfyUI，且已安裝所需自訂節點、BEN2 去背模型與 4x-UltraSharpV2.pth。',
  '需要繪圖工具：專案本身不含生圖模型，實際作畫交給可接收參考圖與提示詞的外部繪圖工具。',
  '素材版權不在授權範圍：MIT 只涵蓋自行開發的程式碼與文件，公開倉庫不附帶 RPG Maker 原始素材。',
  '輸入必須是單人行走圖：八人合併行走圖要先用 split_character_sheet.py 切開，不能直接丟給 Job。',
  '像素圖資訊有限：行走圖與 face 近拍只提供設計與身份，無法控制身體比例；看不清的細節不得當成事實。',
]

export default function RpgmakerCharacterForge() {
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
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-amber-600 text-sm font-medium transition-colors cursor-pointer group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
            返回首頁
          </Link>
          <a
            href={REPO}
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
      <section className="px-6 py-16 border-b border-slate-100 bg-gradient-to-br from-amber-50/60 to-emerald-50/40">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold mb-5">
              <Swords size={12} />
              AI Pipeline / Tooling / 生成式繪圖
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              RPG Maker Character Forge
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed mb-4">
              丟進一張單人行走圖，由 Codex Agent 組提示詞、呼叫繪圖工具生圖，再交給 ComfyUI 放大、去背、縮放與切割，產出可直接匯入遊戲的立繪、16 表情 face 圖與敵人戰鬥圖。
            </p>
            <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
              RPG Maker 的內建素材只有 48×48 的像素行走圖。對話用的 face 圖、劇情用的立繪、戰鬥用的 sv_enemies 圖只能自己畫或外包，而且三者必須是同一個角色——髮型、服裝、配色都要對得上。Character Forge 把這件事流程化，讓「同一角色的多種素材」變成可重複執行的 Job，而不是每次重畫都在碰運氣。
            </p>
          </motion.div>

          <img
            src="/projects/rpgmaker-character-forge/character-gallery.png"
            alt="角色圖鑑：行走圖預覽、角色立繪與敵人戰鬥圖並排展示"
            className="mt-10 rounded-2xl border border-slate-200 shadow-lg shadow-amber-100/50 w-full hover:-translate-y-1 transition-transform duration-300"
          />
          <p className="text-xs text-slate-400 mt-3">
            角色圖鑑：同一角色的行走圖、立繪與 sv_enemies 戰鬥圖集中展示，底色可切換以檢查去背邊緣
          </p>
        </div>
      </section>

      {/* 最終產物規格 */}
      <section className="px-6 py-12 border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs font-bold tracking-widest text-amber-500 uppercase mb-5">最終產物</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {outputs.map((o) => (
              <div
                key={o.label}
                className="rounded-2xl border p-5"
                style={{ borderColor: `${o.color}25`, backgroundColor: `${o.color}08` }}
              >
                <p className="text-sm font-bold text-slate-900 mb-2">{o.label}</p>
                <p
                  className="text-xl font-bold mb-1"
                  style={{ color: o.color, fontFamily: '"JetBrains Mono", monospace' }}
                >
                  {o.size}
                </p>
                <p className="text-xs text-slate-500">{o.note}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4">
            生圖背景統一使用純黑 <code style={{ fontFamily: '"JetBrains Mono", monospace' }}>#000000</code>，再由 ComfyUI 去背。
          </p>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-6 py-12 border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs font-bold tracking-widest text-amber-500 uppercase mb-4">Tech Stack</h2>
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

      {/* Pipeline */}
      <section className="px-6 py-16 bg-slate-50/60">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">正式黑底流程</h2>
          <p className="text-slate-500 text-sm mb-10">每個 Job 都跑同一條 pipeline，差別只在輸入與階段數</p>
          <div className="space-y-3">
            {pipeline.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="flex gap-4 items-start bg-white rounded-xl border border-slate-100 px-5 py-4"
              >
                <span
                  className="shrink-0 text-sm font-bold text-amber-600 pt-0.5"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                >
                  {p.step}
                </span>
                <div>
                  <p className="font-semibold text-slate-900 text-sm mb-0.5">{p.title}</p>
                  <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-5 leading-relaxed">
            Job 5 是一次指令、三次分開生圖；上一階段 <code style={{ fontFamily: '"JetBrains Mono", monospace' }}>ai_validation.json</code> 沒過就不繼續。
          </p>
        </div>
      </section>

      {/* 六個 Job */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">六個 Job</h2>
          <p className="text-slate-500 text-sm mb-8">
            在專案根目錄開 Codex，直接輸入 <code style={{ fontFamily: '"JetBrains Mono", monospace' }}>執行 job1</code>，或指定接續：<code style={{ fontFamily: '"JetBrains Mono", monospace' }}>執行 job3，接續 job1 的艾莉絲</code>
          </p>
          <div className="rounded-2xl border border-slate-200 overflow-hidden">
            {jobs.map((j, i) => (
              <div
                key={j.id}
                className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 px-5 py-4 ${
                  i !== jobs.length - 1 ? 'border-b border-slate-100' : ''
                } ${j.highlight ? 'bg-amber-50/50' : 'bg-white'} hover:bg-slate-50/70 transition-colors`}
              >
                <span
                  className="inline-flex items-center justify-center w-14 shrink-0 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide bg-amber-100 text-amber-700"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                >
                  Job {j.id}
                </span>
                <span className="text-sm text-slate-600 sm:w-64 shrink-0">{j.input}</span>
                <span className="text-slate-300 hidden sm:inline">→</span>
                <span className="text-sm font-semibold text-slate-900 sm:ml-auto sm:text-right">
                  {j.output}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 bg-slate-50/60">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">主要功能</h2>
          <p className="text-slate-500 text-sm mb-10">圍繞「讓生圖變成可重複執行的工程流程」的一系列設計</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, ease: 'easeOut' as const, delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:shadow-amber-100/40 hover:-translate-y-1 transition-all duration-200 cursor-default"
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

      {/* 16 表情 */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">16 表情固定順序</h2>
          <p className="text-slate-500 text-sm mb-8">
            順序寫死，方便直接對應 RPG Maker 的表情索引
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-10">
            {expressions.map((e, i) => (
              <div
                key={e}
                className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-white px-3.5 py-2.5"
              >
                <span
                  className="shrink-0 text-[11px] font-bold text-emerald-600 w-5"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                >
                  {String(i).padStart(2, '0')}
                </span>
                <span className="text-sm text-slate-700">{e}</span>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Face 切割檢查：逐格瀏覽 16 表情 ＋ 兩張 576×288 原圖與切割線
            </p>
            <img
              src="/projects/rpgmaker-character-forge/face-sheet-inspector.png"
              alt="Face 切割檢查介面：16 表情逐格瀏覽與兩張 face 圖的切割線"
              className="rounded-2xl border border-slate-200 w-full hover:-translate-y-1 transition-transform duration-300"
            />
          </motion.div>
        </div>
      </section>

      {/* 去背驗收 */}
      <section className="px-6 py-16 bg-slate-50/60">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">去背品質可以肉眼驗收</h2>
          <p className="text-slate-500 text-sm mb-8">
            圖鑑提供透明格／暗色／亮色三種底色切換，就是為了確認去背後沒有殘留光暈或色塊
          </p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <img
              src="/projects/rpgmaker-character-forge/bright-check.png"
              alt="透明背景檢查切到亮色底，確認去背邊緣沒有殘留"
              className="rounded-2xl border border-slate-200 w-full hover:-translate-y-1 transition-transform duration-300"
            />
            <p className="text-xs text-slate-400 mt-3">
              切到「亮色」底：白底下若有黑邊、方框或光暈會立刻現形
            </p>
          </motion.div>
        </div>
      </section>

      {/* 常用指令 */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Terminal size={20} className="text-amber-600" />
            <h2 className="text-2xl font-bold text-slate-900">常用指令</h2>
          </div>
          <p className="text-slate-500 text-sm mb-8">需要一個可連線的本機 ComfyUI（預設 127.0.0.1:8188）</p>
          <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
            {commands.map((c, i) => (
              <div
                key={c.cmd}
                className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 px-5 py-3.5 ${
                  i !== commands.length - 1 ? 'border-b border-slate-100' : ''
                } hover:bg-slate-50/70 transition-colors`}
              >
                <span className="text-sm text-slate-500 sm:w-48 shrink-0">{c.use}</span>
                <code
                  className="font-mono text-[13px] text-slate-800 break-all"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                >
                  {c.cmd}
                </code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 設計亮點 / 已知限制 */}
      <section className="px-6 py-16 bg-slate-50/60">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-amber-50 to-emerald-50 rounded-2xl border border-amber-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb size={18} className="text-amber-600" />
              <h3 className="font-bold text-slate-900">設計亮點</h3>
            </div>
            <ul className="space-y-3">
              {highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm text-slate-600 leading-relaxed">
                  <span className="text-amber-500 shrink-0">•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={18} className="text-slate-500" />
              <h3 className="font-bold text-slate-900">已知限制 / 誠實揭露</h3>
            </div>
            <ul className="space-y-3">
              {limitations.map((l) => (
                <li key={l} className="flex gap-2 text-sm text-slate-600 leading-relaxed">
                  <span className="text-slate-400 shrink-0">•</span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 授權與素材來源 */}
      <section className="px-6 py-14 border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Scale size={18} className="text-slate-500" />
            <h3 className="font-bold text-slate-900">授權與素材來源</h3>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed mb-3">
            專案自行開發的程式碼與文件採 <strong className="text-slate-700">MIT License</strong>。MIT 僅涵蓋本專案有權授權的內容，
            <strong className="text-slate-700">不包含</strong>第三方素材、RPG Maker 相關資產、模型、自訂節點、使用者提供的圖片或各服務生成的內容。
          </p>
          <p className="text-sm text-slate-500 leading-relaxed">
            開發、測試與展示素材有使用或參考{' '}
            <a
              href="https://mizuotaku.com/SunsetDungeon/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 hover:underline"
            >
              落日迷宮之都
            </a>{' '}
            與{' '}
            <a
              href="https://www.rpgmakerweb.com/products/rpg-maker-mz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 hover:underline"
            >
              RPG Maker MZ
            </a>
            。上述素材、角色、美術、產品名稱與商標權利均屬各自作者、權利人或發行商所有；列示僅為出處說明，不代表已納入本專案授權範圍，也不代表原作者背書。
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 border-t border-slate-100 bg-gradient-to-br from-amber-50/60 to-emerald-50/40">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-amber-600 mb-3">
            <Sparkles size={16} />
            <span className="text-xs font-bold tracking-widest uppercase">Open Source · MIT</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">想看更多細節？</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Job 規格、提示詞規則、ComfyUI 工作流與 Agent 驗證標準都寫在 repo 的 AGENTS.md 與各 jobs/ 子目錄。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <GithubIcon className="w-4 h-4" />
              查看 GitHub Repo
            </a>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-slate-200 text-slate-700 font-semibold text-sm hover:border-amber-300 hover:text-amber-600 transition-colors cursor-pointer"
            >
              <ArrowLeft size={15} />
              返回首頁
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 border-t border-slate-100 text-center text-slate-400 text-xs">
        © 2026 Rex · RPG Maker Character Forge
      </footer>
    </div>
  )
}

import siteShot from '../assets/personal-site.webp'

/** 簡易介紹的代表截圖 */
export interface BriefShot {
  image: string
  caption: string
}

export interface ProjectBrief {
  /** 3 個亮點，各約 30 字內 */
  points: [string, string, string]
  shot: BriefShot
}

/**
 * 點場上的專案卡時的簡易介紹（一個畫面看完；完整內容在 showcase 頁）。
 * 亮點的權威來源是各 spec/projects/<slug>.md 的「卡片重點」一節，改內容時兩邊一起改。
 * 個人網站沒有 spec 檔，亮點取自 CLAUDE.md 與 spec/info.md。
 * 一句話說明不寫在這裡，直接用 profile.ts 的 desc。
 */
export const BRIEFS: Record<string, ProjectBrief> = {
  'personal-site': {
    points: [
      '同一份個人資料，做出 24 種設計風格的首頁',
      '每個精選專案都有獨立的完整介紹頁',
      'push main 就由 GitHub Actions 部署到 GitHub Pages',
    ],
    shot: { image: siteShot, caption: '經典版首頁（原本的正式首頁）' },
  },
  'threads-bot': {
    points: [
      '爬自由時報、TechCrunch 新聞，以來源網址去重',
      '本機 Ollama 改寫成 500 字內的 Threads 貼文',
      '原文 → AI 改寫 → 發布結果，全程可回溯',
    ],
    shot: { image: '/projects/threads-bot/hero-threads-post.png', caption: 'Threads 實際發文成果' },
  },
  'ai-chatroom': {
    points: [
      'AI 是群組成員：逐則自主判斷要回應還是沉默',
      '聊到換地方時自己換場，本機 ComfyUI 生成背景',
      '一對一用 SSE、多人房用 WebSocket／STOMP',
    ],
    shot: {
      image: '/projects/ai-chatroom/scene-room-festival.png',
      caption: '多人房實況：Lumi 換到「海邊的夏日祭典」，背景為 ComfyUI 生成',
    },
  },
  'rpgmaker-character-forge': {
    points: [
      '一張行走圖生出立繪、16 表情 face 圖、敵人戰鬥圖',
      'Codex Agent 組提示詞，ComfyUI 去背、縮放、切割',
      '產出依寫死的五項判準由 AI 自我驗收',
    ],
    shot: {
      image: '/projects/rpgmaker-character-forge/character-gallery.png',
      caption: '角色圖鑑：行走圖預覽、角色立繪與敵人戰鬥圖並排',
    },
  },
  'drama-3': {
    points: [
      '在 Mac 上離線跑 Fish Audio Drama 3，零 API 成本',
      '多角色劇本、聲音複製、表演標籤、串流播放',
      '4bit／8bit／bf16 三版量化可切換',
    ],
    shot: {
      image: '/projects/drama-3/workbench-light.jpg',
      caption: '工作台：角色與參考音檔、劇本行、取樣參數與 take 卡紙',
    },
  },
  'fishing-work': {
    points: [
      '三款遊戲偽裝成 VS Code、簡報、Meet、Excel',
      '本機 Clef 看圖打分、gemma4 扮評審寫評語',
      '連不上模型時自動改隨機評分，照樣能玩',
    ],
    shot: {
      image: '/projects/fishing-work/draw-contest-reveal.png',
      caption: '繪圖比賽揭曉：Clef 分數、名次與評審ミオ的評語',
    },
  },
  'pokemon-agent-pets': {
    points: [
      '每個 Claude Code／Codex session 認養一隻寵物',
      '泡泡顏色看狀態：做事、等確認、出錯、做完',
      'hook 最多等 1 秒、永遠成功結束，不拖慢 agent',
    ],
    shot: {
      image: '/projects/pokemon-agent-pets/map-snow-pets.webp',
      caption: '雪地上六個 session 同時在跑（角色屬於各自的權利方，只當示意）',
    },
  },
  'vrm-chat-widget': {
    points: [
      '本機 Ollama 對話，回覆帶情緒標籤自動換表情',
      'TTS 語音回話，Web Audio 即時驅動嘴型',
      '舞台版全畫面，泡泡版複製一個區塊就能嵌入網頁',
    ],
    shot: {
      image: '/projects/vrm-chat-widget/stage.webp',
      caption: '舞台版（角色為 VRoid Project 的 AvatarSample_A）',
    },
  },
  'codex-forge': {
    points: [
      '擁有者 @小助手Lumi，Codex 讀完整段討論與附件',
      '回覆含 Mermaid 流程圖與可點的 HTML 原型',
      '另有 Claude Code 驅動的 Live2D 貓當私人助手',
    ],
    shot: {
      image: '/projects/codex-forge/web-room-day.webp',
      caption: '前台房間頁・日景（討論內容為虛構示範資料）',
    },
  },
}

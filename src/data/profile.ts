/**
 * Rex 個人資料的共用模組。
 * 內容 1:1 對應 spec/info.md —— 修改時兩邊一起改，不可在此新增 info.md 沒有的資料。
 * 只放「資料」；配色、icon、旋轉角度等裝飾欄位留在各頁面，用 key / index 對應。
 */

export const profile = {
  name: 'Rex',
  roles: ['Java 全端工程師', '系統分析師'],
  /** 兩個身份合併的常用寫法 */
  title: 'Java 全端工程師 & 系統分析師',
  titleEn: 'Java Full-Stack Engineer & System Analyst',
  intro: [
    '從後端核心架構到前端使用者體驗，為複雜需求提供優雅的系統解決方案。',
    '目前專注於 Agentic Engineering，探索 AI Agent 在軟體工程中的無限可能。',
  ],
  location: 'Taiwan',
  email: 'rexrex10050@gmail.com',
  githubHandle: 'Rex-shark',
  githubUrl: 'https://github.com/Rex-shark',
  avatar: '/me.webp',
} as const

export type SkillGroupKey = 'backend' | 'frontend' | 'data' | 'ai' | 'design'

export interface SkillGroup {
  key: SkillGroupKey
  label: string
  labelEn: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    key: 'backend',
    label: '後端',
    labelEn: 'Backend',
    skills: ['Java', 'Spring Boot', 'Spring Security', 'JPA / Hibernate'],
  },
  {
    key: 'frontend',
    label: '前端',
    labelEn: 'Frontend',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    key: 'data',
    label: '資料庫 / DevOps',
    labelEn: 'Database / DevOps',
    skills: ['PostgreSQL', 'Redis', 'Docker', 'GitHub Actions'],
  },
  {
    key: 'ai',
    label: 'AI / LLM',
    labelEn: 'AI / LLM',
    skills: [
      'Spring AI',
      'Ollama（本地 LLM）',
      'Gemini API',
      'Function Calling',
      'RAG',
      'Embedding / 向量資料庫',
      'Prompt Engineering',
      'AI Agent',
      'MCP',
      'Claude Code（Skills / Subagent / Hooks）',
      'Codex',
      'ComfyUI',
    ],
  },
  {
    key: 'design',
    label: '系統設計',
    labelEn: 'System Design',
    skills: ['系統分析', 'UML', 'ERD'],
  },
]

/** 所有技能攤平（給只需要一串標籤的頁面用） */
export const allSkills: string[] = skillGroups.flatMap((g) => g.skills)

export interface Project {
  slug: string
  title: string
  desc: string
  tags: string[]
  /** GitHub repo */
  href: string
  /** 站內路由（showcase 頁，或個人網站的 /gallery） */
  to: string
}

export const projects: Project[] = [
  {
    slug: 'personal-site',
    title: '個人網站',
    desc: '個人網站（即本站）：首頁是可以玩的撲克牌桌，另收錄經典版首頁與 23 種設計風格實驗。React 19 + Vite 8 + Tailwind v4，部署於 GitHub Pages。',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    href: 'https://github.com/Rex-shark/Rex-shark.github.io',
    to: '/gallery',
  },
  {
    slug: 'threads-bot',
    title: 'ThreadsBot',
    desc: '本地 LLM 自動爬新聞、改寫成 Threads 貼文。Spring Boot 3 + Spring AI + Ollama，零 API 成本。',
    tags: ['Java', 'Spring AI', 'Ollama'],
    href: 'https://github.com/Rex-shark/ThreadsBot',
    to: '/projects/threads-bot',
  },
  {
    slug: 'ai-chatroom',
    title: 'ai-chatroom',
    desc: '真人與 AI 夥伴 Lumi 🐾 同房即時聊天，AI 以群組成員身分自主判斷回應或沉默，還會自己換場並用 ComfyUI 生成背景圖。Spring Boot 3 + Spring AI + WebSocket/STOMP。',
    tags: ['Spring AI', 'WebSocket', 'React 19'],
    href: 'https://github.com/Rex-shark/ai-chatroom',
    to: '/projects/ai-chatroom',
  },
  {
    slug: 'rpgmaker-character-forge',
    title: 'RPG Maker Character Forge',
    desc: '一張行走圖生出整套 RPG Maker 角色素材：立繪、16 表情 face 圖、敵人戰鬥圖。Codex Agent 組提示詞 + ComfyUI 去背切割，產出還會自我驗收。',
    tags: ['Python', 'ComfyUI', 'Codex Agent'],
    href: 'https://github.com/Rex-shark/rpgmaker-character-forge',
    to: '/projects/rpgmaker-character-forge',
  },
  {
    slug: 'drama-3',
    title: 'Drama 3 TTS 工作台',
    desc: '在 Apple Silicon Mac 上離線操作 Fish Audio Drama 3 語音模型：多角色劇本、聲音複製、表演標籤、串流播放。FastAPI 封裝 mlx-audio + React 19，零 API 成本。',
    tags: ['Python', 'FastAPI', 'MLX'],
    href: 'https://github.com/Rex-shark/drama-3',
    to: '/projects/drama-3',
  },
  {
    slug: 'fishing-work',
    title: 'fishing-work',
    desc: '偽裝成 VS Code、簡報、Meet、Excel 的區網遊戲平台。繪圖比賽由本機 AI 當評審：Clef 看圖打分、gemma4 扮評審寫評語，模型不在也能自動退回照玩。',
    tags: ['Ollama', 'Vision AI', 'Socket.IO'],
    href: 'https://github.com/Rex-shark/fishing-work',
    to: '/projects/fishing-work',
  },
  {
    slug: 'pokemon-agent-pets',
    title: '寶可夢牧場 Agent',
    desc: '讓 AI agent 的工作狀態看得見的 3D 桌寵：每個 Claude Code／Codex session 認養一隻寶可夢，泡泡顏色與音效提醒等確認、出錯、做完。Electron + three.js。',
    tags: ['Claude Code Hooks', 'Electron', 'three.js'],
    href: 'https://github.com/Rex-shark/pokemon-agent-pets',
    to: '/projects/pokemon-agent-pets',
  },
  {
    slug: 'vrm-chat-widget',
    title: 'VRM Chat Widget',
    desc: '會聊天、會說話、有表情的 3D 虛擬角色：本機 Ollama 對話、TTS 語音回話與對嘴、whisper.cpp 語音輸入，依情緒換表情；有全畫面舞台版與可嵌入網頁的泡泡版。',
    tags: ['three-vrm', 'Ollama', 'TTS / STT'],
    href: 'https://github.com/Rex-shark/vrm-chat-widget',
    to: '/projects/vrm-chat-widget',
  },
]

/** 私人專案：repo 不公開，沒有 GitHub 連結，只有站內介紹頁 */
export type PrivateProject = Omit<Project, 'href'> & { href?: undefined }

export const privateProjects: PrivateProject[] = [
  {
    slug: 'codex-forge',
    title: 'codex-forge',
    desc: '把 AI 技術顧問接進需求討論群聊：擁有者 @小助手Lumi，Codex CLI 讀完整段討論與附件，回覆流程圖與可點的 HTML 原型；另有 Claude Code 驅動的 Live2D 貓。',
    tags: ['Spring Boot 4', 'Codex CLI', 'Claude Code'],
    to: '/projects/codex-forge',
  },
]

/** 正式首頁的精選專案：公開專案＋私人專案（風格實驗頁只列有 repo 的 projects） */
export const featuredProjects: (Project | PrivateProject)[] = [...projects, ...privateProjects]

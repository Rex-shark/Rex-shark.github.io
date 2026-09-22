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
  avatar: '/me.png',
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
    desc: '用 24 種不同設計風格實作的個人網站（即本站），最終選定 Finalist 為正式首頁。React 19 + Vite 8 + Tailwind v4，部署於 GitHub Pages。',
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
    slug: 'claude-code-sourcemap',
    title: 'Claude Code 原始碼研究',
    desc: '從 sourcemap 還原 Claude Code v2.1.88，拆解 6 層架構與 14 區塊 System Prompt 設計，整理成 5 篇深度筆記。非官方研究，版權歸 Anthropic。',
    tags: ['TypeScript', 'Research', 'AI Agent'],
    href: 'https://github.com/Rex-shark/claude-code-sourcemap',
    to: '/projects/claude-code-sourcemap',
  },
  {
    slug: 'ai-chatroom',
    title: 'ai-chatroom',
    desc: '真人與 AI 夥伴 Luna 🌙 同房即時聊天。Spring Boot 3 + Spring AI + WebSocket/STOMP，AI 以群組成員身分自主判斷回應或沉默。',
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
]

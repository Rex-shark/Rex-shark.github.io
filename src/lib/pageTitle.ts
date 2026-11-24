import { featuredProjects } from '@/data/profile'

/** 首頁標題；與 index.html 的 <title> 一致 */
export const SITE_TITLE = 'Rex · Java 全端工程師 / 系統分析師'

const SUFFIX = 'Rex'

/** 風格頁名稱：與設計實驗室（StyleGallery）卡片上的名稱一致，新增風格頁時一起補 */
const STYLE_NAMES: Record<string, string> = {
  'minimal-business': '簡約商務',
  'hand-drawn': '手繪插圖',
  cyberpunk: '賽博龐克',
  'japanese-minimal': '極簡日式',
  vaporwave: '蒸氣波',
  macbook: '蘋果風格',
  steampunk: '蒸汽龐克',
  'swiss-modern': '瑞士現代主義',
  'pixel-art': '像素藝術',
  'soft-ui': '柔和UI進化版',
  glassmorphism: '玻璃態',
  claymorphism: '黏土態',
  'micro-interactions': '微互動',
  'bento-grid': '便當盒網格',
  'spatial-ui': '空間 UI',
  'anti-polish': '反精緻美學',
  'ide-terminal': 'IDE / 終端機',
  'accessible-ethical': '無障礙倫理設計',
  'github-profile': 'GitHub 開發者檔案',
  'ai-native': 'AI 原生介面',
  editorial: '雜誌編輯排版',
  'glassmorphism-pink': '玻璃態・粉紅版',
  'soft-ui-pro': '柔和UI・加強版',
}

const STATIC_TITLES: Record<string, string> = {
  '/': SITE_TITLE,
  '/classic': `經典版首頁｜${SUFFIX}`,
  '/styles/finalist': `經典版首頁｜${SUFFIX}`,
  '/gallery': `設計實驗室｜${SUFFIX}`,
}

export const NOT_FOUND_TITLE = `找不到頁面｜${SUFFIX}`

/**
 * 依路徑決定分頁標題。
 * 回傳 null 表示該頁自己設定標題（設計範本 /templates 依版型與風格動態決定）。
 */
export function titleFor(pathname: string): string | null {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname

  if (path === '/templates' || path.startsWith('/templates/')) return null
  if (path in STATIC_TITLES) return STATIC_TITLES[path]

  if (path.startsWith('/projects/')) {
    const project = featuredProjects.find((p) => p.to === path)
    if (project) return `${project.title}｜精選專案｜${SUFFIX}`
  }

  if (path.startsWith('/styles/')) {
    const name = STYLE_NAMES[path.slice('/styles/'.length)]
    if (name) return `${name}｜設計實驗室｜${SUFFIX}`
  }

  return NOT_FOUND_TITLE
}

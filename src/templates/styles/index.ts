import { minimal } from './minimal'
import { glass } from './glass'
import { soft } from './soft'
import { tech } from './tech'
import { brutal } from './brutal'
import { enterprise } from './enterprise'
import { wabi } from './wabi'
import { luxury } from './luxury'
import { midcentury } from './midcentury'
import { planes } from './planes'
import { curio } from './curio'
import { dusk } from './dusk'
import { material } from './material'
import { metro } from './metro'
import { fluent } from './fluent'
import { skeuo } from './skeuo'
import { clay } from './clay'
import { aqua } from './aqua'
import { holo } from './holo'
import { nouveau } from './nouveau'
import { chrome } from './chrome'
import { glass2 } from './glass2'
import { enterprise2 } from './enterprise2'
import { wood } from './wood'
import type { StyleSlug, TplStyle } from './types'

export type { StyleSlug, TplStyle } from './types'

/** 風格清單（順序即工具列順序：亮色在前、暗色在後；第一個為預設） */
export const STYLES: TplStyle[] = [
  // 亮色
  minimal, enterprise, enterprise2, wabi, soft, brutal, glass, glass2, midcentury, planes, curio,
  material, metro, fluent, skeuo, wood, clay, aqua, holo, nouveau,
  // 暗色
  tech, luxury, dusk, chrome,
]

export const DEFAULT_STYLE: StyleSlug = 'minimal'

export function getStyle(slug: string | null | undefined): TplStyle {
  return STYLES.find((s) => s.slug === slug) ?? STYLES[0]
}

const loadedFonts = new Set<string>()

/** 注入 Google Fonts（同一網址只注入一次） */
export function ensureFonts(style: TplStyle) {
  const href = style.fontsHref
  if (!href || loadedFonts.has(href) || typeof document === 'undefined') return
  loadedFonts.add(href)
  if (!document.querySelector('link[data-tpl-fonts-preconnect]')) {
    for (const origin of ['https://fonts.googleapis.com', 'https://fonts.gstatic.com']) {
      const pre = document.createElement('link')
      pre.rel = 'preconnect'
      pre.href = origin
      if (origin.includes('gstatic')) pre.crossOrigin = ''
      pre.dataset.tplFontsPreconnect = ''
      document.head.appendChild(pre)
    }
  }
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  link.dataset.tplFonts = style.slug
  document.head.appendChild(link)
}

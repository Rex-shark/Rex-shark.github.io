#!/usr/bin/env node
/**
 * 設計範本規則檢查（npm run tpl:check）。純 Node，無外部套件。
 *
 * 1. 每份 spec/templates/styles/<slug>/DESIGN.md 的 colors，與 src/templates/styles/<slug>.ts 的 --tpl-* 變數一一相符
 * 2. src/templates/（viewer/ 除外）沒有視窗斷點 class（sm: md: lg: xl: 2xl:），只能用容器查詢 @…:
 * 3. src/templates/（viewer/ 除外）沒有 fixed 定位
 * 4. base-ui Portal 只能在 src/templates/ui/ 使用，且一定要傳 container
 * 5. 不可用 key={style…}（切換風格會清空狀態）
 * 6. 不可 import @/lib/utils（會把 tailwind-merge 拉進首頁 chunk），改用 src/templates/lib/cn.ts
 *
 * 自我測試時可用環境變數覆寫掃描路徑：TPL_CHECK_SRC、TPL_CHECK_SPEC
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(fileURLToPath(import.meta.url), '..', '..')
const SRC = process.env.TPL_CHECK_SRC ?? join(ROOT, 'src', 'templates')
const SPEC = process.env.TPL_CHECK_SPEC ?? join(ROOT, 'spec', 'templates', 'styles')

const errors = []
const fail = (file, line, msg) => errors.push(`${relative(ROOT, file)}${line ? `:${line}` : ''}  ${msg}`)

function walk(dir) {
  const out = []
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) out.push(...walk(p))
    else if (/\.(tsx?|mjs)$/.test(name)) out.push(p)
  }
  return out
}

// ── 1. DESIGN.md colors ↔ 風格檔 ────────────────────────────────
function parseDesignColors(md) {
  const fm = md.match(/^---\n([\s\S]*?)\n---/)
  if (!fm) return null
  const lines = fm[1].split('\n')
  const colors = {}
  let inColors = false
  for (const line of lines) {
    if (/^colors:\s*$/.test(line)) {
      inColors = true
      continue
    }
    if (inColors && /^\S/.test(line)) break
    const m = inColors && line.match(/^\s{2}([\w-]+):\s*"?([^"#\s][^"]*|#[0-9A-Fa-f]+)"?\s*$/)
    if (m) colors[m[1]] = m[2].trim()
  }
  // 解析 {colors.x} 參照
  for (const [k, v] of Object.entries(colors)) {
    const ref = v.match(/^\{colors\.([\w-]+)\}$/)
    if (ref) colors[k] = colors[ref[1]]
  }
  return colors
}

function parseStyleVars(ts) {
  const consts = Object.fromEntries([...ts.matchAll(/const\s+([A-Z_]+)\s*=\s*'([^']+)'/g)].map((m) => [m[1], m[2]]))
  // 只取 vars: { … } 區塊（不含 compactVars / reducedTransparencyVars）
  const start = ts.indexOf('  vars: {')
  const end = ts.indexOf('\n  },', start)
  const block = start >= 0 ? ts.slice(start, end) : ''
  const vars = {}
  for (const m of block.matchAll(/'--tpl-([\w-]+)':\s*(?:'([^']*)'|([A-Z_]+))/g)) {
    vars[m[1]] = m[2] ?? consts[m[3]]
  }
  return vars
}

if (existsSync(SPEC)) {
  for (const slug of readdirSync(SPEC)) {
    const mdPath = join(SPEC, slug, 'DESIGN.md')
    const tsPath = join(SRC, 'styles', `${slug}.ts`)
    if (!existsSync(mdPath)) continue
    if (!existsSync(tsPath)) {
      fail(tsPath, 0, `找不到風格檔（DESIGN.md 有 ${slug}）`)
      continue
    }
    const colors = parseDesignColors(readFileSync(mdPath, 'utf8'))
    if (!colors) {
      fail(mdPath, 0, '無法解析 frontmatter')
      continue
    }
    const vars = parseStyleVars(readFileSync(tsPath, 'utf8'))
    for (const [token, value] of Object.entries(colors)) {
      const got = vars[token]
      if (got === undefined) fail(tsPath, 0, `缺少 --tpl-${token}（DESIGN.md：${value}）`)
      else if (got.toLowerCase() !== String(value).toLowerCase()) fail(tsPath, 0, `--tpl-${token} 為 ${got}，DESIGN.md 為 ${value}`)
    }
  }
}

// ── 2–5. 原始碼規則 ─────────────────────────────────────────────
const VIEWPORT_BP = /(?<![\w@-])(?:max-)?(?:sm|md|lg|xl|2xl):[a-z0-9[(!-]/
const FIXED = /(?<![\w-])fixed(?![\w-])|position:\s*['"]fixed['"]/
const PORTAL = /<\w+\.Portal\b/
const KEY_STYLE = /key=\{\s*style\b/
const SITE_UTILS = /from\s+['"]@\/lib\/utils['"]/

for (const file of walk(SRC)) {
  const rel = relative(SRC, file).split(sep).join('/')
  const inViewer = rel.startsWith('viewer/')
  const inUi = rel.startsWith('ui/')
  const lines = readFileSync(file, 'utf8').split('\n')
  lines.forEach((line, i) => {
    const n = i + 1
    // 只把「行首或空白後的 //」當註解，避免把字串裡的網址（https://…）後面整段略過
    const code = line.replace(/(^|\s)\/\/.*$/, '').replace(/^\s*\*.*$/, '')
    if (!inViewer && VIEWPORT_BP.test(code)) fail(file, n, '使用了視窗斷點，範本內請改用容器查詢（@3xl: @5xl: @7xl:）')
    if (!inViewer && FIXED.test(code)) fail(file, n, '範本內禁止 fixed 定位，改用 sticky 或掛在 OverlayRoot 的 absolute')
    if (PORTAL.test(code)) {
      if (!inUi) fail(file, n, 'Portal 只能在 src/templates/ui/ 的共用元件內使用')
      else if (!/container=\{/.test(code)) fail(file, n, 'Portal 必須傳 container（OverlayRoot）')
    }
    if (KEY_STYLE.test(code)) fail(file, n, '禁止 key={style}：切換風格會清空狀態')
    if (SITE_UTILS.test(code)) fail(file, n, '不要 import @/lib/utils（會拉大首頁 bundle），改用 src/templates/lib/cn.ts')
  })
}

if (errors.length) {
  console.error(`✗ tpl:check 發現 ${errors.length} 個問題：\n`)
  for (const e of errors) console.error(`  ${e}`)
  process.exit(1)
}
console.log('✓ tpl:check 通過：DESIGN.md 色彩與風格檔一致、無視窗斷點、無 fixed、Portal 皆指定 container、無 key={style}、未引用 @/lib/utils')

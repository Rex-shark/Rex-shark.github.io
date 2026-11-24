import { useEffect } from 'react'
import { Link } from 'react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { STYLES } from '../styles'
import { TEMPLATES } from '../registry'

const STATUS_LABEL = { ready: null, building: '建置中', planned: '規劃中' } as const

/** /templates 總覽頁：中性樣式，不套任何範本風格，避免干擾客戶判斷 */
export default function TemplatesHome() {
  useEffect(() => {
    document.title = '設計範本｜Rex'
  }, [])

  const listed = TEMPLATES.filter((t) => !t.hidden)

  return (
    <div className="min-h-dvh bg-zinc-50 font-sans text-zinc-800">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900">
            <ArrowLeft size={15} />
            回首頁
          </Link>
          <span className="text-sm font-semibold text-zinc-900">設計範本</span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-14">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">設計範本</h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-zinc-600">
          同一份內容、同一套功能，切換不同設計風格比較。挑一個版型開始，進去後用底部工具列切換風格與裝置寬度。
        </p>

        <section aria-labelledby="tpl-templates" className="mt-12">
          <h2 id="tpl-templates" className="text-sm font-semibold text-zinc-500">
            版型
          </h2>
          <ul className="mt-4 grid gap-4 md:grid-cols-3">
            {listed.map((t) => {
              const status = STATUS_LABEL[t.status]
              const enterable = t.status !== 'planned'
              return (
                <li key={t.slug} className="flex flex-col rounded-xl border border-zinc-200 bg-white p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold text-zinc-900">{t.name}</h3>
                    {status && <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">{status}</span>}
                  </div>
                  <p className="mt-1 text-xs text-zinc-500">{t.scenario}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600">{t.description}</p>
                  {enterable ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {STYLES.map((s) => (
                        <Link
                          key={s.slug}
                          to={`/templates/${t.slug}?style=${s.slug}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:border-zinc-900 hover:text-zinc-900"
                        >
                          <span className="size-2.5 rounded-full ring-1 ring-black/10" style={{ backgroundColor: s.meta.swatches[1] }} aria-hidden />
                          {s.meta.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-5 text-xs text-zinc-400">尚未開放</p>
                  )}
                </li>
              )
            })}
          </ul>
        </section>

        <section aria-labelledby="tpl-styles" className="mt-14">
          <h2 id="tpl-styles" className="text-sm font-semibold text-zinc-500">
            風格
          </h2>
          <ul className="mt-4 divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white">
            {STYLES.map((s) => (
              <li key={s.slug} className="flex flex-col gap-3 p-5 md:flex-row md:items-center">
                <div className="flex shrink-0 gap-1" aria-hidden>
                  {s.meta.swatches.map((c) => (
                    <span key={c} className="size-6 rounded-md ring-1 ring-black/10" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <div className="flex-1 md:ml-3">
                  <p className="font-semibold text-zinc-900">
                    {s.meta.name} <span className="ml-1 text-xs font-normal text-zinc-500">{s.meta.nameEn}</span>
                  </p>
                  <p className="mt-0.5 text-sm text-zinc-600">{s.meta.tagline}</p>
                </div>
                <Link
                  to={`/templates/dashboard?style=${s.slug}`}
                  className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-zinc-700 hover:text-zinc-900"
                >
                  看範例 <ArrowRight size={14} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}

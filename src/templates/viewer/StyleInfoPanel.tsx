import { useEffect, useState } from 'react'
import { Check, Copy, X } from 'lucide-react'
import type { TplStyle } from '../styles'

interface StyleInfoPanelProps {
  style: TplStyle
  onClose: () => void
}

/** 風格說明側欄（中性樣式）：定位、適合產業、色票、字體，可複製 DESIGN.md 全文 */
export default function StyleInfoPanel({ style, onClose }: StyleInfoPanelProps) {
  const [doc, setDoc] = useState<{ slug: string; text: string } | null>(null)
  const [showDoc, setShowDoc] = useState(false)
  const [copy, setCopy] = useState<'idle' | 'done' | 'error'>('idle')

  useEffect(() => {
    let alive = true
    style.loadDesignDoc().then((text) => alive && setDoc({ slug: style.slug, text }))
    return () => {
      alive = false
    }
  }, [style])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const text = doc?.slug === style.slug ? doc.text : null

  async function copyDoc() {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setCopy('done')
    } catch {
      setCopy('error')
    }
    setTimeout(() => setCopy('idle'), 2000)
  }

  return (
    <aside
      aria-label={`${style.meta.name} 風格說明`}
      className="absolute top-0 right-0 bottom-0 z-[70] flex w-full max-w-sm flex-col border-l border-zinc-200 bg-white font-sans text-zinc-800 shadow-2xl"
    >
      <header className="flex items-start justify-between gap-4 border-b border-zinc-200 p-5">
        <div>
          <p className="text-xs font-medium tracking-wide text-zinc-500">{style.meta.nameEn}</p>
          <h2 className="mt-0.5 text-xl font-semibold text-zinc-900">{style.meta.name}</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="關閉風格說明"
          className="inline-flex size-9 cursor-pointer items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-zinc-900"
        >
          <X size={18} />
        </button>
      </header>

      <div className="flex-1 space-y-6 overflow-y-auto p-5 text-sm leading-relaxed">
        <p className="text-zinc-700">{style.meta.tagline}</p>

        <section>
          <h3 className="mb-2 font-semibold text-zinc-900">適合推薦給</h3>
          <ul className="flex flex-wrap gap-1.5">
            {style.meta.suitableFor.map((s) => (
              <li key={s} className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-700">
                {s}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="mb-2 font-semibold text-zinc-900">主要色票</h3>
          <ul className="grid grid-cols-2 gap-2">
            {style.meta.swatches.map((c) => (
              <li key={c} className="flex items-center gap-2">
                <span className="size-8 shrink-0 rounded-md ring-1 ring-black/10" style={{ backgroundColor: c }} />
                <code className="text-xs text-zinc-600">{c}</code>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="mb-1 font-semibold text-zinc-900">字體</h3>
          <p className="text-zinc-700">{style.meta.fontsLabel}</p>
        </section>

        <section>
          <h3 className="mb-1 font-semibold text-zinc-900">設計規範 DESIGN.md</h3>
          <p className="mb-3 text-zinc-600">Google design.md 格式。客戶選定後可直接帶進專案，當作設計規範的起點。</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={copyDoc}
              disabled={!text}
              className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg bg-zinc-900 px-3 font-medium text-white hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
            >
              {copy === 'done' ? <Check size={16} /> : <Copy size={16} />}
              {copy === 'done' ? '已複製' : copy === 'error' ? '複製失敗' : '複製全文'}
            </button>
            <button
              type="button"
              onClick={() => setShowDoc((v) => !v)}
              aria-expanded={showDoc}
              className="inline-flex h-9 cursor-pointer items-center rounded-lg px-3 font-medium text-zinc-700 ring-1 ring-zinc-300 hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
            >
              {showDoc ? '收合全文' : '展開全文'}
            </button>
          </div>
          {showDoc && (
            <pre className="mt-3 max-h-96 overflow-auto rounded-lg bg-zinc-50 p-3 text-[11px] leading-snug whitespace-pre-wrap text-zinc-700 ring-1 ring-zinc-200">
              {text ?? '載入中…'}
            </pre>
          )}
        </section>
      </div>
    </aside>
  )
}

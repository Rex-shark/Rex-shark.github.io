import { Link, useLocation } from 'react-router'
import { ArrowLeft } from 'lucide-react'

/** 找不到頁面：打錯網址或連結失效時顯示，配色沿用牌桌首頁的深色底 */
export default function NotFound() {
  const { pathname } = useLocation()

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-[#1c2027] px-6 py-16 text-center text-[#e9edf3]">
      <p className="text-sm font-semibold tracking-[0.3em] text-[#8ab0ff]">404</p>
      <h1 className="mt-4 text-3xl font-bold sm:text-4xl">這張牌不在牌組裡</h1>
      <p className="mt-4 max-w-md leading-relaxed text-[#a8b1bf]">
        找不到 <code className="break-all rounded bg-white/10 px-1.5 py-0.5 text-sm text-[#e9edf3]">{pathname}</code>{' '}
        這個頁面，可能是網址打錯，或頁面已經搬走了。
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-[#8ab0ff] px-5 py-2.5 text-sm font-semibold text-[#1a1e26] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8ab0ff]"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          回牌桌首頁
        </Link>
        <Link
          to="/classic"
          className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8ab0ff]"
        >
          看經典版首頁
        </Link>
      </div>
    </main>
  )
}

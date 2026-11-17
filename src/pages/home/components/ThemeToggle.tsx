import type { DeckTheme } from '../content/theme'

/** 深淺切換開關：凹進去的軌道＋凸起的圓鈕，圓鈕裡是月亮／太陽 */
export default function ThemeToggle({ theme, onChange }: { theme: DeckTheme; onChange: (t: DeckTheme) => void }) {
  const light = theme === 'light'
  return (
    <button
      type="button"
      role="switch"
      aria-checked={light}
      aria-label="淺色模式"
      title={light ? '切換成深色' : '切換成淺色'}
      onClick={() => onChange(light ? 'dark' : 'light')}
      className="theme-track relative h-8 w-[60px] shrink-0 cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deck-accent"
    >
      <span
        className={`theme-knob absolute top-1 left-1 grid h-6 w-6 place-items-center rounded-full text-deck-accent transition-transform duration-300 ${light ? 'translate-x-7' : ''}`}
      >
        {light ? <SunIcon /> : <MoonIcon />}
      </span>
    </button>
  )
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

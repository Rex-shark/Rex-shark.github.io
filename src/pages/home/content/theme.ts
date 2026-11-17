export type DeckTheme = 'dark' | 'light'

const KEY = 'card-deck-theme'

/** 牌桌記住的深淺主題（預設深色）；只作用在牌桌外框，不動 <html> */
export function readDeckTheme(): DeckTheme {
  try {
    return localStorage.getItem(KEY) === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

export function saveDeckTheme(theme: DeckTheme) {
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    // 無痕模式等情況存不了，就只在這次瀏覽有效
  }
}


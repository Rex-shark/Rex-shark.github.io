import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { MouseEvent } from "react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 攔截錨點 <a href="#xxx"> 的點擊，改用 scrollIntoView。
 * 因為網站走 HashRouter，瀏覽器預設行為會把 hash 當路由導航而失效。
 */
export function handleHashClick(e: MouseEvent<HTMLAnchorElement>) {
  const href = e.currentTarget.getAttribute("href")
  if (!href?.startsWith("#") || href.length < 2) return
  e.preventDefault()
  document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" })
}

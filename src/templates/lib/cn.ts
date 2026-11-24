import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 範本專用的 class 合併。刻意不共用 @/lib/utils 的 cn()：
 * 那個模組首頁也會載入，範本一用到 cn 就會把 tailwind-merge（約 29KB）拉進首頁 bundle。
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

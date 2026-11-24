import { createContext, useContext } from 'react'
import type { TplStyle } from '../styles'

export type Device = 'desktop' | 'tablet' | 'mobile'

export const DEVICE_WIDTH: Record<Device, number | null> = {
  desktop: null,
  tablet: 768,
  mobile: 375,
}

export interface TplFrameContext {
  style: TplStyle
  /** 浮層掛載點（Portal container）；首次 render 時為 null */
  overlayRoot: HTMLElement | null
  /** 範本自己的捲動容器（取代 window） */
  scrollEl: HTMLElement | null
  /** 外框寬度 < 768px */
  compact: boolean
  /** 切換到其他版型（保留目前風格） */
  goToTemplate: (slug: string) => void
}

export const TplContext = createContext<TplFrameContext | null>(null)

function useTplContext(): TplFrameContext {
  const ctx = useContext(TplContext)
  if (!ctx) throw new Error('範本元件必須放在 DeviceFrame 內')
  return ctx
}

export const useTplStyle = () => useTplContext().style
export const useTplOverlayRoot = () => useTplContext().overlayRoot
export const useTplScroll = () => useTplContext().scrollEl
export const useTplCompact = () => useTplContext().compact
export const useTplNavigate = () => useTplContext().goToTemplate

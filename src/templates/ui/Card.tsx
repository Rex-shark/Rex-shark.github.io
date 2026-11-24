import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/cn'
import { heading, muted, panel } from './classes'

interface CardProps extends HTMLAttributes<HTMLElement> {
  /** 是否加內距（表格等滿版內容可關閉） */
  padded?: boolean
  /** 可互動卡片：hover 時面板變亮（不位移） */
  interactive?: boolean
  as?: 'div' | 'section' | 'article' | 'li'
}

/** 卡片／面板：材質取自 --tpl-panel-*（簡約細線、玻璃毛玻璃、柔和凸起） */
export function Card({ padded = true, interactive, as: Tag = 'div', className, children, ...rest }: CardProps) {
  return (
    <Tag
      className={cn(
        'min-w-0 rounded-(--tpl-card-radius) text-(--tpl-on-surface)',
        panel,
        padded && 'p-5 @3xl:p-6',
        interactive && 'transition-[background-color,border-color] duration-150 hover:border-(--tpl-outline-strong) hover:bg-(--tpl-panel-hover-bg)',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** 卡片標題列：標題＋右側動作 */
export function CardHeader({ title, description, action, className }: { title: ReactNode; description?: ReactNode; action?: ReactNode; className?: string }) {
  return (
    <div className={cn('mb-4 flex items-start justify-between gap-3', className)}>
      <div className="min-w-0">
        <h2 className={cn('text-base', heading)}>{title}</h2>
        {description && <p className={cn('mt-0.5 text-[13px]', muted)}>{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

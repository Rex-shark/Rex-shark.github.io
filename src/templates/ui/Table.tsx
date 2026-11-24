import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../lib/cn'
import { focusRing, labelWeight, muted, numeric } from './classes'

/** 表格：放在 Card padded={false} 內使用 */
export function Table({ className, children, ...rest }: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={cn('w-full border-collapse text-sm', className)} {...rest}>
        {children}
      </table>
    </div>
  )
}

export function THead({ children }: { children: ReactNode }) {
  return <thead className="bg-(--tpl-table-header-bg)">{children}</thead>
}

interface THProps extends ThHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'right' | 'center'
}

export function TH({ align = 'left', className, children, ...rest }: THProps) {
  return (
    <th
      scope="col"
      className={cn(
        'h-11 border-b border-(--tpl-outline) px-4 text-[13px] whitespace-nowrap text-(--tpl-table-header-fg)',
        labelWeight,
        align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left',
        className,
      )}
      {...rest}
    >
      {children}
    </th>
  )
}

export type SortDir = 'asc' | 'desc'

interface SortTHProps {
  label: ReactNode
  active: boolean
  dir: SortDir
  onSort: () => void
  align?: 'left' | 'right'
}

/** 可排序表頭：點擊切換升冪／降冪，aria-sort 同步 */
export function SortTH({ label, active, dir, onSort, align = 'left' }: SortTHProps) {
  const Icon = !active ? ArrowUpDown : dir === 'asc' ? ArrowUp : ArrowDown
  return (
    <TH align={align} aria-sort={active ? (dir === 'asc' ? 'ascending' : 'descending') : 'none'}>
      <button
        type="button"
        onClick={onSort}
        className={cn(
          'inline-flex cursor-pointer items-center gap-1 rounded-(--tpl-radius-sm) hover:text-(--tpl-on-surface)',
          active && 'text-(--tpl-on-surface)',
          align === 'right' && 'flex-row-reverse',
          focusRing,
        )}
      >
        {label}
        <Icon size={13} aria-hidden className={active ? undefined : 'opacity-50'} />
      </button>
    </TH>
  )
}

interface TRProps extends HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean
  clickable?: boolean
}

export function TR({ selected, clickable, className, children, ...rest }: TRProps) {
  return (
    <tr
      aria-selected={selected || undefined}
      className={cn(
        'border-b border-(--tpl-outline) transition-colors last:border-b-0',
        clickable && 'cursor-pointer hover:bg-(--tpl-row-hover-bg)',
        selected && 'bg-(--tpl-selected-bg) text-(--tpl-selected-fg) hover:bg-(--tpl-selected-bg)',
        className,
      )}
      {...rest}
    >
      {children}
    </tr>
  )
}

interface TDProps extends TdHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'right' | 'center'
  num?: boolean
}

export function TD({ align = 'left', num, className, children, ...rest }: TDProps) {
  return (
    <td
      className={cn(
        'h-(--tpl-row-h) px-4 align-middle',
        align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left',
        num && numeric,
        className,
      )}
      {...rest}
    >
      {children}
    </td>
  )
}

interface PaginationProps {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
  className?: string
}

/** 分頁：顯示「第 1–5 筆，共 12 筆」＋上一頁／頁碼／下一頁 */
export function Pagination({ page, pageSize, total, onPageChange, className }: PaginationProps) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(total, page * pageSize)
  const btn = cn(
    'inline-flex size-8 cursor-pointer items-center justify-center rounded-(--tpl-radius-sm) text-[13px] transition-colors hover:bg-(--tpl-ghost-hover-bg) disabled:cursor-not-allowed disabled:text-(--tpl-on-disabled) disabled:hover:bg-transparent',
    numeric,
    focusRing,
  )
  return (
    <nav aria-label="分頁" className={cn('flex flex-wrap items-center justify-between gap-3', className)}>
      <p className={cn('text-[13px]', muted, numeric)}>
        第 {from}–{to} 筆，共 {total} 筆
      </p>
      <div className="flex items-center gap-1">
        <button type="button" className={btn} onClick={() => onPageChange(page - 1)} disabled={page <= 1} aria-label="上一頁">
          <ChevronLeft size={16} />
        </button>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            aria-current={p === page ? 'page' : undefined}
            aria-label={`第 ${p} 頁`}
            className={cn(btn, p === page && 'bg-(--tpl-chip-selected-bg) text-(--tpl-chip-selected-fg) hover:bg-(--tpl-chip-selected-bg)')}
          >
            {p}
          </button>
        ))}
        <button type="button" className={btn} onClick={() => onPageChange(page + 1)} disabled={page >= pageCount} aria-label="下一頁">
          <ChevronRight size={16} />
        </button>
      </div>
    </nav>
  )
}

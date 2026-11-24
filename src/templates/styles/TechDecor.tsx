/**
 * 暗色科技背景：48px 細格線＋頂部極淡的萊姆綠光暈。純裝飾（不含文字、不可互動），
 * 固定在外框內不隨內容捲動；窄螢幕時整體降低亮度（--tpl-decor-opacity）。
 */
export default function TechDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-[var(--tpl-decor-opacity,1)]">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'linear-gradient(var(--tpl-outline) 1px, transparent 1px), linear-gradient(90deg, var(--tpl-outline) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 0%, #000 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 0%, #000 40%, transparent 100%)',
        }}
      />
      <div className="absolute -top-[30%] left-1/2 h-[60cqw] w-[90cqw] -translate-x-1/2 rounded-full bg-(--tpl-primary) opacity-[0.06] blur-[120px]" />
    </div>
  )
}

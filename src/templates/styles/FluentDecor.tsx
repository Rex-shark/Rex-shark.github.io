/**
 * Fluent 背景：極淡的藍紫色雲霧（Mica 材質意象），只在畫布、不影響文字對比。
 * 純裝飾（不含文字、不可互動），固定在外框內。
 */
export default function FluentDecor() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          'radial-gradient(ellipse 60% 50% at 0% 0%, rgba(15,108,189,0.07), transparent 70%), radial-gradient(ellipse 50% 45% at 100% 100%, rgba(135,100,184,0.06), transparent 70%)',
      }}
    />
  )
}

/**
 * Глобальная фоновая текстура — тонкое тёплое свечение + film grain.
 * Не gradient mesh, не purple/cyan. Только bone-warm warmth + signal-red внизу.
 */
export default function CanvasBg() {
  return (
    <>
      <div className="canvas-bg" aria-hidden />
      <div className="canvas-grain" aria-hidden />
    </>
  );
}

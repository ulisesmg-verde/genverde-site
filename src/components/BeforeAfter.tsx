import { useEffect, useRef, useState, type PointerEvent as RPointerEvent } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BEFORE_AFTER, imgMd, type BeforeAfter } from '../data/site';

// "Antes y después": el texto lleva el peso principal; las fotos van en un carrusel de tarjetas
// (84 % de su columna, ~560 px en escritorio) para mostrarse a su resolución nativa.
// Se avanza con las flechas, con un clic en la foto, deslizando con el dedo, con el scroll
// horizontal del trackpad o arrastrando con el mouse (scroll-snap nativo).
export default function BeforeAfterSection({ service, dark = false, title = 'Antes y después' }: { service?: string; dark?: boolean; title?: string }) {
  const items: BeforeAfter[] = service ? BEFORE_AFTER.filter((b) => b.services.includes(service)) : BEFORE_AFTER;
  const [i, setI] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  const step = () => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    return card ? card.offsetWidth + 16 : 1;
  };
  const goTo = (k: number) => {
    const n = (k + items.length) % items.length;
    track.current?.scrollTo({ left: n * step(), behavior: 'smooth' });
    setI(n);
  };

  // El índice sigue a la posición real del scroll (dedo, trackpad, arrastre).
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let t = 0;
    const on = () => { cancelAnimationFrame(t); t = requestAnimationFrame(() => setI(Math.min(items.length - 1, Math.round(el.scrollLeft / step())))); };
    el.addEventListener('scroll', on, { passive: true });
    return () => { el.removeEventListener('scroll', on); cancelAnimationFrame(t); };
  }, [items.length]);

  // Arrastre con mouse en escritorio (en táctil el navegador ya desliza solo).
  const onDown = (e: RPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !track.current) return;
    drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false };
    track.current.style.scrollSnapType = 'none';
  };
  const onMove = (e: RPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || !track.current) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 5) d.moved = true;
    track.current.scrollLeft = d.left - dx;
  };
  const onUp = () => {
    const d = drag.current;
    if (!d || !track.current) return;
    const el = track.current;
    if (d.moved) {
      const dx = el.scrollLeft - d.left;
      const base = Math.round(d.left / step());
      goTo(Math.max(0, Math.min(items.length - 1, Math.abs(dx) > step() * 0.15 ? base + Math.sign(dx) : base)));
      // Reactivar el snap cuando termine el desplazamiento suave (si no, regresa a la foto anterior).
      setTimeout(() => { el.style.scrollSnapType = ''; }, 600);
    } else {
      el.style.scrollSnapType = '';
    }
    setTimeout(() => { drag.current = null; }, 0);
  };
  const onCardClick = (k: number) => {
    if (drag.current?.moved) return; // fue un arrastre, no un clic
    goTo(k === i ? i + 1 : k);
  };

  if (!items.length) return null;
  const cur = items[i];
  const muted = dark ? 'text-piedra/70' : 'text-grafito/70';

  return (
    <section className={`relative z-30 overflow-hidden px-6 py-24 md:px-10 lg:px-16 ${dark ? 'bg-noche text-white' : 'bg-papel text-grafito'}`} {...(dark ? { 'data-nav-dark': true } : {})} aria-labelledby="antes-despues">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* Texto */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-hoja">Fotos reales de obra</p>
          <h2 id="antes-despues" className="mt-3 font-display text-[clamp(32px,4vw,56px)] font-extrabold leading-[1] tracking-[-0.03em]">
            {title}<span className="text-hoja">.</span>
          </h2>
          <div aria-live="polite" className="mt-8 min-h-[150px]">
            <p className={`font-display text-sm font-bold ${muted}`}>{String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</p>
            <h3 className="mt-2 font-display text-[clamp(22px,2.2vw,30px)] font-bold leading-tight">{cur.title}</h3>
            <p className={`mt-3 max-w-md text-[17px] leading-relaxed ${muted}`}>{cur.text}</p>
          </div>
          {items.length > 1 && (
            <div className="mt-6 flex items-center gap-3">
              <button onClick={() => goTo(i - 1)} aria-label="Anterior" className={`flex h-12 w-12 items-center justify-center rounded-full border ${dark ? 'border-white/25 hover:bg-white/10' : 'border-grafito/25 hover:bg-white'}`}><ArrowLeft size={18} /></button>
              <button onClick={() => goTo(i + 1)} aria-label="Siguiente" className="flex h-12 w-12 items-center justify-center rounded-full bg-hoja text-white hover:bg-bosque"><ArrowRight size={18} /></button>
              <span className={`ml-2 text-xs ${muted}`}>Desliza o toca la foto para ver la siguiente</span>
            </div>
          )}
        </div>

        {/* Carrusel de tarjetas */}
        <div className="relative min-w-0">
          <div
            ref={track}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerLeave={onUp}
            className="no-scrollbar flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain rounded-2xl active:cursor-grabbing"
            style={{ touchAction: 'pan-x pan-y' }}
          >
            {items.map((b, k) => (
              <button
                key={b.image}
                onClick={() => onCardClick(k)}
                aria-label={k === i ? `${b.title} — siguiente foto` : b.title}
                className={`w-[84%] shrink-0 snap-start overflow-hidden rounded-2xl text-left transition-[opacity,transform] duration-500 ${k === i ? 'opacity-100' : 'scale-[0.94] opacity-40 hover:opacity-60'}`}
              >
                <img src={imgMd(b.image)} alt={`Antes y después: ${b.title} — Generación Verde`} width={1201} height={721} draggable={false} className="pointer-events-none aspect-[1201/721] w-full select-none object-cover" loading="lazy" />
              </button>
            ))}
            <div className="w-[16%] shrink-0" aria-hidden />
          </div>
          <div className="mt-5 flex gap-2">
            {items.map((b, k) => (
              <button key={b.image} onClick={() => goTo(k)} aria-label={`Ir a ${b.title}`} className={`h-1.5 rounded-full transition-all ${k === i ? 'w-8 bg-hoja' : `w-3 ${dark ? 'bg-white/25' : 'bg-grafito/20'}`}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

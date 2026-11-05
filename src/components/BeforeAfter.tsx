import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BEFORE_AFTER, imgMd, type BeforeAfter } from '../data/site';

// "Antes y después": el texto tiene el peso principal y las fotos van en un carrusel de tarjetas
// de tamaño moderado (84 % de su columna, ~560 px en escritorio), así se muestran a su resolución nativa y no se ven borrosas.
export default function BeforeAfterSection({ service, dark = false, title = 'Antes y después' }: { service?: string; dark?: boolean; title?: string }) {
  const items: BeforeAfter[] = service ? BEFORE_AFTER.filter((b) => b.services.includes(service)) : BEFORE_AFTER;
  const [i, setI] = useState(0);
  if (!items.length) return null;
  const cur = items[i];
  const go = (d: number) => setI((i + d + items.length) % items.length);
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
            <div className="mt-6 flex gap-3">
              <button onClick={() => go(-1)} aria-label="Anterior" className={`flex h-12 w-12 items-center justify-center rounded-full border ${dark ? 'border-white/25 hover:bg-white/10' : 'border-grafito/25 hover:bg-white'}`}><ArrowLeft size={18} /></button>
              <button onClick={() => go(1)} aria-label="Siguiente" className="flex h-12 w-12 items-center justify-center rounded-full bg-hoja text-white hover:bg-bosque"><ArrowRight size={18} /></button>
            </div>
          )}
        </div>

        {/* Carrusel de tarjetas */}
        <div className="relative min-w-0">
          <div className="overflow-hidden rounded-2xl">
          <div className="flex gap-4 transition-transform duration-500 ease-[cubic-bezier(.4,0,.2,1)]" style={{ transform: `translateX(calc(${-i} * (84% + 16px)))` }}>
            {items.map((b, k) => (
              <button
                key={b.image}
                onClick={() => setI(k)}
                aria-label={b.title}
                className={`shrink-0 overflow-hidden rounded-2xl text-left transition-all duration-500 ${k === i ? 'opacity-100' : 'scale-[0.94] opacity-40 hover:opacity-60'}`}
                style={{ width: '84%' }}
              >
                <img src={imgMd(b.image)} alt={`Antes y después: ${b.title} — Generación Verde`} width={1201} height={721} className="aspect-[1201/721] w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
          </div>
          <div className="mt-5 flex gap-2" aria-hidden>
            {items.map((b, k) => <span key={b.image} className={`h-1 rounded-full transition-all ${k === i ? 'w-8 bg-hoja' : `w-3 ${dark ? 'bg-white/25' : 'bg-grafito/20'}`}`} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

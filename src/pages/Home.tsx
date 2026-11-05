import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, MessageCircle, Droplets, PencilRuler, Sprout, Wrench } from 'lucide-react';
import { Link } from '../router';
import { CLIENTS, PROJECTS, SERVICES, img, imgMd, waLink } from '../data/site';
import BeforeAfterSection from '../components/BeforeAfter';
import { CtaBand, FaqList, Page, faqLd, useSeo } from '../components/Layout';

const BRAND = '#204f24';
const FULL_TEXT = 'Generación verde.';
const HERO_IMG = 'edificio-jardin-vertical'; // PNG recortado (cielo transparente)
const SKY_IMG = 'cielo';
const APEX_ROW = 60; // primera fila opaca (techo) del PNG de 1920×1080
const GAP_BELOW_TITLE = 10; // px entre la línea base del titular y el techo del edificio
const CHAR_INTERVAL = 70;
const TYPE_START = 500;

const reduceMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const seenIntro = () => { try { return sessionStorage.getItem('gv-intro') === '1'; } catch { return false; } };
const markIntro = () => { try { sessionStorage.setItem('gv-intro', '1'); } catch { /* sin almacenamiento */ } };

const HOME_FAQS = [
  { q: '¿Qué servicios ofrece Generación Verde?', a: 'Diseño, instalación y mantenimiento de jardines verticales (muros verdes), azoteas verdes, paisajismo y jardinería para residencias, desarrollos, corporativos y hoteles.' },
  { q: '¿Dónde trabajan?', a: 'Tenemos oficinas en Ciudad de México, Guadalajara y Mérida, y atendemos proyectos en Estado de México y Cuernavaca.' },
  { q: '¿Cómo empieza un proyecto?', a: 'Con una visita técnica: medimos, revisamos luz, estructura y riego, y entregamos tres propuestas de diseño con costo de instalación y de mantenimiento.' },
  { q: '¿Dan mantenimiento a jardines que no instalaron?', a: 'Sí. Hacemos un diagnóstico, rescatamos el muro si hace falta y después lo integramos a una póliza de mantenimiento.' },
];

/* ---------- Contador animado ---------- */
function CountUp({ end, suffix = '', prefix = '' }: { end: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduceMotion()) { setVal(end); return; }
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - t0) / 2000, 1);
        setVal(Math.round((1 - Math.pow(1 - t, 3)) * end));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [end]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

export default function Home() {
  useSeo(
    'Jardines verticales, muros verdes y azoteas verdes | Generación Verde',
    'Diseñamos, instalamos y damos mantenimiento a jardines verticales, muros verdes, azoteas verdes y paisajismo en CDMX, Guadalajara y Mérida. Desde 2010, +250 proyectos.',
    faqLd(HOME_FAQS),
  );

  const skip = useRef(reduceMotion() || seenIntro()).current;
  const [typed, setTyped] = useState(skip ? FULL_TEXT.length : 0);
  const [cursor, setCursor] = useState(!skip);
  const [lifting, setLifting] = useState(skip);
  const [heroIn, setHeroIn] = useState(skip);
  const [liftDone, setLiftDone] = useState(skip);

  const heroRef = useRef<HTMLElement>(null);
  const darkWrapRef = useRef<HTMLDivElement>(null);
  const houseRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const baselineRef = useRef<HTMLSpanElement>(null);

  /* Preloader: escribe la marca y se levanta */
  useEffect(() => {
    if (skip) return;
    document.body.style.overflow = 'hidden';
    const n = FULL_TEXT.length;
    const LIFT_AT = TYPE_START + n * CHAR_INTERVAL + 600;
    const timers: number[] = [];
    for (let i = 0; i < n; i++) timers.push(window.setTimeout(() => setTyped(i + 1), TYPE_START + i * CHAR_INTERVAL));
    timers.push(window.setTimeout(() => setCursor(false), LIFT_AT - 150));
    timers.push(window.setTimeout(() => setLifting(true), LIFT_AT));
    timers.push(window.setTimeout(() => setHeroIn(true), LIFT_AT + 1100));
    timers.push(window.setTimeout(() => { setLiftDone(true); document.body.style.overflow = ''; markIntro(); }, LIFT_AT + 1900));
    return () => { timers.forEach(clearTimeout); document.body.style.overflow = ''; };
  }, [skip]);

  /* El edificio se coloca 10 px debajo de la línea base de “ARQUITECTURA VIVA.” y su borde
     inferior define el alto del hero. Vive dentro del hero, así que nunca aparece en otra sección. */
  const updateHouse = useCallback(() => {
    const el = houseRef.current, hero = heroRef.current, mark = baselineRef.current;
    if (!el || !hero || !mark) return;
    const vw = window.innerWidth;
    const mobile = vw < 768;
    const baseW = mobile ? Math.max(vw * 1.8, 640) : Math.max(vw, 1400);
    const imgH = baseW * (1080 / 1920);
    const roofOffset = imgH * (APEX_ROW / 1080); // transparencia arriba del techo en el PNG
    // Línea base del titular medida con offsetTop (ignora la animación de entrada).
    let baseline = 0;
    for (let n: HTMLElement | null = mark; n && n !== hero; n = n.offsetParent as HTMLElement | null) baseline += n.offsetTop;
    const top = baseline + GAP_BELOW_TITLE - roofOffset;
    el.style.width = `${baseW}px`;
    el.style.height = `${imgH}px`;
    el.style.left = `${(vw - baseW) / 2}px`;
    el.style.top = `${top}px`;
    hero.style.height = `${Math.round(top + imgH)}px`;
  }, []);

  useEffect(() => {
    updateHouse();
    document.fonts?.ready.then(updateHouse);
    window.addEventListener('resize', updateHouse);
    return () => window.removeEventListener('resize', updateHouse);
  }, [updateHouse]);

  const GALLERY_SLUGS = ['muro-verde-hotel-oficinas', 'jardin-vertical-instituto', 'jardin-vertical-azotea-verde-condominio', 'muro-verde-escuela-militar', 'jardin-vertical-empresa'];
  const gallery = GALLERY_SLUGS.map((slug) => PROJECTS.find((p) => p.slug === slug)!).filter(Boolean);

  return (
    <Page>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .ticker-track { animation: ticker 60s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .ticker-track { animation: none; } }
        .hero-text-block { padding-top: calc(26vh - 40px); }
        .gallery-expand-row { display:flex; gap:6px; height:70%; width:100%; max-width:1200px; }
        .gallery-expand-item { flex:1 1 0%; height:100%; border-radius:12px; overflow:hidden; position:relative; transition:flex .5s cubic-bezier(.4,0,.2,1); }
        .gallery-expand-item:hover { flex:4; }
        .gallery-expand-item .cap { opacity:0; transform:translateY(8px); transition:all .35s ease .1s; }
        .gallery-expand-item:hover .cap { opacity:1; transform:none; }
        .s2-statement { white-space: nowrap; }
        /* Tamaños medidos con Plus Jakarta Sans 800: “Arquitectura viva.” = 8.32em, “Jardines verticales,” = 8.84em. */
        @media (max-width: 639px) {
          .hero-subtitle-desktop { display:none !important; } .hero-subtitle-mobile { display:none !important; }
          .hero-text-block { padding-top: 96px; }
          .hero-own-the { font-size: calc((100vw - 48px) / 12) !important; }
          .hero-extraordinary { font-size: calc((100vw - 48px) / 8.6) !important; white-space: nowrap !important; line-height: 1 !important; }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .hero-subtitle-desktop { display:none !important; } .hero-subtitle-mobile { display:block !important; }
          .hero-text-block { padding-top: 120px; }
          .hero-own-the { font-size: calc((100vw - 80px) / 13) !important; }
          .hero-extraordinary { font-size: calc((100vw - 80px) / 8.6) !important; white-space: nowrap !important; line-height: 1 !important; }
        }
        @media (min-width: 640px) and (max-width: 767px) { .hero-subtitle-mobile { display:none !important; } }
        @media (min-width: 1024px) {
          .hero-subtitle-desktop { display:block !important; } .hero-subtitle-mobile { display:none !important; }
          .hero-own-the { font-size: min(3.2vw, 56px) !important; }
          .hero-extraordinary { font-size: min(calc((100vw - 128px) / 10), 168px) !important; white-space: nowrap !important; line-height: 1 !important; }
        }
        @media (max-width: 767px) {
          .s2-statement-wrap, .s2-stats-row { padding-left: 0 !important; }
          .s2-statement { white-space: normal; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .s2-statement-wrap, .s2-stats-row { padding-left: 12% !important; }
        }
        @media (max-width: 1023px) {
          .s3-gallery-section { height:auto !important; min-height:100vh; overflow:visible !important; }
          .s3-ticker-wrap { position:sticky !important; top:0; height:100vh; width:100%; margin-bottom:-100vh; }
          .s3-gallery-content { height:auto !important; align-items:flex-start !important; padding:96px 16px 64px !important; flex-direction:column; }
          .gallery-expand-row { display:grid; grid-template-columns:1fr 1fr; gap:8px; height:auto; max-width:700px; margin:0 auto; }
          .gallery-expand-item { flex:none; height:auto; aspect-ratio:4/5; border-radius:10px; transition:transform .3s ease; }
          .gallery-expand-item:hover { flex:none; transform:scale(1.02); }
          .gallery-expand-item .cap { opacity:1; transform:none; }
          .gallery-expand-item:last-child:nth-child(odd) { grid-column:1/-1; max-width:calc(50% - 4px); justify-self:center; width:100%; }
        }
      `}</style>

      {/* 1 · Preloader */}
      {!skip && (
        <div
          aria-hidden
          className="fixed inset-0 flex items-center justify-center px-6"
          style={{
            zIndex: 100,
            background: BRAND,
            transform: lifting ? 'translateY(-100%)' : 'translateY(0)',
            transition: liftDone ? 'none' : 'transform 1.5s cubic-bezier(0.45, 0, 0.15, 1)',
            visibility: liftDone ? 'hidden' : 'visible',
          }}
        >
          <span className="font-display text-white" style={{ fontSize: 'clamp(1.8rem, 6vw, 2.6rem)', letterSpacing: '-0.02em' }}>
            {FULL_TEXT.slice(0, typed).split('').map((c, i) => (
              <span key={i} style={{ fontWeight: c === '.' ? 900 : 700, color: c === '.' ? '#4ead42' : undefined }}>{c}</span>
            ))}
            {cursor && <span className="ml-1 inline-block rounded-sm bg-white align-[-0.15em]" style={{ width: 3, height: '1.1em', animation: 'blink 0.7s step-end infinite' }} />}
          </span>
        </div>
      )}

      {/* 3 · Hero */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ minHeight: 480, backgroundImage: `url(${img(SKY_IMG)})`, backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundColor: '#bfe0f7' }}
      >
        {/* Edificio con jardín vertical: entra desde abajo; su borde inferior es el final del hero */}
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ zIndex: 5 }}>
          <div className="h-full w-full" style={{ transform: lifting ? 'translateY(0)' : 'translateY(100%)', transition: liftDone ? 'none' : 'transform 1.5s cubic-bezier(0.45, 0, 0.15, 1) 0.4s' }}>
            <div ref={houseRef} className="absolute">
              <img src={img(HERO_IMG)} alt="" className="h-full w-full object-fill" fetchPriority="high" />
            </div>
          </div>
        </div>
        <div
          className="hero-text-block relative"
          style={{
            zIndex: 10,
            opacity: heroIn ? 1 : 0,
            transform: heroIn ? 'translateY(0)' : 'translateY(-28px)',
            transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s',
          }}
        >
          <h1 className="text-grafito">
            <span className="hero-heading-top flex items-end justify-between px-6 md:px-10 lg:px-16" style={{ marginBottom: '-0.04em' }}>
              <span className="hero-own-the block font-display font-extrabold" style={{ letterSpacing: '-0.03em', lineHeight: 1 }}>
                Jardines verticales,
              </span>
              <span
                className="hero-subtitle-desktop hidden max-w-[380px] text-right font-display font-bold normal-case opacity-70"
                style={{ fontSize: 'clamp(10px, 0.95vw, 14px)', lineHeight: 1.6, letterSpacing: '0.02em', marginBottom: '0.2em' }}
              >
                Muros verdes, azoteas verdes y paisajismo<br />diseñados, instalados y cuidados desde 2010.
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-extraordinary block px-6 font-display font-extrabold text-bosque md:px-10 lg:px-16" style={{ letterSpacing: '-0.03em' }}>
                arquitectura viva<span className="text-hoja">.</span>
                <span ref={baselineRef} aria-hidden className="inline-block h-0 w-0 align-baseline" />
              </span>
            </span>
          </h1>
          <p className="hero-subtitle-mobile hidden px-6 font-display font-semibold text-grafito opacity-70 md:px-10" style={{ fontSize: 'clamp(13px, 3vw, 16px)', marginTop: '0.9em' }}>
            Muros verdes, azoteas verdes y paisajismo<br />diseñados, instalados y cuidados desde 2010.
          </p>
          <div className="mt-6 hidden flex-wrap gap-3 px-6 md:flex md:px-10 lg:mt-8 lg:px-16">
            <Link to="/cotizar" className="inline-flex items-center gap-2 rounded-full bg-bosque px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-white hover:bg-hoja" data-event="cta_cotizar_hero">
              Cotizar proyecto <ArrowUpRight size={15} />
            </Link>
            <Link to="/proyectos" className="inline-flex items-center gap-2 rounded-full border border-grafito/25 bg-white/50 px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-grafito backdrop-blur hover:bg-white">
              Ver proyectos
            </Link>
          </div>
        </div>

        {/* Tarjeta tipo Qelora: el equipo */}
        <a
          href={waLink('Hola, quiero platicar sobre un proyecto de muro verde.')}
          target="_blank"
          rel="noopener"
          className="absolute bottom-[8vh] right-16 hidden w-[260px] overflow-hidden rounded-2xl bg-white/80 shadow-xl backdrop-blur-md transition-transform hover:-translate-y-1 xl:block"
          style={{ zIndex: 30, opacity: heroIn ? 1 : 0, transition: 'opacity .7s ease .5s, transform .3s ease' }}
        >
          <img src={img('equipo-muro-verde-patio-cdmx', true)} alt="Equipo de Generación Verde frente a un muro verde terminado" className="h-32 w-full object-cover object-[70%_30%]" loading="lazy" />
          <div className="flex items-center justify-between gap-3 p-4">
            <p className="text-[13px] font-medium leading-snug text-grafito">Todo muro empieza con una visita técnica.</p>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-hoja text-white"><MessageCircle size={16} /></span>
          </div>
        </a>
      </section>

      {/* En móvil, subtítulo y botones van debajo del edificio para no taparlo */}
      <div className="relative z-30 bg-papel px-6 pb-10 pt-7 md:hidden">
        <p className="font-display text-[15px] font-semibold leading-snug text-grafito/75">Muros verdes, azoteas verdes y paisajismo diseñados, instalados y cuidados desde 2010.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/cotizar" className="inline-flex items-center gap-2 rounded-full bg-bosque px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-white" data-event="cta_cotizar_hero">Cotizar proyecto <ArrowUpRight size={15} /></Link>
          <Link to="/proyectos" className="inline-flex items-center gap-2 rounded-full border border-grafito/25 bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-grafito">Ver proyectos</Link>
        </div>
      </div>

      {/* 5 · Declaración + cifras (sticky) */}
      <div className="relative" style={{ height: '200vh', zIndex: 20 }} ref={darkWrapRef}>
        <div style={{ height: '4vh', background: '#141a15' }} />
        <section className="sticky top-0 h-screen overflow-hidden bg-noche" data-nav-dark aria-labelledby="manifiesto">
          <div className="flex flex-col px-6 md:px-10 lg:px-16" style={{ paddingTop: 'clamp(96px, 14vh, 150px)' }}>
            <div className="s2-statement-wrap mx-auto w-full max-w-[1200px]" style={{ paddingLeft: '25%' }}>
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.16em] text-hoja" id="manifiesto">Generación Verde · desde 2010</p>
              <p className="s2-statement font-sans font-light text-piedra" style={{ letterSpacing: '-0.02em', lineHeight: 1.35, fontSize: 'clamp(22px, 2.6vw, 42px)' }}>
                Cada muro que instalamos es una<br className="hidden md:inline" /> pieza viva de arquitectura: diseñada,<br className="hidden md:inline" /> regada y cuidada para durar. La<br className="hidden md:inline" /> naturaleza no se improvisa.
              </p>
            </div>
            <div ref={statsRef} className="s2-stats-row mx-auto flex w-full max-w-[1200px]" style={{ paddingLeft: '25%', marginTop: 'clamp(36px, 5vw, 72px)' }}>
              {[
                { end: 250, prefix: '+', label: 'Proyectos realizados' },
                { end: 16, label: 'Años de experiencia' },
                { end: 3, label: 'Ciudades con oficina' },
              ].map((s, i) => (
                <div key={s.label} className="flex-1" style={i ? { borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: 'clamp(16px, 2.5vw, 40px)' } : undefined}>
                  <div className="font-light text-white" style={{ fontSize: 'clamp(34px, 4.5vw, 72px)', lineHeight: 1.1 }}>
                    <CountUp end={s.end} prefix={s.prefix} />
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(12px, 1.1vw, 16px)', marginTop: 'clamp(4px, .5vw, 8px)', letterSpacing: '0.01em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* 6 · Galería acordeón (se desliza sobre la sección 5) */}
      <section className="s3-gallery-section relative bg-noche" style={{ zIndex: 25, marginTop: '-100vh', height: '100vh', overflow: 'hidden' }} data-nav-dark aria-labelledby="galeria">
        <div className="s3-ticker-wrap pointer-events-none absolute inset-0 flex items-center overflow-hidden" style={{ zIndex: 0 }} aria-hidden>
          <div className="ticker-track flex whitespace-nowrap">
            {[0, 1].map((k) => (
              <span key={k} className="select-none font-display font-extrabold text-white/[0.92]" style={{ fontSize: 'clamp(100px, 14vw, 220px)', letterSpacing: '-0.02em', paddingRight: '0.3em' }}>
                {'Generación Verde  ·  '.repeat(4)}
              </span>
            ))}
          </div>
        </div>
        <div className="s3-gallery-content relative flex h-full items-center justify-center" style={{ zIndex: 1, padding: 'clamp(24px, 4vw, 60px)' }}>
          <h2 id="galeria" className="sr-only">Proyectos recientes de jardines verticales y paisajismo</h2>
          <div className="gallery-expand-row">
            {gallery.map((p) => (
              <Link key={p.slug} to="/proyectos" className="gallery-expand-item group block cursor-pointer">
                <img src={imgMd(p.image)} alt={`${p.title}, ${p.city}`} className="absolute inset-0 h-full w-full object-cover object-center" loading="lazy" decoding="async" />
                <div className="cap absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/55 to-transparent px-4 pb-4 pt-10 text-white">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-hoja">{p.service} · {p.city}</p>
                  <p className="mt-1 text-sm font-medium leading-snug md:text-base">{p.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7 · Servicios */}
      <section className="relative z-30 bg-papel px-6 py-24 md:px-10 md:py-32 lg:px-16" aria-labelledby="servicios">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 id="servicios" className="max-w-xl font-display text-[clamp(32px,4.6vw,64px)] font-extrabold leading-[0.92] tracking-[-0.03em] text-grafito">
              Lo que hacemos<span className="text-hoja">.</span>
            </h2>
            <p className="max-w-md text-[15px] leading-relaxed text-grafito/70">
              Un solo equipo para diseñar, instalar y mantener: suelo, muros y azoteas funcionan como un mismo jardín.
            </p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Link key={s.slug} to={`/${s.slug}`} className={`group relative overflow-hidden rounded-2xl bg-white ${i === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
                <div className={`overflow-hidden ${i === 0 ? 'aspect-[4/3] lg:aspect-auto lg:h-[560px]' : 'aspect-[4/3]'}`}>
                  <img src={img(s.hero, true)} alt={`${s.nav} — proyecto de Generación Verde`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="flex items-start justify-between gap-4 p-6">
                  <div>
                    <h3 className="font-display text-xl font-bold text-grafito">{s.nav}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-grafito/65">{s.kicker}</p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-grafito/15 text-bosque transition-colors group-hover:border-hoja group-hover:bg-hoja group-hover:text-white">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BeforeAfterSection service="jardines-verticales" dark />

      {/* 8 · Proceso */}
      <section className="relative z-30 bg-white px-6 py-24 md:px-10 lg:px-16" aria-labelledby="proceso">
        <div className="mx-auto max-w-6xl">
          <h2 id="proceso" className="font-display text-[clamp(28px,3.6vw,48px)] font-extrabold leading-[0.95] tracking-[-0.03em] text-grafito">
            Cómo trabajamos
          </h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-4">
            {[
              { icon: PencilRuler, t: 'Visita técnica', d: 'Medimos, revisamos luz, estructura, agua y carga de losa.' },
              { icon: Sprout, t: 'Tres propuestas', d: 'Diseño, especies y costo de instalación y mantenimiento.' },
              { icon: Droplets, t: 'Instalación', d: 'Estructura, riego automatizado, drenaje y plantación.' },
              { icon: Wrench, t: 'Mantenimiento', d: 'Pólizas mensuales, bimestrales o trimestrales.' },
            ].map((s, i) => (
              <li key={s.t} className="border-t border-grafito/15 pt-6">
                <div className="flex items-center gap-3 text-bosque">
                  <span className="font-display text-sm font-bold text-hoja">0{i + 1}</span>
                  <s.icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-grafito">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-grafito/65">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 9 · Clientes */}
      <section className="relative z-30 overflow-hidden bg-papel py-16" aria-labelledby="clientes">
        <h2 id="clientes" className="px-6 text-center text-xs font-semibold uppercase tracking-[0.16em] text-grafito/60">Han confiado en nosotros</h2>
        <div className="mt-8 flex">
          <div className="ticker-track flex shrink-0 gap-14 pr-14" style={{ animationDuration: '40s' }}>
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <span key={i} className="whitespace-nowrap font-display text-2xl font-bold text-grafito/35 md:text-3xl">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 10 · Equipo / E-E-A-T */}
      <section className="relative z-30 bg-papel px-6 pb-24 md:px-10 lg:px-16" aria-labelledby="equipo">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl">
            <img src={img('equipo-terraza-jardin-vertical')} alt="Integrante de Generación Verde explicando un jardín vertical en una terraza residencial" className="aspect-[4/3] w-full object-cover" loading="lazy" />
          </div>
          <div>
            <h2 id="equipo" className="font-display text-[clamp(28px,3.6vw,48px)] font-extrabold leading-[0.95] tracking-[-0.03em] text-grafito">
              Ingeniería con raíces<span className="text-hoja">.</span>
            </h2>
            <p className="mt-6 text-[16px] leading-relaxed text-grafito/75">
              Nacimos en 2010 con origen en InnovaUNAM. Hoy somos un equipo de ingenieros, arquitectos, biólogos, agrónomos y jardineros que diseña cada muro según su clima, su luz y su uso.
            </p>
            <ul className="mt-8 grid gap-3 text-sm text-grafito/80 sm:grid-cols-2">
              {['Riego automatizado en cada sistema', 'Diseño conforme a NADF-013 en azoteas', 'Oficinas en CDMX, Guadalajara y Mérida', 'Mantenimiento con reposición de plantas'].map((b) => (
                <li key={b} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-hoja" />{b}</li>
              ))}
            </ul>
            <Link to="/proyectos" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] text-bosque hover:text-hoja">
              Ver proyectos <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 11 · FAQ */}
      <section className="relative z-30 bg-white px-6 py-24 md:px-10 lg:px-16" aria-labelledby="faq">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_2fr]">
          <h2 id="faq" className="font-display text-[clamp(28px,3.6vw,48px)] font-extrabold leading-[0.95] tracking-[-0.03em] text-grafito">
            Preguntas frecuentes
          </h2>
          <FaqList faqs={HOME_FAQS} />
        </div>
      </section>

      <CtaBand />
    </Page>
  );
}

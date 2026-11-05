import { useMemo } from 'react';
import { ArrowUpRight, Check, ChevronRight, MessageCircle } from 'lucide-react';
import { Link } from '../router';
import { FIELD_PHOTOS, FIELD_TITLES, INSTALL_STEPS, PROJECTS, SERVICES, img, waLink, type Service } from '../data/site';
import BeforeAfterSection from '../components/BeforeAfter';
import { CtaBand, FaqList, Page, faqLd, useSeo } from '../components/Layout';

export default function ServicePage({ service: s }: { service: Service }) {
  const ld = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: s.h1,
          serviceType: s.nav,
          description: s.description,
          provider: { '@id': 'https://generacionverde.com/#org' },
          areaServed: ['Ciudad de México', 'Guadalajara', 'Mérida', 'Estado de México', 'Cuernavaca'],
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://generacionverde.com/' },
            { '@type': 'ListItem', position: 2, name: s.nav, item: `https://generacionverde.com/${s.slug}/` },
          ],
        },
        faqLd(s.faqs),
      ],
    }),
    [s],
  );
  useSeo(s.title, s.description, ld);

  const related = PROJECTS.filter((p) => p.service === s.nav).concat(PROJECTS).filter((p, i, a) => a.findIndex((q) => q.slug === p.slug) === i).slice(0, 3);
  const others = SERVICES.filter((o) => o.slug !== s.slug);

  return (
    <Page dockMessage={s.whatsapp}>
      {/* Hero */}
      <section className="relative bg-papel px-6 pb-16 pt-28 md:px-10 md:pt-36 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Ruta" className="flex items-center gap-1 text-xs text-grafito/55">
            <Link to="/" className="hover:text-bosque">Inicio</Link>
            <ChevronRight size={12} />
            <span className="text-grafito/80">{s.nav}</span>
          </nav>
          <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-hoja">{s.kicker}</p>
          <h1 className="mt-4 font-display text-[min(calc((100vw-48px)/7.6),80px)] font-extrabold leading-[0.9] tracking-[-0.035em] text-grafito">
                {s.h1}<span className="text-hoja">.</span>
              </h1>
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <div>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-grafito/75">{s.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to={`/cotizar?servicio=${s.slug}`} className="inline-flex items-center gap-2 rounded-full bg-bosque px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-white hover:bg-hoja" data-event="cta_cotizar_servicio">
                  Cotizar {s.nav.toLowerCase()} <ArrowUpRight size={15} />
                </Link>
                <a href={waLink(s.whatsapp)} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-grafito/25 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-grafito hover:bg-white" data-event="click_whatsapp">
                  <MessageCircle size={15} /> WhatsApp
                </a>
              </div>
            </div>
            <div className="overflow-hidden rounded-t-[28px] rounded-b-2xl">
              <img src={img(s.hero)} srcSet={`${img(s.hero, true)} 800w, ${img(s.hero)} 1800w`} sizes="(max-width:1023px) 100vw, 45vw" alt={s.slug === 'paisajismo' ? 'Agenda tu asesoría de paisaje hoy — Generación Verde' : `${s.h1} — proyecto real de Generación Verde`} className={`${s.slug === 'paisajismo' ? 'aspect-video' : 'aspect-[4/3]'} w-full object-cover`} fetchPriority="high" />
            </div>
          </div>
        </div>
      </div>
      </section>

      {/* Respuesta directa (bloque citable para buscadores con IA) */}
      <section className="bg-noche px-6 py-20 md:px-10 lg:px-16" data-nav-dark>
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_2fr]">
          <h2 className="font-display text-[clamp(26px,3vw,40px)] font-bold leading-tight text-white">{s.answerQ}</h2>
          <p className="text-[clamp(18px,1.7vw,24px)] font-light leading-[1.5] text-piedra">{s.answer}</p>
        </div>
      </section>

      {/* Tipos */}
      <section className="bg-papel px-6 py-24 md:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-[clamp(28px,3.6vw,48px)] font-extrabold leading-[0.95] tracking-[-0.03em] text-grafito">Tipos y sistemas</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {s.types.map((t) => (
              <article key={t.title} className="overflow-hidden rounded-2xl bg-white">
                <img src={img(t.image, true)} alt={`${t.title} — Generación Verde`} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-grafito">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-grafito/70">{t.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {s.slug === 'jardines-verticales' && (
        <section className="bg-white px-6 py-24 md:px-10 lg:px-16" aria-labelledby="proceso-instalacion">
          <div className="mx-auto max-w-6xl">
            <h2 id="proceso-instalacion" className="font-display text-[clamp(28px,3.6vw,48px)] font-extrabold leading-[0.95] tracking-[-0.03em] text-grafito">
              Proceso de instalación<span className="text-hoja">.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-grafito/70">Así se construye un jardín vertical, capa por capa. Fotos reales de obra.</p>
            <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {INSTALL_STEPS.map((st, i) => (
                <li key={st.title} className="overflow-hidden rounded-2xl bg-papel">
                  <img src={img(st.image, true)} alt={`Paso ${i + 1} de la instalación de un jardín vertical: ${st.title}`} className="aspect-[3/4] w-full object-cover" loading="lazy" />
                  <div className="p-5">
                    <p className="font-display text-sm font-bold text-hoja">0{i + 1}</p>
                    <h3 className="mt-1 font-display text-lg font-bold text-grafito">{st.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-grafito/70">{st.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {FIELD_PHOTOS.some((f) => f.services.includes(s.slug)) && (
        <section className="bg-white px-6 py-24 md:px-10 lg:px-16" aria-labelledby="en-campo">
          <div className="mx-auto max-w-6xl">
            <h2 id="en-campo" className="font-display text-[clamp(28px,3.6vw,48px)] font-extrabold leading-[0.95] tracking-[-0.03em] text-grafito">
              {FIELD_TITLES[s.slug]?.title ?? 'Nuestro equipo en campo'}<span className="text-hoja">.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-grafito/70">{FIELD_TITLES[s.slug]?.text ?? 'Jardineros y técnicos de Generación Verde trabajando en proyectos reales, a pie de jardín y en altura.'}</p>
            <div className="mt-12 columns-2 gap-4 lg:columns-3">
              {FIELD_PHOTOS.filter((f) => f.services.includes(s.slug)).map((f) => (
                <figure key={f.image} className="relative mb-4 break-inside-avoid overflow-hidden rounded-2xl">
                  <img src={img(f.image, true)} alt={`${f.title} — Generación Verde`} className="w-full" loading="lazy" />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-4 pb-3 pt-10 text-sm font-medium text-white">{f.title}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <BeforeAfterSection service={s.slug} dark />

      {/* Beneficios + costo */}
      <section className="bg-white px-6 py-24 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-[clamp(28px,3.6vw,48px)] font-extrabold leading-[0.95] tracking-[-0.03em] text-grafito">Por qué con nosotros</h2>
            <ul className="mt-8 space-y-4">
              {s.benefits.map((b) => (
                <li key={b} className="flex gap-3 text-[16px] text-grafito/85">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hoja/15 text-bosque"><Check size={14} /></span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-bosque p-8 text-white md:p-10" data-nav-dark>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-hoja">Inversión</p>
            <p className="mt-4 font-display text-[clamp(26px,2.6vw,38px)] font-extrabold leading-[1.1]">{s.price}</p>
            <p className="mt-5 text-sm leading-relaxed text-white/70">{s.priceNote}</p>
            <Link to={`/cotizar?servicio=${s.slug}`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-hoja px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] hover:bg-white hover:text-bosque">
              {s.priceCta} <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Proyectos relacionados */}
      <section className="bg-papel px-6 py-24 md:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-[clamp(28px,3.6vw,48px)] font-extrabold leading-[0.95] tracking-[-0.03em] text-grafito">Proyectos</h2>
            <Link to="/proyectos" className="text-sm font-semibold uppercase tracking-[0.1em] text-bosque hover:text-hoja">Ver todos</Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {related.map((p) => (
              <figure key={p.slug} className="group overflow-hidden rounded-2xl">
                <div className="overflow-hidden"><img src={img(p.image, true)} alt={`${p.title}, ${p.city}`} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" /></div>
                <figcaption className="pt-3 text-sm"><span className="font-medium text-grafito">{p.title}</span><span className="block text-grafito/55">{p.sector} · {p.city}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-6 py-24 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_2fr]">
          <h2 className="font-display text-[clamp(28px,3.6vw,48px)] font-extrabold leading-[0.95] tracking-[-0.03em] text-grafito">Preguntas frecuentes</h2>
          <FaqList faqs={s.faqs} />
        </div>
      </section>

      {/* Otros servicios (enlazado interno) */}
      <section className="bg-papel px-6 py-16 md:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-grafito/55">Otros servicios</p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {others.map((o) => (
              <Link key={o.slug} to={`/${o.slug}`} className="rounded-full border border-grafito/20 bg-white px-5 py-2.5 text-sm text-grafito hover:border-hoja hover:text-bosque">{o.nav}</Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand message={s.whatsapp} />
    </Page>
  );
}

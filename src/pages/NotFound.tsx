import { useEffect } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { Link } from '../router';
import { SERVICES, img, waLink } from '../data/site';
import { CtaBand, Page, useSeo } from '../components/Layout';

// Página 404: cualquier ruta inexistente cae aquí y ofrece la galería de servicios.
export default function NotFound() {
  useSeo('Página no encontrada | Generación Verde', 'No encontramos la página que buscabas. Conoce nuestros servicios: jardines verticales, azoteas verdes, paisajismo, mantenimiento y jardinería.');
  // Evita que Google indexe URLs inexistentes.
  useEffect(() => {
    const m = document.createElement('meta');
    m.name = 'robots'; m.content = 'noindex'; m.id = 'nf-robots';
    document.head.appendChild(m);
    return () => m.remove();
  }, []);

  return (
    <Page>
      <section className="bg-papel px-6 pb-16 pt-32 md:px-10 md:pt-40 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="font-display text-sm font-bold text-hoja">Error 404</p>
          <h1 className="mt-3 max-w-4xl font-display text-[clamp(40px,6vw,84px)] font-extrabold leading-[1] tracking-[-0.03em] text-grafito">
            Upsss<span className="text-hoja">…</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[clamp(18px,1.8vw,24px)] leading-relaxed text-grafito/80">
            No encontré la página que estabas buscando. Te presento en lo que te podemos ayudar.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-bosque px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-white hover:bg-hoja">
              Ir al inicio <ArrowUpRight size={15} />
            </Link>
            <a href={waLink('Hola, estaba buscando información en su sitio y no la encontré.')} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-grafito/25 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-grafito hover:bg-white" data-event="click_whatsapp">
              <MessageCircle size={15} /> Pregúntanos por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="bg-papel px-6 pb-24 md:px-10 lg:px-16" aria-labelledby="servicios-404">
        <div className="mx-auto max-w-6xl">
          <h2 id="servicios-404" className="font-display text-[clamp(28px,3.6vw,48px)] font-extrabold leading-[1] tracking-[-0.03em] text-grafito">
            Nuestros servicios<span className="text-hoja">.</span>
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link key={s.slug} to={`/${s.slug}`} className="group relative overflow-hidden rounded-2xl bg-white">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={img(s.hero, true)} alt={`${s.nav} — Generación Verde`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
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
            <Link to="/proyectos" className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-bosque p-8 text-white" data-nav-dark>
              <h3 className="font-display text-2xl font-bold leading-tight">Ver proyectos realizados</h3>
              <p className="mt-3 text-sm text-white/70">Muros verdes, azoteas y jardines instalados por nuestro equipo.</p>
              <span className="mt-8 inline-flex h-12 w-12 items-center justify-center rounded-full bg-hoja transition-transform group-hover:translate-x-1"><ArrowUpRight size={20} /></span>
            </Link>
          </div>
        </div>
      </section>
      <CtaBand />
    </Page>
  );
}

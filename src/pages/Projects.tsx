import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from '../router';
import { PROJECTS, img } from '../data/site';
import { CtaBand, Page, useSeo } from '../components/Layout';

const FILTERS = ['Todos', 'Jardines verticales', 'Azoteas verdes', 'Paisajismo', 'Mantenimiento'];

export default function Projects() {
  useSeo(
    'Proyectos de jardines verticales y muros verdes | Generación Verde',
    'Portafolio de jardines verticales, muros verdes, azoteas verdes y paisajismo realizados por Generación Verde en residencias, condominios y corporativos.',
  );
  const [f, setF] = useState('Todos');
  const list = f === 'Todos' ? PROJECTS : PROJECTS.filter((p) => p.service === f);

  return (
    <Page>
      <section className="bg-papel px-6 pb-24 pt-28 md:px-10 md:pt-36 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Ruta" className="flex items-center gap-1 text-xs text-grafito/55">
            <Link to="/" className="hover:text-bosque">Inicio</Link><ChevronRight size={12} /><span className="text-grafito/80">Proyectos</span>
          </nav>
          <h1 className="mt-8 font-display text-[clamp(40px,6.4vw,92px)] font-extrabold leading-[0.9] tracking-[-0.035em] text-grafito">
            Proyectos<span className="text-hoja">.</span>
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-grafito/75">
            Muros verdes, jardines verticales y paisajismo instalados por nuestro equipo. Cada ficha tendrá m², sistema, ciudad y año.
          </p>
          <div className="mt-10 flex flex-wrap gap-2" role="tablist">
            {FILTERS.map((x) => (
              <button key={x} role="tab" aria-selected={f === x} onClick={() => setF(x)} className={`rounded-full px-5 py-2.5 text-sm transition-colors ${f === x ? 'bg-bosque text-white' : 'bg-white text-grafito hover:bg-white/60'}`}>
                {x}
              </button>
            ))}
          </div>
          <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {list.map((p) => (
              <figure key={p.slug} className="group mb-5 break-inside-avoid overflow-hidden rounded-2xl bg-white">
                <div className="overflow-hidden"><img src={img(p.image, true)} alt={`${p.title} — ${p.service}, ${p.city}`} className="w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" /></div>
                <figcaption className="p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-hoja">{p.service}</p>
                  <h2 className="mt-1.5 font-display text-lg font-bold leading-snug text-grafito">{p.title}</h2>
                  <p className="mt-1 text-sm text-grafito/55">{p.sector} · {p.city}{p.area ? ` · ${p.area}` : ''}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="¿Quieres un proyecto así?" />
    </Page>
  );
}

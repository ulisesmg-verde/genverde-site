import { useEffect, useState, type ReactNode } from 'react';
import { X, MessageCircle, ArrowUpRight, Plus, Minus } from 'lucide-react';
import { Link, useRouter } from '../router';
import { CONTACT, NAV, SERVICES, logo, waLink, type Faq } from '../data/site';

/* ---------- SEO por página: title, description, canonical y JSON-LD ---------- */
export function useSeo(title: string, description: string, jsonLd?: object) {
  const { path } = useRouter();
  useEffect(() => {
    document.title = title;
    const set = (sel: string, attr: string, val: string, make: () => HTMLElement) => {
      let el = document.head.querySelector(sel) as HTMLElement | null;
      if (!el) { el = make(); document.head.appendChild(el); }
      el.setAttribute(attr, val);
    };
    set('meta[name="description"]', 'content', description, () => Object.assign(document.createElement('meta'), { name: 'description' }));
    set('link[rel="canonical"]', 'href', `https://generacionverde.com${path === '/' ? '/' : path + '/'}`, () => Object.assign(document.createElement('link'), { rel: 'canonical' }));
    document.getElementById('page-ld')?.remove();
    if (jsonLd) {
      const s = document.createElement('script');
      s.type = 'application/ld+json'; s.id = 'page-ld'; s.text = JSON.stringify(jsonLd);
      document.head.appendChild(s);
    }
  }, [title, description, path, jsonLd]);
}

/* ---------- Navegación ---------- */
export function Nav({ forceLight = false }: { forceLight?: boolean }) {
  const { path } = useRouter();
  const [open, setOpen] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const check = () => {
      const darks = document.querySelectorAll('[data-nav-dark]');
      let dark = false;
      darks.forEach((el) => { const r = el.getBoundingClientRect(); if (r.top <= 40 && r.bottom > 40) dark = true; });
      setOnDark(dark);
      setScrolled(window.scrollY > 40);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => { window.removeEventListener('scroll', check); window.removeEventListener('resize', check); };
  }, [path]);

  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);

  const light = (onDark || forceLight) && !open;
  const color = light ? '#ffffff' : '#204f24';

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 md:px-10 lg:px-16 transition-[background,backdrop-filter] duration-300 ${
          scrolled && !light && !open ? 'bg-papel/85 backdrop-blur-md' : ''
        }`}
        style={{ color, transition: 'color 0.35s ease' }}
        aria-label="Principal"
      >
        <Link to="/" aria-label="Generación Verde, inicio" className="relative z-50 block h-9 md:h-10">
          <img src={logo(light ? 'h-light' : 'h-dark')} alt="Generación Verde" className="h-full w-auto" width={775} height={255} />
        </Link>

        <div className="hidden items-center gap-1.5 xl:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              to={n.href}
              className={`rounded-full px-4 py-2 text-[12px] font-medium uppercase tracking-[0.08em] transition-colors ${
                path === n.href
                  ? light ? 'bg-white/25 backdrop-blur' : 'bg-bosque text-white'
                  : light ? 'bg-black/30 backdrop-blur hover:bg-black/50' : 'bg-white/70 hover:bg-white'
              }`}
            >
              {n.label}
            </Link>
          ))}
          <Link to="/cotizar" className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-hoja px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-white hover:bg-bosque">
            Cotizar <ArrowUpRight size={14} />
          </Link>
        </div>

        <button
          className="group relative z-50 flex h-10 w-10 items-center justify-center xl:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          {open ? (
            <X size={24} />
          ) : (
            <span className="flex flex-col items-end gap-[7px]">
              <span className="block h-px w-7 bg-current transition-all duration-300 group-hover:w-5" />
              <span className="block h-px w-7 bg-current" />
            </span>
          )}
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-papel px-6">
          {[{ label: 'Inicio', href: '/' }, ...NAV, { label: 'Jardinería', href: '/jardineria' }, { label: 'Cotizar', href: '/cotizar' }].map((n) => (
            <Link key={n.href} to={n.href} onClick={() => setOpen(false)} className="font-display text-3xl font-semibold text-grafito hover:text-hoja sm:text-4xl">
              {n.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

/* ---------- WhatsApp flotante + barra móvil ---------- */
export function ContactDock({ message = 'Hola, me interesa cotizar un proyecto con Generación Verde.' }: { message?: string }) {
  return (
    <>
      <a
        href={waLink(message)}
        target="_blank"
        rel="noopener"
        className="fixed bottom-6 right-6 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-hoja text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 md:flex"
        aria-label="Escríbenos por WhatsApp"
        data-event="click_whatsapp"
      >
        <MessageCircle size={26} />
      </a>
      <div className="fixed inset-x-0 bottom-0 z-50 md:hidden">
        <a href={waLink(message)} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 bg-hoja py-3.5 text-sm font-semibold text-white" data-event="click_whatsapp">
          <MessageCircle size={16} /> WhatsApp {CONTACT.phone}
        </a>
      </div>
    </>
  );
}

/* ---------- FAQ con schema FAQPage ---------- */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-grafito/15 border-y border-grafito/15">
      {faqs.map((f, i) => (
        <div key={f.q}>
          <button className="flex w-full items-center justify-between gap-6 py-5 text-left" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            <h3 className="text-[17px] font-medium text-grafito md:text-lg">{f.q}</h3>
            {open === i ? <Minus size={18} className="shrink-0 text-hoja" /> : <Plus size={18} className="shrink-0 text-hoja" />}
          </button>
          <div className={`grid transition-all duration-300 ${open === i ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'}`}>
            <p className="overflow-hidden max-w-3xl text-[15px] leading-relaxed text-grafito/75">{f.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export const faqLd = (faqs: Faq[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

/* ---------- Banda de CTA ---------- */
export function CtaBand({ title = '¿Tienes un muro, una azotea o un jardín por transformar?', message }: { title?: string; message?: string }) {
  return (
    <section className="relative z-30 bg-bosque px-6 py-20 text-white md:px-10 md:py-28 lg:px-16" data-nav-dark>
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8">
        <h2 className="max-w-3xl font-display text-[clamp(30px,4.4vw,60px)] font-extrabold leading-[0.95] tracking-[-0.03em]">{title}</h2>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/cotizar" className="inline-flex items-center justify-center gap-2 rounded-full bg-hoja px-7 py-4 text-sm font-semibold uppercase tracking-[0.08em] hover:bg-white hover:text-bosque">
            Cotizar proyecto <ArrowUpRight size={16} />
          </Link>
          <a href={waLink(message ?? 'Hola, quiero cotizar un proyecto.')} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-4 text-sm font-semibold uppercase tracking-[0.08em] hover:bg-white/10">
            <MessageCircle size={16} /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Pie ---------- */
export function Footer() {
  return (
    <footer className="relative z-30 bg-noche px-6 pb-28 pt-16 text-piedra md:px-10 md:pb-12 lg:px-16" data-nav-dark>
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <img src={logo('h-light')} alt="Generación Verde" className="h-12 w-auto" width={775} height={255} loading="lazy" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-piedra/60">
            Jardines verticales, muros verdes, azoteas verdes, paisajismo y mantenimiento. Arquitectura viva desde 2010.
          </p>
        </div>
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-hoja">Servicios</p>
          <ul className="space-y-2.5 text-sm">
            {SERVICES.map((s) => (
              <li key={s.slug}><Link to={`/${s.slug}`} className="text-piedra/75 hover:text-white">{s.nav}</Link></li>
            ))}
            <li><Link to="/proyectos" className="text-piedra/75 hover:text-white">Proyectos</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-hoja">Contacto</p>
          <address className="space-y-2.5 text-sm not-italic text-piedra/75">
            <a href={waLink('Hola, quiero información sobre sus servicios.')} target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-white" data-event="click_whatsapp"><MessageCircle size={16} className="text-hoja" /> WhatsApp {CONTACT.phone}</a>
            <p>{CONTACT.address}</p>
            <p>Oficinas: {CONTACT.offices.join(' · ')}</p>
          </address>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-6xl flex-col justify-between gap-2 border-t border-white/10 pt-6 text-xs text-piedra/40 sm:flex-row">
        <span>© {new Date().getFullYear()} Generación Verde</span>
        <span>Boceto funcional · contenido marcado [VALIDAR] pendiente de aprobación</span>
      </div>
    </footer>
  );
}

export function Page({ children, dockMessage, navLight }: { children: ReactNode; dockMessage?: string; navLight?: boolean }) {
  return (
    <>
      <Nav forceLight={navLight} />
      <main>{children}</main>
      <Footer />
      <ContactDock message={dockMessage} />
    </>
  );
}

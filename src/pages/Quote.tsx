import { useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, Check, MessageCircle } from 'lucide-react';
import { CONTACT, SERVICES, img, waLink } from '../data/site';
import { Page, useSeo } from '../components/Layout';

// Cotizador en 3 pasos. En producción: POST a webhook del CRM + evento GA4 `generate_lead`.
// Hoy, al enviar, arma un mensaje de WhatsApp con los datos para no depender de servicios externos frágiles.
const SIZES = ['Menos de 10 m²', '10 – 50 m²', '50 – 200 m²', 'Más de 200 m²', 'No lo sé'];
const CITIES = ['CDMX', 'Estado de México', 'Guadalajara', 'Mérida', 'Cuernavaca', 'Otra'];

export default function Quote() {
  useSeo('Cotiza tu jardín vertical, muro verde o azotea verde | Generación Verde', 'Cotiza en 3 pasos tu jardín vertical, muro verde, azotea verde, paisajismo o mantenimiento. Te enviamos tres propuestas tras una visita técnica.');

  const pre = (() => {
    const q = (window.location.hash.split('?')[1] ?? window.location.search.slice(1)) || '';
    const slug = new URLSearchParams(q).get('servicio');
    return SERVICES.find((s) => s.slug === slug)?.nav ?? '';
  })();

  const [step, setStep] = useState(pre ? 1 : 0);
  const [service, setService] = useState(pre);
  const [size, setSize] = useState('');
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const msg = `Hola, soy ${name}. Quiero cotizar: ${service}. Tamaño: ${size}. Ciudad: ${city}. Tel: ${phone}${email ? `. Correo: ${email}` : ''}.`;
    (window as unknown as { dataLayer?: object[] }).dataLayer?.push({ event: 'generate_lead', service, city, size });
    setSent(true);
    window.open(waLink(msg), '_blank', 'noopener');
  };

  const Chip = ({ v, cur, set }: { v: string; cur: string; set: (v: string) => void }) => (
    <button type="button" onClick={() => set(v)} className={`rounded-xl border px-4 py-3.5 text-left text-[15px] transition-colors ${cur === v ? 'border-hoja bg-hoja/10 text-bosque' : 'border-grafito/15 bg-white text-grafito hover:border-grafito/40'}`}>
      {v}
    </button>
  );

  return (
    <Page>
      <section className="min-h-screen bg-papel px-6 pb-24 pt-28 md:px-10 md:pt-36 lg:px-16">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h1 className="font-display text-[clamp(36px,5vw,72px)] font-extrabold leading-[0.92] tracking-[-0.035em] text-grafito">
              Cotiza tu proyecto<span className="text-hoja">.</span>
            </h1>
            <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-grafito/70">Tres pasos, menos de un minuto. Agendamos una visita técnica y te enviamos tres propuestas.</p>

            <div className="mt-10 flex gap-2" aria-hidden>
              {[0, 1, 2].map((i) => <span key={i} className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-hoja' : 'bg-grafito/15'}`} />)}
            </div>

            {sent ? (
              <div className="mt-10 rounded-2xl bg-white p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-hoja text-white"><Check /></span>
                <h2 className="mt-5 font-display text-2xl font-bold text-grafito">¡Gracias, {name.split(' ')[0]}!</h2>
                <p className="mt-2 text-grafito/70">Abrimos WhatsApp con tus datos. Si no se abrió, llámanos al <a className="text-bosque underline" href={CONTACT.phoneHref}>{CONTACT.phone}</a>.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-10">
                {step === 0 && (
                  <fieldset>
                    <legend className="mb-5 text-lg font-semibold text-grafito">¿Qué necesitas?</legend>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {SERVICES.map((s) => <Chip key={s.slug} v={s.nav} cur={service} set={(v) => { setService(v); setStep(1); }} />)}
                    </div>
                  </fieldset>
                )}
                {step === 1 && (
                  <fieldset>
                    <legend className="mb-5 text-lg font-semibold text-grafito">Tamaño aproximado y ciudad</legend>
                    <div className="grid gap-3 sm:grid-cols-3">{SIZES.map((v) => <Chip key={v} v={v} cur={size} set={setSize} />)}</div>
                    <div className="mt-6 grid gap-3 sm:grid-cols-3">{CITIES.map((v) => <Chip key={v} v={v} cur={city} set={setCity} />)}</div>
                    <div className="mt-8 flex justify-between">
                      <button type="button" onClick={() => setStep(0)} className="inline-flex items-center gap-2 text-sm text-grafito/60 hover:text-grafito"><ArrowLeft size={16} /> {service || 'Servicio'}</button>
                      <button type="button" disabled={!size || !city} onClick={() => setStep(2)} className="inline-flex items-center gap-2 rounded-full bg-bosque px-6 py-3 text-sm font-semibold text-white disabled:opacity-30">Continuar <ArrowRight size={16} /></button>
                    </div>
                  </fieldset>
                )}
                {step === 2 && (
                  <fieldset className="space-y-4">
                    <legend className="mb-5 text-lg font-semibold text-grafito">¿A quién contactamos?</legend>
                    <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" autoComplete="name" className="w-full rounded-xl border border-grafito/15 bg-white px-4 py-3.5 outline-none focus:border-hoja" />
                    <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="WhatsApp / teléfono" type="tel" autoComplete="tel" className="w-full rounded-xl border border-grafito/15 bg-white px-4 py-3.5 outline-none focus:border-hoja" />
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo (opcional)" type="email" autoComplete="email" className="w-full rounded-xl border border-grafito/15 bg-white px-4 py-3.5 outline-none focus:border-hoja" />
                    <div className="flex justify-between pt-4">
                      <button type="button" onClick={() => setStep(1)} className="inline-flex items-center gap-2 text-sm text-grafito/60 hover:text-grafito"><ArrowLeft size={16} /> Atrás</button>
                      <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-hoja px-7 py-3.5 text-sm font-semibold text-white hover:bg-bosque">Enviar solicitud <ArrowRight size={16} /></button>
                    </div>
                  </fieldset>
                )}
              </form>
            )}
          </div>

          <aside className="hidden overflow-hidden rounded-2xl bg-white lg:block">
            <img src={img('equipo-retrato-muro-interior-2', true)} alt="Especialista de Generación Verde frente a un jardín vertical interior" className="h-[420px] w-full object-cover object-top" loading="lazy" />
            <div className="p-7">
              <p className="font-display text-xl font-bold text-grafito">¿Prefieres hablar directo?</p>
              <p className="mt-2 text-sm text-grafito/65">Respondemos en horario laboral. Oficinas en {CONTACT.offices.join(', ')}.</p>
              <a href={waLink('Hola, quiero cotizar un proyecto.')} target="_blank" rel="noopener" className="mt-5 inline-flex items-center gap-2 rounded-full bg-hoja px-6 py-3 text-sm font-semibold text-white"><MessageCircle size={16} /> WhatsApp</a>
            </div>
          </aside>
        </div>
      </section>
    </Page>
  );
}

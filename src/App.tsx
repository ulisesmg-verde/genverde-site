import { RouterProvider, useRouter, Link } from './router';
import { SERVICES } from './data/site';
import Home from './pages/Home';
import ServicePage from './pages/ServicePage';
import Projects from './pages/Projects';
import Quote from './pages/Quote';
import { Page, useSeo } from './components/Layout';

function NotFound() {
  useSeo('Página no encontrada | Generación Verde', 'La página que buscas no existe.');
  return (
    <Page>
      <section className="flex min-h-screen flex-col items-center justify-center bg-papel px-6 text-center">
        <h1 className="font-display text-6xl font-extrabold text-grafito">404</h1>
        <p className="mt-4 text-grafito/70">Esta página ya no existe.</p>
        <Link to="/" className="mt-8 rounded-full bg-bosque px-6 py-3 text-sm font-semibold text-white">Ir al inicio</Link>
      </section>
    </Page>
  );
}

function Routes() {
  const { path } = useRouter();
  if (path === '/') return <Home />;
  if (path === '/proyectos') return <Projects />;
  if (path === '/cotizar') return <Quote />;
  const s = SERVICES.find((x) => `/${x.slug}` === path);
  if (s) return <ServicePage key={s.slug} service={s} />;
  return <NotFound />;
}

export default function App() {
  return (
    <div style={{ overflowX: 'clip' }} className="bg-papel font-sans text-grafito antialiased">
      <RouterProvider>
        <Routes />
      </RouterProvider>
    </div>
  );
}

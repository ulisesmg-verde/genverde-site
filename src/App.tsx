import { RouterProvider, useRouter } from './router';
import { SERVICES } from './data/site';
import Home from './pages/Home';
import ServicePage from './pages/ServicePage';
import Projects from './pages/Projects';
import Quote from './pages/Quote';
import NotFound from './pages/NotFound';

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

import { createContext, useContext, useEffect, useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react';

// Router mínimo sin dependencias. En producción (Astro/SSG) cada ruta será un HTML estático.
// En la vista previa compartible (mode=preview) usa hash (#/ruta) porque no hay servidor.
const HASH = import.meta.env.MODE === 'preview';

const read = () => {
  if (HASH) return (window.location.hash.replace(/^#/, '') || '/').split('?')[0];
  return window.location.pathname.replace(/\/+$/, '') || '/';
};

const RouterCtx = createContext<{ path: string; go: (to: string) => void }>({ path: '/', go: () => {} });

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(read);
  useEffect(() => {
    const on = () => setPath(read());
    window.addEventListener(HASH ? 'hashchange' : 'popstate', on);
    return () => window.removeEventListener(HASH ? 'hashchange' : 'popstate', on);
  }, []);
  const go = (to: string) => {
    if (to.split('?')[0] === path && !to.includes('?')) return window.scrollTo({ top: 0, behavior: 'smooth' });
    if (HASH) window.location.hash = to;
    else window.history.pushState({}, '', to);
    setPath(to.split('?')[0]);
    window.scrollTo(0, 0);
  };
  return <RouterCtx.Provider value={{ path, go }}>{children}</RouterCtx.Provider>;
}

export const useRouter = () => useContext(RouterCtx);
export const href = (to: string) => (HASH ? `#${to}` : to);

export function Link({ to, children, onClick, ...rest }: { to: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { go } = useRouter();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    go(to);
  };
  return (
    <a href={href(to)} onClick={handle} {...rest}>
      {children}
    </a>
  );
}

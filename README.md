# Generación Verde — boceto funcional del nuevo sitio

React + TypeScript + Tailwind + Vite. Multipágina con router propio (sin dependencias extra).

## Uso
```
npm install
npm run dev             # desarrollo en http://localhost:5173
npm run build           # sitio de producción en dist/
npm run build:preview   # un solo HTML con imágenes embebidas (dist-preview/) para compartir
```

## Subir a GitHub
```
git remote add origin https://github.com/<usuario>/generacion-verde-site.git
git push -u origin main
```

## Desplegar en Vercel
1. En vercel.com → **Add New → Project** → importar el repositorio de GitHub.
2. Vercel detecta Vite y lee `vercel.json` (build `npm run build`, salida `dist/`, rutas limpias y reescrituras para que `/jardines-verticales` etc. funcionen al recargar).
3. Cada `git push` a `main` publica producción; cada rama/PR genera una URL de vista previa.

`public/robots.txt` bloquea la indexación mientras es boceto. Quitar el `Disallow` solo al lanzar en el dominio final, tras las compuertas de Mautai.

## Rutas
`/` · `/jardines-verticales` · `/azoteas-verdes` · `/paisajismo` · `/mantenimiento` · `/jardineria` · `/proyectos` · `/cotizar`

## Estructura
- `src/data/site.ts` — todo el contenido (servicios, FAQ, proyectos, contacto). Lo marcado `[VALIDAR]` requiere aprobación antes de publicar.
- `src/pages/Home.tsx` — home con mecánica Velar adaptada (preloader, muro que sube con scroll, cifras sticky, galería acordeón).
- `src/pages/ServicePage.tsx` — plantilla de servicio: hero, respuesta directa (GEO), tipos, beneficios/costo, proyectos, FAQ (schema FAQPage), enlazado interno.
- `src/components/Layout.tsx` — nav, footer, WhatsApp flotante, barra móvil, SEO por página (title, description, canonical, JSON-LD).
- `public/img/` — fotos reales en WebP (1800 px y 800 px `-sm`) y logos.

## Pendiente para producción
- Migrar a Astro/SSG para que cada página sea HTML estático (ver lineamientos).
- Colores del manual (#204f24, #4ead42, #3c3c36); Syne/Inter sustituyen a Volte hasta licenciarla.
- Fotos de azoteas verdes reales (hoy la página usa fotos de muros).
- Conectar cotizador a CRM (webhook) + GA4 `generate_lead`; hoy envía por WhatsApp.
- Publicar solo tras las compuertas de Mautai (índice saneado, medición, redirects 1:1).

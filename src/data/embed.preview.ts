// Solo en `npm run build:preview`: incrusta imágenes como data URI para un HTML autocontenido
// (versiones -sm, y -md para la galería del home).
const mods = import.meta.glob(['../../public/img/*-sm.webp', '../../public/img/*-md.webp', '../../public/img/logo-*.png'], { query: '?inline', import: 'default', eager: true });
export const EMBED: Record<string, string> = Object.fromEntries(Object.entries(mods).map(([p, v]) => [p.split('/').pop()!, v as string]));

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { fileURLToPath } from 'node:url';

// `npm run build`         → sitio de producción en dist/ (lo que se despliega en Vercel).
// `npm run build:preview` → un solo HTML autocontenido en dist-preview/ para compartir.
export default defineConfig(({ mode }) => {
  const preview = mode === 'preview';
  return {
    base: preview ? './' : '/',
    plugins: preview ? [react(), viteSingleFile()] : [react()],
    resolve: {
      alias: { '#embed': fileURLToPath(new URL(preview ? './src/data/embed.preview.ts' : './src/data/embed.empty.ts', import.meta.url)) },
    },
    build: { target: 'es2022', outDir: preview ? 'dist-preview' : 'dist', copyPublicDir: !preview },
  };
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import seoFiles from './scripts/seo-files.mjs';

export default defineConfig({
  plugins: [react(), seoFiles()],
  server: { port: 5173 },
  preview: { port: 4173 },
  build: {
    rolldownOptions: {
      output: {
        // Everything the first page needs stays in one chunk, so its CSS keeps
        // the order of the imports. Only the lazily loaded blog, article and
        // newsletter pages (App.jsx) get chunks of their own.
        codeSplitting: { groups: [{ name: 'app', tags: ['$initial'] }] },
      },
    },
  },
});

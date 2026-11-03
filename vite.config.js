import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import preloads from './scripts/preloads.mjs';
import seoFiles from './scripts/seo-files.mjs';

export default defineConfig({
  plugins: [react(), seoFiles(), preloads()],
  server: { port: 5173 },
  preview: { port: 4173 },
  build: {
    rolldownOptions: {
      output: {
        // Everything the first page needs stays in one chunk, so its CSS keeps
        // the order of the imports. Each lazily loaded page (pages/lazyPages.js)
        // gets a chunk of its own, and the blog, articles and newsletter share
        // one with the article library. The smaller pieces several other pages
        // share (icons, FAQ, page hero, form helpers) travel together in one
        // chunk rather than as many little files; blog modules are left out of
        // it, or every page would download the article library.
        codeSplitting: {
          groups: [
            // Highest priority, so nothing the first page needs moves out.
            { name: 'app', tags: ['$initial'], priority: 3 },
            {
              name: 'shared',
              test: /^(?!.*[\\/]src[\\/](data[\\/](articles[\\/]|blog\.js)|components[\\/]BlogPage[\\/]))/,
              minShareCount: 2,
              priority: 1,
            },
          ],
        },
      },
    },
  },
});

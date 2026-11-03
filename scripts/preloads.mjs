// Vite plugin (build only). From index.html, before the main script runs, it
// starts downloading the code and styles of the lazily loaded page at the
// address being opened (App.jsx), so that page downloads alongside the main
// script instead of after it. The file names carry content hashes, which is
// why this runs at build time.
//
// The fonts are not preloaded: on a slow connection they would compete with
// the hero image. Metric-matched fallbacks (styles/fonts.css) keep the swap
// from moving the page instead.

// Address → page component in src/pages. '/blogs/*' is any article.
const ROUTES = {
  '/about': 'AboutPage',
  '/ebook': 'EbookPage',
  '/podcast': 'PodcastPage',
  '/shop': 'ShopPage',
  '/blogs': 'BlogPage',
  '/blogs/*': 'ArticlePage',
  '/newsletter': 'NewsletterPage',
};

export default function preloads() {
  let base = '/';

  return {
    name: 'preloads',
    apply: 'build',

    configResolved(config) {
      base = config.base;
    },

    transformIndexHtml: {
      order: 'post',
      handler(html, { bundle }) {
        if (!bundle) return html;
        const files = Object.values(bundle);

        // Each page's chunk, the chunks it imports (not the main one, which
        // index.html already loads) and their styles.
        const byName = new Map(files.map((file) => [file.fileName, file]));
        const pageFiles = {};
        for (const [path, page] of Object.entries(ROUTES)) {
          const entry = files.find((file) => file.type === 'chunk' && file.facadeModuleId?.endsWith(`/src/pages/${page}.jsx`));
          if (!entry) throw new Error(`preloads: no chunk for src/pages/${page}.jsx`);
          const found = new Set();
          const visit = (chunk) => {
            if (!chunk || chunk.isEntry || found.has(chunk.fileName)) return;
            found.add(chunk.fileName);
            chunk.viteMetadata?.importedCss.forEach((css) => found.add(css));
            chunk.imports.forEach((name) => visit(byName.get(name)));
          };
          visit(entry);
          pageFiles[path] = [...found];
        }

        const script = {
          tag: 'script',
          children: `(() => {
        const files = ${JSON.stringify(pageFiles)};
        const path = location.pathname.replace(/(.)\\/$/, '$1');
        const list = files[path] ?? (path.startsWith('/blogs/') ? files['/blogs/*'] : null);
        for (const file of list ?? []) {
          const link = document.createElement('link');
          if (file.endsWith('.css')) Object.assign(link, { rel: 'preload', as: 'style' });
          else link.rel = 'modulepreload';
          // Vite requests these with crossorigin; the preload must match to be reused.
          link.crossOrigin = '';
          link.href = ${JSON.stringify(base)} + file;
          document.head.append(link);
        }
      })();`,
          injectTo: 'head',
        };
        return { html, tags: [script] };
      },
    },
  };
}

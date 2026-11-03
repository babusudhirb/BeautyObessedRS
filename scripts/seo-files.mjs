// Vite plugin that writes robots.txt and sitemap.xml.
//
// The sitemap needs the live site's full address, so it is only written when
// VITE_SITE_URL is set (in .env.production or the build command), e.g.
//   VITE_SITE_URL=https://www.your-domain.in npm run build
// Without it the build still writes robots.txt, which allows everything and
// simply leaves out the Sitemap line. Nothing here ever adds a noindex rule.
//
// The dev server serves both files too, using its own address, so they can be
// checked locally at /robots.txt and /sitemap.xml.

import { loadEnv } from 'vite';
import { articles } from '../src/data/articles/index.js';

// Finished pages. The "coming soon" placeholders in src/data/pages.js are left
// out until they have real content.
const PAGES = ['/', '/about', '/ebook', '/podcast', '/shop', '/blogs', '/newsletter'];

const escapeXml = (text) =>
  text.replace(/[<>&'"]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[char]);

export function sitemapEntries() {
  return [
    ...PAGES.map((path) => ({ path })),
    ...articles.map((article) => ({
      path: `/blogs/${article.slug}`,
      // Only real dates; none are set yet.
      lastmod: article.dateModified || article.datePublished || null,
    })),
  ];
}

export function sitemap(origin) {
  const urls = sitemapEntries().map(
    ({ path, lastmod }) =>
      `  <url>\n    <loc>${escapeXml(origin + path)}</loc>\n${lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ''}  </url>`,
  );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

export function robots(origin) {
  return ['User-agent: *', 'Allow: /', ...(origin ? ['', `Sitemap: ${origin}/sitemap.xml`] : []), ''].join('\n');
}

export default function seoFiles() {
  let siteUrl = '';

  return {
    name: 'seo-files',

    configResolved(config) {
      siteUrl = (loadEnv(config.mode, config.envDir || config.root, 'VITE_').VITE_SITE_URL || '').replace(/\/+$/, '');
      if (siteUrl && !/^https?:\/\/[^/\s]+$/.test(siteUrl)) {
        throw new Error(`VITE_SITE_URL must be an address like https://www.your-domain.in, not "${siteUrl}".`);
      }
    },

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = req.url.split('?')[0];
        if (path !== '/robots.txt' && path !== '/sitemap.xml') return next();
        const origin = siteUrl || `http://${req.headers.host}`;
        const isRobots = path === '/robots.txt';
        res.setHeader('Content-Type', isRobots ? 'text/plain; charset=utf-8' : 'application/xml; charset=utf-8');
        res.end(isRobots ? robots(origin) : sitemap(origin));
      });
    },

    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots(siteUrl) });
      if (siteUrl) {
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap(siteUrl) });
      } else {
        this.warn('VITE_SITE_URL is not set, so sitemap.xml was not written. Set it to the live domain for the launch build.');
      }
    },
  };
}

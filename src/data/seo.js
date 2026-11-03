// The live site's address, e.g. https://www.your-domain.in, set with
// VITE_SITE_URL in a .env file or in the build command. The site has no
// domain yet, so until it is set canonical links and structured data use the
// address the page is being viewed on.
export const siteUrl = (import.meta.env.VITE_SITE_URL || '').replace(/\/+$/, '');

export const absoluteUrl = (path) => `${siteUrl || window.location.origin}${path}`;

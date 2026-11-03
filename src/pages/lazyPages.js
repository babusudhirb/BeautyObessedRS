import { createElement, lazy, useState } from 'react';

// Pages that load their own code and styles when opened, so no page downloads
// another page's code. (The blog, its articles and the newsletter page also
// share the article library.) scripts/preloads.mjs lists the same pages.

// A lazily loaded page that renders straight away once its code is in, with
// no loading placeholder. Each mount picks one form and keeps it, so a page
// never remounts and loses its state.
function lazyPage(load) {
  let Loaded = null;
  const remember = () =>
    load().then((module) => {
      Loaded = module.default;
      return module;
    });
  const Lazy = lazy(remember);

  function Page(props) {
    const [Component] = useState(() => Loaded ?? Lazy);
    return createElement(Component, props);
  }
  Page.load = remember;
  return Page;
}

export const AboutPage = lazyPage(() => import('./AboutPage.jsx'));
export const ArticlePage = lazyPage(() => import('./ArticlePage.jsx'));
export const BlogPage = lazyPage(() => import('./BlogPage.jsx'));
export const EbookPage = lazyPage(() => import('./EbookPage.jsx'));
export const NewsletterPage = lazyPage(() => import('./NewsletterPage.jsx'));
export const PodcastPage = lazyPage(() => import('./PodcastPage.jsx'));
export const ShopPage = lazyPage(() => import('./ShopPage.jsx'));

const byPath = {
  '/about': AboutPage,
  '/ebook': EbookPage,
  '/podcast': PodcastPage,
  '/shop': ShopPage,
  '/blogs': BlogPage,
  '/newsletter': NewsletterPage,
};

// Loads the code of the page at the current address, if it is one of these.
// main.jsx waits for it before the first render; index.html has already
// started the download, so the wait is short.
export function loadCurrentPage() {
  const path = window.location.pathname.replace(/(.)\/$/, '$1');
  const page = byPath[path] ?? (path.startsWith('/blogs/') ? ArticlePage : null);
  return page ? page.load() : Promise.resolve();
}

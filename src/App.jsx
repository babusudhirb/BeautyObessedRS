import { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import ScrollManager from './components/ScrollManager.jsx';
import { upcomingPages } from './data/pages.js';
// Layout styles shared by several of the pages below. They stay in the first
// download, in their original place around the homepage's styles, so the
// cascade is unchanged and each page's own styles still come after them.
import './components/EbookLanding/EbookLanding.css';
import HomePage from './pages/HomePage.jsx';
import './components/PodcastPage/PodcastPage.css';
import UpcomingPage from './pages/UpcomingPage.jsx';
// Every other page loads its own code when it is opened.
import { AboutPage, ArticlePage, BlogPage, EbookPage, NewsletterPage, PodcastPage, ShopPage } from './pages/lazyPages.js';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />

      <main id="main" tabIndex={-1}>
        {/* Holds the footer below the fold while a lazy page loads. */}
        <Suspense fallback={<div className="route-loading" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ebook" element={<EbookPage />} />
            <Route path="/podcast" element={<PodcastPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/retail" element={<Navigate to="/shop" replace />} />
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="/blogs/:slug" element={<ArticlePage />} />
            <Route path="/blog" element={<Navigate to="/blogs" replace />} />
            <Route path="/newsletter" element={<NewsletterPage />} />
            <Route path="/about" element={<AboutPage />} />
            {upcomingPages.map((page) => (
              <Route key={page.path} path={page.path} element={<UpcomingPage {...page} />} />
            ))}
            <Route
              path="*"
              element={
                <UpcomingPage
                  title="We couldn’t find that page"
                  summary="The link may be out of date. The homepage has everything in one place."
                  notFound
                />
              }
            />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import ScrollManager from './components/ScrollManager.jsx';
import { upcomingPages } from './data/pages.js';
import AboutPage from './pages/AboutPage.jsx';
import EbookPage from './pages/EbookPage.jsx';
import HomePage from './pages/HomePage.jsx';
import PodcastPage from './pages/PodcastPage.jsx';
import ShopPage from './pages/ShopPage.jsx';
import UpcomingPage from './pages/UpcomingPage.jsx';

// The blog, its articles and the newsletter page share the article library,
// so they load as their own chunk that the other pages never download.
const ArticlePage = lazy(() => import('./pages/ArticlePage.jsx'));
const BlogPage = lazy(() => import('./pages/BlogPage.jsx'));
const NewsletterPage = lazy(() => import('./pages/NewsletterPage.jsx'));

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

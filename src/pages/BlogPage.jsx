import { useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import {
  ArticleGrid,
  BlogHero,
  BlogNewsletter,
  CategoryChips,
  EditorsPicks,
  ExploreMore,
  FeaturedStory,
  LoadMore,
  MeetEditor,
  PlanBand,
  WatchAndRead,
  articleUrl,
  categoryUrl,
} from '../components/BlogPage/BlogSections.jsx';
import { SectionHead } from '../components/EbookLanding/parts.jsx';
import { articles, categories, categoryLabel, featured } from '../data/blog.js';
import { absoluteUrl } from '../data/seo.js';
import useMetaDescription from '../hooks/useMetaDescription.js';
// Layout primitives shared with the e-book page, and the podcast page's inputs and stats.
import '../components/EbookLanding/EbookLanding.css';
import '../components/PodcastPage/PodcastPage.css';
import '../components/BlogPage/BlogPage.css';

const TITLE = 'Beauty Blog by Rachna Sinha — Skincare, Haircare and Everyday Routines';
const DESCRIPTION =
  'Skincare routines, haircare tips, product reviews and simple daily habits from beauty expert and salon founder Rachna Sinha.';

function readParams() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get('category');
  return {
    category: categories.some((item) => item.id === category) ? category : 'all',
    query: params.get('q') ?? '',
  };
}

// Searches titles, summaries, categories and each article's keywords.
const matches = (article, category, query) => {
  if (category !== 'all' && article.category !== category) return false;
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [article.title, article.summary, categoryLabel(article.category), article.keyword, ...article.secondaryKeywords].some(
    (text) => text.toLowerCase().includes(q),
  );
};

// Unfiltered, the page lists this many articles below the featured story
// (three beside it, six further down) and "Load more" shows the rest.
const FIRST_PAGE = 9;

// The blog page. Section order follows its design reference.
export default function BlogPage() {
  const [{ category, query }, setFilters] = useState(readParams);
  const [showAll, setShowAll] = useState(false);
  useMetaDescription(DESCRIPTION);

  // Mirror the filters in the URL without a router navigation, which would
  // scroll the page back to the top on every keystroke.
  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== 'all') params.set('category', category);
    if (query.trim()) params.set('q', query.trim());
    const search = params.toString();
    const url = `${window.location.pathname}${search ? `?${search}` : ''}${window.location.hash}`;
    if (url !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
      window.history.replaceState(window.history.state, '', url);
    }
  }, [category, query]);

  const showFeatured = matches(featured, category, query);
  const latest = useMemo(() => articles.filter((article) => matches(article, category, query)), [category, query]);
  const filtered = category !== 'all' || query.trim() !== '';
  const total = latest.length + (showFeatured ? 1 : 0);

  const rest = latest.slice(3);
  const firstRows = filtered ? rest : rest.slice(0, FIRST_PAGE - 3);
  const moreRows = filtered ? [] : rest.slice(FIRST_PAGE - 3);

  // Reveal the remaining articles and move focus to the first new one.
  const loadMore = () => {
    flushSync(() => setShowAll(true));
    document.querySelector('#blog-more-articles .blog-card__link')?.focus();
  };

  const clear = () => setFilters({ category: 'all', query: '' });
  const canonical = absoluteUrl('/blogs');
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'The Beauty Edit',
    description: DESCRIPTION,
    url: canonical,
    inLanguage: 'en',
    author: { '@type': 'Person', name: 'Rachna Sinha' },
    blogPost: [featured, ...articles].map((article) => ({
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.description,
      url: absoluteUrl(articleUrl(article.slug)),
      author: { '@type': 'Person', name: article.author },
    })),
  };

  return (
    <div className="ebk blog">
      <title>{TITLE}</title>
      <link rel="canonical" href={canonical} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <BlogHero query={query} onQuery={(value) => setFilters((current) => ({ ...current, query: value }))} />

      <div className="blog-stage">
        <CategoryChips active={category} onSelect={(id) => setFilters((current) => ({ ...current, category: id }))} />
        {showFeatured && <FeaturedStory article={featured} />}
        <section className="blog-latest" id="latest-articles" aria-labelledby="blog-latest-title">
          <div className="ebk-container">
            <SectionHead
              title={filtered ? (category === 'all' ? 'Matching articles' : categoryLabel(category)) : 'Latest articles'}
              titleId="blog-latest-title"
              aside={filtered ? `${total} ${total === 1 ? 'article' : 'articles'} · ` : null}
            >
              {filtered && (
                <a href={categoryUrl('all')} className="blog-clear" onClick={(event) => { event.preventDefault(); clear(); }}>
                  Show all
                </a>
              )}
            </SectionHead>
          </div>
          {latest.length === 0 && !showFeatured ? (
            <ArticleGrid part="empty" onClear={clear} />
          ) : (
            <ArticleGrid items={latest.slice(0, 3)} />
          )}
        </section>
      </div>

      <div className="blog-stage blog-stage--second">
        {firstRows.length > 0 && <ArticleGrid items={firstRows} />}
        {showAll && moreRows.length > 0 && <ArticleGrid items={moreRows} id="blog-more-articles" />}
        {!showAll && moreRows.length > 0 && (
          <LoadMore remaining={moreRows.length} onLoad={loadMore} controls="blog-more-articles" />
        )}
        <WatchAndRead />
      </div>

      <PlanBand />
      <EditorsPicks />
      <MeetEditor />
      <BlogNewsletter />
      <ExploreMore />
    </div>
  );
}

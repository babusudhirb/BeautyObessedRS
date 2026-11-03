import { Navigate, useParams } from 'react-router-dom';
import Picture from '../components/ui/Picture.jsx';
import { ExploreMore, articleUrl, categoryUrl } from '../components/BlogPage/BlogSections.jsx';
import {
  ArticleFaq,
  ArticleNote,
  ArticleSection,
  AuthorBox,
  Breadcrumbs,
  Contents,
  RelatedArticles,
  headingId,
} from '../components/BlogPage/ArticleSections.jsx';
import Rich from '../components/ui/Rich.jsx';
import UpcomingPage from './UpcomingPage.jsx';
import { articleBySlug, categoryLabel, movedArticles, relatedArticles } from '../data/blog.js';
import manifest from '../data/image-manifest.json';
import { absoluteUrl } from '../data/seo.js';
import useMetaDescription from '../hooks/useMetaDescription.js';
// Layout primitives shared with the e-book page, the blog page's cards, and the article's own styles.
import '../components/EbookLanding/EbookLanding.css';
import '../components/BlogPage/BlogPage.css';
import '../components/BlogPage/BlogArticle.css';

const FAQ_ID = 'faq';
const TAKEAWAY_ID = 'the-takeaway';

// /blogs/:slug. Addresses linked before the articles existed redirect to the
// article that replaced them; anything else is a "not found" page.
export default function ArticlePage() {
  const { slug } = useParams();
  const article = articleBySlug(slug);

  if (article) return <Article key={article.slug} article={article} />;
  if (movedArticles[slug]) return <Navigate to={articleUrl(movedArticles[slug])} replace />;
  return (
    <UpcomingPage
      title="We couldn’t find that article"
      summary="The link may be out of date. Every article is listed on the blog."
      back={{ label: 'Browse all articles', to: '/blogs' }}
      notFound
    />
  );
}

function structuredData(article, url) {
  const image = manifest[article.image];
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blogs' },
    { name: categoryLabel(article.category), path: categoryUrl(article.category) },
    { name: article.title, path: articleUrl(article.slug) },
  ];

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.description,
      image: absoluteUrl(`/images/${article.image}-${image.widths.at(-1)}.webp`),
      author: { '@type': 'Person', name: article.author, url: absoluteUrl('/about') },
      publisher: { '@type': 'Organization', name: 'Beauty Obsessed' },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      url,
      inLanguage: 'en-IN',
      articleSection: categoryLabel(article.category),
      keywords: [article.keyword, ...article.secondaryKeywords].join(', '),
      wordCount: article.words,
      // Only once real dates exist; none are invented.
      ...(article.datePublished && { datePublished: article.datePublished }),
      ...(article.dateModified && { dateModified: article.dateModified }),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path),
      })),
    },
  ];
}

function Article({ article }) {
  useMetaDescription(article.description);
  const url = absoluteUrl(articleUrl(article.slug));
  const sections = article.sections.map((section) => ({ ...section, id: headingId(section.heading) }));
  const contents = [
    ...sections,
    { id: FAQ_ID, heading: 'Frequently asked questions' },
    { id: TAKEAWAY_ID, heading: 'The takeaway' },
  ];

  return (
    <div className="ebk blog art">
      <title>{article.seoTitle}</title>
      <link rel="canonical" href={url} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(article, url)) }} />

      <article aria-labelledby="art-title">
        <header className="ebk-container art-head">
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Blog', to: '/blogs' },
              { label: categoryLabel(article.category), to: categoryUrl(article.category) },
              { label: article.title },
            ]}
          />
          <p className="blog-tag">{categoryLabel(article.category)}</p>
          <h1 className="art-title" id="art-title">
            {article.title}
          </h1>
          <p className="art-dek">{article.summary}</p>
          <p className="blog-meta art-byline">
            By <a href="#about-the-author">{article.author}</a> <span aria-hidden="true">·</span> {article.readTime}
          </p>
        </header>

        <div className="ebk-container art-cover">
          <Picture
            name={article.image}
            alt={article.alt}
            sizes="(min-width: 1340px) 1340px, 94vw"
            style={{ objectPosition: article.focus }}
            priority
          />
        </div>

        <div className="ebk-container art-layout">
          <Contents items={contents} />
          <div className="art-body">
            <div className="art-intro">
              {article.intro.map((paragraph) => (
                <p key={paragraph}>
                  <Rich text={paragraph} />
                </p>
              ))}
            </div>
            {sections.map((section) => (
              <ArticleSection key={section.id} {...section} />
            ))}
            <ArticleFaq id={FAQ_ID} faqs={article.faqs} />
            <section className="art-section" aria-labelledby={TAKEAWAY_ID}>
              <h2 className="art-h2" id={TAKEAWAY_ID}>
                The takeaway
              </h2>
              {article.conclusion.map((paragraph) => (
                <p key={paragraph}>
                  <Rich text={paragraph} />
                </p>
              ))}
            </section>
            <ArticleNote />
            <AuthorBox />
          </div>
        </div>
      </article>

      <RelatedArticles items={relatedArticles(article)} />
      <ExploreMore title="Explore more from Beauty Obsessed" />
    </div>
  );
}

// Copy and listings for the blog page (/blogs) and its articles (/blogs/<slug>).
//
// The articles themselves live in data/articles/, one file each. No
// publication dates are shown, because none exist yet.

import { youtubeChannel } from './podcastPage.js';
import { articleBySlug, articles as allArticles } from './articles/index.js';

export { articleBySlug };

export const hero = {
  eyebrow: 'The Beauty Edit · By Rachna Sinha',
  copy: 'Skincare routines, haircare tips, product reviews and simple daily habits from Rachna Sinha.',
  searchPlaceholder: 'Search skincare, haircare, ingredients…',
};

// `id` is used in the ?category= URL, so keep it stable once published.
export const categories = [
  { id: 'all', label: 'All' },
  { id: 'skincare', label: 'Skincare' },
  { id: 'haircare', label: 'Haircare' },
  { id: 'makeup', label: 'Makeup' },
  { id: 'nail-care', label: 'Nail Care' },
  { id: 'diet-nutrition', label: 'Diet & Nutrition' },
  { id: 'ingredients', label: 'Ingredients' },
  { id: 'product-reviews', label: 'Product Reviews' },
  { id: 'daily-routines', label: 'Daily Routines' },
  { id: 'beauty-myths', label: 'Beauty Myths' },
];

export const categoryLabel = (id) => categories.find((category) => category.id === id)?.label ?? id;

// Every article shows its cover image (`image`, a slug from image-manifest.json,
// with `focus` as its CSS object-position). The first article is featured.
export const [featured, ...articles] = allArticles;

// Categories that have at least one article, for the blog page's filter chips.
// The full list above stays, because the newsletter page links to each one.
export const activeCategories = categories.filter(
  (category) => category.id === 'all' || allArticles.some((article) => article.category === category.id),
);

// Addresses linked before the articles were written, mapped to the article
// that now covers the topic, so older links still land somewhere useful.
export const movedArticles = {
  'skincare-routine-for-beginners': 'beginner-skincare-routine-for-indian-skin',
  'skincare-routine-that-works-for-you': 'beginner-skincare-routine-for-indian-skin',
  'understand-your-skin-type': 'what-is-your-skin-type',
  'haircare-routine-dry-frizzy-hair': 'dry-frizzy-hair-care-routine',
  'haircare-tips-for-dry-frizzy-hair': 'dry-frizzy-hair-care-routine',
  'everyday-makeup-for-beginners': 'everyday-makeup-routine-for-beginners',
  'makeup-for-beginners': 'everyday-makeup-routine-for-beginners',
  'niacinamide-uses-benefits': 'vitamin-c-and-niacinamide-together',
  'sunscreen-myths': 'sunscreen-guide-spf-pa-ratings',
};

// An article's own related list, topped up from its category if it is short.
export function relatedArticles(article, count = 3) {
  const chosen = article.related.map(articleBySlug).filter(Boolean);
  const extra = allArticles.filter(
    (other) => other.category === article.category && other.slug !== article.slug && !chosen.includes(other),
  );
  return [...chosen, ...extra].slice(0, count);
}

// No video links have been supplied, so every card opens the channel itself.
// Set `url` to a video's own address once it is known.
export const videos = [
  { id: 'serum-review', title: 'Serum Review: Is It Worth It?', image: 'topic-skincare', focus: '60% 50%', url: null },
  // No contact-lens photograph exists yet; this is the makeup flat lay.
  { id: 'colour-lenses', title: 'Colour Lenses: Honest Review', image: 'topic-makeup', focus: '55% 55%', url: null },
  { id: 'affordable-serums', title: 'Affordable Serums Under ₹299', image: 'retail-hair-oil', focus: '70% 52%', url: null },
].map((video) => ({ ...video, to: video.url ?? youtubeChannel.url }));

export const planBand = {
  title: 'Want Rachna to plan your routine?',
  copy: 'Get a personalised daily plan for your skin, hair and diet, built by Rachna and her team.',
  cta: { label: 'Start Free Trial', to: '/#beauty-plan' },
};

export const picks = [
  'sunscreen-guide-spf-pa-ratings',
  'vitamin-c-and-niacinamide-together',
  'hair-fall-vs-hair-breakage',
  'how-to-layer-skincare-products',
].map(articleBySlug);

// The subscriber figure was supplied with this page's brief (7K+).
export const editor = {
  name: 'Rachna Sinha',
  bio: 'Rachna is a beauty expert, salon founder and trainer with over 10 years of experience and 3 salons in Bangalore. On YouTube, more than 7,000 people follow her for honest product reviews and beauty advice. The blog brings that same honesty to the routines, questions and people behind everyday beauty.',
  stats: [
    { icon: 'trophy', value: '10+', label: 'years in beauty' },
    { icon: 'store', value: '3', label: 'salons in Bangalore' },
    { icon: 'youtube', value: '7K+', label: 'YouTube subscribers' },
  ],
  link: { label: 'More about Rachna', to: '/about' },
};

// The author box at the end of every article. Only confirmed facts: no
// qualifications or credentials are claimed.
export const author = {
  name: 'Rachna Sinha',
  bio: 'Rachna Sinha is a beauty expert, salon founder and trainer with more than 10 years in beauty. She runs three XING Hair & Skin salons in Bangalore.',
  link: { label: 'About Rachna', to: '/about' },
};

// Shown under every article.
export const articleNote = {
  text: 'This article is general information, not medical advice. If a skin, hair or scalp concern is persistent, painful, spreading or worrying you, please see a dermatologist or doctor.',
  link: { label: 'Read the medical disclaimer', to: '/medical-disclaimer' },
};

export const newsletter = {
  title: ['One beauty tip a week,', 'straight to your inbox.'],
  consent: 'I agree to receive emails from Beauty Obsessed. You can unsubscribe at any time.',
};

export const explore = [
  { id: 'ebook', title: 'The E-book', copy: 'In-depth guides for your skincare and haircare routine.', cta: 'Explore E-books', to: '/ebook', image: 'ebook-collection', focus: '50% 70%' },
  { id: 'podcast', title: 'The Podcast', copy: 'Honest conversations about beauty, self-care and more.', cta: 'Listen Now', to: '/podcast', image: 'pod-studio', focus: '62% 38%' },
  { id: 'picks', title: 'Rachna’s Picks', copy: 'Thoughtfully chosen beauty essentials.', cta: 'Shop Now', to: '/shop', image: 'retail-hero', focus: '80% 55%' },
];

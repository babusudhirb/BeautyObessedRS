// The blog's articles, one file each, in the order the blog lists them. The
// first one is the blog page's featured story.
//
// Each file is plain data so it can also be read at build time (the sitemap in
// vite.config.js). Body text supports two bits of markup: [label](/path) for a
// link and **text** for bold. Blocks inside a section are either a string
// (a paragraph) or an object with a `type`:
//   h3 { text } · list { items, ordered } · tip { title, text }
//   table { caption, head, rows } · figure { image, alt, focus }
//
// No publication dates are set, because none exist yet. Set `datePublished`
// (and `dateModified`) as 'YYYY-MM-DD' when an article goes live; the page
// and its structured data show them only once they are set.

import beginnerSkincare from './beginner-skincare-routine-for-indian-skin.js';
import morningVsNight from './morning-vs-night-skincare-routine.js';
import budgetSkincare from './budget-skincare-routine-india.js';
import sunscreenGuide from './sunscreen-guide-spf-pa-ratings.js';
import layering from './how-to-layer-skincare-products.js';
import dryVsDehydrated from './dry-skin-vs-dehydrated-skin.js';
import skincareMistakes from './common-skincare-mistakes-beginners.js';
import haircareRoutine from './haircare-routine-for-beginners-india.js';
import hairFallVsBreakage from './hair-fall-vs-hair-breakage.js';
import hairWashing from './how-often-should-you-wash-your-hair.js';
import frizzyHair from './dry-frizzy-hair-care-routine.js';
import hairOiling from './hair-oiling-guide.js';
import busyRoutine from './daily-beauty-routine-for-busy-people.js';
import everydayMakeup from './everyday-makeup-routine-for-beginners.js';
import makeupForSkinType from './how-to-choose-makeup-for-your-skin-type.js';
import bagEssentials from './beauty-essentials-for-your-bag.js';
import skinType from './what-is-your-skin-type.js';
import vitaminCNiacinamide from './vitamin-c-and-niacinamide-together.js';
import newProduct from './how-to-introduce-new-skincare-product.js';
import weeklyChecklist from './weekly-skin-and-hair-self-care-checklist.js';

const WORDS_PER_MINUTE = 200;

const plain = (text) => text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*/g, '');

function blockText(block) {
  if (typeof block === 'string') return block;
  switch (block.type) {
    case 'list':
      return block.items.join(' ');
    case 'table':
      return [...block.head, ...block.rows.flat()].join(' ');
    case 'tip':
      return `${block.title} ${block.text}`;
    case 'h3':
      return block.text;
    default:
      return '';
  }
}

// Every word a reader sees in the article body, FAQs included.
export function articleText(article) {
  return [
    ...article.intro,
    ...article.sections.flatMap((section) => [section.heading, ...section.blocks.map(blockText)]),
    ...article.faqs.flatMap((faq) => [faq.question, faq.answer]),
    ...article.conclusion,
  ]
    .map(plain)
    .join(' ');
}

const wordCount = (article) => articleText(article).split(/\s+/).filter(Boolean).length;

export const articles = [
  beginnerSkincare,
  morningVsNight,
  budgetSkincare,
  sunscreenGuide,
  layering,
  dryVsDehydrated,
  skincareMistakes,
  haircareRoutine,
  hairFallVsBreakage,
  hairWashing,
  frizzyHair,
  hairOiling,
  busyRoutine,
  everydayMakeup,
  makeupForSkinType,
  bagEssentials,
  skinType,
  vitaminCNiacinamide,
  newProduct,
  weeklyChecklist,
].map((article) => {
  const words = wordCount(article);
  return {
    author: 'Rachna Sinha',
    datePublished: null,
    dateModified: null,
    ...article,
    faqs: article.faqs.map((faq, index) => ({ ...faq, id: `${article.slug}-${index + 1}` })),
    words,
    readTime: `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min read`,
  };
});

export const articleBySlug = (slug) => articles.find((article) => article.slug === slug);

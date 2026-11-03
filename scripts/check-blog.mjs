// Checks the blog articles in src/data/articles before a build:
// unique slugs, titles and descriptions, sensible lengths, existing images,
// links that point at real pages, related articles, FAQs and repeated text.
//
//   npm run check:blog
//
// Errors fail the check; warnings are printed for a human to judge.

import { readFileSync } from 'node:fs';
import { articles, articleText } from '../src/data/articles/index.js';
import { upcomingPages } from '../src/data/pages.js';

const manifest = JSON.parse(readFileSync(new URL('../src/data/image-manifest.json', import.meta.url), 'utf8'));

// The category ids defined in src/data/blog.js (read as text: that module
// depends on Vite's import.meta.env).
const blogSource = readFileSync(new URL('../src/data/blog.js', import.meta.url), 'utf8');
const categoryBlock = blogSource.slice(blogSource.indexOf('export const categories'), blogSource.indexOf('];', blogSource.indexOf('export const categories')));
const categoryIds = new Set([...categoryBlock.matchAll(/id: '([a-z-]+)'/g)].map((match) => match[1]));

// Every route the app renders (App.jsx), plus homepage sections.
const ROUTES = new Set(['/', '/about', '/ebook', '/podcast', '/shop', '/blogs', '/newsletter', ...upcomingPages.map((page) => page.path)]);
const HOME_SECTIONS = new Set(['about', 'beauty-plan', 'ebook', 'podcast', 'retail', 'blogs', 'faq']);

const errors = [];
const warnings = [];
const slugs = new Set(articles.map((article) => article.slug));

const linksIn = (text) => [...text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map((match) => match[2]);
const allStrings = (article) => [
  ...article.intro,
  ...article.sections.flatMap((section) =>
    section.blocks.flatMap((block) => {
      if (typeof block === 'string') return [block];
      if (block.type === 'list') return block.items;
      if (block.type === 'tip') return [block.text];
      return [];
    }),
  ),
  ...article.conclusion,
];

function checkLink(article, href) {
  const where = `${article.slug}: link ${href}`;
  if (/^https?:/.test(href)) return warnings.push(`${where} is external`);
  const [path, hash] = href.split('#');
  if (path.startsWith('/blogs/')) {
    if (!slugs.has(path.slice('/blogs/'.length))) errors.push(`${where} points at an article that does not exist`);
    return undefined;
  }
  if (path === '/' && hash) {
    if (!HOME_SECTIONS.has(hash)) errors.push(`${where} points at an unknown homepage section`);
    return undefined;
  }
  if (!ROUTES.has(path)) errors.push(`${where} points at a page that does not exist`);
  return undefined;
}

const seen = { title: new Map(), seoTitle: new Map(), description: new Map(), keyword: new Map() };
const paragraphs = new Map();

if (articles.length !== 20) errors.push(`expected 20 articles, found ${articles.length}`);
if (slugs.size !== articles.length) errors.push('two articles share a slug');

for (const article of articles) {
  const id = article.slug;

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) errors.push(`${id}: slug must be lowercase words joined by hyphens`);
  if (!categoryIds.has(article.category)) errors.push(`${id}: unknown category "${article.category}"`);

  for (const field of Object.keys(seen)) {
    const value = article[field]?.toLowerCase();
    if (!value) errors.push(`${id}: missing ${field}`);
    else if (seen[field].has(value)) errors.push(`${id}: ${field} duplicates ${seen[field].get(value)}`);
    else seen[field].set(value, id);
  }

  if (article.seoTitle.length > 60) warnings.push(`${id}: SEO title is ${article.seoTitle.length} characters (aim for 60 or fewer)`);
  if (article.description.length < 120 || article.description.length > 160) {
    warnings.push(`${id}: meta description is ${article.description.length} characters (aim for 120–160)`);
  }
  if (!article.secondaryKeywords?.length) errors.push(`${id}: no secondary keywords`);
  if (article.words < 800) warnings.push(`${id}: ${article.words} words (brief asks for roughly 800–1,200)`);

  for (const image of [article.image, ...article.sections.flatMap((s) => s.blocks.filter((b) => b.type === 'figure').map((b) => b.image))]) {
    if (!manifest[image]) errors.push(`${id}: image "${image}" is not in image-manifest.json`);
  }
  if (!article.alt?.trim()) errors.push(`${id}: cover image has no alt text`);
  for (const block of article.sections.flatMap((s) => s.blocks)) {
    if (block.type === 'figure' && !block.alt?.trim()) errors.push(`${id}: figure "${block.image}" has no alt text`);
  }

  const headings = article.sections.map((section) => section.heading.toLowerCase());
  if (new Set(headings).size !== headings.length) errors.push(`${id}: two sections share a heading`);

  if (article.faqs.length < 4 || article.faqs.length > 6) errors.push(`${id}: ${article.faqs.length} FAQs (expected 4–6)`);
  if (new Set(article.faqs.map((faq) => faq.question)).size !== article.faqs.length) errors.push(`${id}: repeated FAQ question`);
  for (const faq of article.faqs) {
    if (/\]\(/.test(faq.answer)) errors.push(`${id}: FAQ answers are plain text; remove the link in "${faq.question}"`);
  }

  if (article.related.length < 3) errors.push(`${id}: fewer than 3 related articles`);
  for (const related of article.related) {
    if (related === id) errors.push(`${id}: lists itself as related`);
    else if (!slugs.has(related)) errors.push(`${id}: related article "${related}" does not exist`);
  }

  const text = allStrings(article).join(' ');
  const links = linksIn(text);
  links.forEach((href) => checkLink(article, href));
  if (!links.some((href) => href.startsWith('/blogs/'))) errors.push(`${id}: no links to other articles`);
  if (!links.some((href) => !href.startsWith('/blogs/'))) warnings.push(`${id}: no links to the e-book, podcast, shop or about pages`);

  // Unmatched markup would show up as stray brackets or asterisks.
  const stripped = articleText(article);
  if (/\*\*|\]\(|\[[^\]]*$/.test(stripped)) errors.push(`${id}: unbalanced [link]() or **bold** markup`);

  for (const paragraph of allStrings(article)) {
    if (paragraph.length < 80) continue;
    if (paragraphs.has(paragraph) && paragraphs.get(paragraph) !== id) {
      errors.push(`${id}: repeats a paragraph from ${paragraphs.get(paragraph)}: "${paragraph.slice(0, 60)}…"`);
    }
    paragraphs.set(paragraph, id);
  }
}

for (const warning of warnings) console.log(`warning  ${warning}`);
for (const error of errors) console.log(`error    ${error}`);
const words = articles.reduce((sum, article) => sum + article.words, 0);
console.log(`\n${articles.length} articles, ${words.toLocaleString('en-IN')} words, ${errors.length} errors, ${warnings.length} warnings`);
process.exit(errors.length ? 1 : 0);

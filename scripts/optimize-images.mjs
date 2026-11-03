// Builds responsive WebP derivatives of the original PNG artwork.
//
// The originals stay untouched in the project root; this script only reads
// them and writes resized copies to public/images plus a manifest that the
// <Picture> component uses to build srcset attributes.
//
// Run with: npm run images

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public', 'images');
const manifestPath = path.join(root, 'src', 'data', 'image-manifest.json');

// slug used in code  <-  original filename on disk (spaces and doubled
// extensions are intentional: they match the supplied files exactly)
const SOURCES = [
  { slug: 'hero-rachna', file: 'hero section rachna.png' },
  { slug: 'hero-book', file: 'hero image book.png' },
  { slug: 'hero-salon', file: 'salon hero section dwon.png' },
  { slug: 'podcast-rachna', file: 'podcast-rachna.png.png' },
  { slug: 'ebook-product', file: 'ebook-product.png.png' },
  { slug: 'beauty-plan-phone', file: 'beauty-plan-phone.png.png' },
  { slug: 'blog-haircare', file: 'blog-haircare.png' },
  { slug: 'blog-makeup', file: 'blog-makeup.png' },
  { slug: 'blog-skincare', file: 'blog-skincare.png' },
  { slug: 'product-bodycare', file: 'product-bodycare.png.png' },
  { slug: 'product-haircare', file: 'product-haircare.png' },
  { slug: 'product-skincare', file: 'product-skincare.png.png' },
  { slug: 'product-sunscreen', file: 'product-sunscreen.png' },

  // Homepage photographs supplied later. Each replaces one use of an earlier
  // photograph, which is still needed elsewhere and so keeps its own entry.
  { slug: 'home-hero-portrait', file: 'hero section girls in homepage.png' },
  { slug: 'home-podcast', file: 'homapge podcast image.png' },

  // Podcast page (/podcast). Files live in the podcast/ folder.
  { slug: 'pod-hero', file: 'podcast/podcast hero section image .png' },
  { slug: 'pod-studio', file: 'podcast/champagne-gold aesthetic f.png' },
  // Phone-shaped versions of the podcast and shop heroes (both supplied in podcast/).
  { slug: 'pod-hero-mobile', file: 'podcast/mobile-friendly hero image podcast .png' },
  { slug: 'shop-hero-mobile', file: 'podcast/Shop page hero image mobile.png' },
  // The headphones on the studio desk, for the show-format tile.
  {
    slug: 'pod-headphones',
    file: 'podcast/champagne-gold aesthetic f.png',
    extract: { left: 1180, top: 470, width: 492, height: 330 },
    widths: [492],
  },
  { slug: 'topic-routines', file: 'podcast/Daily Routines.png' },
  { slug: 'topic-skincare', file: 'podcast/Skincare.png' },
  { slug: 'topic-haircare', file: 'podcast/beauty  hair image.png' },
  { slug: 'topic-diet', file: 'podcast/l salad.png' },
  { slug: 'topic-makeup', file: 'podcast/brushes, cosmetics.png' },
  { slug: 'topic-salon', file: 'podcast/luxury salon.png' },

  // Shop page (/shop). Files live in the retail/ folder.
  { slug: 'retail-hero', file: 'retail/hero secttion image.png' },
  { slug: 'retail-cat-haircare', file: 'retail/hair-care product.png' },
  { slug: 'retail-cat-nailcare', file: 'retail/nail-care product.png' },
  { slug: 'retail-cat-bodycare', file: 'retail/body-care product.png' },
  { slug: 'retail-serum', file: 'retail/skin care secton Radiance Face Serum.png' },
  { slug: 'retail-moisturiser', file: 'retail/Hydrating Moisturiser product.png' },
  { slug: 'retail-shampoo', file: 'retail/Nourishing Shampoo product.png' },
  { slug: 'retail-conditioner', file: 'retail/Repairing Conditioner product.png' },
  { slug: 'retail-hair-mask', file: 'retail/Intensive Hair Mask.png' },
  { slug: 'retail-hair-oil', file: 'retail/Hair Growth Oil.png' },
  { slug: 'retail-nail-oil', file: 'retail/Nail Care Oil.png' },
  { slug: 'retail-nail-strengthener', file: 'retail/Nail Strengthener.png' },
  { slug: 'retail-cuticle-cream', file: 'retail/Cuticle Cream.png' },
  { slug: 'retail-hand-cream', file: 'retail/Hand Cream.png' },
  // No separate cleanser photograph was supplied: this is the Gentle Face
  // Cleanser tube from the shop's hero photograph.
  {
    slug: 'retail-cleanser',
    file: 'retail/hero secttion image.png',
    extract: { left: 848, top: 280, width: 300, height: 450 },
    widths: [300],
  },

  // Newsletter page (/newsletter). The desktop and phone heroes, and the RS
  // monogram for the navbar, trimmed to its visible edges.
  { slug: 'nl-hero', file: 'hero section of news letter.png' },
  { slug: 'nl-hero-mobile', file: 'hero section in mobile view newsletter.png' },
  {
    slug: 'nav-logo',
    file: 'Rs logo in nav bar.png',
    extract: { left: 102, top: 77, width: 1351, height: 922 },
    widths: [96, 192],
    keepAlpha: true,
  },

  // About page (/about): Rachna at the RS reception desk.
  { slug: 'about-hero', file: 'Hero section image NEW .png' },

  // E-book landing page (/ebook)
  { slug: 'ebook-hero-books', file: 'ebook hero section books.png' },
  { slug: 'ebook-cover-daily-routine', file: 'ebook-beauty-daily-routine.png.png' },
  { slug: 'ebook-cover-skincare', file: 'ebook-skincare-guide.png.png' },
  { slug: 'ebook-cover-haircare', file: 'ebook-haircare-guide.png.png' },
  { slug: 'ebook-collection', file: 'ebook-complete-collection.png.png' },
  { slug: 'ebook-inside-spread', file: 'ebook-inside-spread.png' },
  // The author photograph has its caption painted into the left half. The
  // page sets that caption as real text, so only the photograph is used.
  {
    slug: 'ebook-author-reading',
    file: 'reading e book.png',
    extract: { left: 745, top: 36, width: 940, height: 846 },
    widths: [320, 640, 940],
  },
  // The salon banner has its headline, bullet points and button painted into
  // a dark centre panel (x 925 to 1737). The page uses only the photograph of
  // the book to the left of it and sets the words as real text and a link.
  {
    slug: 'ebook-salon-book',
    file: 'Salon Expert Guide banner ebook.png',
    extract: { left: 0, top: 0, width: 925, height: 725 },
    widths: [480, 925],
  },

  // Crops of an original, for the small "What you'll find inside" thumbnails.
  {
    slug: 'inside-skincare',
    file: 'product-skincare.png.png',
    extract: { left: 300, top: 60, width: 1029, height: 865 },
    widths: [152, 304],
  },
  {
    slug: 'inside-haircare',
    file: 'product-haircare.png',
    extract: { left: 0, top: 262, width: 891, height: 749 },
    widths: [152, 304],
  },
  // The next two are the nail and food photographs shown inside the phone
  // mockup: the only nail-care and diet imagery among the supplied assets.
  // They are tiny in the source, so a 2x copy is produced for high-density
  // screens; swap in dedicated photographs when they exist.
  {
    slug: 'inside-nailcare',
    file: 'beauty-plan-phone.png.png',
    extract: { left: 781, top: 511, width: 78, height: 80 },
    widths: [78, 156],
  },
  {
    slug: 'inside-diet',
    file: 'beauty-plan-phone.png.png',
    extract: { left: 781, top: 746, width: 78, height: 80 },
    widths: [78, 156],
  },
];

const TARGET_WIDTHS = [480, 800, 1200, 1600];

await mkdir(outDir, { recursive: true });
await mkdir(path.dirname(manifestPath), { recursive: true });

const manifest = {};

for (const { slug, file, extract, widths: fixedWidths } of SOURCES) {
  const input = path.join(root, file);
  const source = () => (extract ? sharp(input).extract(extract) : sharp(input));
  const { width, height } = extract ?? (await sharp(input).metadata());

  // Never upscale a full photograph: keep the target widths below the source,
  // then the source itself. Crops list their widths explicitly.
  const widths = fixedWidths ?? [...TARGET_WIDTHS.filter((w) => w < width), width];

  for (const w of widths) {
    await source()
      .resize({ width: w, kernel: 'lanczos3' })
      .webp({ quality: extract ? 90 : 80, effort: 5 })
      .toFile(path.join(outDir, `${slug}-${w}.webp`));
  }

  manifest[slug] = { width, height, widths, source: file, ...(extract && { extract }) };
  console.log(`${slug.padEnd(20)} ${width}x${height} -> ${widths.join(', ')}`);
}

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`\nWrote ${path.relative(root, manifestPath)}`);

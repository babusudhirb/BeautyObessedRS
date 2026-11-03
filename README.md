# Rachna — Beauty Obsessed

Homepage for Rachna: beauty expert, salon founder (XING Hair & Skin) and trainer.
React 19 + Vite, plain CSS with design tokens, React Router for page links.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the production build
npm run check:blog  # check the 20 articles: slugs, titles, links, images, FAQs
```

## Where things live

```
src/
  styles/tokens.css        brand colours, type, spacing, radii, shadows
  styles/base.css          reset, containers, shared heading and card styles
  data/site.js             navigation, social links, salon info, newsletter endpoint
  data/content.js          all homepage copy and listings
  data/ebooks.js           all copy and listings for the e-book page (/ebook)
  data/podcastPage.js      copy for the podcast page (/podcast)
  data/shop.js             copy and products for the shop page (/shop)
  data/blog.js             listings, categories, videos and copy for the blog (/blogs)
  data/articles/           the 20 articles, one file each, and index.js (order, read times)
  data/seo.js              the live domain (VITE_SITE_URL) for canonical links
  data/newsletterPage.js   copy for the newsletter page (/newsletter)
  data/aboutPage.js        copy, roles, qualifications and timings for the About page (/about)
  data/pages.js            pages that are linked but not built yet
  components/Hero/         the collage: Hero, four panels, geometry + layout,
                           and the podcast greeting (HeroPodcastInset)
  components/Ebook/        the homepage's e-book section
  components/EbookLanding/ the e-book page: one component per section, one stylesheet
  components/PodcastPage/  the podcast page sections
  components/ShopPage/     the shop page sections
  components/BlogPage/     the blog page sections, and the article page's (ArticleSections)
  components/NewsletterPage/ the newsletter page sections
  components/AboutPage/    the About page: hero sequence, sections, gold botanical line art
  components/PageHero/     the hero shared by the podcast and shop pages
  components/Podcast/      the podcast section, episode player and audio hook
  components/…             one folder per homepage section
  components/ui/           Button, ArrowLink, Picture, SectionHeader, icons
  pages/                   HomePage, EbookPage, PodcastPage, ShopPage, BlogPage, ArticlePage,
                           NewsletterPage, AboutPage, UpcomingPage
scripts/optimize-images.mjs
scripts/seo-files.mjs      writes robots.txt and sitemap.xml (a Vite plugin)
scripts/check-blog.mjs     npm run check:blog
public/images/             generated WebP files (do not edit by hand)
```

## The hero collage

`components/Hero/heroLayout.js` describes the four panels as polygons that share
vertices, as fractions of the hero's size. `geometry.js` insets each polygon by
half the gap and rounds every corner, and the result is applied as a CSS
`clip-path`. To change the composition, move the named points in
`collageLayout()` (desktop) or `compactLayout()` (tablet and mobile).

Text and images inside the panels are sized in container units (`cqw` / `cqh`)
in `Hero.css`, so the whole collage scales as one piece.

The podcast photograph in the salon panel shows a short greeting on hover,
keyboard focus or first tap (`HeroPodcastInset.jsx`). `popoverPlacement.js`
picks its position each time it opens: above the photograph if that is free,
otherwise the nearest spot that does not cover the heading, the buttons, the
salon label, the e-book text or Rachna's face.

## The e-book page

`/ebook` is built from `pages/EbookPage.jsx`, with its sections in
`components/EbookLanding` and every word in `data/ebooks.js`. On `/ebook` (and
anything beneath it) the navbar switches to the e-book links, the search and
bag icons and "Get the Bundle"; that set lives in `site.js` → `ebookNav`.

Nothing is sold yet. Every buy button goes to `/ebook/checkout?item=…`, a
"coming soon" page that says nothing has been ordered. When a real checkout
exists, change the `checkout()` helper at the top of `data/ebooks.js`.

The free sample chapter form follows the newsletter's rule: it only reports
success when `VITE_SAMPLE_CHAPTER_ENDPOINT` accepts a `POST` with
`{ "email": "…" }`.

Two supplied images have words painted into them (`reading e book.png` and
`Salon Expert Guide banner ebook.png`). The page crops to the photograph and
sets those words as real text and links; the crops are the `extract` entries
in `scripts/optimize-images.mjs`.

## The podcast and shop pages

`/podcast` and `/shop` (`/retail` redirects to it) share the e-book page's
navbar set (`site.js` → `pageNav`), its layout primitives and its FAQ
component. Their photographs come from the `podcast/` and `retail/` folders
through `scripts/optimize-images.mjs`.

The podcast page reuses the homepage's episode data and player, so both pages
always list the same episodes. Its "Notify Me" and guest forms follow the
newsletter's rule and only report success when `VITE_NEWSLETTER_ENDPOINT` and
`VITE_GUEST_REQUEST_ENDPOINT` accept the request.

Each product's "View Product" link opens `/shop/<product>` (a "coming soon"
page) until its `url` is set in `data/shop.js`, e.g. to its Amazon listing.
No prices, stock or cart exist.

On phones the podcast and shop heroes switch to the phone-shaped photographs
(`pod-hero-mobile`, `shop-hero-mobile`) through `PageHero`'s `mobileImage`.

## The blog page

`/blogs` (`/blog` redirects to it) uses the homepage navbar with Blogs marked
current. Category chips and search filter in place and are mirrored in the URL
(`/blogs?category=haircare`, `/blogs?q=serum`), so filtered views can be
shared and crawled. Search also matches each article's keywords. The first
article is the featured story; nine more are listed, and "Load more" shows the
rest. Only categories that have articles get a chip; a category linked from
elsewhere with no articles yet (e.g. Nail Care from the newsletter page) shows
an empty state. Video cards open the YouTube channel until each video's `url`
is set in `data/blog.js`.

## Blog articles

Each article is `/blogs/<slug>` (`pages/ArticlePage.jsx`), built from its file
in `data/articles/`: breadcrumb, category, H1, summary, byline and read time,
cover photo, a contents box (sticky beside the text on laptops, above it on
smaller screens), the sections, FAQs, "The takeaway", a medical note, the
author box, three related articles and the explore cards. Read times are
worked out from the word count (200 words a minute).

The articles are attributed to Rachna Sinha and say nothing she has not
confirmed: no qualifications, personal stories, testimonials or product
testing. Rachna should read each one before launch. No publication dates
exist; set `datePublished` (and `dateModified`) as `'YYYY-MM-DD'` in an
article's file when it goes live and the structured data and sitemap pick it up.

To add an article, copy an existing file in `data/articles/`, change every
field (the slug must be unique, lowercase and hyphenated), add it to the list
in `data/articles/index.js` and run `npm run check:blog`. Body text can use
`[link text](/path)` and `**bold**`; the block types are listed at the top of
`index.js`. FAQ answers are plain text.

Addresses linked before the articles existed (the homepage's three blog cards,
the newsletter's sample issue) redirect to the article that replaced them:
`data/blog.js` → `movedArticles`. Unknown slugs show "Page not found".

The blog, its articles and the newsletter page load as a separate chunk
(`React.lazy` in `App.jsx`), so the other pages do not download the article
text. `vite.config.js` keeps everything the first page needs in one chunk,
which keeps the stylesheet in its original order.

## SEO and launch

- Each article has its own `<title>`, meta description, canonical link and
  `BlogPosting` + `BreadcrumbList` structured data. The blog page has `Blog`
  structured data listing every post. No ratings, reviews, dates or
  credentials are included.
- Set the live domain before the launch build, in `.env.production` (see
  `.env.example`) or the command:
  `VITE_SITE_URL=https://www.your-domain.in npm run build`.
  Canonical links and structured data then use it, and the build writes
  `dist/sitemap.xml` (the six finished pages and the 20 articles; "coming
  soon" pages are left out) and a `robots.txt` that points at it. Without it,
  pages use the address they are viewed on and the build skips the sitemap.
- `robots.txt` always allows everything; nothing adds `noindex`.
- The dev server serves `/robots.txt` and `/sitemap.xml` for checking.
- The host must serve `index.html` for every path so article URLs work when
  opened directly (see "Adding a real page").
- Titles and descriptions are set in the browser. Google renders JavaScript,
  but link previews on social apps read only the HTML, so they will show the
  site-wide title until the pages are pre-rendered.

## The newsletter page

`/newsletter` (The Beauty Letter) is built from `pages/NewsletterPage.jsx`,
with its sections in `components/NewsletterPage` and every word in
`data/newsletterPage.js`. It reuses the blog page's plan band, chips and
explore cards. Newsletter is in the navbar on every page and in the footer.

Its photographs are blended into the page with CSS masks rather than boxed:
the hero portrait fades out on its left and lower edges, the salon photo in
"A note from Rachna" fades on every side, and the past-issue photos fade into
their cards. The masks are in `NewsletterPage.css`.

Both sign-up forms use `VITE_NEWSLETTER_ENDPOINT` and need the consent box
ticked; they only report success when the endpoint accepts the request.
Past-issue cards open `/newsletter/archive`, a "coming soon" page, until real
issues exist.

## The newsletter page

`/newsletter` shows the RS monogram in the navbar and links each nav item to
its own page (`site.js` → `newsletterNav`). Both sign-up forms post to
`VITE_NEWSLETTER_ENDPOINT`, require the consent box, and only report success
when the endpoint accepts the request. The phone hero uses
`hero section in mobile view newsletter.png`.

Still to supply (`data/newsletterPage.js`): the welcome gift (`hero.welcomeGift`,
hidden while null), Rachna's own note (`note.quote`), the answers on cost and
promotional emails, and published issues (cards say "Coming soon").

## The About page

`/about` (`pages/AboutPage.jsx`) follows `about me refrence image .png`: a
full-width hero, My Story with a photo collage, the professional-experience
band, qualifications, What I Do, the philosophy band, Explore Beauty Obsessed
and a closing banner. Every About Me / About link in the navbar and footer now
opens it; the homepage's own About section stays where it is.

The hero photograph is `Hero section image NEW .png` (`about-hero`). Behind
the fixed text, three photographs crossfade: Rachna, the e-books, then the
products. Each stays for 5 s, the crossfade takes 500 ms and its caption
arrives 1 s after it (`aboutPage.js` → `heroSequence`). The dots choose a
photograph and the button pauses the sequence; it also waits while the tab is
hidden, and with reduced motion it never advances on its own. The panel's
curved edge is an SVG clip path in 0–1 units (`AboutHero.jsx`), so it scales
with the hero.

Nothing about Rachna is invented. In `data/aboutPage.js`:

- Roles show without dates until `period` is set (e.g. `'2015 – Present'`).
- Entries with `confirmed: false` (the Mentor role) never appear on the live site.
- Qualifications have no entries yet, so each panel says details are being
  confirmed. Add entries as `{ qualification, institution, field, year }`,
  `{ course, provider, subject, year }` or `{ certificate, issuer, year,
  credentialUrl }`; only filled fields show. A certificate scan can be added as
  `image` (a manifest slug) once its use is approved.
- In the dev server (`npm run dev`) unconfirmed items show as dashed "Draft"
  labels so the layout can be checked; the production build hides them.
- The story is written from confirmed facts; replace it with Rachna's own words.

## The podcast player

The player in `components/Podcast` is a real audio player that stays switched
off until an episode has audio. To publish an episode, fill in its entry in
`content.js` → `podcast.episodes`:

```js
{ id: 'episode-1', title: 'Real title', topic: 'Skincare', duration: '36 min', audioUrl: '/audio/episode-1.mp3' }
```

`audioUrl` can be a full URL or a file under `public/`. With it set, the play
button, progress bar and clock work, and the tag changes from "Coming soon" to
"Latest episode". Nothing ever plays on its own. The first episode in the list
is the featured one; the next two appear as cards beneath it.

## Images

The original PNGs stay in the project root, untouched. `npm run images` reads
them and writes responsive WebP copies to `public/images` plus
`src/data/image-manifest.json`, which `<Picture>` uses to build `srcset`.

To replace a photo: overwrite the PNG in the root (same filename) and run
`npm run images`. To add one, add it to `SOURCES` in the script first.

The four small "What you'll find inside" thumbnails are crops of supplied
photographs, defined by the `extract` entries in the same script. The nail and
diet thumbnails come from the phone mockup and are low resolution; replace them
when dedicated photographs exist.

`Refrence image .png`, `refrence image section .png`,
`Refrence image of ebook.png`, `podcast/refrence image podcast.png` and
`retail/refrence image of retail.png` and `Blog refrence image .png` are design
references only. They are
never loaded by the site.

## Content still needed

Nothing on the site is invented. Where real information was not available the
UI shows a neutral placeholder or hides the field. Search `data/` for `null`,
`placeholder` and `TODO`:

| What | Where |
|---|---|
| Students trained, clients served | `content.js` → `stats` |
| Plan pricing | `content.js` → `plans[].price` |
| Podcast episode titles, topics, durations, audio | `content.js` → `podcast.episodes` |
| Podcast cover artwork (the studio photo is used until one exists) | `PodcastSection.jsx` → `PodcastCover` |
| Product names, prices, shop links | `content.js` → `products` |
| Approval of the quote (adds "— Rachna") | `content.js` → `quote.approved` |
| Homepage blog card titles and summaries (still the earlier placeholders; they link to the new articles) | `content.js` → `posts` |
| FAQ answers on trial terms, booking, plan changes | `content.js` → `faqs` |
| Instagram, YouTube, Spotify, Apple Podcasts URLs | `site.js` → `externalProfiles` |
| Salon addresses | `site.js` → `salon.locations` |
| Newsletter backend | `VITE_NEWSLETTER_ENDPOINT` in a `.env` file |
| E-book checkout | `ebooks.js` → `checkout()` |
| Reader reviews (transcribed from the design; confirm each is genuine) | `ebooks.js` → `testimonials` |
| "Bestseller" badge (from the design; remove if it is not true) | `ebooks.js` → `guides[0].badge` |
| YouTube video links and running times | `ebooks.js` → `videos` |
| Refund and bundle-price FAQ answers | `ebooks.js` → `faqs` |
| Sample chapter backend | `VITE_SAMPLE_CHAPTER_ENDPOINT` in a `.env` file |
| Podcast launch date, trailer link and duration | `podcastPage.js` → `launchDate`, `trailer` |
| Podcast language, first-episode FAQ answers | `podcastPage.js` → `faqs` |
| Podcast guest-form backend | `VITE_GUEST_REQUEST_ENDPOINT` in a `.env` file |
| Product store links (e.g. Amazon) | `shop.js` → each product's `url` |
| Rachna's review of the 20 articles, and their publication dates | `data/articles/` |
| Blog video links | `blog.js` → `videos` |
| A contact-lens photo for the lens review card | `blog.js` → `videos` (makeup photo used for now) |
| Ingredients, directions, shipping and returns FAQ answers | `shop.js` → `faqs` |
| Newsletter welcome gift (hidden until set) | `newsletterPage.js` → `hero.welcomeGift` |
| Whether the newsletter is free and includes promotions | `newsletterPage.js` → `faqs` |
| Rachna's own note for the newsletter page | `newsletterPage.js` → `note` |
| About page: role dates, a Mentor role, education, training, certifications | `aboutPage.js` → `experience`, `qualifications` |
| About page: Rachna's own story, and confirmation of Client Consultation and Training & Mentoring | `aboutPage.js` → `story`, `skills` |
| Dedicated cleanser, sunscreen and skincare-category photos | `shop.js` (cleanser is a crop of the shop hero; sunscreen and the skincare category use homepage photos) |

The newsletter form validates the address and, until an endpoint is set, tells
the visitor plainly that sign-ups are not open. It only reports success when the
endpoint accepts a `POST` with `{ "email": "…" }`.

## Navigation

Every navbar item opens its own page: Home `/`, E-book `/ebook`, Podcast
`/podcast`, Retail `/shop`, Blogs `/blogs`, Newsletter `/newsletter` and About
`/about` (`data/site.js`). The homepage keeps its sections, which can still be
linked directly (`/#ebook`, `/#blogs`, …), and while you scroll the homepage
the navbar highlights the item for the section on screen. On every other page
the item for that page, or the page it sits under, is highlighted.

Features that are not ready yet open a "coming soon" page with a description
and a Back to home button (`data/pages.js`): e.g. `/videos` for the e-book
page's video cards, `/ebook/checkout`, `/shop/<product>` and `/search`.

## Adding a real page

Every link on the homepage resolves. Pages that do not exist yet are listed in
`data/pages.js` and render `UpcomingPage`. To build one, create the component in
`src/pages`, add its `<Route>` in `App.jsx`, and remove its entry from
`data/pages.js`.

The site uses clean URLs (`/ebook`, not `/#/ebook`), so the host must serve
`index.html` for unknown paths (the usual single-page-app rewrite).

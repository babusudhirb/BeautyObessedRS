// Copy and listings for the e-book landing page (/ebook).
//
// Same conventions as content.js: `null` is a value that has not been
// confirmed, and `placeholder: true` marks wording that stands in for content
// still to be confirmed. Search this file for both before launch.

// No checkout exists yet. Every buy button leads to the "coming soon" checkout
// page, with the chosen item in the URL so the real checkout can read it.
const checkout = (item) => `/ebook/checkout?item=${item}`;

export const hero = {
  eyebrow: 'Rachna’s e-book collection',
  copy: 'Practical, easy-to-follow e-books by Rachna to help you build healthier routines and feel more confident every day.',
  benefits: [
    { icon: 'books', lines: ['3', 'Beauty E-books'] },
    { icon: 'download', lines: ['Instant PDF', 'Download'] },
    { icon: 'devices', lines: ['Read on', 'Any Device'] },
    { icon: 'secure', lines: ['Secure', 'Payment'] },
  ],
  author: { title: 'Written by Rachna', detail: '10+ years in beauty' },
};

export const bundle = {
  name: 'The Complete Beauty Collection',
  summary: '3 e-books in one bundle.',
  to: checkout('complete-collection'),
};

// `badge` is optional. "Bestseller" comes from the design reference; remove it
// if it is not true once the e-books are on sale.
export const guides = [
  {
    id: 'beauty-daily-routine',
    title: 'Beauty Daily Routine',
    image: 'ebook-cover-daily-routine',
    alt: 'Beauty Daily Routine by Rachna: a hardback with a wine cover and gold lettering',
    badge: 'Bestseller',
    copy: 'A complete day-by-day guide for your skin, hair, nails and self-care.',
    points: ['Daily and weekly routines', 'Lifestyle and diet tips', 'Long-term healthy habits'],
    to: checkout('beauty-daily-routine'),
  },
  {
    id: 'skincare-guide',
    title: 'Skincare Guide',
    image: 'ebook-cover-skincare',
    alt: 'Skincare Guide by Rachna: a hardback with a cream cover',
    copy: 'Understand your skin, build the right routine and get healthy, glowing skin.',
    points: ['Know your skin type', 'Daily skincare routine', 'Ingredients made simple'],
    to: checkout('skincare-guide'),
  },
  {
    id: 'haircare-guide',
    title: 'Haircare Guide',
    image: 'ebook-cover-haircare',
    alt: 'Haircare Guide by Rachna: a hardback with a blush-pink cover',
    copy: 'Practical haircare advice for stronger, healthier, shinier hair.',
    points: ['Understand your hair type', 'Haircare routines', 'Fix common hair concerns'],
    to: checkout('haircare-guide'),
  },
];

export const collection = {
  tag: 'Best value',
  copy: 'Get all 3 e-books at a special price and build your complete beauty library.',
  includes: guides.map((guide) => guide.title),
  note: '3 e-books in one bundle',
};

export const insideFeatures = [
  { icon: 'steps', title: ['Step-by-step', 'guidance'], copy: ['Clear routines', 'you can follow'] },
  { icon: 'checklists', title: ['Checklists', 'and templates'], copy: ['Easy-to-use', 'printables'] },
  { icon: 'tips', title: ['Expert tips', 'and insights'], copy: ['Learn from', 'real experience'] },
  { icon: 'examples', title: ['Real-life', 'examples'], copy: ['Practical advice', 'for everyday life'] },
];

export const bonuses = [
  { icon: 'checklist', lines: ['Daily routine', 'checklist'] },
  { icon: 'tracker', lines: ['Haircare', 'tracker'] },
  { icon: 'guide', lines: ['Skincare', 'ingredient guide'] },
  { icon: 'template', lines: ['Salon consultation', 'template'] },
];

// The videos have not been published yet.
//   url       the video's YouTube address; null sends the card to the /videos
//             "coming soon" page
//   duration  running time as text, e.g. '12:34'; shown only once it is known
//   image     a slug from image-manifest.json; `focus` is its CSS object-position
export const videos = [
  {
    id: 'skincare-routine',
    title: ['Skincare Routine', 'for Healthy, Glowing Skin'],
    image: 'blog-skincare',
    focus: '50% 58%',
    duration: null,
    url: null,
  },
  {
    id: 'haircare-tips',
    title: ['Haircare Tips', 'for Stronger, Shinier Hair'],
    image: 'blog-haircare',
    focus: '50% 52%',
    duration: null,
    url: null,
  },
  {
    id: 'daily-beauty-routine',
    title: ['My Daily', 'Beauty Routine'],
    serifLines: 2,
    image: 'podcast-rachna',
    focus: '50% 15%',
    duration: null,
    url: null,
  },
].map((video) => ({ ...video, to: video.url ?? '/videos' }));

export const salonGuide = {
  eyebrow: 'For Beauty Professionals',
  title: 'Salon Expert Guide',
  copy: 'Professional insights, practical strategies and real-world advice for salon owners, managers and beauty professionals.',
  points: ['Salon operations and client experience', 'Team building and training', 'Business growth and industry insights'],
  cta: { label: 'Explore the Pro Guide', to: '/ebook/salon-expert-guide' },
};

// States only what is confirmed elsewhere on the site (expert, founder,
// trainer, 10+ years). The design reference also said "thousands of clients",
// which is left out until a real figure exists.
export const about = {
  title: 'Hi, I’m Rachna.',
  bio: 'Beauty expert, salon founder and trainer, Rachna has spent over a decade working with clients and aspiring beauty professionals. These e-books bring together her experience, practical knowledge and real insights to help you feel more confident in your beauty journey.',
  link: { label: 'More about me', to: '/about' },
};

// Answers restate what this page already promises (PDF, instant download, any
// device, a special price for the bundle). Those marked `placeholder: true`
// depend on a policy or price that has not been set.
export const faqs = [
  {
    id: 'what-you-receive',
    question: 'What will I receive after purchase?',
    answer:
      'A PDF copy of each e-book you buy, ready to download straight away. The Complete Collection includes all three.',
  },
  {
    id: 'read-on-phone',
    question: 'Can I read the e-books on my phone?',
    answer: 'Yes. Each e-book is a PDF, so you can read it on a phone, a tablet or a computer.',
  },
  {
    id: 'physical-or-pdf',
    question: 'Is this a physical book or a PDF?',
    answer: 'A PDF. These are digital e-books that you download; nothing is posted to you.',
  },
  {
    id: 'refund',
    question: 'Can I get a refund?',
    answer: 'Refunds will follow the Refund Policy, which will be published before the e-books go on sale.',
    placeholder: true,
  },
  {
    id: 'bundle-discount',
    question: 'Is the bundle available at a discount?',
    answer:
      'Yes. The Complete Collection brings all three e-books together at a special price, which will be shown at checkout.',
    placeholder: true,
  },
];

// Transcribed from the design reference. Each stays `placeholder: true` until
// it is confirmed as a real reader's own words; replace or remove any that
// are not before launch.
export const testimonials = [
  {
    id: 'reader-1',
    quote: 'The skincare guide is so easy to follow. I finally understand what my skin needs.',
    name: 'Aditi S.',
    rating: 5,
    placeholder: true,
  },
  {
    id: 'reader-2',
    quote: 'The haircare guide helped me reduce hair fall and build a simple routine.',
    name: 'Priya M.',
    rating: 5,
    placeholder: true,
  },
  {
    id: 'reader-3',
    quote: 'The daily routine guide is full of practical tips. Worth every page!',
    name: 'Neha K.',
    rating: 5,
    placeholder: true,
  },
];

export const closing = {
  title: 'Start your beauty journey today.',
  cta: { label: 'Explore All E-books', to: '/ebook#guides' },
  trust: [
    { icon: 'download', label: 'Instant PDF download' },
    { icon: 'secure', label: 'Secure payment' },
    { icon: 'devices', label: 'Read on any device' },
  ],
};

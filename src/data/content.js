// Homepage copy and listings.
//
// PLACEHOLDER CONVENTION
//   `null`              -> a figure that has not been confirmed. The UI shows a
//                          neutral dash (or hides the field) instead of a number.
//   `placeholder: true` -> wording that stands in for real content and must be
//                          replaced before launch.
// Search this file for "null" and "placeholder" to find everything pending.

import { profileLink } from './site.js';

export const stats = [
  { id: 'years', icon: 'gem', value: '10+', label: 'Years in beauty' },
  { id: 'salons', icon: 'store', value: '3', label: 'Salons in Bangalore' },
  { id: 'students', icon: 'users', value: null, label: 'Students trained' },
  { id: 'clients', icon: 'heart', value: null, label: 'Clients served' },
];

export const services = [
  {
    id: 'salons',
    icon: 'store',
    title: 'Salons',
    copy: 'Premium beauty services at 3 salons in Bangalore.',
    link: { label: 'View salons', to: '/salons' },
  },
  {
    id: 'training',
    icon: 'training',
    title: 'Training',
    copy: 'Hands-on training for aspiring beauty professionals.',
    link: { label: 'View training', to: '/training' },
  },
  {
    id: 'plans',
    icon: 'calendar',
    title: 'Beauty Plans',
    copy: 'Personalised skincare, haircare, nail care and diet plans.',
    link: { label: 'See how it works', to: '/#beauty-plan' },
  },
  {
    id: 'content',
    icon: 'document',
    title: 'Content',
    copy: 'E-book, podcast and blogs with practical beauty advice.',
    link: { label: 'Explore content', to: '/#ebook' },
  },
];

export const planSteps = [
  { title: 'Tell us about you', copy: 'Answer a few simple questions.' },
  {
    title: "Rachna's team builds your plan",
    copy: 'We create a plan based on your skin, hair, lifestyle and goals.',
  },
  {
    title: 'Follow it every day',
    copy: 'Get day-by-day routines, what to eat and track your progress.',
  },
];

// `price: null` renders the neutral "₹ —" placeholder. Set a string such as
// '₹499 / month' once pricing is final.
export const plans = [
  {
    id: 'free-trial',
    name: 'Free Trial',
    copy: 'Try your personalised plan free.',
    price: null,
    cta: 'Start Free Trial',
    variant: 'primary',
  },
  {
    id: 'monthly',
    name: 'Monthly Plan',
    copy: 'Full access to your beauty plan.',
    price: null,
    cta: 'Choose Monthly Plan',
    variant: 'secondary',
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    copy: 'Includes plan + expert support.',
    price: null,
    cta: 'Choose Premium Plan',
    variant: 'secondary',
  },
];

export const ebook = {
  label: 'Featured e-book',
  title: 'Beauty Daily Routine',
  copy: 'Beauty Daily Routine is a practical guide to skincare, haircare and self-care, written by Rachna.',
  benefits: [
    { icon: 'lotus', text: 'Understand your skin and hair type' },
    { icon: 'calendar', text: 'Build a routine that fits your lifestyle' },
    { icon: 'sparkles', text: 'Know what to avoid and why' },
    { icon: 'heart', text: 'Simple, actionable guidance from Rachna' },
  ],
  // The four parts named on the cover: skincare, haircare, nailcare, lifestyle.
  // `image` is a slug from image-manifest.json; the thumbnails are crops of the
  // supplied photographs, defined in scripts/optimize-images.mjs.
  inside: [
    { id: 'skincare', lines: ['Skincare routines', 'for every skin type'], image: 'inside-skincare' },
    { id: 'haircare', lines: ['Haircare guidance', 'for healthy, strong hair'], image: 'inside-haircare' },
    { id: 'nailcare', lines: ['Nail care and easy', 'at-home routines'], image: 'inside-nailcare' },
    { id: 'lifestyle', lines: ['Lifestyle and diet tips', 'for lasting beauty'], image: 'inside-diet' },
  ],
};

// No real episodes have been supplied, so every episode below is a layout
// placeholder. Replace each field when an episode is published:
//   title     the episode's real title
//   topic     a short category label, e.g. 'Skincare'
//   duration  running time as text, e.g. '36 min'; null shows a dash
//   audioUrl  URL of the audio file (or a path under public/); null keeps the
//             player switched off, so nothing pretends to play
// The first episode is the one loaded in the large player.
export const podcast = {
  label: 'Beauty Obsessed · Podcast',
  host: 'Rachna',
  copy: 'Honest conversations about skincare, haircare, makeup, self-care and the beauty industry.',
  episodes: [
    {
      id: 'episode-1',
      title: 'Episode title goes here',
      topic: 'Topic',
      duration: null,
      audioUrl: null,
      placeholder: true,
    },
    {
      id: 'episode-2',
      title: 'Another episode title',
      topic: 'Topic',
      duration: null,
      audioUrl: null,
      placeholder: true,
    },
    {
      id: 'episode-3',
      title: 'Another episode title',
      topic: 'Topic',
      duration: null,
      audioUrl: null,
      placeholder: true,
    },
  ],
  // Destinations come from data/site.js; an empty URL there falls back to /connect.
  platforms: [
    { id: 'spotify', verb: 'Listen on', name: 'Spotify', to: profileLink('spotify') },
    { id: 'applePodcasts', verb: 'Listen on', name: 'Apple Podcasts', to: profileLink('applePodcasts') },
    { id: 'youtube', verb: 'Watch on', name: 'YouTube', to: profileLink('youtube') },
  ],
};

// Only the category is known for each photograph. `name`, `price` and
// `shopUrl` stay null until real product details exist; the card hides
// whatever is missing instead of showing invented values.
export const products = [
  {
    id: 'skincare',
    image: 'product-skincare',
    category: 'Skincare',
    name: null,
    price: null,
    shopUrl: null,
    alt: 'A cleanser, a vitamin C serum and a moisturiser arranged on a marble tray',
  },
  {
    id: 'haircare',
    image: 'product-haircare',
    category: 'Haircare',
    name: null,
    price: null,
    shopUrl: null,
    alt: 'Shampoo, conditioner, a hair mask and a hair oil beside a wooden hairbrush',
  },
  {
    id: 'bodycare',
    image: 'product-bodycare',
    category: 'Bodycare',
    name: null,
    price: null,
    shopUrl: null,
    alt: 'Body lotion, body scrub, body wash and hand cream on a marble tray',
  },
  {
    id: 'sunscreen',
    image: 'product-sunscreen',
    category: 'Sunscreen',
    name: null,
    price: null,
    shopUrl: null,
    alt: 'A tube of SPF 50+ sunscreen surrounded by white flowers',
  },
];

// TODO: confirm this wording with Rachna. While `approved` is false the line
// is shown without her name, so no unapproved words are attributed to her.
export const quote = {
  text: 'Beauty is a form of self-care, and every small step counts.',
  attribution: 'Rachna',
  approved: false,
};

export const blogCategories = ['Skin', 'Hair', 'Nails', 'Diet', 'Makeup'];

// Titles and summaries are placeholders for articles that are still to be
// written. `readTime: null` hides the reading time.
export const posts = [
  {
    slug: 'skincare-routine-that-works-for-you',
    category: 'Skin',
    image: 'blog-skincare',
    alt: 'A cleanser, serum, moisturiser, toner and sunscreen lined up on a marble counter',
    title: 'How to Build a Skincare Routine That Works for You',
    summary: 'Which steps matter, which order to use them in, and how to keep it simple.',
    readTime: null,
    placeholder: true,
  },
  {
    slug: 'haircare-tips-for-dry-frizzy-hair',
    category: 'Hair',
    image: 'blog-haircare',
    alt: 'Shampoo, conditioner, a hair mask and hair oil next to a wooden hairbrush',
    title: 'Haircare Tips for Dry, Frizzy Hair',
    summary: 'Washing, conditioning and oiling habits that help dry hair stay soft and manageable.',
    readTime: null,
    placeholder: true,
  },
  {
    slug: 'makeup-for-beginners',
    category: 'Makeup',
    image: 'blog-makeup',
    alt: 'Foundation, concealer, an eyeshadow palette, blush and brushes on a marble vanity',
    title: 'Makeup for Beginners: A Practical Guide',
    summary: 'The few products worth starting with and how to apply them with confidence.',
    readTime: null,
    placeholder: true,
  },
];

export const about = {
  greeting: "Hi, I'm Rachna.",
  // Only facts from the brief are stated: beauty expert, salon founder,
  // trainer, Bangalore, 10+ years, 3 salons.
  bio: [
    "I'm a beauty expert, salon founder and trainer based in Bangalore, with 10+ years in beauty.",
    "Beauty Obsessed is my way of sharing what I've learned — through my salons, training, personalised beauty plans, e-book, podcast and blog.",
  ],
  facts: [
    { label: 'Name', value: 'Rachna' },
    { label: 'Profession', value: 'Beauty Expert, Salon Founder & Trainer' },
    { label: 'City', value: 'Bangalore' },
    { label: 'Experience', value: '10+ years' },
    { label: 'Salons', value: '3' },
  ],
};

// Answers marked `placeholder: true` describe pricing, booking or plan policy
// that has not been confirmed; they are deliberately non-committal.
export const faqs = [
  {
    id: 'what-is-beauty-obsessed',
    question: 'What is Beauty Obsessed?',
    answer:
      "Beauty Obsessed is Rachna's home for everything beauty: her salons, training, personalised beauty plans, the Beauty Daily Routine e-book, the podcast and the blog.",
  },
  {
    id: 'how-the-plan-works',
    question: 'How does the Beauty Plan work?',
    answer:
      "You answer a few simple questions about your skin, hair, lifestyle and goals. Rachna's team builds a plan for you, and you follow it day by day — what to do today, what to do tomorrow, what to eat, and how far you have come.",
  },
  {
    id: 'free-trial',
    question: 'Is the free trial really free?',
    answer:
      'The Free Trial lets you try your personalised plan before choosing a paid plan. The full trial terms will be shown before you sign up.',
    placeholder: true,
  },
  {
    id: 'medical-advice',
    question: 'Do you provide medical advice?',
    answer:
      'No. Everything here is educational and is not a substitute for professional advice. For any medical concern about your skin, hair or health, please see a qualified doctor or dermatologist.',
  },
  {
    id: 'book-appointment',
    question: 'How do I book an appointment at your salon?',
    answer:
      'Appointments are made directly with XING Hair & Skin. Booking details for each of the three Bangalore salons will be listed on the Salons page.',
    placeholder: true,
  },
  {
    id: 'change-plan',
    question: 'Can I change my plan later?',
    answer:
      'The options for moving between the Free Trial, Monthly Plan and Premium Plan will be explained when sign-up opens.',
    placeholder: true,
  },
];

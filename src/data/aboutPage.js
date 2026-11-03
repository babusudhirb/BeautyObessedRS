// Copy and content for the About page (/about).
//
// Rules for this file:
//   - Only confirmed facts are stated: beauty expert, salon founder and
//     trainer; 10+ years in beauty; three XING Hair & Skin salons in
//     Bangalore; the YouTube channel and its 7K+ subscribers.
//   - Anything not yet confirmed is `null`, or an entry with
//     `confirmed: false`. Those never appear on the live site. In the local
//     dev server (`npm run dev`) they show as clearly labelled drafts, so the
//     layout can be checked before the real details arrive.
//   - Images are slugs from image-manifest.json; `focus` is the CSS
//     object-position.

import { youtubeChannel } from './podcastPage.js';

export const seo = {
  title: 'About Rachna Sinha | Beauty Obsessed with Rachna',
  description:
    'Meet Rachna Sinha, beauty expert, salon founder and trainer in Bangalore, and the practical skincare, haircare and everyday beauty guidance behind Beauty Obsessed.',
};

export const hero = {
  eyebrow: 'Meet Rachna Sinha',
  title: ['The Woman Behind', 'Beauty Obsessed'],
  copy: 'A space for practical skincare, haircare and everyday beauty guidance, created around real routines, thoughtful advice and everyday life in India.',
  primary: { label: 'Discover my journey', to: '#my-story' },
  secondary: { label: 'Explore the blog', to: '/blogs' },
  values: [
    { icon: 'guidance', label: 'Real Guidance' },
    { icon: 'people', label: 'Real People' },
    { icon: 'confidence', label: 'Real Confidence' },
  ],
};

// The hero's three photographs. Only the picture changes; the text and
// buttons stay put. `caption` fades in a little after its photograph.
export const heroSequence = {
  // How long each photograph stays fully visible, the crossfade between
  // them, and how long after a photograph arrives its caption appears.
  holdMs: 5000,
  transitionMs: 500,
  captionDelayMs: 1000,
  slides: [
    {
      id: 'rachna',
      image: 'about-hero',
      alt: 'Rachna Sinha smiling at a marble desk in front of a lit RS logo reading “Rachna Sinha · Beauty · Hair · Skin”',
      focus: '64% 30%',
      focusMobile: '66% 24%',
      caption: 'Rachna Sinha',
      label: 'Photograph of Rachna',
    },
    {
      id: 'ebooks',
      image: 'ebook-collection',
      alt: 'Rachna’s three e-books, Beauty Daily Routine, Skincare Guide and Haircare Guide, on a marble shelf with pink flowers',
      focus: '55% 50%',
      focusMobile: '42% 50%',
      caption: 'The e-books',
      label: 'Photograph of the e-books',
    },
    {
      id: 'retail',
      image: 'retail-cat-haircare',
      alt: 'RS nourishing shampoo, repairing conditioner, hair mask and hair oil arranged on marble',
      focus: '50% 45%',
      focusMobile: '50% 45%',
      caption: 'Rachna’s Picks',
      label: 'Photograph of beauty products',
    },
  ],
};

// Written from the confirmed facts and the positioning in the brief, in the
// first person to match the homepage. Replace with Rachna's own words.
export const story = {
  eyebrow: 'My Story',
  title: ['A Journey Rooted in', 'People and Real Life'],
  paragraphs: [
    'I’m Rachna Sinha, a beauty expert, salon founder and trainer based in Bangalore, with more than 10 years in beauty. I run three XING Hair & Skin salons in the city.',
    'Beauty Obsessed is where I share what I’ve learned with a wider community: practical skincare, haircare and everyday beauty guidance, built around real routines and everyday life in India.',
    'On the [blog](/blogs), in the [e-books](/ebook), on the [podcast](/podcast), in the [newsletter](/newsletter) and in [Rachna’s Picks](/shop), the aim is the same: routines that are honest, realistic and easy to keep, without pressure or perfection.',
  ],
  signature: { name: 'Rachna Sinha', role: 'Beauty expert, salon founder & trainer' },
  collage: {
    portrait: {
      image: 'ebook-author-reading',
      focus: '42% 50%',
      alt: 'Rachna Sinha reading a printed beauty guide',
    },
    notes: {
      image: 'ebook-inside-spread',
      focus: '50% 50%',
      alt: 'An open e-book spread titled “Your Daily Skincare Routine”, with step one, Cleanse',
    },
    salon: {
      image: 'hero-salon',
      focus: '70% 50%',
      alt: 'Inside a XING Hair & Skin salon: styling chairs facing arched, lit mirrors',
    },
    quote: ['From the salon', 'to a bigger conversation.'],
  },
};

// Roles that are confirmed. `period` (e.g. '2015 – Present') shows only once
// Rachna supplies it. Entries with `confirmed: false` are drafts.
export const experience = {
  eyebrow: 'My Professional Experience',
  title: ['More than a decade', 'in beauty'],
  items: [
    { id: 'expert', icon: 'sparkles', role: 'Beauty expert', detail: 'More than 10 years in beauty', period: null, confirmed: true },
    { id: 'founder', icon: 'store', role: 'Salon founder', detail: 'XING Hair & Skin, three salons in Bangalore', period: null, confirmed: true },
    { id: 'trainer', icon: 'trainer', role: 'Trainer', detail: 'Training beauty professionals', period: null, confirmed: true },
    {
      id: 'creator',
      icon: 'creator',
      role: 'Content creator',
      // The 7K+ figure was supplied with the blog page's brief.
      detail: 'Beauty Obsessed on YouTube, followed by more than 7,000 people',
      period: null,
      confirmed: true,
    },
    // Suggested in the brief; not yet confirmed.
    { id: 'mentor', icon: 'mentor', role: 'Mentor', detail: null, period: null, confirmed: false },
  ],
};

// Nothing here is confirmed yet. Each field shows on the live site only once
// it has a value. `credentialUrl` links to an online verification page;
// `image` is a slug for a certificate scan, only once its use is approved.
export const qualifications = {
  eyebrow: 'Qualifications & Professional Development',
  title: 'Learning. Training. Growing.',
  intro: 'Rachna’s education, beauty training and certifications will be listed here as each one is confirmed.',
  pendingNote: 'Details are being confirmed and will be added here.',
  groups: [
    {
      id: 'education',
      icon: 'education',
      title: 'Formal Education',
      copy: 'Academic background and formal study.',
      image: 'pod-studio',
      focus: '18% 60%',
      entries: [],
      fields: [
        { key: 'qualification', label: 'Qualification' },
        { key: 'institution', label: 'Institution' },
        { key: 'field', label: 'Field of study' },
        { key: 'year', label: 'Completed' },
      ],
    },
    {
      id: 'training',
      icon: 'training',
      title: 'Beauty & Wellness Training',
      copy: 'Professional courses, diplomas and specialist training.',
      image: 'topic-makeup',
      focus: '22% 45%',
      entries: [],
      fields: [
        { key: 'course', label: 'Course or diploma' },
        { key: 'provider', label: 'Training provider' },
        { key: 'subject', label: 'Specialisation' },
        { key: 'year', label: 'Completed' },
      ],
    },
    {
      id: 'certifications',
      icon: 'certificate',
      title: 'Certifications & Continuing Learning',
      copy: 'Certificates, workshops and ongoing learning.',
      image: 'topic-salon',
      focus: '30% 55%',
      entries: [],
      fields: [
        { key: 'certificate', label: 'Certificate' },
        { key: 'issuer', label: 'Issued by' },
        { key: 'year', label: 'Awarded' },
        { key: 'credentialUrl', label: 'Verification' },
      ],
    },
  ],
};

// Areas of focus, as proposed in the brief. They describe the kind of work,
// not clinical or medical credentials. Adjust them to Rachna's actual work;
// `confirmed: false` marks the ones she has not yet confirmed (they still
// show, as areas of focus).
export const skills = {
  eyebrow: 'Skills & Areas of Focus',
  title: 'What I Do',
  note: 'Areas of focus, not medical or clinical credentials.',
  items: [
    { id: 'education', icon: 'book', title: 'Beauty Education', copy: 'Easy-to-follow articles, guides and e-books on everyday beauty.', confirmed: true },
    { id: 'skincare', icon: 'skincare', title: 'Skincare Guidance', copy: 'Practical skincare routines for Indian skin and climate.', confirmed: true },
    { id: 'haircare', icon: 'haircare', title: 'Haircare & Scalp Care', copy: 'Simple haircare and scalp-care routines for different hair types.', confirmed: true },
    { id: 'consultation', icon: 'consultation', title: 'Client Consultation', copy: 'Understanding individual concerns and suggesting suitable routines.', confirmed: false },
    { id: 'training', icon: 'training', title: 'Training & Mentoring', copy: 'Guiding and supporting beauty professionals.', confirmed: false },
    { id: 'content', icon: 'content', title: 'Content Creation', copy: 'Videos, blog articles, the podcast and e-books for a wider community.', confirmed: true },
  ],
};

export const philosophy = {
  eyebrow: 'What I Believe',
  statement: 'Beauty should feel like care, not pressure.',
  values: [
    { id: 'clarity', icon: 'feather', title: 'Clarity over hype', copy: 'Explain products and routines honestly, in plain language.' },
    { id: 'realistic', icon: 'heart', title: 'Realistic routines', copy: 'Recommend manageable habits that fit real schedules and budgets.' },
    { id: 'confidence', icon: 'lotus', title: 'Confidence without comparison', copy: 'Encourage thoughtful personal care instead of unrealistic beauty standards.' },
  ],
};

export const explore = {
  eyebrow: 'Explore More',
  title: 'Explore Beauty Obsessed',
  copy: 'Practical guides, conversations and useful updates, all in one place.',
  cards: [
    { id: 'blog', icon: 'blog', title: 'The Blog', copy: 'Practical articles and answers to common skincare, haircare and beauty questions.', cta: 'Read the blog', to: '/blogs', image: 'blog-skincare', focus: '50% 55%' },
    { id: 'ebooks', icon: 'ebooks', title: 'The E-books', copy: 'In-depth guides to skincare, haircare and everyday routines.', cta: 'Explore e-books', to: '/ebook', image: 'ebook-hero-books', focus: '50% 50%' },
    { id: 'podcast', icon: 'podcast', title: 'The Podcast', copy: 'Conversations about beauty, self-care and everyday life.', cta: 'Listen now', to: '/podcast', image: 'pod-studio', focus: '62% 40%' },
    { id: 'newsletter', icon: 'newsletter', title: 'The Newsletter', copy: 'Useful beauty tips, new articles and updates delivered to subscribers.', cta: 'Join now', to: '/newsletter', image: 'nl-hero', focus: '62% 45%' },
  ],
};

export const closing = {
  title: 'Beauty should feel like care, not pressure.',
  copy: 'Explore practical guidance, build routines that work for you, and feel more confident in your everyday choices.',
  cta: { label: 'Explore Beauty Obsessed', to: '/' },
};

// Structured data uses only these confirmed facts.
export const person = {
  name: 'Rachna Sinha',
  jobTitle: 'Beauty expert, salon founder and trainer',
  city: 'Bangalore',
  salonBrand: 'XING Hair & Skin',
  sameAs: [youtubeChannel.url],
};

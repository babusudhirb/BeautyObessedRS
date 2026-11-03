// Copy for the newsletter page (/newsletter): The Beauty Letter.
//
// Sign-ups use the site's newsletter endpoint (VITE_NEWSLETTER_ENDPOINT) and
// only report success when it accepts the request. Answers marked
// `placeholder: true` need Rachna's team to confirm them before launch.

export const hero = {
  eyebrow: 'The Beauty Letter · By Rachna Sinha',
  copy: 'Skincare routines, haircare tips, honest product reviews and simple self-care, from Rachna Sinha. One useful email, every week.',
  // The same promise, shorter, for phones.
  copyShort: 'Skincare, haircare and self-care tips from Rachna Sinha. One useful email a week.',
  // TODO: a free welcome gift (e.g. a 7-day routine checklist) was proposed.
  // Set this to its one-line description once the file exists; the line is
  // hidden while it is null.
  welcomeGift: null,
  // About her YouTube audience (7K+, supplied with the blog brief), not the
  // newsletter's subscriber count.
  proof: 'Join 7,000+ people who follow Rachna on YouTube',
};

export const consent = 'I agree to receive emails from Beauty Obsessed. You can unsubscribe at any time.';

export const benefits = [
  {
    icon: 'lotus',
    title: 'Skincare made simpler',
    copy: 'Routines, ingredient explainers and honest product guides, so you can choose with confidence.',
  },
  {
    icon: 'hair',
    title: 'Better haircare habits',
    copy: 'Scalp care, hair-fall basics, oiling and simple routines for everyday hair.',
  },
  {
    icon: 'makeup',
    title: 'Beauty worth knowing',
    copy: 'Makeup tips, nail care, product reviews and the newest articles from Beauty Obsessed.',
  },
];

export const inside = {
  title: 'What arrives in your inbox every week',
  copy: 'Every issue is short, practical and written by Rachna. Here is what a typical week looks like.',
  items: [
    { icon: 'tip', title: 'Rachna’s weekly tip', copy: 'One practical idea to try in your routine this week.' },
    { icon: 'guide', title: 'The featured guide', copy: 'A skincare, haircare or diet guide worth reading.' },
    { icon: 'checklist', title: 'Your routine reminder', copy: 'A short checklist to help you stay consistent.' },
    { icon: 'video', title: 'Watch and read', copy: 'Her latest YouTube review or podcast episode.' },
  ],
  // A sample issue to show the format. It is illustrative, not a sent email.
  // Everything below is an editable example of the format, not a sent email.
  sample: {
    issue: 'Sample issue',
    banner: 'Your weekly dose of beauty, made simple.',
    greeting: 'Hi there,',
    intro: 'Here’s your weekly dose of practical beauty advice, handpicked guides and simple routines.',
    tip: 'Always apply your serum on a slightly damp skin for better absorption and results.',
    guide: {
      title: 'How to Build a Skincare Routine for Beginners',
      copy: 'A simple, step-by-step guide to healthy, glowing skin.',
      label: 'Read the full guide',
      to: '/blogs/skincare-routine-for-beginners',
    },
    routineTitle: 'This week’s simple routine',
    checklist: ['Cleanse your face twice a day', 'Apply a hydrating serum', 'Use sunscreen every morning', 'Stay hydrated'],
    video: { title: 'Serum Review: Is It Worth It?', label: 'Watch on YouTube' },
  },
};

// Written in the third person from facts already on the site, so it does not
// put words in Rachna's mouth. Replace with her own note once she writes one.
export const note = {
  // Rachna's own words for the note. While this is null the page shows the
  // `copy` below instead of putting an unapproved quote in her name.
  quote: null,
  title: 'Why Rachna started The Beauty Letter',
  copy: 'In more than 10 years of running her salons, Rachna has heard the same questions again and again: what should I use, what should I eat, and what actually works? The Beauty Letter answers them in one short email a week, the way she would explain it to a client in her chair.',
  copyShort: 'The questions Rachna hears most in her salons, answered in one short email a week.',
  name: 'Rachna Sinha',
  role: 'Beauty expert · Salon founder · Trainer',
  link: { label: 'More about Rachna', to: '/about' },
};

// No issue has been sent yet, so each card says "Coming soon" and there is no
// archive link. Add `to` and a date to an issue once it is published.
export const issues = [
  { id: 'issue-01', number: 'Issue 01', image: 'topic-skincare', focus: '55% 45%', alt: 'Serums and skincare bottles on a vanity' },
  { id: 'issue-02', number: 'Issue 02', image: 'blog-haircare', focus: '50% 55%', alt: 'Haircare products beside a hairbrush' },
  { id: 'issue-03', number: 'Issue 03', image: 'topic-makeup', focus: '22% 30%', alt: 'Makeup brushes in a holder' },
];

export const band = {
  title: 'Make room for a little more beauty.',
  copy: 'One useful email a week, from Rachna’s salon chair to your inbox.',
};

export const faqs = [
  {
    id: 'nl-what',
    question: 'What is The Beauty Letter?',
    answer: 'The Beauty Obsessed newsletter from Rachna Sinha, with practical skincare, haircare, beauty and self-care advice.',
  },
  {
    id: 'nl-often',
    question: 'How often will I receive emails?',
    answer: 'One email a week.',
  },
  {
    id: 'nl-free',
    question: 'Is The Beauty Letter free?',
    answer: 'This will be confirmed before sign-ups open.',
    placeholder: true,
  },
  {
    id: 'nl-content',
    question: 'What type of content will I receive?',
    answer: 'Skincare routines, haircare tips, ingredient guides, product reviews, new articles and occasional updates from Beauty Obsessed.',
  },
  {
    id: 'nl-promo',
    question: 'Will I receive promotional emails?',
    answer: 'This will be confirmed before sign-ups open.',
    placeholder: true,
  },
  {
    id: 'nl-unsubscribe',
    question: 'Can I unsubscribe anytime?',
    answer: 'Yes. Every email includes an unsubscribe link.',
  },
];

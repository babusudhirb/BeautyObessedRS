// Site-wide navigation and link destinations.
// Values marked TODO need a real answer from Rachna's team before launch.

export const brand = {
  wordmark: 'RACHNA',
  name: 'Rachna',
  tagline: 'Beauty advice, salon services, training and inspiration for your everyday routine.',
  copyrightYear: 2026,
};

// Each link opens its own page. `section` is the id of the homepage section on
// the same subject: on the homepage the navbar highlights the link while that
// section is on screen. The sections stay reachable at /#ebook, /#blogs etc.
export const navLinks = [
  { label: 'Home', to: '/', section: 'top' },
  { label: 'E-book', to: '/ebook', section: 'ebook' },
  { label: 'Podcast', to: '/podcast', section: 'podcast' },
  { label: 'Retail', to: '/shop', section: 'retail' },
  { label: 'Blogs', to: '/blogs', section: 'blogs' },
  // A page of its own, not a homepage section; `section` never matches an id there.
  { label: 'Newsletter', to: '/newsletter', section: 'newsletter-page' },
  { label: 'About Me', to: '/about', section: 'about' },
];

export const primaryCta = { label: 'Get My Beauty Plan', to: '/#beauty-plan' };

// The newsletter page (/newsletter) uses the homepage's style of navbar with
// the RS monogram, and links straight to each page rather than to homepage
// sections.
export const newsletterNav = [
  { label: 'Home', to: '/' },
  { label: 'E-books', to: '/ebook' },
  { label: 'Podcast', to: '/podcast' },
  { label: 'Retail', to: '/shop' },
  { label: 'Blogs', to: '/blogs' },
  { label: 'Newsletter', to: '/newsletter' },
  { label: 'About Me', to: '/about' },
];

// The e-book, podcast and shop pages (and anything beneath them) share their
// own navbar links and icon links; each page has its own call to action.
export const pageNav = {
  links: [
    { label: 'Home', to: '/' },
    { label: 'E-books', to: '/ebook' },
    { label: 'Podcast', to: '/podcast' },
    { label: 'Shop', to: '/shop' },
    { label: 'Blog', to: '/blogs' },
    { label: 'Newsletter', to: '/newsletter' },
    { label: 'About', to: '/about' },
  ],
  ctas: {
    '/ebook': { label: 'Get the Bundle', to: '/ebook#bundle' },
    '/podcast': { label: 'Get the Bundle', to: '/ebook#bundle' },
    '/shop': { label: 'Explore Products', to: '/shop#categories' },
  },
  tools: [
    { id: 'search', label: 'Search', to: '/search' },
    { id: 'bag', label: 'Your bag', to: '/ebook/checkout' },
  ],
};

// TODO: add the real profile and show URLs. While a value is empty the link
// goes to the internal /connect page instead of a guessed address.
const externalProfiles = {
  instagram: '',
  youtube: '',
  spotify: '',
  applePodcasts: '',
};

export const profileLink = (key) => externalProfiles[key] || '/connect';

export const socialLinks = [
  { id: 'instagram', label: 'Rachna on Instagram', to: profileLink('instagram') },
  { id: 'youtube', label: 'Rachna on YouTube', to: profileLink('youtube') },
  { id: 'spotify', label: 'The Beauty Obsessed Podcast on Spotify', to: profileLink('spotify') },
];

export const salon = {
  name: 'XING Hair & Skin',
  city: 'Bangalore',
  to: '/salons',
  // TODO: replace `address: null` with each salon's real address.
  locations: [
    { id: 'salon-1', label: 'Salon 1', address: null },
    { id: 'salon-2', label: 'Salon 2', address: null },
    { id: 'salon-3', label: 'Salon 3', address: null },
  ],
};

export const supportLinks = [
  { label: 'Contact', to: '/contact' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms' },
  { label: 'Refund Policy', to: '/refund-policy' },
  { label: 'Affiliate Disclosure', to: '/affiliate-disclosure' },
  { label: 'Medical Disclaimer', to: '/medical-disclaimer' },
];

// Leave unset until a real mailing-list endpoint exists. The form never
// reports success unless this endpoint accepts the request.
export const newsletterEndpoint = import.meta.env.VITE_NEWSLETTER_ENDPOINT || '';

// Same rule for the free sample chapter on the e-book page: the form only
// reports success when this endpoint accepts the request.
export const sampleChapterEndpoint = import.meta.env.VITE_SAMPLE_CHAPTER_ENDPOINT || '';

// Same rule for the podcast page's guest and topic form.
export const guestRequestEndpoint = import.meta.env.VITE_GUEST_REQUEST_ENDPOINT || '';

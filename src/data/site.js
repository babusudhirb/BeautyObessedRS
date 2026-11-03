// Site-wide navigation and link destinations.
// Values marked TODO need a real answer from Rachna's team before launch.

export const brand = {
  // The brand mark in the navbar and footer (components/ui/BrandMark.jsx).
  name: 'RS Beauty',
  fullName: 'Beauty Obsessed by Rachna Sinha',
  tagline: 'Beauty advice, salon services, training and inspiration for your everyday routine.',
  copyrightYear: 2026,
};

// The navbar on every page and the footer's Explore list. The link for the
// page the visitor is on, or the page it sits under (Blogs on each article),
// is highlighted. The homepage sections stay reachable at /#ebook, /#blogs etc.
export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Me', to: '/about' },
  { label: 'E-book', to: '/ebook' },
  { label: 'Podcast', to: '/podcast' },
  { label: 'Shop', to: '/shop' },
  { label: 'Blogs', to: '/blogs' },
  { label: 'Newsletter', to: '/newsletter' },
];

export const primaryCta = { label: 'Get My Beauty Plan', to: '/#beauty-plan' };

// TODO: add the real profile and show URLs. While a value is empty the link
// goes to the internal /connect page instead of a guessed address.
const externalProfiles = {
  instagram: '',
  // Rachna's channel, supplied 2026-10-15.
  youtube: 'https://www.youtube.com/@Rachnasinha2020',
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

// Routes that the homepage links to but that have not been built yet.
// Each one renders <UpcomingPage>, so every link on the site has a real
// destination. To build a page, create its component in src/pages and swap
// the route in App.jsx.

export const upcomingPages = [
  {
    path: '/beauty-plan',
    title: 'Get your Beauty Plan',
    summary: 'Sign-up for the Free Trial, Monthly Plan and Premium Plan will open here.',
    back: { label: 'See how the Beauty Plan works', to: '/#beauty-plan' },
  },
  {
    path: '/ebook/checkout',
    title: 'Checkout',
    summary: 'Secure checkout for the e-books will open here. Nothing has been ordered or charged.',
    back: { label: 'Back to the e-books', to: '/ebook' },
  },
  {
    path: '/ebook/salon-expert-guide',
    title: 'Salon Expert Guide',
    summary: 'The full contents of the guide for beauty professionals will be available here.',
    back: { label: 'Back to the e-books', to: '/ebook' },
  },
  {
    path: '/search',
    title: 'Search',
    summary: 'Site search will be available here.',
  },
  {
    path: '/shop/body-care',
    title: 'Body Care',
    summary: 'The body care collection will be listed here.',
    back: { label: 'Back to the shop', to: '/shop#categories' },
  },
  {
    path: '/shop/:product',
    title: 'Product details',
    summary: 'This product’s details and where to buy it will be available here.',
    back: { label: 'Back to the shop', to: '/shop' },
  },
  {
    path: '/newsletter/archive',
    title: 'Past issues of The Beauty Letter',
    summary: 'Every issue will be published here after it is sent. The first one is on its way.',
    back: { label: 'Back to The Beauty Letter', to: '/newsletter' },
  },
  {
    path: '/salons',
    title: 'XING Hair & Skin salons',
    summary: 'Addresses, services and booking details for the Bangalore salons will be listed here.',
  },
  {
    path: '/training',
    title: 'Training',
    summary: 'Details of hands-on training for beauty professionals will be listed here.',
  },
  {
    path: '/faqs',
    title: 'Frequently Asked Questions',
    summary: 'The complete list of questions and answers will be available here.',
    back: { label: 'Back to the FAQs', to: '/#faq' },
  },
  {
    path: '/videos',
    title: 'Videos',
    summary:
      'Short videos with Rachna’s routines, honest product reviews and expert tips are on the way. Until they are published here, her YouTube channel has her latest videos.',
    // Rachna's channel, as in data/podcastPage.js (this file stays free of imports).
    back: { label: 'Visit the YouTube channel', to: 'https://www.youtube.com/@Rachnasinha2020' },
  },
  {
    path: '/connect',
    title: 'Follow Rachna',
    summary: 'Links to Instagram, YouTube, Spotify and Apple Podcasts will be added here.',
  },
  { path: '/contact', title: 'Contact', summary: 'Contact details will be added here.' },
  { path: '/privacy-policy', title: 'Privacy Policy', summary: 'The privacy policy will be published here.' },
  { path: '/terms', title: 'Terms & Conditions', summary: 'The terms and conditions will be published here.' },
  { path: '/refund-policy', title: 'Refund Policy', summary: 'The refund policy will be published here.' },
  {
    path: '/affiliate-disclosure',
    title: 'Affiliate Disclosure',
    summary: 'The affiliate disclosure will be published here.',
  },
  {
    path: '/medical-disclaimer',
    title: 'Medical Disclaimer',
    summary: 'The medical disclaimer will be published here.',
  },
];

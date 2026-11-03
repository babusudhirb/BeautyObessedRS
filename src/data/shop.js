// Copy and products for the shop page (/shop).
//
// No prices, stock or ingredient lists are shown: none have been supplied.
// Each product's `url` is where its "View Product" link goes. Set it to the
// product's store listing (e.g. its Amazon page) when it is ready; while it is
// null the link opens that product's "coming soon" page on this site.

export const hero = {
  eyebrow: 'The Rachna Beauty Collection',
  title: ['Care that fits', 'your everyday life.'],
  copy: 'Thoughtfully designed skincare, haircare and nail care for your daily routine.',
  cta: { label: 'Explore All Products', to: '/shop#skincare' },
  benefits: [
    { icon: 'leaf', lines: ['Thoughtful', 'formulations'] },
    { icon: 'heart', lines: ['Made for', 'everyday routines'] },
    { icon: 'lotus', lines: ['Simple', 'beauty rituals'] },
  ],
};

// `image` is a slug from image-manifest.json. The skincare card uses the
// existing skincare photograph from the homepage; no separate skincare
// category photograph was supplied.
export const categories = [
  { id: 'skincare', title: 'Skincare', copy: 'Cleansers, serums, moisturisers and sunscreen for everyday care.', image: 'product-skincare', focus: '50% 55%', to: '/shop#skincare' },
  { id: 'haircare', title: 'Haircare', copy: 'Shampoo, conditioner, hair masks and oils for stronger, healthier hair.', image: 'retail-cat-haircare', focus: '50% 45%', to: '/shop#haircare' },
  { id: 'nailcare', title: 'Nail Care', copy: 'Cuticle oils, nail strengtheners, hand creams and more.', image: 'retail-cat-nailcare', focus: '50% 45%', to: '/shop#nailcare' },
  { id: 'bodycare', title: 'Body Care', copy: 'Body wash, body lotion, scrubs and oils for soft, healthy skin.', image: 'retail-cat-bodycare', focus: '50% 45%', to: '/shop/body-care' },
];

// `focus` is the CSS object-position that keeps each product in its frame.
export const collections = [
  {
    id: 'skincare',
    label: 'Skincare',
    title: ['Healthy,', 'glowing skin', 'every day.'],
    copy: 'Cleansers, serums, moisturisers and sunscreen for skin that feels clean, balanced and radiant.',
    products: [
      { id: 'gentle-face-cleanser', name: 'Gentle Face Cleanser', copy: 'A mild cleanser for clean and fresh skin.', image: 'retail-cleanser', focus: '40% 40%', url: null },
      { id: 'radiance-face-serum', name: 'Radiance Face Serum', copy: 'Helps improve skin texture and natural glow.', image: 'retail-serum', focus: '72% 60%', url: null },
      { id: 'hydrating-moisturiser', name: 'Hydrating Moisturiser', copy: 'Keeps your skin soft, smooth and nourished.', image: 'retail-moisturiser', focus: '72% 62%', url: null },
      // No sunscreen was supplied in the shop folder: this is the homepage's sunscreen photograph.
      { id: 'sun-defence-sunscreen', name: 'Sun Defence Sunscreen', copy: 'Broad spectrum protection for everyday care.', image: 'product-sunscreen', focus: '50% 50%', url: null },
    ],
  },
  {
    id: 'haircare',
    label: 'Haircare',
    title: ['Stronger,', 'healthier hair', 'with care.'],
    copy: 'Shampoos, conditioners, hair masks and oils for smooth, shiny and manageable hair.',
    products: [
      { id: 'nourishing-shampoo', name: 'Nourishing Shampoo', copy: 'Gently cleanses and strengthens your hair.', image: 'retail-shampoo', focus: '72% 55%', url: null },
      { id: 'repairing-conditioner', name: 'Repairing Conditioner', copy: 'Detangles and makes hair soft and smooth.', image: 'retail-conditioner', focus: '74% 55%', url: null },
      { id: 'intensive-hair-mask', name: 'Intensive Hair Mask', copy: 'Deep nourishment for stronger, shinier hair.', image: 'retail-hair-mask', focus: '72% 62%', url: null },
      { id: 'hair-growth-oil', name: 'Hair Growth Oil', copy: 'Nourishes the scalp and helps reduce hair fall.', image: 'retail-hair-oil', focus: '68% 55%', url: null },
    ],
  },
  {
    id: 'nailcare',
    label: 'Nail Care',
    title: ['Healthy nails,', 'happier you.'],
    copy: 'Nail oils, strengtheners, cuticle creams and hand creams for strong, beautiful nails.',
    products: [
      { id: 'nail-care-oil', name: 'Nail Care Oil', copy: 'Helps keep nails and cuticles healthy.', image: 'retail-nail-oil', focus: '76% 58%', url: null },
      { id: 'nail-strengthener', name: 'Nail Strengthener', copy: 'Helps reduce breakage and promotes stronger nails.', image: 'retail-nail-strengthener', focus: '70% 60%', url: null },
      { id: 'cuticle-cream', name: 'Cuticle Cream', copy: 'Moisturises and softens cuticles.', image: 'retail-cuticle-cream', focus: '78% 64%', url: null },
      { id: 'hand-cream', name: 'Hand Cream', copy: 'Keeps your hands soft, smooth and hydrated.', image: 'retail-hand-cream', focus: '74% 55%', url: null },
    ],
  },
].map((collection) => ({
  ...collection,
  products: collection.products.map((product) => ({ ...product, to: product.url ?? `/shop/${product.id}` })),
}));

export const standard = {
  title: 'The Rachna Standard',
  copy: 'Simple, effective beauty essentials created with care and practical knowledge, so you can feel confident every day.',
  points: [
    { icon: 'leaf', lines: ['Thoughtful', 'formulations'] },
    { icon: 'document', lines: ['Clear product', 'information'] },
    { icon: 'shield', lines: ['Gentle', 'everyday care'] },
    { icon: 'lotus', lines: ['Made for', 'real routines'] },
  ],
};

export const meet = {
  title: 'Meet the Rachna collection',
  lead: 'A considered collection of beauty essentials for the rituals that make you feel like yourself.',
  copy: 'Rachna’s collection is created with the same care and practical approach that she shares through her e-books, podcast and salon experience — simple, effective products for your everyday beauty routine.',
  cta: { label: 'About Rachna', to: '/about' },
};

// Answers marked `placeholder: true` depend on product pages or store
// listings that do not exist yet.
export const faqs = [
  {
    id: 'shop-choose',
    question: 'How do I choose the right product?',
    answer: 'Start with the category for your concern — skin, hair or nails — and read each product’s short description. For a routine built around you, try Rachna’s Beauty Plan.',
  },
  {
    id: 'shop-ingredients',
    question: 'Where can I find the ingredients?',
    answer: 'The full ingredient list for each product will be on its product page.',
    placeholder: true,
  },
  {
    id: 'shop-use',
    question: 'How do I use each product?',
    answer: 'Directions for use will be on each product page and on the packaging.',
    placeholder: true,
  },
  {
    id: 'shop-buy',
    question: 'Where can I buy Rachna products?',
    answer: 'Each product’s “View Product” link will take you to the store where it is sold, once the products are listed.',
    placeholder: true,
  },
  {
    id: 'shop-shipping',
    question: 'What are the shipping and return policies?',
    answer: 'Shipping and returns will be handled by the store you buy from, and its policies will apply to your order.',
    placeholder: true,
  },
  {
    id: 'shop-personal',
    question: 'Can I get personalised recommendations?',
    answer: 'Yes. Rachna’s Beauty Plan gives you a personalised daily routine, and you can start with the free trial.',
  },
];

export const newsletter = {
  title: 'A little beauty inspiration, in your inbox.',
  copy: 'New product updates, simple beauty tips and special offers.',
  cta: 'Join the Beauty List',
};

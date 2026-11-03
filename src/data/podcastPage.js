// Copy for the podcast page (/podcast). Episode data itself is shared with the
// homepage and lives in content.js → podcast.episodes.
//
// Same conventions as content.js: `null` is a value that has not been
// confirmed, and `placeholder: true` marks wording that stands in for content
// still to be confirmed.

import { profileLink } from './site.js';

// Rachna's channel, as supplied for this page.
export const youtubeChannel = {
  url: 'https://www.youtube.com/@Rachnasinha2020',
  handle: '@Rachnasinha2020',
};

// Set the first episode's date here (e.g. '15 Jan 2027') once it is confirmed.
// While it is null the page says the episodes are on the way.
export const launchDate = null;

export const hero = {
  eyebrow: 'The Beauty Obsessed Podcast',
  copy: 'Daily conversations with Rachna Sinha and her guests on skin, hair, diet and self-care. Practical, honest and made for everyday life.',
  status: 'New episodes coming soon',
  features: [
    { icon: 'headphones', lines: ['Real', 'conversations'] },
    { icon: 'guests', lines: ['Expert', 'guests'] },
    { icon: 'advice', lines: ['Practical', 'advice'] },
    { icon: 'everyone', lines: ['For everyone', 'who loves beauty'] },
  ],
};

export const platforms = [
  { id: 'spotify', verb: 'Listen on', name: 'Spotify', to: profileLink('spotify') },
  { id: 'applePodcasts', verb: 'Listen on', name: 'Apple Podcasts', to: profileLink('applePodcasts') },
  { id: 'youtube', verb: 'Watch on', name: 'YouTube', to: youtubeChannel.url },
];

// The trailer has not been published. `url` and `duration` stay null until it
// is; meanwhile the card says so and links to the channel.
export const trailer = {
  title: 'Watch the trailer',
  copy: 'A glimpse into the conversations, topics and guests.',
  url: null,
  duration: null,
  tagline: 'Real people. Real stories. Real beauty.',
  pitch: 'From everyday routines to expert insights, The Beauty Obsessed Podcast brings you honest conversations that inspire, educate and make beauty feel simple and real.',
};

export const topics = [
  { id: 'routines', icon: 'routines', image: 'topic-routines', title: 'Daily Routines', copy: 'Morning and night habits that fit real life.', focus: '50% 30%' },
  { id: 'skincare', icon: 'skincare', image: 'topic-skincare', title: 'Skincare', copy: 'Skin types, ingredients and common mistakes.', focus: '60% 50%' },
  { id: 'haircare', icon: 'haircare', image: 'topic-haircare', title: 'Haircare', copy: 'Scalp care, hair fall, oiling and styling.', focus: '45% 40%' },
  { id: 'diet', icon: 'diet', image: 'topic-diet', title: 'Diet & Nutrition', copy: 'What to eat for healthy skin and hair.', focus: '40% 55%' },
  { id: 'makeup', icon: 'makeup', image: 'topic-makeup', title: 'Makeup & Style', copy: 'Everyday makeup and finding your look.', focus: '35% 45%' },
  { id: 'salon', icon: 'salon', image: 'topic-salon', title: 'Salon & Career', copy: 'Salon life, training and the beauty business.', focus: '50% 55%' },
];

export const formats = [
  { icon: 'headphones', title: 'Rachna, solo', copy: 'Short, focused episodes on daily routines, beauty tips and personal insights.' },
  { icon: 'guests', title: 'With guests', copy: 'Conversations with beauty professionals, experts and inspiring individuals.' },
  { icon: 'questions', title: 'Your questions', copy: 'Rachna answers real questions from the community about beauty and self-care.' },
];

// The planned first three episodes, from the page design. None is published:
// each stays "Coming soon" until it has a date and a link.
export const upcoming = [
  { id: 'ep-01', number: 'EP 01', title: 'My Morning Skincare Routine for Healthy Skin', image: 'topic-routines', focus: '55% 28%', placeholder: true },
  { id: 'ep-02', number: 'EP 02', title: 'How to Stop Hair Fall and Build a Simple Routine', image: 'topic-haircare', focus: '50% 30%', placeholder: true },
  { id: 'ep-03', number: 'EP 03', title: 'Beauty from Within: Diet, Nutrition and Skin', image: 'topic-diet', focus: '40% 50%', placeholder: true },
];

// Only confirmed facts: 10+ years, 3 salons in Bangalore, the YouTube channel.
// The design also showed a subscriber count, which is left out until confirmed.
export const host = {
  title: ['Meet your host,', 'Rachna Sinha.'],
  bio: 'Rachna is a beauty expert, salon founder and trainer with over 10 years of experience and 3 salons in Bangalore. The podcast brings her practical, honest approach to the routines, questions and people behind everyday beauty.',
  stats: [
    { icon: 'trophy', value: '10+', label: 'years in beauty' },
    { icon: 'store', value: '3', label: 'salons in Bangalore' },
    { icon: 'youtube', value: 'YouTube', label: youtubeChannel.handle },
  ],
};

export const planBand = {
  title: 'Want Rachna to plan your routine?',
  copy: 'Get a daily plan for your skin, hair and diet, built by Rachna and her team.',
  cta: { label: 'Start Free Trial', to: '/#beauty-plan' },
  points: [
    { icon: 'personal', lines: ['Personalised', 'routine'] },
    { icon: 'guests', lines: ['Expert', 'recommendations'] },
    { icon: 'simple', lines: ['Simple', 'and easy to follow'] },
  ],
};

export const guestForm = {
  title: 'Who should we talk to next?',
  copy: 'Suggest a topic, ask a question or recommend yourself or a guest for the show.',
  reasons: ['Suggest a topic', 'Ask a question', 'Recommend a guest', 'Be a guest'],
};

export const notify = {
  title: 'Be the first to hear every episode.',
  copy: 'New episodes, guest announcements and one beauty tip a week.',
};

export const faqs = [
  {
    id: 'pod-about',
    question: 'What is The Beauty Obsessed Podcast about?',
    answer: 'Honest conversations about skincare, haircare, makeup, self-care and the beauty industry, with Rachna Sinha and her guests.',
  },
  {
    id: 'pod-first-episode',
    question: 'When does the first episode come out?',
    answer: 'The first episodes are on the way. Join the list on this page and you will hear as soon as there is a date.',
    placeholder: true,
  },
  {
    id: 'pod-where',
    question: 'Where can I watch or listen to the podcast?',
    answer: 'Rachna’s YouTube channel is live now. Spotify and Apple Podcasts links will be added when the first episodes are published.',
  },
  {
    id: 'pod-language',
    question: 'What language is the podcast in?',
    answer: 'This will be confirmed before the first episode is released.',
    placeholder: true,
  },
  {
    id: 'pod-suggest',
    question: 'Can I suggest a topic or be a guest?',
    answer: 'Yes. Use the “Who should we talk to next?” form on this page to suggest a topic, ask a question or recommend a guest.',
  },
  {
    id: 'pod-medical',
    question: 'Does the podcast give medical advice?',
    answer: 'No. The podcast is educational and is not a substitute for professional advice. For any medical concern, please see a qualified doctor or dermatologist.',
  },
];

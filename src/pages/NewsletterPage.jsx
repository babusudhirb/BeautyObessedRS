// The italic cut of the headline serif, used by the hero's emphasis.
import '@fontsource-variable/fraunces/opsz-italic.css';

import { ExploreMore } from '../components/BlogPage/BlogSections.jsx';
import EbookFaq from '../components/EbookLanding/EbookFaq.jsx';
import { Benefits, LookInside, NewsletterHero, SignupBand } from '../components/NewsletterPage/NewsletterSections.jsx';
import { faqs } from '../data/newsletterPage.js';
import { absoluteUrl } from '../data/seo.js';
import useMetaDescription from '../hooks/useMetaDescription.js';
// Layout primitives shared with the e-book page and the blog page's explore cards.
import '../components/EbookLanding/EbookLanding.css';
import '../components/PodcastPage/PodcastPage.css';
import '../components/BlogPage/BlogPage.css';
import '../components/NewsletterPage/NewsletterPage.css';

const TITLE = 'Beauty Newsletter | Skincare & Haircare Tips – Rachna Sinha';
const DESCRIPTION =
  'Get weekly skincare tips, haircare advice, beauty product reviews and everyday self-care ideas from Rachna Sinha in The Beauty Letter by Beauty Obsessed.';

// The newsletter page: The Beauty Letter. Section order follows its reference.
export default function NewsletterPage() {
  useMetaDescription(DESCRIPTION);

  return (
    <div className="ebk blog nl">
      <title>{TITLE}</title>
      <link rel="canonical" href={absoluteUrl('/newsletter')} />
      <NewsletterHero />
      <Benefits />
      <LookInside />
      <SignupBand />
      <ExploreMore title="Explore more from Beauty Obsessed" />
      <EbookFaq faqs={faqs} titleId="nl-faq-title" />
    </div>
  );
}

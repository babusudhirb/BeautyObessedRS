// The italic cut of the headline serif, used by the hero and the quote card.
import '@fontsource-variable/fraunces/opsz-italic.css';

import PageMeta from '../components/Seo/PageMeta.jsx';
import AboutRachna from '../components/EbookLanding/AboutRachna.jsx';
import BottomCta from '../components/EbookLanding/BottomCta.jsx';
import CollectionBanner from '../components/EbookLanding/CollectionBanner.jsx';
import EbookFaq from '../components/EbookLanding/EbookFaq.jsx';
import EbookHero from '../components/EbookLanding/EbookHero.jsx';
import FeatureStage from '../components/EbookLanding/FeatureStage.jsx';
import GuideCards from '../components/EbookLanding/GuideCards.jsx';
import InsideEbook from '../components/EbookLanding/InsideEbook.jsx';
import Testimonials from '../components/EbookLanding/Testimonials.jsx';
import '../components/EbookLanding/EbookLanding.css';

// The e-book landing page. Section order follows its design reference.
export default function EbookPage() {
  return (
    <div className="ebk">
      <PageMeta
        title="E-books by Rachna — Beauty Daily Routine, Skincare Guide and Haircare Guide"
        description="Practical, easy-to-follow e-books by Rachna (Beauty Daily Routine, Skincare Guide and Haircare Guide) to help you build healthier routines and feel more confident every day."
        path="/ebook"
        image="ebook-hero-books"
      />
      <EbookHero />
      <GuideCards />
      <CollectionBanner />
      <InsideEbook />
      <FeatureStage />
      <AboutRachna />
      <EbookFaq />
      <Testimonials />
      <BottomCta />
    </div>
  );
}

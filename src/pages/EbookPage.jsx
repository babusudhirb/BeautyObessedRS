// The italic cut of the headline serif, used by the hero and the quote card.
import '@fontsource-variable/fraunces/opsz-italic.css';

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
      <title>E-books by Rachna — Beauty Daily Routine, Skincare Guide and Haircare Guide</title>
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

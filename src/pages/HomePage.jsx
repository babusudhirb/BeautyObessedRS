import PageMeta from '../components/Seo/PageMeta.jsx';
import Hero from '../components/Hero/Hero.jsx';
import StatsStrip from '../components/StatsStrip/StatsStrip.jsx';
import WhatRachnaDoes from '../components/WhatRachnaDoes/WhatRachnaDoes.jsx';
import BeautyPlan from '../components/BeautyPlan/BeautyPlan.jsx';
import EbookSection from '../components/Ebook/EbookSection.jsx';
import PodcastSection from '../components/Podcast/PodcastSection.jsx';
import Retail from '../components/Retail/Retail.jsx';
import QuoteBand from '../components/QuoteBand/QuoteBand.jsx';
import Blogs from '../components/Blogs/Blogs.jsx';
import About from '../components/About/About.jsx';
import Faq from '../components/Faq/Faq.jsx';
import Newsletter from '../components/Newsletter/Newsletter.jsx';

// The same wording as the description in index.html.
const DESCRIPTION =
  'Rachna is a beauty expert, salon founder and trainer in Bangalore. Personalised beauty plans, the Beauty Daily Routine e-book, the Beauty Obsessed podcast and XING Hair & Skin salons.';

// Section order follows the reference design.
export default function HomePage() {
  return (
    <>
      <PageMeta
        title="Rachna — Beauty Expert, Salon Founder & Personal Beauty Planner"
        description={DESCRIPTION}
        path="/"
        image="home-hero-portrait"
      />
      <Hero />
      <StatsStrip />
      <WhatRachnaDoes />
      <BeautyPlan />
      <EbookSection />
      <PodcastSection />
      <Retail />
      <QuoteBand />
      <Blogs />
      <About />
      <Faq />
      <Newsletter />
    </>
  );
}

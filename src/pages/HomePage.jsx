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

// Section order follows the reference design.
export default function HomePage() {
  return (
    <>
      <title>Rachna — Beauty Expert, Salon Founder &amp; Personal Beauty Planner</title>
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

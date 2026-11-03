// The italic cut of the headline serif, used by the hero's emphasis.
import '@fontsource-variable/fraunces/opsz-italic.css';

import EbookFaq from '../components/EbookLanding/EbookFaq.jsx';
import GetInvolved from '../components/PodcastPage/GetInvolved.jsx';
import MeetHost from '../components/PodcastPage/MeetHost.jsx';
import PlanBand from '../components/PodcastPage/PlanBand.jsx';
import PodcastHero from '../components/PodcastPage/PodcastHero.jsx';
import ShowStage from '../components/PodcastPage/ShowStage.jsx';
import TopicsStage from '../components/PodcastPage/TopicsStage.jsx';
import UpcomingEpisodes from '../components/PodcastPage/UpcomingEpisodes.jsx';
import PageMeta from '../components/Seo/PageMeta.jsx';
import { faqs, hero } from '../data/podcastPage.js';
// Layout primitives shared with the e-book page (containers, section heads, FAQ).
import '../components/EbookLanding/EbookLanding.css';
import '../components/PodcastPage/PodcastPage.css';

// The podcast page. Section order follows its design reference.
export default function PodcastPage() {
  return (
    <div className="ebk pod">
      <PageMeta title="The Beauty Obsessed Podcast — Rachna Sinha" description={hero.copy} path="/podcast" image="pod-hero" />
      <PodcastHero />
      <ShowStage />
      <TopicsStage />
      <UpcomingEpisodes />
      <MeetHost />
      <PlanBand />
      <GetInvolved />
      <EbookFaq faqs={faqs} titleId="pod-faq-title" />
    </div>
  );
}

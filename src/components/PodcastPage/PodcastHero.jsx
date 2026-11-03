import { Mic } from 'lucide-react';
import Button from '../ui/Button.jsx';
import PageHero from '../PageHero/PageHero.jsx';
import { PAGE_ICONS } from '../PageHero/icons.js';
import { BRAND_ICONS } from '../ui/icons.jsx';
import { hero, youtubeChannel } from '../../data/podcastPage.js';
import { Lines } from '../EbookLanding/parts.jsx';

const YoutubeIcon = BRAND_ICONS.youtube;

// The show's name, set over the bottom-right corner of the photograph.
function ShowBadge() {
  return (
    <p className="pod-badge" aria-hidden="true">
      <Mic size={18} strokeWidth={1.8} />
      <span className="pod-badge__name">Beauty Obsessed</span>
      <span className="pod-badge__kind">Podcast</span>
      <span className="pod-badge__host">with Rachna Sinha</span>
    </p>
  );
}

export default function PodcastHero() {
  return (
    <PageHero
      image="pod-hero"
      mobileImage="pod-hero-mobile"
      alt="Rachna Sinha at her podcast microphone, smiling, with an RS Beauty mug on the desk"
      focus="90% 35%"
      labelledBy="pod-hero-title"
      className="pod-hero"
      extra={<ShowBadge />}
    >
      <p className="eyebrow eyebrow--both">{hero.eyebrow}</p>
      <h1 className="phero__title" id="pod-hero-title">
        Your daily beauty routine, one <em>conversation at a time.</em>
      </h1>
      <p className="phero__text">{hero.copy}</p>

      <p className="pod-status">
        <Mic size={18} strokeWidth={1.9} aria-hidden="true" />
        {hero.status}
      </p>

      <div className="phero__actions">
        <Button to="/podcast#notify">Notify Me</Button>
        <Button
          to={youtubeChannel.url}
          variant="secondary"
          arrow={false}
          iconLeft={<YoutubeIcon />}
          className="pod-yt-btn"
        >
          Subscribe on YouTube
        </Button>
      </div>

      <ul className="phero__points">
        {hero.features.map((feature) => {
          const Icon = PAGE_ICONS[feature.icon];
          return (
            <li key={feature.icon} className="phero__point">
              <Icon size={30} strokeWidth={1.4} aria-hidden="true" />
              <span>
                <Lines lines={feature.lines} />
              </span>
            </li>
          );
        })}
      </ul>
    </PageHero>
  );
}

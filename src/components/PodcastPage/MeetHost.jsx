import Button from '../ui/Button.jsx';
import Picture from '../ui/Picture.jsx';
import { PAGE_ICONS } from '../PageHero/icons.js';
import { BRAND_ICONS } from '../ui/icons.jsx';
import { host, youtubeChannel } from '../../data/podcastPage.js';

const YoutubeIcon = BRAND_ICONS.youtube;

export default function MeetHost() {
  return (
    <section className="ebk-section" aria-labelledby="pod-host-title">
      <div className="ebk-container pod-host">
        <Picture
          name="home-hero-portrait"
          className="pod-host__photo"
          alt="Rachna Sinha at her reception desk, in front of a wall mural that reads “Rachna Sinha, Beauty Obsessed”"
          sizes="(min-width: 1100px) 40vw, 94vw"
        />

        <div className="pod-host__text">
          <h2 className="heading pod-host__title" id="pod-host-title">
            {host.title[0]} <br />
            {host.title[1]}
          </h2>
          <p className="pod-host__bio">{host.bio}</p>
          <div className="pod-host__actions">
            <Button to="/about" size="sm">
              More about Rachna
            </Button>
            <Button to={youtubeChannel.url} size="sm" variant="secondary" arrow={false} iconLeft={<YoutubeIcon />} className="pod-yt-btn">
              Visit YouTube channel
            </Button>
          </div>
        </div>

        <dl className="pod-host__stats">
          {host.stats.map((stat) => {
            const Icon = stat.icon === 'youtube' ? YoutubeIcon : PAGE_ICONS[stat.icon];
            return (
              <div key={stat.label} className="pod-stat">
                <span className="pod-stat__icon" aria-hidden="true">
                  <Icon size={34} strokeWidth={1.3} />
                </span>
                <dt className="pod-stat__value">{stat.value}</dt>
                <dd className="pod-stat__label">{stat.label}</dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

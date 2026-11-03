import { CalendarDays } from 'lucide-react';
import Button from '../ui/Button.jsx';
import Picture from '../ui/Picture.jsx';
import { SectionHead } from '../EbookLanding/parts.jsx';
import { launchDate, upcoming } from '../../data/podcastPage.js';

// The first planned episodes. None is published, so each is marked as coming soon.
export default function UpcomingEpisodes() {
  return (
    <section className="ebk-section" id="upcoming" aria-labelledby="pod-upcoming-title">
      <div className="ebk-container">
        <SectionHead
          title="Upcoming episodes"
          titleId="pod-upcoming-title"
          aside={launchDate ? `The first episodes arrive on ${launchDate}.` : 'The first episodes are on the way.'}
        />
        <ul className="pod-upcoming">
          {upcoming.map((episode) => (
            <li key={episode.id} className="card upcoming-ep">
              <div className="upcoming-ep__media">
                <Picture name={episode.image} alt="" sizes="(min-width: 1100px) 24vw, 46vw" style={{ objectPosition: episode.focus }} />
                <span className="upcoming-ep__number">{episode.number}</span>
              </div>
              <div className="upcoming-ep__body">
                <h3 className="upcoming-ep__title">{episode.title}</h3>
                <p className="upcoming-ep__host">With Rachna Sinha</p>
                <span className="upcoming-ep__tag">Coming soon</span>
              </div>
            </li>
          ))}
          <li className="upcoming-more">
            <CalendarDays size={34} strokeWidth={1.3} aria-hidden="true" />
            <p className="upcoming-more__text">Many more conversations are on the way.</p>
            <Button to="/podcast#notify" size="sm">
              Notify Me
            </Button>
          </li>
        </ul>
      </div>
    </section>
  );
}

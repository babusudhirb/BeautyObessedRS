import { Play } from 'lucide-react';
import Picture from '../ui/Picture.jsx';
import SmartLink from '../ui/SmartLink.jsx';
import { videos } from '../../data/ebooks.js';
import { SectionHead } from './parts.jsx';

// "Watch Rachna on YouTube": the left panel of the feature stage. Each card is
// a link and nothing plays on the page. The videos are still to be published,
// so the links open the /videos "coming soon" page and running times are shown only
// once they are known (see data/ebooks.js).
export default function YoutubeVideos() {
  return (
    <section className="stage__panel stage__panel--videos" id="videos" aria-labelledby="videos-title">
      <SectionHead
        stack
        title="Watch Rachna on YouTube"
        titleId="videos-title"
        aside="Short videos, expert tips and more."
      />

      <ul className="videos">
        {videos.map((video) => (
          <li key={video.id}>
            <SmartLink to={video.to} className="video">
              <Picture
                name={video.image}
                alt=""
                sizes="(min-width: 980px) 46vw, (min-width: 640px) 31vw, 82vw"
                style={{ objectPosition: video.focus }}
              />

              <span className="video__title">
                {video.title.map((line, index) => (
                  <span
                    key={line}
                    className={index < (video.serifLines ?? 1) ? 'video__line video__line--lead' : 'video__line'}
                  >
                    {line}{' '}
                  </span>
                ))}
              </span>

              <span className="video__play" aria-hidden="true">
                <Play size={20} strokeWidth={0} fill="currentColor" />
              </span>

              {video.duration && <span className="video__time">{video.duration}</span>}
            </SmartLink>
          </li>
        ))}
      </ul>
    </section>
  );
}

import { useState } from 'react';
import { Play } from 'lucide-react';
import ArrowLink from '../ui/ArrowLink.jsx';
import Picture from '../ui/Picture.jsx';
import SmartLink from '../ui/SmartLink.jsx';
import { BRAND_ICONS } from '../ui/icons.jsx';
import EpisodePlayer from '../Podcast/EpisodePlayer.jsx';
import { EpisodeCard, PodcastCover } from '../Podcast/PodcastSection.jsx';
import Waveform from '../Podcast/Waveform.jsx';
import useAudioPlayer from '../Podcast/useAudioPlayer.js';
import { podcast } from '../../data/content.js';
import { platforms, trailer, youtubeChannel } from '../../data/podcastPage.js';

// The show itself: Rachna at the microphone beside the show's panel (where to
// listen, the featured episode and two more), with the trailer underneath.
// The panel reuses the homepage podcast components and data, so both pages
// always show the same episodes; nothing plays until an episode has audio.
export default function ShowStage() {
  const { episodes } = podcast;
  const [activeId, setActiveId] = useState(episodes[0].id);
  const active = episodes.find((episode) => episode.id === activeId) ?? episodes[0];
  const others = episodes.filter((episode) => episode.id !== active.id).slice(0, 2);
  const player = useAudioPlayer(active.audioUrl);

  const playEpisode = (episode) => {
    player.playNextSource();
    setActiveId(episode.id);
  };

  const trailerTo = trailer.url ?? youtubeChannel.url;

  return (
    <section className="ebk-section pod-show" id="listen" aria-labelledby="pod-show-title">
      <div className="ebk-container pod-show__grid">
        <Picture
          name="home-podcast"
          className="pod-show__photo"
          alt="Rachna at her podcast desk, seated beside a studio microphone"
          sizes="(min-width: 1100px) 40vw, 94vw"
          // Its top edge shows on the first screen, where on phones it is the
          // largest image, so it is fetched straight away.
          loading="eager"
        />

        <div className="podcast__panel pod-show__panel">
          <header className="podcast__header">
            <p className="eyebrow podcast__label">Beauty Obsessed · Podcast</p>
            <h2 className="heading podcast__title" id="pod-show-title">
              The Beauty Obsessed Podcast
            </h2>
            <p className="podcast__copy">{podcast.copy}</p>

            <ul className="podcast__platforms">
              {platforms.map((platform) => {
                const Icon = BRAND_ICONS[platform.id];
                return (
                  <li key={platform.id}>
                    <SmartLink to={platform.to} className={`platform platform--${platform.id}`}>
                      <span className="platform__icon">
                        <Icon />
                      </span>
                      <span className="platform__text">
                        <span className="platform__verb">{platform.verb}</span>
                        <span className="platform__name">{platform.name}</span>
                      </span>
                    </SmartLink>
                  </li>
                );
              })}
            </ul>

            <PodcastCover />
          </header>

          <EpisodePlayer episode={active} player={player} isLatest={active.id === episodes[0].id} />

          <div className="podcast__more">
            <ul className="podcast__episodes">
              {others.map((episode) => (
                <EpisodeCard key={episode.id} episode={episode} onPlay={playEpisode} />
              ))}
            </ul>
            <ArrowLink to="/podcast#upcoming" className="pod-show__all">
              View all episodes
            </ArrowLink>
          </div>
        </div>

        <div className="pod-trailer">
          <SmartLink
            to={trailerTo}
            className="pod-trailer__video"
            aria-label={trailer.url ? trailer.title : `${trailer.title}: coming soon. Opens Rachna’s YouTube channel`}
          >
            <Picture name="podcast-rachna" alt="" sizes="(min-width: 1100px) 56vw, 94vw" />
            <span className="pod-trailer__play" aria-hidden="true">
              <Play size={26} strokeWidth={0} fill="currentColor" />
            </span>
            <span className="pod-trailer__text">
              <span className="pod-trailer__title">{trailer.title}</span>
              <span className="pod-trailer__copy">{trailer.copy}</span>
            </span>
            <span className="pod-trailer__time">{trailer.duration ?? 'Coming soon'}</span>
          </SmartLink>

          <div className="pod-trailer__pitch">
            <Picture name="pod-studio" className="pod-trailer__studio" alt="" sizes="30vw" />
            <p className="eyebrow pod-trailer__tagline">{trailer.tagline}</p>
            <p className="pod-trailer__words">{trailer.pitch}</p>
            <Waveform bars={64} className="pod-trailer__wave" />
          </div>
        </div>
      </div>
    </section>
  );
}

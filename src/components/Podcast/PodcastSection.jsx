import { useState } from 'react';
import { Play } from 'lucide-react';
import Button from '../ui/Button.jsx';
import Picture from '../ui/Picture.jsx';
import SmartLink from '../ui/SmartLink.jsx';
import { BRAND_ICONS } from '../ui/icons.jsx';
import { podcast } from '../../data/content.js';
import EpisodePlayer, { EpisodeDuration } from './EpisodePlayer.jsx';
import Waveform from './Waveform.jsx';
import useAudioPlayer from './useAudioPlayer.js';
import './Podcast.css';

// Show artwork. No separate cover file exists, so the studio photograph is
// used with the show's name set over it.
export function PodcastCover() {
  return (
    <div className="podcast__cover" role="img" aria-label={`Beauty Obsessed podcast cover, with ${podcast.host}`}>
      <Picture name="home-podcast" alt="" sizes="190px" />
      <span className="podcast__cover-title">
        Beauty <br />
        Obsessed
      </span>
      <span className="podcast__cover-host">with {podcast.host}</span>
      <Waveform bars={28} className="podcast__cover-wave" />
    </div>
  );
}

export function EpisodeCard({ episode, onPlay }) {
  const available = Boolean(episode.audioUrl);

  return (
    <li className="episode card">
      <Picture name="home-podcast" className="episode__art" alt="" sizes="72px" />
      <div className="episode__text">
        <h3 className="episode__title">{episode.title}</h3>
        <EpisodeDuration value={episode.duration} className="episode__duration" />
      </div>
      <button
        type="button"
        className="episode__play"
        onClick={() => onPlay(episode)}
        disabled={!available}
        aria-label={available ? `Play ${episode.title}` : `${episode.title}: audio not available yet`}
        title={available ? undefined : 'Audio not available yet'}
      >
        <Play size={14} strokeWidth={0} fill="currentColor" aria-hidden="true" />
      </button>
    </li>
  );
}

// Full-width podcast section: the studio photograph on one side and, on the
// other, the show header, the featured-episode player and more episodes.
export default function PodcastSection() {
  const { episodes, platforms } = podcast;
  const [activeId, setActiveId] = useState(episodes[0].id);

  const active = episodes.find((episode) => episode.id === activeId) ?? episodes[0];
  const others = episodes.filter((episode) => episode.id !== active.id).slice(0, 2);
  const player = useAudioPlayer(active.audioUrl);

  // Pressing play on a smaller card loads that episode into the large player.
  const playEpisode = (episode) => {
    player.playNextSource();
    setActiveId(episode.id);
  };

  return (
    <section className="section podcast" id="podcast" aria-labelledby="podcast-title">
      <div className="podcast__layout container-wide">
        <Picture
          name="home-podcast"
          className="podcast__photo"
          alt="Rachna at her podcast desk, seated beside a studio microphone"
          sizes="(min-width: 1000px) 42vw, 94vw"
        />

        <div className="podcast__panel">
          <header className="podcast__header">
            <p className="eyebrow podcast__label">{podcast.label}</p>
            <h2 className="heading podcast__title" id="podcast-title">
              The Beauty Obsessed Podcast
            </h2>
            <p className="podcast__copy">{podcast.copy}</p>

            <ul className="podcast__platforms">
              {platforms.map((platform) => {
                const Icon = BRAND_ICONS[platform.id];
                return (
                  <li key={platform.id}>
                    <SmartLink to={platform.to} className="platform">
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
            <Button to="/podcast" variant="secondary" className="podcast__all">
              View all episodes
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

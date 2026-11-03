import { Pause, Play } from 'lucide-react';
import Picture from '../ui/Picture.jsx';
import Waveform from './Waveform.jsx';

const pad = (value) => String(value).padStart(2, '0');

function formatTime(seconds) {
  const total = Math.max(0, Math.floor(seconds));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  return hours > 0 ? `${hours}:${pad(minutes)}:${pad(total % 60)}` : `${minutes}:${pad(total % 60)}`;
}

// '36 min' -> 2160. Used for the end time until the audio's own length is known.
function minutesToSeconds(duration) {
  const match = /^(\d+)\s*min/.exec(duration ?? '');
  return match ? Number(match[1]) * 60 : 0;
}

// Running time as text, or a neutral dash while it is still to be added.
export function EpisodeDuration({ value, className }) {
  if (value) return <span className={className}>{value}</span>;

  return (
    <span className={className}>
      <span aria-hidden="true">— min</span>
      <span className="sr-only">Duration to be added</span>
    </span>
  );
}

// The large player. `player` comes from useAudioPlayer. When the episode has
// no audio yet the controls are disabled and labelled as such, so the layout
// is visible without pretending to play anything.
export default function EpisodePlayer({ episode, player, isLatest }) {
  const { available, playing, currentTime } = player;
  const length = player.duration || minutesToSeconds(episode.duration);
  const progress = length > 0 ? Math.min(currentTime / length, 1) : 0;

  let tag = 'Coming soon';
  if (available) tag = isLatest ? 'Latest episode' : 'Now playing';

  let playLabel = `${episode.title}: audio not available yet`;
  if (available) playLabel = playing ? `Pause ${episode.title}` : `Play ${episode.title}`;

  return (
    <article className="player card" data-available={available} aria-label="Featured episode">
      {available && <audio {...player.audioProps} />}

      <Picture name="home-podcast" className="player__art" alt="" sizes="150px" />

      <div className="player__info">
        <p className="player__tag">{tag}</p>
        <h3 className="player__title">{episode.title}</h3>
        <p className="player__meta">
          <span>{episode.topic}</span>
          <span aria-hidden="true">·</span>
          <EpisodeDuration value={episode.duration} />
        </p>
      </div>

      <div className="player__controls">
        <button
          type="button"
          className="player__play"
          onClick={player.toggle}
          disabled={!available}
          aria-label={playLabel}
          title={available ? undefined : 'Audio not available yet'}
        >
          {playing ? (
            <Pause size={18} strokeWidth={0} fill="currentColor" aria-hidden="true" />
          ) : (
            <Play size={18} strokeWidth={0} fill="currentColor" aria-hidden="true" />
          )}
        </button>

        <div className="player__track">
          <Waveform progress={progress} className="player__waveform" />

          <div className="player__progress">
            <span className="player__time">{formatTime(currentTime)}</span>
            <input
              type="range"
              className="player__seek"
              min={0}
              max={length || 1}
              step={1}
              value={Math.min(currentTime, length || 1)}
              onChange={(event) => player.seek(Number(event.target.value))}
              disabled={!available || length === 0}
              aria-label="Playback position"
              aria-valuetext={length ? `${formatTime(currentTime)} of ${formatTime(length)}` : 'Not available yet'}
              style={{ '--progress': `${progress * 100}%` }}
            />
            <span className="player__time player__time--end">{length ? formatTime(length) : '--:--'}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

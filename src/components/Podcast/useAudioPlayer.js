import { useCallback, useEffect, useRef, useState } from 'react';

const IDLE = { playing: false, currentTime: 0, duration: 0 };

// Drives an <audio> element: spread `audioProps` onto it and use the returned
// state and actions for the controls. With no `src` the player is simply
// unavailable; nothing is loaded and nothing plays on its own.
export default function useAudioPlayer(src) {
  const audioRef = useRef(null);
  const playOnLoad = useRef(false);
  const [state, setState] = useState(IDLE);

  // A new source starts from zero, and plays straight away only when the
  // listener asked for it by pressing play on another episode.
  useEffect(() => {
    setState(IDLE);
    const audio = audioRef.current;
    if (audio && src && playOnLoad.current) audio.play().catch(() => {});
    playOnLoad.current = false;
  }, [src]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  }, []);

  const seek = useCallback((seconds) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = seconds;
    setState((prev) => ({ ...prev, currentTime: seconds }));
  }, []);

  // Call just before switching to another episode's source.
  const playNextSource = useCallback(() => {
    playOnLoad.current = true;
  }, []);

  const readDuration = (event) => {
    const { duration } = event.currentTarget;
    setState((prev) => ({ ...prev, duration: Number.isFinite(duration) ? duration : 0 }));
  };

  const audioProps = {
    ref: audioRef,
    src: src || undefined,
    preload: 'none',
    onPlay: () => setState((prev) => ({ ...prev, playing: true })),
    onPause: () => setState((prev) => ({ ...prev, playing: false })),
    onEnded: () => setState((prev) => ({ ...prev, playing: false })),
    onTimeUpdate: (event) => {
      const { currentTime } = event.currentTarget;
      setState((prev) => ({ ...prev, currentTime }));
    },
    onLoadedMetadata: readDuration,
    onDurationChange: readDuration,
  };

  return { available: Boolean(src), audioProps, ...state, toggle, seek, playNextSource };
}

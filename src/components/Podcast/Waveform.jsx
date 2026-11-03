// A decorative waveform: a fixed, symmetrical burst of bars. It is not drawn
// from the audio itself; `progress` (0 to 1) only tints the bars already played.
function barHeights(count) {
  return Array.from({ length: count }, (_, index) => {
    const position = index / (count - 1);
    const envelope = Math.sin(Math.PI * position) ** 0.7;
    const ripple = 0.5 + 0.5 * Math.abs(Math.sin(index * 1.9) * Math.cos(index * 0.53));
    return Math.max(0.1, envelope * ripple);
  });
}

export default function Waveform({ bars = 56, progress = 0, className = '' }) {
  const played = Math.round(progress * bars);

  return (
    <span className={`waveform ${className}`.trim()} aria-hidden="true">
      {barHeights(bars).map((height, index) => (
        <span
          key={index}
          className="waveform__bar"
          data-played={index < played || undefined}
          style={{ '--bar': height.toFixed(3) }}
        />
      ))}
    </span>
  );
}

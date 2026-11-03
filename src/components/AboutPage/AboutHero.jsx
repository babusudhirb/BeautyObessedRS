import { useEffect, useState } from 'react';
import { ArrowRight, Feather, Heart, Pause, Play, Users } from 'lucide-react';
import Picture from '../ui/Picture.jsx';
import SmartLink from '../ui/SmartLink.jsx';
import { Branch, Spray } from './Botanical.jsx';
import { hero, heroSequence } from '../../data/aboutPage.js';

const VALUE_ICONS = { guidance: Feather, people: Users, confidence: Heart };

// The panel's curved right edge (and, on narrow screens, its wavy top), in
// 0–1 units of the panel's own box so they scale with it. The gold lines
// beside them trace the same curves.
const CURVE_X = 'M0,0 H0.93 C0.80,0.22 1,0.5 0.9,0.74 C0.85,0.87 0.85,0.95 0.87,1 H0 Z';
const EDGE_X = 'M0.96,0 C0.83,0.22 1.03,0.5 0.93,0.74 C0.88,0.87 0.88,0.95 0.9,1';
const CURVE_Y = 'M0,0.07 C0.22,0.01 0.48,0.1 0.74,0.04 C0.86,0.015 0.95,0.02 1,0.04 V1 H0 Z';
const EDGE_Y = 'M0,0.045 C0.22,-0.015 0.48,0.075 0.74,0.015 C0.86,-0.01 0.95,-0.005 1,0.015';

function usePrefersReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)';
  const [reduced, setReduced] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setReduced(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

function usePageVisible() {
  const [visible, setVisible] = useState(() => document.visibilityState !== 'hidden');
  useEffect(() => {
    const onChange = () => setVisible(document.visibilityState !== 'hidden');
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);
  return visible;
}

// Three photographs that crossfade behind fixed text. The sequence advances
// on its own unless the visitor pauses it, the tab is hidden, or the system
// asks for reduced motion (then it only changes when a dot is chosen).
function HeroSequence() {
  const { slides, holdMs, transitionMs, captionDelayMs } = heroSequence;
  const reduced = usePrefersReducedMotion();
  const visible = usePageVisible();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const auto = playing && visible && !reduced;

  useEffect(() => {
    if (!auto) return undefined;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % slides.length), holdMs + transitionMs);
    return () => window.clearTimeout(timer);
  }, [auto, index, holdMs, transitionMs, slides.length]);

  return (
    <>
      <div
        className="ab-hero__media"
        style={{
          '--ab-fade': `${reduced ? 0 : transitionMs}ms`,
          '--ab-caption-delay': `${reduced ? 0 : captionDelayMs}ms`,
        }}
      >
        {slides.map((slide, i) => (
          <figure key={slide.id} className="ab-hero__slide" data-active={i === index} aria-hidden={i !== index}>
            <Picture
              name={slide.image}
              alt={slide.alt}
              sizes="(min-width: 900px) 64vw, 100vw"
              priority={i === 0}
              style={{ '--ab-focus': slide.focus, '--ab-focus-m': slide.focusMobile }}
            />
            <figcaption className="ab-hero__caption">{slide.caption}</figcaption>
          </figure>
        ))}
      </div>

      <div className="ab-hero__controls" role="group" aria-label="Hero photographs">
        {!reduced && (
          <button
            type="button"
            className="ab-hero__toggle"
            onClick={() => setPlaying((current) => !current)}
            aria-label={playing ? 'Pause the photographs' : 'Play the photographs'}
          >
            {playing ? <Pause size={14} strokeWidth={2.4} aria-hidden="true" /> : <Play size={14} strokeWidth={2.4} aria-hidden="true" />}
          </button>
        )}
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            className="ab-hero__dot"
            onClick={() => setIndex(i)}
            aria-label={`${slide.label}, ${i + 1} of ${slides.length}`}
            aria-current={i === index ? 'true' : undefined}
          />
        ))}
      </div>
    </>
  );
}

// The text sits in the page container, so it lines up with the navbar and
// the sections below; the curved wine panel and its gold lines are a
// decorative layer behind it.
export default function AboutHero() {
  return (
    <section className="ab-hero" aria-labelledby="ab-hero-title">
      <svg className="ab-defs" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="ab-curve-x" clipPathUnits="objectBoundingBox">
            <path d={CURVE_X} />
          </clipPath>
          <clipPath id="ab-curve-y" clipPathUnits="objectBoundingBox">
            <path d={CURVE_Y} />
          </clipPath>
        </defs>
      </svg>

      <div className="ab-container ab-hero__inner">
        <div className="ab-hero__copy">
          <p className="ab-eyebrow ab-eyebrow--gold">{hero.eyebrow}</p>
          <h1 className="ab-hero__title" id="ab-hero-title">
            <span>{hero.title[0]}</span> <em>{hero.title[1]}</em>
          </h1>
          <span className="ab-hero__rule" aria-hidden="true" />
          <p className="ab-hero__text">{hero.copy}</p>
          <div className="ab-hero__actions">
            <SmartLink to={hero.primary.to} className="ab-btn ab-btn--gold">
              <span>{hero.primary.label}</span>
              <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" />
            </SmartLink>
            <SmartLink to={hero.secondary.to} className="ab-btn ab-btn--outline">
              <span>{hero.secondary.label}</span>
            </SmartLink>
          </div>
          <ul className="ab-hero__values">
            {hero.values.map((value) => {
              const Icon = VALUE_ICONS[value.icon];
              return (
                <li key={value.label}>
                  <Icon size={24} strokeWidth={1.3} aria-hidden="true" />
                  {value.label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <HeroSequence />

      {/* The panel is clipped to its curve; the gold lines beside it are not. */}
      <div className="ab-hero__body" aria-hidden="true">
        <div className="ab-hero__panel">
          <Branch className="ab-hero__branch" />
          <Spray className="ab-hero__spray" />
        </div>
        <svg className="ab-hero__edge ab-hero__edge--x" viewBox="0 0 1 1" preserveAspectRatio="none" focusable="false">
          <path d={EDGE_X} vectorEffect="non-scaling-stroke" />
        </svg>
        <svg className="ab-hero__edge ab-hero__edge--y" viewBox="0 0 1 1" preserveAspectRatio="none" focusable="false">
          <path d={EDGE_Y} vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </section>
  );
}

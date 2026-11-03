import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { computeHeroLayout } from './heroLayout.js';
import HeroTitle from './HeroTitle.jsx';
import HeroPortrait from './HeroPortrait.jsx';
import HeroSalon from './HeroSalon.jsx';
import HeroEbook from './HeroEbook.jsx';
import './Hero.css';

// One collage panel: an absolutely positioned box whose inner layer is
// clipped to the panel's rounded, diagonal outline.
function HeroPanel({ name, panel, children }) {
  return (
    <div className={`hero-panel hero-panel--${name}`} style={panel?.box}>
      <div className="hero-panel__shape" style={panel ? { clipPath: panel.clipPath } : undefined}>
        {children}
      </div>
    </div>
  );
}

export default function Hero() {
  const stageRef = useRef(null);
  const titleRef = useRef(null);
  const probeRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0, titleHeight: 0, available: 0 });

  const measure = useCallback(() => {
    const stage = stageRef.current;
    const title = titleRef.current;
    const probe = probeRef.current;
    if (!stage || !title || !probe) return;

    const { width, height } = stage.getBoundingClientRect();
    const next = { width, height, titleHeight: title.offsetHeight, available: probe.offsetHeight };

    setSize((prev) => (Object.keys(next).every((key) => prev[key] === next[key]) ? prev : next));
  }, []);

  const layout = useMemo(() => computeHeroLayout(size), [size]);

  // Measure before the first paint, then follow the stage, the title copy
  // (which reflows when fonts load) and the viewport height.
  useLayoutEffect(() => {
    measure();

    let frame = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    });
    observer.observe(stageRef.current);
    observer.observe(titleRef.current);
    observer.observe(probeRef.current);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [measure]);

  // These values feed back into the layout through CSS, so measure again in
  // the same frame whenever they change.
  useLayoutEffect(measure, [measure, layout?.minHeight, layout?.maxHeight, layout?.fitHeight]);

  const stageStyle = layout
    ? {
        '--hero-min': `${layout.minHeight}px`,
        '--hero-max': `${layout.maxHeight}px`,
        '--hero-fit': `${layout.fitHeight}px`,
      }
    : undefined;

  return (
    <section className="hero" id="top" aria-label="Introduction">
      <div
        ref={stageRef}
        className="hero__stage container-wide"
        data-ready={layout ? '' : undefined}
        data-layout={layout?.mode}
        style={stageStyle}
      >
        <div ref={probeRef} className="hero__probe" aria-hidden="true" />

        <HeroPanel name="title" panel={layout?.panels.title}>
          <HeroTitle contentRef={titleRef} />
        </HeroPanel>
        <HeroPanel name="portrait" panel={layout?.panels.portrait}>
          <HeroPortrait />
        </HeroPanel>
        <HeroPanel name="salon" panel={layout?.panels.salon}>
          <HeroSalon />
        </HeroPanel>
        <HeroPanel name="ebook" panel={layout?.panels.ebook}>
          <HeroEbook />
        </HeroPanel>
      </div>
    </section>
  );
}

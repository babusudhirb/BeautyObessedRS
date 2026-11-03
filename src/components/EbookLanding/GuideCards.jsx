import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../ui/Button.jsx';
import Picture from '../ui/Picture.jsx';
import { guides } from '../../data/ebooks.js';
import { CheckList, SectionHead } from './parts.jsx';

// Tracks whether a horizontally scrolling list can move further either way,
// and scrolls it one card at a time.
function useCardScroller() {
  const ref = useRef(null);
  const [atEdge, setAtEdge] = useState({ start: true, end: true });

  const update = useCallback(() => {
    const list = ref.current;
    if (!list) return;
    const max = list.scrollWidth - list.clientWidth;
    const next = { start: list.scrollLeft <= 2, end: list.scrollLeft >= max - 2 };
    setAtEdge((prev) => (prev.start === next.start && prev.end === next.end ? prev : next));
  }, []);

  useEffect(() => {
    const list = ref.current;
    update();

    const observer = new ResizeObserver(update);
    observer.observe(list);
    list.addEventListener('scroll', update, { passive: true });

    return () => {
      observer.disconnect();
      list.removeEventListener('scroll', update);
    };
  }, [update]);

  const scrollByCard = (direction) => {
    const list = ref.current;
    const card = list.firstElementChild;
    const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
    const step = card ? card.getBoundingClientRect().width + gap : list.clientWidth;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    list.scrollBy({ left: direction * step, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return { ref, atEdge, scrollByCard };
}

// "Choose your guide": one card per e-book. The cards sit three across on wide
// screens and become a swipeable row on narrow ones, where the arrow buttons
// step through them. Each arrow is disabled when there is nothing further that way.
export default function GuideCards() {
  const { ref, atEdge, scrollByCard } = useCardScroller();

  return (
    <section className="ebk-section" id="guides" aria-labelledby="guides-title">
      <div className="ebk-container">
        <SectionHead
          title="Choose your guide"
          titleId="guides-title"
          aside="Expert knowledge for your unique beauty journey."
        >
          <div className="ebk-arrows">
            <button type="button" aria-label="Previous guide" disabled={atEdge.start} onClick={() => scrollByCard(-1)}>
              <ChevronLeft size={16} strokeWidth={2.6} aria-hidden="true" />
            </button>
            <button type="button" aria-label="Next guide" disabled={atEdge.end} onClick={() => scrollByCard(1)}>
              <ChevronRight size={16} strokeWidth={2.6} aria-hidden="true" />
            </button>
          </div>
        </SectionHead>

        <ul className="ebk-guides" ref={ref}>
          {guides.map((guide) => (
            <li key={guide.id} className="guide card">
              {/* The covers are upright photographs in a wide frame, so a blurred
                  copy of the same photograph fills the space on either side. */}
              <div className="guide__media">
                <Picture name={guide.image} className="guide__backdrop" alt="" sizes="200px" aria-hidden="true" />
                <Picture name={guide.image} className="guide__cover" alt={guide.alt} sizes="230px" />
                {guide.badge && <span className="guide__badge">{guide.badge}</span>}
              </div>

              <div className="guide__body">
                <h3 className="guide__title">{guide.title}</h3>
                <p className="guide__copy">{guide.copy}</p>
                <CheckList items={guide.points} />
                <Button to={guide.to} block aria-label={`Buy Now: ${guide.title}`}>
                  Buy Now
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

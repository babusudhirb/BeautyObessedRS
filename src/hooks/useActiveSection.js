import { useEffect, useState } from 'react';

// Returns the id of the section the reader is currently in: the last of `ids`
// whose top has passed a line 35% down the viewport. Sections that start at
// the same height (side-by-side cards) resolve to the first one listed.
export default function useActiveSection(ids, enabled = true) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join('|');

  useEffect(() => {
    if (!enabled) return undefined;

    const sectionIds = key.split('|');
    let frame = 0;

    const update = () => {
      const line = window.innerHeight * 0.35;
      let current = sectionIds[0];
      let currentTop = -Infinity;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;
        const { top } = element.getBoundingClientRect();
        if (top <= line && top > currentTop + 40) {
          current = id;
          currentTop = top;
        }
      }

      setActive(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [key, enabled]);

  return active;
}

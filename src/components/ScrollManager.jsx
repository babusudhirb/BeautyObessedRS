import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scrolls to the section named in the URL hash (e.g. /#ebook) after a
// navigation, or back to the top when a new page opens without one.
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return undefined;
    }

    // Wait a frame so the destination page has rendered its sections.
    const frame = requestAnimationFrame(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ block: 'start' });
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);

  return null;
}

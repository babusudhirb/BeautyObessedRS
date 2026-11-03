import { useEffect } from 'react';

// Keeps the description meta tag in index.html in step with the current page.
export default function useMetaDescription(content) {
  useEffect(() => {
    const tag = document.querySelector('meta[name="description"]');
    if (!tag) return undefined;
    const previous = tag.getAttribute('content');
    tag.setAttribute('content', content);
    return () => tag.setAttribute('content', previous);
  }, [content]);
}

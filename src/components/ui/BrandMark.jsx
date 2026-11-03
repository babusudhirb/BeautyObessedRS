import { Link } from 'react-router-dom';
import { brand } from '../../data/site.js';
import './BrandMark.css';

// The RS Beauty brand mark: an upright R interlocked with an italic S, a gold
// hairline, then "Beauty" in italics. It is set in the site's own Fraunces,
// so it needs no image or extra font, and always links to the homepage.
export default function BrandMark({ className = '' }) {
  return (
    <Link to="/" className={`brandmark ${className}`.trim()} aria-label={`${brand.name}, home`}>
      <span className="brandmark__mono" aria-hidden="true">
        <span className="brandmark__r">R</span>
        <span className="brandmark__s">S</span>
      </span>
      <span className="brandmark__word" aria-hidden="true">
        Beauty
      </span>
    </Link>
  );
}

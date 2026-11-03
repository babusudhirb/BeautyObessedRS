import ArrowLink from '../ui/ArrowLink.jsx';
import Picture from '../ui/Picture.jsx';
import { salon } from '../../data/site.js';
import HeroPodcastInset from './HeroPodcastInset.jsx';

// Lower-left panel: the salon interior with its label and the podcast inset.
export default function HeroSalon() {
  return (
    <div className="hero-salon">
      <Picture
        name="hero-salon"
        className="hero-salon__img"
        alt="Inside XING Hair & Skin: a row of styling chairs facing illuminated arched mirrors"
        sizes="(min-width: 966px) 66vw, 94vw"
        loading="eager"
      />

      <div className="hero-salon__label">
        <h2 className="hero-salon__name">XING HAIR &amp; SKIN</h2>
        {/* Non-breaking spaces keep "at our salon." together when the line wraps. */}
        <p className="hero-salon__copy">Premium beauty services at&nbsp;our&nbsp;salon.</p>
        <ArrowLink to={salon.to}>Know more</ArrowLink>
      </div>

      <HeroPodcastInset />
    </div>
  );
}

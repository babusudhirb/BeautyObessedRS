import Picture, { srcSetFor } from '../ui/Picture.jsx';
import './PageHero.css';

// Opening section for the podcast and shop pages. Both supplied photographs
// leave a cream curve on their left, so on wide screens the photograph fills
// the whole hero and the copy sits in that curve. Narrower screens put the
// photograph beside (tablet) or below (phone) the copy instead.
//
// `focus` is the photograph's CSS object-position when it is cropped to the
// subject on narrower screens; `extra` renders over the photograph.
// `mobileImage` is an optional phone-shaped photograph used below 700px wide.
export default function PageHero({ image, mobileImage, alt, focus = '78% 40%', labelledBy, className = '', extra = null, children }) {
  return (
    <section className={`phero ${className}`.trim()} aria-labelledby={labelledBy}>
      <div className="phero__media" style={{ '--phero-focus': focus }}>
        <picture>
          {mobileImage && <source media="(max-width: 699.98px)" srcSet={srcSetFor(mobileImage)} sizes="42vw" />}
          <Picture name={image} alt={alt} sizes="(min-width: 1100px) 100vw, (min-width: 700px) 50vw, 100vw" priority />
        </picture>
        {extra}
      </div>
      <div className="phero__inner ebk-container">
        <div className="phero__copy">{children}</div>
      </div>
    </section>
  );
}

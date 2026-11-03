import { Gift } from 'lucide-react';
import Button from '../ui/Button.jsx';
import Picture from '../ui/Picture.jsx';
import { bundle, hero } from '../../data/ebooks.js';
import { ICONS, Lines } from './parts.jsx';

// Opening section: the collection's pitch on the left and the three books on
// the right, with the author's photograph bridging the two.
export default function EbookHero() {
  return (
    <section className="ebk-hero" aria-labelledby="ebook-hero-title">
      <div className="ebk-container ebk-hero__grid">
        <div className="ebk-hero__panel">
          <div className="ebk-hero__copy">
            <p className="eyebrow">{hero.eyebrow}</p>

            <h1 className="ebk-hero__title" id="ebook-hero-title">
              <span className="ebk-hero__line">Beauty guides for</span>{' '}
              <span className="ebk-hero__line">your skin, hair &amp;</span>{' '}
              <em className="ebk-hero__line">everyday glow.</em>
            </h1>

            <p className="ebk-hero__text">{hero.copy}</p>

            <div className="ebk-hero__actions">
              <Button to="/ebook#guides">Explore E-books</Button>
              <Button to="/ebook#bundle" variant="secondary" arrow={false}>
                Get the Bundle
              </Button>
            </div>

            <ul className="ebk-hero__benefits">
              {hero.benefits.map((benefit) => {
                const Icon = ICONS[benefit.icon];
                return (
                  <li key={benefit.icon} className="ebk-benefit">
                    <Icon size={34} strokeWidth={1.3} aria-hidden="true" />
                    <span>
                      <Lines lines={benefit.lines} />
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <figure className="ebk-hero__author">
            <Picture
              name="ebook-author-reading"
              alt="Rachna reading one of her beauty guides"
              sizes="(min-width: 920px) 19vw, (min-width: 640px) 31vw, 92vw"
              loading="eager"
            />
            <figcaption>
              <strong>{hero.author.title}</strong>
              <span>{hero.author.detail}</span>
            </figcaption>
          </figure>
        </div>

        <div className="ebk-hero__books">
          <Picture
            name="ebook-hero-books"
            alt="Three hardback covers standing side by side: Skincare Guide, Beauty Daily Routine and Haircare Guide"
            sizes="(min-width: 920px) 49vw, 94vw"
            priority
          />
        </div>

        <div className="ebk-hero__strip">
          <Gift className="ebk-hero__gift" size={40} strokeWidth={1.3} aria-hidden="true" />
          <p className="ebk-hero__strip-text">
            <strong>{bundle.name}</strong>
            <span>{bundle.summary}</span>
          </p>
          <Button to={bundle.to} variant="honey">
            Buy the Bundle
          </Button>
        </div>
      </div>
    </section>
  );
}

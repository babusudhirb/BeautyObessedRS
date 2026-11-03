import { Gift } from 'lucide-react';
import Picture from '../ui/Picture.jsx';
import { bonuses, insideFeatures } from '../../data/ebooks.js';
import { ICONS, Lines, SectionHead } from './parts.jsx';
import SampleChapterForm from './SampleChapterForm.jsx';

// "Inside every e-book": a look at the pages, what each guide contains, the
// free sample chapter and the bonuses.
export default function InsideEbook() {
  return (
    <section className="ebk-section" id="inside" aria-labelledby="inside-title">
      <div className="ebk-container">
        <SectionHead
          inline
          title="Inside every e-book"
          titleId="inside-title"
          aside="Beautifully designed, practical and easy to follow."
        />

        <div className="inside">
          <div className="inside__spread">
            <Picture
              name="ebook-inside-spread"
              alt="An open e-book: “Your Daily Skincare Routine” on the left-hand page and “Step 1: Cleanse” on the right"
              sizes="(min-width: 900px) 48vw, 94vw"
            />
          </div>

          <ul className="inside__features">
            {insideFeatures.map((feature) => {
              const Icon = ICONS[feature.icon];
              return (
                <li key={feature.icon} className="card feature">
                  <Icon size={38} strokeWidth={1.3} aria-hidden="true" />
                  <h3 className="feature__title">
                    <Lines lines={feature.title} />
                  </h3>
                  <p className="feature__copy">
                    <Lines lines={feature.copy} />
                  </p>
                </li>
              );
            })}
          </ul>

          <SampleChapterForm />

          <div className="card bonuses">
            <Gift className="bonuses__icon" size={46} strokeWidth={1.2} aria-hidden="true" />
            <div>
              <h3 className="ebk-card-title">Exclusive bonuses with your e-book</h3>
              <p className="ebk-card-copy">Useful resources to make your beauty journey easier.</p>
            </div>

            <ul className="bonuses__list">
              {bonuses.map((bonus) => {
                const Icon = ICONS[bonus.icon];
                return (
                  <li key={bonus.icon}>
                    <Icon size={30} strokeWidth={1.4} aria-hidden="true" />
                    <span>
                      <Lines lines={bonus.lines} />
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

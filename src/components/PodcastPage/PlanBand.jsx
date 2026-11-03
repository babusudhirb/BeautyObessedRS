import Button from '../ui/Button.jsx';
import Picture from '../ui/Picture.jsx';
import { PAGE_ICONS } from '../PageHero/icons.js';
import { Lines } from '../EbookLanding/parts.jsx';
import { planBand } from '../../data/podcastPage.js';

// Pointer to the Beauty Plan, using its existing free-trial call to action.
export default function PlanBand() {
  return (
    <section className="ebk-section" aria-labelledby="pod-plan-title">
      <div className="ebk-container pod-plan">
        <Picture name="beauty-plan-phone" className="pod-plan__img" alt="" sizes="(min-width: 1100px) 32vw, 94vw" />
        <div className="pod-plan__text">
          <h2 className="heading pod-plan__title" id="pod-plan-title">
            {planBand.title}
          </h2>
          <p className="pod-plan__copy">{planBand.copy}</p>
          <Button to={planBand.cta.to}>{planBand.cta.label}</Button>
        </div>
        <ul className="pod-plan__points">
          {planBand.points.map((point) => {
            const Icon = PAGE_ICONS[point.icon];
            return (
              <li key={point.icon}>
                <span className="pod-plan__icon" aria-hidden="true">
                  <Icon size={26} strokeWidth={1.4} />
                </span>
                <span>
                  <Lines lines={point.lines} />
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

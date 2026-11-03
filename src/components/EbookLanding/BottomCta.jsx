import Button from '../ui/Button.jsx';
import { closing } from '../../data/ebooks.js';
import { ICONS } from './parts.jsx';

// Closing wine strip: one line, one button and the three purchase reassurances.
export default function BottomCta() {
  return (
    <section className="ebk-cta" aria-labelledby="ebook-cta-title">
      <div className="container ebk-cta__inner">
        <h2 className="ebk-cta__title" id="ebook-cta-title">
          {closing.title}
        </h2>

        <div className="ebk-cta__side">
          <Button to={closing.cta.to} variant="light">
            {closing.cta.label}
          </Button>
          <ul className="ebk-cta__trust">
            {closing.trust.map((item) => {
              const Icon = ICONS[item.icon];
              return (
                <li key={item.icon}>
                  <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

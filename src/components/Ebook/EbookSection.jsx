import { useRef, useState } from 'react';
import { CalendarDays, Flower2, Heart, Sparkles } from 'lucide-react';
import ArrowLink from '../ui/ArrowLink.jsx';
import Button from '../ui/Button.jsx';
import Picture from '../ui/Picture.jsx';
import { ebook } from '../../data/content.js';
import './Ebook.css';

const BENEFIT_ICONS = {
  lotus: Flower2,
  calendar: CalendarDays,
  sparkles: Sparkles,
  heart: Heart,
};

// Full-width e-book section: copy on the left, the book in the middle and a
// "What you'll find inside" list on the right. On narrow screens the same
// blocks stack as heading, book, benefits, contents.
export default function EbookSection() {
  const insideRef = useRef(null);
  const [highlighted, setHighlighted] = useState(false);

  // "See what's inside" brings the contents list into view and pulses it once.
  // On wide screens the list is already beside the link, so the pulse is what
  // shows where to look.
  const showInside = (event) => {
    event.preventDefault();
    insideRef.current?.scrollIntoView({ block: 'center' });
    setHighlighted(true);
  };

  return (
    <section className="section ebook" id="ebook" aria-labelledby="ebook-title">
      <div className="ebook__panel container-wide">
        <div className="ebook__inner">
          <header className="ebook__head">
            <p className="eyebrow">{ebook.label}</p>
            <h2 className="heading ebook__title" id="ebook-title">
              The Beauty Obsessed <br />
              E-book
            </h2>
            <p className="ebook__copy">{ebook.copy}</p>
          </header>

          <div className="ebook__visual">
            <Picture
              name="ebook-product"
              className="ebook__img"
              alt="The Beauty Daily Routine e-book by Rachna: a hardback with her portrait on a wine cover, beside a tablet edition"
              sizes="(min-width: 1200px) 56vw, (min-width: 700px) 80vw, 92vw"
            />
          </div>

          <div className="ebook__body">
            <ul className="ebook__benefits">
              {ebook.benefits.map((benefit) => {
                const Icon = BENEFIT_ICONS[benefit.icon];
                return (
                  <li key={benefit.text}>
                    <span className="ebook__benefit-icon" aria-hidden="true">
                      <Icon size={18} strokeWidth={1.7} />
                    </span>
                    {benefit.text}
                  </li>
                );
              })}
            </ul>

            <div className="ebook__actions">
              <Button to="/ebook" size="lg">
                Buy the E-book
              </Button>
              <ArrowLink to="/#ebook-inside" className="ebook__more" onClick={showInside}>
                See what&rsquo;s inside
              </ArrowLink>
            </div>
          </div>

          <div className="ebook__inside" id="ebook-inside" ref={insideRef}>
            <h3 className="ebook__inside-title">What you&rsquo;ll find inside</h3>
            <ul
              className="ebook__inside-list"
              data-highlighted={highlighted || undefined}
              onAnimationEnd={() => setHighlighted(false)}
            >
              {ebook.inside.map((item) => (
                <li key={item.id} className="inside-card card">
                  <Picture name={item.image} className="inside-card__img" alt="" sizes="76px" />
                  <p className="inside-card__text">
                    {item.lines.map((line) => (
                      <span key={line}>{line} </span>
                    ))}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

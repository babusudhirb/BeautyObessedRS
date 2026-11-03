import { quote } from '../../data/content.js';
import './QuoteBand.css';

// The wording comes from data/content.js. Rachna's name is only attached once
// `quote.approved` is set to true there.
export default function QuoteBand() {
  return (
    <section className="section quote container" aria-label="A thought on beauty">
      <figure className="quote__figure">
        <span className="quote__rule" aria-hidden="true" />
        <div className="quote__content">
          <blockquote className="quote__text">
            <span className="quote__mark" aria-hidden="true">
              &ldquo;
            </span>
            <p>{quote.text}</p>
            <span className="quote__mark" aria-hidden="true">
              &rdquo;
            </span>
          </blockquote>
          {quote.approved && <figcaption className="quote__by">— {quote.attribution}</figcaption>}
        </div>
        <span className="quote__rule" aria-hidden="true" />
      </figure>
    </section>
  );
}

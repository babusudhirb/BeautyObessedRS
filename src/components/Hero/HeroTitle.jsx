import { CirclePlay } from 'lucide-react';
import Button from '../ui/Button.jsx';

// Upper-left panel: eyebrow, headline, supporting copy and the two main actions.
// `contentRef` lets the hero measure how tall the copy is.
export default function HeroTitle({ contentRef }) {
  return (
    <div className="hero-title">
      <div className="hero-title__content" ref={contentRef}>
        <p className="hero-title__eyebrow">Beauty Expert · Salon Founder · Trainer</p>

        <h1 className="hero-title__headline">
          <span className="hero-title__line hero-title__line--accent">Rachna — beauty expert,</span>{' '}
          <span className="hero-title__line">salon founder and your</span>{' '}
          <span className="hero-title__line">personal beauty planner.</span>
        </h1>

        <p className="hero-title__copy">
          What to do today, what to do tomorrow, what to eat, and how far you have come.
        </p>

        <div className="hero-title__actions">
          <Button to="/#beauty-plan">Start Free Trial</Button>
          <Button
            to="/#podcast"
            variant="secondary"
            arrow={false}
            iconLeft={<CirclePlay size={20} strokeWidth={1.9} aria-hidden="true" />}
          >
            Listen to the Podcast
          </Button>
        </div>
      </div>
    </div>
  );
}

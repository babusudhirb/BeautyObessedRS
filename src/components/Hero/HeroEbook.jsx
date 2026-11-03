import Button from '../ui/Button.jsx';
import Picture from '../ui/Picture.jsx';

// Lower-right panel: the e-book on a rose-to-wine ground.
export default function HeroEbook() {
  return (
    <div className="hero-ebook">
      <Picture
        name="hero-book"
        className="hero-ebook__img"
        alt="Beauty Daily Routine by Rachna — a hardback with a black cover and gold lettering"
        sizes="(min-width: 966px) 30vw, 46vw"
        loading="eager"
      />

      <div className="hero-ebook__text">
        <h2 className="hero-ebook__heading">
          <span className="hero-ebook__kicker">The E-book</span>{' '}
          <span className="hero-ebook__title">
            <span>Beauty</span> <span>Daily</span> <span>Routine</span>
          </span>
        </h2>
        <Button to="/#ebook" variant="light" size="sm">
          Buy now
        </Button>
      </div>
    </div>
  );
}

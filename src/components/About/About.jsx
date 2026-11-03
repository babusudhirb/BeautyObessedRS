import Button from '../ui/Button.jsx';
import Picture from '../ui/Picture.jsx';
import { about } from '../../data/content.js';
import './About.css';

export default function About() {
  return (
    <section className="section about container" id="about" aria-labelledby="about-title">
      <h2 className="heading about__heading" id="about-title">
        About Rachna
      </h2>

      <div className="about__grid">
        <Picture
          name="hero-rachna"
          className="about__photo"
          alt="Rachna at the XING Hair & Skin reception desk"
          // The desktop slot is declared wider than it renders so the photograph
          // keeps the sharper file it has always been shown with there.
          sizes="(min-width: 1000px) 49vw, (min-width: 640px) 36vw, 92vw"
        />

        <div className="about__bio">
          <h3 className="about__greeting">{about.greeting}</h3>
          {about.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <Button to="/about" size="sm">
            More about me
          </Button>
        </div>

        <dl className="about__facts">
          {about.facts.map((fact) => (
            <div key={fact.label} className="about__fact">
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

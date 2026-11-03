import ArrowLink from '../ui/ArrowLink.jsx';
import Picture from '../ui/Picture.jsx';
import { quote } from '../../data/content.js';
import { about } from '../../data/ebooks.js';

// About the author: her portrait beside the introduction, with her quote.
export default function AboutRachna() {
  return (
    <section className="ebk-section" id="about-rachna" aria-labelledby="about-rachna-title">
      <div className="ebk-container ebk-about">
        <Picture
          name="home-hero-portrait"
          className="ebk-about__photo"
          alt="Rachna seated at her reception desk, in front of a wall mural that reads “Rachna Sinha, Beauty Obsessed”"
          sizes="(min-width: 900px) 50vw, 92vw"
        />

        <div className="ebk-about__text">
          <h2 className="heading ebk-about__title" id="about-rachna-title">
            {about.title}
          </h2>
          <p className="ebk-about__bio">{about.bio}</p>
          <ArrowLink to={about.link.to}>{about.link.label}</ArrowLink>

          <figure className="ebk-quote">
            <blockquote>
              <p>{quote.text}</p>
            </blockquote>
            <figcaption>— {quote.attribution}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

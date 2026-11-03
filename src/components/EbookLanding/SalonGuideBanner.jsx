import Button from '../ui/Button.jsx';
import Picture from '../ui/Picture.jsx';
import { salonGuide } from '../../data/ebooks.js';
import { CheckList } from './parts.jsx';

// Salon Expert Guide: the dark right panel of the feature stage. The book is
// the photograph from the supplied banner artwork; the words and the button
// are real text and a real link (see scripts/optimize-images.mjs).
export default function SalonGuideBanner() {
  return (
    <section className="stage__panel stage__panel--salon" aria-labelledby="salon-title">
      <p className="salon__eyebrow">{salonGuide.eyebrow}</p>
      <h2 className="salon__title" id="salon-title">
        {salonGuide.title}
      </h2>

      <div className="salon__book">
        <Picture
          name="ebook-salon-book"
          alt="Salon Expert Guide by Rachna: a black hardback with gold lettering, standing on a salon counter"
          sizes="520px"
        />
      </div>

      <p className="salon__copy">{salonGuide.copy}</p>
      <CheckList items={salonGuide.points} />
      <Button to={salonGuide.cta.to} variant="honey">
        {salonGuide.cta.label}
      </Button>
    </section>
  );
}

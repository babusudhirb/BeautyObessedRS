import { Star } from 'lucide-react';
import { testimonials } from '../../data/ebooks.js';

// "What readers say". The entries come from data/ebooks.js, where each one is
// flagged until it has been confirmed as a real reader's words.
export default function Testimonials() {
  return (
    <section className="ebk-section ebk-section--tight" aria-labelledby="reviews-title">
      <div className="ebk-container">
        <h2 className="ebk-card-title ebk-reviews__title" id="reviews-title">
          What readers say
        </h2>

        <ul className="ebk-reviews">
          {testimonials.map((review) => (
            <li key={review.id} className="card review">
              <figure>
                <p className="review__stars" role="img" aria-label={`Rated ${review.rating} out of 5`}>
                  {Array.from({ length: review.rating }, (_, index) => (
                    <Star key={index} size={14} strokeWidth={0} fill="currentColor" aria-hidden="true" />
                  ))}
                </p>
                <blockquote className="review__quote">
                  <p>&ldquo;{review.quote}&rdquo;</p>
                </blockquote>
                <figcaption className="review__name">{review.name}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

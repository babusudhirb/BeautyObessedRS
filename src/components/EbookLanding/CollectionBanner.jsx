import { Gift } from 'lucide-react';
import Button from '../ui/Button.jsx';
import Picture from '../ui/Picture.jsx';
import { bundle, collection } from '../../data/ebooks.js';
import { CheckList } from './parts.jsx';

// The Complete Collection: all three e-books as one bundle.
export default function CollectionBanner() {
  return (
    <section className="ebk-section ebk-section--tight" id="bundle" aria-labelledby="bundle-title">
      <div className="ebk-container">
        <div className="bundle">
          <div className="bundle__visual">
            <Picture
              name="ebook-collection"
              alt="Beauty Daily Routine, Skincare Guide and Haircare Guide standing together beside pink flowers"
              sizes="(min-width: 900px) 38vw, 94vw"
            />
          </div>

          <div className="bundle__text">
            <p className="bundle__tag">{collection.tag}</p>
            <h2 className="heading bundle__title" id="bundle-title">
              Save with the <br />
              Complete Collection
            </h2>
            <p className="bundle__copy">{collection.copy}</p>
            <Button to={bundle.to}>Buy the Bundle</Button>
          </div>

          <div className="bundle__includes">
            <CheckList items={collection.includes} />
            <p className="bundle__note">
              <Gift size={40} strokeWidth={1.3} aria-hidden="true" />
              <span>{collection.note}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

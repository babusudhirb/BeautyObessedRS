import Button from '../ui/Button.jsx';
import Picture from '../ui/Picture.jsx';
import SectionHeader from '../ui/SectionHeader.jsx';
import { products } from '../../data/content.js';
import './Retail.css';

// Shows only what is real. A product name, price or Shop button appears once
// the matching field is filled in data/content.js; nothing is invented.
function ProductCard({ product }) {
  const { category, name, price, shopUrl } = product;

  return (
    <li className="product card">
      <Picture
        name={product.image}
        className="product__img"
        alt={product.alt}
        sizes="(min-width: 900px) 22vw, 46vw"
      />

      <div className="product__body">
        {name && <p className="product__category">{category}</p>}
        <h3 className="product__name">{name ?? category}</h3>

        {price || shopUrl ? (
          <div className="product__footer">
            {price && <p className="product__price">{price}</p>}
            {shopUrl && (
              <Button to={shopUrl} size="sm" className="product__shop">
                Shop
              </Button>
            )}
          </div>
        ) : (
          <p className="product__pending">Product details coming soon</p>
        )}
      </div>
    </li>
  );
}

export default function Retail() {
  return (
    <section className="section retail container" id="retail" aria-labelledby="retail-title">
      <SectionHeader
        title="Rachna’s picks"
        titleId="retail-title"
        subtitle="Products I genuinely love and recommend."
        action={{ label: 'Visit the shop', to: '/shop' }}
      />

      <ul className="retail__grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </section>
  );
}

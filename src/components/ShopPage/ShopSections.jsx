import { useId } from 'react';
import ArrowLink from '../ui/ArrowLink.jsx';
import Button from '../ui/Button.jsx';
import Picture from '../ui/Picture.jsx';
import PageHero from '../PageHero/PageHero.jsx';
import { PAGE_ICONS } from '../PageHero/icons.js';
import { Lines, SectionHead } from '../EbookLanding/parts.jsx';
import useEmailSignup from '../../hooks/useEmailSignup.js';
import { newsletterEndpoint } from '../../data/site.js';
import { categories, collections, hero, meet, newsletter, standard } from '../../data/shop.js';

export function ShopHero() {
  return (
    <PageHero
      image="retail-hero"
      mobileImage="shop-hero-mobile"
      alt="Rachna’s collection on a marble counter: face cleanser, nourishing shampoo, face serum, moisturising cream, hair growth oil and body lotion"
      focus="92% 55%"
      labelledBy="shop-hero-title"
      className="shop-hero"
    >
      <p className="eyebrow">{hero.eyebrow}</p>
      <h1 className="phero__title" id="shop-hero-title">
        {hero.title[0]} <br />
        {hero.title[1]}
      </h1>
      <p className="phero__text">{hero.copy}</p>
      <div className="phero__actions">
        <Button to={hero.cta.to}>{hero.cta.label}</Button>
      </div>
      <ul className="phero__points">
        {hero.benefits.map((benefit) => {
          const Icon = PAGE_ICONS[benefit.icon];
          return (
            <li key={benefit.icon} className="phero__point">
              <Icon size={30} strokeWidth={1.3} aria-hidden="true" />
              <span>
                <Lines lines={benefit.lines} />
              </span>
            </li>
          );
        })}
      </ul>
    </PageHero>
  );
}

export function CategoryGrid() {
  return (
    <section className="ebk-container shop-cats" id="categories" aria-labelledby="shop-cats-title">
      <SectionHead title="Shop by Category" titleId="shop-cats-title" />
      <ul className="shop-cats__grid">
        {categories.map((category) => (
          <li key={category.id} className="card shop-cat">
            {/* The categories start on the first screen, just below the hero. */}
            <Picture name={category.image} className="shop-cat__img" alt="" sizes="(min-width: 1100px) 23vw, (min-width: 700px) 46vw, 46vw" style={{ objectPosition: category.focus }} loading="eager" />
            <div className="shop-cat__body">
              <h3 className="shop-cat__title">{category.title}</h3>
              <p className="shop-cat__copy">{category.copy}</p>
              <ArrowLink to={category.to} aria-label={`Explore category: ${category.title}`}>
                Explore category
              </ArrowLink>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProductCard({ product, label }) {
  return (
    <li className="card product-card">
      <Picture name={product.image} className="product-card__img" alt={`${product.name} by Rachna`} sizes="(min-width: 1100px) 17vw, (min-width: 700px) 30vw, 46vw" style={{ objectPosition: product.focus }} />
      <div className="product-card__body">
        <p className="product-card__label">{label}</p>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__copy">{product.copy}</p>
        <ArrowLink to={product.to} aria-label={`View Product: ${product.name}`}>
          View Product
        </ArrowLink>
      </div>
    </li>
  );
}

// One collection: an introduction panel that runs to the page's left edge,
// then its four products.
export function Collection({ id }) {
  const collection = collections.find((item) => item.id === id);
  const titleId = `shop-${id}-title`;

  return (
    <section className="shop-line" id={id} aria-labelledby={titleId}>
      <div className="shop-line__intro">
        <p className="eyebrow">{collection.label}</p>
        <h2 className="heading shop-line__title" id={titleId}>
          {collection.title.map((line) => (
            <span key={line} className="ebk-line">
              {line}{' '}
            </span>
          ))}
        </h2>
        <p className="shop-line__copy">{collection.copy}</p>
      </div>
      <ul className="shop-line__products">
        {collection.products.map((product) => (
          <ProductCard key={product.id} product={product} label={collection.label} />
        ))}
      </ul>
    </section>
  );
}

export function StandardBand() {
  return (
    <section className="shop-standard" aria-labelledby="shop-standard-title">
      <div className="ebk-container shop-standard__inner">
        <div className="shop-standard__text">
          <h2 className="shop-standard__title" id="shop-standard-title">
            {standard.title}
          </h2>
          <p>{standard.copy}</p>
        </div>
        <ul className="shop-standard__points">
          {standard.points.map((point) => {
            const Icon = PAGE_ICONS[point.icon];
            return (
              <li key={point.icon}>
                <Icon size={38} strokeWidth={1.2} aria-hidden="true" />
                <span>
                  <Lines lines={point.lines} />
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function MeetCollection() {
  return (
    <section className="ebk-section" aria-labelledby="shop-meet-title">
      <div className="ebk-container shop-meet">
        <div className="shop-meet__text">
          <SectionHead title={meet.title} titleId="shop-meet-title" />
          <p className="shop-meet__lead">{meet.lead}</p>
          <p className="shop-meet__copy">{meet.copy}</p>
          <Button to={meet.cta.to} variant="secondary">
            {meet.cta.label}
          </Button>
        </div>
        <Picture
          name="home-hero-portrait"
          className="shop-meet__photo"
          alt="Rachna Sinha at her reception desk, in front of a wall mural that reads “Rachna Sinha, Beauty Obsessed”"
          sizes="(min-width: 900px) 46vw, 92vw"
        />
      </div>
    </section>
  );
}

const MESSAGES = {
  invalid: 'Please enter a valid email address, for example name@example.com.',
  unavailable: 'Sign-ups are not open yet, so your email has not been saved. Please check back soon.',
  success: 'Thank you. You are on the Beauty List.',
  error: 'Something went wrong and you have not been added. Please try again.',
};

export function ShopNewsletter() {
  const { email, status, inputRef, onChange, onSubmit } = useEmailSignup(newsletterEndpoint);
  const id = useId();

  return (
    <section className="shop-news" aria-labelledby={`${id}-title`}>
      <div className="ebk-container shop-news__inner">
        <div>
          <h2 className="heading shop-news__title" id={`${id}-title`}>
            {newsletter.title}
          </h2>
          <p className="shop-news__copy">{newsletter.copy}</p>
        </div>
        <div>
          <form className="shop-news__form" onSubmit={onSubmit} noValidate aria-labelledby={`${id}-title`}>
            <label className="sr-only" htmlFor={`${id}-email`}>Email address</label>
            <input
              ref={inputRef}
              id={`${id}-email`}
              className="pod-input shop-news__input"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="Your email address"
              value={email}
              onChange={onChange}
              aria-invalid={status === 'invalid' || undefined}
              aria-describedby={`${id}-message`}
            />
            <Button type="submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Joining…' : newsletter.cta}
            </Button>
          </form>
          <p className="shop-news__message" id={`${id}-message`} role="status">
            {MESSAGES[status] ?? ''}
          </p>
        </div>
      </div>
    </section>
  );
}

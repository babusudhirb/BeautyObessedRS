import { useId, useState } from 'react';
import { ArrowRight, Play, Search } from 'lucide-react';
import ArrowLink from '../ui/ArrowLink.jsx';
import Button from '../ui/Button.jsx';
import Picture from '../ui/Picture.jsx';
import SmartLink from '../ui/SmartLink.jsx';
import { BRAND_ICONS } from '../ui/icons.jsx';
import { PAGE_ICONS } from '../PageHero/icons.js';
import { SectionHead } from '../EbookLanding/parts.jsx';
import useEmailSignup from '../../hooks/useEmailSignup.js';
import { newsletterEndpoint } from '../../data/site.js';
import { youtubeChannel } from '../../data/podcastPage.js';
import { activeCategories, categoryLabel, editor, explore, hero, newsletter, picks, planBand, videos } from '../../data/blog.js';

const YoutubeIcon = BRAND_ICONS.youtube;
export const articleUrl = (slug) => `/blogs/${slug}`;
export const categoryUrl = (id) => (id === 'all' ? '/blogs' : `/blogs?category=${id}`);

export function BlogHero({ query, onQuery }) {
  const inputId = useId();

  return (
    <section className="blog-hero" aria-labelledby="blog-hero-title">
      <div className="blog-hero__text">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1 className="blog-hero__title" id="blog-hero-title">
          Beauty advice for <br />
          your everyday routine.
        </h1>
        <p className="blog-hero__copy">{hero.copy}</p>
        <form className="blog-search" role="search" onSubmit={(event) => event.preventDefault()}>
          <label className="sr-only" htmlFor={inputId}>
            Search the blog
          </label>
          <Search className="blog-search__icon" size={20} strokeWidth={2} aria-hidden="true" />
          <input
            id={inputId}
            className="blog-search__input"
            type="search"
            enterKeyHint="search"
            placeholder={hero.searchPlaceholder}
            value={query}
            onChange={(event) => onQuery(event.target.value)}
            aria-controls="latest-articles"
          />
        </form>
      </div>
      <div className="blog-hero__media">
        <Picture
          name="product-bodycare"
          alt="Body lotion, body scrub, body wash and hand cream on a marble tray"
          sizes="(min-width: 700px) 52vw, 40vw"
          priority
        />
      </div>
    </section>
  );
}

// Category links are real URLs (/blogs?category=…) so they can be crawled
// and shared; on the page they filter in place. Only categories with articles
// are listed.
export function CategoryChips({ active, onSelect }) {
  return (
    <nav className="ebk-container blog-chips" aria-label="Blog categories">
      <ul className="blog-chips__list">
        {activeCategories.map((category) => (
          <li key={category.id}>
            <a
              href={categoryUrl(category.id)}
              className="blog-chip"
              aria-current={active === category.id ? 'page' : undefined}
              onClick={(event) => {
                event.preventDefault();
                onSelect(category.id);
              }}
            >
              {category.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function FeaturedStory({ article }) {
  return (
    <section className="ebk-container" aria-label="Featured story">
      <article className="card blog-featured">
        {/* On the first screen, just below the hero. */}
        <Picture name={article.image} className="blog-featured__img" alt={article.alt} sizes="(min-width: 900px) 56vw, 92vw" style={{ objectPosition: article.focus }} loading="eager" />
        <div className="blog-featured__body">
          <p className="blog-tag">{categoryLabel(article.category)}</p>
          <h2 className="blog-featured__title">
            <SmartLink to={articleUrl(article.slug)}>{article.title}</SmartLink>
          </h2>
          <p className="blog-featured__summary">{article.summary}</p>
          <p className="blog-meta">
            By {article.author} <span aria-hidden="true">·</span> {article.readTime}
          </p>
          <Button to={articleUrl(article.slug)} aria-label={`Read Article: ${article.title}`}>
            Read Article
          </Button>
        </div>
      </article>
    </section>
  );
}

export function ArticleCard({ article }) {
  return (
    <li className="card blog-card">
      <div className="blog-card__media">
        <Picture name={article.image} alt={article.alt} sizes="(min-width: 900px) 30vw, (min-width: 600px) 46vw, 92vw" style={{ objectPosition: article.focus }} />
        <p className="blog-tag blog-card__tag">{categoryLabel(article.category)}</p>
      </div>
      <div className="blog-card__body">
        <h3 className="blog-card__title">
          <SmartLink to={articleUrl(article.slug)} className="blog-card__link">
            {article.title}
          </SmartLink>
        </h3>
        <p className="blog-card__summary">{article.summary}</p>
        <p className="blog-card__foot">
          <span className="blog-meta">{article.readTime}</span>
          <span className="blog-card__more" aria-hidden="true">
            Read Article <ArrowRight size={15} strokeWidth={2.25} />
          </span>
        </p>
      </div>
    </li>
  );
}

// Splits so the first three cards can sit with the featured story and the
// rest with "Watch and read", as in the design's screen grouping.
export function ArticleGrid({ items, part, onClear, id }) {
  if (part === 'empty') {
    return (
      <div className="ebk-container">
        <div className="blog-empty">
          <p>No articles match yet.</p>
          <button type="button" className="btn btn--secondary btn--sm" onClick={onClear}>
            Show all articles
          </button>
        </div>
      </div>
    );
  }
  return (
    <ul className="ebk-container blog-grid" id={id}>
      {items.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </ul>
  );
}

// Lists the rest of the articles. The page removes the button once they are shown.
export function LoadMore({ remaining, onLoad, controls }) {
  return (
    <div className="ebk-container blog-more">
      <button type="button" className="btn btn--secondary" onClick={onLoad} aria-controls={controls}>
        <span>Load more articles</span>
        <ArrowRight className="btn__arrow" size={16} strokeWidth={2.25} aria-hidden="true" />
      </button>
      <p className="blog-more__note">{remaining} more to read</p>
    </div>
  );
}

export function WatchAndRead() {
  return (
    <section className="ebk-section ebk-container" aria-labelledby="blog-videos-title">
      <SectionHead title="Watch and read" titleId="blog-videos-title">
        <SmartLink to={youtubeChannel.url} className="blog-yt-link">
          <YoutubeIcon />
          <span>Visit YouTube channel</span>
          <ArrowRight size={15} strokeWidth={2.25} aria-hidden="true" />
        </SmartLink>
      </SectionHead>
      <ul className="blog-videos">
        {videos.map((video) => (
          <li key={video.id} className="card blog-video">
            <SmartLink to={video.to} className="blog-video__link" aria-label={`${video.title} — on Rachna’s YouTube channel`}>
              <span className="blog-video__media">
                <Picture name={video.image} alt="" sizes="(min-width: 900px) 30vw, 92vw" style={{ objectPosition: video.focus }} />
                <span className="blog-video__play" aria-hidden="true">
                  <Play size={22} strokeWidth={0} fill="currentColor" />
                </span>
                <span className="blog-video__badge" aria-hidden="true">
                  <YoutubeIcon />
                </span>
              </span>
              <span className="blog-video__title">{video.title}</span>
            </SmartLink>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function PlanBand() {
  return (
    <section className="ebk-section ebk-container" aria-labelledby="blog-plan-title">
      <div className="blog-plan">
        <Picture name="beauty-plan-phone" className="blog-plan__img" alt="" sizes="(min-width: 900px) 24vw, 92vw" />
        <div className="blog-plan__text">
          <h2 className="heading blog-plan__title" id="blog-plan-title">
            {planBand.title}
          </h2>
          <p>{planBand.copy}</p>
        </div>
        <Button to={planBand.cta.to}>{planBand.cta.label}</Button>
      </div>
    </section>
  );
}

export function EditorsPicks() {
  return (
    <section className="ebk-section ebk-container" aria-labelledby="blog-picks-title">
      <SectionHead title="Editor’s picks" titleId="blog-picks-title" />
      <ul className="blog-picks">
        {picks.map((pick) => (
          <li key={pick.slug} className="card blog-pick">
            <Picture name={pick.image} className="blog-pick__img" alt="" sizes="96px" style={{ objectPosition: pick.focus }} />
            <div>
              <h3 className="blog-pick__title">
                <SmartLink to={articleUrl(pick.slug)} className="blog-pick__link">
                  {pick.title}
                </SmartLink>
              </h3>
              <p className="blog-tag">{categoryLabel(pick.category)}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function MeetEditor() {
  return (
    <section className="ebk-section ebk-container" aria-labelledby="blog-editor-title">
      <SectionHead title="Meet the editor" titleId="blog-editor-title" />
      <div className="blog-editor">
        <Picture
          name="home-hero-portrait"
          className="blog-editor__photo"
          alt="Rachna Sinha at her reception desk, in front of a wall mural that reads “Rachna Sinha, Beauty Obsessed”"
          sizes="(min-width: 900px) 34vw, 92vw"
        />
        <div className="blog-editor__text">
          <h3 className="blog-editor__name">{editor.name}</h3>
          <p>{editor.bio}</p>
          <Button to={editor.link.to} variant="secondary" size="sm">
            {editor.link.label}
          </Button>
        </div>
        <dl className="blog-editor__stats">
          {editor.stats.map((stat) => {
            const Icon = stat.icon === 'youtube' ? YoutubeIcon : PAGE_ICONS[stat.icon];
            return (
              <div key={stat.label} className="pod-stat">
                <span className="pod-stat__icon" aria-hidden="true">
                  <Icon size={34} strokeWidth={1.3} />
                </span>
                <dt className="pod-stat__value">{stat.value}</dt>
                <dd className="pod-stat__label">{stat.label}</dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

const MESSAGES = {
  consent: 'Please tick the box to agree to receive emails.',
  invalid: 'Please enter a valid email address, for example name@example.com.',
  unavailable: 'Sign-ups are not open yet, so your email has not been saved. Please check back soon.',
  success: 'Thank you. Your first beauty tip is on its way.',
  error: 'Something went wrong and you have not been subscribed. Please try again.',
};

// Uses the site's newsletter endpoint; reports success only when it accepts the request.
export function BlogNewsletter() {
  const { email, status, inputRef, onChange, onSubmit } = useEmailSignup(newsletterEndpoint);
  const [consent, setConsent] = useState(false);
  const [needConsent, setNeedConsent] = useState(false);
  const id = useId();

  const submit = (event) => {
    if (!consent) {
      event.preventDefault();
      setNeedConsent(true);
      document.getElementById(`${id}-consent`)?.focus();
      return;
    }
    onSubmit(event);
  };

  const message = needConsent && !consent ? MESSAGES.consent : MESSAGES[status];

  return (
    <section className="ebk-section ebk-container" aria-labelledby={`${id}-title`}>
      <div className="blog-news">
        <h2 className="heading blog-news__title" id={`${id}-title`}>
          {newsletter.title[0]} <br />
          {newsletter.title[1]}
        </h2>
        <form className="blog-news__form" onSubmit={submit} noValidate aria-labelledby={`${id}-title`}>
          <div className="blog-news__fields">
            <label className="sr-only" htmlFor={`${id}-email`}>
              Email address
            </label>
            <input
              ref={inputRef}
              id={`${id}-email`}
              className="pod-input blog-news__input"
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
              {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
            </Button>
          </div>
          <label className="pod-consent blog-news__consent" htmlFor={`${id}-consent`}>
            <input
              id={`${id}-consent`}
              type="checkbox"
              checked={consent}
              onChange={(event) => {
                setConsent(event.target.checked);
                if (event.target.checked) setNeedConsent(false);
              }}
              aria-invalid={(needConsent && !consent) || undefined}
            />
            {newsletter.consent}
          </label>
          <p className="blog-news__message" id={`${id}-message`} role="status">
            {message ?? ''}
          </p>
        </form>
      </div>
    </section>
  );
}

export function ExploreMore({ title = 'Explore more' }) {
  return (
    <section className="ebk-section ebk-container" aria-labelledby="blog-explore-title">
      <SectionHead title={title} titleId="blog-explore-title" />
      <ul className="blog-explore">
        {explore.map((item) => (
          <li key={item.id} className="card blog-explore__card">
            <Picture name={item.image} className="blog-explore__img" alt="" sizes="160px" style={{ objectPosition: item.focus }} />
            <div className="blog-explore__body">
              <h3 className="blog-explore__title">{item.title}</h3>
              <p>{item.copy}</p>
              <Button to={item.to} variant="secondary" size="sm">
                {item.cta}
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

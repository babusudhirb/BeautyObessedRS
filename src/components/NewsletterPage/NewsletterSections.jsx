import { useId, useState } from 'react';
import { ArrowRight, Brush, ClipboardCheck, Flower2, Play, Waves } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button.jsx';
import Picture from '../ui/Picture.jsx';
import SmartLink from '../ui/SmartLink.jsx';
import { BRAND_ICONS } from '../ui/icons.jsx';
import PageHero from '../PageHero/PageHero.jsx';
import { SectionHead } from '../EbookLanding/parts.jsx';
import useEmailSignup from '../../hooks/useEmailSignup.js';
import { newsletterEndpoint } from '../../data/site.js';
import { youtubeChannel } from '../../data/podcastPage.js';
import { categories, categoryLabel } from '../../data/blog.js';
import { categoryUrl } from '../BlogPage/BlogSections.jsx';
import { band, benefits, consent, hero, inside, issues, note } from '../../data/newsletterPage.js';

const YoutubeIcon = BRAND_ICONS.youtube;
const BENEFIT_ICONS = { lotus: Flower2, hair: Waves, makeup: Brush };

const MESSAGES = {
  consent: 'Please tick the box to agree to receive emails.',
  invalid: 'Please enter a valid email address, for example name@example.com.',
  unavailable: 'Sign-ups for The Beauty Letter are not open yet, so your email has not been saved. Please check back soon.',
  success: 'Thank you. You’re on the list for The Beauty Letter.',
  error: 'Something went wrong and you have not been subscribed. Please try again.',
};

// One sign-up form for both places on the page: same endpoint, same wording.
// It reports success only when the newsletter endpoint (data/site.js) accepts
// the request, and asks for consent before sending anything.
function SignupForm({ variant }) {
  const { email, status, inputRef, onChange, onSubmit } = useEmailSignup(newsletterEndpoint);
  const [agreed, setAgreed] = useState(false);
  const [needConsent, setNeedConsent] = useState(false);
  const id = useId();

  const submit = (event) => {
    if (!agreed) {
      event.preventDefault();
      setNeedConsent(true);
      document.getElementById(`${id}-consent`)?.focus();
      return;
    }
    onSubmit(event);
  };

  const message = needConsent && !agreed ? MESSAGES.consent : MESSAGES[status];

  return (
    <form className={`nl-form nl-form--${variant}`} onSubmit={submit} noValidate>
      <div className="nl-form__fields">
        <label className="sr-only" htmlFor={`${id}-email`}>
          Email address
        </label>
        <input
          ref={inputRef}
          id={`${id}-email`}
          className="nl-form__input"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Enter your email address"
          value={email}
          onChange={onChange}
          aria-invalid={status === 'invalid' || undefined}
          aria-describedby={`${id}-message`}
        />
        <Button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Joining…' : 'Join The Beauty Letter'}
        </Button>
      </div>
      <label className="nl-form__consent" htmlFor={`${id}-consent`}>
        <input
          id={`${id}-consent`}
          type="checkbox"
          checked={agreed}
          onChange={(event) => {
            setAgreed(event.target.checked);
            if (event.target.checked) setNeedConsent(false);
          }}
          aria-invalid={(needConsent && !agreed) || undefined}
        />
        <span>
          {consent} <Link to="/privacy-policy">Privacy Policy</Link>
        </span>
      </label>
      <p className="nl-form__message" id={`${id}-message`} role="status">
        {message ?? ''}
      </p>
    </form>
  );
}

// The full wording, and a shorter version shown instead on phones.
function PhoneCopy({ text, short }) {
  return (
    <>
      <span className="nl-full">{text}</span>
      <span className="nl-short">{short}</span>
    </>
  );
}

export function NewsletterHero() {
  return (
    <PageHero
      image="nl-hero"
      mobileImage="nl-hero-mobile"
      alt="Rachna Sinha at her desk with a laptop, makeup brushes and a 7-Day Beauty Routine Checklist booklet"
      focus="60% 30%"
      labelledBy="nl-hero-title"
      className="nl-hero"
    >
      <p className="eyebrow">{hero.eyebrow}</p>
      <h1 className="phero__title" id="nl-hero-title">
        Your weekly dose of beauty, <em>made simple.</em>
      </h1>
      <p className="phero__text">
        <PhoneCopy text={hero.copy} short={hero.copyShort} />
      </p>
      <div className="phero__actions">
        <SignupForm variant="hero" />
      </div>
      <div className="phero__points nl-hero__notes">
        {/* Shown only once the welcome gift exists (data/newsletterPage.js). */}
        {hero.welcomeGift && <p className="nl-hero__gift">{hero.welcomeGift}</p>}
        <SmartLink to={youtubeChannel.url} className="nl-hero__proof">
          <span>{hero.proof}</span>
          <YoutubeIcon />
        </SmartLink>
      </div>
    </PageHero>
  );
}

export function Benefits() {
  return (
    <section className="ebk-section ebk-container" aria-labelledby="nl-benefits-title">
      <SectionHead title="What you’ll receive" titleId="nl-benefits-title" />
      <ul className="nl-benefits">
        {benefits.map((benefit) => {
          const Icon = BENEFIT_ICONS[benefit.icon];
          return (
            <li key={benefit.title} className="card nl-benefit">
              <span className="nl-benefit__icon" aria-hidden="true">
                <Icon size={34} strokeWidth={1.4} />
              </span>
              <div>
                <h3 className="nl-benefit__title">{benefit.title}</h3>
                <p>{benefit.copy}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

// An illustration of what an issue looks like: labelled as a sample and
// written from the editable content in data/newsletterPage.js.
function SampleIssue() {
  const { sample } = inside;
  return (
    <article className="nl-issue" aria-label="Sample issue of The Beauty Letter">
      <header className="nl-issue__head">
        <p className="nl-issue__brand">RACHNA</p>
        <p className="nl-issue__name">The Beauty Letter</p>
        <p className="nl-issue__label">{sample.issue}</p>
      </header>

      <div className="nl-issue__banner">
        <Picture name="topic-skincare" alt="" sizes="(min-width: 1100px) 30vw, 90vw" />
        <p>{sample.banner}</p>
      </div>

      <p className="nl-issue__intro">
        {sample.greeting}
        <br />
        {sample.intro}
      </p>

      <div className="nl-issue__block">
        <h4 className="nl-issue__kicker">Rachna’s weekly tip</h4>
        <div className="nl-issue__row">
          <Picture name="topic-routines" className="nl-issue__thumb" alt="" sizes="140px" style={{ objectPosition: '55% 28%' }} />
          <p>{sample.tip}</p>
        </div>
      </div>

      <div className="nl-issue__block nl-issue__block--plain">
        <h4 className="nl-issue__kicker">The featured guide</h4>
        <div className="nl-issue__row">
          <Picture name="blog-skincare" className="nl-issue__thumb" alt="" sizes="140px" />
          <div>
            <p className="nl-issue__guide">{sample.guide.title}</p>
            <p className="nl-issue__small">{sample.guide.copy}</p>
            <Button to={sample.guide.to} variant="secondary" size="sm">
              {sample.guide.label}
            </Button>
          </div>
        </div>
      </div>

      {/* The last two blocks are left out of the shorter phone layout. */}
      <div className="nl-issue__block nl-issue__block--extra">
        <h4 className="nl-issue__kicker">Your routine reminder</h4>
        <div className="nl-issue__row">
          <span className="nl-issue__clip" aria-hidden="true">
            <ClipboardCheck size={44} strokeWidth={1.3} />
          </span>
          <div>
            <p className="nl-issue__guide">{sample.routineTitle}</p>
            <ul className="nl-issue__checks">
              {sample.checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="nl-issue__block nl-issue__block--plain nl-issue__block--extra">
        <h4 className="nl-issue__kicker">Watch and read</h4>
        <div className="nl-issue__row">
          <span className="nl-issue__video">
            <Picture name="podcast-rachna" alt="" sizes="160px" />
            <span className="nl-issue__play" aria-hidden="true">
              <Play size={16} strokeWidth={0} fill="currentColor" />
            </span>
          </span>
          <div>
            <p className="nl-issue__guide">{sample.video.title}</p>
            <SmartLink to={youtubeChannel.url} className="nl-issue__yt">
              <YoutubeIcon />
              <span>{sample.video.label}</span>
              <ArrowRight size={14} strokeWidth={2.25} aria-hidden="true" />
            </SmartLink>
          </div>
        </div>
      </div>
    </article>
  );
}

function NoteFromRachna() {
  return (
    <section className="nl-note" aria-labelledby="nl-note-title">
      <SectionHead title="A note from Rachna" titleId="nl-note-title" />
      <div className="card nl-note__card">
        <Picture
          name="home-podcast"
          className="nl-note__photo"
          alt="Rachna Sinha at her desk beside a studio microphone"
          sizes="(min-width: 1100px) 20vw, 40vw"
        />
        <div className="nl-note__text">
          {note.quote ? (
            <blockquote className="nl-note__quote">
              <p>{note.quote}</p>
            </blockquote>
          ) : (
            <p className="nl-note__copy">
              <PhoneCopy text={note.copy} short={note.copyShort} />
            </p>
          )}
          <p className="nl-note__name">{note.name}</p>
          <p className="nl-note__role">{note.role}</p>
        </div>
      </div>
    </section>
  );
}

function PlanCard() {
  return (
    <section className="nl-plan" aria-labelledby="nl-plan-title">
      <Picture name="beauty-plan-phone" className="nl-plan__img" alt="" sizes="(min-width: 1100px) 20vw, 40vw" />
      <div className="nl-plan__text">
        <h2 className="heading nl-plan__title" id="nl-plan-title">
          Want Rachna to plan your routine?
        </h2>
        <p>Get a personalised daily plan for your skin, hair and diet, built by Rachna and her team.</p>
        <Button to="/#beauty-plan" size="sm">
          Start Free Trial
        </Button>
      </div>
    </section>
  );
}

const TOPICS = categories.filter((category) => !['all', 'beauty-myths'].includes(category.id));

// Topic links into the blog's categories.
function Topics() {
  return (
    <section aria-labelledby="nl-topics-title">
      <SectionHead title="Explore topics in The Beauty Letter" titleId="nl-topics-title" />
      <ul className="nl-topics">
        {TOPICS.map((topic) => (
          <li key={topic.id}>
            <Link to={categoryUrl(topic.id)} className="nl-topic">
              {categoryLabel(topic.id)}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function PastIssues() {
  return (
    <section aria-labelledby="nl-issues-title">
      <SectionHead title="Past issues" titleId="nl-issues-title" />
      <ul className="nl-past">
        {issues.map((issue) => (
          <li key={issue.id} className="card nl-past__card">
            <Picture name={issue.image} className="nl-past__img" alt={issue.alt} sizes="(min-width: 1100px) 16vw, 30vw" style={{ objectPosition: issue.focus }} />
            <div className="nl-past__body">
              <h3 className="nl-past__title">{issue.number}</h3>
              <p className="nl-past__tag">Coming soon</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

// The two-column middle of the page: the sample issue on the left; the note,
// the Beauty Plan card, topics and past issues stacked on the right.
export function LookInside() {
  return (
    <div className="ebk-section ebk-container nl-inside">
      <section className="nl-inside__left" aria-labelledby="nl-inside-title">
        <SectionHead title="A look inside The Beauty Letter" titleId="nl-inside-title" />
        <div className="card nl-inside__frame">
          <SampleIssue />
        </div>
      </section>
      <div className="nl-inside__right">
        <NoteFromRachna />
        <PlanCard />
        <Topics />
        <PastIssues />
      </div>
    </div>
  );
}

export function SignupBand() {
  return (
    <section className="ebk-section ebk-container" aria-labelledby="nl-band-title">
      <div className="nl-band">
        <Picture name="ebook-inside-spread" className="nl-band__img" alt="" sizes="(min-width: 900px) 20vw, 90vw" />
        <div className="nl-band__text">
          <h2 className="heading nl-band__title" id="nl-band-title">
            {band.title}
          </h2>
          <p>{band.copy}</p>
        </div>
        <SignupForm variant="band" />
      </div>
    </section>
  );
}

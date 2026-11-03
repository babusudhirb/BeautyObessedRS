import {
  ArrowRight,
  Award,
  BookOpen,
  BookOpenText,
  Droplets,
  ExternalLink,
  Feather,
  Flower2,
  GraduationCap,
  Heart,
  HeartHandshake,
  Mail,
  MessagesSquare,
  Mic,
  Newspaper,
  Presentation,
  Scissors,
  Sparkles,
  Store,
  Users,
  Video,
} from 'lucide-react';
import Picture from '../ui/Picture.jsx';
import Rich from '../ui/Rich.jsx';
import SmartLink from '../ui/SmartLink.jsx';
import { Branch, Spray } from './Botanical.jsx';
import { closing, experience, explore, philosophy, qualifications, skills, story } from '../../data/aboutPage.js';

// Unconfirmed details never reach the live site. In the dev server they show
// as labelled drafts so the layout can be checked.
const SHOW_DRAFTS = import.meta.env.DEV;

const ICONS = {
  sparkles: Sparkles,
  store: Store,
  trainer: Presentation,
  creator: Video,
  mentor: HeartHandshake,
  education: GraduationCap,
  training: Users,
  certificate: Award,
  book: BookOpen,
  skincare: Droplets,
  haircare: Scissors,
  consultation: MessagesSquare,
  content: Video,
  feather: Feather,
  heart: Heart,
  lotus: Flower2,
  blog: Newspaper,
  ebooks: BookOpenText,
  podcast: Mic,
  newsletter: Mail,
};

function Icon({ name, size = 26, strokeWidth = 1.4 }) {
  const Component = ICONS[name];
  return <Component size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
}

function DraftBadge({ children = 'Draft · hidden on the live site' }) {
  return <span className="ab-draft">{children}</span>;
}

function Heading({ eyebrow, title, id, light = false }) {
  const lines = Array.isArray(title) ? title : [title];
  return (
    <>
      <p className={light ? 'ab-eyebrow ab-eyebrow--gold' : 'ab-eyebrow'}>{eyebrow}</p>
      <h2 className={light ? 'ab-h2 ab-h2--light' : 'ab-h2'} id={id}>
        {lines.map((line, i) => (
          <span key={line} className="ab-line">
            {line}
            {i < lines.length - 1 ? ' ' : ''}
          </span>
        ))}
      </h2>
    </>
  );
}

// ---------- My story ----------

export function Story() {
  const { portrait, notes, salon, quote } = story.collage;
  return (
    <section className="ab-section ab-story" id="my-story" aria-labelledby="ab-story-title">
      <Branch className="ab-story__branch" />
      <div className="ab-container ab-story__grid">
        <div className="ab-story__text">
          <Heading eyebrow={story.eyebrow} title={story.title} id="ab-story-title" />
          {story.paragraphs.map((paragraph) => (
            <p key={paragraph}>
              <Rich text={paragraph} />
            </p>
          ))}
          <p className="ab-signature">
            <span className="ab-signature__name">{story.signature.name}</span>
            <svg className="ab-signature__flourish" viewBox="0 0 220 18" aria-hidden="true" focusable="false">
              <path d="M2 12 C 40 2, 80 18, 120 9 S 190 4, 218 10" />
            </svg>
            <span className="ab-signature__role">{story.signature.role}</span>
          </p>
        </div>

        <div className="ab-collage">
          <Picture name={portrait.image} className="ab-collage__portrait" alt={portrait.alt} sizes="(min-width: 900px) 24vw, 46vw" style={{ objectPosition: portrait.focus }} />
          <Picture name={notes.image} className="ab-collage__notes" alt={notes.alt} sizes="(min-width: 900px) 30vw, 46vw" style={{ objectPosition: notes.focus }} />
          <Picture name={salon.image} className="ab-collage__salon" alt={salon.alt} sizes="(min-width: 900px) 15vw, 46vw" style={{ objectPosition: salon.focus }} />
          <p className="ab-collage__quote">
            <Flower2 size={22} strokeWidth={1.3} aria-hidden="true" />
            <span>
              {quote.map((line) => (
                <span key={line} className="ab-line">
                  {line}{' '}
                </span>
              ))}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

// ---------- Professional experience ----------

export function Experience() {
  const items = experience.items.filter((item) => item.confirmed || SHOW_DRAFTS);
  return (
    <section className="ab-band ab-experience" aria-labelledby="ab-experience-title">
      <Spray className="ab-experience__spray" />
      <div className="ab-container ab-experience__grid">
        <div>
          <Heading eyebrow={experience.eyebrow} title={experience.title} id="ab-experience-title" light />
        </div>
        <ol className="ab-timeline">
          {items.map((item) => (
            <li key={item.id} className="ab-timeline__item" data-draft={!item.confirmed || undefined}>
              <span className="ab-timeline__icon">
                <Icon name={item.icon} size={22} strokeWidth={1.5} />
              </span>
              {item.period && <p className="ab-timeline__period">{item.period}</p>}
              <h3 className="ab-timeline__role">{item.role}</h3>
              {item.detail && <p className="ab-timeline__detail">{item.detail}</p>}
              {SHOW_DRAFTS && !item.confirmed && <DraftBadge />}
              {SHOW_DRAFTS && item.confirmed && !item.period && <DraftBadge>Dates to confirm · not shown live</DraftBadge>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ---------- Qualifications ----------

function Entry({ entry, fields }) {
  return (
    <dl className="ab-qual__entry">
      {fields
        .filter((field) => entry[field.key])
        .map((field) => (
          <div key={field.key} className="ab-qual__row">
            <dt>{field.label}</dt>
            <dd>
              {field.key === 'credentialUrl' ? (
                <SmartLink to={entry.credentialUrl}>
                  View credential <ExternalLink size={13} strokeWidth={2} aria-hidden="true" />
                </SmartLink>
              ) : (
                entry[field.key]
              )}
            </dd>
          </div>
        ))}
      {entry.image && (
        <Picture name={entry.image} className="ab-qual__certificate" alt={entry.imageAlt ?? `${entry.certificate ?? entry.qualification ?? entry.course} certificate`} sizes="160px" />
      )}
    </dl>
  );
}

export function Qualifications() {
  return (
    <section className="ab-section ab-qual" aria-labelledby="ab-qual-title">
      <div className="ab-container">
        <header className="ab-qual__head">
          <div>
            <Heading eyebrow={qualifications.eyebrow} title={qualifications.title} id="ab-qual-title" />
          </div>
          <p className="ab-qual__intro">{qualifications.intro}</p>
        </header>

        <ul className="ab-qual__grid">
          {qualifications.groups.map((group) => (
            <li key={group.id} className="ab-qual__card">
              <Picture name={group.image} className="ab-qual__img" alt="" sizes="(min-width: 1100px) 13vw, (min-width: 700px) 30vw, 92vw" style={{ objectPosition: group.focus }} />
              <div className="ab-qual__body">
                <span className="ab-qual__icon">
                  <Icon name={group.icon} />
                </span>
                <h3 className="ab-h3">{group.title}</h3>
                <p className="ab-qual__copy">{group.copy}</p>
                {group.entries.map((entry, i) => (
                  <Entry key={i} entry={entry} fields={group.fields} />
                ))}
                {group.entries.length === 0 &&
                  (SHOW_DRAFTS ? (
                    <div className="ab-qual__draft">
                      <dl className="ab-qual__entry">
                        {group.fields.map((field) => (
                          <div key={field.key} className="ab-qual__row">
                            <dt>{field.label}</dt>
                            <dd>To be confirmed</dd>
                          </div>
                        ))}
                      </dl>
                      <DraftBadge />
                    </div>
                  ) : (
                    <p className="ab-qual__pending">{qualifications.pendingNote}</p>
                  ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ---------- Skills ----------

export function Skills() {
  return (
    <section className="ab-section ab-skills" aria-labelledby="ab-skills-title">
      <div className="ab-container">
        <header className="ab-skills__head">
          <div>
            <Heading eyebrow={skills.eyebrow} title={skills.title} id="ab-skills-title" />
          </div>
          <p className="ab-skills__note">{skills.note}</p>
        </header>
        <ul className="ab-skills__grid">
          {skills.items.map((item) => (
            <li key={item.id} className="ab-skill">
              <span className="ab-skill__icon">
                <Icon name={item.icon} />
              </span>
              <div>
                <h3 className="ab-skill__title">{item.title}</h3>
                <p className="ab-skill__copy">{item.copy}</p>
                {SHOW_DRAFTS && !item.confirmed && <DraftBadge>To confirm with Rachna</DraftBadge>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ---------- Philosophy ----------

export function Philosophy() {
  return (
    <section className="ab-philosophy" aria-labelledby="ab-philosophy-title">
      <Spray className="ab-philosophy__spray" />
      <Branch className="ab-philosophy__branch" />
      <div className="ab-container ab-philosophy__grid">
        <div>
          <p className="ab-eyebrow">{philosophy.eyebrow}</p>
          <h2 className="ab-statement" id="ab-philosophy-title">
            {philosophy.statement}
          </h2>
        </div>
        <ul className="ab-values">
          {philosophy.values.map((value) => (
            <li key={value.id} className="ab-value">
              <span className="ab-value__icon">
                <Icon name={value.icon} size={30} strokeWidth={1.2} />
              </span>
              <h3 className="ab-value__title">{value.title}</h3>
              <p>{value.copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ---------- Explore ----------

export function Explore() {
  return (
    <section className="ab-section ab-explore" aria-labelledby="ab-explore-title">
      <div className="ab-container ab-explore__grid">
        <header className="ab-explore__head">
          <div>
            <Heading eyebrow={explore.eyebrow} title={explore.title} id="ab-explore-title" />
          </div>
          <p>{explore.copy}</p>
        </header>
        <ul className="ab-explore__cards">
          {explore.cards.map((card) => (
            <li key={card.id} className="ab-card">
              <Picture name={card.image} className="ab-card__img" alt="" sizes="(min-width: 1100px) 18vw, (min-width: 600px) 46vw, 92vw" style={{ objectPosition: card.focus }} />
              <div className="ab-card__body">
                <h3 className="ab-card__title">
                  <Icon name={card.icon} size={18} strokeWidth={1.7} />
                  {/* The title link covers the whole card. */}
                  <SmartLink to={card.to} className="ab-card__link">
                    {card.title}
                  </SmartLink>
                </h3>
                <p className="ab-card__copy">{card.copy}</p>
                <span className="ab-card__cta" aria-hidden="true">
                  {card.cta} <ArrowRight size={14} strokeWidth={2.25} />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ---------- Closing banner ----------

export function Closing() {
  return (
    <section className="ab-closing" aria-labelledby="ab-closing-title">
      <svg className="ab-closing__wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M0 0 H1440 V14 C 1200 48 960 26 720 22 S 240 2 0 26 Z" />
      </svg>
      <Branch className="ab-closing__branch ab-closing__branch--left" />
      <Branch className="ab-closing__branch ab-closing__branch--right" />
      <div className="ab-container ab-closing__inner">
        <div>
          <h2 className="ab-closing__title" id="ab-closing-title">
            {closing.title}
          </h2>
          <p>{closing.copy}</p>
        </div>
        <SmartLink to={closing.cta.to} className="ab-btn ab-btn--gold">
          <span>{closing.cta.label}</span>
          <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" />
        </SmartLink>
      </div>
    </section>
  );
}

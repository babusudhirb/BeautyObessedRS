import Picture from '../ui/Picture.jsx';
import { PAGE_ICONS } from '../PageHero/icons.js';
import { SectionHead } from '../EbookLanding/parts.jsx';
import { formats, topics } from '../../data/podcastPage.js';

// What the show covers and how it is made, together on one screen: six topic
// cards, then the three formats on a dark wine band.
export default function TopicsStage() {
  return (
    <div className="ebk-section pod-stage">
      <section className="ebk-container pod-topics" aria-labelledby="pod-topics-title">
        <SectionHead
          title="What we talk about"
          titleId="pod-topics-title"
          aside="Practical topics. Real experiences. Useful advice."
        />
        <ul className="pod-topics__grid">
          {topics.map((topic) => {
            const Icon = PAGE_ICONS[topic.icon];
            return (
              <li key={topic.id} className="card topic">
                <Picture name={topic.image} className="topic__img" alt="" sizes="(min-width: 1100px) 16vw, (min-width: 700px) 31vw, 46vw" style={{ objectPosition: topic.focus }} />
                <span className="topic__icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.5} />
                </span>
                <h3 className="topic__title">{topic.title}</h3>
                <p className="topic__copy">{topic.copy}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="ebk-container pod-format" aria-labelledby="pod-format-title">
        <SectionHead title="The show format" titleId="pod-format-title" aside="Different perspectives, one meaningful show." />
        <div className="pod-format__row">
          <Picture name="pod-headphones" className="pod-format__img" alt="" sizes="(min-width: 1100px) 20vw, 40vw" />
          <ul className="pod-format__list">
            {formats.map((format) => {
              const Icon = PAGE_ICONS[format.icon];
              return (
                <li key={format.title} className="format">
                  <Icon size={36} strokeWidth={1.3} aria-hidden="true" />
                  <div>
                    <h3 className="format__title">{format.title}</h3>
                    <p className="format__copy">{format.copy}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}

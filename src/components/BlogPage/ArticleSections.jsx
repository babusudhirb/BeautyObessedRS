import { useState } from 'react';
import { ChevronRight, Lightbulb } from 'lucide-react';
import ArrowLink from '../ui/ArrowLink.jsx';
import Picture from '../ui/Picture.jsx';
import Rich from '../ui/Rich.jsx';
import SmartLink from '../ui/SmartLink.jsx';
import { FaqItem } from '../Faq/Faq.jsx';
import { SectionHead } from '../EbookLanding/parts.jsx';
import { ArticleCard } from './BlogSections.jsx';
import { articleNote, author } from '../../data/blog.js';

// Anchor id for a section heading, e.g. "Step 1: Cleanse" -> "step-1-cleanse".
export const headingId = (text) =>
  text
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

// The last crumb is the current page and is not a link.
export function Breadcrumbs({ items }) {
  return (
    <nav className="art-crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={item.label}>
            {index > 0 && <ChevronRight className="art-crumbs__sep" size={14} strokeWidth={2} aria-hidden="true" />}
            {item.to ? (
              <SmartLink to={item.to}>{item.label}</SmartLink>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Sidebar on wide screens, a box above the text on narrow ones.
export function Contents({ items }) {
  return (
    <nav className="art-toc" aria-labelledby="art-toc-title">
      <p className="art-toc__title" id="art-toc-title">
        In this article
      </p>
      <ol className="art-toc__list">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>{item.heading}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Table({ caption, head, rows }) {
  return (
    <div className="art-table" role="region" aria-label={caption} tabIndex={0}>
      <table>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {head.map((cell, index) => (cell ? <th key={cell} scope="col">{cell}</th> : <td key={index} />))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, index) =>
                index === 0 ? (
                  <th key={index} scope="row">
                    {cell}
                  </th>
                ) : (
                  <td key={index}>{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Block({ block }) {
  if (typeof block === 'string') {
    return (
      <p>
        <Rich text={block} />
      </p>
    );
  }
  switch (block.type) {
    case 'h3':
      return <h3 className="art-h3">{block.text}</h3>;
    case 'list': {
      const List = block.ordered ? 'ol' : 'ul';
      return (
        <List className={block.ordered ? 'art-list art-list--ordered' : 'art-list'}>
          {block.items.map((item) => (
            <li key={item}>
              <Rich text={item} />
            </li>
          ))}
        </List>
      );
    }
    case 'tip':
      return (
        <aside className="art-tip" aria-label={block.title}>
          <Lightbulb className="art-tip__icon" size={22} strokeWidth={1.75} aria-hidden="true" />
          <div>
            <p className="art-tip__title">{block.title}</p>
            <p>
              <Rich text={block.text} />
            </p>
          </div>
        </aside>
      );
    case 'table':
      return <Table {...block} />;
    case 'figure':
      return (
        <figure className="art-figure">
          <Picture name={block.image} alt={block.alt} sizes="(min-width: 1100px) 720px, 92vw" style={{ objectPosition: block.focus }} />
        </figure>
      );
    default:
      return null;
  }
}

export function ArticleSection({ id, heading, blocks }) {
  return (
    <section className="art-section" aria-labelledby={id}>
      <h2 className="art-h2" id={id}>
        {heading}
      </h2>
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </section>
  );
}

// One column of the site's accordion questions. Each opens independently.
export function ArticleFaq({ id, faqs }) {
  const [openIds, setOpenIds] = useState(() => new Set());
  const toggle = (faqId) =>
    setOpenIds((current) => {
      const next = new Set(current);
      if (next.has(faqId)) next.delete(faqId);
      else next.add(faqId);
      return next;
    });

  return (
    <section className="art-section art-faq" aria-labelledby={id}>
      <h2 className="art-h2" id={id}>
        Frequently asked questions
      </h2>
      <div className="art-faq__list">
        {faqs.map((faq) => (
          <FaqItem key={faq.id} faq={faq} open={openIds.has(faq.id)} onToggle={() => toggle(faq.id)} />
        ))}
      </div>
    </section>
  );
}

export function ArticleNote() {
  return (
    <p className="art-note">
      {articleNote.text} <SmartLink to={articleNote.link.to}>{articleNote.link.label}</SmartLink>
    </p>
  );
}

export function AuthorBox() {
  return (
    <aside className="card art-author" id="about-the-author" aria-labelledby="art-author-title">
      <Picture name="home-podcast" className="art-author__photo" alt="Rachna Sinha" sizes="112px" />
      <div className="art-author__text">
        <h2 className="art-author__eyebrow" id="art-author-title">
          About the author
        </h2>
        <p className="art-author__name">{author.name}</p>
        <p>{author.bio}</p>
        <ArrowLink to={author.link.to}>{author.link.label}</ArrowLink>
      </div>
    </aside>
  );
}

export function RelatedArticles({ items }) {
  return (
    <section className="ebk-section art-related" aria-labelledby="art-related-title">
      <div className="ebk-container">
        <SectionHead title="Related articles" titleId="art-related-title">
          <SmartLink to="/blogs" className="blog-clear">
            All articles
          </SmartLink>
        </SectionHead>
      </div>
      <ul className="ebk-container blog-grid">
        {items.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </ul>
    </section>
  );
}

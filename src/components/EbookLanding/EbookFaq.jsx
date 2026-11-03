import { useState } from 'react';
import { FaqItem } from '../Faq/Faq.jsx';
import { faqs as ebookFaqs } from '../../data/ebooks.js';

// Questions in two columns on wide screens. Each column is its own stack, so
// opening one answer never stretches the other column. Shows the e-book
// questions unless another list is passed.
export default function EbookFaq({ faqs = ebookFaqs, titleId = 'ebook-faq-title' }) {
  const [openIds, setOpenIds] = useState(() => new Set());

  const toggle = (id) =>
    setOpenIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const half = Math.ceil(faqs.length / 2);
  const columns = [faqs.slice(0, half), faqs.slice(half)];

  return (
    <section className="ebk-section ebk-faq" aria-labelledby={titleId}>
      <div className="ebk-container">
        <h2 className="ebk-card-title ebk-faq__title" id={titleId}>
          Frequently asked questions
        </h2>
        <div className="ebk-faq__list">
          {columns.map((column) => (
            <div key={column[0].id} className="ebk-faq__column">
              {column.map((faq) => (
                <FaqItem key={faq.id} faq={faq} open={openIds.has(faq.id)} onToggle={() => toggle(faq.id)} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

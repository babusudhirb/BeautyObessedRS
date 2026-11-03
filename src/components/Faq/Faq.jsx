import { useState } from 'react';
import { Plus } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader.jsx';
import { faqs } from '../../data/content.js';
import './Faq.css';

export function FaqItem({ faq, open, onToggle }) {
  const buttonId = `faq-${faq.id}-button`;
  const panelId = `faq-${faq.id}-panel`;

  return (
    <div className="faq-item card" data-open={open}>
      <h3 className="faq-item__heading">
        <button
          type="button"
          id={buttonId}
          className="faq-item__button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span>{faq.question}</span>
          <Plus className="faq-item__icon" size={20} strokeWidth={2.25} aria-hidden="true" />
        </button>
      </h3>

      <div id={panelId} className="faq-item__panel" role="region" aria-labelledby={buttonId}>
        <div className="faq-item__answer">
          <p>{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}

// Each question is a real <button>, so the accordion works with Tab, Enter
// and Space. Items open independently of each other.
export default function Faq() {
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
    <section className="section faq container" id="faq" aria-labelledby="faq-title">
      <SectionHeader
        title="Frequently Asked Questions"
        titleId="faq-title"
        action={{ label: 'View all FAQs', to: '/faqs' }}
      />

      <div className="faq__columns">
        {columns.map((column) => (
          <div key={column[0].id} className="faq__column">
            {column.map((faq) => (
              <FaqItem key={faq.id} faq={faq} open={openIds.has(faq.id)} onToggle={() => toggle(faq.id)} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

import {
  BookOpen,
  BookOpenText,
  Check,
  CircleArrowDown,
  ClipboardCheck,
  ClipboardList,
  ClipboardPen,
  FileCheck,
  Flower2,
  Lightbulb,
  ListChecks,
  ShieldCheck,
  TabletSmartphone,
} from 'lucide-react';

// Line icons used across the e-book page, keyed by the names in data/ebooks.js.
export const ICONS = {
  books: BookOpen,
  download: CircleArrowDown,
  devices: TabletSmartphone,
  secure: ShieldCheck,
  steps: BookOpenText,
  checklists: ListChecks,
  tips: Lightbulb,
  examples: Flower2,
  checklist: ClipboardCheck,
  tracker: ClipboardPen,
  guide: FileCheck,
  template: ClipboardList,
};

// Section title with a short gold rule, and an optional note or controls beside it.
// `inline` keeps the note next to the title instead of at the far edge;
// `stack` puts it underneath.
export function SectionHead({ title, titleId, aside, inline = false, stack = false, children }) {
  let className = 'ebk-head';
  if (inline) className += ' ebk-head--inline';
  if (stack) className += ' ebk-head--stack';

  return (
    <header className={className}>
      <h2 className="heading ebk-head__title" id={titleId}>
        {title}
      </h2>
      {(aside || children) && (
        <div className="ebk-head__aside">
          {aside && <p>{aside}</p>}
          {children}
        </div>
      )}
    </header>
  );
}

// A list with a round amber tick before each item.
export function CheckList({ items }) {
  return (
    <ul className="ebk-checks">
      {items.map((item) => (
        <li key={item}>
          <span className="ebk-check" aria-hidden="true">
            <Check size={12} strokeWidth={3.2} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

// Short text set on the lines chosen in the design. The trailing space keeps
// the words apart for screen readers and when the lines are allowed to reflow.
export function Lines({ lines }) {
  return lines.map((line) => (
    <span key={line} className="ebk-line">
      {line}{' '}
    </span>
  ));
}

import ArrowLink from './ArrowLink.jsx';
import './ui.css';

// Section title on the left, optional controls and a "see more" link on the right.
export default function SectionHeader({ title, titleId, subtitle, action, children }) {
  const hasAside = Boolean(children || action);

  return (
    <header className="section-header">
      <div className="section-header__text">
        <h2 className="heading" id={titleId}>
          {title}
        </h2>
        {subtitle && <p className="section-header__subtitle">{subtitle}</p>}
      </div>
      {hasAside && (
        <div className="section-header__aside">
          {children}
          {action && <ArrowLink to={action.to}>{action.label}</ArrowLink>}
        </div>
      )}
    </header>
  );
}

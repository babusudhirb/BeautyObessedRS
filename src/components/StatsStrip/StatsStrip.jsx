import { LineIcon } from '../ui/icons.jsx';
import { stats } from '../../data/content.js';
import './StatsStrip.css';

// A stat with `value: null` has not been confirmed: it shows a dash, never a made-up number.
export default function StatsStrip() {
  return (
    <section className="stats" aria-label="Rachna at a glance">
      <ul className="stats__list container">
        {stats.map((stat) => (
          <li key={stat.id} className="stats__item">
            <LineIcon name={stat.icon} size={38} />
            <p className="stats__text">
              {stat.value === null ? (
                <strong className="stats__value">
                  <span aria-hidden="true">—</span>
                  <span className="sr-only">Figure to be confirmed:</span>
                </strong>
              ) : (
                <strong className="stats__value">{stat.value}</strong>
              )}
              <span className="stats__label">{stat.label}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

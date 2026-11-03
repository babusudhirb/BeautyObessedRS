import Button from '../components/ui/Button.jsx';
import './UpcomingPage.css';

// Stand-in for pages that have not been built yet (see data/pages.js) and for
// unknown URLs. It gives every link on the site an honest destination.
export default function UpcomingPage({ title, summary, back, notFound = false }) {
  return (
    <section className="upcoming container">
      <title>{`${title} · Rachna`}</title>
      <p className="upcoming__eyebrow">{notFound ? 'Page not found' : 'Coming soon'}</p>
      <h1 className="heading upcoming__title">{title}</h1>
      <p className="upcoming__summary">{summary}</p>

      <div className="upcoming__actions">
        <Button to="/">Back to home</Button>
        {back && (
          <Button to={back.to} variant="secondary" arrow={false}>
            {back.label}
          </Button>
        )}
      </div>
    </section>
  );
}

import { useLocation } from 'react-router-dom';
import PageMeta from '../components/Seo/PageMeta.jsx';
import Button from '../components/ui/Button.jsx';
import './UpcomingPage.css';

// Stand-in for pages that have not been built yet (see data/pages.js) and for
// unknown URLs. It gives every link on the site an honest destination.
export default function UpcomingPage({ title, summary, back, notFound = false }) {
  const { pathname } = useLocation();

  return (
    <section className="upcoming container">
      {/* Placeholders are kept out of search results until they have content. */}
      <PageMeta title={`${title} · Rachna`} description={summary} path={pathname} noindex />
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

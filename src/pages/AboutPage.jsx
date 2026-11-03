// The italic cut of the headline serif, used by the hero's emphasis and the signature.
import '@fontsource-variable/fraunces/opsz-italic.css';

import AboutHero from '../components/AboutPage/AboutHero.jsx';
import { Closing, Experience, Explore, Philosophy, Qualifications, Skills, Story } from '../components/AboutPage/AboutSections.jsx';
import { person, seo } from '../data/aboutPage.js';
import manifest from '../data/image-manifest.json';
import { absoluteUrl } from '../data/seo.js';
import useMetaDescription from '../hooks/useMetaDescription.js';
import '../components/AboutPage/AboutPage.css';

// Only confirmed facts: name, roles, city, salon brand and YouTube channel.
function structuredData(url) {
  const photo = manifest['about-hero'];
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: seo.title,
    description: seo.description,
    url,
    mainEntity: {
      '@type': 'Person',
      name: person.name,
      jobTitle: person.jobTitle,
      image: absoluteUrl(`/images/about-hero-${photo.widths.at(-1)}.webp`),
      address: { '@type': 'PostalAddress', addressLocality: person.city, addressCountry: 'IN' },
      worksFor: { '@type': 'Organization', name: person.salonBrand },
      sameAs: person.sameAs,
    },
  };
}

// The About page. Section order follows its design reference.
export default function AboutPage() {
  useMetaDescription(seo.description);
  const url = absoluteUrl('/about');

  return (
    <div className="ab">
      <title>{seo.title}</title>
      <link rel="canonical" href={url} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(url)) }} />
      <AboutHero />
      <Story />
      <Experience />
      <Qualifications />
      <Skills />
      <Philosophy />
      <Explore />
      <Closing />
    </div>
  );
}

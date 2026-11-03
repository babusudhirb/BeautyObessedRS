import { absoluteUrl } from '../../data/seo.js';
import { brand } from '../../data/site.js';
import useMetaDescription from '../../hooks/useMetaDescription.js';
import { shareImagePath } from '../ui/Picture.jsx';

// Title, description, canonical link and Open Graph tags for one page. React
// moves the tags into <head> and removes them when the page changes. `image`
// is a manifest slug for the share card. Placeholder and not-found pages pass
// `noindex` and get no canonical link.
export default function PageMeta({ title, description, path, image, type = 'website', noindex = false }) {
  useMetaDescription(description);
  const url = absoluteUrl(path);

  return (
    <>
      <title>{title}</title>
      {noindex ? <meta name="robots" content="noindex" /> : <link rel="canonical" href={url} />}
      <meta property="og:site_name" content={brand.fullName} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={absoluteUrl(shareImagePath(image))} />}
      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
    </>
  );
}

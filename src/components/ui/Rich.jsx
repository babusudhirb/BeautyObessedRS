import SmartLink from './SmartLink.jsx';

const MARKUP = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;

// Text with two bits of markup: [label](/path) for a link and **text** for
// bold, as used by the blog articles and the About page.
export default function Rich({ text }) {
  const parts = [];
  let last = 0;
  for (const match of text.matchAll(MARKUP)) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(
      match[1] ? (
        <SmartLink key={match.index} to={match[2]}>
          {match[1]}
        </SmartLink>
      ) : (
        <strong key={match.index}>{match[3]}</strong>
      ),
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

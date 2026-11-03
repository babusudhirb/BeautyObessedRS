import { CalendarDays, FileText, Gem, GraduationCap, Heart, Store, Users } from 'lucide-react';

// Gold line icons used by the statistics strip and the service cards.
const LINE_ICONS = {
  gem: Gem,
  store: Store,
  users: Users,
  heart: Heart,
  training: GraduationCap,
  calendar: CalendarDays,
  document: FileText,
};

export function LineIcon({ name, size = 36 }) {
  const Icon = LINE_ICONS[name];
  return Icon ? <Icon className="line-icon" size={size} strokeWidth={1.5} aria-hidden="true" /> : null;
}

// Brand marks are not part of lucide, so they are drawn here.
const brandProps = { width: 24, height: 24, viewBox: '0 0 24 24', 'aria-hidden': true, focusable: false };

function InstagramIcon() {
  return (
    <svg {...brandProps} fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5.2" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg {...brandProps} fill="currentColor">
      <path
        fillRule="evenodd"
        d="M6.4 5.4h11.2a4 4 0 0 1 4 4v5.2a4 4 0 0 1-4 4H6.4a4 4 0 0 1-4-4V9.4a4 4 0 0 1 4-4Zm3.7 3.8v5.6l4.9-2.8-4.9-2.8Z"
      />
    </svg>
  );
}

function SpotifyIcon() {
  return (
    <svg {...brandProps} fill="none">
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <g stroke="var(--icon-cutout, #7a1f3d)" strokeLinecap="round">
        <path d="M7 9.4c3.5-1 7.3-.7 10.3 1" strokeWidth="1.9" />
        <path d="M7.6 12.5c2.9-.8 6-.5 8.5.9" strokeWidth="1.6" />
        <path d="M8.3 15.4c2.2-.6 4.5-.4 6.4.7" strokeWidth="1.4" />
      </g>
    </svg>
  );
}

function ApplePodcastsIcon() {
  return (
    <svg {...brandProps} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <rect x="3" y="3" width="18" height="18" rx="5.2" />
      <path d="M7.7 14.6a5.3 5.3 0 1 1 8.6 0" />
      <path d="M10 12.6a2.6 2.6 0 1 1 4 0" />
      <circle cx="12" cy="11.2" r="1.05" fill="currentColor" stroke="none" />
      <path d="M12 14.1v3.5" strokeWidth="2.2" />
    </svg>
  );
}

export const BRAND_ICONS = {
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  spotify: SpotifyIcon,
  applePodcasts: ApplePodcastsIcon,
};

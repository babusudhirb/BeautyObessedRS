import { useEffect, useId, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import Button from '../ui/Button.jsx';
import { brand, navLinks, newsletterNav, pageNav, primaryCta } from '../../data/site.js';
import Picture from '../ui/Picture.jsx';
import useActiveSection from '../../hooks/useActiveSection.js';
import useScrolled from '../../hooks/useScrolled.js';
import './Navbar.css';

const SECTION_IDS = navLinks.map((link) => link.section);
const DESKTOP_QUERY = '(min-width: 960px)';
const TOOL_ICONS = { search: Search, bag: ShoppingBag };

export default function Navbar() {
  const { pathname, key } = useLocation();
  const onHome = pathname === '/';
  // The e-book, podcast and shop pages have their own links, call to action
  // and icon links. `section` is the one of those pages the visitor is on.
  const section = Object.keys(pageNav.ctas).find((path) => pathname === path || pathname.startsWith(`${path}/`));
  const onEbook = Boolean(section);
  const onNewsletter = pathname === '/newsletter' || pathname.startsWith('/newsletter/');
  let links = onEbook ? pageNav.links : navLinks;
  if (onNewsletter) links = newsletterNav;
  const cta = onEbook ? pageNav.ctas[section] : primaryCta;
  const tools = onEbook ? pageNav.tools : [];
  const scrolled = useScrolled();
  const activeSection = useActiveSection(SECTION_IDS, onHome);

  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef(null);

  // Close the mobile menu after any navigation.
  useEffect(() => setOpen(false), [key]);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    // The menu only exists below the desktop breakpoint.
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => desktop.matches && setOpen(false);

    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onChange);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onChange);
    };
  }, [open]);

  // On the homepage the link for the section on screen is highlighted. On every
  // other page it is the link for that page or the one it sits under, e.g.
  // Blogs on /blogs and on each article.
  const ariaCurrent = (link) => {
    if (onHome) {
      if (link.section !== activeSection) return undefined;
      return link.section === 'top' ? 'page' : 'location';
    }
    if (link.to === '/') return undefined;
    return pathname === link.to || pathname.startsWith(`${link.to}/`) ? 'page' : undefined;
  };

  return (
    <header className={onEbook ? 'nav nav--ebook' : 'nav'} data-scrolled={scrolled || open}>
      <div className="nav__inner container">
        <Link to="/" className={onNewsletter ? 'nav__brand nav__brand--logo' : 'nav__brand'} aria-label={`${brand.name} — home`}>
          {onNewsletter ? <Picture name="nav-logo" alt="" sizes="96px" priority /> : brand.wordmark}
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {links.map((link) => (
            <Link key={link.to} to={link.to} className="nav__link" aria-current={ariaCurrent(link)}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav__actions">
          {tools.map((tool) => {
            const Icon = TOOL_ICONS[tool.id];
            return (
              <Link key={tool.id} to={tool.to} className="nav__tool" aria-label={tool.label}>
                <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
              </Link>
            );
          })}

          <Button to={cta.to} className="nav__cta">
            {cta.label}
          </Button>

          <button
            ref={toggleRef}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id={menuId} className="nav__drawer" hidden={!open}>
        <nav className="nav__drawer-inner container" aria-label="Mobile">
          <ul className="nav__drawer-list">
            {links.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="nav__drawer-link" aria-current={ariaCurrent(link)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button to={cta.to} block>
            {cta.label}
          </Button>
        </nav>
      </div>
    </header>
  );
}

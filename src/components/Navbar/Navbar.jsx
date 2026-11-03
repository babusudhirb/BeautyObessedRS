import { useEffect, useId, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import BrandMark from '../ui/BrandMark.jsx';
import Button from '../ui/Button.jsx';
import { navLinks, primaryCta } from '../../data/site.js';
import useScrolled from '../../hooks/useScrolled.js';
import './Navbar.css';

const DESKTOP_QUERY = '(min-width: 960px)';

// The one navbar, rendered once by App.jsx for every page.
export default function Navbar() {
  const { pathname, key } = useLocation();
  const scrolled = useScrolled();

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

  // The link for the page the visitor is on, or the page it sits under, e.g.
  // Blogs on /blogs and on each article, Shop on each product.
  const ariaCurrent = (link) => {
    const current = link.to === '/' ? pathname === '/' : pathname === link.to || pathname.startsWith(`${link.to}/`);
    return current ? 'page' : undefined;
  };

  return (
    <header className="nav" data-scrolled={scrolled || open}>
      <div className="nav__inner container">
        <BrandMark className="nav__brand" />

        <nav className="nav__links" aria-label="Primary">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="nav__link" aria-current={ariaCurrent(link)}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav__actions">
          <Button to={primaryCta.to} className="nav__cta">
            {primaryCta.label}
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
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="nav__drawer-link" aria-current={ariaCurrent(link)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button to={primaryCta.to} block>
            {primaryCta.label}
          </Button>
        </nav>
      </div>
    </header>
  );
}

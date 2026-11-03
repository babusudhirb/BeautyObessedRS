import { Link } from 'react-router-dom';
import ArrowLink from '../ui/ArrowLink.jsx';
import SmartLink from '../ui/SmartLink.jsx';
import { BRAND_ICONS } from '../ui/icons.jsx';
import { brand, navLinks, salon, socialLinks, supportLinks } from '../../data/site.js';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__brand">
          <Link to="/" className="footer__wordmark" aria-label={`${brand.name} — home`}>
            {brand.wordmark}
          </Link>
          <p className="footer__tagline">{brand.tagline}</p>

          <ul className="footer__social">
            {socialLinks.map((social) => {
              const Icon = BRAND_ICONS[social.id];
              return (
                <li key={social.id}>
                  <SmartLink to={social.to} className="footer__social-link" aria-label={social.label}>
                    <Icon />
                  </SmartLink>
                </li>
              );
            })}
          </ul>
        </div>

        <nav className="footer__column" aria-labelledby="footer-explore">
          <h2 className="footer__heading" id="footer-explore">
            Explore
          </h2>
          <ul className="footer__list">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="footer__link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__column">
          <h2 className="footer__heading">My Salons in {salon.city}</h2>
          <ul className="footer__list">
            {salon.locations.map((location) => (
              <li key={location.id} className="footer__address">
                {/* Addresses are filled in from data/site.js once they are confirmed. */}
                {location.address ?? `${location.label} — address to be added`}
              </li>
            ))}
          </ul>
          <ArrowLink to={salon.to} className="footer__more">
            View all salons
          </ArrowLink>
        </div>

        <nav className="footer__column" aria-labelledby="footer-support">
          <h2 className="footer__heading" id="footer-support">
            Support
          </h2>
          <ul className="footer__list">
            {supportLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="footer__link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="footer__legal">
          © {brand.copyrightYear} {brand.name}. All rights reserved.{' '}
          <span>Content is educational and not a substitute for professional advice.</span>
        </p>
      </div>
    </footer>
  );
}

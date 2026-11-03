import { ArrowRight } from 'lucide-react';
import SmartLink from './SmartLink.jsx';
import './ui.css';

// variant: 'primary' (wine-to-rose gradient) | 'secondary' (wine outline) | 'light' (for wine panels)
// size:    'sm' | 'md' | 'lg'
export default function Button({
  to,
  variant = 'primary',
  size = 'md',
  arrow = true,
  block = false,
  iconLeft = null,
  className = '',
  children,
  ...rest
}) {
  const classes = ['btn', `btn--${variant}`, `btn--${size}`, block && 'btn--block', className]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {iconLeft}
      <span>{children}</span>
      {arrow && <ArrowRight className="btn__arrow" size={16} strokeWidth={2.25} aria-hidden="true" />}
    </>
  );

  if (to) {
    return (
      <SmartLink to={to} className={classes} {...rest}>
        {content}
      </SmartLink>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}

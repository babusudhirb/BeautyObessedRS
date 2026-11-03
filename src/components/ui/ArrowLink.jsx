import { ArrowRight } from 'lucide-react';
import SmartLink from './SmartLink.jsx';
import './ui.css';

export default function ArrowLink({ to, className = '', children, ...rest }) {
  return (
    <SmartLink to={to} className={`arrow-link ${className}`.trim()} {...rest}>
      <span>{children}</span>
      <ArrowRight className="arrow-link__arrow" size={16} strokeWidth={2.25} aria-hidden="true" />
    </SmartLink>
  );
}

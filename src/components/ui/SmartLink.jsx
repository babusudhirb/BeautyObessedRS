import { Link } from 'react-router-dom';

const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

// Internal paths go through the router; anything with a scheme opens in a new tab.
export default function SmartLink({ to, children, ...rest }) {
  if (EXTERNAL.test(to)) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} {...rest}>
      {children}
    </Link>
  );
}

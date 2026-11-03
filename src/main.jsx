import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Self-hosted variable fonts: Fraunces (with its optical-size axis) for
// headlines, Inter for body copy.
import '@fontsource-variable/fraunces/opsz.css';
import '@fontsource-variable/inter';

import './styles/tokens.css';
import './styles/base.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

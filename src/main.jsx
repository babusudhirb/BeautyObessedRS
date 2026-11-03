import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Self-hosted variable fonts: Fraunces (with its optical-size axis) for
// headlines, Inter for body copy.
import '@fontsource-variable/fraunces/opsz.css';
import '@fontsource-variable/inter';
import './styles/fonts.css';

import './styles/tokens.css';
import './styles/base.css';
import App from './App.jsx';
import { loadCurrentPage } from './pages/lazyPages.js';

// The page being opened renders in one go, without a loading placeholder.
loadCurrentPage().finally(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});

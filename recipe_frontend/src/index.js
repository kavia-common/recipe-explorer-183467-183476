import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import SignInPage from './SignInPage';

// PUBLIC_INTERFACE
function injectGlobalCommonCss() {
  /** Injects the Figma global tokens/reset (public/assets/common.css) via a <link> element.
   * This avoids CRA's restriction on importing files outside of src.
   */
  if (typeof document === 'undefined') return;
  const href = '/assets/common.css';
  const existing = document.querySelector(`link[data-common-css="true"]`);
  if (existing) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.setAttribute('data-common-css', 'true');
  document.head.appendChild(link);
}

// A tiny router to switch between home and sign-in without adding new deps
function Router() {
  injectGlobalCommonCss();
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  if (path === '/sign-in') return <SignInPage />;
  return <App />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);

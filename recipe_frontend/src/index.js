import React, { useEffect } from 'react';
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

// PUBLIC_INTERFACE
function injectSignInCss() {
  /** Ensure the sign-in CSS from /assets is linked when at /sign-in for highest specificity cascade. */
  if (typeof document === 'undefined') return;
  const path = window.location.pathname;
  const id = 'link-signin-css';
  const existing = document.getElementById(id);
  if (path === '/sign-in') {
    if (!existing) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = '/assets/sign-in-11-235.css';
      document.head.appendChild(link);
    }
  } else if (existing) {
    // Remove when route changes away to avoid global bleed
    existing.remove();
  }
}

// A tiny router to switch between home and sign-in without adding new deps
function Router() {
  useEffect(() => {
    injectGlobalCommonCss();
    injectSignInCss();
  });

  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  if (path === '/sign-in') {
    // Wrap page with full-bleed container that won't enforce app padding/margins
    return (
      <div style={{minHeight: '100vh', background: 'transparent'}}>
        <SignInPage />
      </div>
    );
  }
  return <App />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);

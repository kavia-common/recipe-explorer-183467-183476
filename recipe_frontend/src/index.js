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

function injectSignInScript() {
  /** Attach the Figma behavior script for the sign-in screen after mount. */
  if (typeof document === 'undefined') return;
  const path = window.location.pathname;
  const id = 'script-signin';
  const existing = document.getElementById(id);
  if (path === '/sign-in') {
    if (!existing) {
      const s = document.createElement('script');
      s.id = id;
      s.src = '/assets/sign-in-11-235.js';
      s.async = true;
      document.body.appendChild(s);
    }
  } else if (existing) {
    existing.remove();
  }
}

// A tiny router to switch between home and sign-in without adding new deps
function Router() {
  useEffect(() => {
    // index.html already loaded common.css and conditionally the screen CSS.
    // The following calls are defensive in case of client-side transitions.
    injectGlobalCommonCss();
    injectSignInCss();
    injectSignInScript();
  });

  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  if (path === '/sign-in') {
    // Hard isolation container to reset all inherited styles and center canvas
    return (
      <div
        id="signin-sandbox"
        style={{
          all: 'initial',
          display: 'grid',
          placeContent: 'center',
          minHeight: '100vh',
          background: 'transparent',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale'
        }}
      >
        {/* Re-establish font family for the subtree after all: initial */}
        <div style={{fontFamily: "'Poppins','SF Pro Display', system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif"}}>
          <SignInPage />
        </div>
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

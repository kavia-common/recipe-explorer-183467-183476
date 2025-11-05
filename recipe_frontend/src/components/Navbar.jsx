import React from 'react';

// PUBLIC_INTERFACE
export default function Navbar({ onToggleTheme, isDark = false, favoritesCount = 0 }) {
  /** Top navigation bar with branding, favorites indicator, theme toggle, and Sign In link. */
  const isSignIn = typeof window !== 'undefined' && window.location.pathname === '/sign-in';

  // Use full-bleed navbar-inner on /sign-in to avoid side paddings affecting the canvas centering
  const innerClass = isSignIn ? 'navbar-inner navbar-inner--bleed' : 'container navbar-inner';

  return (
    <nav className="navbar" role="navigation" aria-label="Top Navigation">
      <div className={innerClass}>
        <a className="brand" aria-label="Recipe Explorer" href="/">
          <div className="brand-badge" aria-hidden>🍳</div>
          <div>
            <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
              <span style={{fontSize: 18}}>Recipe Explorer</span>
              <span className="badge">Ocean Professional</span>
            </div>
            <div style={{fontSize: 11, color: 'var(--color-muted)'}}>Discover. Cook. Enjoy.</div>
          </div>
        </a>
        <div className="nav-actions">
          <a href="/sign-in" className="icon-btn" aria-label="Sign In">
            🔐
          </a>
          <button className="icon-btn" aria-label="Favorites">
            <span role="img" aria-label="heart">❤️</span>
          </button>
          <span className="badge" aria-live="polite">{favoritesCount} saved</span>
          <button onClick={onToggleTheme} className="primary-btn" aria-label="Toggle Theme">
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>
    </nav>
  );
}

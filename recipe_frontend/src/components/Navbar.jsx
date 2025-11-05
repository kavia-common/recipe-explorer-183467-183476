import React from 'react';

// PUBLIC_INTERFACE
export default function Navbar({ onToggleTheme, isDark = false, favoritesCount = 0 }) {
  /** Top navigation bar with branding, favorites indicator, and theme toggle. */
  return (
    <nav className="navbar" role="navigation" aria-label="Top Navigation">
      <div className="container navbar-inner">
        <div className="brand" aria-label="Recipe Explorer">
          <div className="brand-badge" aria-hidden>🍳</div>
          <div>
            <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
              <span style={{fontSize: 18}}>Recipe Explorer</span>
              <span className="badge">Ocean Professional</span>
            </div>
            <div style={{fontSize: 11, color: 'var(--color-muted)'}}>Discover. Cook. Enjoy.</div>
          </div>
        </div>
        <div className="nav-actions">
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

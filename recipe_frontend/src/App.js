import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import RecipeGrid from './components/RecipeGrid';
import RecipeDetail from './components/RecipeDetail';
import { fetchRecipes } from './services/api';
import { getFavorites, toggleFavorite } from './services/storage';

// PUBLIC_INTERFACE
export default function App() {
  /**
   * Main application shell for Recipe Explorer.
   * - Applies Ocean Professional theme
   * - Manages search, view toggle, favorites, and selected recipe modal
   * - Fetches recipe data via API with env-configured base URL or mock fallback
   */
  const [isDark, setIsDark] = useState(false);
  const [query, setQuery] = useState('');
  const [view, setView] = useState('grid'); // 'grid' | 'list'
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [favoritesSet, setFavoritesSet] = useState(() => getFavorites());
  const [error, setError] = useState('');

  // Theme handling via data-theme for potential future CSS changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Fetch recipes (debounced on query)
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    const id = setTimeout(async () => {
      try {
        const data = await fetchRecipes(query.trim());
        if (active) {
          setRecipes(data);
        }
      } catch (e) {
        if (active) {
          setError('Unable to load recipes.');
        }
      } finally {
        if (active) setLoading(false);
      }
    }, 250);
    return () => {
      active = false;
      clearTimeout(id);
    };
  }, [query]);

  const onToggleFavorite = (id) => {
    const updated = toggleFavorite(id);
    setFavoritesSet(new Set(updated));
  };

  const favoritesCount = useMemo(() => favoritesSet.size, [favoritesSet]);

  return (
    <div>
      <Navbar
        onToggleTheme={() => setIsDark((v) => !v)}
        isDark={isDark}
        favoritesCount={favoritesCount}
      />

      <header className="header-hero">
        <div className="container header-hero-inner">
          <h1 className="title">Find your next favorite recipe</h1>
          <p className="subtitle">Search delicious ideas, explore details, and save favorites.</p>
          <SearchBar
            query={query}
            onChangeQuery={setQuery}
            view={view}
            onChangeView={setView}
          />
        </div>
      </header>

      <main className="container" aria-live="polite">
        {loading && (
          <div style={{padding: '18px 0'}}>
            <div className="skeleton" style={{height: 180, marginBottom: 12}} />
            <div className="skeleton" style={{height: 180, marginBottom: 12}} />
            <div className="skeleton" style={{height: 180}} />
          </div>
        )}
        {!loading && error && (
          <div role="alert" style={{
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.25)',
            color: '#991b1b',
            padding: 12,
            borderRadius: 10,
            marginTop: 16
          }}>
            {error}
          </div>
        )}
        {!loading && !error && !recipes?.length && (
          <div style={{padding: '28px 0', textAlign: 'center', color: 'var(--color-muted)'}}>
            No recipes found. Try a different search term.
          </div>
        )}
        {!loading && !!recipes?.length && (
          <RecipeGrid
            recipes={recipes}
            view={view}
            onOpen={setSelected}
            onToggleFavorite={onToggleFavorite}
            favoritesSet={favoritesSet}
          />
        )}

        <div className="footer-note">
          Tip: Use the heart icon on cards to save recipes you love.
        </div>
      </main>

      <RecipeDetail recipe={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

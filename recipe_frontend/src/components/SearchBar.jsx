import React from 'react';

// PUBLIC_INTERFACE
export default function SearchBar({ query, onChangeQuery, view, onChangeView }) {
  /** Search input and view toggle (grid/list). */
  return (
    <div className="searchbar inner-highlight" role="search">
      <div className="search-input" style={{flex: 1}}>
        <span aria-hidden>🔎</span>
        <input
          aria-label="Search recipes"
          placeholder="Search recipes, ingredients, tags…"
          value={query}
          onChange={(e) => onChangeQuery(e.target.value)}
        />
      </div>
      <div className="filter-row">
        <div className="toggle" role="tablist" aria-label="View toggle">
          <button
            className={view === 'grid' ? 'active' : ''}
            role="tab"
            aria-selected={view === 'grid'}
            onClick={() => onChangeView('grid')}
          >
            ⬛ Grid
          </button>
          <button
            className={view === 'list' ? 'active' : ''}
            role="tab"
            aria-selected={view === 'list'}
            onClick={() => onChangeView('list')}
          >
            ☰ List
          </button>
        </div>
      </div>
    </div>
  );
}

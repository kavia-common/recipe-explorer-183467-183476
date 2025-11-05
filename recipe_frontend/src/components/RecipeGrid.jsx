import React from 'react';
import RecipeCard from './RecipeCard';

// PUBLIC_INTERFACE
export default function RecipeGrid({ recipes, view = 'grid', onOpen, onToggleFavorite, favoritesSet }) {
  /** Grid/List renderer for recipes. */
  if (!recipes?.length) {
    return (
      <div style={{padding: '24px 0'}}>
        <div className="skeleton" style={{height: 120, marginBottom: 8}} />
        <div className="skeleton" style={{height: 120, marginBottom: 8}} />
        <div className="skeleton" style={{height: 120}} />
      </div>
    );
  }

  if (view === 'list') {
    return (
      <div style={{display: 'grid', gap: 12, padding: '18px 0 32px'}}>
        {recipes.map(r => (
          <div key={r.id} className="card" style={{display: 'grid', gridTemplateColumns: '160px 1fr', overflow: 'hidden'}}>
            <button
              onClick={() => onOpen(r)}
              aria-label={`Open details for ${r.title}`}
              style={{border: 'none', background: 'transparent', padding: 0, cursor: 'pointer'}}
            >
              <div className="card-thumb" style={{paddingTop: '100%', width: 160}}>
                <img src={r.image} alt={r.title} loading="lazy" />
              </div>
            </button>
            <div className="card-body">
              <div className="card-title-row">
                <h3 className="card-title">{r.title}</h3>
                <button
                  className={`fav-btn ${favoritesSet?.has(String(r.id)) ? 'active' : ''}`}
                  onClick={() => onToggleFavorite(r.id)}
                  aria-label="Toggle favorite"
                >
                  {favoritesSet?.has(String(r.id)) ? '★' : '☆'}
                </button>
              </div>
              <div className="meta">
                <div>⭐ {r.rating?.toFixed?.(1) ?? r.rating}</div>
                <div>⏱ {r.prepTime}m</div>
                <div style={{color: 'var(--color-secondary)', fontWeight: 700}}>View details →</div>
              </div>
              <div className="tags">
                {r.tags?.map(t => <span key={t} className="tag">#{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="recipe-grid" role="list">
      {recipes.map(r => (
        <div key={r.id} role="listitem">
          <RecipeCard
            recipe={r}
            onOpen={onOpen}
            onToggleFavorite={onToggleFavorite}
            isFavorite={favoritesSet?.has(String(r.id))}
          />
        </div>
      ))}
    </div>
  );
}

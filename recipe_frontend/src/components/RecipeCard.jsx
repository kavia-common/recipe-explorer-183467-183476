import React from 'react';

// PUBLIC_INTERFACE
export default function RecipeCard({ recipe, onOpen, onToggleFavorite, isFavorite }) {
  /** Recipe summary card with image, title, rating, time, tags, and favorite button. */
  return (
    <article className="card inner-highlight" aria-label={recipe.title}>
      <button
        className="card-thumb"
        onClick={() => onOpen(recipe)}
        aria-label={`Open details for ${recipe.title}`}
        style={{border: 'none', background: 'transparent', padding: 0, cursor: 'pointer'}}
      >
        <img src={recipe.image} alt={recipe.title} loading="lazy" />
      </button>
      <div className="card-body">
        <div className="card-title-row">
          <h3 className="card-title">{recipe.title}</h3>
          <button
            className={`fav-btn ${isFavorite ? 'active' : ''}`}
            aria-pressed={isFavorite}
            aria-label={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
            onClick={() => onToggleFavorite(recipe.id)}
            title={isFavorite ? 'Saved' : 'Save'}
          >
            {isFavorite ? '★' : '☆'}
          </button>
        </div>
        <div className="meta">
          <div title="Rating" aria-label={`Rating ${recipe.rating} out of 5`}>⭐ {recipe.rating?.toFixed?.(1) ?? recipe.rating}</div>
          <div title="Prep Time" aria-label={`Prep time ${recipe.prepTime} minutes`}>⏱ {recipe.prepTime}m</div>
        </div>
        <div className="tags" aria-label="Tags">
          {recipe.tags?.slice(0, 3).map((t) => (
            <span key={t} className="tag">#{t}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

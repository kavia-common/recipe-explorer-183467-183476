import React, { useEffect } from 'react';

// PUBLIC_INTERFACE
export default function RecipeDetail({ recipe, onClose }) {
  /** Modal with recipe details: image, meta, ingredients, steps, nutrition. */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!recipe) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={`${recipe.title} details`} onClick={onClose}>
      <div className="modal inner-highlight" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
            <strong>{recipe.title}</strong>
            <span className="tag">⭐ {recipe.rating}</span>
            <span className="tag">⏱ {recipe.prepTime}m</span>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close details">✖</button>
        </div>
        <div className="modal-body">
          <div style={{display: 'grid', gap: 16, gridTemplateColumns: '1.25fr 1fr'}}>
            <div>
              <div className="card-thumb" style={{paddingTop: '56%'}}>
                <img src={recipe.image} alt={recipe.title} />
              </div>
              <div className="divider" />
              <h4 className="section-title">Steps</h4>
              <ol style={{margin: 0, paddingLeft: 18}}>
                {recipe.steps?.map((s, i) => <li key={i} style={{marginBottom: 8}}>{s}</li>)}
              </ol>
            </div>
            <div>
              <h4 className="section-title">Ingredients</h4>
              <ul style={{margin: 0, paddingLeft: 18}}>
                {recipe.ingredients?.map((ing, i) => <li key={i} style={{marginBottom: 6}}>{ing}</li>)}
              </ul>
              <div className="divider" />
              <h4 className="section-title">Nutrition</h4>
              <div style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>
                {recipe.nutrition ? Object.entries(recipe.nutrition).map(([k, v]) => (
                  <span key={k} className="tag" style={{fontWeight: 700}}>{k}: {v}</span>
                )) : (
                  <span className="tag">Data not available</span>
                )}
              </div>
              <div className="divider" />
              <h4 className="section-title">Tags</h4>
              <div className="tags">
                {recipe.tags?.map(t => <span key={t} className="tag">#{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

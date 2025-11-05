/**
 * Local storage helpers for favorites.
 */

const KEY = 'recipe_favorites';

// PUBLIC_INTERFACE
export function getFavorites() {
  /** Return a Set of favorite recipe IDs from localStorage. */
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return new Set(arr.map(String));
  } catch {
    return new Set();
  }
}

// PUBLIC_INTERFACE
export function toggleFavorite(id) {
  /** Toggle a favorite ID and persist. Returns the new Set. */
  const set = getFavorites();
  const strId = String(id);
  if (set.has(strId)) set.delete(strId);
  else set.add(strId);
  try {
    localStorage.setItem(KEY, JSON.stringify(Array.from(set)));
  } catch {
    // ignore storage errors
  }
  return set;
}

// PUBLIC_INTERFACE
export function isFavorite(id) {
  /** Check if id is a favorite. */
  return getFavorites().has(String(id));
}

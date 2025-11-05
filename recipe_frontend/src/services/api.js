/**
 * API client abstraction for Recipe Explorer.
 * Reads base URL from REACT_APP_API_BASE or REACT_APP_BACKEND_URL.
 * Falls back to mock data if no backend is available or request fails.
 */

// PUBLIC_INTERFACE
export function getApiBaseUrl() {
  /** Determine API base URL from environment variables. */
  const base =
    process.env.REACT_APP_API_BASE ||
    process.env.REACT_APP_BACKEND_URL ||
    '';
  return base.replace(/\/+$/, '');
}

const BASE = getApiBaseUrl();

const MOCK_RECIPES = [
  {
    id: '1',
    title: 'Lemon Garlic Salmon',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
    rating: 4.7,
    prepTime: 20,
    tags: ['Seafood', 'Dinner', 'Healthy'],
    ingredients: [
      '2 salmon fillets',
      '2 tbsp olive oil',
      '2 cloves garlic, minced',
      '1 lemon (juice + zest)',
      'Salt & pepper',
      'Fresh dill',
    ],
    steps: [
      'Preheat oven to 400°F (200°C).',
      'Mix olive oil, garlic, and lemon juice.',
      'Season salmon, place on tray, brush with mixture.',
      'Bake 12–15 min until flaky. Garnish with dill.',
    ],
    nutrition: { calories: 420, protein: '34g', carbs: '4g', fat: '28g' },
  },
  {
    id: '2',
    title: 'Creamy Mushroom Pasta',
    image:
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=1200&auto=format&fit=crop',
    rating: 4.5,
    prepTime: 25,
    tags: ['Vegetarian', 'Comfort'],
    ingredients: [
      '200g pasta',
      '300g mushrooms, sliced',
      '2 tbsp butter',
      '2 cloves garlic',
      '150ml cream',
      'Parmesan, parsley',
    ],
    steps: [
      'Cook pasta until al dente.',
      'Sauté mushrooms with butter and garlic.',
      'Add cream, simmer 3–4 min.',
      'Toss pasta, top with parmesan and parsley.',
    ],
    nutrition: { calories: 520, protein: '16g', carbs: '64g', fat: '22g' },
  },
  {
    id: '3',
    title: 'Mediterranean Quinoa Bowl',
    image:
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200&auto=format&fit=crop',
    rating: 4.6,
    prepTime: 30,
    tags: ['Gluten-free', 'Lunch', 'Healthy'],
    ingredients: [
      '1 cup quinoa',
      'Cherry tomatoes',
      'Cucumber',
      'Olives',
      'Feta',
      'Olive oil, lemon',
    ],
    steps: [
      'Cook quinoa according to package.',
      'Chop vegetables.',
      'Toss with olive oil and lemon.',
      'Top with feta and olives.',
    ],
    nutrition: { calories: 460, protein: '18g', carbs: '58g', fat: '16g' },
  },
];

// PUBLIC_INTERFACE
export async function fetchRecipes(query = '') {
  /**
   * Fetch recipes from backend using optional search query.
   * Falls back to mock data on error or if no base URL is set.
   */
  const url = BASE
    ? `${BASE}/recipes${query ? `?q=${encodeURIComponent(query)}` : ''}`
    : '';
  if (!url) {
    // Simulate async latency
    await new Promise((r) => setTimeout(r, 200));
    return MOCK_RECIPES;
  }
  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.items)) return data.items;
    return MOCK_RECIPES;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Falling back to mock recipes due to error:', e?.message || e);
    return MOCK_RECIPES;
  }
}

// PUBLIC_INTERFACE
export async function fetchRecipeById(id) {
  /** Fetch a single recipe by id, with mock fallback. */
  const url = BASE ? `${BASE}/recipes/${encodeURIComponent(id)}` : '';
  if (!url) {
    await new Promise((r) => setTimeout(r, 150));
    return MOCK_RECIPES.find((r) => r.id === String(id)) || null;
  }
  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    return MOCK_RECIPES.find((r) => r.id === String(id)) || null;
  }
}

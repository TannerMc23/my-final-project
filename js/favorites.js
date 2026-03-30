// Get favorites from localStorage
export function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

// Save favorites
function saveFavorites(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Add game to favorites
export function addFavorite(game) {
  const favorites = getFavorites();

  // prevent duplicates
  if (!favorites.find(fav => fav.id === game.id)) {
    favorites.push(game);
    saveFavorites(favorites);
  }
}

// Remove game
export function removeFavorite(id) {
  let favorites = getFavorites();
  favorites = favorites.filter(game => game.id !== id);
  saveFavorites(favorites);
}
import { getFavorites, removeFavorite } from "./favorites.js";

const container = document.getElementById("favoritesContainer");

function displayFavorites() {
  const favorites = getFavorites();
  container.innerHTML = "";

  if (favorites.length === 0) {
    container.innerHTML = "<p>No favorites yet.</p>";
    return;
  }

  favorites.forEach(game => {
    const card = document.createElement("div");
    card.classList.add("game-card");

    card.innerHTML = `
      <img src="${game.background_image}">
      <h3>${game.name}</h3>
      <button data-id="${game.id}">Remove</button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      removeFavorite(game.id);
      displayFavorites();
    });

    container.appendChild(card);
  });
}

displayFavorites();
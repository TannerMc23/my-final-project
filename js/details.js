import { fetchGameDetails, fetchTrailer } from "./api.js";
import { addFavorite } from "./favorites.js";

const params = new URLSearchParams(window.location.search);
const gameId = params.get("id");

async function loadDetails() {
  const game = await fetchGameDetails(gameId);
  const trailer = await fetchTrailer(game.name);

  const container = document.getElementById("gameDetails");

  container.innerHTML = `
  <button onclick="history.back()">⬅ Back</button>

  <h1>${game.name}</h1>
  <img src="${game.background_image}">
  <p>${game.description_raw}</p>
  <p>Rating: ${game.rating}</p>

  <button id="favBtn">⭐ Add to Favorites</button>

  ${
    trailer
      ? `<iframe src="https://www.youtube.com/embed/${trailer}" allowfullscreen></iframe>`
      : "<p>No trailer available</p>"
  }
`;
document.getElementById("favBtn").addEventListener("click", () => {
  addFavorite(game);
  alert("Added to favorites!");
});

}

loadDetails();

export function displayGames(games, reset = false) {
  const container = document.getElementById("gamesContainer");

  if (reset) {
    container.innerHTML = "";
  }

  games.forEach(game => {
    const card = document.createElement("div");
    card.classList.add("game-card");

    card.innerHTML = `
      <img src="${game.background_image}">
      <h3>${game.name}</h3>
      <p>Rating: ${game.rating}</p>
    `;

    card.addEventListener("click", () => {
      window.location.href = `details.html?id=${game.id}`;
    });

    container.appendChild(card);
  });
}
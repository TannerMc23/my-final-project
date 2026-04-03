import { fetchGameDetails, fetchTrailer } from "./api.js";
import { addFavorite, isFavorite } from "./favorites.js";

const params = new URLSearchParams(window.location.search);
const gameId = params.get("id");

async function loadDetails() {
  const game = await fetchGameDetails(gameId);
  const trailer = await fetchTrailer(game.name);

  const container = document.getElementById("gameDetails");

  const genres = game.genres.map(g => g.name).join(", ") || "N/A";
  const platforms = game.platforms.map(p => p.platform.name).join(", ")  || "N/A";
  const releaseDate = game.released || "N/A";

  const alreadyFavorited = isFavorite(game.id);

  container.innerHTML = `
    <button onclick="history.back()">⬅ Back</button>

    <h1>${game.name}</h1>

    <img src="${game.background_image}" alt="${game.name}">

    <p><strong>Rating:</strong> ${game.rating}</p>
    <p><strong>Release Date:</strong> ${releaseDate}</p>
    <p><strong>Genres:</strong> ${genres}</p>
    <p><strong>Platforms:</strong> ${platforms}</p>

    <p>${game.description_raw}</p>

    <button id="favBtn" ${alreadyFavorited ? "disabled" : ""}>
  ${alreadyFavorited ? "★ Added" : "⭐ Add to Favorites"}
    </button>

    ${
      trailer
        ? `<iframe src="https://www.youtube.com/embed/${trailer}" allowfullscreen></iframe>`
        : "<p>No trailer available</p>"
    }
  `;

  const favBtn = document.getElementById("favBtn");

if (!alreadyFavorited) {
  favBtn.addEventListener("click", () => {
    addFavorite({
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      rating: game.rating,
      genres,
      platforms
    });

    favBtn.textContent = "★ Added";
    favBtn.disabled = true;
  });
}
}

loadDetails();

// export function displayGames(games, reset = false) {
//   const container = document.getElementById("gamesContainer");

//   if (reset) {
//     container.innerHTML = "";
//   }

//   games.forEach(game => {
//     const card = document.createElement("div");
//     card.classList.add("game-card");

//     card.innerHTML = `
//       <img src="${game.background_image}">
//       <h3>${game.name}</h3>
//       <p>Rating: ${game.rating}</p>
//     `;

//     card.addEventListener("click", () => {
//       window.location.href = `details.html?id=${game.id}`;
//     });

//     container.appendChild(card);
//   });
// }
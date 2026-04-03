export function displayGames(games) {
  const container = document.getElementById("gamesContainer");
  container.innerHTML = "";

  container.style.display = "grid";

  games.forEach(game => {
    const card = document.createElement("div");
    card.classList.add("game-card");

    card.innerHTML = `
      <img src="${game.background_image}" alt="${game.name}">
      <h3>${game.name}</h3>
      <p>Rating: ${game.rating}</p>
    `;

    // 🔥 Add this
    card.addEventListener("click", () => {
      window.location.href = `details.html?id=${game.id}`;
    });

    container.appendChild(card);
  });

}

export function showLoading() {
  const container = document.getElementById("gamesContainer");

  // REMOVE grid so flex centering works
  container.style.display = "block";

  container.innerHTML = `
    <div class="loading">
      <p>Loading games...</p>
    </div>
  `;
}
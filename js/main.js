import { fetchGames } from "./api.js";
import { displayGames } from "./display.js";

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", async () => {
  const query = searchInput.value;
  const games = await fetchGames(query);
  displayGames(games);
});
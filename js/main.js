import { fetchGames } from "./api.js";
import { displayGames, showLoading } from "./display.js";

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const genreFilter = document.getElementById("genreFilter");
const platformFilter = document.getElementById("platformFilter");

let currentPlatform = "";
let currentPage = 1;
let currentQuery = "";
let currentGenre = "";

// 🔍 SEARCH
searchBtn.addEventListener("click", async () => {
  showLoading();
  currentQuery = searchInput.value;
  currentPage = 1;
  currentGenre = ""; // reset genre on new search

  const games = await fetchGames(currentQuery, currentPage, currentGenre, currentPlatform);
  displayGames(games, true);
});

// 🎯 GENRE FILTER
genreFilter.addEventListener("change", async () => {
  showLoading();
  currentGenre = genreFilter.value;
  currentPage = 1;

  const games = await fetchGames(currentQuery, currentPage, currentGenre, currentPlatform);
  displayGames(games, true);
});

// ➕ LOAD MORE
loadMoreBtn.addEventListener("click", async () => {
  showLoading();
  currentPage++;

  const games = await fetchGames(currentQuery, currentPage, currentGenre, currentPlatform);
  displayGames(games);
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

platformFilter.addEventListener("change", async () => {
  showLoading();

  currentPlatform = platformFilter.value;
  currentPage = 1;

  const games = await fetchGames(
    currentQuery,
    currentPage,
    currentGenre,
    currentPlatform
  );

  displayGames(games, true);
});
import { fetchGames } from "./api.js";
import { displayGames } from "./display.js";

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const genreFilter = document.getElementById("genreFilter");

let currentPage = 1;
let currentQuery = "";
let currentGenre = "";

// 🔍 SEARCH
searchBtn.addEventListener("click", async () => {
  currentQuery = searchInput.value;
  currentPage = 1;
  currentGenre = ""; // reset genre on new search

  const games = await fetchGames(currentQuery, currentPage, currentGenre);
  displayGames(games, true);
});

// 🎯 GENRE FILTER
genreFilter.addEventListener("change", async () => {
  currentGenre = genreFilter.value;
  currentPage = 1;

  const games = await fetchGames(currentQuery, currentPage, currentGenre);
  displayGames(games, true);
});

// ➕ LOAD MORE
loadMoreBtn.addEventListener("click", async () => {
  currentPage++;

  const games = await fetchGames(currentQuery, currentPage, currentGenre);
  displayGames(games);
});
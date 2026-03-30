import { RAWG_API_KEY } from "../data/config.js";

export async function fetchGames(query) {
  const url = `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${query}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
}
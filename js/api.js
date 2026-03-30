import { RAWG_API_KEY, YOUTUBE_API_KEY } from "../data/config.js";

// 🔍 Fetch list of games (SEARCH PAGE)
export async function fetchGames(query, page = 1, genre = "") {
    let url = `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${query}&page=${page}`;

    if (genre) {
        url += `&genres=${genre}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching games:", error);
        return [];
    }
}

// 🎮 Fetch single game details (DETAILS PAGE)
export async function fetchGameDetails(id) {
    const url = `https://api.rawg.io/api/games/${id}?key=${RAWG_API_KEY}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching game details:", error);
        return null;
    }
}

// ▶️ Fetch YouTube trailer
export async function fetchTrailer(name) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${name}+trailer&type=video&maxResults=1&key=${YOUTUBE_API_KEY}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        // ⚠️ Prevent crash if no trailer found
        if (data.items.length === 0) return null;

        return data.items[0].id.videoId;
    } catch (error) {
        console.error("Error fetching trailer:", error);
        return null;
    }
}
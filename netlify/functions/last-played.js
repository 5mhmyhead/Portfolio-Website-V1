import fetch from "node-fetch";

export const handler = async () => {
  // CORRECTED: Use the official ws.audioscrobbler endpoint
  const LASTFM_API = "https://ws.audioscrobbler.com/2.0/";
  const API_KEY = process.env.LASTFM_API_KEY;
  const USER = process.env.LASTFM_USER;

  // Debugging: Log the user to your Netlify function console to verify it's you
  console.log(`Fetching tracks for user: ${USER}`);

  const ENDPOINT = `${LASTFM_API}?method=user.getrecenttracks&user=${USER}&api_key=${API_KEY}&format=json&limit=1`;

  try {
    const response = await fetch(ENDPOINT);
    const data = await response.json();

    if (data.error) {
      return { statusCode: 400, body: JSON.stringify({ error: data.message }) };
    }

    const track = data.recenttracks.track[0];

    const result = {
      artist: track.artist["#text"],
      title: track.name,
      url: track.url,
      // Optional: Check if currently playing
      nowPlaying: track["@attr"]?.nowplaying === "true",
    };

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch data" }),
    };
  }
};

fetch("http://dwyanesido.netlify.app/.netlify/functions/last-played")
  .then((res) => res.json())
  .then((track) => {
    let lastPlayed = document.querySelector("#last-played");
    lastPlayed.innerHTML = `${track.title} (${track.artist})`;
  });

export const handler = async () => {
  const API_KEY = process.env.LASTFM_API_KEY;
  const USER = process.env.LASTFM_USER;
  const ENDPOINT = `https://audioscrobbler.com{USER}&api_key=${API_KEY}&format=json&limit=1`;

  try {
    // We use the built-in fetch (available in Node 18+)
    const response = await fetch(ENDPOINT);
    const data = await response.json();

    if (!data.recenttracks || !data.recenttracks.track[0]) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "No tracks found" }),
      };
    }

    const track = data.recenttracks.track[0];
    const result = {
      artist: track.artist["#text"],
      title: track.name,
      url: track.url,
      nowPlaying: track["@attr"]?.nowplaying === "true",
    };

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};

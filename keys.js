
console.log('this is loaded');

const spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

const BAND_ID = "codingbootcamp";

const OMDB_KEY ="63f442ef";

module.exports = {
  BAND_ID: BAND_ID,
  OMDB_KEY: OMDB_KEY,
  SPOTIFY_KEY: spotify
}
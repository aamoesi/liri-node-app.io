##LIRI Bot

###Overview
In this assignment, I made a LIRI. LIRI is like iPhone’s SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.
Expected Outcomes

The LIRI Bot was designed to produce search results based on the following commands:
* node liri.js concert-this
* node liri.js spotify-this-song
* node liri.js movie-this
* node liri.js do-what-it-says
Each command produced different search results as listed below:
* node liri.js concert-this “artist/band name”
    * Name of venue
    * Venue location
    * Date of the event in MM/DD/YYYY format

1. 	node liri.js spotify-this-song “song/track name”
    1. Artist
o	Song
o	Spotify song preview url
o	Album
•	node liri.js movie-this “movie title”
o	Title of the movie
o	Year the movie came out
o	IMDB Rating of the movie
o	Country where the movie was produced
o	Language of the movie
o	Plot of the movie
o	Actors in the movie
o	Rotten Tomatoes Rating of the movie
•	node liri.js do-what-it-says
o	Print the spotify results for “I want it that way” stored in the random.txt file
Code by Command
concert-this
This command used the Bands in Town Artist Events API. An axios.get sent the search request and the results were console.logged using moment to change the format of the returned date.


let concertThis = function (userInput) {
    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp").then(
        function (response, err) {
            console.log(response.data[0].venue.name);
            console.log(response.data[0].venue.city);
            console.log(moment(response.data[0].datetime).format("MM-DD-YYYY"));

        })
};

spotify-this-song
This command used the Spotify request API. A node-spotify-api spotify.request sent the search request and the results were console.logged.


let spotifyThisSong = function (userInput) {


    const Spotify = require("node-spotify-api");
    //console.log(keys.SPOTIFY_KEY);
    const spotify = new Spotify(keys.SPOTIFY_KEY);

    spotify.search({
        type: 'track',
        query: userInput
    }, function (err, response) {
        if (err) {
            return console.log(`Error present: ${err}`);
        }
        //console.log(JSON.stringify(response));
        console.log('Song: ${response.tracks.items[0].name}');
        console.log('Album: ${response.tracks.items[0].album.name}');
        console.log('Artist: ${response.tracks.items[0].artists[0].name}');
        console.log('Preview: ${response.tracks.items[0].preview_url}');

        if (!userInput) {
            userInput = "Honey Hold Me";
        }
    });
}

movie-this
This command used the omdb API. An axios.get sent the search request and the results were console.logged.


let movieThis = function (userInput) {
    if (!userInput) {
        userInput = "Mr. Nobody";
    }
    axios.get("http://www.omdbapi.com/?t=" + userInput + "&it&apikey=trilogy").then(
        function (response, err) {
            let results = JSON.stringify(response.data);
            console.log("The movie's information is: " + results);
        })
};


do-what-it-says
This command pulled the spotify-this-song information from the local random.txt file.


var doWhatItSays = function () {
    let data = "";
    fs.readFile("random.txt", 'utf-8', function (err, response) {
        // console.log(response.split(','))
        let result = response.split(",");
        console.log(result)
        spotifyThisSong(result[1]);
        //data = `${result[1]}\n`;
        console.log(data);
    });
};

Spotify API, Client ID & Client SECRET
The Spotify API requires developers to sign up and generate the necessary API credentials (client id and client secret):

Step One: Visit https://developer.spotify.com/my-applications/#!/
Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in
Step Three: Once logged in, navigate to https://developer.spotify.com/my-applications/#!/applications/create to register a new application to be used with the Spotify API. When finished, click the “complete” button
Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you’ll need them to use the Spotify API and the node-spotify-api package.
As a security precaution the Spotify Client ID & SECRET were stored on a local .env file and added to a local .gitignore file to avoid publishing the information.

Require & Local Linked files
LIRI required installation of several npm packages and links to local files.

let dotenv = require("dotenv").config();
let moment = require("moment");
let keys = require("./keys.js");
let fs = require("fs");
let axios = require("axios");


SCREENSHOTS
all screenshots are in image folder


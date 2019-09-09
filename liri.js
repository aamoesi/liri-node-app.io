let dotenv = require("dotenv").config();
let moment = require("moment");
let keys = require("./keys.js");
let fs = require("fs");
let axios = require("axios");
var Spotify = require("node-spotify-api");
let arguments = process.argv;

let userMethod = process.argv[2];
let userInput = process.argv.slice(3).join(" ");


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

let concertThis = function (userInput) {
    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp").then(
        function (response, err) {
            console.log(response.data[0].venue.name);
            console.log(response.data[0].venue.city);
            console.log(moment(response.data[0].datetime).format("MM-DD-YYYY"));

        })
};


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


// let doWhatItSays = function (userInput) {
//     if (process.argv[2] == "do-what-i-say") {
//         fs.readFile("random.txt", "utf8", function (err, result, data) {
//             if (err) {
//                 console.log("Error alert")
//             } else {
//                 let result = result.split(",");
//                 spotifyThisSong(result)[1];
//                 data = `${result[1]}\n`;
//                 output(data);
//             }
//         })
//     }
// };


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



if (process.argv[2] == "spotify-this") {
    spotifyThisSong(userInput);
} else if (process.argv[2] == "movie-this") {
    movieThis(userInput);
} else if (process.argv[2] == "concert-this") {
    concertThis(userInput);
} else {
    doWhatItSays(userInput);
};
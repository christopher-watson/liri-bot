require("dotenv").config();
var keys = require('./keys');
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});
// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

var arg2 = process.argv[2];
var arg3 = process.argv.splice(3, process.argv.length - 1).join(' ');
// console.log('arg3 test' + arg3.length)
// console.log('arg3 test' + process.argv[3]);


// RETURNS LAST 20 TWEETS FROM TIMELINE
if (arg2 === 'my-tweets') {
  client.get('statuses/user_timeline', function (error, tweets, response) {
    if (error) {
      console.log(`Sorry we couldn't retrieve your tweets`);
    }
    if (!error) {
      console.log(`\nTweets by ${tweets[0].user.screen_name}:\n`);
      for (var i = 0; i < tweets.length; i++) {
        if (tweets.length < 20) {
          console.log(tweets[i].text);
          console.log(` - ${tweets[i].created_at.slice(0, 19)}`);
          console.log('----------------------\n');
        }
      }
    }
  });
};

//SPOTIFY SEARCH FOR THE SIGN
if ((arg2 === 'spotify-this-song') && (process.argv[3] == undefined)) {
  console.log('THE SUN IS RUNNING');
  spotify
    .search({
      type: 'track',
      query: 'The Sign Ace of Base'
    })
    .then(function (data) {
      // console.log('no arg 3');
      console.log(`\nArtist: ${data.tracks.items[0].album.artists[0].name}`);
      console.log(`Track Title: ${data.tracks.items[0].name}`);
      console.log(`Link: ${data.tracks.items[0].external_urls.spotify}`);
      console.log(`Album: ${data.tracks.items[0].album.name}`);
    })
    .catch(function (err) {
      console.log('Error occurred: ' + err);
    });
  console.log('THE SUN IS DONE RUNNING');
};

//SPOTIFY SEARCH FOR ARG3 PARAMETER
if ((arg2 === 'spotify-this-song') && (process.argv[3] !== 'undefined')) {
  console.log('THE SEARCH IS RUNNING')
  spotify
    .search({
      type: 'track',
      query: arg3
    })
    .then(function (data) {
      // console.log('arg3 ' + arg3);
      console.log(`\nSpotify Search`);
      console.log(`--------------\n`);
      console.log(`Artist: ${data.tracks.items[0].album.artists[0].name}`);
      console.log(`Track Title: ${data.tracks.items[0].name}`);
      console.log(`Link: ${data.tracks.items[0].external_urls.spotify}`);
      console.log(`Album: ${data.tracks.items[0].album.name}`);
    })
    .catch(function (err) {
      console.log('Error occurred: ' + err);
    });
  console.log('THE SEARCH IS DONE RUNNING');
};


//OMDB
if (arg2 === 'movie-this') {
  request("http://www.omdbapi.com/?t=" + arg3 + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

    if (!error && response.statusCode === 200) {
      // console.log(JSON.parse(body));
      console.log(`\nMovie Search`);
      console.log(`------------\n`);
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language(s): " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    }
  });
}
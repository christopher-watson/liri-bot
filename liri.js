require("dotenv").config();
var keys = require('./keys');
var request = require("request");
var fs = require("fs");
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

switch (arg2) {
  case 'my-tweets':
    myTweets();
    break;
  case 'spotify-this-song':
    if (arg3) {
      searchSpotify(arg3);
      addToRandom(arg2, arg3);
    } else {
      searchSpotify('The Sign Ace of Base');
    }
    break;
  case 'movie-this':
    if (arg3) {
      movieSearch(arg3);
      addToRandom(arg2, arg3);
    } else {
      movieSearch('Mr Nobody');
    }
    break;
  case 'do-what-it-says':
    doFunction();
    break;
  default:
    console.log('\nInvalid Entry. "my-tweets", "spotify-this-song", "movie-this" or "do-what-it-says"');
}


// RETURNS LAST 20 TWEETS FROM TIMELINE
function myTweets() {
  client.get('statuses/user_timeline', function (error, tweets, response) {
    if (error) {
      console.log('Twitter Error: \n' + error);
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


//SPOTIFY SEARCH
function searchSpotify(a) {
  spotify
    .search({
      type: 'track',
      query: a
    })
    .then(function (data) {
      console.log(`\nSpotify Search`);
      console.log(`--------------\n`);
      console.log(`Artist: ${data.tracks.items[0].album.artists[0].name}`);
      console.log(`Track Title: ${data.tracks.items[0].name}`);
      console.log(`Link: ${data.tracks.items[0].external_urls.spotify}`);
      console.log(`Album: ${data.tracks.items[0].album.name}`);
    })
    .catch(function (err) {
      console.log('Spotify Error: \n' + err);
    });
};


//OMDB
function movieSearch(a) {
  request("http://www.omdbapi.com/?t=" + a + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

    if (!error && response.statusCode === 200) {
      console.log(`\nMovie Search`);
      console.log(`------------\n`);
      console.log('Title: ' + JSON.parse(body).Title);
      console.log('Release Year: ' + JSON.parse(body).Year);
      console.log('IMDB Rating: ' + JSON.parse(body).Ratings[0].Value);
      console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value);
      console.log('Country: ' + JSON.parse(body).Country);
      console.log('Language(s): ' + JSON.parse(body).Language);
      console.log('Plot: ' + JSON.parse(body).Plot);
      console.log('Actors: ' + JSON.parse(body).Actors);
    }
    if (a === 'Mr Nobody') {
      console.log(`\nIf you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/\nIt's on Netflix!`);
    }

    if(error){
      console.log('Movie Error: \n' + error);
    }
  });
};

function doFunction() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log('Read Error' + error);
    };
    var random = data.split(",");
    var randNum = Math.round(Math.random() * (random.length - 3));
    if ((randNum % 2 === 0) && (randNum >= 0)) {
      a = randNum;
    } else {
      a = randNum + 1;
    };
    var b = a + 1;
    switch (random[a]) {
      case 'my-tweets':
        myTweets();
        break;
      case 'spotify-this-song':
        if (random[b]) {
          searchSpotify(random[b]);
        } else {
          searchSpotify('The Sign Ace of Base');
        }
        break;
      case 'movie-this':
        if (random[b]) {
          movieSearch(random[b]);
        } else {
          movieSearch('Mr Nobody');
        }
        break;
      default:
        console.log('\nInvalid Entry. "my-tweets", "spotify-this-song", "movie-this" or "do-what-it-says"');
    };
  });
};

function addToRandom(x, y) {
  if (x !== 'do-what-it-says') {
    fs.appendFile('random.txt', x + ',' + y + ',', function (error) {
      if (error) {
        console.log('Write Error: ' + error);
      } else {
        console.log('- Added to random.txt!');
      }
    });
  };
};
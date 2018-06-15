# liri-bot

_Christopher Watson_

A Language Interpretation and Recognition Interface

Liri-bot was created as a node command line tool to browse music, movies and social media

Current social media applications supported:

- Twitter

In order to use liri-bot you must first clone the liri-bot repo

**You must have a spotify and twitter account for this application to work**

* Clone this repository 

* Run `npm install` at the folder location to install dependencies

* Create developer keys for your spotify and twitter accounts

> [Spotify Developer] (https://developer.spotify.com) 

> [Twitter Developer] (https://developer.twitter.com)

> Locate the following keys and insert/save to a `.env` file

```javascript
TWITTER_CONSUMER_KEY=""
TWITTER_CONSUMER_SECRET=""
TWITTER_ACCESS_TOKEN_KEY=""
TWITTER_ACCESS_TOKEN_SECRET=""

SPOTIFY_ID=""
SPOTIFY_SECRET=""
```

* Move `.env` file to liri-bot folder

* Run the following commands and enjoy!

 `my-tweets`

`spotify-this-song` `<song name>`

`movie-this` `<movie name>`

`do-what-it-says`
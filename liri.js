require("dotenv").config();
var keys = require("./keys");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");

var getMyTweets=function(){
  var client = new Twitter(keys.twitter);
  var params = {screen_name: "awidowsblanket"};
  client.get("statuses/user_timeline", params, function(error, tweets, response) {
    if (error) {
      console.log(error);
    }
    if (!error) {
      for(var i=0;i<tweets.length;i++){
        console.log(tweets[i].created_at);
        console.log('');
        console.log(tweets[i].text);
      }
    }
  });
};

var getArtistName = function(artist) {
  return artist.name;
}


var getMySpotify = function(songName) {
  var spotify = new Spotify({
    id: keys.spotify.id,
    secret:keys.spotify.secret,
  });
  spotify.search({
      type: 'track',
      query: songName,
    },
    function(err, data) {
      if (err) {
        console.log(err);
        return;
      }
      // console.log(data);
      var songs = data.tracks.items;
      for (var i = 0; i < songs.length; i++) {
        console.log(i);
        // console.log(songs[i])
        console.log('artist:' + songs[i].artists.map(function(artist) {
          return artist.name
        }))
        console.log('song name:' + songs[i].name);
        console.log('album name:' + songs[i].album.name);
        console.log('preview song:' + songs[i].preview_url);
        console.log('----------');

      }
    });
}
var getMyMovies=function(){
  request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {
  if (!error && response.statusCode === 200) {
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
  }

  })
};

var runCommand=function(){
  fs.readFile('random.txt', 'UTF8',function(err, data) {
    if (err) throw err;
    console.log(data);
  });
}

var pick=function(caseData,functionData){
  switch(caseData){
    case "my-tweets":
    getMyTweets();
    break;
    case "spotify-this-song":
    getMySpotify(functionData);
    case "movie-this":
    getMyMovies(functionData);
    default:
    console.log('LIRI does not know that');
   }
};

  var runThis=function(argOne,argTwo){
    pick(argOne,argTwo);
  };
    
runThis(process.argv[2], process.argv[3]);




  
  
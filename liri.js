require("dotenv").config();

var keys = require("./keys");

// console.log(keys);

var Twitter = require("twitter");

var Spotify = require("spotify");

var request = require("request");

var getMyTweets=function(){
  var client = new Twitter(keys.twitter);
  var params = {screen_name: "awidowsblanket"};
  client.get("statuses/user_timeline", params, function(error, tweets, response) {
    if (error) {
      console.log(error);
    }
    if (!error) {
      // console.log(tweets);
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
  Spotify.search({
      type: 'track',
      query: songName,
    },
    function(err, data) {
      if (err) {
        console.log(err);
        return;
      }
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

// var getMySpotify=function(songName){
// SpotifyWebApi.search({ type: 'track', query: 'songName' }, function(err, data) {
//     if ( err ) {
//         console.log('Error occurred: ' + err);
//         return;
//     }
//     console.log(data);
// });
  
    
// }     


var pick=function(caseData,functionData){
  switch(caseData){
    case "my-tweets":
    getMyTweets();
    break;
    case "spotify-this-song":
    getMySpotify(functionData);
    default:
    console.log('LIRI does not know that');
   }
};

  var runThis=function(argOne,argTwo){
    pick(argOne,argTwo);
  };
    
runThis(process.argv[2], process.argv[3]);




  
  
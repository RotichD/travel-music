var playlistNumber = 0;
var playlistContainerEl = document.querySelector("#playlist-box");

// Returns a random playlist and embeds the player in HTML

// Playlist Embedded Codes Arrays for each weather condition


// if clear or temp > 70 then random related playlists
var warmSongs = ["37i9dQZF1DX7KNKjOK0o75", "37i9dQZF1DX6GwdWRQMQpq", "37i9dQZF1DX3rxVfibe1L0"];


// if clear and temp > 80 then random related playlists
var hotSongs = [];


// switch statement if rain or drizzle or fog or cloudy or mist 
var chillSongs = [];


// switch statement if smoke or haze or dust or sand or ash
var dustySongs = []; 

// if tornado or squall
var chaoticSongs = [];

// determines which random playlist to insert depending on the length of the arrary (how many playlists available)
var getRandomInt = function(size) {
    
    playlistNumber = Math.floor(Math.random() * size.length);
    return playlistNumber;

;}




// need to make function that decides which array to use 

// make function that takes random value of array to supply as src code 

var randomPlaylist = function(conditionArray) {

    getRandomInt(warmSongs);

    spotifyUrlHalf = "https://open.spotify.com/embed/playlist/"

    randomPlaylistUrl = spotifyUrlHalf + warmSongs[playlistNumber];

    console.log(randomPlaylistUrl);
    return randomPlaylistUrl;
}



// changes the already inserted iframe src
var insertPlaylist = function(weatherCondition) {
    

    
    
    var spotifyPlayer = document.getElementById("spotify-player");
    url_string = randomPlaylist(weatherCondition);
        
    spotifyPlayer.src = url_string;

};


















/* Spotify codes for warm Day

<iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DX7KNKjOK0o75" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> have a great day
<iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DX6GwdWRQMQpq" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> Feelin' Myslef
<iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DX3rxVfibe1L0" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> Mood Booster

*/

var playlistNumber = 0;

// Returns a random playlist and embeds the player in HTML

// Playlist Embedded Codes Arrays for each weather condition


// if clear or temp > 70 then random related playlists
var warmSongs = ["sunny", "sunny test", "sunnnnny test"];


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
    
    playlistNumber = Math.floor(Math.random() * size);

;}




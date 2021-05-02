// Global Variables:
var playlistNumber = 0;
var playlistContainerEl = document.querySelector("#playlist-box");
var currentCity = "";
var apiKey = "f97301447cbd41068af8623a398ba1fb";
var forecastUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=imperial&appid=${apiKey}`;
var weatherArrayCode = "";
var weatherDescription = "";
var searchButton = document.getElementById("search-button");
var cityName = document.getElementById("current-city");
var currentTemp = document.getElementById("current-temp");
var currentHumidity = document.getElementById("current-humid");
var currentWind = document.getElementById("current-wind");




// Arrays to store playlist codes by related Weather Condition
// if clear or temp > 70 then random related playlists
var warmSongs = [
  "37i9dQZF1DX7KNKjOK0o75",
  "37i9dQZF1DX6GwdWRQMQpq",
  "37i9dQZF1DX3rxVfibe1L0",
  "37i9dQZF1DX4o1oenSJRJd",
  "37i9dQZF1DXbtuVQL4zoey",
  "37i9dQZF1DX0H8hDpv38Ju",
];
// if clear and temp > 80 then random related playlists
var hotSongs = [
    "37i9dQZF1DWYkaDif7Ztbp",
    "37i9dQZF1DX1lVhptIYRda",
    "37i9dQZF1DX6ALfRKlHn1t",
    "37i9dQZF1DWSf2RDTDayIx",
    "37i9dQZF1DX3XjJqhm9fqD",
];
// switch statement if rain or drizzle or fog or cloudy or mist 
var chillSongs = [
    "37i9dQZF1DX4dyzvuaRJ0n",
    "37i9dQZF1DWTwnEm1IYyoj",
    "37i9dQZF1DX889U0CL85jj",
    "37i9dQZF1DX8Uebhn9wzrS",
    "37i9dQZF1DX6VdMW310YC7",
    "37i9dQZF1DWSfMe9z89s9B",
    "37i9dQZF1DX2UgsUIg75Vg",
];
// if tornado or squall or smoke or haze or dust or sand or ash
var chaoticSongs = [
    "37i9dQZF1DX0pH2SQMRXnC",
    "37i9dQZF1DX4eRPd9frC1m",
    "37i9dQZF1DWY6vTWIdZ54A",
];
// if snowing
var snowSongs =[
    "37i9dQZF1DX4sWSpwq3LiO",
    "37i9dQZF1DZ06evO35BZEd",
    "37i9dQZF1DZ06evO2IGtnj",
    "37i9dQZF1DWXcDWWDXKjLV",
];

// determines which random playlist to insert depending on the length of the arrary (how many playlists available)
// Is called by randomPlaylist function
var getRandomInt = function (size) {
  playlistNumber = Math.floor(Math.random() * size.length);
  return playlistNumber;
};

// Provides a random playlist src url by accessing array that is passed to the function
var randomPlaylist = function (weatherArray) {
  getRandomInt(weatherArray);

  spotifyUrlHalf = "https://open.spotify.com/embed/playlist/";

  randomPlaylistUrl = spotifyUrlHalf + weatherArray[playlistNumber];

  //console.log(randomPlaylistUrl);
  return randomPlaylistUrl;
};

// Changes the embeded player's src code using url obtained by running randomPlaylist
var insertPlaylist = function (weatherCondition) {
  var spotifyPlayer = document.getElementById("spotify-player");
  url_string = randomPlaylist(weatherCondition);

  spotifyPlayer.hidden = false;
  spotifyPlayer.src = url_string;
};



// decides what array to use based on weather api

var displayWeatherAndMusic = function() {
  fetch(forecastUrl).then(function(response) {
    response.json().then(function(data) {
      console.log(data);

      cityName.innerHTML = "City: " + data.name;
      currentTemp.innerHTML = "Temperature: " + data.main.temp;
      currentHumidity.innerHTML = "Humidity: " + data.main.humidity + "%";
      currentWind.innerHTML = "Wind: " + data.wind.speed + " mph";

      var musicTemp = data.main.temp;
      

      
      switch(data.weather[0].main) {
        case 'Clear':
          if (musicTemp > 77) {
            insertPlaylist(hotSongs);
          } else {
            insertPlaylist(warmSongs);
          }
          break;
        case 'Clouds':
          if (musicTemp > 65) {
            if (musicTemp > 77) {
              insertPlaylist(hotSongs);
            } else insertPlaylist(warmSongs);
          } else {
            insertPlaylist(chillSongs);
          }
          break;
        case 'Mist':
          insertPlaylist(chillSongs);
          break;
        case 'Fog':
          insertPlaylist(chillSongs);
          break;
        case 'Smoke':
          insertPlaylist(chaoticSongs);
          break;
        case 'Haze':
          insertPlaylist(chaoticSongs);
          break;
        case 'Dust':
          insertPlaylist(chaoticSongs);
          break;
        case 'Sand':
          insertPlaylist(chaoticSongs);
          break;
        case 'Ash':
          insertPlaylist(chaoticSongs);
          break;
        case 'Squall':
          insertPlaylist(chaoticSongs);
          break;
        case 'Tornado':
          insertPlaylist(chaoticSongs);
          break;
        case 'Snow':
          insertPlaylist(snowSongs);
          break;
        case 'Rain':
          insertPlaylist(chillSongs);
          break;
        case 'Drizzle':
          insertPlaylist(chillSongs);
          break;
        case 'Thunderstorm':
          insertPlaylist(chaoticSongs);
          break;
        default:
          insertPlaylist(warmSongs);
        

      }
  
    });
  });

}

searchButton.addEventListener('click', function(event) {
  event.preventDefault();
  var searchInput = document.getElementById("search-input");
  currentCity = searchInput.value;
  console.log(currentCity);
  forecastUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=imperial&appid=${apiKey}`;
 
  displayWeatherAndMusic();


})









/* Spotify SRC codes for warm Day

1 src="https://open.spotify.com/embed/playlist/37i9dQZF1DX7KNKjOK0o75"  have a great day
2 src="https://open.spotify.com/embed/playlist/37i9dQZF1DX6GwdWRQMQpq"  Feelin' Myslef
3 src="https://open.spotify.com/embed/playlist/37i9dQZF1DX3rxVfibe1L0"  Mood Booster
4 src="https://open.spotify.com/embed/playlist/37i9dQZF1DX4o1oenSJRJd"  All Outs 00s
5 src="https://open.spotify.com/embed/playlist/37i9dQZF1DXbtuVQL4zoey"  Sunny Beats
6 src="https://open.spotify.com/embed/playlist/37i9dQZF1DX0H8hDpv38Ju"  80's Jam Session

*/

/* Spotify SRC codes for Hot Day
1 src="https://open.spotify.com/embed/playlist/37i9dQZF1DWYkaDif7Ztbp"  African Heat
2 src="https://open.spotify.com/embed/playlist/37i9dQZF1DX1lVhptIYRda"  Hot Country
3 src="https://open.spotify.com/embed/playlist/37i9dQZF1DX6ALfRKlHn1t"  Soak up the Sun
4 src="https://open.spotify.com/embed/playlist/37i9dQZF1DWSf2RDTDayIx"  Happy Beats
5 src="https://open.spotify.com/embed/playlist/37i9dQZF1DX3XjJqhm9fqD"  Haitian Heat
*/

/* Spotify SRC codes for Chill Day
1 src="https://open.spotify.com/embed/playlist/37i9dQZF1DX4dyzvuaRJ0n"  Mint
2 src="https://open.spotify.com/embed/playlist/37i9dQZF1DWTwnEm1IYyoj"  Soft Pop Hits
3 src="https://open.spotify.com/embed/playlist/37i9dQZF1DX889U0CL85jj"  Chill Vibes
4 src="https://open.spotify.com/embed/playlist/37i9dQZF1DX8Uebhn9wzrS"  Chill Lofi Study Beats
5 src="https://open.spotify.com/embed/playlist/37i9dQZF1DX6VdMW310YC7"  Chill Tracks
6 src="https://open.spotify.com/embed/playlist/37i9dQZF1DWSfMe9z89s9B"  Alternative R&B
7 src="https://open.spotify.com/embed/playlist/37i9dQZF1DX2UgsUIg75Vg"  Chilled R&B
*/

/* Spotify SRC codes for Chaotic/storm events
1 src="https://open.spotify.com/embed/playlist/37i9dQZF1DX0pH2SQMRXnC"  Hardstyle Bangers
2 src="https://open.spotify.com/embed/playlist/37i9dQZF1DX4eRPd9frC1m"  Hype
3 src="https://open.spotify.com/embed/playlist/37i9dQZF1DWY6vTWIdZ54A"  Dirty Rock
*/

/* Spotify SRC codes for Snow Day
1 src="https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO"  Peaceful Piano
2 src="https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO35BZEd"  This is Snow
3 src="https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO2IGtnj"  This is Snowy White
4 src="https://open.spotify.com/embed/playlist/37i9dQZF1DWXcDWWDXKjLV"  This is Snow Patrol
*/

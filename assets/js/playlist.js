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
var descriptionIcon = document.getElementById("description-icon");
var descriptionDetails = document.getElementById("current-description");




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

function getGif(searchTerm) {
  
  // Return a fetch request to the Giphy search API with the article title and rating parameters
  fetch('https://api.giphy.com/v1/gifs/random?q=' + searchTerm + '&tag=' + searchTerm + '&api_key=HvaacROi9w5oQCDYHSIk42eiDSIXH3FN&limit=1').then(function(response) {
    response.json().then(function(gify) {
      if (gify.data.length === 0) {
        console.log('Giphy could not find anything for that.');
      } else {
        console.log(gify.data[0]);
        var weatherImgContainerEl = document.querySelector('#weather-img');
        weatherImgContainerEl.innerHTML = '<img src="' + gify.data.image_url + '" class="pure-img" />'; // changes image based on search term
        
      }
    });
})   
}

// decides what array to use based on weather api

var displayWeatherAndMusic = function() {
  fetch(forecastUrl).then(function(response) {
    response.json().then(function(data) {
      console.log(data);

      cityName.innerHTML = "City: " + data.name;
      currentTemp.innerHTML = '<i class="wi wi-thermometer">' + " " + data.main.temp + " °F";
      currentHumidity.innerHTML = '<i class="wi wi-humidity"></i>' + " " + data.main.humidity + "%";
      currentWind.innerHTML = '<i class="wi wi-strong-wind"></i>' + " " + data.wind.speed + " mph";
      descriptionIcon.innerHTML = `<i class="wi wi-owm-${data.weather[0].id}"></i>`;
      descriptionDetails.innerHTML = data.weather[0].description;

      var musicTemp = data.main.temp;
      
      //getGif(data.weather[0].description);
      console.log(data);
      switch(data.weather[0].main) {
        case 'Clear':
          if (musicTemp > 77) {
            insertPlaylist(hotSongs);
            getGif("hot weather");
          } else {
            insertPlaylist(warmSongs);
            getGif("sunglasses");
          }
          break;
        case 'Clouds':
          if (musicTemp > 65) {
            if (musicTemp > 77) {
              insertPlaylist(hotSongs);
              getGif("warm weather");
            } else insertPlaylist(warmSongs);
          } else {
            insertPlaylist(chillSongs);
            getGif("cloudy weather");
          }
          break;
        case 'Mist':
          insertPlaylist(chillSongs);
          getGif("misty weather");
          break;
        case 'Fog':
          insertPlaylist(chillSongs);
          getGif("foggy weather");
          break;
        case 'Smoke':
          insertPlaylist(chaoticSongs);
          getGif("smoky sky");
          break;
        case 'Haze':
          insertPlaylist(chaoticSongs);
          getGif("hazy sky");
          break;
        case 'Dust':
          insertPlaylist(chaoticSongs);
          getGif("dusty");
          break;
        case 'Sand':
          insertPlaylist(chaoticSongs);
          getGif("sand storm");
          break;
        case 'Ash':
          insertPlaylist(chaoticSongs);
          getGif("volcanic ash");
          break;
        case 'Squall':
          insertPlaylist(chaoticSongs);
          getGif("stormy weather");
          break;
        case 'Tornado':
          insertPlaylist(chaoticSongs);
          getGif("tornado");
          break;
        case 'Snow':
          insertPlaylist(snowSongs);
          getGif("snowing");
          break;
        case 'Rain':
          insertPlaylist(chillSongs);
          getGif("raining");
          break;
        case 'Drizzle':
          insertPlaylist(chillSongs);
          getGif("light rain");
          break;
        case 'Thunderstorm':
          insertPlaylist(chaoticSongs);
          getGif("thunderstorm");
          break;
        default:
          insertPlaylist(warmSongs);
          getGif("warm weather");
        

      }
  
    });
  });

}

const switchTheVibe = function(whichVibe) {
  var refreshButton = document.createElement('button');
  refreshButton.className = "pure-button";
  refreshButton.innerHTML = "Get New Playlist Recommendation";
  var playlistInfoContainer = document.getElementById("playlist-info");
  var refreshInstructions = document.createElement('p');
  refreshInstructions.innerHTML = "Don't like the playlist? Click the button below to get a new recommendation.";
  playlistContainerEl.appendChild(refreshInstructions);
  playlistContainerEl.appendChild(refreshButton);

  refreshButton.addEventListener('click', function(event) {
    event.preventDefault();
    insertPlaylist(whichVibe);
  })
};

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

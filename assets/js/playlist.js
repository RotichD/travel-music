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
var lastLocation = "";
var instructions = document.getElementById("instructions");
var searchField = document.getElementById("search-field");




// These Arrays hold playlist codes to be concatenated into a Spotify Url for the Embedded Player
var warmSongs = [
  "37i9dQZF1DX7KNKjOK0o75",
  "37i9dQZF1DWYMroOc5KTTh",
  "37i9dQZF1DX3rxVfibe1L0",
  "37i9dQZF1DX4o1oenSJRJd",
  "37i9dQZF1DXbtuVQL4zoey",
  "37i9dQZF1DX0H8hDpv38Ju",
];
var hotSongs = [
    "37i9dQZF1DWYkaDif7Ztbp",
    "37i9dQZF1DX1lVhptIYRda",
    "37i9dQZF1DX6ALfRKlHn1t",
    "37i9dQZF1DWSf2RDTDayIx",
    "37i9dQZF1DX3XjJqhm9fqD",
];
var chillSongs = [
    "37i9dQZF1DX4dyzvuaRJ0n",
    "37i9dQZF1DWTwnEm1IYyoj",
    "37i9dQZF1DX889U0CL85jj",
    "37i9dQZF1DX8Uebhn9wzrS",
    "37i9dQZF1DX6VdMW310YC7",
    "37i9dQZF1DWSfMe9z89s9B",
    "37i9dQZF1DX2UgsUIg75Vg",
    "37i9dQZF1DX6tTW0xDxScH",
    "37i9dQZF1DWU0ScTcjJBdj",
];
var chaoticSongs = [
    "37i9dQZF1DX0pH2SQMRXnC",
    "37i9dQZF1DX4eRPd9frC1m",
    "37i9dQZF1DWY6vTWIdZ54A",
];
var snowSongs =[
    "37i9dQZF1DX4sWSpwq3LiO",
    "37i9dQZF1DZ06evO35BZEd",
    "37i9dQZF1DZ06evO2IGtnj",
    "37i9dQZF1DWXcDWWDXKjLV",
];

instructions.hidden = false; // Displays instructions on how to load spotify player and receive recommended playlist. (When a Playlist is loaded it will be hidden)

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

  spotifyPlayer.hidden = false; // unhides the Embedded Player
  spotifyPlayer.src = url_string;
  instructions.hidden = true; // Hides the instructions after the player is unhidden
};

function getGif(searchTerm) {
  
  // Uses the Giphy API random search endpoint with a Tag to relate it to the provided weather condition (called in Switch Statement)
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
      // updates the page with information from open weather api
      cityName.innerHTML = "City: " + data.name;
      currentTemp.innerHTML = '<i class="wi wi-thermometer">' + " " + Math.round(data.main.temp) + " °F";
      currentHumidity.innerHTML = '<i class="wi wi-humidity"></i>' + " " + data.main.humidity + "%";
      currentWind.innerHTML = '<i class="wi wi-strong-wind"></i>' + " " + data.wind.speed + " mph";
      descriptionIcon.innerHTML = `<i class="wi wi-owm-${data.weather[0].id}"></i>`;
      descriptionDetails.innerHTML = data.weather[0].description;

      var musicTemp = data.main.temp;
      
      
      console.log(data);
      switch(data.weather[0].main) { //Decides which music array to use (Vibe) dependent on both weather condition main and temperature
        case 'Clear':
          if (musicTemp > 77) {
            insertPlaylist(hotSongs); // displays hot weather related playlist
            getGif("hot weather"); // displays random gif with hot weather tag
            switchTheVibe(hotSongs); // generates instructions and button for getting a different playlist from the same hotSongs array
          } else {
            insertPlaylist(warmSongs);
            getGif("sunglasses");
            switchTheVibe(warmSongs);
          }
          break;
        case 'Clouds':
          if (musicTemp > 65) {
            if (musicTemp > 77) {
              insertPlaylist(hotSongs);
              getGif("warm weather");
              switchTheVibe(hotSongs);
            } else insertPlaylist(warmSongs);
            switchTheVibe(warmSongs);
            getGif("cloudy");
          } else {
            insertPlaylist(chillSongs);
            getGif("cloudy");
            switchTheVibe(chillSongs);
          }
          break;
        case 'Mist':
          insertPlaylist(chillSongs);
          getGif("misty weather");
          switchTheVibe(chillSongs);
          break;
        case 'Fog':
          insertPlaylist(chillSongs);
          getGif("foggy weather");
          switchTheVibe(chillSongs);
          break;
        case 'Smoke':
          insertPlaylist(chaoticSongs);
          getGif("smoky sky");
          switchTheVibe(chaoticSongs);
          break;
        case 'Haze':
          insertPlaylist(chaoticSongs);
          getGif("hazy sky");
          switchTheVibe(chaoticSongs);
          break;
        case 'Dust':
          insertPlaylist(chaoticSongs);
          getGif("dusty");
          switchTheVibe(chaoticSongs);
          break;
        case 'Sand':
          insertPlaylist(chaoticSongs);
          getGif("sand storm");
          switchTheVibe(chaoticSongs);
          break;
        case 'Ash':
          insertPlaylist(chaoticSongs);
          getGif("volcanic ash");
          switchTheVibe(chaoticSongs);
          break;
        case 'Squall':
          insertPlaylist(chaoticSongs);
          getGif("stormy weather");
          switchTheVibe(chaoticSongs);
          break;
        case 'Tornado':
          insertPlaylist(chaoticSongs);
          getGif("tornado");
          switchTheVibe(chaoticSongs);
          break;
        case 'Snow':
          insertPlaylist(snowSongs);
          getGif("snowing");
          switchTheVibe(snowSongs);
          break;
        case 'Rain':
          insertPlaylist(chillSongs);
          getGif("raining");
          switchTheVibe(chillSongs);
          break;
        case 'Drizzle':
          insertPlaylist(chillSongs);
          getGif("light rain");
          switchTheVibe(chillSongs);
          break;
        case 'Thunderstorm':
          insertPlaylist(chaoticSongs);
          getGif("thunderstorm");
          switchTheVibe(chaoticSongs);
          break;
        default:
          insertPlaylist(warmSongs);
          getGif("warm weather");
          switchTheVibe(warmSongs);
        

      }
  
    });
  });

}

const switchTheVibe = function(whichVibe) { // Allows users to request another recommended playlist if they don't like the given playlist
  var refreshButton = document.getElementById("refresh-btn"); // Displays instructions and button to change playlist
  refreshButton.hidden = false;
  var refreshInstructions = document.getElementById("refresh-instructions");
  refreshInstructions.hidden = false;

  refreshButton.addEventListener('click', function(event) { // changes playlist on click
    event.preventDefault();
    insertPlaylist(whichVibe);
  })
};


const loadLastLocation = function() {
  // update current city to value stored in local storage
  currentCity = localStorage.getItem("last location");
  // update forecastUrl to reflect new city value
  forecastUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=imperial&appid=${apiKey}`;
  // run displayWeatherAndMusic
  displayWeatherAndMusic();
};

loadLastLocation();



searchField.addEventListener('submit', function(event) {
  event.preventDefault();
  var searchInput = document.getElementById("search-input");
  currentCity = searchInput.value;
  console.log(currentCity);
  forecastUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=imperial&appid=${apiKey}`;
 
  displayWeatherAndMusic();
  lastLocation = currentCity;
  localStorage.setItem("last location", lastLocation);
})











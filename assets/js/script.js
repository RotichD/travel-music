// elements
var today = new Date();
var cityFormEl = document.querySelector("#city-form");
var cityNameInputEl = document.querySelector("#cityname");
var currentWeatherEl = document.querySelector('#current-weather');
var currentWeatherCardEl = document.querySelector("#current-weather-card")
var fiveDayCardEl = document.querySelector("#five-day-card");
var fiveDayEl = document.querySelector("#five-day-body");
var weatherStatusEl = document.querySelector('#weather-status');
var searchEl = document.querySelector('#search');
var historyButtonsEl = document.querySelector("#history-buttons")
var historyCardEl = document.querySelector("#history")
var trashEl = document.querySelector("#trash")
var searchHistoryArray = []

var formSubmitHandler = function (event) {
    event.preventDefault();
    // get city name 
    var cityname = cityNameInputEl.value.trim();

    // set city in local storage and generate history buttons
    if (cityname) {
        searchHistoryArray.push(cityname);
        localStorage.setItem("weatherSearch", JSON.stringify(searchHistoryArray));
        var searchHistoryEl = document.createElement('button');
        searchHistoryEl.className = "btn";
        searchHistoryEl.setAttribute("data-city", cityname)
        searchHistoryEl.innerHTML = cityname;
        historyButtonsEl.appendChild(searchHistoryEl);
        historyCardEl.removeAttribute("style")
        getWeatherInfo(cityname);
        cityNameInputEl.value = "";
    }
    else {
        alert("Please Enter a City Name");
    }

}

// get weather info from OpenWeather
var getWeatherInfo = function (cityname) {
    var apiCityUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=f97301447cbd41068af8623a398ba1fb";
    fetch(
        // works by getting latitude and longitude for city
        apiCityUrl
    )

    .then(function (cityResponse) {
        return cityResponse.json();
    })
    .then(function (cityResponse) {
        // create variables to keep lat and long of city
        console.log(cityResponse)
        var latitude = cityResponse.coord.lat;
        var longitude = cityResponse.coord.lon; 
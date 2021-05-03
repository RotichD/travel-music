/* All of this is dependent on the weather API search result */
function myFunction() {
    fetch(
      // Make a fetch request to openWeather to get weather for location
      
    )
      .then(function(weatherResponse) {
        return weatherResponse.json();
      })
      .then(function(weatherResponse) {
        // Create a variable to hold the desitnation weather
        var searchTerm = weatherResponse.query.location;//unsure what this will look like //this variable needs to be in the fetch for giphy
  
        // Display the article title above the GIF as a <h2> heading
        var responseHeaderEl = document.querySelector('#response-header');
        responseHeaderEl.innerHTML = '<h2>' + searchTerm + '</h2>';
  
        // Return a fetch request to the Giphy search API with the article title and rating parameters
        return fetch(
          'https://api.giphy.com/v1/gifs/search?q=' +
            searchTerm +
            '&api_key=HvaacROi9w5oQCDYHSIk42eiDSIXH3FN&limit=1'
        );
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        if (response.data.length === 0) {
          console.log('Giphy could not find anything for that.');
        } else {
          console.log(response.data[0]);
          var weatherImgContainerEl = document.querySelector('#weather-img');
          weatherImgContainerEl.innerHTML = '';
          var weatherImg = document.createElement('img');
          weatherImg.setAttribute('src', response.data[0].images.fixed_height.url);
          weatherImgContainerEl.appendChild(weatherImg);
        }
      });
  }
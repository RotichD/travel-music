/* All of this is dependent on the weather API search result */
function getGif(searchTerm) {
  
        // Return a fetch request to the Giphy search API with the article title and rating parameters
        fetch('https://api.giphy.com/v1/gifs/search?q=' + searchTerm + '&api_key=HvaacROi9w5oQCDYHSIk42eiDSIXH3FN&limit=1').then(function(response) {
          response.json().then(function(gify) {
            if (gify.data.length === 0) {
              console.log('Giphy could not find anything for that.');
            } else {
              console.log(gify.data[0]);
              var weatherImgContainerEl = document.querySelector('#weather-img');
              weatherImgContainerEl.innerHTML = '<img src="' + gify.data[0].images.fixed_height.url + '" class="pure-img" />'; // changes image based on search term
              
            }
          });
      })   
}
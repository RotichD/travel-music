// get a list of categories - https://api.spotify.com/v1/browse/categories 
// get a list of categories' playlists - https://api.spotify.com/v1/browse/categories/{category_id}/playlists
// get a playlist's items (tracks) - https://api.spotify.com/v1/playlists/{playlist_id}/tracks
// get a track - https://api.spotify.com/v1/tracks/{id} 


const APIController = (function() {

    // Supplied by Spotify Developer Dashboard
    const clientId = 'fde80009581e478e8f5ebf07921d087d';
    const clientSecret = '2678a06ada524afa99a36ba7d93e9a17';

    // private method, returns promise
    const _getToken = async () => {
        
        // call spotify token endpoint, needs to be POST request
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret) //base-64 encoded string representation of client ID/Secret
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token;
        
    }

    const _getGenres = async (token) => { // gets genres, receive token parameter, returns promise, convert to json, store in data variable, return category items

        const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.categories.items;
    }

    const _getPlaylistByGenre = async (token, genreId) => {

        const limit = 10; // amount of playlists we want to receive

        const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer' + token}
        });

        const data = await result.json();
        return data.playlists.items;
    }
    
    
})();



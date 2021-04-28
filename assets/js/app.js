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
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret) //base-64 encoded string representation 
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token;
        console.log(data);
    }

    
    
})();



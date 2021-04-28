const APIController = (function() {

    // Supplied by Spotify Developer Dashboard
    const clientId = 'fde80009581e478e8f5ebf07921d087d';
    const clientSecret = '2678a06ada524afa99a36ba7d93e9a17';

    // private method, returns promise
    const _getToken = async () => {
        
        const result = await fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token;
    }
})();
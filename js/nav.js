/*document.addEventListener('DOMContentLoaded', function() {
    fetch('/js/nav.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('nav2').innerHTML = data;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    if(window.location.pathname.includes("gameframe.html")){
        loadFrameGamesPage();
    }
});
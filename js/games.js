function loadgame(gameURL, unusedVar) {

  const parentElement = event.target.closest('div');
  const scroll = document.getElementById("scroll");
  const h1Element = parentElement.querySelector('h1');
  const gameName = h1Element.innerText;
  const element = document.getElementById("gameframe_frame_container");
  if(gameName){
    localStorage.setItem('Title', gameName);


  }
  if (element !== null) {
    const gmsTitle = document.querySelectorAll('#gmsName');
    gmsTitle.forEach(gmsTitle => {
      gmsTitle.innerHTML = localStorage.getItem('Title');
    });
      document.title = localStorage.getItem('Title') + ' Unblocked - Obsidian Network';
    gmsTitle.innerHTML = localStorage.getItem('Title');
    element.src = '/loader.html?game=' + gameURL;
    window.localStorage.setItem('gameURL', element.src);
    element.contentWindow.focus();
    scroll.scrollIntoView({ 
      behavior: "smooth" 
    }); 

     } else {
    localStorage.setItem("gameURL", gameURL);

    const text = gameURL;
    const snippet = "/gms/";
    const index = text.indexOf(snippet);

    let game2;
    if (index !== -1) {
      game2 = text.substring(index + snippet.length); 
    } else {
      console.log("Snippet not found.");
      game2 = gameURL;
    }

    window.location.href = "/g/?game=" + gameURL;
  }
}
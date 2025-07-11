const originalTitle = document.querySelector('title').textContent;
const addition = ' - obsidiangames.com embed';

// Check if the addition is already in the title
if (!originalTitle.includes(addition)) {
  let newTitle = originalTitle;

  // Replace specific patterns with the addition
  newTitle = newTitle.replace(/\| 3kh0/, addition);
  newTitle = newTitle.replace(/- ubg235 GameDistribution/, addition);
  newTitle = newTitle.replace(/- ubg235 GC/, addition);
  newTitle = newTitle.replace(/- ubg235 Poki/, addition);
  newTitle = newTitle.replace(/- TBG35/, addition);
newTitle = newTitle.replace(/&middot Geometry Tryhard/, addition);
newTitle = newTitle.replace(/- Geometry Tryhard/, addition);
newTitle = newTitle.replace(/- geometry-games.online/, addition);
  // If no replacements were made, add the addition to the end
  if (newTitle === originalTitle) {
    newTitle += addition;
  }

  document.querySelector('title').textContent = newTitle;
gtagLoad();
}
function gtagLoad(){
var script = document.createElement('script');
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-9XL9TXRPN2'; 
        script.async = true;

         document.head.appendChild(script);

      
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

  
        gtag('config', 'G-9XL9TXRPN2');
        console.log('Google Analytics Loaded');}

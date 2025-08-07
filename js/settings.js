document.addEventListener('DOMContentLoaded', function() {
  fpsCheck();
  particleCheck();
    sideNavCheck();
});
function fpsCheck(){
    if(localStorage.getItem('fps') === "true"){
        var fpsdiv = document.createElement("div");
        fpsdiv.className = "fpsOverlay";
        fpsdiv.id = "fps-overlay";
        fpsdiv.innerHTML = "FPS: <span id='fps-value'>0</span>";
        document.body.appendChild(fpsdiv);
    }
}
function toggleFPS(){
    if(localStorage.getItem('fps') === "true"){
        localStorage.setItem('fps', "false");
        document.getElementById('fps-overlay').remove();
    }
    else{
        localStorage.setItem('fps', "true");
        var fpsdiv = document.createElement("div");
        fpsdiv.className = "fpsOverlay";
        fpsdiv.id = "fps-overlay";
        fpsdiv.innerHTML = "FPS: <span id='fps-value'>0</span>";
        document.body.appendChild(fpsdiv);
      let fps = 0;
      let frame = 0;
      let startTime = 0;

      function tick() {
          frame++;
          if (startTime === 0) {
              startTime = Date.now();
          }

          const now = Date.now();
          if (now - startTime > 1000) {
              fps = frame;
              document.getElementById('fps-value').innerText = fps.toFixed(1);
              startTime = now;
              frame = 0;
          }
          requestAnimationFrame(tick);
      }

      tick();
    }

}
  let fps = 0;
  let frame = 0;
  let startTime = 0;

  function tick() {
      frame++;
      if (startTime === 0) {
          startTime = Date.now();
      }

      const now = Date.now();
      if (now - startTime > 1000) {
          fps = frame;
          document.getElementById('fps-value').innerText = fps.toFixed(1);
          startTime = now;
          frame = 0;
      }
      requestAnimationFrame(tick);
  }

  tick();
function particleCheck(){
    var p = localStorage.getItem("bgNumber");
    if(p === null){
        localStorage.setItem("bgNumber", "18");
        window.location.reload();
    }
}
function particleChange(){
    var p = localStorage.getItem("bgNumber");
    if(p === "18"){
        localStorage.setItem("bgNumber", "0");
        
    }
    else{
        localStorage.setItem("bgNumber", "18");
    }
    window.location.reload();
}
function sideNavChange(){
    var p = localStorage.getItem("sideNav");
    if(p === "true"){
        localStorage.setItem("sideNav", "false");
        var link = document.querySelector('link[href="/css/sideNav.css"]');
        if (link){
            link.parentNode.removeChild(link);
        }
    }
    else{
        localStorage.setItem("sideNav", "true");
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/css/sideNav.css";
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(link);
    }
}
function sideNavCheck(){
    var p = localStorage.getItem("sideNav");
    if(p === null){
        localStorage.setItem("sideNav", "false");
    }
    else if(p === "true"){
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/css/sideNav.css";
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(link);
    }
}
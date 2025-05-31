var head = document.getElementsByTagName('head')[0];
var style = document.createElement('link');
style.rel = 'stylesheet';
style.href = '/css/global.css';
head.appendChild(style);
window.onload="styleload()";
function switchstyles(){
 var current = localStorage.getItem('style');
 if(current === '/css/light.css'){
  localStorage.setItem('style', '/css/dark.css');
   localStorage.setItem("rainColor", "#7e1dfb");
  
}
 else if(current === '/css/dark.css'){
  localStorage.setItem('style', '/css/light.css');
   localStorage.setItem("rainColor", "#ae70ff")
  
 }
    else{
        localStorage.setItem('style', '/css/dark.css');
   styleload()
    }
  window.location.reload();
}
function styleload() {
    var storage = localStorage.getItem('style');
    document.getElementById('style').href = storage;
   if (storage === null){
       localStorage.setItem('style', '/css/dark.css');
   styleload()
   }

}
document.addEventListener('DOMContentLoaded', function () {
  var storage = localStorage.getItem('style');
    var p= localStorage.getItem("sideNav");
      document.getElementById('style').href = storage;
     if(p === "false"|p === null){
         
     }
    else{
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/css/sideNav.css";
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(link);
    }
    if (storage === null){
         localStorage.setItem('style', '/css/dark.css');
       localStorage.setItem("rainColor", "#7e1dfb");
     styleload()
     }

    });

 
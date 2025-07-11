var originalEval= eval;
window.location.hostnamex= "localhost";
eval= function() {  
  arguments[0]= arguments[0].replace("aHR0cHM6Ly9wb2tpLmNvbS9zaXRlbG9jaw==", "I3ViZzIzNQ==");
  arguments[0]= arguments[0].replace("'hostname'", "'hostnamex'");
  return originalEval.apply(this, arguments);
}
navigator.sendBeacon= function(arg1, arg2) {
  console.log("--fx--navigator.sendBeacon--", arg1, arg2);
}

PokiSDK= new function() {
  // ***** INIT *****
  this.init= function() {
    return new Promise((resolve, reject)=> {
      resolve("InitDone");
    });
  }
  
  this.setDebug= function(debug) {
    console.log("--fx--PokiSDK--setDebug--", debug);    
  }
  
  this.isAdBlocked= function() {
    console.log("--fx--PokiSDK--isAdBlocked--");    
    return false;
  }

  this.happyTime= function(scale) {
    console.log("--fx--PokiSDK--happyTime--", scale);    
  }

  // ***** LOADING *****  
  this.gameLoadingStart= function(){
    console.log("--fx--PokiSDK--gameLoadingStart--");
  }
  
  this.gameLoadingProgress= function(progress){
    console.log("--fx--PokiSDK--gameLoadingProgress--", progress);
  }
  
  this.gameLoadingFinished= function(){
    console.log("--fx--PokiSDK--gameLoadingFinished--");
  }

  // ***** GAME CONTROL *****
  this.gameplayStart= function(){
    console.log("--fx--PokiSDK--gameplayStart--");
  }

  this.gameplayStop= function() {
    console.log("--fx--PokiSDK--gameplayStop--");
  }

  // ***** ADS CONTROL *****
  this.commercialBreak= function(){
    console.log("--fx--PokiSDK--commercialBreak--");
    return new Promise((resolve, reject)=> {
      resolve("commercialBreakDone");
    });
  }

  this.rewardedBreak= function() {
   console.log("--fx--PokiSDK--rewardedBreak--");
    return new Promise((resolve, reject)=> {
      if (window.open('//' + window.location.hostname, "ads_geometry-games")) {
        resolve("rewardedBreakDone");  
      } else {
        reject("rewardedBreakFailt");
      }      
    }); 
  }
}

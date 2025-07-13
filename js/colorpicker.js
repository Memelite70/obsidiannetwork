function colorChange(newColor){
  localStorage.setItem('color_3', newColor);
  localStorage.setItem('rainColor', newColor);
  styChange();
  window.location.reload();
}
function styChange(){
  var sty = document.createElement('style');
  var colorValue = localStorage.getItem('color_3');
  var colorValue2 = darkenHex(colorValue, 150);
  var colorValue3 = darkenHex(colorValue, 70);
  var colorValue4 = invertColor(colorValue);
  if(colorValue){
    sty.innerHTML = ':root { --color-3: ' + colorValue + '; --color-8: ' + colorValue2 + '; --color-10: ' + colorValue3 + '; --color-11: ' + colorValue4 +'}';
    document.head.appendChild(sty);
  }
  else{
    localStorage.setItem('color_3', '#7e1dfb');
    localStorage.setItem('rainColor', '#7e1dfb');
    styChange();
  }
}
window.addEventListener("DOMContentLoaded", function(){
  var e = localStorage.getItem('color_3');
  if(e === "#000000"| e === "#010101" | e === "#020202" | e === "#030303" | e === "#040404" | e === "#050505"| e === "#060606"| e === "#070707"| e === "#080808"| e === "#090909" | e === "#101010" | e === "#111111" | e === "#121212" | e === "#131313"){
    var sty2 = document.createElement('style');
    sty2.innerHTML = ':root {--color-12: #212121;}';
    document.head.appendChild(sty2);
  }
      
  styChange();
  var colorPicker = document.getElementById('color_3');
  if (colorPicker) {
    colorPicker.value = localStorage.getItem('rainColor') || '#7e1dfb';
  }
});
function darkenHex(hex, amount) {

  const cleanHex = hex.replace("#", "");
  const hexNum = parseInt(cleanHex, 16);

  const r = (hexNum >> 16) & 255;
  const g = (hexNum >> 8) & 255;
  const b = hexNum & 255;
  const darkenedR = Math.max(0, r - amount);
  const darkenedG = Math.max(0, g - amount);
  const darkenedB = Math.max(0, b - amount);
  const toHex = (c) => {
    const hexValue = c.toString(16);
    return hexValue.length === 1 ? "0" + hexValue : hexValue;
  };

  const darkenedHex = `#${toHex(darkenedR)}${toHex(darkenedG)}${toHex(darkenedB)}`;

  return darkenedHex;
}

function invertColor(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    // invert color components
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}
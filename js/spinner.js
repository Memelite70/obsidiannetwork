document.addEventListener('DOMContentLoaded', function() {
setTimeout(() => {
document.getElementById('spinny').style.opacity = '0';
setTimeout(() => {
  document.getElementById('spinny').style.display = 'none';
}, 800);}

, 200);});
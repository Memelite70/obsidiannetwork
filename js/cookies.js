


function cookiesDo() {
  const existing = document.getElementById('tobenuked');
  if (existing) return; // Avoid adding the banner again

  const cook = localStorage.getItem('eeeeee');
  if (cook === 'yes') return;

  const embed = document.createElement('div');
  embed.innerHTML = `
    <div id="tobenuked" class="cookie_bg" style="text-align: center;">
      <div class="cookie-consent">
        <span class="textCookies">
          This website uses cookies. By continuing to use this site, you agree to our Cookie, Privacy, and DMCA policies, and to the measurement of your unique advertising ID and IP to tailor ads and gather demographic information such as location and view metrics.
        </span><br>
        <button class="cookiesButton" onclick="acceptCookies()">Accept and continue</button>
      </div>
    </div>`;
  document.body.appendChild(embed);
}

function acceptCookies() {
  localStorage.setItem('cookiesVar', 'yes');
  const banner = document.getElementById('tobenuked');
  if (banner) banner.remove();
}

function denyCookies() {
  localStorage.removeItem('cookiesVar'); // Properly remove item
  const banner = document.getElementById('tobenuked');
  if (banner) banner.remove();
}

//document.addEventListener('DOMContentLoaded', cookiesDo);

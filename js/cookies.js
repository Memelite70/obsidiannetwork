var cookies = localStorage.getItem('cookies');
if (!cookies) {
  localStorage.setItem('cookies', true);
  window.cookieconsent.initialise({
 cookie: {
    domain : "/",
    name: "cookie_consent",
  },
  palette:{
    popup:  { background: "#1b2f31"  },
    button: { background: "#D0D0D0"},
  },
  content:{
    message: "We use cookies to offer you a better experience and analyze site traffic. By continuing to use this site, you consent to our use of cookies.",
  },
});

}
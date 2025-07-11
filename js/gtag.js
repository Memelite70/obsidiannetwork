function gtagLoad(){
var script = document.createElement('script');
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-9XL9TXRPN2'; 
        script.async = true;

         document.head.appendChild(script);


        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());


        gtag('config', 'G-9XL9TXRPN2');
        console.log('analytics loaded successfully');}
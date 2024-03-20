function insertGtmScript() {
    const gtmId = 'GTM-MCXT2HK5'; // Replace GTM-XXXXXXX with your actual GTM Container ID
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
    });
}

insertGtmScript();
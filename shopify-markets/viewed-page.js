var localization = {{DLV - Shopify Localization}};

var url = {{Page Hostname}} + {{Page Path}};
var fullUrl = {{Page URL}};

klaviyo.track('Viewed Page - MM', {
    'URL': url,
    'FullURL': fullUrl,
    'Localization': localization
});
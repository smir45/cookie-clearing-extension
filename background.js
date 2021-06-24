(function () {
    "use strict";

    var removeAllCookies = function () {

        if (!chrome.cookies) {
            chrome.cookies = chrome.experimental.cookies;
        }

        var removeCookie = function (cookie) {
            var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain + cookie.path;
            chrome.cookies.remove({"url": url, "name": cookie.name});
        };

        chrome.cookies.getAll({}, function (all_cookies) {
            var count = all_cookies.length;
            for (var i = 0; i < count; i++) {
                removeCookie(all_cookies[i]);
            }
        });

        return "COOKIES_CLEARED_VIA_EXTENSION_API";
    };

    chrome.browserAction.onClicked.addListener(function (tab) {
        console.log(removeAllCookies());
    });

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request === "CLEAR_COOKIES_EXTENSION_API") {
            sendResponse(removeAllCookies());
            sendResponse(removeAllCookies());
        }
    });

})();
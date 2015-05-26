var staticPath = "http://127.0.0.1:8080",
jsSrc = staticPath + "/js/"; (location.href.indexOf("&debug=true") > -1 || location.href.indexOf("?debug=true") > -1) && (jsSrc = staticPath + "/src/js/"),
seajs.config({
    paths: {
        business: jsSrc + "business",
        common: jsSrc + "common",
        pageCommon: jsSrc + "pageCommon"
    }
});

(function(w, d) {

    'use strict';

    angular
    .module('locationDataUi');

    var h = d.getElementsByTagName("head")[0],
        s = d.createElement("script");
    s.src = "http://d3js.org/d3.v4.js";
    s.onload = function () {
        w.d3_3_5_3= w.d3;
        w.d3 = undefined;
        s = d.createElement("script");
        s.src = "https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.4/d3.min.js";
        s.onload = function () {
            w.d3_3_5_4 = w.d3;
            w.d3 = undefined;
            s = d.createElement("script");
            s.src = "http://d3js.org/d3.v3.js";
            s.onload = function () {
                w.d3_3_5_5 = w.d3;
                w.d3 = undefined;
            };
            h.appendChild(s);
        };
        h.appendChild(s);
    };
    h.appendChild(s);
}(window, document));

//A module. No deps

var aModule = (function () {
    'use strict';

    function _print (val) {
        return console.log(val);
    }

    var exports = {
        printOne: function () {
            return _print(1);
        },
        printVal: function (val) {
            return _print(val);
        }
    };

    (function _init () {
      exports.printVal('some a module init');
    })();

    return exports;
})();
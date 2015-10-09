//B module.
// Depends on A module

var bModule = (function (aModule) {
    'use strict';

    var exports = {
        print: function () {
            return aModule.printVal('B Module printed with A module');
        },
        sum: function (a, b) {
            return a + b;
        }
    };

    (function _init() {
        exports.print('B module init');
    })();

    return exports;
})(aModule);
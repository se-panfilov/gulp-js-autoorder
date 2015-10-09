//C module.
// Depends on A module
// Depends on B module

var cModule = (function (aModule, bModule) {
    'use strict';

    var exports = {
        print: function () {
            return aModule.printVal('C Module printed with A module');
        },
        sum: function (a, b) {
            return bModule.sum(a, b);
        }
    };

    (function _init() {
        exports.print('C module init');
    })();

    return exports;
})(aModule, bModule);
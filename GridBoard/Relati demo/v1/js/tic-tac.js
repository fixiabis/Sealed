"use strict";
var Relati;
(function (Relati) {
    var ticStart = new Date().getTime();
    Relati.tic = function () { return ticStart = new Date().getTime(); };
    Relati.tac = function () { return console.log(new Date().getTime() - ticStart); };
})(Relati || (Relati = {}));
//# sourceMappingURL=tic-tac.js.map
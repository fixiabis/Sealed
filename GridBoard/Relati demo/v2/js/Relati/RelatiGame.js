"use strict";
var Relati;
(function (Relati) {
    var RelatiGame = /** @class */ (function () {
        function RelatiGame(board) {
            this.board = board;
            this.turn = 1;
        }
        RelatiGame.prototype.getNowPlayerSymbol = function () {
            return this.turn % 2 == 1 ? "O" : "X";
        };
        return RelatiGame;
    }());
    Relati.RelatiGame = RelatiGame;
})(Relati || (Relati = {}));
//# sourceMappingURL=RelatiGame.js.map
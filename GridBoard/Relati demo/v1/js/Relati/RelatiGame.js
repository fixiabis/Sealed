"use strict";
var Relati;
(function (Relati) {
    var RelatiGame = /** @class */ (function () {
        function RelatiGame(board) {
            this.board = board;
            this.turn = 0;
            this.players = [
                new Relati.RelatiPlayer("O"),
                new Relati.RelatiPlayer("X")
            ];
            var cardCount = Math.ceil(board.width * board.height / 2) - 1;
            for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
                var player = _a[_i];
                player.hand.cards.push(Relati.RelatiCards.Leader);
                for (var i = 0; i < cardCount; i++) {
                    player.deck.cards.push(Relati.RelatiCards.Normal);
                }
            }
        }
        RelatiGame.prototype.getNowPlayer = function () {
            return this.players[this.turn % 2];
        };
        return RelatiGame;
    }());
    Relati.RelatiGame = RelatiGame;
})(Relati || (Relati = {}));
//# sourceMappingURL=RelatiGame.js.map
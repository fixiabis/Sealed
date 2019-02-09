"use strict";
var Relati;
(function (Relati) {
    var RelatiPlayer = /** @class */ (function () {
        function RelatiPlayer(ownerSymbol) {
            this.ownerSymbol = ownerSymbol;
            this.deck = new Relati.RelatiDeck();
            this.used = new Relati.RelatiDeck();
            this.hand = new Relati.RelatiDeck();
        }
        ;
        return RelatiPlayer;
    }());
    Relati.RelatiPlayer = RelatiPlayer;
})(Relati || (Relati = {}));
//# sourceMappingURL=RelatiPlayer.js.map
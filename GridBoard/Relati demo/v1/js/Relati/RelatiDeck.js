"use strict";
var Relati;
(function (Relati) {
    var RelatiDeck = /** @class */ (function () {
        function RelatiDeck() {
            this.cards = [];
        }
        RelatiDeck.prototype.shuffle = function () {
            for (var cardIndex = 0; cardIndex < this.cards.length; cardIndex++) {
                var randomIndex = Math.floor(Math.random() * this.cards.length);
                var card = this.cards[cardIndex];
                this.cards[cardIndex] = this.cards[randomIndex];
                this.cards[randomIndex] = card;
            }
        };
        return RelatiDeck;
    }());
    Relati.RelatiDeck = RelatiDeck;
})(Relati || (Relati = {}));
//# sourceMappingURL=RelatiDeck.js.map
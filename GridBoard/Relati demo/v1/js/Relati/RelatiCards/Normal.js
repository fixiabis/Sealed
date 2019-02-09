"use strict";
var Relati;
(function (Relati) {
    var RelatiCards;
    (function (RelatiCards) {
        RelatiCards.Normal = {
            when: function (game, grid, owner) {
                return (!grid.role.owner &&
                    Relati.RelatiRules.Relati.allow(game, grid, owner));
            },
            then: function (game, grid, owner) {
                grid.role.owner = owner;
                grid.role["relati-receiver"] = true;
                grid.role["relati-repeater"] = true;
                game.turn++;
            }
        };
    })(RelatiCards = Relati.RelatiCards || (Relati.RelatiCards = {}));
})(Relati || (Relati = {}));
//# sourceMappingURL=Normal.js.map
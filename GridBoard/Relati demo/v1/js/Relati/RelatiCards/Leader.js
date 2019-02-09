"use strict";
var Relati;
(function (Relati) {
    var RelatiCards;
    (function (RelatiCards) {
        RelatiCards.Leader = {
            when: function (game, grid, owner) {
                return (!grid.role.owner &&
                    game.turn <= 2);
            },
            then: function (game, grid, owner) {
                grid.role.owner = owner;
                grid.role.type = "leader";
                grid.role["relati-launcher"] = true;
                grid.role.effects.push(Relati.RelatiActions.RelatiBlock);
                game.turn++;
            }
        };
    })(RelatiCards = Relati.RelatiCards || (Relati.RelatiCards = {}));
})(Relati || (Relati = {}));
//# sourceMappingURL=Leader.js.map
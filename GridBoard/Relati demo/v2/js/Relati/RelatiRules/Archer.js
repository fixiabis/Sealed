"use strict";
var Relati;
(function (Relati) {
    var RelatiRules;
    (function (RelatiRules) {
        RelatiRules.Archer = {
            allow: function (game, grid, owner) {
                return grid.role.is("archer");
            },
            yield: function (game, grid, owner) {
                var board = game.board;
            }
        };
    })(RelatiRules = Relati.RelatiRules || (Relati.RelatiRules = {}));
})(Relati || (Relati = {}));
//# sourceMappingURL=Archer.js.map
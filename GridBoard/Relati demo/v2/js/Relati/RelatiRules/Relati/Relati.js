"use strict";
var Relati;
(function (Relati_1) {
    var RelatiRules;
    (function (RelatiRules) {
        RelatiRules.Relati = {
            allow: function (game, grid, owner) {
                return (RelatiRules.RelatiNormal.allow(game, grid, owner) ||
                    RelatiRules.RelatiRemote.allow(game, grid, owner));
            },
            trace: function (game, grid, owner) {
                return RelatiRules.RelatiNormal.trace(game, grid, owner).concat(RelatiRules.RelatiRemote.trace(game, grid, owner));
            }
        };
    })(RelatiRules = Relati_1.RelatiRules || (Relati_1.RelatiRules = {}));
})(Relati || (Relati = {}));
//# sourceMappingURL=Relati.js.map
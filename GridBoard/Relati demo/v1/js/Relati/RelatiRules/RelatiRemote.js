"use strict";
var Relati;
(function (Relati) {
    var RelatiRules;
    (function (RelatiRules) {
        RelatiRules.RelatiRemote = {
            allow: function (game, grid, owner) {
                return (RelatiRules.RelatiRemoteNormal.allow(game, grid, owner) ||
                    RelatiRules.RelatiRemoteStable.allow(game, grid, owner));
            },
            trace: function (game, grid, owner) {
                return RelatiRules.RelatiRemoteNormal.trace(game, grid, owner).concat(RelatiRules.RelatiRemoteStable.trace(game, grid, owner));
            }
        };
    })(RelatiRules = Relati.RelatiRules || (Relati.RelatiRules = {}));
})(Relati || (Relati = {}));
//# sourceMappingURL=RelatiRemote.js.map
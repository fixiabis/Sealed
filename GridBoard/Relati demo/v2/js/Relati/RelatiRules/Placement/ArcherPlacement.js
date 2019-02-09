"use strict";
var Relati;
(function (Relati) {
    var RelatiRules;
    (function (RelatiRules) {
        RelatiRules.ArcherPlacement = {
            allow: function (game, grid, owner) {
                if (!RelatiRules.RolePlacement.allow(game, grid, owner))
                    return false;
                return RelatiRules.RelatiNormal.allow(game, grid, owner);
            },
            trace: function (game, grid, owner) {
                return RelatiRules.RelatiNormal.trace(game, grid, owner);
            },
            yield: function (game, grid, owner) {
                grid.role.insertStatus("relati-normal-receiver");
                grid.role.insertStatus("archer");
                grid.role.owner = owner;
                grid.role.type = "general";
            }
        };
    })(RelatiRules = Relati.RelatiRules || (Relati.RelatiRules = {}));
})(Relati || (Relati = {}));
//# sourceMappingURL=ArcherPlacement.js.map
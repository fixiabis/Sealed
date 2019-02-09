"use strict";
var Relati;
(function (Relati) {
    var RelatiRules;
    (function (RelatiRules) {
        RelatiRules.NormalPlacement = {
            allow: function (game, grid, owner) {
                if (!RelatiRules.RolePlacement.allow(game, grid, owner))
                    return false;
                return RelatiRules.Relati.allow(game, grid, owner);
            },
            trace: function (game, grid, owner) {
                return RelatiRules.Relati.trace(game, grid, owner);
            },
            yield: function (game, grid, owner) {
                grid.role.insertStatus("relati-repeater");
                grid.role.insertStatus("relati-receiver");
                grid.role.owner = owner;
                grid.role.type = "normal";
            }
        };
    })(RelatiRules = Relati.RelatiRules || (Relati.RelatiRules = {}));
})(Relati || (Relati = {}));
//# sourceMappingURL=NormalPlacement.js.map
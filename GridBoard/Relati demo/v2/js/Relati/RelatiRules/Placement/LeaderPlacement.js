"use strict";
var Relati;
(function (Relati) {
    var RelatiRules;
    (function (RelatiRules) {
        RelatiRules.LeaderPlacement = {
            allow: function (game, grid, owner) {
                if (!RelatiRules.RolePlacement.allow(game, grid, owner))
                    return false;
                if (game.turn > 2)
                    return false;
                return true;
            },
            yield: function (game, grid, owner) {
                grid.role.insertStatus("relati-launcher");
                grid.role.owner = owner;
                grid.role.type = "leader";
                grid.role.effects.push(RelatiRules.RelatiBlock);
            }
        };
    })(RelatiRules = Relati.RelatiRules || (Relati.RelatiRules = {}));
})(Relati || (Relati = {}));
//# sourceMappingURL=LeaderPlacement.js.map
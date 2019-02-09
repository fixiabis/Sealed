"use strict";
var Relati;
(function (Relati) {
    var RelatiActions;
    (function (RelatiActions) {
        RelatiActions.LeaderPlacement = {
            when: function (game, grid, owner) {
                if (game.turn > 2)
                    return false;
                if (!grid.role.is("spaceR"))
                    return false;
                return true;
            },
            then: function (game, grid, owner) {
                grid.role.owner = owner;
                grid.role.type = "leader";
                grid.role["relati-launcher"] = true;
                grid.role.effects.push(RelatiActions.RelatiBlock);
                game.turn++;
            }
        };
    })(RelatiActions = Relati.RelatiActions || (Relati.RelatiActions = {}));
})(Relati || (Relati = {}));
//# sourceMappingURL=LeaderPlacement.js.map
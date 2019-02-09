"use strict";
var Relati;
(function (Relati) {
    var RelatiActions;
    (function (RelatiActions) {
        RelatiActions.NormalPlacement = {
            when: function (game, grid, owner) {
                if (!grid.role.is("spaceR"))
                    return false;
                if (!Relati.RelatiRules.Relati.allow(game, grid, owner))
                    return false;
                return true;
            },
            then: function (game, grid, owner) {
                grid.role.owner = owner;
                grid.role["relati-receiver"] = true;
                grid.role["relati-repeater"] = true;
                game.turn++;
            }
        };
    })(RelatiActions = Relati.RelatiActions || (Relati.RelatiActions = {}));
})(Relati || (Relati = {}));
//# sourceMappingURL=NormalPlacement.js.map
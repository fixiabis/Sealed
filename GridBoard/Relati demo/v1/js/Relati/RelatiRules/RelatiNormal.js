"use strict";
var Relati;
(function (Relati) {
    var RelatiRules;
    (function (RelatiRules) {
        var allowedStatus = [
            "relati-launcher",
            "relati-normal-launcher",
            "relati-repeater",
            "relati-normal-repeater"
        ].join("|");
        var blockedStatus = [
            "relati-blocked",
            "relati-normal-blocked"
        ].join("|");
        RelatiRules.RelatiNormal = {
            allow: function (game, grid, owner) {
                var targetGrids = grid.queries("O");
                for (var i = 0; i < targetGrids.length; i++) {
                    var targetGrid = targetGrids[i];
                    if (!targetGrid)
                        continue;
                    var targetRole = targetGrid.role;
                    if (targetRole.owner != owner)
                        continue;
                    if (!targetRole.is(allowedStatus))
                        continue;
                    if (targetRole.is(blockedStatus))
                        continue;
                    return true;
                }
                return false;
            },
            trace: function (game, grid, owner) {
                var targetGrids = grid.queries("O");
                var traces = [];
                for (var i = 0; i < targetGrids.length; i++) {
                    var targetGrid = targetGrids[i];
                    if (!targetGrid)
                        continue;
                    var targetRole = targetGrid.role;
                    if (targetRole.owner != owner)
                        continue;
                    if (!targetRole.is(allowedStatus))
                        continue;
                    if (targetRole.is(blockedStatus))
                        continue;
                    traces.push({ targetGrid: targetGrid, gridRoute: [] });
                }
                return traces;
            }
        };
    })(RelatiRules = Relati.RelatiRules || (Relati.RelatiRules = {}));
})(Relati || (Relati = {}));
//# sourceMappingURL=RelatiNormal.js.map
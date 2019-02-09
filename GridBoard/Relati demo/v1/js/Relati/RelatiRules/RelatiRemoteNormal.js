"use strict";
var Relati;
(function (Relati) {
    var RelatiRules;
    (function (RelatiRules) {
        var allowedStatus = [
            "relati-launcher",
            "relati-repeater",
            "relati-remote-launcher",
            "relati-remote-repeater",
            "relati-remote-normal-launcher",
            "relati-remote-normal-repeater"
        ].join("|");
        var blockedStatus = [
            "relati-blocked",
            "relati-remote-blocked",
            "relati-remote-normal-blocked"
        ].join("|");
        RelatiRules.RelatiRemoteNormal = {
            allow: function (game, grid, owner) {
                var targetGrids = grid.queries("2O,O");
                for (var i = 0; i < targetGrids.length; i += 2) {
                    var targetGrid = targetGrids[i];
                    var spaceGrid = targetGrids[i + 1];
                    if (!targetGrid)
                        continue;
                    var targetRole = targetGrid.role;
                    if (targetRole.owner != owner)
                        continue;
                    if (!targetRole.is(allowedStatus))
                        continue;
                    if (targetRole.is(blockedStatus))
                        continue;
                    var spaceRole = spaceGrid.role;
                    if (!spaceRole.is("space"))
                        continue;
                    return true;
                }
                return false;
            },
            trace: function (game, grid, owner) {
                var targetGrids = grid.queries("2O,O");
                var traces = [];
                for (var i = 0; i < targetGrids.length; i += 2) {
                    var targetGrid = targetGrids[i];
                    var spaceGrid = targetGrids[i + 1];
                    if (!targetGrid)
                        continue;
                    var targetRole = targetGrid.role;
                    if (targetRole.owner != owner)
                        continue;
                    if (!targetRole.is(allowedStatus))
                        continue;
                    if (targetRole.is(blockedStatus))
                        continue;
                    var spaceRole = spaceGrid.role;
                    if (!spaceRole.is("space"))
                        continue;
                    traces.push({ targetGrid: targetGrid, gridRoute: [spaceGrid] });
                }
                return traces;
            }
        };
    })(RelatiRules = Relati.RelatiRules || (Relati.RelatiRules = {}));
})(Relati || (Relati = {}));
//# sourceMappingURL=RelatiRemoteNormal.js.map
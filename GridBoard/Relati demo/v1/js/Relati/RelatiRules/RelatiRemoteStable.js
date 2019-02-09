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
            "relati-remote-stable-launcher",
            "relati-remote-stable-repeater"
        ].join("|");
        var blockedStatus = [
            "relati-blocked",
            "relati-remote-blocked",
            "relati-remote-stable-blocked"
        ].join("|");
        RelatiRules.RelatiRemoteStable = {
            allow: function (game, grid, owner) {
                var targetGrids = grid.queries("IIH,II,I,IH,H,HHI,HH,H,HI,I");
                for (var i = 0; i < targetGrids.length; i += 5) {
                    var targetGrid = targetGrids[i];
                    var spaceGrids = targetGrids.slice(i + 1, i + 5);
                    if (!targetGrid)
                        continue;
                    var targetRole = targetGrid.role;
                    if (targetRole.owner != owner)
                        continue;
                    if (!targetRole.is(allowedStatus))
                        continue;
                    if (targetRole.is(blockedStatus))
                        continue;
                    var spaceRoles = spaceGrids.map(function (grid) { return grid.role; });
                    for (var j = 0; j < spaceRoles.length - 1; j++) {
                        if (spaceRoles[j].is("space") && spaceRoles[j + 1].is("space")) {
                            return true;
                        }
                    }
                }
                return false;
            },
            trace: function (game, grid, owner) {
                var targetGrids = grid.queries("IIH,II,I,IH,H,HHI,HH,H,HI,I");
                var traces = [];
                for (var i = 0; i < targetGrids.length; i += 5) {
                    var targetGrid = targetGrids[i];
                    var spaceGrids = targetGrids.slice(i + 1, i + 5);
                    if (!targetGrid)
                        continue;
                    var targetRole = targetGrid.role;
                    if (targetRole.owner != owner)
                        continue;
                    if (!targetRole.is(allowedStatus))
                        continue;
                    if (targetRole.is(blockedStatus))
                        continue;
                    var spaceRoles = spaceGrids.map(function (grid) { return grid.role; });
                    for (var j = 0; j < spaceRoles.length - 1; j++) {
                        if (spaceRoles[j].is("space") && spaceRoles[j + 1].is("space")) {
                            traces.push({
                                targetGrid: targetGrid, gridRoute: [
                                    spaceRoles[j].grid,
                                    spaceRoles[j + 1].grid
                                ]
                            });
                        }
                    }
                }
                return traces;
            }
        };
    })(RelatiRules = Relati.RelatiRules || (Relati.RelatiRules = {}));
})(Relati || (Relati = {}));
//# sourceMappingURL=RelatiRemoteStable.js.map
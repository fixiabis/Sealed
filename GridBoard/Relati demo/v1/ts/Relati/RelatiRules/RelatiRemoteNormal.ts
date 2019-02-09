namespace Relati {
    export namespace RelatiRules {
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

        export var RelatiRemoteNormal: RelatiRuleTraceable = {
            allow(game, grid, owner) {
                var targetGrids = grid.queries("2O,O");

                for (var i = 0; i < targetGrids.length; i += 2) {
                    var targetGrid = targetGrids[i];
                    var spaceGrid = targetGrids[i + 1];
                    if (!targetGrid) continue;

                    var targetRole = targetGrid.role;
                    if (targetRole.owner != owner) continue;
                    if (!targetRole.is(allowedStatus)) continue;
                    if (targetRole.is(blockedStatus)) continue;

                    var spaceRole = spaceGrid.role;
                    if (!spaceRole.is("space")) continue;

                    return true;
                }

                return false;
            },
            trace(game, grid, owner) {
                var targetGrids = grid.queries("2O,O");
                var traces = [];

                for (var i = 0; i < targetGrids.length; i += 2) {
                    var targetGrid = targetGrids[i];
                    var spaceGrid = targetGrids[i + 1];
                    if (!targetGrid) continue;

                    var targetRole = targetGrid.role;
                    if (targetRole.owner != owner) continue;
                    if (!targetRole.is(allowedStatus)) continue;
                    if (targetRole.is(blockedStatus)) continue;

                    var spaceRole = spaceGrid.role;
                    if (!spaceRole.is("space")) continue;

                    traces.push({ targetGrid, gridRoute: [spaceGrid] });
                }

                return traces;
            }
        };
    }
}
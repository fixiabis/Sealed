"use strict";
var Relati;
(function (Relati) {
    var RelatiActions;
    (function (RelatiActions) {
        var receivedRelatiGrids = [];
        var RelatiRepeater = [
            "relati-launcher",
            "relati-repeater"
        ].join("|");
        var RelatiReceiver = [
            "relati-receiver"
        ].join("|");
        var RelatiNormalRepeater = [
            RelatiRepeater,
            "relati-normal-launcher",
            "relati-normal-repeater"
        ].join("|");
        var RelatiNormalReceiver = [
            RelatiReceiver,
            "relati-normal-receiver"
        ].join("|");
        var RelatiRemoteRepeater = [
            RelatiRepeater,
            "relati-remote-launcher",
            "relati-remote-repeater"
        ].join("|");
        var RelatiRemoteReceiver = [
            RelatiReceiver,
            "relati-remote-receiver",
        ].join("|");
        var RelatiRemoteNormalRepeater = [
            RelatiRemoteRepeater,
            "relati-remote-normal-launcher",
            "relati-remote-normal-repeater"
        ].join("|");
        var RelatiRemoteNormalReceiver = [
            RelatiRemoteReceiver,
            "relati-remote-normal-receiver"
        ].join("|");
        var RelatiRemoteStableRepeater = [
            RelatiRemoteRepeater,
            "relati-remote-stable-launcher",
            "relati-remote-stable-repeater"
        ].join("|");
        var RelatiRemoteStableReceiver = [
            RelatiRemoteReceiver,
            "relati-remote-stable-receiver"
        ].join("|");
        function launchRelati(grid, owner) {
            if (receivedRelatiGrids.indexOf(grid) != -1)
                return;
            receivedRelatiGrids.push(grid);
            if (grid.role.is(RelatiNormalRepeater)) {
                var targetGrids = grid.queries("O");
                for (var i = 0; i < targetGrids.length; i++) {
                    var targetGrid = targetGrids[i];
                    if (!targetGrid)
                        continue;
                    var targetRole = targetGrid.role;
                    if (targetRole.owner != owner)
                        continue;
                    if (!targetRole.is(RelatiNormalReceiver))
                        continue;
                    launchRelati(targetGrid, owner);
                }
            }
            if (grid.role.is(RelatiRemoteNormalRepeater)) {
                var targetGrids = grid.queries("2O,O");
                for (var i = 0; i < targetGrids.length; i += 2) {
                    var targetGrid = targetGrids[i];
                    var spaceGrid = targetGrids[i + 1];
                    if (!targetGrid)
                        continue;
                    var targetRole = targetGrid.role;
                    if (targetRole.owner != owner)
                        continue;
                    if (!targetRole.is(RelatiRemoteNormalReceiver))
                        continue;
                    var spaceRole = spaceGrid.role;
                    if (!spaceRole.is("space"))
                        continue;
                    launchRelati(targetGrid, owner);
                }
            }
            if (grid.role.is(RelatiRemoteStableRepeater)) {
                var targetGrids = grid.queries("IIH,II,I,IH,H,HHI,HH,H,HI,I");
                for (var i = 0; i < targetGrids.length; i += 5) {
                    var targetGrid = targetGrids[i];
                    var spaceGrids = targetGrids.slice(i + 1, i + 5);
                    if (!targetGrid)
                        continue;
                    var targetRole = targetGrid.role;
                    if (targetRole.owner != owner)
                        continue;
                    if (!targetRole.is(RelatiRemoteStableReceiver))
                        continue;
                    var spaceRoles = spaceGrids.map(function (grid) { return grid.role; });
                    for (var j = 0; j < spaceRoles.length - 1; j++) {
                        if (spaceRoles[j].is("space") && spaceRoles[j + 1].is("space")) {
                            launchRelati(targetGrid, owner);
                            break;
                        }
                    }
                }
            }
        }
        RelatiActions.RelatiBlock = {
            when: function (game, grid, owner) {
                return grid.role["relati-launcher"];
            },
            then: function (game, grid, owner) {
                var board = game.board;
                var owner = grid.role.owner;
                receivedRelatiGrids = [];
                for (var _i = 0, _a = board.gridList; _i < _a.length; _i++) {
                    var targetGrid = _a[_i];
                    if (targetGrid.role.owner != owner)
                        continue;
                    targetGrid.role["relati-blocked"] = false;
                    targetGrid.role["relati-normal-blocked"] = false;
                    targetGrid.role["relati-remote-blocked"] = false;
                    targetGrid.role["relati-remote-normal-blocked"] = false;
                    targetGrid.role["relati-remote-stable-blocked"] = false;
                }
                launchRelati(grid, owner);
                for (var _b = 0, _c = board.gridList; _b < _c.length; _b++) {
                    var targetGrid = _c[_b];
                    if (targetGrid.role.owner != owner)
                        continue;
                    if (receivedRelatiGrids.indexOf(targetGrid) != -1)
                        continue;
                    targetGrid.role["relati-blocked"] = true;
                }
            }
        };
    })(RelatiActions = Relati.RelatiActions || (Relati.RelatiActions = {}));
})(Relati || (Relati = {}));
//# sourceMappingURL=RelatiBlock.js.map
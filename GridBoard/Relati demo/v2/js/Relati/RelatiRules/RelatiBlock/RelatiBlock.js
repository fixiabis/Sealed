"use strict";
var Relati;
(function (Relati) {
    var RelatiRules;
    (function (RelatiRules) {
        var receivedGrids = [];
        var relatiNormalRepeater = [
            "relati-launcher",
            "relati-normal-launcher",
            "relati-repeater",
            "relati-normal-repeater"
        ].join("|");
        var relatiNormalReceiver = [
            "relati-receiver",
            "relati-normal-receiver"
        ].join("|");
        var relatiRemoteNormalRepeater = [
            "relati-launcher",
            "relati-remote-launcher",
            "relati-remote-normal-launcher",
            "relati-repeater",
            "relati-remote-repeater",
            "relati-remote-normal-repeater"
        ].join("|");
        var relatiRemoteNormalReceiver = [
            "relati-receiver",
            "relati-remote-receiver",
            "relati-remote-normal-receiver"
        ].join("|");
        var relatiRemoteStableRepeater = [
            "relati-launcher",
            "relati-remote-launcher",
            "relati-remote-stable-launcher",
            "relati-repeater",
            "relati-remote-repeater",
            "relati-remote-stable-repeater"
        ].join("|");
        var relatiRemoteStableReceiver = [
            "relati-receiver",
            "relati-remote-receiver",
            "relati-remote-stable-receiver"
        ].join("|");
        function RelatiTree(grid, owner) {
            if (receivedGrids.indexOf(grid) != -1)
                return;
            receivedGrids.push(grid);
            if (grid.role.is(relatiNormalRepeater)) {
                var targetGrids = grid.queries("O");
                for (var i = 0; i < targetGrids.length; i++) {
                    var targetGrid = targetGrids[i];
                    if (!targetGrid)
                        continue;
                    var targetRole = targetGrid.role;
                    if (targetRole.owner != owner)
                        continue;
                    if (!targetRole.is(relatiNormalReceiver))
                        continue;
                    RelatiTree(targetGrid, owner);
                }
            }
            if (grid.role.is(relatiRemoteNormalRepeater)) {
                var targetGrids = grid.queries("2O,O");
                for (var i = 0; i < targetGrids.length; i += 2) {
                    var targetGrid = targetGrids[i];
                    var spaceGrid = targetGrids[i + 1];
                    if (!targetGrid)
                        continue;
                    var targetRole = targetGrid.role;
                    if (targetRole.owner != owner)
                        continue;
                    if (!targetRole.is(relatiRemoteNormalReceiver))
                        continue;
                    var spaceRole = spaceGrid.role;
                    if (!spaceRole.is("space"))
                        continue;
                    RelatiTree(targetGrid, owner);
                }
            }
            if (grid.role.is(relatiRemoteStableRepeater)) {
                var targetGrids = grid.queries("IIH,II,I,IH,H,HHI,HH,H,HI,I");
                for (var i = 0; i < targetGrids.length; i += 5) {
                    var targetGrid = targetGrids[i];
                    var spaceGrids = targetGrids.slice(i + 1, i + 5);
                    if (!targetGrid)
                        continue;
                    var targetRole = targetGrid.role;
                    if (targetRole.owner != owner)
                        continue;
                    if (!targetRole.is(relatiRemoteStableReceiver))
                        continue;
                    var spaceRoles = spaceGrids.map(function (grid) { return grid.role; });
                    for (var j = 0; j < spaceRoles.length - 1; j++) {
                        if (spaceRoles[j].is("space") && spaceRoles[j + 1].is("space")) {
                            RelatiTree(targetGrid, owner);
                            break;
                        }
                    }
                }
            }
        }
        RelatiRules.RelatiBlock = {
            allow: function (game, grid, owner) {
                return grid.role.is("relati-launcher");
            },
            yield: function (game, grid, owner) {
                var board = game.board;
                owner = grid.role.owner;
                for (var _i = 0, _a = board.gridList; _i < _a.length; _i++) {
                    var grid_1 = _a[_i];
                    if (grid_1.role.owner != owner)
                        continue;
                    grid_1.role.deleteStatus("relati-blocked");
                    grid_1.role.deleteStatus("relati-normal-blocked");
                    grid_1.role.deleteStatus("relati-remote-blocked");
                    grid_1.role.deleteStatus("relati-remote-normal-blocked");
                    grid_1.role.deleteStatus("relati-remote-stable-blocked");
                }
                receivedGrids = [];
                RelatiTree(grid, owner);
                for (var _b = 0, _c = board.gridList; _b < _c.length; _b++) {
                    var grid_2 = _c[_b];
                    if (receivedGrids.indexOf(grid_2) != -1)
                        continue;
                    if (grid_2.role.owner != owner)
                        continue;
                    grid_2.role.insertStatus("relati-blocked");
                }
            }
        };
    })(RelatiRules = Relati.RelatiRules || (Relati.RelatiRules = {}));
})(Relati || (Relati = {}));
//# sourceMappingURL=RelatiBlock.js.map
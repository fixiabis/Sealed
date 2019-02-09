namespace Relati {
    export namespace RelatiActions {
        var receivedRelatiGrids: RelatiGrid[] = [];
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

        function launchRelati(grid: RelatiGrid, owner: RelatiPlayer) {
            if (receivedRelatiGrids.indexOf(grid) != -1) return;
            receivedRelatiGrids.push(grid);

            if (grid.role.is(RelatiNormalRepeater)) {
                var targetGrids = grid.queries("O");

                for (var i = 0; i < targetGrids.length; i++) {
                    var targetGrid = targetGrids[i];
                    if (!targetGrid) continue;

                    var targetRole = targetGrid.role;
                    if (targetRole.owner != owner) continue;

                    if (!targetRole.is(RelatiNormalReceiver)) continue;

                    launchRelati(targetGrid, owner);
                }
            }

            if (grid.role.is(RelatiRemoteNormalRepeater)) {
                var targetGrids = grid.queries("2O,O");

                for (var i = 0; i < targetGrids.length; i += 2) {
                    var targetGrid = targetGrids[i];
                    var spaceGrid = targetGrids[i + 1];
                    if (!targetGrid) continue;

                    var targetRole = targetGrid.role;
                    if (targetRole.owner != owner) continue;

                    if (!targetRole.is(RelatiRemoteNormalReceiver)) continue;

                    var spaceRole = spaceGrid.role;
                    if (!spaceRole.is("space")) continue;

                    launchRelati(targetGrid, owner);
                }
            }

            if (grid.role.is(RelatiRemoteStableRepeater)) {
                var targetGrids = grid.queries("IIH,II,I,IH,H,HHI,HH,H,HI,I");

                for (var i = 0; i < targetGrids.length; i += 5) {
                    var targetGrid = targetGrids[i];
                    var spaceGrids = targetGrids.slice(i + 1, i + 5);
                    if (!targetGrid) continue;

                    var targetRole = targetGrid.role;
                    if (targetRole.owner != owner) continue;

                    if (!targetRole.is(RelatiRemoteStableReceiver)) continue;

                    var spaceRoles = spaceGrids.map(grid => grid.role);

                    for (var j = 0; j < spaceRoles.length - 1; j++) {
                        if (spaceRoles[j].is("space") && spaceRoles[j + 1].is("space")) {
                            launchRelati(targetGrid, owner);
                            break;
                        }
                    }
                }
            }
        }

        export var RelatiBlock: RelatiAction = {
            when(game, grid, owner) {
                return grid.role["relati-launcher"];
            },
            then(game, grid, owner) {
                var { board } = game;
                var { owner } = grid.role;
                receivedRelatiGrids = [];

                for (var targetGrid of board.gridList) {
                    if (targetGrid.role.owner != owner) continue;
                    targetGrid.role["relati-blocked"] = false;
                    targetGrid.role["relati-normal-blocked"] = false;
                    targetGrid.role["relati-remote-blocked"] = false;
                    targetGrid.role["relati-remote-normal-blocked"] = false;
                    targetGrid.role["relati-remote-stable-blocked"] = false;
                }

                launchRelati(grid, owner);

                for (var targetGrid of board.gridList) {
                    if (targetGrid.role.owner != owner) continue;
                    if (receivedRelatiGrids.indexOf(targetGrid) != -1) continue;
                    targetGrid.role["relati-blocked"] = true;
                }
            }
        }
    }
}
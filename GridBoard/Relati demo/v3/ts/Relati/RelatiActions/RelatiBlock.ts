namespace Relati {
    export var RelatiBlockGridStatus: RelatiRoleStatus[] = [
        "relati-blocked",
        "relati-normal-blocked",
        "relati-remote-blocked",
        "relati-remote-normal-blocked",
        "relati-remote-stable-blocked"
    ];

    export var RelatiBlock: RelatiAction = {
        action({ game, owner, grid }) {
            if (!game || !owner || !grid) return;

            for (let grid of game.board.gridList) {
                if (!grid.role) continue;
                if (grid.role.owner != owner) continue;

                for (var status of RelatiBlockGridStatus) {
                    if (grid.role.is(status)) {
                        grid.role.lost(status);
                    }
                }
            }

            relatiGridList = [];
            relatiExpand(grid, owner);

            for (let grid of game.board.gridList) {
                if (!grid.role) continue;
                if (grid.role.owner != owner) continue;

                if (relatiGridList.indexOf(grid) < 0) {
                    grid.role.gain("relati-blocked");
                }
            }
        }
    };

    var relatiGridList: RelatiGrid[] = [];

    function relatiExpand(grid: RelatiGrid, owner: RelatiPlayer) {
        if (relatiGridList.indexOf(grid) > -1) return;
        relatiGridList.push(grid);

        var ruleTraces = RelatiRules.RelatiBlock.trace({ owner, grid });

        for (var trace of ruleTraces) {
            var targetGrid = trace.target;
            relatiExpand(targetGrid, owner);
        }
    }
}
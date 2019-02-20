import { RelatiRoleEffect } from "../RelatiRole";
import { RelatiGrid } from "../RelatiBoard";
import { RelatiPlayer } from "../RelatiPlayer";
import * as RelatiRules from "../RelatiRules";

export var RelatiMaintain: RelatiRoleEffect = {
    name: "連結維持",
    do({ game, grid }) {
        if (
            !game || !grid || !grid.role ||
            game.turn < game.players.length
        ) return;

        var owner = grid.role.owner;

        for (let grid of game.board.gridList) {
            if (grid.role && grid.role.owner === owner) {
                grid.role.status["relati-repeater"] = false;
            }
        }

        maintain(grid, owner);
    }
};

function maintain(grid: RelatiGrid, owner: RelatiPlayer) {
    if (!grid.role || grid.role.status["relati-repeater"]) return;
    grid.role.status["relati-repeater"] = true;

    var ruleTraces = RelatiRules.RelatiToTarget.trace({ owner, grid });

    for (var trace of ruleTraces) {
        var targetGrid = trace.target;
        maintain(targetGrid, owner);
    }
}
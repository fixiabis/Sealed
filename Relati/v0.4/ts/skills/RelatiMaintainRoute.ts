import { RelatiSkill } from "../RelatiSkill";
import { RelatiGrid } from "../RelatiBoard";
import { RelatiGame } from "../RelatiGame";
import { RelatiPlayer } from "../RelatiPlayer";
import { RelatiTargetPathRule } from "../rules/RelatiToTarget";
import { RelatiRoleStatus } from "../RelatiRoleStatus";

export type RelatiMaintainRouteState = {
    game: RelatiGame;
    grid: RelatiGrid;
    status: RelatiRoleStatus.RelatiRepeater;
    toTarget: RelatiTargetPathRule;
};

export type RelatiMaintainRouteSkill = RelatiSkill<RelatiMaintainRouteState>;

export var RelatiMaintainRoute: RelatiMaintainRouteSkill = {
    name: "連結維持",
    type: "effect",
    do({ game, grid: launcher, status, toTarget }) {
        if (!launcher.role || game.turn < game.playerCount) return;
        var owner = launcher.role.owner;

        for (var grid of game.board.gridList) {
            if (grid.role && grid.role.owner === owner) {
                grid.role.lost(status);
            }
        }

        maintainRoute(launcher, owner, status, toTarget);
    }
};

function maintainRoute(
    grid: RelatiGrid,
    owner: RelatiPlayer,
    status: RelatiRoleStatus,
    toTarget: RelatiTargetPathRule
) {
    if (!grid.role || grid.role.is(status)) return;
    grid.role.gain(status);

    var traces = toTarget.trace({ grid, owner });

    for (var trace of traces) {
        var targetGrid = trace.target;
        maintainRoute(targetGrid, owner, status, toTarget);
    }
}
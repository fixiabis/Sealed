import { RelatiSkill } from "../RelatiSkill";
import { RelatiRole, RelatiRoleStatus } from "../RelatiRole";
import { RelatiProtocol } from "../rules/RelatiProtocol";
import { RelatiGame } from "../RelatiGame";

export interface RelatiRecoveryState {
    game: RelatiGame;
    role: RelatiRole;
}

export type RelatiRecoverySkill = RelatiSkill<RelatiRecoveryState>;

export let RelatiRecovery: RelatiRecoverySkill = {
    type: "effect",
    name: "連結恢復",
    detail: "將所有連結狀態恢復",
    priority: 1,
    async do({ game, game: { board }, role, role: { owner, grid } }) {
        if (
            game.turn < game.playerCount ||
            !role.is("relati-launcher")
        ) return;

        for (var grid of board.gridList) {
            if (grid.role && grid.role.owner == owner) {
                grid.role.lost("relati-repeater");
            }
        }

        await recovery(role);
    }
};

const status: RelatiRoleStatus[] = ["relati-receiver"];
const type = { from: "relati-target", to: "relati-source" };

async function recovery(role: RelatiRole) {
    if (role.is("relati-repeater")) return;
    role.gain("relati-repeater");

    var receiversTrace = RelatiProtocol.trace({ role, status, type });

    await Promise.all(receiversTrace.map(
        ({ target }) => new Promise<void>(resolve => {
            if (!target.role) return resolve();
            recovery(target.role).then(resolve);
        })
    ));
}
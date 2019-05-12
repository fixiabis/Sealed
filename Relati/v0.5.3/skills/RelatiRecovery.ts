import { RelatiSkill } from "../RelatiSkill";
import { RelatiRole } from "../RelatiRole";
import { RelatiPath } from "../rules/RelatiPath";
import { RelatiGame } from "../RelatiGame";

export var RelatiRecovery: RelatiSkill<{ game: RelatiGame, role: RelatiRole }> = {
    type: "effect",
    name: "連結恢復",
    detail: "將所有連結狀態恢復",
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

async function recovery(role: RelatiRole) {
    if (role.is("relati-repeater")) return;
    role.gain("relati-repeater");

    var receiversTrace = RelatiPath.trace({
        role,
        status: ["relati-receiver"],
        fromType: "relati-target",
        toType: "relati-source"
    });

    await Promise.all(receiversTrace.map(
        ({ target }) => new Promise<void>(function (resolve) {
            if (!target.role) return resolve();
            recovery(target.role).then(resolve);
        })
    ));
}
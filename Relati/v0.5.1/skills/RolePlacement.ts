import { RelatiSkill } from "../RelatiSkill";
import { Placement } from "../rules/Placement";
import { RelatiGame } from "../RelatiGame";
import { RelatiRole } from "../RelatiRole";

export var RolePlacement: RelatiSkill<{
    game: RelatiGame,
    role: RelatiRole
}> = {
    type: "action",
    name: "角色放置",
    detail: "放置角色至棋盤格",
    async do({ game, role }) {
        var { grid } = role;

        if (Placement.allow({ role, game })) {
            grid.role = role;
            game.turn++;
        }
    }
};
import { RelatiSkill } from "../RelatiSkill";
import { Placement } from "../rules/Placement";
import { RelatiGame } from "../RelatiGame";
import { RelatiRole } from "../RelatiRole";

type RolePlacementState = {
    game: RelatiGame,
    role: RelatiRole
};

type RolePlacementSkill = RelatiSkill<RolePlacementState>;

export var RolePlacement: RolePlacementSkill = {
    type: "action",
    name: "角色放置",
    detail: "放置角色至棋盤格",
    async do({ game, role, role: { grid } }) {
        if (!Placement.allow({ game, role })) return;
        grid.role = role;
        game.turn++;

        if (game.turn >= game.playerCount) {
            role.owner.leader.points["summon-assets"] -= (
                role.points["summon-cost"]
            );
        }
    }
};
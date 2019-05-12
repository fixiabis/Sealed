import { RelatiSkill } from "../RelatiSkill";
import { RelatiGame } from "../RelatiGame";
import { RelatiRole } from "../RelatiRole";
import { Placement } from "../rules/Placement";

export interface RoleSummonState {
    game: RelatiGame;
    role: RelatiRole;
}

export type RoleSummonSkill = RelatiSkill<RoleSummonState>;

export let RoleSummon: RoleSummonSkill = {
    type: "action",
    name: "召喚角色",
    detail: "放置角色至棋盤格",
    async do({ game, game: { allPlayerReady }, role, role: { grid, owner: { leader } } }) {
        if (!Placement.allow({ game, role })) return;
        grid.role = role;
        game.turn++;

        if (allPlayerReady) {
            (leader as RelatiRole).points["summon-assets"] -= (
                role.points["summon-cost"]
            );
        }
    }
};
import { RelatiGame } from "../RelatiGame";
import { RelatiRole } from "../RelatiRole";
import { RelatiSkill } from "../RelatiSkill";
import { RoleSummon } from "../rules/RoleSummon";

export interface NormalRoleSummonState {
    game: RelatiGame;
    role: RelatiRole;
}

export type NormalRoleSummonSkill = RelatiSkill<NormalRoleSummonState>;

export let NormalRoleSummon: NormalRoleSummonSkill = {
    type: "action",
    name: "一般召喚",
    detail: "召喚角色至棋盤上",
    priority: 0,
    async do({ game, role }) {
        if (!RoleSummon.allow({ game, role })) return;

        await game.do("role-create", role);

        if (game.turn < game.playerCount) {
            await game.do("role-leader", role);
        }

        await game.do("next-player");
    }
};
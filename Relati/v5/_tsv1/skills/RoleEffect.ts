import { RelatiSkill } from "../RelatiSkill";

export var RoleEffect: RelatiSkill = {
    type: "effect",
    name: "角色被動技能啟動",
    detail: "任何效果發動時將會啟動",
    async do({ game, grid, role, card, skill }) {
        var { board } = game;

        for (var { role } of board.gridList) {
            if (role) for (var roleSkill of role.skills) {
                if (roleSkill.type == "effect") {
                    await roleSkill.do({ game, grid, role, card, skill });
                }
            }
        }
    }
};
import { RelatiSkill } from "../RelatiSkill";
import { RelatiGame } from "../RelatiGame";

export var RoleInfoUpdate: RelatiSkill = {
    type: "effect",
    name: "角色資訊更新",
    detail: "更新角色的資訊",
    async do({ game }) {
        var { board } = game;

        for (var { role } of board.gridList) {
            if (role) {
                var { info } = role;
                Object.assign(info.status = {}, role.status);
                Object.assign(info.points = {}, role.points);
                Object.assign(info.params = {}, role.params);
                Object.assign(info.skills = [], role.skills);
            }
        }
    }
};
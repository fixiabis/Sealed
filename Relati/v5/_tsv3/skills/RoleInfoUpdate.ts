import { RelatiSkill } from "../RelatiSkill";
import { RelatiRoleInfo } from "../RelatiRole";

export var RoleInfoUpdate: RelatiSkill = {
    type: "effect",
    name: "角色資訊更新",
    detail: "更新角色的資訊",
    async do({ game: { board } }) {
        for (var { role, role: { info } } of board.gridList) {
            if (!role) continue;
            Object.assign(info.status = {}, role.status);
            Object.assign(info.points = {} as RelatiRoleInfo["points"], role.points);
            Object.assign(info.params = {}, role.params);
            Object.assign(info.skills = [], role.skills);
        }
    }
};
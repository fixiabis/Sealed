import { RelatiSkill } from "../RelatiSkill";
import { RelatiRole } from "../RelatiRole";

export interface RelatiDestoryState {
    owner: RelatiRole;
}

export type RelatiDestorySkill = RelatiSkill<RelatiDestoryState>;

export let RelatiDestory: RelatiDestorySkill = {
    when: "next-player",
    type: "effect",
    name: "連結破壞",
    detail: "破壞對方所有角色的連結轉發機能",
    priority: 0,
    async do({ owner: { owner, grid: { board: { gridList } } } }) {
        for (var { role } of gridList) {
            if (role && role.owner != owner) {
                role.lost("relati-repeater");
            }
        }
    }
};
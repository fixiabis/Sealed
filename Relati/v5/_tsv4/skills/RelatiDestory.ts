import { RelatiSkill } from "../RelatiSkill";
import { RelatiRole } from "../RelatiRole";
import { RelatiGame } from "../RelatiGame";

export interface RelatiDestoryState {
    game: RelatiGame;
    role: RelatiRole;
}

export type RelatiDestorySkill = RelatiSkill<RelatiDestoryState>;

export let RelatiDestory: RelatiDestorySkill = {
    type: "effect",
    name: "連結破壞",
    detail: "將對方所有角色的連結轉發機能撤銷",
    priority: 0,
    async do({ role: { owner }, game: { board: { gridList } } }) {
        for (var { role } of gridList) {
            if (role && role.owner !== owner) {
                role.lost("relati-repeater");
            }
        }
    }
};
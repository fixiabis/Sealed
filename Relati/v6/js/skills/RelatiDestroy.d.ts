import { RelatiSkill } from "../RelatiSkill";
import { RelatiRole } from "../RelatiRole";
export interface RelatiDestoryState {
    owner: RelatiRole;
}
export declare type RelatiDestorySkill = RelatiSkill<RelatiDestoryState>;
export declare let RelatiDestory: RelatiDestorySkill;

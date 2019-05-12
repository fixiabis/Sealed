import { RelatiSkill } from "../RelatiSkill";
import { RelatiRole } from "../RelatiRole";
export interface RelatiRestoreState {
    owner: RelatiRole;
}
export declare type RelatiRestoreSkill = RelatiSkill<RelatiRestoreState>;
export declare let RelatiRestore: RelatiRestoreSkill;

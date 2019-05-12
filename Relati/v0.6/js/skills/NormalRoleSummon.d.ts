import { RelatiGame } from "../RelatiGame";
import { RelatiRole } from "../RelatiRole";
import { RelatiSkill } from "../RelatiSkill";
export interface NormalRoleSummonState {
    game: RelatiGame;
    role: RelatiRole;
}
export declare type NormalRoleSummonSkill = RelatiSkill<NormalRoleSummonState>;
export declare let NormalRoleSummon: NormalRoleSummonSkill;

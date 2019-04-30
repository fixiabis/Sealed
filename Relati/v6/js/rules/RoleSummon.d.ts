import { RelatiRule } from "../RelatiRule";
import { RelatiGameState } from "../RelatiGame";
export declare type RoleSummonRuleState = RelatiGameState & {
    allowCache?: boolean;
};
export declare type RoleSummonRule = RelatiRule<RoleSummonRuleState>;
export declare let RoleSummon: RoleSummonRule;

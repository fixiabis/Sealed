import { RelatiRuleTraceable } from "../RelatiRule";
import { RelatiRoleStatus } from "../RelatiRoleStatus";
import { RelatiGrid } from "../RelatiBoard";
import { RelatiPlayer } from "../RelatiPlayer";
/** 目標連結規則所需狀態 */
export declare type RelatiTargetPathState = {
    grid: RelatiGrid;
    owner: RelatiPlayer;
};
/** 目標連結規則 */
export declare type RelatiTargetPathRule = RelatiRuleTraceable<RelatiTargetPathState>;
/** 通用連結目標狀態 */
export declare var RelatiCommonTargetStatus: RelatiRoleStatus[];
/** 通用連結目標規則 */
export declare var RelatiCommonToTarget: RelatiTargetPathRule;
/** 一般連結目標狀態 */
export declare var RelatiNormalTargetStatus: RelatiRoleStatus[];
/** 一般連結目標規則 */
export declare var RelatiNormalToTarget: RelatiTargetPathRule;
/** 遠程連結目標狀態 */
export declare var RelatiRemoteTargetStatus: RelatiRoleStatus[];
/** 遠程連結目標規則 */
export declare var RelatiRemoteToTarget: RelatiTargetPathRule;
/** 遠程一般連結目標狀態 */
export declare var RelatiRemoteNormalTargetStatus: RelatiRoleStatus[];
/** 遠程一般連結目標規則 */
export declare var RelatiRemoteNormalToTarget: RelatiTargetPathRule;
/** 遠程穩定連結目標狀態 */
export declare var RelatiRemoteStableTargetStatus: RelatiRoleStatus[];
/** 遠程穩定連結目標規則 */
export declare var RelatiRemoteStableToTarget: RelatiTargetPathRule;

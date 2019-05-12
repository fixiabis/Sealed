import { RelatiRuleTraceable } from "../RelatiRule";
import { RelatiRoleStatus } from "../RelatiRoleStatus";
import { RelatiGrid } from "../RelatiBoard";
import { RelatiPlayer } from "../RelatiPlayer";
/** 來源連結規則所需狀態 */
export declare type RelatiSourcePathState = {
    grid: RelatiGrid;
    owner: RelatiPlayer;
};
/** 來源連結規則 */
export declare type RelatiSourcePathRule = RelatiRuleTraceable<RelatiSourcePathState>;
/** 通用連結來源狀態 */
export declare var RelatiCommonSourceStatus: RelatiRoleStatus[];
/** 通用連結來源規則 */
export declare var RelatiCommonBySource: RelatiSourcePathRule;
/** 一般連結來源狀態 */
export declare var RelatiNormalSourceStatus: RelatiRoleStatus[];
/** 一般連結來源規則 */
export declare var RelatiNormalBySource: RelatiSourcePathRule;
/** 遠程連結來源狀態 */
export declare var RelatiRemoteSourceStatus: RelatiRoleStatus[];
/** 遠程連結來源規則 */
export declare var RelatiRemoteBySource: RelatiSourcePathRule;
/** 遠程一般連結來源狀態 */
export declare var RelatiRemoteNormalSourceStatus: RelatiRoleStatus[];
/** 遠程一般連結來源規則 */
export declare var RelatiRemoteNormalBySource: RelatiSourcePathRule;
/** 遠程穩定連結來源狀態 */
export declare var RelatiRemoteStableSourceStatus: RelatiRoleStatus[];
/** 遠程穩定連結來源規則 */
export declare var RelatiRemoteStableBySource: RelatiSourcePathRule;

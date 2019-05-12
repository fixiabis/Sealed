import { RelatiRuleTraceable } from "../RelatiRule";
import { RelatiRoleStatus } from "../RelatiRoleStatus";
import { RelatiGrid } from "../RelatiBoard";
import { RelatiPlayer } from "../RelatiPlayer";
/** 連結路徑規則所需狀態 */
export declare type RelatiPathState = {
    grid: RelatiGrid;
    owner: RelatiPlayer;
    status: RelatiRoleStatus[];
};
/** 連結路徑規則 */
export declare type RelatiPathRule = RelatiRuleTraceable<RelatiPathState>;
/** 通用連結路徑規則 */
export declare var RelatiCommonPath: RelatiPathRule;
/** 一般連結路徑規則 */
export declare var RelatiNormalPath: RelatiPathRule;
/** 遠程連結路徑規則 */
export declare var RelatiRemotePath: RelatiPathRule;
/** 遠程一般連結路徑規則 */
export declare var RelatiRemoteNormalPath: RelatiPathRule;
/** 遠程穩定連結路徑規則 */
export declare var RelatiRemoteStablePath: RelatiPathRule;

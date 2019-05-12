import { RelatiRuleTraceable, RelatiRuleTraces } from "../RelatiRule";
import { RelatiRole, RelatiRoleStatus } from "../RelatiRole";
import { RelatiGrid } from "../RelatiBoard";
import { JSONData } from "../Relati";
export declare type RelatiProtocolType = "relati-source" | "relati-target";
export declare type RelatiProtocolParams = RelatiRole["params"][RelatiProtocolType];
export declare type RelatiProtocolRuleState = {
    role: RelatiRole;
    sourceType: RelatiProtocolType;
    targetType: RelatiProtocolType;
    relyStatus: RelatiRoleStatus[];
    allowCache?: boolean;
};
export declare type RelatiProtocolRule = {
    parse(grid: RelatiGrid, protocol: RelatiProtocolParams, allowCache: boolean): RelatiRuleTraces;
    cache: JSONData<JSONData<RelatiRuleTraces>>;
} & RelatiRuleTraceable<RelatiProtocolRuleState>;
export declare let RelatiProtocol: RelatiProtocolRule;
export declare namespace RelatiProtocolParams {
    const RelatiNormal: string;
    const RelatiRemoteNormal: string;
    const RelatiRemoteStable: string;
    const RelatiRemote: string;
    const RelatiCommon: string;
}

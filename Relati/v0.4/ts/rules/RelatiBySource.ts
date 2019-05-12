import { RelatiRuleTraceable } from "../RelatiRule";
import { RelatiRoleStatus } from "../RelatiRoleStatus";
import { RelatiGrid } from "../RelatiBoard";
import { RelatiPlayer } from "../RelatiPlayer";

import {
    RelatiPathState,
    RelatiNormalPath,
    RelatiRemoteNormalPath,
    RelatiRemoteStablePath
} from "././RelatiPath";

/** 來源連結規則所需狀態 */
export type RelatiSourcePathState = {
    grid: RelatiGrid,
    owner: RelatiPlayer
};

/** 來源連結規則 */
export type RelatiSourcePathRule = RelatiRuleTraceable<RelatiSourcePathState>;

/** 通用連結來源狀態 */
export var RelatiCommonSourceStatus: RelatiRoleStatus[] = [
    "relati-launcher",
    "relati-repeater"
];

/** 通用連結來源規則 */
export var RelatiCommonBySource: RelatiSourcePathRule = {
    allow(state: RelatiPathState) {
        return (
            RelatiNormalBySource.allow(state),
            RelatiRemoteBySource.allow(state)
        );
    },
    trace(state: RelatiPathState) {
        return [
            ...RelatiNormalBySource.trace(state),
            ...RelatiRemoteBySource.trace(state)
        ];
    }
};

/** 一般連結來源狀態 */
export var RelatiNormalSourceStatus: RelatiRoleStatus[] = [
    ...RelatiCommonSourceStatus,
    "relati-normal-launcher",
    "relati-normal-repeater"
];

/** 一般連結來源規則 */
export var RelatiNormalBySource: RelatiSourcePathRule = {
    allow(state: RelatiPathState) {
        state.status = RelatiNormalSourceStatus;
        return RelatiNormalPath.allow(state);
    },
    trace(state: RelatiPathState) {
        state.status = RelatiNormalSourceStatus;
        return RelatiNormalPath.trace(state);
    }
};

/** 遠程連結來源狀態 */
export var RelatiRemoteSourceStatus: RelatiRoleStatus[] = [
    ...RelatiCommonSourceStatus,
    "relati-remote-launcher",
    "relati-remote-repeater"
];

/** 遠程連結來源規則 */
export var RelatiRemoteBySource: RelatiSourcePathRule = {
    allow(state: RelatiPathState) {
        return (
            RelatiRemoteNormalBySource.allow(state),
            RelatiRemoteStableBySource.allow(state)
        );
    },
    trace(state: RelatiPathState) {
        return [
            ...RelatiRemoteNormalBySource.trace(state),
            ...RelatiRemoteStableBySource.trace(state)
        ];
    }
};

/** 遠程一般連結來源狀態 */
export var RelatiRemoteNormalSourceStatus: RelatiRoleStatus[] = [
    ...RelatiRemoteSourceStatus,
    "relati-remote-normal-launcher",
    "relati-remote-normal-repeater"
];

/** 遠程一般連結來源規則 */
export var RelatiRemoteNormalBySource: RelatiSourcePathRule = {
    allow(state: RelatiPathState) {
        state.status = RelatiRemoteNormalSourceStatus;
        return RelatiRemoteNormalPath.allow(state);
    },
    trace(state: RelatiPathState) {
        state.status = RelatiRemoteNormalSourceStatus;
        return RelatiRemoteNormalPath.trace(state);
    }
};

/** 遠程穩定連結來源狀態 */
export var RelatiRemoteStableSourceStatus: RelatiRoleStatus[] = [
    ...RelatiRemoteSourceStatus,
    "relati-remote-stable-launcher",
    "relati-remote-stable-repeater"
];

/** 遠程穩定連結來源規則 */
export var RelatiRemoteStableBySource: RelatiSourcePathRule = {
    allow(state: RelatiPathState) {
        state.status = RelatiRemoteStableSourceStatus;
        return RelatiRemoteStablePath.allow(state);
    },
    trace(state: RelatiPathState) {
        state.status = RelatiRemoteStableSourceStatus;
        return RelatiRemoteStablePath.trace(state);
    }
};
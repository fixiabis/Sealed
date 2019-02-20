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

/** 目標連結規則所需狀態 */
export type RelatiTargetPathState = {
    grid: RelatiGrid,
    owner: RelatiPlayer
};

/** 目標連結規則 */
export type RelatiTargetPathRule = RelatiRuleTraceable<RelatiTargetPathState>;

/** 通用連結目標狀態 */
export var RelatiCommonTargetStatus: RelatiRoleStatus[] = [
    "relati-receiver"
];

/** 通用連結目標規則 */
export var RelatiCommonToTarget: RelatiTargetPathRule = {
    allow(state: RelatiPathState) {
        return (
            RelatiNormalToTarget.allow(state),
            RelatiRemoteToTarget.allow(state)
        );
    },
    trace(state: RelatiPathState) {
        return [
            ...RelatiNormalToTarget.trace(state),
            ...RelatiRemoteToTarget.trace(state)
        ];
    }
};

/** 一般連結目標狀態 */
export var RelatiNormalTargetStatus: RelatiRoleStatus[] = [
    ...RelatiCommonTargetStatus,
    "relati-normal-receiver"
];

/** 一般連結目標規則 */
export var RelatiNormalToTarget: RelatiTargetPathRule = {
    allow(state: RelatiPathState) {
        state.status = RelatiNormalTargetStatus;
        return RelatiNormalPath.allow(state);
    },
    trace(state: RelatiPathState) {
        state.status = RelatiNormalTargetStatus;
        return RelatiNormalPath.trace(state);
    }
};

/** 遠程連結目標狀態 */
export var RelatiRemoteTargetStatus: RelatiRoleStatus[] = [
    ...RelatiCommonTargetStatus,
    "relati-remote-receiver"
];

/** 遠程連結目標規則 */
export var RelatiRemoteToTarget: RelatiTargetPathRule = {
    allow(state: RelatiPathState) {
        return (
            RelatiRemoteNormalToTarget.allow(state),
            RelatiRemoteStableToTarget.allow(state)
        );
    },
    trace(state: RelatiPathState) {
        return [
            ...RelatiRemoteNormalToTarget.trace(state),
            ...RelatiRemoteStableToTarget.trace(state)
        ];
    }
};

/** 遠程一般連結目標狀態 */
export var RelatiRemoteNormalTargetStatus: RelatiRoleStatus[] = [
    ...RelatiRemoteTargetStatus,
    "relati-remote-normal-receiver"
];

/** 遠程一般連結目標規則 */
export var RelatiRemoteNormalToTarget: RelatiTargetPathRule = {
    allow(state: RelatiPathState) {
        state.status = RelatiRemoteNormalTargetStatus;
        return RelatiRemoteNormalPath.allow(state);
    },
    trace(state: RelatiPathState) {
        state.status = RelatiRemoteNormalTargetStatus;
        return RelatiRemoteNormalPath.trace(state);
    }
};

/** 遠程穩定連結目標狀態 */
export var RelatiRemoteStableTargetStatus: RelatiRoleStatus[] = [
    ...RelatiRemoteTargetStatus,
    "relati-remote-stable-receiver"
];

/** 遠程穩定連結目標規則 */
export var RelatiRemoteStableToTarget: RelatiTargetPathRule = {
    allow(state: RelatiPathState) {
        state.status = RelatiRemoteStableTargetStatus;
        return RelatiRemoteStablePath.allow(state);
    },
    trace(state: RelatiPathState) {
        state.status = RelatiRemoteStableTargetStatus;
        return RelatiRemoteStablePath.trace(state);
    }
};
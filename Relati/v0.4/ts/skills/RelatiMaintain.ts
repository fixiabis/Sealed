import { RelatiGame } from "../RelatiGame";
import { RelatiGrid } from "../RelatiBoard";
import { RelatiSkill } from "../RelatiSkill";

import {
    RelatiMaintainRoute,
    RelatiMaintainRouteState
} from "./RelatiMaintainRoute";

import {
    RelatiCommonToTarget,
    RelatiNormalToTarget,
    RelatiRemoteToTarget,
    RelatiRemoteNormalToTarget,
    RelatiRemoteStableToTarget
} from "../rules/RelatiToTarget";

export type RelatiMaintainState = {
    game: RelatiGame;
    grid: RelatiGrid;
};

export type RelatiMaintainSkill = RelatiSkill<RelatiMaintainState>;

export var RelatiCommonMaintain: RelatiMaintainSkill = {
    name: "通用連結維持",
    type: "effect",
    do(state: RelatiMaintainRouteState) {
        state.status = "relati-repeater";
        state.toTarget = RelatiCommonToTarget;
        return RelatiMaintainRoute.do(state);
    }
};

export var RelatiNormalMaintain: RelatiMaintainSkill = {
    name: "一般連結維持",
    type: "effect",
    do(state: RelatiMaintainRouteState) {
        state.status = "relati-normal-repeater";
        state.toTarget = RelatiNormalToTarget;
        return RelatiMaintainRoute.do(state);
    }
};

export var RelatiRemoteMaintain: RelatiMaintainSkill = {
    name: "遠程連結維持",
    type: "effect",
    do(state: RelatiMaintainRouteState) {
        state.status = "relati-remote-repeater";
        state.toTarget = RelatiRemoteToTarget;
        return RelatiMaintainRoute.do(state);
    }
};

export var RelatiRemoteNormalMaintain: RelatiMaintainSkill = {
    name: "遠程一般連結維持",
    type: "effect",
    do(state: RelatiMaintainRouteState) {
        state.status = "relati-remote-normal-repeater";
        state.toTarget = RelatiRemoteNormalToTarget;
        return RelatiMaintainRoute.do(state);
    }
};

export var RelatiRemoteStableMaintain: RelatiMaintainSkill = {
    name: "遠程穩定連結維持",
    type: "effect",
    do(state: RelatiMaintainRouteState) {
        state.status = "relati-remote-stable-repeater";
        state.toTarget = RelatiRemoteStableToTarget;
        return RelatiMaintainRoute.do(state);
    }
};
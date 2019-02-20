import { RelatiSkill } from "../RelatiSkill";
import { RelatiGrid } from "../RelatiBoard";
import { RelatiGame } from "../RelatiGame";
import { RelatiTargetPathRule } from "../rules/RelatiToTarget";
import { RelatiRoleStatus } from "../RelatiRoleStatus";
export declare type RelatiMaintainRouteState = {
    game: RelatiGame;
    grid: RelatiGrid;
    status: RelatiRoleStatus.RelatiRepeater;
    toTarget: RelatiTargetPathRule;
};
export declare type RelatiMaintainRouteSkill = RelatiSkill<RelatiMaintainRouteState>;
export declare var RelatiMaintainRoute: RelatiMaintainRouteSkill;

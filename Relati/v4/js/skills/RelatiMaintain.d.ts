import { RelatiGame } from "../RelatiGame";
import { RelatiGrid } from "../RelatiBoard";
import { RelatiSkill } from "../RelatiSkill";
export declare type RelatiMaintainState = {
    game: RelatiGame;
    grid: RelatiGrid;
};
export declare type RelatiMaintainSkill = RelatiSkill<RelatiMaintainState>;
export declare var RelatiCommonMaintain: RelatiMaintainSkill;
export declare var RelatiNormalMaintain: RelatiMaintainSkill;
export declare var RelatiRemoteMaintain: RelatiMaintainSkill;
export declare var RelatiRemoteNormalMaintain: RelatiMaintainSkill;
export declare var RelatiRemoteStableMaintain: RelatiMaintainSkill;

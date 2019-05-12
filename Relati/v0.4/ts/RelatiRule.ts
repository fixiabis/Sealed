import { RelatiGrid } from "./RelatiBoard";
import { RelatiGameState } from "./RelatiGame";

/** 規則 */
export interface RelatiRule<State = {}> {
    /** 符合規則 */
    allow(state: RelatiGameState & State): boolean;
}

/** 規則(可追蹤) */
export interface RelatiRuleTraceable<State = {}> extends RelatiRule<State> {
    /** 追蹤 */
    trace(state: RelatiGameState & State): RelatiRuleTrace[];
}

/** 蹤跡 */
export interface RelatiRuleTrace {
    /** 目標 */
    target: RelatiGrid;
    /** 路徑 */
    routes: RelatiGrid[];
}
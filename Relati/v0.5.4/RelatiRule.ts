import { RelatiInfo } from "./Relati";
import { RelatiGrid } from "./RelatiBoard";
import { RelatiGameState } from "./RelatiGame";

/** 規則 */
export interface RelatiRule<State = RelatiGameState> extends RelatiInfo {
    allow(state: State): boolean;
}

/** 規則(可追溯) */
export interface RelatiRuleTraceable<State = RelatiGameState> extends RelatiRule<State> {
    trace(state: State): RelatiRuleTrace[];
}

/** 規則追溯軌跡 */
export interface RelatiRuleTrace {
    target: RelatiGrid;
    routes: RelatiGrid[];
}
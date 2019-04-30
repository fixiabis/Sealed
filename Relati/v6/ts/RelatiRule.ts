import { RelatiInfo } from "./Relati";
import { RelatiGrid } from "./RelatiBoard";
import { RelatiGameState } from "./RelatiGame";

export interface RelatiRule<State = RelatiGameState> extends RelatiInfo {
    allow(state: State): boolean;
}

export interface RelatiRuleTraceable<State = RelatiGameState> extends RelatiRule<State> {
    trace(state: State): RelatiRuleTraces;
}

export interface RelatiRuleTrace<Route = RelatiGrid> {
    target: Route;
    routes: Route[];
}

export type RelatiRuleTraces<Route = RelatiGrid> = RelatiRuleTrace<Route>[];
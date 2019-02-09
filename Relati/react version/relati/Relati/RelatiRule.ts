import { RelatiGameState, RelatiGrid } from "../Relati";

export interface RelatiRule {
    allow(state: RelatiGameState): boolean;
}

export interface RelatiRuleTraceable extends RelatiRule {
    trace(state: RelatiGameState): RelatiRuleTrace[];
}

export interface RelatiRuleTrace {
    target: RelatiGrid;
    routes: RelatiGrid[];
}
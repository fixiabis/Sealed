import { RelatiInfo } from "./Relati";
import { RelatiGameState } from "./RelatiGame";

export type RelatiSkillType = "action" | "effect";

export interface RelatiSkill<State = RelatiGameState> extends RelatiInfo {
    type: RelatiSkillType;
    do(state: State): void;
}
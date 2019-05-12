import { RelatiInfo } from "./Relati";
import { RelatiGameState, RelatiGameEventType } from "./RelatiGame";
export declare type RelatiSkillType = "action" | "effect";
export interface RelatiSkill<State = RelatiGameState> extends RelatiInfo {
    when?: RelatiGameEventType;
    type: RelatiSkillType;
    priority: number;
    do(state: State): Promise<void>;
}

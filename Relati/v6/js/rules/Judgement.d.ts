import { RelatiRule } from "../RelatiRule";
import { RelatiGame } from "../RelatiGame";
import { RelatiPlayer } from "../RelatiPlayer";
export interface JudgementState {
    game: RelatiGame;
    owner: RelatiPlayer;
}
export declare type JudgementRule = RelatiRule<JudgementState>;
export declare let Judgement: JudgementRule;

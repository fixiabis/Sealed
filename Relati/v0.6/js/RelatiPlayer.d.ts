import { RelatiRole } from "./RelatiRole";
import { RelatiGrid } from "./RelatiBoard";
import { RelatiGame } from "./RelatiGame";
export declare class RelatiPlayer {
    name: string;
    game: RelatiGame;
    leader?: RelatiRole;
    selectGrid?: (grid: RelatiGrid) => void;
    constructor(name: string, game: RelatiGame);
}
export interface RelatiPlayerHasLeader extends RelatiPlayer {
    leader: RelatiRole;
}

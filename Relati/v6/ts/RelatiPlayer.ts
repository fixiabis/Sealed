import { RelatiRole } from "./RelatiRole";
import { RelatiGrid } from "./RelatiBoard";
import { RelatiGame } from "./RelatiGame";

export class RelatiPlayer {
    leader?: RelatiRole;
    selectGrid?: (grid: RelatiGrid) => void;
    constructor(public name: string, public game: RelatiGame) { }
}

export interface RelatiPlayerHasLeader extends RelatiPlayer {
    leader: RelatiRole;
}
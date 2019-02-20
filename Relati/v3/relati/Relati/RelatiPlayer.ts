import { RelatiGame } from "./RelatiGame";
import { RelatiGrid } from "./RelatiBoard";

export class RelatiPlayer {
    [prop: string]: any;

    constructor(
        public game: RelatiGame,
        public badge: string
    ) { }

    selectGrid(grid: RelatiGrid) {
        var nowPlayer = this.game.getNowPlayer();
        if (nowPlayer != this) return;
        this.game.selectGrid(grid);
    }
}
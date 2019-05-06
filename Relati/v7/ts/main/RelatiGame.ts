import { RelatiBoard, RELATI_LAUNCHER, RELATI_REPEATER, RELATI_RECEIVER, RelatiGrid } from "../core/RelatiBoard";
import { RelatiBoardView } from "../game/RelatiView";
import { hasRelatiRoutesBy, BY_COMMON_RELATI } from "../core/RelatiRoutes";
import { destoryRepeaterBy, restoreRepeaterBy } from "../core/RelatiAction";
import { createHint, createRelatiEffect } from "../game/RelatiViewEffect";

export class RelatiGame {
    public turn = 0;

    constructor(
        public board: RelatiBoard,
        public boardView: RelatiBoardView,
        public routeType: number
    ) {
        boardView.view.addEventListener("click", function (this: RelatiGame, event: MouseEvent) {
            var x: number = Math.floor(event.offsetX / 5),
                y: number = Math.floor(event.offsetY / 5);
            this.gridSelect(x, y);
        }.bind(this));
    }

    gridSelect(x: number, y: number) {
        let grid = this.board.getGrid(x, y);
        if (!grid.isSpace) return;

        let symbol = this.turn % 2 + 1;
        let { routeType, board, boardView } = this;

        if (this.turn < 2) {
            grid.symbol = symbol;
            grid.gain(RELATI_LAUNCHER);
        } else if (hasRelatiRoutesBy(grid, symbol | RELATI_REPEATER, routeType)) {
            grid.symbol = symbol;
            grid.gain(RELATI_RECEIVER);
        } else return;

        this.turn++;
        destoryRepeaterBy(board);
        restoreRepeaterBy(board, routeType);
        boardView.removeBackground();
        boardView.update();

        if (this.turn > 1) {
            let symbol = this.turn % 2 + 1;
            let hint = this.getHints(symbol);

            if (hint.length == 0) {
                symbol = this.turn % 2 + 2;
                hint = this.getHints(symbol);
                if (hint.length == 0) console.log("draw");
                else console.log(
                    (symbol == 1 ? "O" : "X") + "Win"
                );
            } else createHint(hint, symbol, boardView.background);
        }

        createRelatiEffect(symbol, this);
    }

    getHints(symbol: number) {
        let grids: RelatiGrid[] = [];

        for (let grid of this.board.grids) {
            if (grid.isSpace && hasRelatiRoutesBy(
                grid,
                symbol | RELATI_REPEATER,
                BY_COMMON_RELATI
            )) grids.push(grid);
        }

        return grids;
    }
}
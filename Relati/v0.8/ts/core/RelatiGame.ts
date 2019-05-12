import { RelatiBoard, RELATI_LAUNCHER, RELATI_REPEATER, RELATI_RECEIVER, RelatiGrid, RELATI_SYMBOL_O, RELATI_SYMBOL_X } from "./RelatiBoard";
import { hasRelatiRoutesBy } from "./RelatiRoutes";
import { destoryRepeaterBy, restoreRepeaterBy } from "./RelatiAction";

/** 任何狀態 */
const RELATI_ANYSTAT = ~0b00000000;

/** 遊戲主體 */
export class RelatiGame {
    /** 回合 */
    public turn = 0;

    constructor(
        /** 棋盤 */
        public board: RelatiBoard,
        /** Relati類型 */
        public routeType: number
    ) { this.restart(); }

    /** 重新開始 */
    restart() {
        this.turn = 0;

        for (let grid of this.board.grids) {
            grid.lost(RELATI_ANYSTAT);
        }
    }

    /**
     * 選取棋盤格放置
     * @param x 棋盤X座標
     * @param y 棋盤Y座標
     */
    selectGrid(x: number, y: number) {
        let grid = this.board.getGrid(x, y);
        if (!grid.isSpace) return;

        let symbol = this.nowPlayerSymbol;
        let { routeType, board } = this;

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
    }

    /**
     * 取得可放置玩家符號的棋盤格
     * @param symbol 符號
     */
    getPlaceableGrids(symbol: number) {
        let grids: RelatiGrid[] = [];

        for (let grid of this.board.grids) {
            if (grid.isSpace && hasRelatiRoutesBy(
                grid,
                symbol | RELATI_REPEATER,
                this.routeType
            )) grids.push(grid);
        }

        return grids;
    }

    /** 目前玩家符號 */
    get nowPlayerSymbol() {
        return this.turn % 2 + 1;
    }

    /** 遊戲結果 */
    get result() {
        if (this.turn < 2) return "none";

        let placeableGrid = [
            this.getPlaceableGrids(RELATI_SYMBOL_O),
            this.getPlaceableGrids(RELATI_SYMBOL_X)
        ];

        let { nowPlayerSymbol } = this;

        if (
            placeableGrid[0].length &&
            placeableGrid[1].length
        ) return "none";

        if (nowPlayerSymbol == RELATI_SYMBOL_X) {
            if (placeableGrid[1].length) return "none";
            else if (placeableGrid[0].length) return "OWin";
        } else if (nowPlayerSymbol == RELATI_SYMBOL_O) {
            if (placeableGrid[0].length) return "none";
            else if (placeableGrid[1].length) return "XWin";
        }

        return "draw";
    }
}
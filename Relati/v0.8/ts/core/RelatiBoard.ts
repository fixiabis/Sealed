import { Grid, GridBoard } from "./GridBoard";

/** 無符號 */
export const RELATI_SYMBOL_N = 0b00000000;
/** 符號為圓圈 */
export const RELATI_SYMBOL_O = 0b00000001;
/** 符號為交叉 */
export const RELATI_SYMBOL_X = 0b00000010;

/** 狀態為接收器 */
export const RELATI_RECEIVER = 0b00001000;
/** 狀態為中繼器 */
export const RELATI_REPEATER = 0b00010000;
/** 狀態為發射器 */
export const RELATI_LAUNCHER = 0b00100000;

/** Relati棋盤格 */
export interface RelatiGrid extends Grid {
    getGrid(drct: number): RelatiGrid;
}

export class RelatiGrid extends Grid {
    /** 棋盤內部 */
    public body: number = 0;

    constructor(board: RelatiBoard, x: number, y: number) {
        super(board, x, y);
    }

    /**
     * 判斷是否符號狀態
     * @param status 狀態
     */
    is(status: number) {
        return (this.body & status) === status;
    }

    /**
     * 獲得指定狀態
     * @param status 狀態
     */
    gain(status: number) {
        return this.body |= status;
    }

    /**
     * 失去指定狀態
     * @param status 狀態
     */
    lost(status: number) {
        return this.body &= ~status;
    }

    /**
     * 取得符號
     */
    get symbol() {
        return this.body & 0b00000111;
    }

    /**
     * 設置符號
     * @param symbol 符號
     */
    set symbol(symbol: number) {
        this.lost(0b00000111);
        this.gain(symbol);
    }

    /**
     * 是否為空白
     */
    get isSpace() {
        return this.body === RELATI_SYMBOL_N;
    }
}

/** Relati棋盤 */
export interface RelatiBoard extends GridBoard {
    grids: RelatiGrid[];
    getGrid(x: number, y: number): RelatiGrid;
}

export class RelatiBoard extends GridBoard {
    constructor(width: number, height: number) {
        super(width, height);

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let grid: RelatiGrid = new RelatiGrid(this, x, y);
                this.grids[grid.i] = grid;
            }
        }
    }
}
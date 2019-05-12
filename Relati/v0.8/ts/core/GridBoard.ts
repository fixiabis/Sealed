/**
 * 棋盤格方向
 * C: (x = 0, y = 0)
 * F: (x = x, y - 1)
 * B: (x = x, y + 1)
 * R: (x + 1, y = y)
 * L: (x - 1, y = y)
 */
export enum GRID_DRCT {
    DRCT_C = 0x0000,
    DRCT_F = 0x1000,
    DRCT_B = 0x0100,
    DRCT_R = 0x0010,
    DRCT_L = 0x0001,
    DRCT_FR = 0x1010,
    DRCT_FL = 0x1001,
    DRCT_BR = 0x0110,
    DRCT_BL = 0x0101,

    DRCT_2F = 0x2000,
    DRCT_2B = 0x0200,
    DRCT_2R = 0x0020,
    DRCT_2L = 0x0002,
    DRCT_2FR = 0x2020,
    DRCT_2FL = 0x2002,
    DRCT_2BR = 0x0220,
    DRCT_2BL = 0x0202,

    DRCT_FFR = 0x2010,
    DRCT_FFL = 0x2001,
    DRCT_BBR = 0x0210,
    DRCT_BBL = 0x0201,
    DRCT_FRR = 0x1020,
    DRCT_FLL = 0x1002,
    DRCT_BRR = 0x0120,
    DRCT_BLL = 0x0102
}

/** 棋盤格 */
export class Grid {
    /** 原始陣列索引 */
    public readonly i: number;

    constructor(
        /** 所屬棋盤 */
        public readonly board: GridBoard,
        /** X座標 */
        public readonly x: number,
        /** Y座標 */
        public readonly y: number
    ) {
        this.i = x * board.height + y;
    }

    /**
     * 取得相對位置的棋盤格
     * @param drct 方向，使用 GRID_DRCT 可簡單取得
     */
    getGrid(drct: number) {
        let f = (0xF000 & drct) >> 12;
        let b = (0x0F00 & drct) >> 8;
        let r = (0x00F0 & drct) >> 4;
        let l = (0x000F & drct);

        let x = this.x + r - l;
        let y = this.y + b - f;

        return this.board.getGrid(x, y);
    }
}

/** 棋盤 */
export class GridBoard {
    /** 所有棋盤格 */
    public readonly grids: Grid[];
    /** 棋盤格總數 */
    public readonly length: number;

    constructor(
        /** 棋盤寬度 */
        public readonly width: number,
        /** 棋盤高度 */
        public readonly height: number
    ) {
        let grids: Grid[] = [];

        this.grids = grids;
        this.length = width * height;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let grid = new Grid(this, x, y);
                grids[grid.i] = grid;
            }
        }
    }

    /**
     * 取得絕對位置的棋盤格
     * @param x X座標
     * @param y Y座標
     */
    getGrid(x: number, y: number) {
        if (
            x < 0 || x >= this.width ||
            y < 0 || y >= this.height
        ) return null;

        let i = x * this.height + y;
        return this.grids[i];
    }
}
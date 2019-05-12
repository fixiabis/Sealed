export const GRID_DRCT_C = 0x0000;
export const GRID_DRCT_F = 0x1000;
export const GRID_DRCT_B = 0x0100;
export const GRID_DRCT_R = 0x0010;
export const GRID_DRCT_L = 0x0001;
export const GRID_DRCT_FR = 0x1010;
export const GRID_DRCT_FL = 0x1001;
export const GRID_DRCT_BR = 0x0110;
export const GRID_DRCT_BL = 0x0101;

export const GRID_DRCT_2F = 0x2000;
export const GRID_DRCT_2B = 0x0200;
export const GRID_DRCT_2R = 0x0020;
export const GRID_DRCT_2L = 0x0002;
export const GRID_DRCT_2FR = 0x2020;
export const GRID_DRCT_2FL = 0x2002;
export const GRID_DRCT_2BR = 0x0220;
export const GRID_DRCT_2BL = 0x0202;

export const GRID_DRCT_FFR = 0x2010;
export const GRID_DRCT_FFL = 0x2001;
export const GRID_DRCT_BBR = 0x0210;
export const GRID_DRCT_BBL = 0x0201;
export const GRID_DRCT_FRR = 0x1020;
export const GRID_DRCT_FLL = 0x1002;
export const GRID_DRCT_BRR = 0x0120;
export const GRID_DRCT_BLL = 0x0102;

export class Grid {
    public i: number;

    constructor(public board: GridBoard, public x: number, public y: number) {
        this.i = x * board.height + y;
    }

    getGrid(drct: number) {
        let F = (0xF000 & drct) >> 12;
        let B = (0x0F00 & drct) >> 8;
        let R = (0x00F0 & drct) >> 4;
        let L = (0x000F & drct);

        let x = this.x + R - L;
        let y = this.y + B - F;

        return this.board.getGrid(x, y);
    }
}

export class GridBoard {
    public length: number;
    public grids: Grid[];

    constructor(public width: number, public height: number) {
        let length: number = width * height;
        let grids: Grid[] = [];

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let grid = new Grid(this, x, y);
                grids[grid.i] = grid;
            }
        }

        this.grids = grids;
        this.length = length;
    }

    getGrid(x: number, y: number) {
        if (
            x < 0 || x >= this.width ||
            y < 0 || y >= this.height
        ) return null;

        let i = x * this.height + y;
        return this.grids[i];
    }
}
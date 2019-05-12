import { GridBoard, Grid } from "./GridBoard";

export const RELATI_SYMBOL_N = 0b00000000;
export const RELATI_SYMBOL_O = 0b00000001;
export const RELATI_SYMBOL_X = 0b00000010;

export const RELATI_RECEIVER = 0b00001000;
export const RELATI_REPEATER = 0b00010000;
export const RELATI_LAUNCHER = 0b00100000;

export interface RelatiGrid extends Grid {
    getGrid(drct: number): RelatiGrid;
}

export class RelatiGrid extends Grid {
    public body: number = 0;

    constructor(
        board: RelatiBoard,
        x: number,
        y: number
    ) { super(board, x, y); }

    is(status: number) { return (this.body & status) === status; }
    gain(status: number) { return this.body |= status; }
    lost(status: number) { return this.body &= ~status; }

    get symbol() { return this.body & 0b00000111; }

    set symbol(symbol: number) {
        this.lost(0b00000111);
        this.gain(symbol);
    }

    get isSpace() { return this.body === RELATI_SYMBOL_N; }
}

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
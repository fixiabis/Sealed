import { GridBoard, Grid } from "../core/GridBoard";
import { RelatiStatus, RelatiSymbol } from "./RelatiDefs";

/** Relati棋盤格 */
export interface RelatiGrid extends Grid {
    getGrid(drct: number): RelatiGrid;
}

export class RelatiGrid extends Grid {
    /** 符號 */
    public symbol: RelatiSymbol = "";

    /** 狀態存儲 */
    public status: { [status: string]: boolean } = {};

    /**
     * 判斷是否符合狀態
     * @param statusName 狀態名稱
     */
    is(statusName: RelatiStatus): boolean;

    /**
     * 判斷是否符合所有狀態或任一狀態
     * @param statusNameList 狀態名稱列表
     * @param matchType 所有狀態 | 任一狀態
     */
    is(statusNameList: RelatiStatus[], matchType: "all" | "any"): boolean;

    is(statusName: RelatiStatus | RelatiStatus[], matchType?: "all" | "any") {
        if (typeof statusName === "string") return this.status[statusName];

        let statusNameList = statusName;

        if (matchType === "all") {
            for (let status of statusNameList) {
                if (!this.status[status]) return false;
            }

            return true;
        } else {
            for (let status of statusNameList) {
                if (this.status[status]) return true;
            }

            return false;
        }
    }

    /**
     * 獲得狀態
     * @param status 狀態名稱
     */
    gain(status: RelatiStatus): void;

    /**
     * 獲得多個狀態
     * @param statusNameList 狀態名稱列表
     */
    gain(statusNameList: RelatiStatus[]): void;

    gain(statusName: RelatiStatus | RelatiStatus[]) {
        if (typeof statusName === "string") {
            return this.status[statusName] = true;
        }

        let statusNameList = statusName;

        for (let status of statusNameList) {
            this.status[status] = true;
        }
    }

    /**
     * 失去狀態
     * @param status 狀態名稱
     */
    lost(status: RelatiStatus): void;

    /**
     * 失去多個狀態
     * @param statusNameList 狀態名稱列表
     */
    lost(statusNameList: RelatiStatus[]): void;

    lost(statusName: RelatiStatus | RelatiStatus[]) {
        if (typeof statusName === "string") {
            return this.status[statusName] = false;
        }

        let statusNameList = statusName;

        for (let status of statusNameList) {
            this.status[status] = false;
        }
    }

    /** 該格視為空格 */
    get isSpace() {
        return this.symbol === "";
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
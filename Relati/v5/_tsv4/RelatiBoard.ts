import { GridBoard, Grid } from "./base/GridBoard";
import { RelatiRole } from "./RelatiRole";

/** 棋盤格 */
export interface RelatiGrid extends Grid {
    /** 角色 */
    role?: RelatiRole;
    board: RelatiBoard;
    query(command: string): RelatiGrid;
    queries(command: string): RelatiGrid[];
}

/** 棋盤 */
export interface RelatiBoard extends GridBoard {
    grids: RelatiGrid[][];
    gridList: RelatiGrid[];
    query(command: string): RelatiGrid;
    queries(command: string): RelatiGrid[];
}

/** 存在角色的棋盤格 */
export type RelatiGridHasRole = RelatiGrid & { role: RelatiRole };
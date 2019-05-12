import { GridBoard, Grid } from "./base/GridBoard";
import { RelatiRole } from "./RelatiRole";

/** 棋盤格 */
export interface RelatiGrid extends Grid {
    /** 棋盤格上的角色 */
    role?: RelatiRole;
    board: RelatiBoard;
    query(command: string): RelatiGrid;
    queries(command: string): RelatiGrid[];
}

/** 棋盤 */
export interface RelatiBoard extends GridBoard {
    gridList: RelatiGrid[];
    grids: RelatiGrid[][];
    query(command: string): RelatiGrid;
    queries(command: string): RelatiGrid[];
}
import { GridBoard, Grid } from "./base/GridBoard";
import { RelatiRole } from "./RelatiRole";

export interface RelatiGrid extends Grid {
    role?: RelatiRole;
    board: RelatiBoard;
    query(command: string): RelatiGrid;
    queries(command: string): RelatiGrid[];
}

export interface RelatiBoard extends GridBoard {
    gridList: RelatiGrid[];
    grids: RelatiGrid[][];
    query(command: string): RelatiGrid;
    queries(command: string): RelatiGrid[];
}

export type RelatiGridHasRole = RelatiGrid & { role: RelatiRole };
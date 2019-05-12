import { GridBoard, Grid } from "./base/GridBoard";
import { RelatiRole } from "./RelatiRole";
export interface RelatiGrid extends Grid {
    role?: RelatiRole;
    board: RelatiBoard;
    query(command: string): RelatiGrid;
    queries(commands: string): RelatiGrid[];
}
export interface RelatiBoard extends GridBoard {
    grids: RelatiGrid[][];
    gridList: RelatiGrid[];
    query(command: string): RelatiGrid;
    queries(commands: string): RelatiGrid[];
}
export interface RelatiGridHasRole extends RelatiGrid {
    role: RelatiRole;
}

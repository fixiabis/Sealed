namespace Relati {
    export interface RelatiBoard extends GridBoard {
        grids: RelatiGrid[][];
        gridList: RelatiGrid[];
        query(coordinateCommand: string): RelatiGrid;
        queries(coordinateCommands: string): RelatiGrid[];
    }

    export interface RelatiGrid extends Grid {
        role?: RelatiRole;
        board: RelatiBoard;
        query(directionCommand: string): RelatiGrid;
        queries(directionCommands: string): RelatiGrid[];
    }
}
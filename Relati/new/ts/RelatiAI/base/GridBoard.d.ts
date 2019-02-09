declare class Grid {
    board: GridBoard;
    x: number;
    y: number;
    coordinate: string;
    private _queryCache;
    private _queriesCache;
    static simplifyDirectionList: RegExp[];
    static originalDirectionLists: string[][];
    constructor(board: GridBoard, x: number, y: number);
    query(directionCommand: string): Grid;
    queries(directionCommands: string): Grid[];
    private _cacheQueryResult(command, result);
    private _cacheQueriesResult(commmands, results);
    clearQueryResult(command: string): boolean;
    clearQueriesResult(commands: string): boolean;
}
declare class GridBoard {
    width: number;
    height: number;
    grids: Grid[][];
    gridList: Grid[];
    private _queryCache;
    private _queriesCache;
    constructor(width: number, height: number);
    query(coordinateCommand: string): Grid;
    queries(coordinateCommands: string): Grid[];
    private _cacheQueryResult(command, result);
    private _cacheQueriesResult(commmands, results);
    clearQueryResult(command: string): boolean;
    clearQueriesResult(commands: string): boolean;
}

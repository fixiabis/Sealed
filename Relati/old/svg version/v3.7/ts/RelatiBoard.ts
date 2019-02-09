/** 棋盤格 */
interface RelatiGrid extends Grid {
    /** 角色 */
    role: RelatiRole;
    board: RelatiBoard;
    query(direction: string): RelatiGrid;
    queries(directions: string): RelatiGrid[];
}

class RelatiGrid extends Grid implements RelatiGrid {
    public role: RelatiRole = new RelatiRole(this);
}

/** 棋盤 */
interface RelatiBoard extends GridBoard {
    /** 顯示 */
    layout: GridBoardLayout;
    grids: RelatiGrid[][];
}

class RelatiBoard extends GridBoard implements RelatiBoard {
    public layout: GridBoardLayout = new GridBoardLayout();

    constructor(width: number, height: number) {
        super(width, height);

        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var grid: RelatiGrid = new RelatiGrid(this, x, y);
                this.grids[x][y] = grid;
            }
        }
    }
}
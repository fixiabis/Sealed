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

namespace RelatiRule {
    export type RuleType = (
        "launcher" | 
        "repeater" | 
        "receptor" | 
        "trigger"
    );
}

var rule = {
    "relati-noraml": new RelatiRule("O is owner{S}"),
    "relati-remote-normal": new RelatiRule("2O is owner{S} && O is space"),
    "relati-remote-stable": new RelatiRule(
        "IIH is owner{S} && II is space && I is space || " +
        "IIH is owner{S} && IH is space && I is space || " +
        "IIH is owner{S} && IH is space && H is space || " +
        "IHH is owner{S} && HH is space && H is space || " +
        "IHH is owner{S} && IH is space && I is space || " +
        "IHH is owner{S} && IH is space && H is space"
    )
};
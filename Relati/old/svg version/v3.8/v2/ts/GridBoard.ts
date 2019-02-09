/** 棋盤格 */
interface Grid {
    /** X軸座標 */
    x: number;
    /** Y軸座標 */
    y: number;
    /** 英數座標 */
    coor: string;
    /** 所屬棋盤 */
    board: GridBoard;

    /** 棋盤格查詢，使用基本座標 */
    query(direction: string): Grid;
    /** 棋盤格查詢，使用簡化座標 */
    queries(directions: string): Grid[];

    /** 簡化座標，I(前後)，H(左右)，T(前後左右)，X(斜邊四角)，O(八方) */
    simplifyDirections: RegExp[];
    /** 基本座標，F(前)，B(後)，R(右)，L(左) */
    originalDirections: string[][];
}

class Grid implements Grid {
    static simplifyDirections = [/I/g, /H/g, /T/g, /X/g, /O/g];
    static originalDirections = [
        ["F", "B"], ["R", "L"],
        ["F", "B", "R", "L"],
        ["FR", "FL", "BR", "BL"],
        ["F", "B", "R", "L", "FR", "FL", "BR", "BL"]
    ];

    static convertDirection(directions: string): string[] {
        var { simplifyDirections, originalDirections } = Grid;
        var result: string[] = [];

        for (var i = 0; i < simplifyDirections.length; i++) {
            var simplifyDirection = simplifyDirections[i];

            if (directions.match(simplifyDirection)) {
                for (var originalDirection of originalDirections[i]) {
                    result = result.concat(Grid.convertDirection(
                        directions.replace(
                            simplifyDirection,
                            originalDirection
                        )
                    ));
                }

                return result;
            }
        }

        return [directions];
    }

    constructor(public board: GridBoard, public x: number, public y: number) {
        this.coor = String.fromCharCode(x + 65) + (y + 1);
    }

    /** @param direction 方向座標 */
    query(direction: string): Grid {
        var { x, y, board } = this;
        var unitCarried: number = 1;
        var unit: number = 1;

        for (var d of direction) {
            switch (d) {
                case "F": unitCarried = 1; y -= unit; break;
                case "B": unitCarried = 1; y += unit; break;
                case "R": unitCarried = 1; x += unit; break;
                case "L": unitCarried = 1; x -= unit; break;
                default:
                    if (unitCarried == 1) {
                        unit = parseInt(d) || unit;
                    } else {
                        unit *= 10;
                        unit = parseInt(d) || unit;
                    }

                    unitCarried *= 10;
                    break;
            }
        }

        return board.grids[x] && board.grids[x][y];
    }

    /** @param directions 方向座標 */
    queries(directions: string): Grid[] {
        var { simplifyDirections, originalDirections } = Grid;
        var result: Grid[] = [];

        if (directions.indexOf(";") > -1) {
            for (var d of directions.split(";")) {
                result = result.concat(this.queries(d));
            }

            return result;
        }

        for (var i = 0; i < simplifyDirections.length; i++) {
            var simplifyDirection = simplifyDirections[i];

            if (directions.match(simplifyDirection)) {
                for (var originalDirection of originalDirections[i]) {
                    result = result.concat(this.queries(
                        directions.replace(
                            simplifyDirection,
                            originalDirection
                        )
                    ));
                }

                return result;
            }
        }

        if (directions.indexOf(",") > -1) {
            for (var d of directions.split(",")) {
                result = result.concat(this.queries(d));
            }

            return result;
        }

        return [this.query(directions)];
    }
}

/** 棋盤 */
interface GridBoard {
    /** 棋盤格 */
    grids: Grid[][];
    /** 棋盤寬度 */
    width: number;
    /** 棋盤高度 */
    height: number;
}

class GridBoard implements GridBoard {
    constructor(public width: number, public height: number) {
        var grids: Grid[][] = [];

        for (var x = 0; x < width; x++) {
            var gridRow: Grid[] = [];

            for (var y = 0; y < height; y++) {
                var grid = new Grid(this, x, y);
                gridRow.push(grid);
            }

            grids.push(gridRow);
        }

        this.grids = grids;
    }
}
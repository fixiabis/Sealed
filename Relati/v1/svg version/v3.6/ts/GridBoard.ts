interface Grid {
    x: number;
    y: number;
    coor: string;
    prop: string[];
    board: GridBoard;
    [extensible: string]: any;
    simplifyDirections: RegExp[];
    originalDirections: string[][];
    query(commands: string): Grid;
    queries(command: string): Grid[];
}

class Grid implements Grid {
    constructor(public board: GridBoard, public x: number, public y: number) {
        this.coor = String.fromCharCode(x + 65) + (y + 1);
        this.prop = [];
    }

    query(direction: string): void | Grid {
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

    queries(directions: string): (void | Grid)[] {
        var { simplifyDirections, originalDirections } = this;
        var result: (void | Grid)[] = [];

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

Grid.prototype.simplifyDirections = [/I/g, /H/g, /T/g, /X/g, /O/g];
Grid.prototype.originalDirections = [
    ["F", "B"], ["R", "L"],
    ["F", "B", "R", "L"],
    ["FR", "FL", "BR", "BL"],
    ["F", "B", "R", "L", "FR", "FL", "BR", "BL"]
];

interface GridBoard {
    grids: Grid[][];
    width: number;
    height: number;
    [extensible: string]: any;
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
interface Grid {
    x: number;
    y: number;
    coor: string;
    board: GridBoard;
    query(dir: string): Grid;
    queries(dirs: string): Grid[];
}

class Grid implements Grid {
    constructor(public board: GridBoard, public x: number, public y: number) {
        this.coor = String.fromCharCode(x + 65) + (y + 1);
        board[this.coor] = this;
    }

    query(dir: string): Grid {
        var { x, y, board } = this;
        var unitCarried: number = 1;
        var unit: number = 1;

        for (var d of dir) {
            switch (d) {
                case "F": unitCarried = 1; y -= unit; break;
                case "B": unitCarried = 1; y += unit; break;
                case "R": unitCarried = 1; x += unit; break;
                case "L": unitCarried = 1; x -= unit; break;
                case "-": unit *= -1; break;
                default:
                    var num = parseInt(d);
                    if (isNaN(num)) break;
                    if (unitCarried == 1) unit = num;
                    else unit = unit * 10 + num;
                    unitCarried++;
                    break;
            }
        }

        return board.grids[x] && board.grids[x][y];
    }

    queries(dirs: string): Grid[] {
        var { simplifyDirs, originalDirs } = Grid;
        var result: Grid[] = [];

        if (dirs.indexOf(";") > -1) {
            for (var d of dirs.split(";")) {
                result = result.concat(this.queries(d));
            }

            return result;
        }

        for (var i = 0; i < simplifyDirs.length; i++) {
            var simplifyDir = simplifyDirs[i];
            if (!dirs.match(simplifyDir)) continue;

            for (var originalDir of originalDirs[i]) {
                result = result.concat(this.queries(
                    dirs.replace(
                        simplifyDir,
                        originalDir
                    )
                ));
            }

            return result;
        }

        if (dirs.indexOf(",") > -1) {
            for (var d of dirs.split(",")) {
                result = result.concat(this.queries(d));
            }

            return result;
        }

        return [this.query(dirs)];
    }

    static simplifyDirs = [/I/g, /H/g, /T/g, /X/g, /O/g];
    static originalDirs = [
        ["F", "B"], ["R", "L"],
        ["F", "B", "R", "L"],
        ["FR", "FL", "BR", "BL"],
        ["F", "B", "R", "L", "FR", "FL", "BR", "BL"]
    ];

    static dirConvert(dirs: string): string[] {
        var { simplifyDirs, originalDirs } = Grid;
        var result: string[] = [];

        for (var i = 0; i < simplifyDirs.length; i++) {
            var simplifyDir = simplifyDirs[i];

            if (dirs.match(simplifyDir)) {
                for (var originalDir of originalDirs[i]) {
                    result = result.concat(Grid.dirConvert(
                        dirs.replace(
                            simplifyDir,
                            originalDir
                        )
                    ));
                }

                return result;
            }
        }

        return [dirs];
    }
}

interface GridBoard {
    grids: Grid[][];
    width: number;
    height: number;
    query(coor: string): Grid;
    queries(coors: string): Grid[];
    [coor: string]: any;
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

    query(coor: string): Grid {
        var x: number = coor[0].charCodeAt(0) - 65;
        var y: number = parseInt(coor.substr(1, coor.length - 1)) - 1;

        return this.grids[x] && this.grids[x][y];
    }

    queries(coors: string): Grid[] {
        var result: Grid[] = [];
        var { width, height } = this;

        if (coors.indexOf(",") > -1) {
            for (var c of coors.split(",")) {
                result = result.concat(this.queries(c));
            }

            return result;
        }

        if (!isNaN(parseInt(coors)) && parseInt(coors).toString() == coors) {
            coors = `A${coors}:${String.fromCharCode(width + 64)}${coors}`;
        } else if (coors.length == 1) {
            coors = `${coors}1:${coors}${height}`;
        }

        if (coors.indexOf(":") > -1) {
            var coor: string[] = coors.split(":");
            var startX: number | undefined, startY: number | undefined;
            var endX: number | undefined, endY: number | undefined;

            for (var c of coor) {
                var x: number | undefined = undefined;
                var y: number | undefined = parseInt(c) - 1;

                if (isNaN(y)) {
                    if (c.length == 1) {
                        x = c.charCodeAt(0) - 65;
                        y = undefined;
                    } else {
                        x = c.charCodeAt(0) - 65;
                        y = parseInt(c.substr(1, c.length - 1)) - 1;
                    }
                }

                if (y != undefined) {
                    if (startY == undefined) startY = y;
                    else if (y > startY) endY = y;
                    else[startY, endY] = [y, startY];
                }

                if (x != undefined) {
                    if (startX == undefined) startX = x;
                    else if (x > startX) endX = x;
                    else[startX, endX] = [x, startX];
                }
            }

            if (startX == undefined) startX = 0;
            if (startY == undefined) startY = 0;
            if (endX == undefined) endX = width - 1;
            if (endY == undefined) endY = height - 1;

            for (let x = startX; x <= endX; x++) {
                for (let y = startY; y <= endY; y++) {
                    result.push(this.grids[x] && this.grids[x][y]);
                }
            }

            return result;
        }

        if (coors == "*") {
            for (let x = 0; x < this.width; x++) {
                for (let y = 0; y < this.height; y++) {
                    result.push(this.grids[x][y]);
                }
            }
        }

        return result;
    }
}
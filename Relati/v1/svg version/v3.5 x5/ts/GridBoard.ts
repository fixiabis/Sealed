namespace lib {
    export interface GridBoard {
        width: number;
        height: number;
        grids: Grid[][];
        gridOf: { [crd: string]: Grid };
        [crd: string]: any;
    }

    export interface Grid {
        x: number;
        y: number;
        crd: string;
        board: GridBoard;
        query(dir: string): Grid | Grid[];
        [dir: string]: any;
    }

    var simplifyDir = [/I/g, /H/g];
    var fullNameDir = [["F", "B"], ["R", "L"]];

    export class Grid implements Grid {
        constructor(public x: number, public y: number, public board: GridBoard) {
            this.crd = `${String.fromCharCode(x + 65)}${y + 1}`;
        }

        query(dir: string): Grid | Grid[] {
            if (dir in this) return this[dir];

            var result: Grid[] = [];

            if (dir.match(/;/)) {
                var dirs: string[] = dir.split(";");
                dirs.forEach(dir => result = result.concat(this.query(dir)));
                return this[dir] = result;
            }

            for (var i = 0; i < simplifyDir.length; i++) {
                if (dir.match(simplifyDir[i])) {
                    for (let d of fullNameDir[i]) {
                        result = result.concat(this.query(dir.replace(simplifyDir[i], d)));
                    }

                    return this[dir] = result;
                }
            }

            if (dir.match(/,/)) {
                var dirs: string[] = dir.split(",");
                dirs.forEach(dir => result = result.concat(this.query(dir)));
                return this[dir] = result;
            }

            var { x, y } = this;
            var dirs: string[] = <string[]>dir.match(/\-\d+|\d+|\D/g);
            var unit = 1;

            for (let d of dirs) {
                switch (d) {
                    case "F": y -= unit; break;
                    case "B": y += unit; break;
                    case "R": x += unit; break;
                    case "L": x -= unit; break;
                    default: unit = parseInt(d); break;
                }
            }

            return this[dir] = this.board.grids[x] && this.board.grids[x][y];
        }
    }

    export class GridBoard implements GridBoard {
        grids: Grid[][] = [];
        gridOf: { [crd: string]: Grid } = {};

        constructor(public width: number, public height: number) {
            var { grids, gridOf } = this;

            for (var x = 0; x < width; x++) {
                var gridRow: Grid[] = [];

                for (var y = 0; y < height; y++) {
                    var grid = new Grid(x, y, this);
                    this[grid.crd] = grid;
                    gridOf[grid.crd] = grid;
                    gridRow.push(grid);
                }

                grids.push(gridRow);
            }
        }
    }
}
const GridBoard = (function () {
    class Grid {
        constructor(x, y, board) {
            this.crd = String.fromCharCode(x + 65) + (y + 1);
            this.x = x;
            this.y = y;
            this.board = board;
        }

        getGridsFromDir(dirString) {
            var result = [];

            if (dirString.indexOf(",") > -1) {
                dirString.split(",").forEach(
                    dirStr => result = result.concat(
                        this.getGridsFromDir(dirStr)
                    )
                );

                return result;
            }

            var shortDirs = [/I/g, /H/g, /T/g, /X/g, /O/g];
            var fullDirs = [["F", "B"], ["R", "L"], ["I", "H"], ["IH"], ["T", "X"]];

            for (var i = 0; i < shortDirs.length; i++) {
                var shortDir = shortDirs[i];
                var fullDir = fullDirs[i];

                if (dirString.match(shortDir)) {
                    result = result.concat(
                        this.getGridsFromDir(
                            fullDir.map(
                                dir => dirString.replace(shortDir, dir)
                            ).join(",")
                        )
                    );

                    return result;
                }
            }

            if (dirString[0] === "~") {
                var dir = dirString.substr(1, dirString.length - 1);
                var nowDir = dir;

                do {
                    result.push(this.getGridFromDir(nowDir));
                    nowDir += dir;
                } while (this.getGridFromDir(nowDir));

                return result;
            }

            return this.getGridFromDir(dirString);
        }

        getGridFromDir(dirString) {
            var { x, y, board } = this;

            for (var i = 0; i < dirString.length; i++) {
                switch (dirString[i]) {
                    case "F": y--; break;
                    case "B": y++; break;
                    case "R": x++; break;
                    case "L": x--; break;
                }
            }

            return board.grids[x] && board.grids[x][y];
        }
        x; y; crd; board;
    }

    class GridBoard {
        constructor(width, height) {
            var gridOf = {};
            var grids = [];

            for (var x = 0; x < width; x++) {
                var gridCol = [];

                for (var y = 0; y < height; y++) {
                    var grid = new Grid(x, y, this);
                    gridOf[grid.crd] = grid;
                    gridCol.push(grid);
                }

                grids.push(gridCol);
            }

            this.gridOf = gridOf;
            this.grids = grids;
        }
        grids; gridOf;
    }

    return GridBoard;
})();
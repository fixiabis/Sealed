var GridBoard = (function () {
    var Grid = /** @class */ (function () {
        function Grid(x, y, board) {
            this.crd = String.fromCharCode(x + 65) + (y + 1);
            this.x = x;
            this.y = y;
            this.board = board;
        }
        Grid.prototype.getGridsFromDir = function (dirString) {
            var _this = this;
            var result = [];
            if (dirString.indexOf(",") > -1) {
                dirString.split(",").forEach(function (dirStr) { return result = result.concat(_this.getGridsFromDir(dirStr)); });
                return result;
            }
            var shortDirs = [/I/g, /H/g, /T/g, /X/g, /O/g];
            var fullDirs = [["F", "B"], ["R", "L"], ["I", "H"], ["IH"], ["T", "X"]];
            for (var i = 0; i < shortDirs.length; i++) {
                var shortDir = shortDirs[i];
                var fullDir = fullDirs[i];
                if (dirString.match(shortDir)) {
                    result = result.concat(this.getGridsFromDir(fullDir.map(function (dir) { return dirString.replace(shortDir, dir); }).join(",")));
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
        };
        Grid.prototype.getGridFromDir = function (dirString) {
            var _a = this, x = _a.x, y = _a.y, board = _a.board;
            for (var i = 0; i < dirString.length; i++) {
                switch (dirString[i]) {
                    case "F":
                        y--;
                        break;
                    case "B":
                        y++;
                        break;
                    case "R":
                        x++;
                        break;
                    case "L":
                        x--;
                        break;
                }
            }
            return board.grids[x] && board.grids[x][y];
        };
        return Grid;
    }());
    var GridBoard = /** @class */ (function () {
        function GridBoard(width, height) {
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
        return GridBoard;
    }());
    return GridBoard;
})();

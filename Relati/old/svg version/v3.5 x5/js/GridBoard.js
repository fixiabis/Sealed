"use strict";
var lib;
(function (lib) {
    var simplifyDir = [/I/g, /H/g];
    var fullNameDir = [["F", "B"], ["R", "L"]];
    var Grid = /** @class */ (function () {
        function Grid(x, y, board) {
            this.x = x;
            this.y = y;
            this.board = board;
            this.crd = "" + String.fromCharCode(x + 65) + (y + 1);
        }
        Grid.prototype.query = function (dir) {
            var _this = this;
            if (dir in this)
                return this[dir];
            var result = [];
            if (dir.match(/;/)) {
                var dirs = dir.split(";");
                dirs.forEach(function (dir) { return result = result.concat(_this.query(dir)); });
                return this[dir] = result;
            }
            for (var i = 0; i < simplifyDir.length; i++) {
                if (dir.match(simplifyDir[i])) {
                    for (var _i = 0, _a = fullNameDir[i]; _i < _a.length; _i++) {
                        var d = _a[_i];
                        result = result.concat(this.query(dir.replace(simplifyDir[i], d)));
                    }
                    return this[dir] = result;
                }
            }
            if (dir.match(/,/)) {
                var dirs = dir.split(",");
                dirs.forEach(function (dir) { return result = result.concat(_this.query(dir)); });
                return this[dir] = result;
            }
            var _b = this, x = _b.x, y = _b.y;
            var dirs = dir.match(/\-\d+|\d+|\D/g);
            var unit = 1;
            for (var _c = 0, dirs_1 = dirs; _c < dirs_1.length; _c++) {
                var d = dirs_1[_c];
                switch (d) {
                    case "F":
                        y -= unit;
                        break;
                    case "B":
                        y += unit;
                        break;
                    case "R":
                        x += unit;
                        break;
                    case "L":
                        x -= unit;
                        break;
                    default:
                        unit = parseInt(d);
                        break;
                }
            }
            return this[dir] = this.board.grids[x] && this.board.grids[x][y];
        };
        return Grid;
    }());
    lib.Grid = Grid;
    var GridBoard = /** @class */ (function () {
        function GridBoard(width, height) {
            this.width = width;
            this.height = height;
            this.grids = [];
            this.gridOf = {};
            var _a = this, grids = _a.grids, gridOf = _a.gridOf;
            for (var x = 0; x < width; x++) {
                var gridRow = [];
                for (var y = 0; y < height; y++) {
                    var grid = new Grid(x, y, this);
                    this[grid.crd] = grid;
                    gridOf[grid.crd] = grid;
                    gridRow.push(grid);
                }
                grids.push(gridRow);
            }
        }
        return GridBoard;
    }());
    lib.GridBoard = GridBoard;
})(lib || (lib = {}));

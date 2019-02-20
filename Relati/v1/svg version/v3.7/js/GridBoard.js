"use strict";
var Grid = /** @class */ (function () {
    function Grid(board, x, y) {
        this.board = board;
        this.x = x;
        this.y = y;
        this.coor = String.fromCharCode(x + 65) + (y + 1);
    }
    /** @param direction 方向座標 */
    Grid.prototype.query = function (direction) {
        var _a = this, x = _a.x, y = _a.y, board = _a.board;
        var unitCarried = 1;
        var unit = 1;
        for (var _i = 0, direction_1 = direction; _i < direction_1.length; _i++) {
            var d = direction_1[_i];
            switch (d) {
                case "F":
                    unitCarried = 1;
                    y -= unit;
                    break;
                case "B":
                    unitCarried = 1;
                    y += unit;
                    break;
                case "R":
                    unitCarried = 1;
                    x += unit;
                    break;
                case "L":
                    unitCarried = 1;
                    x -= unit;
                    break;
                default:
                    if (unitCarried == 1) {
                        unit = parseInt(d) || unit;
                    }
                    else {
                        unit *= 10;
                        unit = parseInt(d) || unit;
                    }
                    unitCarried *= 10;
                    break;
            }
        }
        return board.grids[x] && board.grids[x][y];
    };
    /** @param directions 方向座標 */
    Grid.prototype.queries = function (directions) {
        var simplifyDirections = Grid.simplifyDirections, originalDirections = Grid.originalDirections;
        var result = [];
        if (directions.indexOf(";") > -1) {
            for (var _i = 0, _a = directions.split(";"); _i < _a.length; _i++) {
                var d = _a[_i];
                result = result.concat(this.queries(d));
            }
            return result;
        }
        for (var i = 0; i < simplifyDirections.length; i++) {
            var simplifyDirection = simplifyDirections[i];
            if (directions.match(simplifyDirection)) {
                for (var _b = 0, _c = originalDirections[i]; _b < _c.length; _b++) {
                    var originalDirection = _c[_b];
                    result = result.concat(this.queries(directions.replace(simplifyDirection, originalDirection)));
                }
                return result;
            }
        }
        if (directions.indexOf(",") > -1) {
            for (var _d = 0, _e = directions.split(","); _d < _e.length; _d++) {
                var d = _e[_d];
                result = result.concat(this.queries(d));
            }
            return result;
        }
        return [this.query(directions)];
    };
    Grid.simplifyDirections = [/I/g, /H/g, /T/g, /X/g, /O/g];
    Grid.originalDirections = [
        ["F", "B"], ["R", "L"],
        ["F", "B", "R", "L"],
        ["FR", "FL", "BR", "BL"],
        ["F", "B", "R", "L", "FR", "FL", "BR", "BL"]
    ];
    return Grid;
}());
var GridBoard = /** @class */ (function () {
    function GridBoard(width, height) {
        this.width = width;
        this.height = height;
        var grids = [];
        for (var x = 0; x < width; x++) {
            var gridRow = [];
            for (var y = 0; y < height; y++) {
                var grid = new Grid(this, x, y);
                gridRow.push(grid);
            }
            grids.push(gridRow);
        }
        this.grids = grids;
    }
    return GridBoard;
}());

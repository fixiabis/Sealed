"use strict";
var Grid = /** @class */ (function () {
    function Grid(board, x, y) {
        this.board = board;
        this.x = x;
        this.y = y;
        this.coor = String.fromCharCode(x + 65) + (y + 1);
        this.prop = [];
    }
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
    Grid.prototype.queries = function (directions) {
        var _a = this, simplifyDirections = _a.simplifyDirections, originalDirections = _a.originalDirections;
        var result = [];
        if (directions.indexOf(";") > -1) {
            for (var _i = 0, _b = directions.split(";"); _i < _b.length; _i++) {
                var d = _b[_i];
                result = result.concat(this.queries(d));
            }
            return result;
        }
        for (var i = 0; i < simplifyDirections.length; i++) {
            var simplifyDirection = simplifyDirections[i];
            if (directions.match(simplifyDirection)) {
                for (var _c = 0, _d = originalDirections[i]; _c < _d.length; _c++) {
                    var originalDirection = _d[_c];
                    result = result.concat(this.queries(directions.replace(simplifyDirection, originalDirection)));
                }
                return result;
            }
        }
        if (directions.indexOf(",") > -1) {
            for (var _e = 0, _f = directions.split(","); _e < _f.length; _e++) {
                var d = _f[_e];
                result = result.concat(this.queries(d));
            }
            return result;
        }
        return [this.query(directions)];
    };
    return Grid;
}());
Grid.prototype.simplifyDirections = [/I/g, /H/g, /T/g, /X/g, /O/g];
Grid.prototype.originalDirections = [
    ["F", "B"], ["R", "L"],
    ["F", "B", "R", "L"],
    ["FR", "FL", "BR", "BL"],
    ["F", "B", "R", "L", "FR", "FL", "BR", "BL"]
];
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

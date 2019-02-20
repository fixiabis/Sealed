"use strict";
var Grid = /** @class */ (function () {
    function Grid(board, x, y) {
        this.board = board;
        this.x = x;
        this.y = y;
        this.coor = String.fromCharCode(x + 65) + (y + 1);
        board[this.coor] = this;
    }
    Grid.prototype.query = function (dir) {
        var _a = this, x = _a.x, y = _a.y, board = _a.board;
        var unitCarried = 1;
        var unit = 1;
        for (var _i = 0, dir_1 = dir; _i < dir_1.length; _i++) {
            var d = dir_1[_i];
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
                case "-":
                    unit *= -1;
                    break;
                default:
                    var num = parseInt(d);
                    if (isNaN(num))
                        break;
                    if (unitCarried == 1)
                        unit = num;
                    else
                        unit = unit * 10 + num;
                    unitCarried++;
                    break;
            }
        }
        return board.grids[x] && board.grids[x][y];
    };
    Grid.prototype.queries = function (dirs) {
        var simplifyDirs = Grid.simplifyDirs, originalDirs = Grid.originalDirs;
        var result = [];
        if (dirs.indexOf(";") > -1) {
            for (var _i = 0, _a = dirs.split(";"); _i < _a.length; _i++) {
                var d = _a[_i];
                result = result.concat(this.queries(d));
            }
            return result;
        }
        for (var i = 0; i < simplifyDirs.length; i++) {
            var simplifyDir = simplifyDirs[i];
            if (!dirs.match(simplifyDir))
                continue;
            for (var _b = 0, _c = originalDirs[i]; _b < _c.length; _b++) {
                var originalDir = _c[_b];
                result = result.concat(this.queries(dirs.replace(simplifyDir, originalDir)));
            }
            return result;
        }
        if (dirs.indexOf(",") > -1) {
            for (var _d = 0, _e = dirs.split(","); _d < _e.length; _d++) {
                var d = _e[_d];
                result = result.concat(this.queries(d));
            }
            return result;
        }
        return [this.query(dirs)];
    };
    Grid.dirConvert = function (dirs) {
        var simplifyDirs = Grid.simplifyDirs, originalDirs = Grid.originalDirs;
        var result = [];
        for (var i = 0; i < simplifyDirs.length; i++) {
            var simplifyDir = simplifyDirs[i];
            if (dirs.match(simplifyDir)) {
                for (var _i = 0, _a = originalDirs[i]; _i < _a.length; _i++) {
                    var originalDir = _a[_i];
                    result = result.concat(Grid.dirConvert(dirs.replace(simplifyDir, originalDir)));
                }
                return result;
            }
        }
        return [dirs];
    };
    Grid.simplifyDirs = [/I/g, /H/g, /T/g, /X/g, /O/g];
    Grid.originalDirs = [
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
    GridBoard.prototype.query = function (coor) {
        var x = coor[0].charCodeAt(0) - 65;
        var y = parseInt(coor.substr(1, coor.length - 1)) - 1;
        return this.grids[x] && this.grids[x][y];
    };
    GridBoard.prototype.queries = function (coors) {
        var result = [];
        var _a = this, width = _a.width, height = _a.height;
        if (coors.indexOf(",") > -1) {
            for (var _i = 0, _b = coors.split(","); _i < _b.length; _i++) {
                var c = _b[_i];
                result = result.concat(this.queries(c));
            }
            return result;
        }
        if (!isNaN(parseInt(coors)) && parseInt(coors).toString() == coors) {
            coors = "A" + coors + ":" + String.fromCharCode(width + 64) + coors;
        }
        else if (coors.length == 1) {
            coors = coors + "1:" + coors + height;
        }
        if (coors.indexOf(":") > -1) {
            var coor = coors.split(":");
            var startX, startY;
            var endX, endY;
            for (var _c = 0, coor_1 = coor; _c < coor_1.length; _c++) {
                var c = coor_1[_c];
                var x = undefined;
                var y = parseInt(c) - 1;
                if (isNaN(y)) {
                    if (c.length == 1) {
                        x = c.charCodeAt(0) - 65;
                        y = undefined;
                    }
                    else {
                        x = c.charCodeAt(0) - 65;
                        y = parseInt(c.substr(1, c.length - 1)) - 1;
                    }
                }
                if (y != undefined) {
                    if (startY == undefined)
                        startY = y;
                    else if (y > startY)
                        endY = y;
                    else
                        _d = [y, startY], startY = _d[0], endY = _d[1];
                }
                if (x != undefined) {
                    if (startX == undefined)
                        startX = x;
                    else if (x > startX)
                        endX = x;
                    else
                        _e = [x, startX], startX = _e[0], endX = _e[1];
                }
            }
            if (startX == undefined)
                startX = 0;
            if (startY == undefined)
                startY = 0;
            if (endX == undefined)
                endX = width - 1;
            if (endY == undefined)
                endY = height - 1;
            for (var x_1 = startX; x_1 <= endX; x_1++) {
                for (var y_1 = startY; y_1 <= endY; y_1++) {
                    result.push(this.grids[x_1] && this.grids[x_1][y_1]);
                }
            }
            return result;
        }
        if (coors == "*") {
            for (var x_2 = 0; x_2 < this.width; x_2++) {
                for (var y_2 = 0; y_2 < this.height; y_2++) {
                    result.push(this.grids[x_2][y_2]);
                }
            }
        }
        return result;
        var _d, _e;
    };
    return GridBoard;
}());
//# sourceMappingURL=GridBoard.js.map
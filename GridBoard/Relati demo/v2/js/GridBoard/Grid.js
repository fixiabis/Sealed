"use strict";
var Grid = /** @class */ (function () {
    function Grid(board, x, y) {
        this.board = board;
        this.x = x;
        this.y = y;
        this.coordinate = "" + String.fromCharCode(x + 65) + (y + 1);
        this.board[this.coordinate] = this;
    }
    Grid.prototype.query = function (directionCommand) {
        var _a = this, x = _a.x, y = _a.y, board = _a.board;
        var unitCarried = 1;
        var unit = 1;
        for (var _i = 0, directionCommand_1 = directionCommand; _i < directionCommand_1.length; _i++) {
            var direction = directionCommand_1[_i];
            switch (direction) {
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
                    var unitValue = parseInt(direction);
                    if (isNaN(unitValue))
                        break;
                    if (unitCarried == 1)
                        unit = unitValue;
                    else
                        unit = unit * 10 + unitValue;
                    unitCarried++;
                    break;
            }
        }
        return board.grids[x] && board.grids[x][y];
    };
    Grid.prototype.queries = function (directionCommands) {
        var simplifyDirectionList = Grid.simplifyDirectionList, originalDirectionLists = Grid.originalDirectionLists;
        var gridList = [];
        if (directionCommands.indexOf(";") > -1) {
            for (var _i = 0, _a = directionCommands.split(";"); _i < _a.length; _i++) {
                var directionCommand = _a[_i];
                gridList = gridList.concat(this.queries(directionCommand));
            }
            return gridList;
        }
        for (var i = 0; i < simplifyDirectionList.length; i++) {
            var simplifyDirection = simplifyDirectionList[i];
            if (!directionCommands.match(simplifyDirection))
                continue;
            for (var _b = 0, _c = originalDirectionLists[i]; _b < _c.length; _b++) {
                var originalDirection = _c[_b];
                gridList = gridList.concat(this.queries(directionCommands.replace(simplifyDirection, originalDirection)));
            }
            return gridList;
        }
        if (directionCommands.indexOf(",") > -1) {
            for (var _d = 0, _e = directionCommands.split(","); _d < _e.length; _d++) {
                var directionCommand = _e[_d];
                gridList = gridList.concat(this.queries(directionCommand));
            }
            return gridList;
        }
        return [this.query(directionCommands)];
    };
    Grid.simplifyDirectionList = [/I/g, /H/g, /T/g, /X/g, /O/g];
    Grid.originalDirectionLists = [
        ["F", "B"], ["R", "L"],
        ["F", "B", "R", "L"],
        ["FR", "FL", "BR", "BL"],
        ["F", "B", "R", "L", "FR", "FL", "BR", "BL"]
    ];
    return Grid;
}());
//# sourceMappingURL=Grid.js.map
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GridQuery = /** @class */ (function () {
    function GridQuery() {
        this._queryCache = {};
        this._queriesCache = {};
    }
    GridQuery.prototype._cacheQueryResult = function (command, result) {
        return this._queryCache[command] = result;
    };
    GridQuery.prototype._cacheQueriesResult = function (commmands, results) {
        return this._queriesCache[commmands] = results;
    };
    GridQuery.prototype.clearQueryResult = function (command) {
        return delete this._queryCache[command];
    };
    GridQuery.prototype.clearQueriesResult = function (commands) {
        return delete this._queriesCache[commands];
    };
    return GridQuery;
}());
var Grid = /** @class */ (function (_super) {
    __extends(Grid, _super);
    function Grid(board, x, y) {
        var _this = _super.call(this) || this;
        _this.board = board;
        _this.x = x;
        _this.y = y;
        _this.coordinate = "" + String.fromCharCode(x + 65) + (y + 1);
        return _this;
    }
    Grid.prototype.query = function (directionCommand) {
        if (this._queryCache[directionCommand]) {
            return this._queryCache[directionCommand];
        }
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
                    if (unitCarried === 1)
                        unit = unitValue;
                    else
                        unit = unit * 10 + unitValue;
                    unitCarried++;
                    break;
            }
        }
        return this._cacheQueryResult(directionCommand, board.grids[x] && board.grids[x][y]);
    };
    Grid.prototype.queries = function (directionCommands) {
        if (this._queriesCache[directionCommands]) {
            return this._queriesCache[directionCommands];
        }
        var simplifyDirectionList = Grid.simplifyDirectionList, originalDirectionLists = Grid.originalDirectionLists;
        var gridList = [];
        if (directionCommands.indexOf(";") > -1) {
            for (var _i = 0, _a = directionCommands.split(";"); _i < _a.length; _i++) {
                var directionCommand = _a[_i];
                gridList = gridList.concat(this.queries(directionCommand));
            }
            return this._cacheQueriesResult(directionCommands, gridList);
        }
        for (var i = 0; i < simplifyDirectionList.length; i++) {
            var simplifyDirection = simplifyDirectionList[i];
            if (!directionCommands.match(simplifyDirection))
                continue;
            for (var _b = 0, _c = originalDirectionLists[i]; _b < _c.length; _b++) {
                var originalDirection = _c[_b];
                gridList = gridList.concat(this.queries(directionCommands.replace(simplifyDirection, originalDirection)));
            }
            return this._cacheQueriesResult(directionCommands, gridList);
        }
        if (directionCommands.indexOf(",") > -1) {
            for (var _d = 0, _e = directionCommands.split(","); _d < _e.length; _d++) {
                var directionCommand = _e[_d];
                gridList = gridList.concat(this.queries(directionCommand));
            }
            return this._cacheQueriesResult(directionCommands, gridList);
        }
        return this._cacheQueriesResult(directionCommands, [this.query(directionCommands)]);
    };
    Grid.simplifyDirectionList = [/I/g, /H/g, /T/g, /X/g, /O/g];
    Grid.originalDirectionLists = [
        ["F", "B"], ["R", "L"],
        ["F", "B", "R", "L"],
        ["FR", "FL", "BR", "BL"],
        ["F", "B", "R", "L", "FR", "FL", "BR", "BL"]
    ];
    return Grid;
}(GridQuery));
var GridBoard = /** @class */ (function (_super) {
    __extends(GridBoard, _super);
    function GridBoard(width, height) {
        var _this = _super.call(this) || this;
        _this.width = width;
        _this.height = height;
        _this.grids = [];
        _this.gridList = [];
        for (var x = 0; x < width; x++) {
            var gridRow = [];
            for (var y = 0; y < height; y++) {
                var grid = new Grid(_this, x, y);
                gridRow.push(grid);
                _this.gridList.push(grid);
                _this._queryCache[grid.coordinate] = grid;
            }
            _this.grids.push(gridRow);
        }
        return _this;
    }
    GridBoard.prototype.query = function (coordinateCommand) {
        if (this._queryCache[coordinateCommand]) {
            return this._queryCache[coordinateCommand];
        }
        var coordinate = coordinateCommand;
        var x = coordinate[0].charCodeAt(0) - 65;
        var y = parseInt(coordinate.substr(1, coordinate.length - 1)) - 1;
        return this._cacheQueryResult(coordinateCommand, this.grids[x] && this.grids[x][y]);
    };
    GridBoard.prototype.queries = function (coordinateCommands) {
        if (this._queriesCache[coordinateCommands]) {
            return this._queriesCache[coordinateCommands];
        }
        var gridList = [];
        var _a = this, width = _a.width, height = _a.height;
        if (coordinateCommands === "*")
            return this.gridList;
        if (coordinateCommands.indexOf(",") > -1) {
            for (var _i = 0, _b = coordinateCommands.split(","); _i < _b.length; _i++) {
                var coordinate = _b[_i];
                gridList = gridList.concat(this.queries(coordinate));
            }
            return this._cacheQueriesResult(coordinateCommands, gridList);
        }
        if (coordinateCommands.indexOf(":")) {
            var coordinates = coordinateCommands.split(":");
            var startCoordinate = coordinates[0];
            var endCoordinate = coordinates[1];
            var startGrid = this.query(startCoordinate);
            var endGrid = this.query(endCoordinate);
            var startX = Math.min(startGrid.x, endGrid.x);
            var endX = Math.max(startGrid.x, endGrid.x);
            var startY = Math.min(startGrid.y, endGrid.y);
            var endY = Math.max(startGrid.y, endGrid.y);
            for (var x = startX; x <= endX; x++) {
                for (var y = startY; y <= endY; y++) {
                    var grid = this.grids[x] && this.grids[x][y];
                    gridList.push(grid);
                }
            }
            return this._cacheQueriesResult(coordinateCommands, gridList);
        }
        var y = parseInt(coordinateCommands);
        if (!isNaN(y)) {
            for (var x = 0; x < width; x++) {
                gridList.push(this.grids[x][y]);
            }
            return this._cacheQueriesResult(coordinateCommands, gridList);
        }
        else if (coordinateCommands.length === 1) {
            var x = coordinateCommands.charCodeAt(0) - 65;
            for (var y = 0; y < height; y++) {
                gridList.push(this.grids[x][y]);
            }
            return this._cacheQueriesResult(coordinateCommands, gridList);
        }
        return this._cacheQueriesResult(coordinateCommands, [this.query(coordinateCommands)]);
    };
    return GridBoard;
}(GridQuery));
//# sourceMappingURL=GridBoard.js.map
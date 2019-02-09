"use strict";
var GridBoard = /** @class */ (function () {
    function GridBoard(width, height) {
        this.width = width;
        this.height = height;
        this.grids = [];
        this.gridList = [];
        for (var x = 0; x < width; x++) {
            var gridRow = [];
            for (var y = 0; y < height; y++) {
                var grid = new Grid(this, x, y);
                gridRow.push(grid);
                this.gridList.push(grid);
            }
            this.grids.push(gridRow);
        }
    }
    GridBoard.prototype.query = function (coordinate) {
        var x = coordinate[0].charCodeAt(0) - 65;
        var y = parseInt(coordinate.substr(1, coordinate.length - 1)) - 1;
        return this.grids[x] && this.grids[x][y];
    };
    GridBoard.prototype.queries = function (coordinateCommands) {
        var gridList = [];
        var _a = this, width = _a.width, height = _a.height;
        if (coordinateCommands == "*") {
            return this.gridList;
        }
        if (coordinateCommands.indexOf(",") > -1) {
            for (var _i = 0, _b = coordinateCommands.split(","); _i < _b.length; _i++) {
                var coordinate = _b[_i];
                gridList = gridList.concat(this.queries(coordinate));
            }
            return gridList;
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
            return gridList;
        }
        var y = parseInt(coordinateCommands);
        if (!isNaN(y)) {
            for (var x = 0; x < width; x++) {
                gridList.push(this.grids[x][y]);
            }
            return gridList;
        }
        else if (coordinateCommands.length == 1) {
            var x = coordinateCommands.charCodeAt(0) - 65;
            for (var y = 0; y < height; y++) {
                gridList.push(this.grids[x][y]);
            }
            return gridList;
        }
        return [this.query(coordinateCommands)];
    };
    return GridBoard;
}());
//# sourceMappingURL=GridBoard.js.map
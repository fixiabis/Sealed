class GridBoard extends GridQuery {
    public grids: Grid[][] = [];
    public gridList: Grid[] = [];

    constructor(public width: number, public height: number) {
        super();
        for (var x = 0; x < width; x++) {
            var gridRow = [];

            for (var y = 0; y < height; y++) {
                var grid = new Grid(this, x, y);
                gridRow.push(grid);
                this.gridList.push(grid);
                this._queryCache[grid.coordinate] = grid;
            }

            this.grids.push(gridRow);
        }
    }

    public query(coordinateCommand: string): Grid {
        if (this._queryCache[coordinateCommand]) {
            return this._queryCache[coordinateCommand];
        }

        var coordinate = coordinateCommand;
        var x = coordinate[0].charCodeAt(0) - 65;
        var y = parseInt(coordinate.substr(1, coordinate.length - 1)) - 1;

        return this._cacheQueryResult(
            coordinateCommand,
            this.grids[x] && this.grids[x][y]
        );
    }

    public queries(coordinateCommands: string): Grid[] {
        if (this._queriesCache[coordinateCommands]) {
            return this._queriesCache[coordinateCommands];
        }

        var gridList: Grid[] = [];
        var { width, height } = this;

        if (coordinateCommands === "*") return this.gridList;

        if (coordinateCommands.indexOf(",") > -1) {
            for (var coordinate of coordinateCommands.split(",")) {
                gridList = gridList.concat(this.queries(coordinate));
            }

            return this._cacheQueriesResult(
                coordinateCommands,
                gridList
            );
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

            return this._cacheQueriesResult(
                coordinateCommands,
                gridList
            );
        }

        var y = parseInt(coordinateCommands);

        if (!isNaN(y)) {
            for (var x = 0; x < width; x++) {
                gridList.push(this.grids[x][y]);
            }

            return this._cacheQueriesResult(
                coordinateCommands,
                gridList
            );
        } else if (coordinateCommands.length === 1) {
            var x = coordinateCommands.charCodeAt(0) - 65;

            for (var y = 0; y < height; y++) {
                gridList.push(this.grids[x][y]);
            }

            return this._cacheQueriesResult(
                coordinateCommands,
                gridList
            );
        }


        return this._cacheQueriesResult(
            coordinateCommands,
            [this.query(coordinateCommands)]
        );
    }
}
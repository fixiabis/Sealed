export class GridQueryCacheable {
    protected _queryCache: { [command: string]: Grid } = {};
    protected _queriesCache: { [command: string]: Grid[] } = {};

    protected _cacheQueryResult(command: string, result: Grid) {
        return this._queryCache[command] = result;
    }

    protected _cacheQueriesResult(commmands: string, results: Grid[]) {
        return this._queriesCache[commmands] = results;
    }

    public clearQueryResult(command: string) {
        return delete this._queryCache[command];
    }

    public clearQueriesResult(commands: string) {
        return delete this._queriesCache[commands];
    }
}

export class Grid extends GridQueryCacheable {
    public coordinate: string;

    static simplifyDirectionList = [/I/g, /H/g, /T/g, /X/g, /O/g];
    static originalDirectionLists = [
        ["F", "B"], ["R", "L"],
        ["F", "B", "R", "L"],
        ["FR", "FL", "BR", "BL"],
        ["F", "B", "R", "L", "FR", "FL", "BR", "BL"]
    ];

    constructor(
        public board: GridBoard, public x: number, public y: number
    ) {
        super();
        this.coordinate = `${String.fromCharCode(x + 65)}${y + 1}`;
    }

    query(directionCommand: string): Grid {
        if (this._queryCache[directionCommand]) {
            return this._queryCache[directionCommand];
        }

        var { x, y, board } = this;
        var unitCarried = 1;
        var unit = 1;

        for (var direction of directionCommand) {
            switch (direction) {
                case "F": unitCarried = 1; y -= unit; break;
                case "B": unitCarried = 1; y += unit; break;
                case "R": unitCarried = 1; x += unit; break;
                case "L": unitCarried = 1; x -= unit; break;

                case "-": unit *= -1; break;

                default:
                    var unitValue = parseInt(direction);
                    if (isNaN(unitValue)) break;

                    if (unitCarried === 1) unit = unitValue;
                    else unit = unit * 10 + unitValue;

                    unitCarried++;
                    break;
            }
        }

        return this._cacheQueryResult(
            directionCommand,
            board.grids[x] && board.grids[x][y]
        );
    }

    queries(directionCommands: string): Grid[] {
        if (this._queriesCache[directionCommands]) {
            return this._queriesCache[directionCommands];
        }

        var { simplifyDirectionList, originalDirectionLists } = Grid;
        var gridList: Grid[] = [];

        if (directionCommands.indexOf(";") > -1) {
            for (var directionCommand of directionCommands.split(";")) {
                gridList = gridList.concat(this.queries(directionCommand));
            }

            return this._cacheQueriesResult(
                directionCommands,
                gridList
            );
        }

        for (var i = 0; i < simplifyDirectionList.length; i++) {
            var simplifyDirection = simplifyDirectionList[i];
            if (!directionCommands.match(simplifyDirection)) continue;

            for (var originalDirection of originalDirectionLists[i]) {
                gridList = gridList.concat(this.queries(
                    directionCommands.replace(simplifyDirection, originalDirection)
                ));
            }

            return this._cacheQueriesResult(
                directionCommands,
                gridList
            );
        }

        if (directionCommands.indexOf(",") > -1) {
            for (var directionCommand of directionCommands.split(",")) {
                gridList = gridList.concat(this.queries(directionCommand));
            }

            return this._cacheQueriesResult(
                directionCommands,
                gridList
            );
        }

        return this._cacheQueriesResult(
            directionCommands,
            [this.query(directionCommands)]
        );
    }
}

export class GridBoard extends GridQueryCacheable {
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
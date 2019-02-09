class GridQuery {
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

class Grid extends GridQuery {
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
class Grid {
    public coordinate: string;

    static simplifyDirectionList = [/I/g, /H/g, /T/g, /X/g, /O/g];
    static originalDirectionLists = [
        ["F", "B"], ["R", "L"],
        ["F", "B", "R", "L"],
        ["FR", "FL", "BR", "BL"],
        ["F", "B", "R", "L", "FR", "FL", "BR", "BL"]
    ];

    constructor(public board: GridBoard, public x: number, public y: number) {
        this.coordinate = `${String.fromCharCode(x + 65)}${y + 1}`;
        this.board[this.coordinate] = this;
    }

    query(directionCommand: string): void | Grid {
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

                    if (unitCarried == 1) unit = unitValue;
                    else unit = unit * 10 + unitValue;

                    unitCarried++;
                    break;
            }
        }

        return board.grids[x] && board.grids[x][y];
    }

    queries(directionCommands: string): (void | Grid)[] {
        var { simplifyDirectionList, originalDirectionLists } = Grid;
        var gridList: (void | Grid)[] = [];

        if (directionCommands.indexOf(";") > -1) {
            for (var directionCommand of directionCommands.split(";")) {
                gridList = gridList.concat(this.queries(directionCommand));
            }

            return gridList;
        }

        for (var i = 0; i < simplifyDirectionList.length; i++) {
            var simplifyDirection = simplifyDirectionList[i];
            if (!directionCommands.match(simplifyDirection)) continue;

            for (var originalDirection of originalDirectionLists[i]) {
                gridList = gridList.concat(this.queries(
                    directionCommands.replace(simplifyDirection, originalDirection)
                ));
            }

            return gridList;
        }

        if (directionCommands.indexOf(",") > -1) {
            for (var directionCommand of directionCommands.split(",")) {
                gridList = gridList.concat(this.queries(directionCommand));
            }

            return gridList;
        }

        return [this.query(directionCommands)];
    }
}
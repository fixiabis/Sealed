type RelatiSymbol = "" | "O" | "X";
type RelatiStatus = (
    "normal" | "source" |
    "forbid" | "broken" | "defeat"
);
type RelatiExpandStatus = (
    "ownerO" | "ownerX" |
    "spaceR" | "spaceF" |
    "space" | "valid"
);
type RelatiAction = (
    "relati" | "relati-normal" | "relati-remote" |
    "relati-remote-normal" | "relati-remote-stable"
);
enum RelatiProp { symbol, status }
const RelatiRemoteStable = {
    directions: [
        { target: "IIH", spaces: "I,II,IH,H" },
        { target: "IHH", spaces: "H,HH,HI,I" }
    ],
    spaceDirectionIndexes: [[0, 1], [3, 2], [0, 2]]
};

interface RelatiGrid extends Grid {
    view: RelatiGridSymbol;
    prop: [RelatiSymbol, RelatiStatus];
    board: RelatiBoard;
    query(commands: string): RelatiGrid;
    queries(command: string): RelatiGrid[];
}

class RelatiGrid extends Grid implements RelatiGrid {
    public view = new RelatiGridSymbol(this);

    constructor(board: RelatiBoard, x: number, y: number) {
        super(board, x, y);
        this.prop[RelatiProp.symbol] = "";
        this.prop[RelatiProp.status] = "normal";
        board.viewer.appendView(this.view);
    }

    get symbol(): RelatiSymbol { return this.prop[RelatiProp.symbol]; }
    set symbol(symbol: RelatiSymbol) { this.prop[RelatiProp.symbol] = symbol; }
    get status(): RelatiStatus { return this.prop[RelatiProp.status]; }
    set status(status: RelatiStatus) { this.prop[RelatiProp.status] = status; }

    is(status: string): boolean {
        if (status.indexOf("|") > -1) {
            var statusList = status.split("|");

            for (var status of statusList) {
                if (this.is(status)) return true;
            }

            return false;
        }

        if (status.indexOf("&") > -1 || status.indexOf(" ") > -1) {
            var statusList = status.replace(/ /g, "&").split("&");

            for (var status of statusList) {
                if (!this.is(status)) return false;
            }

            return true;
        }

        switch (<RelatiExpandStatus>status) {
            case "ownerO": return this.symbol == "O";
            case "ownerX": return this.symbol == "X";
            case "spaceR": return this.symbol == "";
            case "spaceF": return (
                this.status == "broken" ||
                this.status == "defeat"
            );
            case "space": return (
                this.symbol == "" ||
                this.status == "broken" ||
                this.status == "defeat"
            );
            case "valid": return (
                this.status == "normal" ||
                this.status == "source"
            );
        }

        return this.status == status;
    }

    by(type: RelatiAction, symbol: RelatiSymbol): RelatiGrid[] {
        var grids: RelatiGrid[];
        var result: RelatiGrid[] = [];
        var lagal: string = `owner${symbol} valid`;

        if (type == "relati" || type == "relati-normal") {
            grids = this.queries("O");

            for (var grid of grids) {
                if (grid && grid.is(lagal)) {
                    result.push(grid);
                }
            }
        }

        if (type == "relati" || type == "relati-remote" || type == "relati-remote-normal") {
            var spaceGrids: RelatiGrid[] = this.queries("O");
            grids = this.queries("2O");

            for (var grid of grids) {
                var spaceGrid = spaceGrids.splice(0, 1)[0];
                if (grid && grid.is(lagal) && spaceGrid.is("space")) {
                    result.push(grid);
                }
            }
        }

        if (type == "relati" || type == "relati-remote" || type == "relati-remote-stable") {
            var { directions, spaceDirectionIndexes } = RelatiRemoteStable;

            for (var direction of directions) {
                var spaceGridLists: RelatiGrid[] = this.queries(direction.spaces);
                grids = this.queries(direction.target);

                for (var grid of grids) {
                    var spaceGrids: RelatiGrid[] = spaceGridLists.splice(0, 4);

                    if (grid && grid.is(lagal)) {
                        for (var spaceDirectionIndex of spaceDirectionIndexes) {
                            if (spaceGrids[spaceDirectionIndex[0]].is("space") &&
                                spaceGrids[spaceDirectionIndex[1]].is("space")
                            ) {
                                result.push(grid);
                                break;
                            }
                        }
                    }
                }
            }
        }

        return result;
    }
}

interface RelatiBoard extends GridBoard {
    allGrids: RelatiGrid[];
    grids: RelatiGrid[][];
    viewer: GridBoardViewer;
    find(status: string): RelatiGrid[];
}

class RelatiBoard extends GridBoard implements RelatiBoard {
    public allGrids: RelatiGrid[] = [];
    public viewer = new GridBoardViewer(this, createSVG("svg"));
    public view = new RelatiBackground(this);

    constructor(width: number, height: number) {
        super(width, height);

        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var grid = new RelatiGrid(this, x, y);
                this.grids[x][y] = grid;
                this.allGrids.push(grid);
            }
        }
        
        this.viewer.appendView(this.view);
    }

    find(status: string): RelatiGrid[] {
        return this.allGrids.filter(grid => grid.is(status));
    }
}
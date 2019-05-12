var board: RelatiBoard = new RelatiBoard(9, 9);
var turn = 0;
var canvas = board.viewer.body;
board.viewer.appendIn(document.body);

canvas.addEventListener("click", function (event) {
    var x: number = Math.floor(event.offsetX / 5),
        y: number = Math.floor(event.offsetY / 5),
        grid = board.grids[x] && board.grids[x][y],
        symbol: RelatiSymbol = turn % 2 ? "X" : "O";
    placement(grid, symbol);
});

function placement(grid: RelatiGrid, symbol: RelatiSymbol) {
    if (!grid.is("spaceR")) return;

    if (turn < 2) {
        grid.status = "source";
    } else if (grid.by("relati", symbol).length == 0) {
        return;
    }

    grid.symbol = symbol;

    for (let grid of board.find("spaceR")) {
        grid.view.next = "";
    }

    turn++;
    forbid();

    var symbol: RelatiSymbol = turn % 2 ? "X" : "O";

    for (let grid of board.find("spaceR")) {
        if (grid.by("relati", symbol).length > 0) {
            grid.view.next = symbol;
        }
    }
}

function relati(sourceGrid: RelatiGrid, symbol: RelatiSymbol, relatedList: RelatiGrid[]) {
    relatedList.push(sourceGrid);
    var relatiGrids = sourceGrid.by("relati", symbol);

    for (var relatiGrid of relatiGrids) {
        if (relatedList.indexOf(relatiGrid) == -1) {
            relati(relatiGrid, symbol, relatedList);
        }
    }
}

function forbid() {
    var sourceGrids = board.find("source");
    var grids = board.find("normal|forbid");
    var relatedList: RelatiGrid[] = [];
    for (var grid of grids) grid.status = "normal";

    for (var sourceGrid of sourceGrids) {
        relati(sourceGrid, sourceGrid.symbol, relatedList);
    }

    for (var grid of board.allGrids) {
        if (relatedList.indexOf(grid) == -1) {
            grid.status = "forbid";
        }
    }
}

board.viewer.render();
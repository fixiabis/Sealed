"use strict";
var board = new RelatiBoard(9, 9);
var turn = 0;
var canvas = board.viewer.body;
board.viewer.appendIn(document.body);
canvas.addEventListener("click", function (event) {
    var x = Math.floor(event.offsetX / 5), y = Math.floor(event.offsetY / 5), grid = board.grids[x] && board.grids[x][y], symbol = turn % 2 ? "X" : "O";
    placement(grid, symbol);
});
function placement(grid, symbol) {
    if (!grid.is("spaceR"))
        return;
    if (turn < 2) {
        grid.status = "source";
    }
    else if (grid.by("relati", symbol).length == 0) {
        return;
    }
    grid.symbol = symbol;
    for (var _i = 0, _a = board.find("spaceR"); _i < _a.length; _i++) {
        var grid_1 = _a[_i];
        grid_1.view.next = "";
    }
    turn++;
    forbid();
    var symbol = turn % 2 ? "X" : "O";
    for (var _b = 0, _c = board.find("spaceR"); _b < _c.length; _b++) {
        var grid_2 = _c[_b];
        if (grid_2.by("relati", symbol).length > 0) {
            grid_2.view.next = symbol;
        }
    }
}
function relati(sourceGrid, symbol, relatedList) {
    relatedList.push(sourceGrid);
    var relatiGrids = sourceGrid.by("relati", symbol);
    for (var _i = 0, relatiGrids_1 = relatiGrids; _i < relatiGrids_1.length; _i++) {
        var relatiGrid = relatiGrids_1[_i];
        if (relatedList.indexOf(relatiGrid) == -1) {
            relati(relatiGrid, symbol, relatedList);
        }
    }
}
function forbid() {
    var sourceGrids = board.find("source");
    var grids = board.find("normal|forbid");
    var relatedList = [];
    for (var _i = 0, grids_1 = grids; _i < grids_1.length; _i++) {
        var grid = grids_1[_i];
        grid.status = "normal";
    }
    for (var _a = 0, sourceGrids_1 = sourceGrids; _a < sourceGrids_1.length; _a++) {
        var sourceGrid = sourceGrids_1[_a];
        relati(sourceGrid, sourceGrid.symbol, relatedList);
    }
    for (var _b = 0, _c = board.allGrids; _b < _c.length; _b++) {
        var grid = _c[_b];
        if (relatedList.indexOf(grid) == -1) {
            grid.status = "forbid";
        }
    }
}
board.viewer.render();

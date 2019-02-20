var board = createBoard("bomber", 5, 5);

board.gridOf.C3.symbol = "O";
board.gridOf.C3.status = "shield";
board.gridOf.B2.symbol = "X";
board.gridOf.B4.symbol = "X";
board.gridOf.D3.symbol = "O";

board.viewerRefresh();

var board = createBoard("bomber", 5, 5);

board.gridOf.C3.symbol = "O";
board.gridOf.B2.symbol = "X";
board.gridOf.B4.symbol = "X";
board.gridOf.D3.symbol = "O";
board.gridOf.C3.getGridsFromDir("O,C").forEach(
    grid => {
        if (grid.symbol) {
            grid.status = "broken";
        }
    }
);

board.viewerRefresh();
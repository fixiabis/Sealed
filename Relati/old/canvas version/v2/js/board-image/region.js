var board = createBoard("region", 5, 5);

board.gridOf.C3.getGridsFromDir("IHH").forEach(
    grid => grid.symbol = "O"
);

board.viewerRefresh();
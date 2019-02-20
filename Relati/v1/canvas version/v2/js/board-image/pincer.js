for (let d of "TX") {
    var board = createBoard("pincer", 5, 5);
    board.gridOf.C3.getGridsFromDir(d).forEach(
        grid => {
            grid.symbol = "O";
            grid.status = "normal";
        }
    );
    board.gridOf.C3.symbol = "X";
    board.gridOf.C3.status = "broken";
    board.viewerRefresh();
};
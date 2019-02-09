var board = createBoard("escape", 5, 5);

board.gridOf.E5.symbol = "O";
board.gridOf.E5.status = "source";
board.gridOf.D5.symbol = "O";
board.gridOf.E4.symbol = "O";
board.gridOf.E4.status = "shield";

board.viewerRefresh();

var board = createBoard("escape", 5, 5);

board.gridOf.A1.symbol = "O";
board.gridOf.A1.status = "source";
board.gridOf.E5.symbol = "O";
board.gridOf.E5.status = "broken";
board.gridOf.D5.symbol = "O";
board.gridOf.D5.status = "broken";
board.gridOf.E4.symbol = "O";
board.gridOf.E4.status = "shield";

board.addGridMark(
    grid => grid.crd === "A1",
    function (painter, x, y, gridSize) {
        var routeLength = gridSize * 0.2;
        var finalX = x + gridSize - routeLength;
        var finalY = x + gridSize - routeLength;
        
        painter.strokeStyle = "red";
        painter.lineWidth = 2;

        painter.beginPath();
        painter.moveTo(finalX, finalY);
        painter.lineTo(
            finalX + gridSize * 3 + routeLength * 2.5,
            finalY + gridSize * 3 + routeLength * 2.5
        );
        painter.stroke();
        painter.closePath();
    }
);

board.viewerRefresh();
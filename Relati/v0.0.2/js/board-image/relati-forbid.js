var board = createBoard("relati-forbid", 5, 5);

board.gridOf.A1.symbol = "O";
board.gridOf.A1.status = "forbid";
board.gridOf.E2.symbol = "O";
board.gridOf.E2.status = "forbid";
board.gridOf.C3.symbol = "O";
board.gridOf.C3.status = "source";
board.gridOf.D2.symbol = "X";
board.gridOf.D3.symbol = "X";
board.gridOf.D2.status = "source";
board.gridOf.B2.symbol = "X";

board.viewerRefresh();


var board = createBoard("relati-forbid", 5, 5);

board.gridOf.A1.symbol = "O";
board.gridOf.A1.status = "forbid";
board.gridOf.E2.symbol = "O";
board.gridOf.E4.symbol = "O";
board.gridOf.C3.symbol = "O";
board.gridOf.C3.status = "source";
board.gridOf.D2.symbol = "X";
board.gridOf.D3.symbol = "X";
board.gridOf.D2.status = "source";
board.gridOf.B2.symbol = "X";

board.addGridMark(
    grid => grid.crd === "C3",
    function (painter, x, y, gridSize) {
        var routeLength = gridSize * 0.2;
        var beginX = x + routeLength;
        var finalX = x + gridSize - routeLength;
        var beginY = y + routeLength;
        var finalY = x + gridSize - routeLength;
        var leftX = x + gridSize * 0.4;
        var rightX = x + gridSize * 0.6;
        var topY = y + gridSize * 0.4;
        var bottomY = y + gridSize * 0.6;

        painter.strokeStyle = "red";
        painter.lineWidth = 2;
        routeLength += gridSize;

        relatiRoute(painter, {
            x: rightX,
            y: finalY
        }, {
            x: rightX,
            y: finalY + gridSize * 0.4
        }, {
            x: rightX + gridSize * 1.7,
            y: finalY + gridSize * 0.4
        });

        painter.strokeStyle = "black";
    }
);

board.addGridMark(
    grid => grid.crd === "E2",
    function (painter, x, y, gridSize) {
        var routeLength = gridSize * 0.2;
        var beginX = x + routeLength;
        var finalX = x + gridSize - routeLength;
        var beginY = y + routeLength;
        var finalY = y + gridSize - routeLength;
        var centerX = x + gridSize * 0.5;
        var centerY = y + gridSize * 0.5;
        var endX = x + gridSize;
        var endY = y + gridSize;

        painter.strokeStyle = "red";
        painter.lineWidth = 2;
        routeLength += gridSize;

        relatiRoute(painter, {
            x: centerX,
            y: finalY
        }, {
            x: centerX,
            y: endY + routeLength
        });

        painter.strokeStyle = "black";
    }
);

board.viewerRefresh();
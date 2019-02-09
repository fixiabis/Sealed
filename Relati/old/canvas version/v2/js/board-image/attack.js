var board = createBoard("attack", 5, 5);

board.gridOf.A1.symbol = "O";
board.gridOf.A1.status = "normal";
board.gridOf.E5.symbol = "X";
board.gridOf.E5.status = "normal";
board.gridOf.D4.symbol = "X";
board.gridOf.D4.status = "normal";
board.gridOf.E1.symbol = "X";
board.gridOf.E1.status = "normal";
board.gridOf.D1.symbol = "X";
board.gridOf.D1.status = "normal";

board.addGridMark(
    grid => grid.crd === "A1",
    function (painter, x, y, gridSize) {
        painter.strokeStyle = "red";
        painter.lineWidth = 2;

        var routeLength = gridSize * 0.2;
        var finalX = x + gridSize - routeLength;
        var finalY = x + gridSize - routeLength;

        painter.beginPath();
        painter.moveTo(finalX, finalY);
        painter.lineTo(
            finalX + gridSize * 2 + routeLength * 2.5,
            finalY + gridSize * 2 + routeLength * 2.5
        );
        painter.stroke();
        painter.closePath();
    }
);

board.addGridMark(
    grid => grid.crd === "D1",
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

        painter.beginPath();
        painter.moveTo(beginX, centerY);
        painter.lineTo(
            beginX - routeLength * 2,
            centerY
        );
        painter.stroke();
        painter.closePath();
    }
);

board.viewerRefresh();

var board = createBoard("attack", 5, 5);

board.gridOf.A1.symbol = "O";
board.gridOf.A1.status = "broken";
board.gridOf.E5.symbol = "X";
board.gridOf.E5.status = "select";
board.gridOf.D4.symbol = "X";
board.gridOf.D4.status = "normal";
board.gridOf.E1.symbol = "X";
board.gridOf.E1.status = "select";
board.gridOf.D1.symbol = "X";
board.gridOf.D1.status = "normal";

board.addGridMark(
    grid => grid.crd === "A1",
    function (painter, x, y, gridSize) {
        painter.strokeStyle = "red";
        painter.lineWidth = 2;

        var routeLength = gridSize * 0.2;
        var finalX = x + gridSize - routeLength;
        var finalY = x + gridSize - routeLength;

        painter.beginPath();
        painter.moveTo(finalX, finalY);
        painter.lineTo(
            finalX + gridSize * 2 + routeLength * 2.5,
            finalY + gridSize * 2 + routeLength * 2.5
        );
        painter.stroke();
        painter.closePath();
    }
);

board.addGridMark(
    grid => grid.crd === "D1",
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

        painter.beginPath();
        painter.moveTo(beginX, centerY);
        painter.lineTo(
            beginX - routeLength * 2,
            centerY
        );
        painter.stroke();
        painter.closePath();
    }
);

board.viewerRefresh();

var board = createBoard("attack", 5, 5);

board.gridOf.A1.symbol = "O";
board.gridOf.A1.status = "broken";
board.gridOf.E5.symbol = "X";
board.gridOf.E5.status = "broken";
board.gridOf.D4.symbol = "X";
board.gridOf.D4.status = "normal";
board.gridOf.E1.symbol = "X";
board.gridOf.E1.status = "normal";
board.gridOf.D1.symbol = "X";
board.gridOf.D1.status = "normal";

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
            finalX + gridSize * 2 + routeLength * 2.5,
            finalY + gridSize * 2 + routeLength * 2.5
        );
        painter.stroke();
        painter.closePath();
    }
);

board.viewerRefresh();
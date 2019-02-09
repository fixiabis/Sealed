var board = createBoard("relati-normal", 5, 5);

board.gridOf.C3.status = "source";
board.gridOf.C3.getGridsFromDir("O,C").forEach(
    grid => grid.symbol = "O"
);

board.addGridMark(
    grid => grid.crd === "C3",
    function (painter, x, y, gridSize) {
        var routeLength = gridSize * 0.2;
        var beginX = x + routeLength;
        var finalX = x + gridSize - routeLength;
        var beginY = y + routeLength;
        var finalY = x + gridSize - routeLength;
        var centerX = x + gridSize * 0.5;
        var centerY = y + gridSize * 0.5;
        var endX = x + gridSize;
        var endY = y + gridSize;

        painter.strokeStyle = "red";
        painter.lineWidth = 2;

        relatiRoute(painter, {
            x: beginX,
            y: beginY
        }, {
            x: x - routeLength,
            y: y - routeLength
        });

        relatiRoute(painter, {
            x: finalX,
            y: finalY
        }, {
            x: endX + routeLength,
            y: endY + routeLength
        });

        relatiRoute(painter, {
            x: beginX,
            y: finalY
        }, {
            x: x - routeLength,
            y: endY + routeLength
        });

        relatiRoute(painter, {
            x: finalX,
            y: beginY
        }, {
            x: endX + routeLength,
            y: y - routeLength
        });

        relatiRoute(painter, {
            x: centerX,
            y: beginY
        }, {
            x: centerX,
            y: y - routeLength
        });

        relatiRoute(painter, {
            x: centerX,
            y: finalY
        }, {
            x: centerX,
            y: endY + routeLength
        });

        relatiRoute(painter, {
            x: beginX,
            y: centerY
        }, {
            x: x - routeLength,
            y: centerY
        });

        relatiRoute(painter, {
            x: finalX,
            y: centerY
        }, {
            x: endX + routeLength,
            y: centerY
        });

        painter.strokeStyle = "black";
    }
);

board.viewerRefresh();
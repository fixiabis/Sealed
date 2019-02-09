function signOXDUA(board) {
    var symbolColor = {
        "O": "#dc143c",
        "X": "#4169e1",
        "D": "#ffa500",
        "U": "#2e8b57"
    };
    var viewer = board.viewer;

    function cleanSign(grid) {
        for (var i = 0; i < grid.views.length; i++) {
            viewer.removeChild(grid.views[i]);
        }
        grid.views = [];
    }

    function createDot(svg, grid, sym) {
        var view = svg("circle");
        view.setAttribute("stroke-width", "0.2");
        view.setAttribute("cx", "" + (grid.x * 5 + 2.5));
        view.setAttribute("cy", "" + (grid.y * 5 + 2.5));
        view.setAttribute("r", "0.4");
        view.setAttribute("fill", symbolColor[sym]);
        return view;
    }

    board.addSign("next", "", function (svg, grid) {
        cleanSign(grid);
    });

    for (var sym in symbolColor) {
        (function (sym) {
            board.addSign("next", sym, function (svg, grid) {
                cleanSign(grid);
                var view = createDot(svg, grid, sym);
                grid.views.push(view);
                viewer.appendChild(view);
            });
        })(sym);
    }
    board.addSign("symbol", "", function (svg, grid) {
        cleanSign(grid);
    });
    board.addSign("symbol", "O", function (svg, grid) {
        cleanSign(grid);
        var view = svg("circle");
        view.setAttribute("stroke-width", "0.6");
        view.setAttribute("cx", "" + (grid.x * 5 + 2.5));
        view.setAttribute("cy", "" + (grid.y * 5 + 2.5));
        view.setAttribute("r", "1.5");
        view.setAttribute("stroke", symbolColor["O"]);
        view.setAttribute("fill", "none");
        view.style.animation = "blink 0.8s 2";
        grid.views.push(view);
        viewer.appendChild(view);
    });
    board.addSign("symbol", "X", function (svg, grid) {
        cleanSign(grid);
        var srtX = grid.x * 5 + 1;
        var srtY = grid.y * 5 + 1;
        var endX = grid.x * 5 + 4;
        var endY = grid.y * 5 + 4;
        var view = svg("path");
        view.setAttribute("stroke-width", "0.6");
        view.setAttribute("d", "M " + srtX + " " + srtY + " L " + endX + " " + endY);
        view.setAttribute("stroke", symbolColor["X"]);
        view.setAttribute("fill", "none");
        view.style.animation = "blink 0.8s 2";
        grid.views.push(view);
        viewer.appendChild(view);
        view = svg("path");
        view.setAttribute("stroke-width", "0.6");
        view.setAttribute("d", "M " + srtX + " " + endY + " L " + endX + " " + srtY);
        view.setAttribute("stroke", symbolColor["X"]);
        view.setAttribute("fill", "none");
        view.style.animation = "blink 0.8s 2";
        grid.views.push(view);
        viewer.appendChild(view);
    });
    board.addSign("symbol", "D", function (svg, grid) {
        cleanSign(grid);
        var srtX = grid.x * 5 + 1;
        var srtY = grid.y * 5 + 1;
        var endX = grid.x * 5 + 4;
        var endY = grid.y * 5 + 4;
        var view = svg("path");
        view.setAttribute("stroke-width", "0.6");
        view.setAttribute(
            "d",
            `M ${endX} ${endY} L ${srtX} ${endY} L ${srtX + 1.5} ${srtY}Z`
        );
        view.setAttribute("stroke", symbolColor["D"]);
        view.setAttribute("fill", "none");
        view.style.animation = "blink 0.8s 2";
        grid.views.push(view);
        viewer.appendChild(view);
    });
    board.addSign("symbol", "U", function (svg, grid) {
        cleanSign(grid);
        var srtX = grid.x * 5 + 1;
        var srtY = grid.y * 5 + 1;
        var endX = grid.x * 5 + 4;
        var endY = grid.y * 5 + 4;
        var view = svg("path");
        view.setAttribute("stroke-width", "0.6");
        view.setAttribute(
            "d",
            `M ${srtX} ${srtY} V ${endY} H ${endX} V ${srtY} Z`
        );
        view.setAttribute("stroke", symbolColor["U"]);
        view.setAttribute("fill", "none");
        view.style.animation = "blink 0.8s 2";
        grid.views.push(view);
        viewer.appendChild(view);
    });
    function normalStatus(grid) {
        for (var i = 0; i < grid.views.length; i++) {
            grid.views[i].setAttribute("stroke-width", "0.6");
            grid.views[i].setAttribute("stroke", symbolColor[grid.symbol]);
        }
    }
    board.addSign("status", "normal", function (svg, grid) {
        normalStatus(grid);
    });
    board.addSign("status", "forbid", function (svg, grid) {
        normalStatus(grid);
        for (var i = 0; i < grid.views.length; i++) {
            grid.views[i].setAttribute("stroke", "#666");
        }
    });
    board.addSign("status", "source", function (svg, grid) {
        normalStatus(grid);
        for (var i = 0; i < grid.views.length; i++) {
            grid.views[i].setAttribute("stroke-width", "0.8");
        }
    });
    board.addSign("status", "broken", function (svg, grid) {
        normalStatus(grid);
        for (var i = 0; i < grid.views.length; i++) {
            grid.views[i].setAttribute("stroke", "#ddd");
        }
    });
}

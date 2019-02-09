"use strict";
var Relati;
(function (Relati) {
    var RelatiView;
    (function (RelatiView) {
        function update(board, gridSize) {
            for (var _i = 0, _a = board.gridList; _i < _a.length; _i++) {
                var grid = _a[_i];
                removeSymbol(grid);
                if (grid.role.owner) {
                    switch (grid.role.owner.ownerSymbol) {
                        case "O":
                            createSymbolO(grid, gridSize);
                            break;
                        case "X":
                            createSymbolX(grid, gridSize);
                            break;
                    }
                }
                else {
                    createPlaceable(grid, gridSize);
                }
            }
        }
        RelatiView.update = update;
        function removeSymbol(grid) {
            while (grid.view.childNodes.length != 0) {
                grid.view.removeChild(grid.view.childNodes[0]);
            }
        }
        var gridSize = 5;
        var symbolOColor = "crimson";
        var symbolXColor = "royalblue";
        var leaderSymbolColor = "#f2f2f2";
        var blockedSymbolColor = "#888";
        var gridCenter = gridSize / 2;
        var gridMargin = gridSize / 5;
        var gridDotRadius = gridSize / 12.5;
        var circleRadius = gridSize * 0.3;
        var symbolLineWidth = gridSize * 0.12;
        function createPlaceable(grid, gridSize) {
            var x = grid.x, y = grid.y;
            var color = "";
            x *= gridSize;
            y *= gridSize;
            if (grid.role["O-placeable"])
                color = symbolOColor;
            else if (grid.role["X-placeable"])
                color = symbolXColor;
            else
                return;
            var symbolView = createSVG("circle", {
                "cx": "" + (x + gridCenter),
                "cy": "" + (y + gridCenter),
                "r": "" + gridDotRadius,
                "fill": color
            });
            grid.view.appendChild(symbolView);
        }
        function createSymbolO(grid, gridSize) {
            var x = grid.x, y = grid.y;
            x *= gridSize;
            y *= gridSize;
            var symbolView = createSVG("circle", {
                "cx": "" + (x + gridCenter),
                "cy": "" + (y + gridCenter),
                "stroke": symbolOColor,
                "r": "" + circleRadius,
                "fill": "none",
                "stroke-width": "" + symbolLineWidth
            });
            grid.view.appendChild(symbolView);
            if (grid.role["relati-blocked"]) {
                updateSVG(symbolView, {
                    "stroke": blockedSymbolColor
                });
            }
            switch (grid.role.type) {
                case "leader":
                    createLeaderO(grid, gridSize);
                    break;
                case "wizard":
                    createWizardO(grid, gridSize);
                    break;
                case "general":
                    createGeneralO(grid, gridSize);
                    break;
            }
        }
        function createLeaderO(grid, gridSize) {
            var x = grid.x, y = grid.y;
            x *= gridSize;
            y *= gridSize;
            for (var _i = 0, _a = grid.view.childNodes; _i < _a.length; _i++) {
                var view = _a[_i];
                updateSVG(view, {
                    "stroke-width": "" + gridMargin
                });
            }
            var symbolView = createSVG("circle", {
                "cx": "" + (x + gridCenter),
                "cy": "" + (y + gridCenter),
                "stroke": leaderSymbolColor,
                "r": "" + circleRadius,
                "fill": "none",
                "stroke-width": "" + gridSize / 10
            });
            grid.view.appendChild(symbolView);
        }
        function createWizardO(grid, gridSize) {
        }
        function createGeneralO(grid, gridSize) {
        }
        function createSymbolX(grid, gridSize) {
            var x = grid.x, y = grid.y;
            x *= gridSize;
            y *= gridSize;
            var symbolView = createSVG("path", {
                "stroke": symbolXColor,
                "fill": "none",
                "d": "M " + (x + gridMargin) + " " + (y + gridMargin) + " L " + ((x + gridSize) - gridMargin) + " " + ((y + gridSize) - gridMargin),
                "stroke-width": "" + symbolLineWidth
            });
            grid.view.appendChild(symbolView);
            if (grid.role["relati-blocked"]) {
                updateSVG(symbolView, {
                    "stroke": blockedSymbolColor
                });
            }
            var symbolView = createSVG("path", {
                "stroke": symbolXColor,
                "fill": "none",
                "d": "M " + (x + gridMargin) + " " + ((y + gridSize) - gridMargin) + " L " + ((x + gridSize) - gridMargin) + " " + (y + gridMargin),
                "stroke-width": "" + symbolLineWidth
            });
            grid.view.appendChild(symbolView);
            if (grid.role["relati-blocked"]) {
                updateSVG(symbolView, {
                    "stroke": blockedSymbolColor
                });
            }
            switch (grid.role.type) {
                case "leader":
                    createLeaderX(grid, gridSize);
                    break;
                case "wizard":
                    createWizardX(grid, gridSize);
                    break;
                case "general":
                    createGeneralX(grid, gridSize);
                    break;
            }
        }
        function createLeaderX(grid, gridSize) {
            var x = grid.x, y = grid.y;
            x *= gridSize;
            y *= gridSize;
            for (var _i = 0, _a = grid.view.childNodes; _i < _a.length; _i++) {
                var view = _a[_i];
                updateSVG(view, {
                    "stroke-width": "" + gridMargin
                });
            }
            var symbolView = createSVG("path", {
                "stroke": leaderSymbolColor,
                "fill": "none",
                "d": "M " + (x + gridMargin) + " " + (y + gridMargin) + " L " + ((x + gridSize) - gridMargin) + " " + ((y + gridSize) - gridMargin),
                "stroke-width": "" + gridSize / 10
            });
            grid.view.appendChild(symbolView);
            var symbolView = createSVG("path", {
                "stroke": leaderSymbolColor,
                "fill": "none",
                "d": "M " + (x + gridMargin) + " " + ((y + gridSize) - gridMargin) + " L " + ((x + gridSize) - gridMargin) + " " + (y + gridMargin),
                "stroke-width": "" + gridSize / 10
            });
            grid.view.appendChild(symbolView);
        }
        function createWizardX(grid, gridSize) {
        }
        function createGeneralX(grid, gridSize) {
        }
    })(RelatiView = Relati.RelatiView || (Relati.RelatiView = {}));
})(Relati || (Relati = {}));
//# sourceMappingURL=RelatiView.js.map
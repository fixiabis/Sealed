namespace Relati {
    export namespace RelatiView {
        export function update(board: RelatiBoard, gridSize: number) {
            for (var grid of board.gridList) {
                removeSymbol(grid);

                switch (grid.role.owner) {
                    case "O": createSymbolO(grid, gridSize); break;
                    case "X": createSymbolX(grid, gridSize); break;
                    case "": createPlaceable(grid, gridSize); break;
                }
            }
        }

        function removeSymbol(grid: RelatiGrid) {
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
        var circleRadius = gridSize * 0.3
        var symbolLineWidth = gridSize * 0.12;

        function createPlaceable(grid: RelatiGrid, gridSize: number) {
            var { x, y } = grid;
            var color = "";

            x *= gridSize;
            y *= gridSize;

            if (grid.role.is("O-placeable")) color = symbolOColor;
            else if (grid.role.is("X-placeable")) color = symbolXColor;
            else return;

            var symbolView = createSVG("circle", {
                "cx": `${x + gridCenter}`,
                "cy": `${y + gridCenter}`,
                "r": `${gridDotRadius}`,
                "fill": color
            });

            grid.view.appendChild(symbolView);
        }

        function createSymbolO(grid: RelatiGrid, gridSize: number) {
            var { x, y } = grid;

            x *= gridSize;
            y *= gridSize;

            var symbolView = createSVG("circle", {
                "cx": `${x + gridCenter}`,
                "cy": `${y + gridCenter}`,
                "stroke": symbolOColor,
                "r": `${circleRadius}`,
                "fill": "none",
                "stroke-width": `${symbolLineWidth}`
            });

            grid.view.appendChild(symbolView);

            if (grid.role.is("relati-blocked")) {
                updateSVG(symbolView, {
                    "stroke": blockedSymbolColor
                });
            }

            switch (grid.role.type) {
                case "leader": createLeaderO(grid, gridSize); break;
                case "wizard": createWizardO(grid, gridSize); break;
                case "general": createGeneralO(grid, gridSize); break;
            }
        }

        function createLeaderO(grid: RelatiGrid, gridSize: number) {
            var { x, y } = grid;

            x *= gridSize;
            y *= gridSize;

            for (var view of (<any>grid.view.childNodes)) {
                updateSVG(view, {
                    "stroke-width": `${gridMargin}`
                });
            }

            var symbolView = createSVG("circle", {
                "cx": `${x + gridCenter}`,
                "cy": `${y + gridCenter}`,
                "stroke": leaderSymbolColor,
                "r": `${circleRadius}`,
                "fill": "none",
                "stroke-width": `${gridSize / 10}`
            });

            grid.view.appendChild(symbolView);
        }

        function createWizardO(grid: RelatiGrid, gridSize: number) {

        }

        function createGeneralO(grid: RelatiGrid, gridSize: number) {

        }

        function createSymbolX(grid: RelatiGrid, gridSize: number) {
            var { x, y } = grid;

            x *= gridSize;
            y *= gridSize;

            var symbolView = createSVG("path", {
                "stroke": symbolXColor,
                "fill": "none",
                "d": `M ${
                    x + gridMargin} ${
                    y + gridMargin} L ${
                    (x + gridSize) - gridMargin} ${
                    (y + gridSize) - gridMargin}`,
                "stroke-width": `${symbolLineWidth}`
            });

            grid.view.appendChild(symbolView);

            if (grid.role.is("relati-blocked")) {
                updateSVG(symbolView, {
                    "stroke": blockedSymbolColor
                });
            }

            var symbolView = createSVG("path", {
                "stroke": symbolXColor,
                "fill": "none",
                "d": `M ${
                    x + gridMargin} ${
                    (y + gridSize) - gridMargin} L ${
                    (x + gridSize) - gridMargin} ${
                    y + gridMargin}`,
                "stroke-width": `${symbolLineWidth}`
            });

            grid.view.appendChild(symbolView);

            if (grid.role.is("relati-blocked")) {
                updateSVG(symbolView, {
                    "stroke": blockedSymbolColor
                });
            }

            switch (grid.role.type) {
                case "leader": createLeaderX(grid, gridSize); break;
                case "wizard": createWizardX(grid, gridSize); break;
                case "general": createGeneralX(grid, gridSize); break;
            }
        }

        function createLeaderX(grid: RelatiGrid, gridSize: number) {
            var { x, y } = grid;

            x *= gridSize;
            y *= gridSize;

            for (var view of (<any>grid.view.childNodes)) {
                updateSVG(view, {
                    "stroke-width": `${gridMargin}`
                });
            }

            var symbolView = createSVG("path", {
                "stroke": leaderSymbolColor,
                "fill": "none",
                "d": `M ${
                    x + gridMargin} ${
                    y + gridMargin} L ${
                    (x + gridSize) - gridMargin} ${
                    (y + gridSize) - gridMargin}`,
                "stroke-width": `${gridSize / 10}`
            });

            grid.view.appendChild(symbolView);

            var symbolView = createSVG("path", {
                "stroke": leaderSymbolColor,
                "fill": "none",
                "d": `M ${
                    x + gridMargin} ${
                    (y + gridSize) - gridMargin} L ${
                    (x + gridSize) - gridMargin} ${
                    y + gridMargin}`,
                "stroke-width": `${gridSize / 10}`
            });

            grid.view.appendChild(symbolView);
        }

        function createWizardX(grid: RelatiGrid, gridSize: number) {

        }

        function createGeneralX(grid: RelatiGrid, gridSize: number) {

        }
    }
}
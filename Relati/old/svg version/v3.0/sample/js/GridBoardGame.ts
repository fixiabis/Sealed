var GridBoardGame = (function () {
    var symbol = "OX";

    class GridBoardGame {
        turn = 0;
        board;
        available;

        constructor(container, size) {
            size = size || 5;
            this.board = new GridBoard(size, size);
            this.board.viewerIn(container);
            OXDUA(this.board);
        }

        nextGrid(sym) {
            var grids = [];
            var board = this.board;

            for (var crd in board.gridOf) {
                var grid = board.gridOf[crd];

                if (!grid.symbol && grid.symbolViews) {
                    board.viewer.removeChild(grid.symbolViews[0]);
                    delete grid.symbolViews;
                }

                if (this.available(grid, sym || this.symbol())) {
                    var view = board.createView("circle", {
                        "cx": grid.x * 20 + 10,
                        "cy": grid.y * 20 + 10,
                        "r": 1,
                        "fill": this.turn % 2 ? "#4169e1" : "#dc143c"
                    });
                    board.viewer.appendChild(view);
                    grid.symbolViews = [view];
                    grids.push(grid);
                }
            }

            return grids;
        }

        symbol() {
            return symbol[this.turn % 2];
        }

        reset() {
            this.turn = 0;
            this.board.reset();
        }
    }

    return GridBoardGame;
})();
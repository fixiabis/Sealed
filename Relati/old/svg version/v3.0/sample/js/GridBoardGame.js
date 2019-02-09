var GridBoardGame = (function () {
    var symbol = "OX";
    var GridBoardGame = /** @class */ (function () {
        function GridBoardGame(container, size) {
            this.turn = 0;
            size = size || 5;
            this.board = new GridBoard(size, size);
            this.board.viewerIn(container);
            OXDUA(this.board);
        }
        GridBoardGame.prototype.nextGrid = function (sym) {
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
        };
        GridBoardGame.prototype.symbol = function () {
            return symbol[this.turn % 2];
        };
        GridBoardGame.prototype.reset = function () {
            this.turn = 0;
            this.board.reset();
        };
        return GridBoardGame;
    }());
    return GridBoardGame;
})();

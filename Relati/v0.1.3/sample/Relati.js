(function (container) {
    var game = new GridBoardGame(container);

    function isRelati(grid, sym) {
        return grid.getGridsFromDir("O").filter(
            function (grid) {
                return grid && grid.symbol === sym;
            }
        ).length > 0;
    }

    game.available = function (grid, sym) {
        return !grid.symbol && (
            game.turn < 2 ||
            isRelati(grid, sym)
        );
    };

    game.board.gridSelected = function (grid) {
        var sym = game.symbol();

        if (game.available(grid, sym)) {
            grid.set(sym);
            game.turn++;

            if (game.turn > 1) {
                if (game.nextGrid().length === 0) {
                    if (game.nextGrid(sym).length === 0) {
                        Message.show("Draw", function () {
                            game.reset();
                        });
                    } else {
                        Message.show(sym + " Win", function () {
                            game.reset();
                        });
                    }
                }
            }
        }
    };
})(document.getElementById("board-page"));
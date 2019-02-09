var userName = "a";
var userPic = "a";

(function (container) {
    var game = new GridBoardGame(container);
    var mySym;

    function playerMatch() {
        mySym = "";
        GameArena.join("Relati", userName, userPic).then(function (data) {
            console.log("matched, you are " + data.sym);
            mySym = data.sym;
        });
    }

    GameArena.whenPlayerSet(function (crd) {
        game.board.gridSelected(game.board.gridOf[crd], true);
    });

    GameArean.whenPlayerLeave(function () {
        if (turn > 1) {
            Message.show(mySym + " Win", function () {
                playerMatch();
                game.reset();
                statusReset();
            });
        } else {
            Message.show("Player left", function () {
                playerMatch();
                game.reset();
                statusReset();
            });
        }
    });

    playerMatch();

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

    game.board.gridSelected = function (grid, fromOnline) {
        var sym = game.symbol();

        if (sym !== mySym && !fromOnline) return;

        if (game.available(grid, sym)) {
            grid.set(sym);
            GameArena.set(grid.crd);
            game.turn++;

            if (game.turn > 1) {
                var nextGridExist = game.nextGrid();

                if (!nextGridExist) {
                    if (!game.nextGrid(sym)) {
                        Message.show("Draw", function () {
                            playerMatch();
                            game.reset();
                        });
                    } else {
                        game.nextGrid();
                        Message.show(sym + " Win", function () {
                            playerMatch();
                            game.reset();
                        });
                    }
                }
            }
        }
    };
})(document.getElementById("board-page"));
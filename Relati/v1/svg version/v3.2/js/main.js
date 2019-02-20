var pages = document.getElementsByClassName("page");
var exitButton = document.getElementById("game-exit");
var header = document.getElementById("header");
var whenToStartPage;

function gameStart(button, container, user) {
    var board = new RelatiBoard(9, 9);
    var userWinOrLose = document.getElementById("user-win-or-lose");
    var game = {
        turn: 0,
        players: 2,
        symbol: "OX",
        losers: "",
        isOnline: false
    };

    game.nowSymbol = function () {
        return game.symbol[game.turn % game.players];
    };

    game.findWinner = function () {
        var sym = game.nowSymbol();
        var nextStepExist = false;

        board.find("space").forEach(function (grid) {
            grid.symbol = "";
            grid.status = "normal";

            if (grid.by("relati", sym).length > 0) {
                grid.status = sym + ".next";
                nextStepExist = true;
            }
        });

        if (!nextStepExist) {
            if (game.losers.indexOf(sym) < 0) {
                game.losers += sym;
            }

            game.turn++;
            if (game.losers.length !== game.players) {
                return game.findWinner();
            }
        }
    };

    game.restart = function () {
        game.turn = 0;
        game.losers = "";

        for (var crd in board.gridOf) {
            board[crd].symbol = "";
            board[crd].status = "normal";
        }

        board.viewer.backgroundFixed = false;
        board.viewer.removeBackground();

        if (game.isOnline) game.online.match();
    };

    if (user) {
        var pic = [
            document.getElementById("player1"),
            document.getElementById("player2"),
        ];

        var playerImage = document.getElementById("player-image");
        var userSign = document.getElementById("user-sign");
        playerImage.style.backgroundImage = "url(" + user.picUrl + ")";

        game.isOnline = true;
        game.online = {
            symbol: ""
        };

        game.online.match = function () {
            Message.show("user-loading");
            GameArena.join("Relati", user.name, user.picUrl).then(function (data) {
                game.online.symbol = data.sym;

                if (data.sym === "O") {
                    pic[0].style.backgroundImage = "url(" + user.picUrl + ")";
                    pic[1].style.backgroundImage = "url(" + data.picUrl + ")";
                } else {
                    pic[0].style.backgroundImage = "url(" + data.picUrl + ")";
                    pic[1].style.backgroundImage = "url(" + user.picUrl + ")";
                }

                userSign.className = "symbol-" + data.sym;
                Message.show("user-sign");
            });
        };

        game.online.myTurn = function () {
            return game.online.symbol === game.nowSymbol();
        };

        GameArena.link();

        GameArena.whenPlayerSet(function (crd) {
            board.viewer.onselect(board[crd], true);
        });

        GameArena.whenPlayerLeave(function () {
            if (game.turn > 0) {
                userWinOrLose.className = "";
                setTimeout(function () {
                    userWinOrLose.className = game.online.symbol + "-win";
                }, 500);

                Message.show("user-win-or-lose", null, function () {
                    game.restart();
                });
            } else {
                game.online.match();
            }
        });
    }

    board.viewer.onselect = function (grid, fromOnline) {
        if (!grid.is("space")) return;
        if (game.isOnline && !game.online.myTurn() && !fromOnline) return;

        var sym = game.nowSymbol();

        board.viewer.backgroundFixed = false;
        board.viewer.removeBackground();

        if (game.turn < game.players) {
            grid.symbol = sym;
            grid.status = "source";
        } else if (grid.by("relati", sym).length > 0) {
            grid.symbol = sym;
            grid.status = "normal";
        } else return;

        if (game.isOnline) GameArena.set(grid.crd);

        var prevGrid = game.prevGrid;

        if (prevGrid && prevGrid.views.length > 0) {
            prevGrid.views.forEach(function (view) {
                view.style.animationDuration = "0s";
            });
        }

        game.prevGrid = grid;

        board.viewer.backgroundFixed = true;

        game.turn++;
        forbidRelati();

        if (game.turn >= game.players) {
            game.findWinner();

            if (game.losers.length === game.players) {
                userWinOrLose.className = "";
                setTimeout(function () {
                    userWinOrLose.className = "draw";
                }, 500);

                Message.show("user-win-or-lose", null, function () {
                    game.restart();
                });
            } else if (game.losers.length === game.players - 1) {
                if (game.losers.indexOf(sym) < 0) {
                    userWinOrLose.className = "";
                    setTimeout(function () {
                        userWinOrLose.className = sym + "-win";
                    }, 500);

                    Message.show("user-win-or-lose", null, function () {
                        game.restart();
                    });
                }
            }
        }
    };

    function relati(grid, list) {
        var grids = grid.by("relati", grid.symbol);
        list.push(grid);
        grids.forEach(function (grid) {
            if (list.indexOf(grid) > -1) return;
            relati(grid, list);
        });
    }

    function forbidRelati() {
        var relatiList = [];
        board.find("forbid").forEach(function (grid) {
            grid.status = "normal";
        });
        board.find("source").forEach(function (grid) {
            relati(grid, relatiList);
        });
        board.find("valid").forEach(function (grid) {
            if (relatiList.indexOf(grid) < 0) {
                grid.status = "forbid";
            }
        });
    }

    board.viewer.appendIn(container);

    button.addEventListener("click", function () {
        for (var i = 0; i < pages.length; i++) {
            pages[i].style.display = "none";
        }
        header.style.opacity = "1";
        container.style.display = "";
        container.style.animation = "animation: show 0.5s";
        exitButton.style.display = "flex";
        board.viewer.resize(container);
        game.restart();
    });

    whenToStartPage = function () {
        if (user) GameArena.leave();
    };

    window.addEventListener("resize", function () {
        board.viewer.resize(container);
    });

    this.game = game;
    this.board = board;
}

(function (button, container) {
    button.addEventListener("click", function () {
        Message.show("user-confirm", function () {
            for (var i = 0; i < pages.length; i++) {
                pages[i].style.display = "none";
                pages[i].style.animation = "show 0.5s";
            }

            header.style.opacity = "0";
            container.style.display = "";
            exitButton.style.display = "";
            whenToStartPage();
        });
    });
}(
    exitButton,
    document.getElementById("start-page")
));
function gameStart(container, user) {
    var board = new GridBoard(9, 9);

    var game = {
        turn: 0,
        players: 2,
        symbol: "OXDU",
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

            if (grid.is("relati", sym)) {
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

    game.findTerritory = (function () {
        function findSpace(grid, visitedGrid, spaces) {
            var spaceIndex = visitedGrid[grid.crd];

            if (visitedGrid[grid.crd] === undefined) {
                spaceIndex = spaces.length;
                visitedGrid[grid.crd] = spaceIndex;
                spaces.push([grid]);
            }

            grid.query("O").forEach(function (grid) {
                if (!grid) return;
                if (!grid.is("space")) return;
                if (visitedGrid[grid.crd] !== undefined) return;
                visitedGrid[grid.crd] = spaceIndex;
                spaces[spaceIndex].push(grid);
                findSpace(grid, visitedGrid, spaces);
            });
        }

        return function () {
            var visitedGrid = {};
            var spaces = [];

            board.find("space").forEach(function (grid) {
                findSpace(grid, visitedGrid, spaces);
            });

            var spaceOwner = [];

            spaces.forEach(function (grids) {
                var owner = "";
                grids.forEach(function (grid) {
                    grid.query("O").forEach(function (grid) {
                        if (!grid || grid.is("space|forbid")) return;

                        if (owner === "") {
                            owner = grid.symbol;
                        } else if (owner !== grid.symbol) {
                            owner = "public";
                        }
                    });
                });
                spaceOwner.push(owner);
            });
        };
    })();

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

        game.isOnline = true;

        game.online = {
            symbol: ""
        };

        game.online.match = function () {
            Message.show("配對中...");
            GameArena.join("Relati", user.name, user.picUrl).then(function (data) {
                game.online.symbol = data.sym;

                if (data.sym === "O") {
                    pic[0].style.backgroundImage = "url(" + user.picUrl + ")";
                    pic[1].style.backgroundImage = "url(" + data.picUrl + ")";
                } else {
                    pic[0].style.backgroundImage = "url(" + data.picUrl + ")";
                    pic[1].style.backgroundImage = "url(" + user.picUrl + ")";
                }

                Message.show("持" + data.sym, true);
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
                Message.show(game.online.symbol + "贏了", function () {
                    game.restart();
                    game.online.match();
                });
            } else {
                game.online.match();
            }
        });

        game.online.match();
    }

    board.addRelati();

    board.viewer.onselect = function (grid, fromOnline) {
        if (!grid.is("space")) return;
        if (game.isOnline && !game.online.myTurn() && !fromOnline) return;

        var sym = game.nowSymbol();

        grid.board.viewer.backgroundFixed = false;
        grid.board.viewer.removeBackground();

        if (game.turn < game.players) {
            grid.symbol = sym;
            grid.status = "source";
        } else if (grid.is("relati", sym)) {
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

        grid.board.viewer.backgroundFixed = true;

        game.turn++;
        forbidRelati();

        if (game.turn >= game.players) {
            game.findWinner();

            if (game.losers.length === game.players) {
                Message.show("平手", function () {
                    game.restart();
                });
            } else if (game.losers.length === game.players - 1) {
                if (game.losers.indexOf(sym) < 0) {
                    Message.show(sym + "贏了", function () {
                        game.restart();
                    });
                }
            }

            game.findTerritory();
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

    window.addEventListener("resize", function () {
        board.viewer.resize(container);
    });

    container.appendChild(board.viewer.body);
    board.viewer.resize(container);

    document.getElementById("game-restart").addEventListener("click", function () {
        if (user) {
            Message.show("確認認輸", function () {
                game.restart();
            }, true);
        } else {
            game.restart();
        }
    });
}

(function () {
    var startPage = document.getElementById("start-page");
    var rulesPage = document.getElementById("rules-page");
    document.getElementById("game-start").addEventListener("click", function () {
        startPage.style.opacity = "0";
        setTimeout(function () { startPage.style.display = "none"; }, 500);
    });
    document.getElementById("game-rules").addEventListener("click", function () {
        rulesPage.style.display = "block";
    });
    document.getElementById("rules-check").addEventListener("click", function () {
        rulesPage.style.display = "none";
    });
})();
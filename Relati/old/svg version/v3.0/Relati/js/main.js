function gameStart(container, user) {
    var player1Pic = document.getElementById("player1");
    var player2Pic = document.getElementById("player2");
    var drawLine = false;
    var board = new GridBoard(15, 15);
    var symbolColor = {
        "O": "#dc143c",
        "X": "#4169e1",
        "D": "#ffa500",
        "U": "#2e8b57"
    };
    var game = {
        turn: 0,
        players: 2,
        symbols: ["O", "X", "D", "U"],
        nowPlayer: function () {
            return game.symbols[game.turn % game.players];
        },
        nextExist: function (symbol) {
            if (this.turn < game.players) return true;

            var exist = false;

            for (var crd in board.gridOf) {
                var grid = board.gridOf[crd];
                if (grid.symbol !== "") continue;
                grid.next = "";
                if (isRelati(grid, symbol)) {
                    grid.next = symbol;
                    exist = true;
                }
            }

            return exist;
        },
        restart: function () {
            for (var crd in board.gridOf) {
                var grid = board.gridOf[crd];
                grid.symbol = "";
                grid.status = "normal";
            }

            board.removeBackground();
            game.turn = 0;
            game.history = [];
        },
        history: []
    };
    container.appendChild(board.viewer);
    board.viewerResize(container);
    signOXDUA(board);

    var mySym;

    function playerMatch() {
        if (!user) return;
        mySym = "";
        player1Pic.style.backgroundImage = "";
        player2Pic.style.backgroundImage = "";
        GameArena.join("Relati", user.name, user.picUrl).then(function (data) {
            mySym = data.sym;
            if (data.sym === "O") {
                player1Pic.style.backgroundImage = "url(" + user.picUrl + ")";
                player2Pic.style.backgroundImage = "url(" + data.picUrl + ")";
                Message.show("You are O");
            } else {
                player1Pic.style.backgroundImage = "url(" + data.picUrl + ")";
                player2Pic.style.backgroundImage = "url(" + user.picUrl + ")";
                Message.show("You are X");
            }
        });
    }

    if (user) {
        GameArena.whenPlayerSet(function (crd) {
            board.ongridselect(board.gridOf[crd], true);
        });

        GameArena.whenPlayerLeave(function () {
            if (game.turn > 1) {
                Message.show(mySym + " Win", function () {
                    game.restart();
                    playerMatch();
                });
            } else {
                Message.show("Player left", function () {
                    game.restart();
                    playerMatch();
                });
            }
        });

        playerMatch();
    }

    function isRelati(grid, symbol, needList) {
        var list = [];
        var normalRelatiGrids = grid.query("O");

        for (var i = 0; i < normalRelatiGrids.length; i++) {
            var sourceGrid = normalRelatiGrids[i];
            if (!sourceGrid || sourceGrid.status === "forbid") continue;
            if (sourceGrid.symbol === symbol) {
                list.push(sourceGrid);
                if (drawLine) board.addLine(
                    [sourceGrid.crd, grid.crd],
                    symbolColor[symbol]
                );
            }
        }

        var remoteRelatiGrids = grid.query("OO,O");

        for (var i = 0; i < remoteRelatiGrids.length; i += 2) {
            var sourceGrid = remoteRelatiGrids[i];
            if (!sourceGrid || sourceGrid.status === "forbid") continue;
            var spaceGrid = remoteRelatiGrids[i + 1];
            if (sourceGrid.symbol === symbol) {
                if (spaceGrid.symbol === "") {
                    list.push(sourceGrid);
                    if (drawLine) {
                        board.addLine(
                            [sourceGrid.crd, grid.crd],
                            symbolColor[symbol]
                        );
                    }
                }
            }
        }

        var remoteStableRelatiGrids = grid.query("HII,II,I,H,IH,IHH,HH,H,I,IH");

        for (var i = 0; i < remoteStableRelatiGrids.length; i += 5) {
            var sourceGrid = remoteStableRelatiGrids[i];
            if (!sourceGrid || sourceGrid.status === "forbid") continue;
            var spaceGrids = remoteStableRelatiGrids.slice(i + 1, i + 5);
            if (sourceGrid.symbol === symbol) {
                var remoteStableRelati = false;
                if (
                    spaceGrids[0].symbol === "" &&
                    spaceGrids[1].symbol === ""
                ) {
                    remoteStableRelati = true;
                    if (drawLine) {
                        board.addLine(
                            [sourceGrid.crd, spaceGrids[0].crd, spaceGrids[1].crd, grid.crd],
                            symbolColor[symbol]
                        );
                    }
                }

                if (
                    spaceGrids[1].symbol === "" &&
                    spaceGrids[3].symbol === ""
                ) {
                    remoteStableRelati = true;
                    if (drawLine) {
                        board.addLine(
                            [sourceGrid.crd, spaceGrids[3].crd, spaceGrids[1].crd, grid.crd],
                            symbolColor[symbol]
                        );
                    }
                }

                if (
                    spaceGrids[2].symbol === "" &&
                    spaceGrids[3].symbol === ""
                ) {
                    remoteStableRelati = true;
                    if (drawLine) {
                        board.addLine(
                            [sourceGrid.crd, spaceGrids[3].crd, spaceGrids[2].crd, grid.crd],
                            symbolColor[symbol]
                        );
                    }
                }

                if (remoteStableRelati) {
                    list.push(sourceGrid);
                }
            }
        }

        return needList ? list : list.length > 0;
    }

    var forbidRelati = (function () {
        function relati(grid, list) {
            var relatiList = isRelati(grid, grid.symbol, true);

            for (var i = 0; i < relatiList.length; i++) {
                var grid = relatiList[i];

                if (list.indexOf(grid) < 0) {
                    list.push(grid);
                    relati(grid, list);
                }
            }
        }

        return function () {
            var source = {};
            var list = [];

            for (var crd in board.gridOf) {
                var grid = board.gridOf[crd];
                if (grid.status === "source") {
                    source[grid.symbol] = grid;
                } else if (grid.status === "forbid") {
                    grid.status = "normal";
                }
            }

            for (var symbol in source) {
                var grid = source[symbol];
                list.push(grid);
                relati(grid, list);
            }

            for (var crd in board.gridOf) {
                var grid = board.gridOf[crd];
                if (grid.symbol === "") continue;
                if (list.indexOf(grid) < 0) {
                    grid.status = "forbid";
                }
            }
        };
    }());

    board.ongridselect = function (grid, fromOnline) {
        var symbol = game.nowPlayer();
        if (grid.symbol !== "") return;
        if (user && mySym !== symbol && !fromOnline) return;

        board.removeBackground();
        drawLine = true;
        if (game.turn < game.players || isRelati(grid, symbol)) {
            grid.symbol = symbol;
            game.turn++;
            if (user) GameArena.set(grid.crd);

            if (game.turn < game.players + 1) {
                grid.status = "source";
            }

            var beforeGrid = game.history[game.history.length - 1];

            if (beforeGrid) {
                for (var i = 0; i < beforeGrid.views.length; i++) {
                    beforeGrid.views[i].style.animation = "";
                }
            }

            game.history.push(grid);

            drawLine = false;

            forbidRelati();

            if (!game.nextExist(game.nowPlayer())) {
                var nextExistPlayers = [];
                for (var i = 0; i < game.players; i++) {
                    if (game.symbols[i] === game.nowPlayer()) continue;
                    if (game.nextExist(game.symbols[i])) {
                        nextExistPlayers.push(game.symbols[i]);
                    }
                }
                game.turn++;
                if (nextExistPlayers.length === 0) {
                    Message.show("Draw", function () {
                        game.restart();
                        playerMatch();
                    });
                } else if (nextExistPlayers.length === 1) {
                    Message.show(nextExistPlayers[0] + " Win", function () {
                        game.restart();
                        playerMatch();
                    });
                }
                game.nextExist(game.nowPlayer());
            }
        }
    };

    window.addEventListener("resize", function () {
        board.viewerResize(document.body);
    });

    window.board = board;
};
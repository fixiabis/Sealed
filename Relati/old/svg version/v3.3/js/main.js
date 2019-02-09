function gameStart(fbUser) {
    var views = document.getElementsByClassName("view");

    /**
     * 切換頁面
     * @param {string} id 
     */

    function viewSwitchTo(id) {
        for (var i = 0; i < views.length; i++) {
            if (views[i].id === id) {
                views[i].classList.add("active");
            } else {
                views[i].classList.remove("active");
            }
        }
    }

    var startPlayButton = document.getElementById("start-play");
    var startRuleButton = document.getElementById("start-rule");
    var boardExitButton = document.getElementById("board-exit");
    var rulesExitButton = document.getElementById("rules-exit");
    var startTitleView = document.getElementById("start-title");

    var gameBoard = document.getElementById("game-board");
    var ruleBoard = document.getElementById("rule-board");

    var rulesSpeedUpButton = document.getElementById("rules-speed-up");
    var rulesSpeedDownButton = document.getElementById("rules-speed-down");

    var player1Image = document.getElementById("player1");
    var player2Image = document.getElementById("player2");
    var yourImage = document.getElementById("your-image");

    var isHiddenMode = false;

    startTitleView.addEventListener("click", function () {
        isHiddenMode = !isHiddenMode;
        if (isHiddenMode) {
            startTitleView.classList.add("hidden-mode")
        } else {
            startTitleView.classList.remove("hidden-mode")
        }
    })

    if (fbUser) {
        yourImage.style.backgroundImage = "url(" + fbUser.picUrl + ")";
    }

    (function gameViewInit() {
        var board = new RelatiBoard(9, 9);
        var game = (function () {
            var game = {
                turn: 0,
                symbol: "OX",
                loser: "",
                player: 2
            };

            game.nowSymbol = function () {
                return game.symbol[game.turn % game.player];
            };

            game.restart = function () {
                game.turn = 0;
                game.loser = "";
                board.clean();

                if (game.online) {
                    game.online.match();
                }
            };

            game.findNextGrid = function (sym) {
                if (game.turn < game.player) return;

                var exist = false;

                board.find("space").forEach(function (grid) {
                    grid.status = "normal";

                    if (grid.by("relati", sym).length > 0) {
                        grid.status = sym + ".next";
                    } else {
                        if (!isHiddenMode) return;

                        if (grid.by("escape", sym).length > 0) {
                            grid.status = sym + ".exit";
                        } else return;
                    }

                    exist = true;
                });

                board.find("other valid|other forbid", sym).forEach(function (grid) {
                    if (exist || !isHiddenMode) return;
                    if (grid.by("attack").length > 0) exist = true;
                });

                if (!exist) {
                    game.loser += sym;
                    game.turn++;

                    console.log(game.loser);

                    if (game.loser.length === game.player) {
                        MessageBox.show("winner draw").then(function () {
                            game.restart();
                        }).catch(function () { });
                    } else if (game.loser.length === game.player - 1) {
                        MessageBox.show("winner " + game.nowSymbol() + "-win").then(function () {
                            game.restart();
                        }).catch(function () { });
                    } else {
                        game.findNextGrid(game.nowSymbol());
                    }
                }
            };

            if (fbUser) {
                GameArena.link();
                game.online = (function () {
                    var online = {
                        mySym: ""
                    };

                    online.match = function () {
                        game.online.mySym = "";
                        player1Image.style.backgroundImage = "";
                        player2Image.style.backgroundImage = "";
                        MessageBox.show("load");

                        var modeName = "relati" + (isHiddenMode ? "+" : "");

                        GameArena.join(modeName, fbUser.name, fbUser.picUrl).then(function (data) {
                            game.online.mySym = data.sym;
                            if (data.sym === "O") {
                                player1Image.style.backgroundImage = "url(" + fbUser.picUrl + ")";
                                player2Image.style.backgroundImage = "url(" + data.picUrl + ")";
                            } else {
                                player1Image.style.backgroundImage = "url(" + data.picUrl + ")";
                                player2Image.style.backgroundImage = "url(" + fbUser.picUrl + ")";
                            }
                            MessageBox.show("your-sym is-" + data.sym).catch(function () { });
                        });
                    };

                    online.leave = function () {
                        GameArena.leave();
                    };

                    online.set = function (crd, sym) {
                        if (this.mySym !== sym) return;
                        GameArena.set(crd);
                    }

                    GameArena.whenPlayerLeave(function () {
                        if (game.turn === 0) return game.restart();

                        if (!MessageBox.now().match("winner")) {
                            MessageBox.show("winner " + game.online.mySym + "-win").then(function () {
                                game.restart();
                            }).catch(function () { });
                        }
                    });

                    GameArena.whenPlayerSet(function (crd) {
                        board.viewer.onselect(board[crd], true);
                    });

                    return online;
                })();
            }

            return game;
        })();

        board.viewer.onselect = function (grid, fromOnline) {
            var sym = game.nowSymbol();

            if (game.online &&
                game.online.mySym !== sym &&
                !fromOnline) return;

            board.viewer.backgroundFixed = false;
            board.viewer.removeBackground();

            if (board.find("select").length > 0 &&
                !grid.is("select")) return;

            if (grid.is("space")) {
                if (game.turn < game.player) {
                    grid.symbol = sym;
                    grid.status = "source";
                } else if (grid.by("relati", sym).length > 0) {
                    grid.symbol = sym;
                } else {
                    if (!isHiddenMode) return;

                    if (grid.by("escape", sym).length > 0) {
                        board.find("owner valid", sym).forEach(function (grid) {
                            grid.status = "broken";
                        });
                        grid.symbol = sym;
                        grid.status = "source";
                    } else return;
                }
            } else {
                if (!isHiddenMode) return;

                if (grid.is("select")) {
                    grid.status = "broken";

                    board.find("select").forEach(function (grid) {
                        grid.status = "normal";
                    });
                } else if (grid.is("other valid|other forbid", sym)) {
                    var list = grid.by("attack", sym);

                    if (list.length > 0) {
                        grid.status = "broken";

                        board.find("space").forEach(function (grid) {
                            grid.status = "normal";
                        });

                        list.forEach(function (grid) {
                            grid.status = "select";
                        });

                        board.viewer.backgroundFixed = true;

                        if (game.online) game.online.set(grid.crd, sym);

                        return board.forbid();
                    } else return;
                } else return;
            }

            if (game.online) game.online.set(grid.crd, sym);

            board.viewer.backgroundFixed = true;
            game.turn++;
            board.forbid();
            game.findNextGrid(game.nowSymbol());
        };

        board.viewer.appendIn(gameBoard);

        startPlayButton.addEventListener("click", function () {
            viewSwitchTo("board-view");
            game.restart();
        });

        boardExitButton.addEventListener("click", function () {
            MessageBox.show("confirm").then(function () {
                viewSwitchTo("start-view");
                game.online.leave();
            }).catch(function () {
                if (game.online) {
                    if (game.online.mySym) return;
                    MessageBox.show("load");
                }
            });
        });

        window.addEventListener("resize", function () {
            board.viewer.resize(gameBoard);
        });

        window.game = game;
        window.board = board;
    })();

    (function ruleViewInit() {
        var board = new SymtusBoard(5, 5);
        var animate = (function () {
            var animate = {
                progress: 0,
                stop: false,
                timer: 0,
                speed: 1000,
                keyframes: []
            };

            var relati = [
                function () {
                    board.C3.symbol = "O";
                    board.C3.status = "source";
                    board.B2.status = "O.next";
                },
                function () {
                    board.B2.symbol = "O";
                },
                function () {
                    board.viewer.appendGridPath([board.B2, board.C3]);
                },
                function () {
                    board.viewer.removeBackground();
                    board.B2.symbol = "";
                    board.C2.status = "O.next";
                },
                function () {
                    board.C2.symbol = "O";
                },
                function () {
                    board.viewer.appendGridPath([board.C2, board.C3]);
                },
                function () {
                    board.viewer.removeBackground();
                    board.C2.symbol = "";
                    board.C1.status = "O.next";
                },
                function () {
                    board.C1.symbol = "O";
                },
                function () {
                    board.viewer.appendGridPath([board.C1, board.C3]);
                },
                function () {
                    board.viewer.removeBackground();
                    board.C1.symbol = "";
                    board.A1.status = "O.next";
                },
                function () {
                    board.A1.symbol = "O";
                },
                function () {
                    board.viewer.appendGridPath([board.A1, board.C3]);
                },
                function () {
                    board.viewer.removeBackground();
                    board.A1.symbol = "";
                    board.A2.status = "O.next";
                },
                function () {
                    board.A2.symbol = "O";
                },
                function () {
                    board.viewer.appendGridPath([board.A2, board.A3, board.C3]);
                },
                function () {
                    board.viewer.removeBackground();
                    board.viewer.appendGridPath([board.A2, board.B2, board.B3, board.C3]);
                },
                function () {
                    board.viewer.removeBackground();
                    board.viewer.appendGridPath([board.A2, board.C2, board.C3]);
                },
                function () {
                    board.viewer.removeBackground();
                    board.A2.symbol = "";
                    board.B1.status = "O.next";
                },
                function () {
                    board.B1.symbol = "O";
                },
                function () {
                    board.viewer.appendGridPath([board.B1, board.B3, board.C3]);
                },
                function () {
                    board.viewer.removeBackground();
                    board.viewer.appendGridPath([board.B1, board.B2, board.C2, board.C3]);
                },
                function () {
                    board.viewer.removeBackground();
                    board.viewer.appendGridPath([board.B1, board.C1, board.C3]);
                },
                function () {
                    board.viewer.removeBackground();
                    board.B1.symbol = "";
                }
            ]

            var forbid = [
                function () {
                    board.C3.symbol = "O";
                    board.C3.status = "source";
                },
                function () {
                    board.D2.symbol = "X";
                    board.D2.status = "source";
                    board.C1.status = "O.next";
                },
                function () {
                    board.C1.symbol = "O";
                },
                function () {
                    board.viewer.appendGridPath([board.C1, board.C3]);
                    board.C2.status = "X.next";
                },
                function () {
                    board.C2.symbol = "X";
                },
                function () {
                    board.viewer.appendGridPath([board.C2, board.D2]);
                },
                function () {
                    board.viewer.removeBackground();
                    board.viewer.appendGridPath([board.C1, board.C3], "#666");
                },
                function () {
                    board.C1.status = "forbid";
                    board.B2.status = "O.next";
                },
                function () {
                    board.B2.symbol = "O";
                },
                function () {
                    board.viewer.removeBackground();
                    board.viewer.appendGridPath([board.B2, board.C3]);
                },
                function () {
                    board.viewer.appendGridPath([board.B2, board.C1]);
                },
                function () {
                    board.C1.status = "normal";
                },
                function () {
                    board.viewer.removeBackground();
                    board.C4.status = "X.next";
                },
                function () {
                    board.C4.symbol = "X";
                },
                function () {
                    board.viewer.appendGridPath([board.C4, board.D4, board.D2]);
                    board.D3.status = "O.next";
                },
                function () {
                    board.D3.symbol = "O";
                },
                function () {
                    board.viewer.appendGridPath([board.D3, board.C3]);
                },
                function () {
                    board.viewer.removeBackground();
                    board.viewer.appendGridPath([board.C4, board.D4, board.D2], "#666");
                },
                function () {
                    board.C4.status = "forbid";
                    board.E3.status = "X.next";
                },
                function () {
                    board.E3.symbol = "X";
                },
                function () {
                    board.viewer.removeBackground();
                    board.viewer.appendGridPath([board.E3, board.D2]);
                },
                function () {
                    board.viewer.appendGridPath([board.E3, board.E4, board.C4]);
                },
                function () {
                    board.C4.status = "normal";
                    board.D4.status = "O.next";
                },
                function () {
                    board.D4.symbol = "O";
                },
                function () {
                    board.viewer.appendGridPath([board.D4, board.D3]);
                    board.viewer.appendGridPath([board.D4, board.C3]);
                },
                function () {
                    board.viewer.removeBackground();
                    board.viewer.appendGridPath([board.E3, board.E4, board.C4], "#666");
                },
                function () {
                    board.C4.status = "forbid";
                },
                function () {
                    board.viewer.removeBackground();
                    board.D5.status = "X.next";
                },
                function () {
                    board.D5.symbol = "X";
                },
                function () {
                    board.viewer.appendGridPath([board.E3, board.E5, board.D5]);
                },
                function () {
                    board.viewer.appendGridPath([board.D5, board.C4]);
                },
                function () {
                    board.C4.status = "normal";
                    board.E4.status = "O.next";
                },
                function () {
                    board.E4.symbol = "O";
                },
                function () {
                    board.viewer.appendGridPath([board.E4, board.D3]);
                    board.viewer.appendGridPath([board.E4, board.D4]);
                },
                function () {
                    board.viewer.removeBackground();
                    board.viewer.appendGridPath([board.E3, board.E5, board.D5], "#666");
                    board.viewer.appendGridPath([board.D5, board.C4]);
                },
                function () {
                    board.D5.status = "forbid";
                },
                function () {
                    board.viewer.removeBackground();
                    board.viewer.appendGridPath([board.D5, board.C4], "#666");
                },
                function () {
                    board.C4.status = "forbid";
                },
                function () {
                    board.viewer.removeBackground();
                    board.D1.status = "X.next";
                },
                function () {
                    board.D1.symbol = "X";
                },
                function () {
                    board.viewer.appendGridPath([board.D1, board.C2]);
                    board.viewer.appendGridPath([board.D1, board.D2]);
                },
                function () {
                    board.viewer.removeBackground();
                    board.B3.status = "O.next";
                },
                function () {
                    board.B3.symbol = "O";
                },
                function () {
                    board.viewer.appendGridPath([board.B3, board.B2]);
                    board.viewer.appendGridPath([board.B3, board.C3]);
                },
                function () {
                    board.viewer.removeBackground();
                    board.B1.status = "X.next";
                },
                function () {
                    board.B1.symbol = "X";
                },
                function () {
                    board.viewer.appendGridPath([board.B1, board.C2]);
                },
                function () {
                    board.viewer.removeBackground();
                    board.A2.status = "O.next";
                },
                function () {
                    board.A2.symbol = "O";
                },
                function () {
                    board.viewer.appendGridPath([board.A2, board.B2]);
                    board.viewer.appendGridPath([board.A2, board.B3]);
                },
                function () {
                    board.viewer.removeBackground();
                    board.E2.status = "X.next";
                },
                function () {
                    board.E2.symbol = "X";
                },
                function () {
                    board.viewer.appendGridPath([board.E2, board.D1]);
                    board.viewer.appendGridPath([board.E2, board.D2]);
                    board.viewer.appendGridPath([board.E2, board.E3]);
                },
                function () {
                    board.viewer.removeBackground();
                    board.A1.status = "O.next";
                },
                function () {
                    board.A1.symbol = "O";
                },
                function () {
                    board.viewer.appendGridPath([board.A1, board.A2]);
                    board.viewer.appendGridPath([board.A1, board.B2]);
                },
                function () {
                    board.viewer.removeBackground();
                    board.E1.status = "X.next";
                },
                function () {
                    board.E1.symbol = "X";
                },
                function () {
                    board.viewer.appendGridPath([board.E1, board.E2]);
                    board.viewer.appendGridPath([board.E1, board.D1]);
                    board.viewer.appendGridPath([board.E1, board.D2]);
                },
                function () {
                    board.viewer.removeBackground();
                    board.E5.status = "O.next";
                },
                function () {
                    board.E5.symbol = "O";
                },
                function () {
                    board.viewer.appendGridPath([board.E5, board.D4]);
                    board.viewer.appendGridPath([board.E5, board.E4]);
                },
                function () {
                    board.viewer.removeBackground();
                }
            ];

            var attack = [
                function () {
                    board.A1.symbol = "O";
                    board.A1.status = "source";
                },
                function () {
                    board.D4.symbol = "X";
                    board.D4.status = "source";
                },
                function () {
                    board.C2.status = "O.next";
                },
                function () {
                    board.C2.symbol = "O";
                },
                function () {
                    board.viewer.appendGridPath([board.C2, board.C1, board.A1]);
                    board.viewer.appendGridPath([board.C2, board.A2, board.A1]);
                    board.viewer.appendGridPath([board.C2, board.B2, board.B1, board.A1]);
                },
                function () {
                    board.viewer.removeBackground();
                    board.C3.status = "X.next";
                },
                function () {
                    board.C3.symbol = "X";
                },
                function () {
                    board.viewer.appendGridPath([board.C3, board.D4]);
                },
                function () {
                    board.viewer.removeBackground();
                    board.B2.status = "O.next";
                },
                function () {
                    board.B2.symbol = "O";
                },
                function () {
                    board.viewer.appendGridPath([board.B2, board.A1]);
                    board.viewer.appendGridPath([board.B2, board.C2]);
                },
                function () {
                    board.viewer.removeBackground();
                    board.A2.status = "X.next";
                },
                function () {
                    board.A2.symbol = "X";
                },
                function () {
                    board.viewer.appendGridPath([board.A2, board.A3, board.C3]);
                },
                function () {
                    board.viewer.removeBackground();
                    board.A2.status = "select";
                },
                function () {
                    board.viewer.appendGridPath([board.A2, board.B2]);
                },
                function () {
                    board.viewer.appendGridPath([board.B2, board.C2]);
                },
                function () {
                    board.C2.status = "select";
                },
                function () {
                    board.A2.status = "broken";
                    board.C2.status = "broken";
                },
                function () {
                    board.viewer.removeBackground();
                    board.A4.status = "X.next";
                },
                function () {
                    board.A4.symbol = "X";
                },
                function () {
                    board.viewer.appendGridPath([board.A4, board.A3, board.C3]);
                    board.viewer.appendGridPath([board.A4, board.C4, board.C3]);
                    board.viewer.appendGridPath([board.A4, board.B4, board.B3, board.C3]);
                },
                function () {
                    board.viewer.removeBackground();
                    board.A3.status = "O.next";
                },
                function () {
                    board.A3.symbol = "O";
                },
                function () {
                    board.viewer.appendGridPath([board.A3, board.A1]);
                    board.viewer.appendGridPath([board.A3, board.B2]);
                },
                function () {
                    board.viewer.removeBackground();
                    board.A1.status = "select";
                },
                function () {
                    board.viewer.appendGridPath([board.A1, board.A3]);
                },
                function () {
                    board.viewer.appendGridPath([board.A3, board.A4]);
                },
                function () {
                    board.A4.status = "select";
                },
                function () {
                    board.A1.status = "broken";
                    board.A4.status = "broken";
                },
                function () {
                    board.find("owner valid", "O").forEach(function (grid) {
                        grid.status = "forbid";
                    });
                },
                function () {
                    board.viewer.removeBackground();
                }
            ];

            var escape = [
                function () {
                    board.clean();
                },
                function () {
                    board.A1.symbol = "O";
                    board.A1.status = "source";
                },
                function () {
                    board.B2.symbol = "X";
                    board.B2.status = "source";
                },
                function () {
                    board.B3.status = "O.next";
                },
                function () {
                    board.B3.symbol = "O";
                },
                function () {
                    board.viewer.appendGridPath([board.B3, board.A3, board.A1]);
                },
                function () {
                    board.A2.status = "X.next";
                },
                function () {
                    board.A2.symbol = "X";
                },
                function () {
                    board.viewer.appendGridPath([board.A2, board.B2]);
                },
                function () {
                    board.viewer.removeBackground();
                    board.viewer.appendGridPath([board.B3, board.A3, board.A1], "#666");
                },
                function () {
                    board.B3.status = "forbid";
                },
                function () {
                    board.viewer.removeBackground();
                    board.C2.status = "O.next";
                },
                function () {
                    board.C2.symbol = "O";
                },
                function () {
                    board.viewer.appendGridPath([board.C2, board.C1, board.A1]);
                },
                function () {
                    board.viewer.appendGridPath([board.C2, board.B3]);
                },
                function () {
                    board.B3.status = "normal";
                },
                function () {
                    board.C2.status = "select";
                },
                function () {
                    board.viewer.appendGridPath([board.C2, board.B2]);
                },
                function () {
                    board.viewer.appendGridPath([board.B2, board.A2]);
                },
                function () {
                    board.A2.status = "select";
                },
                function () {
                    board.A2.status = "broken";
                    board.C2.status = "broken";
                },
                function () {
                    board.viewer.removeBackground();
                    board.viewer.appendGridPath([board.C2, board.C1, board.A1]);
                    board.viewer.appendGridPath([board.C2, board.B3], "#666");
                },
                function () {
                    board.B3.status = "forbid";
                },
                function () {
                    board.viewer.removeBackground();
                    board.viewer.appendGridPath([board.A1, board.A3, board.B3]);
                },
                function () {
                    board.B3.status = "normal";
                },
                function () {
                    board.A3.status = "X.next";
                },
                function () {
                    board.A3.symbol = "X";
                },
                function () {
                    board.viewer.appendGridPath([board.A3, board.B2]);
                },
                function () {
                    board.viewer.removeBackground();
                    board.viewer.appendGridPath([board.A1, board.A3, board.B3], "#666");
                },
                function () {
                    board.B3.status = "forbid";
                },
                function () {
                    board.viewer.removeBackground();
                    board.B1.status = "O.next";
                },
                function () {
                    board.B1.symbol = "O";
                },
                function () {
                    board.viewer.appendGridPath([board.B1, board.A1]);
                },
                function () {
                    board.viewer.removeBackground();
                    board.A4.status = "X.next";
                },
                function () {
                    board.A4.symbol = "X";
                },
                function () {
                    board.viewer.appendGridPath([board.A4, board.A3]);
                },
                function () {
                    board.viewer.removeBackground();
                    board.E1.status = "O.exit";
                },
                function () {
                    board.E1.symbol = "O";
                    board.E1.status = "source";
                },
                function () {
                    board.viewer.appendGridPath([board.E1, board.A1]);
                },
                function () {
                    board.B1.status = "broken";
                    board.A1.status = "broken";
                },
                function () {
                    board.viewer.removeBackground();
                    board.D2.status = "X.next";
                },
                function () {
                    board.D2.symbol = "X";
                },
                function () {
                    board.viewer.appendGridPath([board.D2, board.B2]);
                    board.E2.status = "O.next";
                },
                function () {
                    board.E2.symbol = "O";
                },
                function () {
                    board.viewer.appendGridPath([board.E2, board.E1]);
                },
                function () {
                    board.viewer.removeBackground();
                    board.D1.status = "X.next";
                },
                function () {
                    board.D1.symbol = "X";
                },
                function () {
                    board.viewer.appendGridPath([board.D1, board.D2]);
                },
                function () {
                    board.viewer.removeBackground();
                    board.B2.status = "select";
                },
                function () {
                    board.viewer.appendGridPath([board.B2, board.D2]);
                },
                function () {
                    board.viewer.appendGridPath([board.D2, board.E2]);
                },
                function () {
                    board.E2.status = "select";
                },
                function () {
                    board.B2.status = "broken";
                    board.E2.status = "broken";
                },
                function () {
                    board.find("owner normal", "X").forEach(function (grid) {
                        grid.status = "forbid";
                    });
                },
                function () {
                    board.viewer.removeBackground();
                }
            ];

            animate.start = function () {
                animate.stop = false;
                animate.timer = setInterval(function () {
                    if (animate.stop) return;
                    if (!animate.keyframes[animate.progress]) {
                        clearInterval(animate.timer);
                        return viewSwitchTo("start-view");
                    }

                    animate.keyframes[animate.progress]();
                    animate.progress++;
                }, animate.speed);
            };

            animate.restart = function () {
                clearInterval(animate.timer);
                animate.start();
            }

            animate.reset = function () {
                clearInterval(animate.timer);
                board.clean();
                animate.progress = 0;
                animate.keyframes = !isHiddenMode
                    ? relati.concat(forbid)
                    : attack.concat(escape);
            };

            return animate;
        })();

        board.viewer.appendIn(ruleBoard);

        startRuleButton.addEventListener("click", function () {
            animate.reset();
            animate.start();
            viewSwitchTo("rules-view");
        });

        rulesExitButton.addEventListener("click", function () {
            animate.stop = true;
            MessageBox.show("confirm").then(function () {
                animate.reset();
                viewSwitchTo("start-view");
            }).catch(function () {
                animate.stop = false;
            });
        });

        rulesSpeedUpButton.addEventListener("click", function () {
            animate.speed /= 2;
            if (animate.speed < 125) animate.speed = 125;
            animate.restart();
        });

        rulesSpeedDownButton.addEventListener("click", function () {
            animate.speed *= 2;
            if (animate.speed > 8000) animate.speed = 8000;
            animate.restart();
        });

        window.addEventListener("resize", function () {
            board.viewer.resize(ruleBoard);
        });
    })();
}
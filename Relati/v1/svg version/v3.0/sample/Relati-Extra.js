(function (container) {
    var game = new GridBoardGame(container, 7);

    window.game = game;

    function isRelati(grid, sym, needList) {
        var list = [];
        var grids = grid.getGridsFromDir("O");

        for (var i = 0; i < grids.length; i++) {
            if (!grids[i]) continue;
            (function (grid) {
                if (grid.symbol === sym && grid.status !== "forbid") {
                    list.push(grid);
                }
            })(grids[i]);
        }

        var spaceGrids = grids;
        var grids = grid.getGridsFromDir("OO");

        for (var i = 0; i < grids.length; i++) {
            if (!grids[i]) continue;
            (function (grid, spaceGrid) {
                if (grid.symbol === sym && grid.status !== "forbid" && !spaceGrid.symbol) {
                    list.push(grid);
                }
            })(grids[i], spaceGrids[i]);
        }

        var spaceGridGroups = {};

        ["I", "H", "II", "HH", "IH"].forEach(function (dir) {
            spaceGridGroups[dir] = grid.getGridsFromDir(dir);
        });

        var grids = grid.getGridsFromDir("IIH");

        for (var i = 0; i < grids.length; i++) {
            if (!grids[i]) continue;
            (function (grid, spaceGrids) {
                if (grid.symbol === sym && grid.status !== "forbid") {
                    if (spaceGrids[0].symbol === "") {
                        if (spaceGrids[2].symbol === "" || spaceGrids[3].symbol === "") {
                            return list.push(grid);
                        }
                    }

                    if (spaceGrids[1].symbol === "" && spaceGrids[3].symbol === "") {
                        return list.push(grid);
                    }
                }
            })(grids[i], [
                spaceGridGroups["I"][Math.floor(i / 2)],
                spaceGridGroups["H"][i % 2],
                spaceGridGroups["II"][Math.floor(i / 2)],
                spaceGridGroups["IH"][i]
            ]);
        }

        var grids = grid.getGridsFromDir("IHH");

        for (var i = 0; i < grids.length; i++) {
            if (!grids[i]) continue;
            (function (grid, spaceGrids) {
                if (grid.symbol === sym && grid.status !== "forbid") {
                    if (spaceGrids[0].symbol === "" && spaceGrids[3].symbol === "") {
                        return list.push(grid);
                    }

                    if (spaceGrids[1].symbol === "") {
                        if (spaceGrids[2].symbol === "" || spaceGrids[3].symbol === "") {
                            return list.push(grid);
                        }
                    }
                }
            })(grids[i], [
                spaceGridGroups["I"][Math.floor(i / 2)],
                spaceGridGroups["H"][i % 2],
                spaceGridGroups["HH"][i % 2],
                spaceGridGroups["IH"][i]
            ]);
        }

        return needList ? list : list.length > 0;
    }

    function forbid() {
        var sources = [];
        var related = [];

        for (var crd in game.board.gridOf) {
            var grid = game.board.gridOf[crd];

            if (!grid.symbol) continue;
            if (grid.status === "source") {
                sources.push(grid);
                continue;
            }

            grid.status = "normal";
            grid.symbolViews.forEach(function (view) {
                view.setAttribute(
                    "stroke",
                    grid.symbol === "O" ? "#dc143c" : "#4169e1"
                );
            });
        }

        sources.forEach(function (grid) {
            related.push(grid);
            relatiGrid(grid, related, "");
        });

        for (var crd in game.board.gridOf) {
            var grid = game.board.gridOf[crd];
            if (!grid.symbolViews) continue;
            if (related.indexOf(grid) > -1) continue;
            grid.status = "forbid";
            grid.symbolViews.forEach(function (view) {
                view.setAttribute("stroke", "#888");
            });
        }
    }

    function relatiGrid(grid, related, str) {
        var relatiList = isRelati(grid, grid.symbol, true);

        for (var i = 0; i < relatiList.length; i++) {
            var grid = relatiList[i];

            if (related.indexOf(grid) < 0) {
                related.push(grid);
                relatiGrid(grid, related, str + "  ");
            }
        }
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

            if (game.turn < 3) {
                grid.status = "source";
                grid.symbolViews.forEach(function (view) {
                    view.setAttribute("stroke-width", 3);
                });
            }

            if (game.turn > 1) {
                forbid();
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
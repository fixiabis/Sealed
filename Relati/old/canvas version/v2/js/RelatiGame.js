const RelatiGame = (function () {
    function gridIs(grid, type, sym) {
        sym = sym || this.symbol[this.turn % this.players];
        var typeIs = type => gridIs(grid, type, sym);

        switch (type) {
            case "space-real":
                return grid.symbol === "";
            case "space-fake":
                return typeIs("broken|owner shield");
            case "space-none":
                return !typeIs("space");
            case "space":
                return typeIs("space-real|space-fake");
            case "valid":
                return !typeIs("forbid|shield|broken");
            case "owner":
                return grid.symbol === sym;
            case "other":
                return !typeIs("owner|space-real");
        }

        if (type.indexOf("|") > -1) {
            var types = type.split("|");

            for (let i = 0; i < types.length; i++) {
                if (typeIs(types[i])) {
                    return true;
                }
            }

            return false;
        } else if (type.indexOf(" ") > -1) {
            var types = type.split(" ");

            for (let i = 0; i < types.length; i++) {
                if (!typeIs(types[i])) {
                    return false;
                }
            }

            return true;
        } else {
            return grid.status === type;
        }
    }

    class RelatiBoard extends GridBoard {
        constructor(players, game) {
            var size = players * 2 + 11;
            super(size, size);
            this.history = [];
            this.query = (function () {
                var allGrids = [];
                this.grids.forEach(
                    gridCol => allGrids = allGrids.concat(gridCol)
                );
                return (type, grids, sym) => (grids || allGrids).filter(
                    grid => grid && grid.is(type, sym)
                );
            }.bind(this))();

            for (var crd in this.gridOf) {
                let grid = this.gridOf[crd];
                grid.status = "normal";
                grid.symbol = "";
                grid.is = (type, sym) => gridIs.bind(game)(grid, type, sym);
            }
        }

        viewerIn(container) {
            container.appendChild(this.viewer);

            var viewerResize = function () {
                var viewerSize = Math.min(
                    container.clientWidth,
                    container.clientHeight
                );
                this.viewerResize(viewerSize, viewerSize);
            }.bind(this);

            window.addEventListener("resize", viewerResize);
            viewerResize();
        }
    }

    class RelatiGame {
        constructor(players, container) {
            this.turn = 0;
            this.symbol = "OXDURA";
            this.board = new RelatiBoard(players, this);
            this.players = players;
            this.actions = [];
            this.rules = [];
            this.board.viewerIn(container);

            var nextPlayerExist = function nextPlayerExist() {
                var { board, actions } = this;

                for (var i = 0; i < actions.length; i++) {
                    var { condition } = actions[i];
                    var markableGrid = board.query("space-real").map(
                        grid => condition(grid)
                    );

                    if (markableGrid.indexOf(true) > -1) {
                        return true;
                    }
                }

                return false;
            }.bind(this);

            this.board.ongridselect = function (grid) {
                var { board, actions } = this;

                for (var i = 0; i < actions.length; i++) {
                    var { condition, configure } = actions[i];

                    if (condition(grid)) {
                        configure(grid);
                        this.rules.forEach(rule => rule(grid));
                        board.history.push(grid.crd);
                        board.viewerRefresh();
                        var skip = 0;

                        while (!nextPlayerExist()) {
                            skip++;
                            this.turn++;

                            if (skip === this.players) break;
                        }

                        break;
                    }
                }
            }.bind(this);
        }
    }

    return RelatiGame;
})();
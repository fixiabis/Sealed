namespace Relati {
    export class RelatiView {
        public view: { [name: string]: SVGElement } = {};

        constructor(public game: RelatiGame, public container: HTMLElement, public gridSize: number) {
            var { board } = game;
            var { width, height } = board;

            var boardView = createSVG("svg");
            boardView.setAttribute("width", `${width * gridSize}`);
            boardView.setAttribute("height", `${height * gridSize}`);

            var background = createSVG("g");
            boardView.appendChild(background);

            var lineAttr = {
                "d": "",
                "stroke": "#888",
                "stroke-width": "0.4"
            };

            for (var x = 1; x < width; x++) {
                lineAttr.d = `M ${x * gridSize} 0 V ${height * gridSize}`;
                var gridLine = createSVG("path", lineAttr);
                boardView.appendChild(gridLine);
            }

            for (var y = 1; y < height; y++) {
                lineAttr.d = `M 0 ${y * gridSize} H ${width * gridSize}`;
                var gridLine = createSVG("path", lineAttr);
                boardView.appendChild(gridLine);
            }

            boardView.style.transform = `scale(${Math.min(
                container.clientWidth / (board.width * 5),
                container.clientHeight / (board.height * 5)
            ) * 0.95})`;

            window.addEventListener("resize", function () {
                boardView.style.transform = `scale(${Math.min(
                    container.clientWidth / (width * 5),
                    container.clientHeight / (height * 5)
                ) * 0.95})`;
            });

            container.appendChild(boardView);

            for (var grid of board.gridList) {
                var gridView = createSVG("g");
                this.view[grid.coordinate] = gridView;
                boardView.appendChild(gridView);
            }

            this.view.board = boardView;
            this.view.background = background;

            this.view.board.addEventListener("click", function (this: RelatiView, event: MouseEvent) {
                var x: number = Math.floor(event.offsetX / 5),
                    y: number = Math.floor(event.offsetY / 5),
                    grid = board.grids[x] && board.grids[x][y];
                this.game.selectGrid(grid);
                this.updateBoardView();
                this.relatiNextStepHint();
                this.relatiMaintainEffect();
            }.bind(this));
        }

        updateBoardView() {
            for (var grid of this.game.board.gridList) {
                var gridView = this.view[grid.coordinate];

                while (gridView.childNodes.length > 0) {
                    gridView.removeChild(gridView.childNodes[0]);
                }

                updateGridBadge(grid, gridView);
            }
        }

        relatiNextStepHint() {
            var { game } = this;
            var owner = game.getNowPlayer();
            var color = owner.badge == "O" ? "crimson" : "royalblue";

            for (var grid of game.board.gridList) {
                var gridView = this.view[grid.coordinate];

                if (RelatiRules.RelatiBySource.allow({ game, grid, owner })) {
                    createGridHint(grid, gridView, color);
                }
            }
        }

        relatiMaintainEffect() {
            var { game, view } = this;
            var owner = game.players[(game.turn - 1) % game.players.length];
            var color = owner.badge == "O" ? "crimson" : "royalblue";

            while (view.background.childNodes.length) {
                view.background.removeChild(
                    view.background.childNodes[0]
                );
            }

            gridVisited = [];

            for (var grid of game.board.gridList) {
                if (!grid.role || grid.role.owner != owner) continue;

                if (grid.role.status["relati-launcher"]) {
                    createMaintainPath(grid, view, owner, game.turn, color);
                }
            }
        }
    }

    function updateGridBadge(grid: RelatiGrid, gridView: SVGElement) {
        if (!grid.role) return;

        var srtX = grid.x * 5 + 1;
        var srtY = grid.y * 5 + 1;
        var endX = grid.x * 5 + 4;
        var endY = grid.y * 5 + 4;

        var badgeAttr = {
            "d": "",
            "stroke-width": "0.6",
            "stroke": "",
            "fill": "none"
        };

        switch (grid.role.owner.badge) {
            case "O":
                badgeAttr["d"] = `
                    M ${srtX + 1.5} ${srtY + 1.5}
                    m 0 -1.5
                    a 1.5 1.5 0 0 1, 0 3
                    a 1.5 1.5 0 0 1, 0 -3
                `;
                badgeAttr["stroke"] = "crimson";
                break;
            case "X":
                badgeAttr["d"] = `
                    M ${srtX} ${srtY} L ${endX} ${endY}
                    M ${endX} ${srtY} L ${srtX} ${endY}
                `;
                badgeAttr["stroke"] = "royalblue";
                break;
        }


        if (grid.role.is("relati-launcher")) {
            badgeAttr["stroke-width"] = "1";
            gridView.appendChild(createSVG("path", badgeAttr));
            badgeAttr.stroke = "#f2f2f2";
            badgeAttr["stroke-width"] = "0.5";
            gridView.appendChild(createSVG("path", badgeAttr));
        } else if (grid.role.is("relati-repeater")) {
            gridView.appendChild(createSVG("path", badgeAttr));
        } else {
            badgeAttr.stroke = "#666";
            gridView.appendChild(createSVG("path", badgeAttr));
        }
    }

    function createGridHint(grid: RelatiGrid, gridView: SVGElement, color: string) {
        if (grid.role) return;

        var srtX = grid.x * 5 + 1;
        var srtY = grid.y * 5 + 1;
        var endX = grid.x * 5 + 4;
        var endY = grid.y * 5 + 4;

        var hintAttr = {
            "d": `
                M ${srtX + 1.5} ${srtY + 1.5}
                m 0 -0.4
                a 0.4 0.4 0 0 1, 0 0.8
                a 0.4 0.4 0 0 1, 0 -0.8
            `,
            "stroke": "none",
            "fill": color
        };

        gridView.appendChild(createSVG("path", hintAttr));
    }

    var gridVisited: RelatiGrid[] = [];
    var gameTurn = 0;

    function createMaintainPath(
        grid: RelatiGrid,
        view: RelatiView["view"],
        owner: RelatiPlayer,
        turn: number,
        color: string,
        sourceGrid?: RelatiGrid
    ) {
        if (gridVisited.indexOf(grid) > -1 || turn < gameTurn) return;
        gridVisited.push(grid);
        gameTurn = turn;

        var ruleTraces = RelatiRules.RelatiToTarget.trace({ owner, grid });

        for (let trace of ruleTraces) {
            if (trace.target == sourceGrid) continue;
            createRelatiPath(grid, trace, view, color);

            setTimeout(() => {
                createMaintainPath(trace.target, view, owner, turn, color, grid)
            }, 250);
        }
    }

    function createRelatiPath(
        sourceGrid: RelatiGrid,
        trace: RelatiRuleTrace,
        view: RelatiView["view"],
        color: string
    ) {
        var targetGrid = trace.target;

        var pathAttr = {
            "d": `M ${sourceGrid.x * 5 + 2.5} ${sourceGrid.y * 5 + 2.5}`,
            "stroke-width": "0.5",
            "stroke": color,
            "fill": "none",
            "class": "relati-path"
        };

        for (var grid of trace.routes) {
            pathAttr["d"] += ` L ${grid.x * 5 + 2.5} ${grid.y * 5 + 2.5}`;
        }

        pathAttr["d"] += ` L ${targetGrid.x * 5 + 2.5} ${targetGrid.y * 5 + 2.5}`;

        var path = createSVG("path", pathAttr);
        path.style.opacity = "0.3";

        view.background.appendChild(path);
    }
}
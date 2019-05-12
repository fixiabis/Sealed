(function (global) {
    interface GridBoard {
        width: number;
        height: number;
        viewer: GridBoardViewer;
        grids: Grid[][];
        gridOf: object;
    }

    interface SymtusBoard extends GridBoard { }

    interface Grid {
        x: number;
        y: number;
        crd: string;
        board: GridBoard;
        views: SVGElement[];
        is: Function;
        by: Function;
        prop: {
            status: string;
            symbol: string;
        };
        symbol: string;
        status: string;
    }

    interface GridBoardViewer {
        width: number;
        height: number;
        board: GridBoard;
        body: SVGElement;
        background: SVGElement;
        create: Function;
        appendGridPath: Function;
        removeBackground: Function;
    }

    var SymtusBoard = this.SymtusBoard;

    /**
     * @memberof Grid
     * 棋盤格取得符合指定規則的清單
     * @param type 規則名稱
     * @param sym  持有方
     */

    function gridBy(type: string, sym: string) {
        var list = [];
        var viewer = this.board.viewer;

        switch (type) {
            case "relati-normal":
                var grids = this.query("O");

                for (var i = 0; i < grids.length; i++) {
                    var sourceGrid = grids[i];
                    if (!sourceGrid) continue;

                    if (sourceGrid.is("owner valid", sym)) {
                        viewer.appendGridPath([sourceGrid, this]);
                        list.push(sourceGrid);
                    }
                }

                return list;

            case "relati-remote-normal":
                var grids = this.query("2O,O");

                for (var i = 0; i < grids.length; i += 2) {
                    var sourceGrid = grids[i];
                    if (!sourceGrid) continue;
                    var spaceGrid = grids[i + 1];

                    if (sourceGrid.is("owner valid", sym)) {
                        if (spaceGrid.is("space", sym)) {
                            viewer.appendGridPath([sourceGrid, this]);
                            list.push(sourceGrid);
                        }
                    }
                }

                return list;

            case "relati-remote-stable":
                var grids = this.query("IIH,II,I,H,IH,IHH,HH,H,I,IH");

                for (var i = 0; i < grids.length; i += 5) {
                    var sourceGrid = grids[i];
                    if (!sourceGrid) continue;
                    var spaceGrids = grids.slice(i + 1, i + 5);

                    if (sourceGrid.is("owner valid", sym)) {
                        var relatiable = false;
                        if (spaceGrids[0].is("space", sym) && spaceGrids[1].is("space", sym)) {
                            viewer.appendGridPath([
                                sourceGrid,
                                spaceGrids[0],
                                spaceGrids[1],
                                this
                            ]);
                            relatiable = true;
                        }
                        if (spaceGrids[1].is("space", sym) && spaceGrids[3].is("space", sym)) {
                            viewer.appendGridPath([
                                sourceGrid,
                                spaceGrids[3],
                                spaceGrids[1],
                                this
                            ]);
                            relatiable = true;
                        }
                        if (spaceGrids[2].is("space", sym) && spaceGrids[3].is("space", sym)) {
                            viewer.appendGridPath([
                                sourceGrid,
                                spaceGrids[3],
                                spaceGrids[2],
                                this
                            ]);
                            relatiable = true;
                        }
                        if (relatiable) {
                            list.push(sourceGrid);
                        }
                    }
                }

                return list;

            case "relati-remote":
                return [
                    ...this.by("relati-remote-normal", sym),
                    ...this.by("relati-remote-stable", sym)
                ];

            case "relati":
                return [
                    ...this.by("relati-normal", sym),
                    ...this.by("relati-remote", sym)
                ];
        }
    }

    /**
     * 擴充棋盤格
     * @param grid 棋盤格
     */

    function gridPatch(grid: Grid) {
        grid.by = gridBy;
    }

    /**
     * 將有連結的棋盤格加入至清單並向下查詢
     * @memberof RelatiBoard.forbid
     */

    function relati(grid: Grid, list: Grid[]) {
        var grids = grid.by("relati", grid.symbol);
        list.push(grid);
        grids.forEach(function (grid) {
            if (list.indexOf(grid) > -1) return;
            relati(grid, list);
        });
    }

    class RelatiBoard extends SymtusBoard {

        /**
         * @constructor
         * @param width 寬度
         * @param height 長度
         */

        constructor(width: number, height: number) {
            super(width, height);

            for (var crd in this.gridOf) {
                var grid = this[crd];
                gridPatch(grid);
            }
        }

        /**
         * 將受阻的符號無效化
         */

        forbid() {
            var list: Grid[] = [];
            this.find("forbid").forEach(function (grid: Grid) {
                grid.status = "normal";
            });
            this.find("source").forEach(function (grid: Grid) {
                relati(grid, list);
            });
            this.find("valid").forEach(function (grid: Grid) {
                if (list.indexOf(grid) < 0) {
                    grid.status = "forbid";
                }
            });
        }
    }

    global.RelatiBoard = RelatiBoard;
}(this));
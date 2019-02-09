namespace lib {
    export interface RelatiBoard extends SymtusBoard {
        grids: RelatiGrid[][];
        gridOf: {
            [crd: string]: RelatiGrid
        };
        find(type: string, sym?: string): RelatiGrid[];
        forbid(): void;
    }

    export interface RelatiGrid extends SymtusGrid {
        board: RelatiBoard;
        by: {
            (type: string, sym?: string): RelatiGrid[];
            [type: string]: { (sym?: string): RelatiGrid[] };
        };
    }

    /**
     * @memberof RelatiGrid
     * 棋盤格取得符合指定規則的清單
     * @param type 規則名稱
     * @param sym  持有方
     */

    function gridBy(this: RelatiGrid, type: string, sym?: string): RelatiGrid[] {
        var list: RelatiGrid[] = [];
        var viewer: SymtusBoardViewer = this.board.viewer;

        switch (type) {
            case "relati-normal":
                var grids: RelatiGrid[] = <RelatiGrid[]>this.query("O");

                for (var i = 0; i < grids.length; i++) {
                    var sourceGrid: RelatiGrid = grids[i];
                    if (!sourceGrid) continue;

                    if (sourceGrid.is("owner", sym) && sourceGrid.status !== "forbid") {
                        viewer.appendGridPath([sourceGrid, this]);
                        list.push(sourceGrid);
                    }
                }

                return list;

            case "relati-remote-normal":
                var grids: RelatiGrid[] = <RelatiGrid[]>this.query("2O,O");

                for (var i = 0; i < grids.length; i += 2) {
                    var sourceGrid: RelatiGrid = grids[i];
                    if (!sourceGrid) continue;
                    var spaceGrid: RelatiGrid = grids[i + 1];

                    if (sourceGrid.is("owner", sym) && sourceGrid.status !== "forbid") {
                        if (spaceGrid.is("space") || spaceGrid.status === "broken") {
                            viewer.appendGridPath([sourceGrid, this]);
                            list.push(sourceGrid);
                        }
                    }
                }

                return list;

            case "relati-remote-stable":
                var grids: RelatiGrid[] = <RelatiGrid[]>this.query("IIH,II,I,H,IH,IHH,HH,H,I,IH");

                for (var i = 0; i < grids.length; i += 5) {
                    var sourceGrid: RelatiGrid = grids[i];
                    if (!sourceGrid) continue;
                    var spaceGrids: RelatiGrid[] = grids.slice(i + 1, i + 5);

                    if (sourceGrid.symbol === sym && sourceGrid.status !== "forbid") {
                        var relatiable: boolean = false;
                        if ((spaceGrids[0].is("space") || spaceGrids[0].status === "broken") &&
                            (spaceGrids[1].is("space") || spaceGrids[1].status === "broken")) {
                            viewer.appendGridPath([
                                sourceGrid,
                                spaceGrids[0],
                                spaceGrids[1],
                                this
                            ]);
                            relatiable = true;
                        }
                        if ((spaceGrids[1].is("space") || spaceGrids[1].status === "broken") &&
                            (spaceGrids[3].is("space") || spaceGrids[3].status === "broken")) {
                            viewer.appendGridPath([
                                sourceGrid,
                                spaceGrids[3],
                                spaceGrids[1],
                                this
                            ]);
                            relatiable = true;
                        }
                        if ((spaceGrids[2].is("space") || spaceGrids[2].status === "broken") &&
                            (spaceGrids[3].is("space") || spaceGrids[3].status === "broken")) {
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

            case "attack":
                var maxSize: number = Math.max(this.board.width, this.board.height);

                ["F", "B", "R", "L"].forEach(function (this: RelatiGrid, dir: string) {
                    var d: string = dir;
                    var triggerExist: boolean = false;
                    var bulletExist: boolean = false;
                    var triggerBlock: boolean = false;

                    for (var i = 2; i < maxSize; i++) {
                        dir += `,${i + d}`;
                    }

                    var grids: RelatiGrid[] = <RelatiGrid[]>this.query(dir);

                    grids.forEach(function (grid: RelatiGrid) {
                        if (!grid || grid.is("space|broken") ||
                            bulletExist || triggerBlock) return;

                        if (!triggerExist) {
                            triggerExist = true;
                        } else if (grid.is("owner normal", sym) && triggerExist) {
                            bulletExist = true;
                            list.push(grid);
                        } else {
                            bulletExist = true;
                        }
                    });
                }.bind(this));

                return list;

            case "escape":
                var maxSize: number = Math.max(this.board.width, this.board.height);

                ["F", "B", "R", "L", "FR", "FL", "BR", "BL"].forEach(function (this: RelatiGrid, dir: string) {
                    var d: string = dir;
                    var escapeBlock: boolean = false;
                    var escapeExist: boolean = false;

                    for (var i = 2; i < maxSize; i++) {
                        dir += `,${i + d}`;
                    }

                    var grids: RelatiGrid[] = <RelatiGrid[]>this.query(dir);

                    grids.forEach(function (grid: RelatiGrid) {
                        if (!grid || grid.is("space|broken") ||
                            escapeBlock || escapeExist) return;

                        if (grid.is("owner source", sym)) {
                            escapeExist = true;
                            list.push(grid);
                        } else if (grid.is("other", sym) && !escapeExist) {
                            escapeBlock = true;
                        }
                    });
                }.bind(this));

                return list;

            default:
                if (this.by[type]) return this.by[type].bind(this)(sym);
        }

        return list;
    }

    /**
     * 棋盤格擴充
     * @param grid 棋盤格
     */

    function gridPatch(grid: RelatiGrid) {
        grid.by = <RelatiGrid["by"]>gridBy;
    }

    /**
     * 將有連結的棋盤格加入至清單並向下查詢
     * @memberof RelatiBoard.forbid
     */

    function relati(grid: RelatiGrid, list: RelatiGrid[]) {
        var grids: RelatiGrid[] = grid.by("relati", grid.symbol);
        list.push(grid);
        grids.forEach(function (grid: RelatiGrid) {
            if (list.indexOf(grid) > -1) return;
            relati(grid, list);
        });
    }

    export class RelatiBoard extends SymtusBoard implements RelatiBoard {

        /**
         * @constructor
         * @param width 寬度
         * @param height 長度
         */

        constructor(width: number, height: number) {
            super(width, height);

            for (var crd in this.gridOf) {
                var grid: RelatiGrid = this[crd];
                gridPatch(grid);
            }
        }

        /**
         * 將受阻的符號無效化
         */

        forbid() {
            var list: RelatiGrid[] = [];
            this.find("forbid").forEach(function (grid: RelatiGrid) {
                grid.status = "normal";
            });
            this.find("source").forEach(function (grid: RelatiGrid) {
                relati(grid, list);
            });
            this.find("valid").forEach(function (grid: RelatiGrid) {
                if (list.indexOf(grid) < 0) {
                    grid.status = "forbid";
                }
            });
        }
    }
}
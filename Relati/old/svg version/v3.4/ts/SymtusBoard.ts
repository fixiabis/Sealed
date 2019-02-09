namespace lib {
    export interface SymtusBoard extends GridBoard {
        viewer: SymtusBoardViewer;
        grids: SymtusGrid[][];
        gridOf: {
            [crd: string]: SymtusGrid
        };
        find(type: string, sym?: string): SymtusGrid[];
        clean(): void;
    }

    export interface SymtusGrid extends Grid {
        board: SymtusBoard;
        views: SVGElement[];
        prop: {
            symbol: string,
            status: string,
            [type: string]: string;
        };
        is: {
            (type: string, sym?: string): boolean;
            [type: string]: { (sym?: string): boolean };
        }
        symbol: string;
        status: string;
    }

    export interface SymtusBoardViewer extends GridBoardViewer {
        backgroundFixed: boolean;
        onselect?(grid: SymtusGrid): void;
        appendGridPath(grids: Grid[], color?: string): void;
        removeBackground(): void;
    }

    var colors: { [sym: string]: string } = {
        "O": "#dc143c",
        "X": "#4169e1"
    };

    var viewOperate: { [type: string]: { [value: string]: Function } } = {
        symbol: {
            "": function (grid: SymtusGrid) {
                removeView(grid);
            },
            "O": function (grid: SymtusGrid) {
                removeView(grid);
                grid.views = [
                    grid.board.viewer.create("circle", {
                        "stroke-width": "0.6",
                        "cx": `${grid.x * 5 + 2.5}`,
                        "cy": `${grid.y * 5 + 2.5}`,
                        "r": "1.5",
                        "stroke": colors.O,
                        "fill": "none"
                    })
                ];
                appendView(grid);
                grid.prop.status = "normal";
            },
            "X": function (grid: SymtusGrid) {
                removeView(grid);
                var srtX = grid.x * 5 + 1;
                var srtY = grid.y * 5 + 1;
                var endX = grid.x * 5 + 4;
                var endY = grid.y * 5 + 4;
                grid.views = [
                    grid.board.viewer.create("path", {
                        "stroke-width": "0.6",
                        "stroke": colors.X,
                        "d": `M ${srtX} ${srtY} L ${endX} ${endY}`,
                        "fill": "none"
                    }),
                    grid.board.viewer.create("path", {
                        "stroke-width": "0.6",
                        "stroke": colors.X,
                        "d": `M ${srtX} ${endY} L ${endX} ${srtY}`,
                        "fill": "none"
                    })
                ];
                appendView(grid);
                grid.prop.status = "normal";
            }
        },
        status: {
            "normal": function (grid: SymtusGrid) {
                grid.symbol = grid.symbol;
            },
            "source": function (grid: SymtusGrid) {
                updateView(grid, { "stroke-width": "1.2" });
                var views = grid.views;
                removeView(grid);
                grid.symbol = grid.symbol;
                updateView(grid, { "stroke": "#f2f2f2" });
                views = views.concat(grid.views);
                removeView(grid);
                grid.views = views;
                appendView(grid);
            },
            "forbid": function (grid: SymtusGrid) {
                grid.symbol = grid.symbol;
                updateView(grid, { "stroke": "#666" });
            },
            "broken": function (grid: SymtusGrid) {
                grid.symbol = grid.symbol;
                updateView(grid, { "stroke": "#bbb" });
            },
            "select": function (grid: SymtusGrid) {
                var srtX: number = grid.x * 5 + 0.5;
                var srtY: number = grid.y * 5 + 0.5;
                var endX: number = grid.x * 5 + 4.5;
                var endY: number = grid.y * 5 + 4.5;
                var views: SVGElement[] = grid.views;
                removeView(grid);
                grid.views = views.concat([
                    grid.board.viewer.create("path", {
                        "stroke-width": "0.4",
                        "d": `M ${srtX} ${srtY + 1} V ${srtY} H ${srtX + 1}`,
                        "stroke": colors[grid.symbol],
                        "fill": "none"
                    }),
                    grid.board.viewer.create("path", {
                        "stroke-width": "0.4",
                        "d": `M ${endX} ${srtY + 1} V ${srtY} H ${endX - 1}`,
                        "stroke": colors[grid.symbol],
                        "fill": "none"
                    }),
                    grid.board.viewer.create("path", {
                        "stroke-width": "0.4",
                        "d": `M ${srtX + 1} ${endY} H ${srtX} V ${endY - 1}`,
                        "stroke": colors[grid.symbol],
                        "fill": "none"
                    }),
                    grid.board.viewer.create("path", {
                        "stroke-width": "0.4",
                        "d": `M ${endX - 1} ${endY} H ${endX} V ${endY - 1}`,
                        "stroke": colors[grid.symbol],
                        "fill": "none"
                    })
                ]);
                appendView(grid);
            }
        }
    };

    ["O", "X"].forEach(function (sym: string) {
        viewOperate.status[`${sym}.next`] = function (grid: SymtusGrid) {
            return createDot(grid, sym, 0.4);
        }
    });

    ["O", "X"].forEach(function (sym: string) {
        viewOperate.status[`${sym}.exit`] = function (grid: SymtusGrid) {
            createDot(grid, sym, 0.2);
        }
    });

    /**
     * 將棋盤格中的SVG物件增加到SVG畫布中
     * @param grid 棋盤格
     */

    function appendView(grid: SymtusGrid) {
        grid.views.forEach(function (view: SVGElement) {
            grid.board.viewer.body.appendChild(view);
        });
    }

    /**
     * 將棋盤格中的SVG物件從SVG畫布中移除
     * @param grid 棋盤格
     */

    function removeView(grid: SymtusGrid) {
        grid.views.forEach(function (view: SVGElement) {
            grid.board.viewer.body.removeChild(view);
        });
        grid.views = [];
    }

    /**
     * 將棋盤格中的SVG物件屬性重新設定
     * @param grid 棋盤格
     * @param property 屬性與值
     */

    function updateView(grid: SymtusGrid, property: { [name: string]: string }) {
        grid.views.forEach(function (view: SVGElement) {
            for (var name in property) {
                var value = property[name];
                view.setAttribute(name, value);
            }
        });
    }

    /**
     * 建立圓點於SVG
     * @param grid 棋盤格
     * @param sym  所屬顏色
     * @param size 圓點大小
     */

    function createDot(grid: SymtusGrid, sym: string, size: number) {
        removeView(grid);
        grid.views = [
            grid.board.viewer.create("circle", {
                "cx": `${grid.x * 5 + 2.5}`,
                "cy": `${grid.y * 5 + 2.5}`,
                "r": `${size}`,
                "fill": colors[sym]
            })
        ];
        appendView(grid);
    }


    /**
     * @memberof SymtusGrid
     * 判斷該格狀態
     * @param type 類型
     * @param sym  符號
     */

    function gridIs(this: SymtusGrid, type: string, sym?: string) {
        switch (type) {
            case "space": return this.symbol === "";
            case "owner": return this.symbol === sym;
            case "other": return !this.is("owner|space", sym);
            case "valid": return this.is("source|normal", sym) && !this.is("space", sym);
            default:
                if (this.is[type]) return this.is[type].bind(this)(sym);

                if (type.indexOf("|") > -1) {
                    var types = type.split(/\|/g);
                    return types.map(
                        type => this.is(type, sym)
                    ).indexOf(true) > -1;
                }

                if (type.indexOf("&") > -1 || type.indexOf(" ") > -1) {
                    var types = type.split(/&| /g);
                    return types.map(
                        type => this.is(type, sym)
                    ).indexOf(false) < 0;
                }

                return this.status === type;
        }
    }

    /**
     * 棋盤格擴充
     * @param grid 棋盤格
     */

    function gridPatch(grid: SymtusGrid) {
        grid.is = <SymtusGrid["is"]>gridIs;
        grid.prop = {
            symbol: "",
            status: "normal"
        };
        grid.views = [];

        ["symbol", "status"].forEach(function (name: string) {
            Object.defineProperty(grid, name, {
                get: function (this: SymtusGrid) { return this.prop[name]; },
                set: function (this: SymtusGrid, value) {
                    if (!viewOperate[name][value]) return;
                    viewOperate[name][value](this);
                    this.prop[name] = value;
                }
            });
        });
    }

    /**
     * 棋盤顯示擴充
     * @param viewer 棋盤顯示
     */

    function viewerPatch(viewer: SymtusBoardViewer) {
        viewer.appendGridPath = appendGridPath;
        viewer.removeBackground = removeBackground;
    }

    /**
     * @memberof GridBoardViewer
     * 畫線在棋盤格線下
     * @param grids 棋盤格
     */

    function appendGridPath(this: SymtusBoardViewer, grids: SymtusGrid[], color?: string) {
        if (this.backgroundFixed) return;

        var root: SymtusGrid = grids[0];
        var path: string = `M ${root.x * 5 + 2.5} ${root.y * 5 + 2.5} `;

        for (var i = 1; i < grids.length; i++) {
            var grid: Grid = grids[i];
            path += `L ${grid.x * 5 + 2.5} ${grid.y * 5 + 2.5} `;
        }

        var line: SVGElement = this.create("path", {
            "stroke-width": "0.4",
            "stroke": color || colors[root.symbol],
            "d": path,
            "fill": "none"
        });
        line.style.opacity = "0.2";
        this.background.appendChild(line);
    };

    /**
     * @memberof GridBoardViewer
     * 移除棋盤格線下的SVG所有元素
     */

    function removeBackground(this: SymtusBoardViewer) {
        if (this.backgroundFixed) return;

        var childNodes = this.background.childNodes;

        while (childNodes.length > 0) {
            this.background.removeChild(childNodes[0]);
        }
    };

    export class SymtusBoard extends GridBoard implements SymtusBoard {

        /**
         * @constructor
         * @param width 寬度
         * @param height 高度
         */

        constructor(width: number, height: number) {
            super(width, height);

            for (var crd in this.gridOf) {
                var grid = this[crd];
                gridPatch(grid);
            }

            viewerPatch(this.viewer);
        }

        /**
         * 尋找符合狀態的棋盤格
         * @param type 狀態
         * @param sym 持有符號
         */

        find(type: string, sym?: string): Grid[] {
            var result = [];

            for (var crd in this.gridOf) {
                var grid = this[crd];
                if (grid.is(type, sym)) {
                    result.push(grid);
                }
            }

            return result;
        }

        /**
         * 重設棋盤內部所有棋盤格的狀態
         */

        clean() {
            for (var crd in this.gridOf) {
                var grid = this[crd];
                grid.symbol = "";
                grid.status = "normal";
            }

            this.viewer.backgroundFixed = false;
            this.viewer.removeBackground();
        }
    }
}
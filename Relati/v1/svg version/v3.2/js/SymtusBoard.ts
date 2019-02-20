(function (global) {
    interface GridBoard {
        width: number;
        height: number;
        viewer: GridBoardViewer;
        grids: Grid[][];
        gridOf: object;
    }

    interface Grid {
        x: number;
        y: number;
        crd: string;
        board: GridBoard;
        views: SVGElement[];
        is: Function;
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
        backgroundFixed: boolean;
    }

    var GridBoard = global.GridBoard;

    var colors = {
        "O": "#dc143c",
        "X": "#4169e1"
    };

    var viewOperate = {
        symbol: {
            "": function (grid: Grid) {
                removeView(grid);
            },
            "O": function (grid: Grid) {
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
            "X": function (grid: Grid) {
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
            "normal": function (grid: Grid) {
                grid.symbol = grid.symbol;
            },
            "source": function (grid: Grid) {
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
            "forbid": function (grid: Grid) {
                updateView(grid, { "stroke": "#666" });
            },
            "broken": function (grid: Grid) {
                updateView(grid, { "stroke": "#bbb" });
            }
        }
    };

    ["O", "X"].forEach(function (sym) {
        viewOperate.status[`${sym}.next`] = grid => createDot(grid, sym, "0.4");
    });

    /**
     * 將棋盤格中的SVG物件增加到SVG畫布中
     * @param grid 棋盤格
     */

    function appendView(grid: Grid) {
        grid.views.forEach(function (view: SVGElement) {
            grid.board.viewer.body.appendChild(view);
        });
    }

    /**
     * 將棋盤格中的SVG物件從SVG畫布中移除
     * @param grid 棋盤格
     */

    function removeView(grid: Grid) {
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

    function updateView(grid: Grid, property: object) {
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

    function createDot(grid, sym, size) {
        removeView(grid);
        grid.views = [
            grid.board.viewer.create("circle", {
                "cx": `${grid.x * 5 + 2.5}`,
                "cy": `${grid.y * 5 + 2.5}`,
                "r": size,
                "fill": colors[sym]
            })
        ];
        appendView(grid);
    }


    /**
     * @memberof Grid
     * 判斷該格狀態
     * @param type 類型
     * @param sym  符號
     */

    function gridIs(type: string, sym: string) {
        switch (type) {
            case "space": return this.symbol === "";
            case "owner": return this.symbol === sym;
            case "other": return !this.is("owner|space", sym);
            case "valid": return this.is("source|normal", sym) && !this.is("space", sym);
            default:
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
     * 擴充棋盤格
     * @param grid 棋盤格
     */

    function gridPatch(grid: Grid) {
        grid.is = gridIs;
        grid.prop = {
            symbol: "",
            status: "normal"
        };
        grid.views = [];

        ["symbol", "status"].forEach(function (name) {
            Object.defineProperty(grid, name, {
                get: function () { return this.prop[name]; },
                set: function (value) {
                    if (!viewOperate[name][value]) return;
                    viewOperate[name][value](this);
                    this.prop[name] = value;
                }
            });
        });
    }

    /**
     * 擴充棋盤格
     * @param viewer 棋盤顯示
     */

    function viewerPatch(viewer: GridBoardViewer) {
        viewer.appendGridPath = appendGridPath;
        viewer.removeBackground = removeBackground;
    }

    /**
     * @memberof GridBoardViewer
     * 畫線在棋盤格線下
     * @param grids 棋盤格
     */

    function appendGridPath(grids: Grid[], color?: string) {
        if (this.backgroundFixed) return;
        var root = grids[0];
        var path = `M ${root.x * 5 + 2.5} ${root.y * 5 + 2.5} `;

        for (var i = 1; i < grids.length; i++) {
            var grid = grids[i];
            path += `L ${grid.x * 5 + 2.5} ${grid.y * 5 + 2.5} `;
        }

        var line = this.create("path", {
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

    function removeBackground() {
        if (this.backgroundFixed) return;
        var childNodes = this.background.childNodes;
        while (childNodes.length > 0) {
            this.background.removeChild(childNodes[0]);
        }
    };

    class SymtusBoard extends GridBoard {

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
         */

        find(type: string, sym: string): Grid[] {
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
         * 重設棋盤內部所有格子的狀態
         */

        clean() {
            for (var crd in this.gridOf) {
                var grid = this[crd];
                grid.symbol = "";
                grid.status = "normal";
            }

            this.viewer.removeBackground();
        }
    }

    global.SymtusBoard = SymtusBoard;
}(this));
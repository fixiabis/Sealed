(function () {
    var GridBoard = this.GridBoard;
    var Grid = GridBoard.prototype.Grid;
    var GridBoardViewer = GridBoard.prototype.GridBoardViewer;
    var symbolColor = {
        "": "#666",
        "O": "#dc143c",
        "X": "#4169e1",
        "D": "#ffa500",
        "U": "#2e8b57"
    };
    var theme = {
        symbol: {
            "": function (grid) {
                removeView(grid);
                grid.prop.status = "normal";
            },
            "O": function (grid) {
                removeView(grid);
                grid.views = [
                    grid.board.viewer.create("circle", {
                        "stroke-width": "0.6",
                        "cx": `${grid.x * 5 + 2.5}`,
                        "cy": `${grid.y * 5 + 2.5}`,
                        "r": "1.5",
                        "stroke": symbolColor["O"],
                        "fill": "none"
                    })
                ];
                appendView(grid);
            },
            "X": function (grid) {
                removeView(grid);
                var srtX = grid.x * 5 + 1;
                var srtY = grid.y * 5 + 1;
                var endX = grid.x * 5 + 4;
                var endY = grid.y * 5 + 4;
                grid.views = [
                    grid.board.viewer.create("path", {
                        "stroke-width": "0.6",
                        "stroke": symbolColor["X"],
                        "d": `M ${srtX} ${srtY} L ${endX} ${endY}`,
                        "fill": "none"
                    }),
                    grid.board.viewer.create("path", {
                        "stroke-width": "0.6",
                        "stroke": symbolColor["X"],
                        "d": `M ${srtX} ${endY} L ${endX} ${srtY}`,
                        "fill": "none"
                    })
                ];
                appendView(grid);
            },
            "D": function (grid) {
                removeView(grid);
                var srtX = grid.x * 5 + 1;
                var srtY = grid.y * 5 + 1;
                var endX = grid.x * 5 + 4;
                var endY = grid.y * 5 + 4;
                grid.views = [
                    grid.board.viewer.create("path", {
                        "stroke-width": "0.6",
                        "stroke": symbolColor["D"],
                        "d": `M ${endX} ${endY} L ${srtX} ${endY} L ${srtX + 1.5} ${srtY} Z`,
                        "fill": "none"
                    })
                ];
                appendView(grid);
            },
            "U": function (grid) {
                removeView(grid);
                var srtX = grid.x * 5 + 1;
                var srtY = grid.y * 5 + 1;
                var endX = grid.x * 5 + 4;
                var endY = grid.y * 5 + 4;
                grid.views = [
                    grid.board.viewer.create("path", {
                        "stroke-width": "0.6",
                        "stroke": symbolColor["U"],
                        "d": `M ${srtX} ${srtY} V ${endY} H ${endX} V ${srtY} Z`,
                        "fill": "none"
                    })
                ];
                appendView(grid);
            }
        },
        status: {
            "normal": grid => updateView(grid, {
                "stroke-width": "0.6",
                "stroke": symbolColor[grid.symbol]
            }),
            "source": function (grid) {
                updateView(grid, { "stroke-width": "1.2" });
                var views = grid.views;
                grid.symbol = grid.symbol;
                updateView(grid, { "stroke": "#f2f2f2" });
                views = views.concat(grid.views);
                removeView(grid);
                grid.views = views;
                appendView(grid);
            },
            "forbid": grid => updateView(grid, { "stroke": "#888" })
        }
    };

    ["O", "X", "D", "U"].forEach(function (sym) {
        theme.status[`${sym}.next`] = grid => createDot(grid, sym, "0.4");
    });

    ["O", "X", "D", "U"].forEach(function (sym) {
        theme.status[`${sym}.terr`] = grid => createDot(grid, sym, "0.2");
    });

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
                "fill": symbolColor[sym]
            })
        ];
        appendView(grid, true);
    }

    /**
     * 將棋盤格中的SVG元素建立到SVG
     * @param grid 棋盤格
     * @param removeAnimate 閃爍動畫移除
     */

    function appendView(grid, removeAnimate?) {
        for (var i = 0; i < grid.views.length; i++) {
            if (!removeAnimate) grid.views[i].style.animation = "blink 0.8s 2";
            grid.board.viewer.body.appendChild(grid.views[i]);
        }
    }

    /**
     * 將棋盤格中的SVG元素從SVG中移除
     * @param grid 棋盤格
     */

    function removeView(grid) {
        for (var i = 0; i < grid.views.length; i++) {
            grid.board.viewer.body.removeChild(grid.views[i]);
        }
        grid.views = [];
    }

    /**
     * 將棋盤格中的SVG元素統一設定屬性
     * @param grid     棋盤格
     * @param property 屬性
     */

    function updateView(grid, property) {
        for (var i = 0; i < grid.views.length; i++) {
            for (var name in property) {
                var value = property[name];
                grid.views[i].setAttribute(name, value);
            }
        }
    }

    /**
     * 棋盤格初始化
     */

    GridBoard.prototype.addRelati = function () {
        for (var crd in this.gridOf) {
            var grid = this[crd];
            grid.prop = {
                symbol: "",
                status: "normal"
            };
            grid.views = [];
        }
    };

    /**
     * 尋找狀態符合的棋盤格
     * @param type 狀態
     * @param sym  持有方
     * @return 棋盤格陣列
     */

    GridBoard.prototype.find = function (type, sym) {
        var result = [];

        for (var crd in this.gridOf) {
            if (this[crd].is(type, sym)) {
                result.push(this[crd]);
            }
        }

        return result;
    };

    /**
     * 畫線在棋盤格線下
     * @param grids 棋盤格
     */

    GridBoardViewer.prototype.appendGridPath = function (grids) {
        if (this.backgroundFixed) return;
        var root = grids[0];
        var path = `M ${root.x * 5 + 2.5} ${root.y * 5 + 2.5} `;

        for (var i = 1; i < grids.length; i++) {
            var grid = grids[i];
            path += `L ${grid.x * 5 + 2.5} ${grid.y * 5 + 2.5} `;
        }

        var line = this.create("path", {
            "stroke-width": "0.4",
            "stroke": symbolColor[root.symbol],
            "d": path,
            "fill": "none"
        });
        line.style.opacity = "0.2";
        this.background.appendChild(line);
    };

    /**
     * 移除棋盤格線下的SVG所有元素
     */

    GridBoardViewer.prototype.removeBackground = function () {
        if (this.backgroundFixed) return;
        var childNodes = this.background.childNodes;
        while (childNodes.length > 0) {
            this.background.removeChild(childNodes[0]);
        }
    };

    /**
     * 棋盤格取得符合指定規則的清單
     * @param type 規則名稱
     * @param sym  持有方
     */

    Grid.prototype.by = function (type, sym) {
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
    };

    /**
     * 棋盤格符合指定狀態
     * @param type 狀態名稱
     * @param sym  持有方
     */

    Grid.prototype.is = function (type, sym) {
        switch (type) {
            case "space": return this.symbol === "";
            case "owner": return this.symbol === sym;
            case "other": return !this.is("owner|space", sym);
            case "valid": return !this.is("space|forbid", sym);
            case "relati": return this.by("relati", sym).length > 0;
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
    };

    ["symbol", "status"].forEach(function (type) {
        Object.defineProperty(Grid.prototype, type, {
            set: function (value) {
                this.prop[type] = value;

                if (!theme[type][value]) {
                    throw new Error(`${type} ${value} is not found`);
                }

                theme[type][value](this);
            },
            get: function () {
                return this.prop[type];
            }
        });
    });
}.bind(this)());
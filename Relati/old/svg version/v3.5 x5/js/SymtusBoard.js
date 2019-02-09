"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var lib;
(function (lib) {
    var GridBoard = lib.GridBoard;
    var SymtusSymbol;
    (function (SymtusSymbol) {
        SymtusSymbol[SymtusSymbol["space"] = 0] = "space";
        SymtusSymbol[SymtusSymbol["O"] = 1] = "O";
        SymtusSymbol[SymtusSymbol["X"] = 2] = "X";
    })(SymtusSymbol = lib.SymtusSymbol || (lib.SymtusSymbol = {}));
    var SymtusStatus;
    (function (SymtusStatus) {
        SymtusStatus[SymtusStatus["normal"] = 0] = "normal";
        SymtusStatus[SymtusStatus["source"] = 1] = "source";
        SymtusStatus[SymtusStatus["forbid"] = 2] = "forbid";
        SymtusStatus[SymtusStatus["broken"] = 3] = "broken";
        SymtusStatus[SymtusStatus["select"] = 4] = "select";
    })(SymtusStatus = lib.SymtusStatus || (lib.SymtusStatus = {}));
    var SymtusColor;
    (function (SymtusColor) {
        SymtusColor["O"] = "crimson";
        SymtusColor["X"] = "royalblue";
        SymtusColor["forbid"] = "#666";
        SymtusColor["broken"] = "#bbb";
        SymtusColor["source"] = "#f2f2f2";
    })(SymtusColor = lib.SymtusColor || (lib.SymtusColor = {}));
    var viewOperation = {
        status: (_a = {},
            _a[SymtusStatus.normal] = function (grid) {
                viewOperation.symbol[grid.symbol](grid);
            },
            _a[SymtusStatus.source] = function (grid) {
                viewOperation.symbol[grid.symbol](grid);
                updateView(grid, { "stroke-width": "1.0" });
                var views = grid.views;
                removeView(grid);
                viewOperation.symbol[grid.symbol](grid);
                updateView(grid, { "stroke": SymtusColor.source, "stroke-width": "0.5" });
                views = views.concat(grid.views);
                removeView(grid);
                grid.views = views;
                appendView(grid);
            },
            _a[SymtusStatus.forbid] = function (grid) {
                viewOperation.symbol[grid.symbol](grid);
                updateView(grid, { "stroke": SymtusColor.forbid });
            },
            _a[SymtusStatus.broken] = function (grid) {
                viewOperation.symbol[grid.symbol](grid);
                updateView(grid, { "stroke": SymtusColor.broken });
            },
            _a[SymtusStatus.select] = function (grid) {
                var srtX = grid.x * 5 + 0.5;
                var srtY = grid.y * 5 + 0.5;
                var endX = grid.x * 5 + 4.5;
                var endY = grid.y * 5 + 4.5;
                var views = grid.views;
                removeView(grid);
                grid.views = views.concat([
                    createSVG("path", {
                        "stroke-width": "0.4",
                        "d": "M " + srtX + " " + (srtY + 1) + " V " + srtY + " H " + (srtX + 1),
                        "stroke": SymtusColor[SymtusSymbol[grid.symbol]],
                        "fill": "none"
                    }),
                    createSVG("path", {
                        "stroke-width": "0.4",
                        "d": "M " + endX + " " + (srtY + 1) + " V " + srtY + " H " + (endX - 1),
                        "stroke": SymtusColor[SymtusSymbol[grid.symbol]],
                        "fill": "none"
                    }),
                    createSVG("path", {
                        "stroke-width": "0.4",
                        "d": "M " + (srtX + 1) + " " + endY + " H " + srtX + " V " + (endY - 1),
                        "stroke": SymtusColor[SymtusSymbol[grid.symbol]],
                        "fill": "none"
                    }),
                    createSVG("path", {
                        "stroke-width": "0.4",
                        "d": "M " + (endX - 1) + " " + endY + " H " + endX + " V " + (endY - 1),
                        "stroke": SymtusColor[SymtusSymbol[grid.symbol]],
                        "fill": "none"
                    })
                ]);
                appendView(grid);
            },
            _a),
        symbol: (_b = {},
            _b[SymtusSymbol.space] = function (grid) {
                removeView(grid);
                grid.prop.status = SymtusStatus.normal;
            },
            _b[SymtusSymbol.O] = function (grid) {
                removeView(grid);
                grid.views = [
                    createSVG("circle", {
                        "stroke-width": "0.6",
                        "cx": "" + (grid.x * 5 + 2.5),
                        "cy": "" + (grid.y * 5 + 2.5),
                        "r": "1.5",
                        "stroke": SymtusColor.O,
                        "fill": "none"
                    })
                ];
                appendView(grid);
            },
            _b[SymtusSymbol.X] = function (grid) {
                removeView(grid);
                var srtX = grid.x * 5 + 1;
                var srtY = grid.y * 5 + 1;
                var endX = grid.x * 5 + 4;
                var endY = grid.y * 5 + 4;
                grid.views = [
                    createSVG("path", {
                        "stroke-width": "0.6",
                        "stroke": SymtusColor.X,
                        "d": "M " + srtX + " " + srtY + " L " + endX + " " + endY,
                        "fill": "none"
                    }),
                    createSVG("path", {
                        "stroke-width": "0.6",
                        "stroke": SymtusColor.X,
                        "d": "M " + srtX + " " + endY + " L " + endX + " " + srtY,
                        "fill": "none"
                    })
                ];
                appendView(grid);
            },
            _b)
    };
    function createSVG(tagName, attribute) {
        var element = document.createElementNS("http://www.w3.org/2000/svg", tagName);
        if (attribute)
            updateSVG(element, attribute);
        return element;
    }
    function updateSVG(element, attribute) {
        for (var name in attribute) {
            var value = attribute[name];
            element.setAttribute(name, value);
        }
    }
    function appendView(grid) {
        grid.views.forEach(function (view) { return grid.board.viewer.body.appendChild(view); });
    }
    function removeView(grid) {
        grid.views.forEach(function (view) { return grid.board.viewer.body.removeChild(view); });
        grid.views = [];
    }
    function updateView(grid, attribute) {
        grid.views.forEach(function (view) { return updateSVG(view, attribute); });
    }
    var SymtusBoardViewer = /** @class */ (function () {
        function SymtusBoardViewer(board) {
            this.board = board;
            this.body = createSVG("svg");
            this.background = createSVG("g");
            this.createSVG = createSVG;
            this.updateSVG = updateSVG;
            this.body.appendChild(this.background);
            this.body.setAttribute("width", "" + board.width * 5);
            this.body.setAttribute("height", "" + board.height * 5);
            this.body.addEventListener("click", function (event) {
                var x = Math.floor(event.offsetX / 5), y = Math.floor(event.offsetY / 5);
                if (this.onselect) {
                    this.onselect(this.board.grids[x][y]);
                }
            }.bind(this));
            for (var x = 1; x < board.width; x++) {
                var line = createSVG("path");
                line.setAttribute("d", "M " + x * 5 + " 0 V " + board.height * 5);
                line.setAttribute("stroke", "#888");
                line.setAttribute("stroke-width", "0.4");
                this.body.appendChild(line);
            }
            for (var y = 1; y < board.height; y++) {
                var line = createSVG("path");
                line.setAttribute("d", "M 0 " + y * 5 + " H " + board.width * 5);
                line.setAttribute("stroke", "#888");
                line.setAttribute("stroke-width", "0.4");
                this.body.appendChild(line);
            }
            for (var crd in board.gridOf) {
                var grid = board[crd];
                grid.prop = { symbol: 0, status: 0 };
                grid.views = [];
                ["symbol", "status"].forEach(function (type) {
                    Object.defineProperty(grid, type, {
                        get: function () {
                            return this.prop[type];
                        },
                        set: function (value) {
                            if (!viewOperation[type][value])
                                return;
                            this.prop[type] = value;
                            viewOperation[type][value](this);
                        }
                    });
                });
            }
        }
        SymtusBoardViewer.prototype.resize = function (scale) {
            if (scale === void 0) { scale = 0.95; }
            var _a = this, board = _a.board, container = _a.container;
            var size = Math.min(container.clientWidth / (board.width * 5), container.clientHeight / (board.height * 5)) * scale;
            this.body.style.transform = "scale(" + size + ")";
        };
        SymtusBoardViewer.prototype.appendIn = function (container) {
            this.container = container;
            container.appendChild(this.body);
            this.resize();
        };
        return SymtusBoardViewer;
    }());
    lib.SymtusBoardViewer = SymtusBoardViewer;
    var SymtusBoard = /** @class */ (function (_super) {
        __extends(SymtusBoard, _super);
        function SymtusBoard(width, height) {
            var _this = _super.call(this, width, height) || this;
            _this.viewer = new SymtusBoardViewer(_this);
            return _this;
        }
        return SymtusBoard;
    }(GridBoard));
    lib.SymtusBoard = SymtusBoard;
    var _a, _b;
})(lib || (lib = {}));

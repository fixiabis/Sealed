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
    function gridIs(type, sym) {
        if (type === "space-real") {
            return this.symbol === lib.SymtusSymbol.space;
        }
        if (type === "space") {
            return this.symbol === lib.SymtusSymbol.space ||
                this.status === lib.SymtusStatus.broken;
        }
        if (type === "owner") {
            return this.symbol === sym;
        }
        if (type === "other") {
            return this.symbol !== lib.SymtusSymbol.space && this.symbol !== sym;
        }
        if (type === "valid") {
            return this.status === lib.SymtusStatus.normal ||
                this.status === lib.SymtusStatus.source;
        }
        if (type in lib.SymtusStatus) {
            return this.status === lib.SymtusStatus[type];
        }
        return false;
    }
    function gridBy(type, sym) {
        var result = [];
        var viewer = this.board.viewer;
        if (type === "relati" || type === "relati-normal") {
            var grids = this.query("I;H;IH");
            for (var i = 0; i < grids.length; i++) {
                var grid = grids[i];
                if (grid && grid.is("owner", sym) && grid.is("valid")) {
                    result.push(grid);
                    viewer.appendGridPath([this, grid], 0.4, lib.SymtusColor[lib.SymtusSymbol[this.symbol]]);
                }
            }
        }
        if (type === "relati" || type === "relati-remote" || type === "relati-remote-normal") {
            var grids = this.query("2I,I;2H,H,2IH,IH");
            for (var i = 0; i < grids.length; i += 2) {
                var grid = grids[i], space = grids[i + 1];
                if (grid && grid.is("owner", sym) && grid.is("valid")) {
                    if (space.is("space")) {
                        result.push(grid);
                        viewer.appendGridPath([this, grid], 0.4, lib.SymtusColor[lib.SymtusSymbol[this.symbol]]);
                    }
                }
            }
        }
        if (type === "relati" || type === "relati-remote" || type === "relati-remote-stable") {
            var grids = this.query("IIH,II,I,IH,H,IHH,HH,H,HI,I");
            for (var i = 0; i < grids.length; i += 5) {
                var grid = grids[i], spaces = grids.slice(i + 1, i + 5);
                var exist = false;
                if (grid && grid.is("owner", sym) && grid.is("valid")) {
                    if (spaces[0].is("space") && spaces[1].is("space") ||
                        spaces[1].is("space") && spaces[2].is("space") ||
                        spaces[2].is("space") && spaces[3].is("space")) {
                        result.push(grid);
                    }
                    if (spaces[0].is("space") && spaces[1].is("space")) {
                        viewer.appendGridPath([this, spaces[1], spaces[0], grid], 0.4, lib.SymtusColor[lib.SymtusSymbol[this.symbol]]);
                    }
                    if (spaces[1].is("space") && spaces[2].is("space")) {
                        viewer.appendGridPath([this, spaces[1], spaces[2], grid], 0.4, lib.SymtusColor[lib.SymtusSymbol[this.symbol]]);
                    }
                    if (spaces[2].is("space") && spaces[3].is("space")) {
                        viewer.appendGridPath([this, spaces[3], spaces[2], grid], 0.4, lib.SymtusColor[lib.SymtusSymbol[this.symbol]]);
                    }
                }
            }
        }
        if (type === "escape") {
            var dirs = ["F", "B", "R", "L", "FR", "FL", "BR", "BL"];
            for (var _i = 0, dirs_1 = dirs; _i < dirs_1.length; _i++) {
                var dir = dirs_1[_i];
                var unit = 1;
                do {
                    var grid = this.query("" + unit + dir);
                    if (!grid || grid.is("other", sym) && !grid.is("space"))
                        break;
                    if (grid.is("owner", sym) && grid.is("source")) {
                        result.push(grid);
                        break;
                    }
                    unit++;
                } while (grid);
            }
        }
        if (type === "attack") {
            var dirs = ["F", "B", "R", "L"];
            for (var _a = 0, dirs_2 = dirs; _a < dirs_2.length; _a++) {
                var dir = dirs_2[_a];
                var triggerExist = false;
                var unit = 1;
                do {
                    var grid = this.query("" + unit + dir);
                    if (!grid)
                        break;
                    if (triggerExist) {
                        if (grid.is("owner", sym) && grid.is("valid")) {
                            result.push(grid);
                        }
                        break;
                    }
                    else if (!grid.is("space")) {
                        triggerExist = true;
                    }
                    unit++;
                } while (grid);
            }
        }
        return result;
    }
    function gridTo(type) {
        this.status = lib.SymtusStatus[type];
    }
    function relati(grid, sym, list) {
        if (list.indexOf(grid) > -1)
            return;
        list.push(grid);
        var grids = grid.by("relati", sym);
        for (var _i = 0, grids_1 = grids; _i < grids_1.length; _i++) {
            var grid_1 = grids_1[_i];
            relati(grid_1, sym, list);
        }
    }
    function viewerAppendGridDot(grid, size, color) {
        if (this.backgroundFixed)
            return;
        var dot = this.createSVG("circle", {
            "cx": "" + (grid.x * 5 + 2.5),
            "cy": "" + (grid.y * 5 + 2.5),
            "r": "" + size,
            "fill": color
        });
        this.background.appendChild(dot);
    }
    var gridPaths = [];
    function viewerAppendGridPath(grids, size, color) {
        if (this.backgroundFixed)
            return;
        var gridPath = grids.map(function (grid) { return grid.crd; }).join("");
        if (gridPaths.indexOf(gridPath) > -1)
            return;
        gridPaths.push(gridPath);
        var path = "M " + (grids[0].x * 5 + 2.5) + " " + (grids[0].y * 5 + 2.5);
        for (var i = 1; i < grids.length; i++) {
            path += " L " + (grids[i].x * 5 + 2.5) + " " + (grids[i].y * 5 + 2.5);
        }
        var line = this.createSVG("path", {
            "stroke-width": size,
            "stroke": color,
            "d": path,
            "fill": "none"
        });
        line.style.opacity = "0.2";
        this.background.appendChild(line);
    }
    function viewerBackgroundRemove() {
        while (this.background.childNodes.length > 0) {
            this.background.removeChild(this.background.childNodes[0]);
        }
        gridPaths = [];
    }
    var RelatiBoard = /** @class */ (function (_super) {
        __extends(RelatiBoard, _super);
        function RelatiBoard(width, height) {
            var _this = _super.call(this, width, height) || this;
            for (var crd in _this.gridOf) {
                var grid = _this[crd];
                grid.is = gridIs;
                grid.by = gridBy;
                grid.to = gridTo;
            }
            _this.viewer.backgroundFixed = false;
            _this.viewer.appendGridPath = viewerAppendGridPath;
            _this.viewer.appendGridDot = viewerAppendGridDot;
            _this.viewer.backgroundRemove = viewerBackgroundRemove;
            return _this;
        }
        RelatiBoard.prototype.forbid = function () {
            var list = [];
            for (var crd in this.gridOf) {
                var grid = this[crd];
                if (grid.is("forbid")) {
                    grid.to("normal");
                }
            }
            for (var crd in this.gridOf) {
                var grid = this[crd];
                if (grid.is("source")) {
                    relati(grid, grid.symbol, list);
                }
            }
            for (var crd in this.gridOf) {
                var grid = this[crd];
                if (grid.is("normal") && list.indexOf(grid) < 0) {
                    grid.to("forbid");
                }
            }
        };
        return RelatiBoard;
    }(lib.SymtusBoard));
    lib.RelatiBoard = RelatiBoard;
})(lib || (lib = {}));

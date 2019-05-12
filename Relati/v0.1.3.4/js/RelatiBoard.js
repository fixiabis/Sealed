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
    function gridBy(type, sym) {
        var list = [];
        var viewer = this.board.viewer;
        switch (type) {
            case "relati-normal":
                var grids = this.query("O");
                for (var i = 0; i < grids.length; i++) {
                    var sourceGrid = grids[i];
                    if (!sourceGrid)
                        continue;
                    if (sourceGrid.is("owner", sym) && sourceGrid.status !== "forbid") {
                        viewer.appendGridPath([sourceGrid, this]);
                        list.push(sourceGrid);
                    }
                }
                return list;
            case "relati-remote-normal":
                var grids = this.query("2O,O");
                for (var i = 0; i < grids.length; i += 2) {
                    var sourceGrid = grids[i];
                    if (!sourceGrid)
                        continue;
                    var spaceGrid = grids[i + 1];
                    if (sourceGrid.is("owner", sym) && sourceGrid.status !== "forbid") {
                        if (spaceGrid.is("space") || spaceGrid.status === "broken") {
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
                    if (!sourceGrid)
                        continue;
                    var spaceGrids = grids.slice(i + 1, i + 5);
                    if (sourceGrid.symbol === sym && sourceGrid.status !== "forbid") {
                        var relatiable = false;
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
                return this.by("relati-remote-normal", sym).concat(this.by("relati-remote-stable", sym));
            case "relati":
                return this.by("relati-normal", sym).concat(this.by("relati-remote", sym));
            case "attack":
                var maxSize = Math.max(this.board.width, this.board.height);
                ["F", "B", "R", "L"].forEach(function (dir) {
                    var d = dir;
                    var triggerExist = false;
                    var bulletExist = false;
                    var triggerBlock = false;
                    for (var i = 2; i < maxSize; i++) {
                        dir += "," + (i + d);
                    }
                    var grids = this.query(dir);
                    grids.forEach(function (grid) {
                        if (!grid || grid.is("space|broken") ||
                            bulletExist || triggerBlock)
                            return;
                        if (!triggerExist) {
                            triggerExist = true;
                        }
                        else if (grid.is("owner normal", sym) && triggerExist) {
                            bulletExist = true;
                            list.push(grid);
                        }
                        else {
                            bulletExist = true;
                        }
                    });
                }.bind(this));
                return list;
            case "escape":
                var maxSize = Math.max(this.board.width, this.board.height);
                ["F", "B", "R", "L", "FR", "FL", "BR", "BL"].forEach(function (dir) {
                    var d = dir;
                    var escapeBlock = false;
                    var escapeExist = false;
                    for (var i = 2; i < maxSize; i++) {
                        dir += "," + (i + d);
                    }
                    var grids = this.query(dir);
                    grids.forEach(function (grid) {
                        if (!grid || grid.is("space|broken") ||
                            escapeBlock || escapeExist)
                            return;
                        if (grid.is("owner source", sym)) {
                            escapeExist = true;
                            list.push(grid);
                        }
                        else if (grid.is("other", sym) && !escapeExist) {
                            escapeBlock = true;
                        }
                    });
                }.bind(this));
                return list;
            default:
                if (this.by[type])
                    return this.by[type].bind(this)(sym);
        }
        return list;
    }
    function gridPatch(grid) {
        grid.by = gridBy;
    }
    function relati(grid, list) {
        var grids = grid.by("relati", grid.symbol);
        list.push(grid);
        grids.forEach(function (grid) {
            if (list.indexOf(grid) > -1)
                return;
            relati(grid, list);
        });
    }
    var RelatiBoard = (function (_super) {
        __extends(RelatiBoard, _super);
        function RelatiBoard(width, height) {
            var _this = _super.call(this, width, height) || this;
            for (var crd in _this.gridOf) {
                var grid = _this[crd];
                gridPatch(grid);
            }
            return _this;
        }
        RelatiBoard.prototype.forbid = function () {
            var list = [];
            this.find("forbid").forEach(function (grid) {
                grid.status = "normal";
            });
            this.find("source").forEach(function (grid) {
                relati(grid, list);
            });
            this.find("valid").forEach(function (grid) {
                if (list.indexOf(grid) < 0) {
                    grid.status = "forbid";
                }
            });
        };
        return RelatiBoard;
    }(lib.SymtusBoard));
    lib.RelatiBoard = RelatiBoard;
})(lib || (lib = {}));

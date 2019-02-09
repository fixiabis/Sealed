"use strict";
var lib;
(function (lib) {
    function RelatiAnalysis(game) {
        var board = game.board;
        var space = board.find("space");
        var result = {};
        ["O", "X"].forEach(function (sym) {
            var nextGrids = [];
            var otherArea = [];
            do {
                var changed = false;
                var nextGrid = space.filter(function (grid) {
                    return grid.is("space") &&
                        grid.by("relati", sym).length > 0;
                });
                if (nextGrid.length > 0) {
                    changed = true;
                    nextGrids.push(nextGrid);
                    nextGrid.forEach(function (grid) {
                        grid.symbol = sym;
                    });
                }
                board.find("owner forbid", sym).forEach(function (grid) {
                    if (grid.by("relati", sym).length) {
                        grid.status = "normal";
                    }
                });
            } while (changed);
            space.forEach(function (grid) {
                if (grid.is("space")) {
                    otherArea.push(grid);
                }
                else {
                    grid.symbol = "";
                }
            });
            board.forbid();
            result[sym] = {
                nextGrids: nextGrids,
                otherArea: otherArea,
                ownerArea: [],
                point: 0
            };
        });
        result.Public = {
            nextGrids: [],
            otherArea: result.O.otherArea.concat(result.X.otherArea),
            ownerArea: [],
            point: 0
        };
        result.O.ownerArea = result.X.otherArea.filter(function (grid) {
            var exist = false;
            result.O.nextGrids.forEach(function (grids) {
                if (grids.indexOf(grid) > -1)
                    exist = true;
            });
            return exist;
        });
        result.X.ownerArea = result.O.otherArea.filter(function (grid) {
            var exist = false;
            result.X.nextGrids.forEach(function (grids) {
                if (grids.indexOf(grid) > -1)
                    exist = true;
            });
            return exist;
        });
        var length = Math.min(result.O.nextGrids.length, result.X.nextGrids.length);
        for (var i = 0; i < length; i++) {
            result.Public.nextGrids[i] = result.O.nextGrids[i].filter(function (grid) { return result.X.nextGrids[i].indexOf(grid) > -1; });
            result.Public.ownerArea = result.Public.ownerArea.concat(result.Public.nextGrids[i]);
        }
        ["O", "X"].forEach(function (sym) {
            result[sym].nextGrids.forEach(function (grids, i) {
                result[sym].point += -(Math.pow(4, i)) * grids.length;
            });
            result[sym].point -= result[sym].otherArea.length * 10;
            if (!result[sym].point)
                result[sym].point = -3e22;
        });
        return result;
    }
    lib.RelatiAnalysis = RelatiAnalysis;
})(lib || (lib = {}));

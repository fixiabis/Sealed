"use strict";
var lib;
(function (lib) {
    var RelatiBoard = lib.RelatiBoard, SymtusSymbol = lib.SymtusSymbol;
    lib.turn = 0;
    lib.symbols = ["O", "X"];
    lib.board = new RelatiBoard(5, 5);
    lib.board.viewer.appendIn(document.body);
    lib.board.viewer.onselect = function (grid) {
        var sym = SymtusSymbol[lib.symbols[lib.turn % 2]];
        if (grid.is("space") && lib.turn < lib.symbols.length ||
            grid.by("relati-normal", sym).length > 0) {
            grid.symbol = sym;
        }
        else
            return;
        lib.turn++;
        if (lib.turn >= lib.symbols.length) {
            var nextGrid = findNextGrid(SymtusSymbol[lib.symbols[lib.turn % 2]]);
            if (nextGrid.length === 0 && lib.turn !== 25) {
                console.log(sym + " win");
            }
            else if (lib.turn === 25) {
                console.log("draw");
            }
        }
        if (sym === SymtusSymbol.O) {
            lib.board.viewer.onselect(lib.board[findBestStep(SymtusSymbol.X, SymtusSymbol.X, SymtusSymbol.O, 1, { point: -Infinity }, { point: Infinity }).crd]);
        }
    };
    function findNextGrid(sym) {
        var nextGrid = [];
        for (var crd in lib.board.gridOf) {
            var grid = lib.board[crd];
            if (grid.is("space") && (lib.turn < lib.symbols.length ||
                grid.by("relati-normal", sym).length > 0)) {
                nextGrid.push(grid);
            }
        }
        return nextGrid;
    }
    lib.findNextGrid = findNextGrid;
    function analysis(own, oth) {
        var result = {};
        var space = [];
        for (var crd in lib.board.gridOf) {
            var grid = lib.board[crd];
            if (grid.is("space")) {
                space.push(grid);
            }
        }
        [SymtusSymbol.O, SymtusSymbol.X].forEach(function (sym) {
            var nextGrids = [];
            var otherArea = [];
            var point = 0;
            do {
                var changed = false;
                var nextGrid = [];
                for (var _i = 0, space_1 = space; _i < space_1.length; _i++) {
                    var grid = space_1[_i];
                    if (!grid.is("space"))
                        continue;
                    if (grid.by("relati-normal", sym).length > 0) {
                        nextGrid.push(grid);
                    }
                }
                nextGrid.forEach(function (grid) {
                    changed = true;
                    grid.symbol = sym;
                });
                if (changed) {
                    nextGrids.push(nextGrid);
                    point -= nextGrids.length * nextGrid.length;
                }
            } while (changed);
            for (var _a = 0, space_2 = space; _a < space_2.length; _a++) {
                var grid = space_2[_a];
                if (grid.is("space")) {
                    otherArea.push(grid);
                }
                else {
                    grid.symbol = SymtusSymbol.space;
                }
            }
            point -= otherArea.length * 100;
            result[sym] = { nextGrids: nextGrids, otherArea: otherArea, point: point };
        });
        result.point = result[own].point - result[oth].point;
        return result;
    }
    lib.analysis = analysis;
    function findBestStep(sym, own, oth, depth, alpha, beta) {
        var nextGrid = findNextGrid(own);
        if (own === sym) {
            for (var _i = 0, nextGrid_1 = nextGrid; _i < nextGrid_1.length; _i++) {
                var grid = nextGrid_1[_i];
                grid.symbol = own;
                lib.turn++;
                // debugger;
                if (depth) {
                    // console.log("  ".repeat(2 - depth), SymtusSymbol[grid.symbol], grid.crd);
                    var result = findBestStep(sym, oth, own, depth - 1, alpha, beta);
                }
                else {
                    var result = analysis(own, oth);
                    result.crds = [];
                }
                result.crd = grid.crd;
                result.crds.push(grid.crd);
                // if (depth) {
                //     console.log("  ".repeat(2 - depth), result.point);
                // } else {
                //     console.log("  ".repeat(2 - depth), SymtusSymbol[grid.symbol], grid.crd, result.point);
                // }
                // console.log("  ".repeat(2 - depth), result);
                grid.symbol = SymtusSymbol.space;
                lib.turn--;
                if (alpha.point < result.point)
                    Object.assign(alpha, result);
                if (beta.point <= alpha.point)
                    break;
            }
            return alpha;
        }
        else {
            var oldBeta = beta;
            beta = {};
            Object.assign(beta, oldBeta);
            for (var _a = 0, nextGrid_2 = nextGrid; _a < nextGrid_2.length; _a++) {
                var grid = nextGrid_2[_a];
                grid.symbol = own;
                lib.turn++;
                // debugger;
                if (depth) {
                    // console.log("  ".repeat(2 - depth), SymtusSymbol[grid.symbol], grid.crd);
                    var result = findBestStep(sym, oth, own, depth - 1, alpha, beta);
                }
                else {
                    var result = analysis(oth, own);
                    result.crds = [];
                }
                result.crd = grid.crd;
                result.crds.push(grid.crd);
                // if (depth) {
                //     console.log("  ".repeat(2 - depth), result.point);
                // } else {
                //     console.log("  ".repeat(2 - depth), SymtusSymbol[grid.symbol], grid.crd, result.point);
                // }
                // console.log("  ".repeat(2 - depth), result);
                grid.symbol = SymtusSymbol.space;
                lib.turn--;
                if (beta.point > result.point)
                    Object.assign(beta, result);
                if (beta.point <= alpha.point)
                    break;
            }
            return beta;
        }
    }
    lib.findBestStep = findBestStep;
    window.addEventListener("resize", function () { return lib.board.viewer.resize(); });
})(lib || (lib = {}));

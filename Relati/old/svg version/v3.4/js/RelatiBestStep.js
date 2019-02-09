"use strict";
var lib;
(function (lib) {
    var level = 3;
    function RelatiBestStep(game, depth, a, b, own, oth, sym) {
        var board = game.board;
        var nextGrid = game.findNextStep(own);
        if (!game.allPlayerPlaced() && nextGrid.length === 0) {
            nextGrid = board.find("space");
        }
        if (own === sym) {
            for (var _i = 0, nextGrid_1 = nextGrid; _i < nextGrid_1.length; _i++) {
                var grid = nextGrid_1[_i];
                grid.prop.symbol = own;
                if (!game.allPlayerPlaced())
                    grid.prop.status = "source";
                board.forbid();
                var result = depth
                    ? RelatiBestStep(game, depth - 1, a, b, oth, own, sym)
                    : lib.RelatiAnalysis(game);
                result.crd = grid.crd;
                result.point = result[own].point - result[oth].point;
                grid.prop.symbol = "";
                board.forbid();
                if (a.point < result.point)
                    a = result;
                if (b.point <= a.point)
                    break;
            }
            return a;
        }
        else {
            for (var _a = 0, nextGrid_2 = nextGrid; _a < nextGrid_2.length; _a++) {
                var grid = nextGrid_2[_a];
                grid.prop.symbol = own;
                if (!game.allPlayerPlaced())
                    grid.prop.status = "source";
                board.forbid();
                var result = depth
                    ? RelatiBestStep(game, depth - 1, a, b, oth, own, sym)
                    : lib.RelatiAnalysis(game);
                result.crd = grid.crd;
                result.point = result[oth].point - result[own].point;
                grid.prop.symbol = "";
                board.forbid();
                if (b.point > result.point)
                    b = result;
                if (b.point <= a.point)
                    break;
            }
            return b;
        }
    }
    lib.RelatiBestStep = RelatiBestStep;
})(lib || (lib = {}));

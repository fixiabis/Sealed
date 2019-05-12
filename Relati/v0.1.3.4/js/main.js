"use strict";
var lib;
(function (lib) {
    lib.game = new lib.RelatiGame(9, 9, 2, document.body);
    var board = lib.game.board;
    board.viewer.onselect = function (grid) {
        if (!grid.is("space"))
            return;
        var sym = lib.game.nowPlayerSymbol();
        board.viewer.backgroundFixed = false;
        board.viewer.removeBackground();
        if (!lib.game.allPlayerPlaced()) {
            grid.symbol = sym;
            grid.status = "source";
        }
        else if (grid.by("relati", sym).length > 0) {
            grid.symbol = sym;
        }
        else
            return;
        board.viewer.backgroundFixed = true;
        board.forbid();
        lib.game.turn++;
        if (lib.game.allPlayerPlaced()) {
            var result = lib.game.findWinner();
            if (result) {
                new lib.MessageBox(result, {
                    "OK": function () {
                        lib.game.reset();
                        this.remove(document.body);
                    }
                }).appendIn(document.body);
            }
        }
        var sym = lib.game.nowPlayerSymbol();
        board.find("space").forEach(function (grid) {
            grid.symbol = "";
        });
        lib.game.findNextStep(sym).forEach(function (grid) {
            grid.status = sym + ".next";
        });
        var analysisResult = lib.RelatiAnalysis(lib.game);
        console.log(analysisResult);
        if (sym === "X") {
            var crd = lib.RelatiBestStep(lib.game, 1, { point: -Infinity }, { point: Infinity }, sym, "O", sym).crd;
            if (board.viewer.onselect && crd) {
                board.viewer.onselect(board[crd]);
            }
        }
    };
})(lib || (lib = {}));

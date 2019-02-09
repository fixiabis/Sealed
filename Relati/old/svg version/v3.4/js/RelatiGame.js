"use strict";
var lib;
(function (lib) {
    var symbol = "OX";
    var RelatiGame = (function () {
        function RelatiGame(width, height, players, container) {
            this.turn = 0;
            var board = new lib.RelatiBoard(width, height);
            board.viewer.appendIn(container);
            window.addEventListener("resize", function () {
                board.viewer.resize(container);
            });
            this.board = board;
            this.players = players;
        }
        RelatiGame.prototype.reset = function () {
            this.turn = 0;
            this.board.clean();
        };
        RelatiGame.prototype.findNextStep = function (sym) {
            var result = [];
            for (var crd in this.board.gridOf) {
                var grid = this.board[crd];
                if (grid.is("space") && grid.by("relati", sym).length > 0) {
                    result.push(grid);
                }
            }
            return result;
        };
        RelatiGame.prototype.nowPlayerSymbol = function () {
            return symbol[this.turn % this.players];
        };
        RelatiGame.prototype.allPlayerPlaced = function () {
            return this.turn >= this.players;
        };
        RelatiGame.prototype.findWinner = function () {
            var notEliminate = "";
            for (var i = 0; i < this.players; i++) {
                var sym = symbol[i];
                if (this.findNextStep(sym).length > 0) {
                    notEliminate += sym;
                }
            }
            if (notEliminate.length === 0)
                return "Draw";
            if (notEliminate.length === 1)
                return notEliminate + " win";
            return "";
        };
        return RelatiGame;
    }());
    lib.RelatiGame = RelatiGame;
})(lib || (lib = {}));

(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /** 遊戲 */
    var RelatiGame = /** @class */ (function () {
        /**
         * 建立遊戲，並計算玩家數
         * @param players 參與玩家
         * @param board 棋盤
         */
        function RelatiGame(players, board) {
            this.players = players;
            this.board = board;
            /** 回合 */
            this.turn = 0;
            this.playerCount = players.length;
        }
        Object.defineProperty(RelatiGame.prototype, "nowPlayer", {
            /** 目前玩家 */
            get: function () {
                return this.players[this.turn % this.playerCount];
            },
            enumerable: true,
            configurable: true
        });
        return RelatiGame;
    }());
    exports.RelatiGame = RelatiGame;
});
//# sourceMappingURL=RelatiGame.js.map
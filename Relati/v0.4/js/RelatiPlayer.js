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
    /** 玩家 */
    var RelatiPlayer = /** @class */ (function () {
        /**
         * 建立玩家
         * @param badge 符號樣式
         */
        function RelatiPlayer(badge) {
            this.badge = badge;
        }
        return RelatiPlayer;
    }());
    exports.RelatiPlayer = RelatiPlayer;
});
//# sourceMappingURL=RelatiPlayer.js.map
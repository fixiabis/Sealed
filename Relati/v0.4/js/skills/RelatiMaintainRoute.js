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
    exports.RelatiMaintainRoute = {
        name: "連結維持",
        type: "effect",
        do: function (_a) {
            var game = _a.game, launcher = _a.grid, status = _a.status, toTarget = _a.toTarget;
            if (!launcher.role || game.turn < game.playerCount)
                return;
            var owner = launcher.role.owner;
            for (var _i = 0, _b = game.board.gridList; _i < _b.length; _i++) {
                var grid = _b[_i];
                if (grid.role && grid.role.owner === owner) {
                    grid.role.lost(status);
                }
            }
            maintainRoute(launcher, owner, status, toTarget);
        }
    };
    function maintainRoute(grid, owner, status, toTarget) {
        if (!grid.role || grid.role.is(status))
            return;
        grid.role.gain(status);
        var traces = toTarget.trace({ grid: grid, owner: owner });
        for (var _i = 0, traces_1 = traces; _i < traces_1.length; _i++) {
            var trace = traces_1[_i];
            var targetGrid = trace.target;
            maintainRoute(targetGrid, owner, status, toTarget);
        }
    }
});
//# sourceMappingURL=RelatiMaintainRoute.js.map
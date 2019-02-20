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
    /** 通用連結路徑規則 */
    exports.RelatiCommonPath = {
        allow: function (state) {
            return (exports.RelatiNormalPath.allow(state) ||
                exports.RelatiRemotePath.allow(state));
        },
        trace: function (state) {
            return exports.RelatiNormalPath.trace(state).concat(exports.RelatiRemotePath.trace(state));
        }
    };
    /** 一般連結路徑規則 */
    exports.RelatiNormalPath = {
        allow: function (_a) {
            var grid = _a.grid, owner = _a.owner, status = _a.status;
            var targetGrids = grid.queries("O");
            for (var i = 0; i < targetGrids.length; i++) {
                var targetGrid = targetGrids[i];
                var reliable = (targetGrid &&
                    targetGrid.role &&
                    targetGrid.role.owner === owner &&
                    targetGrid.role.is(status, "any"));
                if (reliable)
                    return true;
            }
            return false;
        },
        trace: function (_a) {
            var grid = _a.grid, owner = _a.owner, status = _a.status;
            var targetGrids = grid.queries("O");
            var traces = [];
            for (var i = 0; i < targetGrids.length; i++) {
                var targetGrid = targetGrids[i];
                var reliable = (targetGrid &&
                    targetGrid.role &&
                    targetGrid.role.owner === owner &&
                    targetGrid.role.is(status, "any"));
                if (reliable)
                    traces.push({
                        target: targetGrid,
                        routes: []
                    });
            }
            return traces;
        }
    };
    /** 遠程連結路徑規則 */
    exports.RelatiRemotePath = {
        allow: function (state) {
            return (exports.RelatiRemoteNormalPath.allow(state) ||
                exports.RelatiRemoteStablePath.allow(state));
        },
        trace: function (state) {
            return exports.RelatiRemoteNormalPath.trace(state).concat(exports.RelatiRemoteStablePath.trace(state));
        }
    };
    /** 遠程一般連結路徑規則 */
    exports.RelatiRemoteNormalPath = {
        allow: function (_a) {
            var grid = _a.grid, owner = _a.owner, status = _a.status;
            var targetGrids = grid.queries("2O,O");
            for (var i = 0; i < targetGrids.length; i += 2) {
                var targetGrid = targetGrids[i];
                var middleGrid = targetGrids[i + 1];
                var reliable = (targetGrid &&
                    targetGrid.role &&
                    targetGrid.role.owner === owner &&
                    targetGrid.role.is(status, "any"));
                if (reliable) {
                    var accessible = !middleGrid.role;
                    if (accessible)
                        return true;
                }
            }
            return false;
        },
        trace: function (_a) {
            var grid = _a.grid, owner = _a.owner, status = _a.status;
            var targetGrids = grid.queries("2O,O");
            var traces = [];
            for (var i = 0; i < targetGrids.length; i += 2) {
                var targetGrid = targetGrids[i];
                var middleGrid = targetGrids[i + 1];
                var reliable = (targetGrid &&
                    targetGrid.role &&
                    targetGrid.role.owner === owner &&
                    targetGrid.role.is(status, "any"));
                if (reliable) {
                    var accessible = !middleGrid.role;
                    if (accessible)
                        traces.push({
                            target: targetGrid,
                            routes: [middleGrid]
                        });
                }
            }
            return traces;
        }
    };
    /** 遠程穩定連結路徑規則 */
    exports.RelatiRemoteStablePath = {
        allow: function (_a) {
            var grid = _a.grid, owner = _a.owner, status = _a.status;
            var targetGrids = grid.queries("HII,II,I,IH,H,HI,I,IHH,HH,H,HI,I,IH,H");
            for (var i = 0; i < targetGrids.length; i += 7) {
                var targetGrid = targetGrids[i];
                var reliable = (targetGrid &&
                    targetGrid.role &&
                    targetGrid.role.owner === owner &&
                    targetGrid.role.is(status, "any"));
                if (reliable) {
                    for (var j = i + 1; j < i + 6; j += 2) {
                        var middleGrid1 = targetGrids[j];
                        var middleGrid2 = targetGrids[j + 1];
                        var accessible = !middleGrid1.role && !middleGrid2.role;
                        if (accessible)
                            return true;
                    }
                }
            }
            return false;
        },
        trace: function (_a) {
            var grid = _a.grid, owner = _a.owner, status = _a.status;
            var targetGrids = grid.queries("HII,II,I,IH,H,HI,I,IHH,HH,H,HI,I,IH,H");
            var traces = [];
            for (var i = 0; i < targetGrids.length; i += 7) {
                var targetGrid = targetGrids[i];
                var reliable = (targetGrid &&
                    targetGrid.role &&
                    targetGrid.role.owner === owner &&
                    targetGrid.role.is(status, "any"));
                if (reliable) {
                    for (var j = i + 1; j < i + 6; j += 2) {
                        var middleGrid1 = targetGrids[j];
                        var middleGrid2 = targetGrids[j + 1];
                        var accessible = !middleGrid1.role && !middleGrid2.role;
                        if (accessible)
                            traces.push({
                                target: targetGrid,
                                routes: [middleGrid1, middleGrid2]
                            });
                    }
                }
            }
            return traces;
        }
    };
});
//# sourceMappingURL=RelatiPath.js.map
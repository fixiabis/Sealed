import { RelatiRuleTraceable, RelatiRuleTrace } from "../RelatiRule";
import { RelatiRoleStatus } from "../RelatiRoleStatus";
import { RelatiGrid } from "../RelatiBoard";
import { RelatiPlayer } from "../RelatiPlayer";

/** 連結路徑規則所需狀態 */
export type RelatiPathState = {
    grid: RelatiGrid,
    owner: RelatiPlayer,
    status: RelatiRoleStatus[]
};

/** 連結路徑規則 */
export type RelatiPathRule = RelatiRuleTraceable<RelatiPathState>;

/** 通用連結路徑規則 */
export var RelatiCommonPath: RelatiPathRule = {
    allow(state) {
        return (
            RelatiNormalPath.allow(state) ||
            RelatiRemotePath.allow(state)
        );
    },
    trace(state) {
        return [
            ...RelatiNormalPath.trace(state),
            ...RelatiRemotePath.trace(state)
        ];
    }
};

/** 一般連結路徑規則 */
export var RelatiNormalPath: RelatiPathRule = {
    allow({ grid, owner, status }) {
        var targetGrids = grid.queries("O");

        for (var i = 0; i < targetGrids.length; i++) {
            var targetGrid = targetGrids[i];

            var reliable = (
                targetGrid &&
                targetGrid.role &&
                targetGrid.role.owner === owner &&
                targetGrid.role.is(status, "any")
            );

            if (reliable) return true;
        }

        return false;
    },
    trace({ grid, owner, status }) {
        var targetGrids = grid.queries("O");
        var traces: RelatiRuleTrace[] = [];

        for (var i = 0; i < targetGrids.length; i++) {
            var targetGrid = targetGrids[i];

            var reliable = (
                targetGrid &&
                targetGrid.role &&
                targetGrid.role.owner === owner &&
                targetGrid.role.is(status, "any")
            );

            if (reliable) traces.push({
                target: targetGrid,
                routes: []
            });
        }

        return traces;
    }
};

/** 遠程連結路徑規則 */
export var RelatiRemotePath: RelatiPathRule = {
    allow(state) {
        return (
            RelatiRemoteNormalPath.allow(state) ||
            RelatiRemoteStablePath.allow(state)
        );
    },
    trace(state) {
        return [
            ...RelatiRemoteNormalPath.trace(state),
            ...RelatiRemoteStablePath.trace(state)
        ];
    }
};

/** 遠程一般連結路徑規則 */
export var RelatiRemoteNormalPath: RelatiPathRule = {
    allow({ grid, owner, status }) {
        var targetGrids = grid.queries("2O,O");

        for (var i = 0; i < targetGrids.length; i += 2) {
            var targetGrid = targetGrids[i];
            var middleGrid = targetGrids[i + 1];

            var reliable = (
                targetGrid &&
                targetGrid.role &&
                targetGrid.role.owner === owner &&
                targetGrid.role.is(status, "any")
            );

            if (reliable) {
                var accessible = !middleGrid.role;
                if (accessible) return true;
            }
        }

        return false;
    },
    trace({ grid, owner, status }) {
        var targetGrids = grid.queries("2O,O");
        var traces: RelatiRuleTrace[] = [];

        for (var i = 0; i < targetGrids.length; i += 2) {
            var targetGrid = targetGrids[i];
            var middleGrid = targetGrids[i + 1];

            var reliable = (
                targetGrid &&
                targetGrid.role &&
                targetGrid.role.owner === owner &&
                targetGrid.role.is(status, "any")
            );

            if (reliable) {
                var accessible = !middleGrid.role;

                if (accessible) traces.push({
                    target: targetGrid,
                    routes: [middleGrid]
                });
            }
        }

        return traces;
    }
};

/** 遠程穩定連結路徑規則 */
export var RelatiRemoteStablePath: RelatiPathRule = {
    allow({ grid, owner, status }) {
        var targetGrids = grid.queries("HII,II,I,IH,H,HI,I,IHH,HH,H,HI,I,IH,H");

        for (var i = 0; i < targetGrids.length; i += 7) {
            var targetGrid = targetGrids[i];

            var reliable = (
                targetGrid &&
                targetGrid.role &&
                targetGrid.role.owner === owner &&
                targetGrid.role.is(status, "any")
            );

            if (reliable) {
                for (var j = i + 1; j < i + 6; j += 2) {
                    var middleGrid1 = targetGrids[j];
                    var middleGrid2 = targetGrids[j + 1];
                    var accessible = !middleGrid1.role && !middleGrid2.role;
                    if (accessible) return true;
                }
            }
        }

        return false;
    },
    trace({ grid, owner, status }) {
        var targetGrids = grid.queries("HII,II,I,IH,H,HI,I,IHH,HH,H,HI,I,IH,H");
        var traces: RelatiRuleTrace[] = [];

        for (var i = 0; i < targetGrids.length; i += 7) {
            var targetGrid = targetGrids[i];

            var reliable = (
                targetGrid &&
                targetGrid.role &&
                targetGrid.role.owner === owner &&
                targetGrid.role.is(status, "any")
            );

            if (reliable) {
                for (var j = i + 1; j < i + 6; j += 2) {
                    var middleGrid1 = targetGrids[j];
                    var middleGrid2 = targetGrids[j + 1];
                    var accessible = !middleGrid1.role && !middleGrid2.role;
    
                    if (accessible) traces.push({
                        target: targetGrid,
                        routes: [middleGrid1, middleGrid2]
                    });
                }
            }
        }

        return traces;
    }
};
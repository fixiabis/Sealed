import { RelatiRuleTrace, RelatiRuleTraceable } from "../RelatiRule";
import { RelatiRoleStatus } from "../RelatiRole";

export var RelatiTargetGridStatus: RelatiRoleStatus[] = [
    "relati-receiver"
];

export var RelatiToTarget: RelatiRuleTraceable = {
    allow(state) {
        return (
            RelatiNormalToTarget.allow(state) ||
            RelatiRemoteToTarget.allow(state)
        );
    },
    trace(state) {
        return [
            ...RelatiNormalToTarget.trace(state),
            ...RelatiRemoteToTarget.trace(state)
        ];
    }
};

export var RelatiNormalTargetGridStatus: RelatiRoleStatus[] = [
    "relati-normal-receiver",
    ...RelatiTargetGridStatus
];

export var RelatiNormalToTarget: RelatiRuleTraceable = {
    allow({ owner, grid }) {
        if (!grid) return false;

        var targetGrids = grid.queries("O");

        for (var i = 0; i < targetGrids.length; i++) {
            var targetGrid = targetGrids[i];
            var targetReliable = (
                targetGrid &&
                targetGrid.role &&
                targetGrid.role.owner === owner &&
                targetGrid.role.is(
                    RelatiNormalTargetGridStatus, "any"
                )
            );
            if (targetReliable) return true;
        }

        return false;
    },
    trace({ owner, grid }) {
        if (!grid) return [];

        var targetGrids = grid.queries("O");
        var ruleTraces: RelatiRuleTrace[] = [];

        for (var i = 0; i < targetGrids.length; i++) {
            var targetGrid = targetGrids[i];
            var targetReliable = (
                targetGrid &&
                targetGrid.role &&
                targetGrid.role.owner === owner &&
                targetGrid.role.is(
                    RelatiNormalTargetGridStatus, "any"
                )
            );

            if (targetReliable) {
                ruleTraces.push({
                    target: targetGrid,
                    routes: []
                });
            }
        }

        return ruleTraces;
    }
};

export var RelatiRemoteTargetGridStatus: RelatiRoleStatus[] = [
    "relati-remote-receiver",
    ...RelatiTargetGridStatus
];

export var RelatiRemoteToTarget: RelatiRuleTraceable = {
    allow(state) {
        return (
            RelatiRemoteNormalToTarget.allow(state) ||
            RelatiRemoteStableToTarget.allow(state)
        );
    },
    trace(state) {
        return [
            ...RelatiRemoteNormalToTarget.trace(state),
            ...RelatiRemoteStableToTarget.trace(state)
        ];
    }
};

export var RelatiRemoteNormalTargetGridStatus: RelatiRoleStatus[] = [
    "relati-remote-normal-receiver",
    ...RelatiRemoteTargetGridStatus
];

export var RelatiRemoteNormalToTarget: RelatiRuleTraceable = {
    allow({ owner, grid }) {
        if (!grid) return false;

        var targetGrids = grid.queries("2O,O");

        for (var i = 0; i < targetGrids.length; i += 2) {
            var targetGrid = targetGrids[i];
            var targetReliable = (
                targetGrid &&
                targetGrid.role &&
                targetGrid.role.owner === owner &&
                targetGrid.role.is(
                    RelatiRemoteNormalTargetGridStatus, "any"
                )
            );
            if (!targetReliable) continue;

            var middleGrid = targetGrids[i + 1];
            var notBlocked = !middleGrid.role;
            if (notBlocked) return true;
        }

        return false;
    },
    trace({ owner, grid }) {
        if (!grid) return [];

        var targetGrids = grid.queries("2O,O");
        var ruleTraces: RelatiRuleTrace[] = [];

        for (var i = 0; i < targetGrids.length; i += 2) {
            var targetGrid = targetGrids[i];
            var targetReliable = (
                targetGrid &&
                targetGrid.role &&
                targetGrid.role.owner === owner &&
                targetGrid.role.is(
                    RelatiRemoteNormalTargetGridStatus, "any"
                )
            );
            if (!targetReliable) continue;

            var middleGrid = targetGrids[i + 1];
            var notBlocked = !middleGrid.role;
            if (notBlocked) {
                ruleTraces.push({
                    target: targetGrid,
                    routes: [middleGrid]
                });
            }
        }

        return ruleTraces;
    }
};

export var RelatiRemoteStableTargetGridStatus: RelatiRoleStatus[] = [
    "relati-remote-stable-receiver",
    ...RelatiRemoteTargetGridStatus
];

export var RelatiRemoteStableToTarget: RelatiRuleTraceable = {
    allow({ owner, grid }) {
        if (!grid) return false;

        var targetGrids = grid.queries("IIH,II,I,IH,H,IHH,HH,H,HI,I");

        for (var i = 0; i < targetGrids.length; i += 5) {
            var targetGrid = targetGrids[i];
            var targetReliable = (
                targetGrid &&
                targetGrid.role &&
                targetGrid.role.owner === owner &&
                targetGrid.role.is(
                    RelatiRemoteStableTargetGridStatus, "any"
                )
            );
            if (!targetReliable) continue;

            var middleGrids = targetGrids.slice(i + 1, i + 5);

            for (var j = 0; j < middleGrids.length - 1; j++) {
                var middleGrid1 = middleGrids[j];
                var middleGrid2 = middleGrids[j + 1];

                var notBlocked = !middleGrid1.role && !middleGrid2.role;
                if (notBlocked) return true;
            }
        }

        return false;
    },
    trace({ owner, grid }) {
        if (!grid) return [];

        var targetGrids = grid.queries("IIH,II,I,IH,H,IHH,HH,H,HI,I");
        var ruleTraces: RelatiRuleTrace[] = [];

        for (var i = 0; i < targetGrids.length; i += 5) {
            var targetGrid = targetGrids[i];
            var targetReliable = (
                targetGrid &&
                targetGrid.role &&
                targetGrid.role.owner === owner &&
                targetGrid.role.is(
                    RelatiRemoteStableTargetGridStatus, "any"
                )
            );
            if (!targetReliable) continue;

            var middleGrids = targetGrids.slice(i + 1, i + 5);

            var middleGrid1 = middleGrids[1];
            var middleGrid2 = middleGrids[0];
            var notBlocked = !middleGrid1.role && !middleGrid2.role;

            if (notBlocked) ruleTraces.push({
                target: targetGrid,
                routes: [
                    middleGrid1,
                    middleGrid2
                ]
            });

            var middleGrid1 = middleGrids[1];
            var middleGrid2 = middleGrids[2];
            var notBlocked = !middleGrid1.role && !middleGrid2.role;

            if (notBlocked) ruleTraces.push({
                target: targetGrid,
                routes: [
                    middleGrid1,
                    middleGrid2
                ]
            });

            var middleGrid1 = middleGrids[3];
            var middleGrid2 = middleGrids[2];
            var notBlocked = !middleGrid1.role && !middleGrid2.role;

            if (notBlocked) ruleTraces.push({
                target: targetGrid,
                routes: [
                    middleGrid1,
                    middleGrid2
                ]
            });
        }

        return ruleTraces;
    }
};

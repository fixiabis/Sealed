namespace Relati {
    export namespace RelatiRules {
        export var RelatiSourceGridStatus: RelatiRoleStatus[] = [
            "relati-launcher",
            "relati-repeater"
        ];

        export var RelatiBySource: RelatiRuleTraceable = {
            allow(state) {
                return (
                    RelatiNormalBySource.allow(state) ||
                    RelatiRemoteBySource.allow(state)
                );
            },
            trace(state) {
                return [
                    ...RelatiNormalBySource.trace(state),
                    ...RelatiRemoteBySource.trace(state)
                ];
            }
        };

        export var RelatiNormalSourceGridStatus: RelatiRoleStatus[] = [
            "relati-normal-launcher",
            "relati-normal-repeater",
            ...RelatiSourceGridStatus
        ];

        export var RelatiNormalBySource: RelatiRuleTraceable = {
            allow({ owner, grid }) {
                if (!grid) return false;

                var sourceGrids = grid.queries("O");

                for (var i = 0; i < sourceGrids.length; i++) {
                    var sourceGrid = sourceGrids[i];
                    var sourceReliable = (
                        sourceGrid &&
                        sourceGrid.role &&
                        sourceGrid.role.owner === owner &&
                        sourceGrid.role.is(
                            RelatiNormalSourceGridStatus, "any"
                        )
                    );
                    if (sourceReliable) return true;
                }

                return false;
            },
            trace({ owner, grid }) {
                if (!grid) return [];

                var sourceGrids = grid.queries("O");
                var ruleTraces: RelatiRuleTrace[] = [];

                for (var i = 0; i < sourceGrids.length; i++) {
                    var sourceGrid = sourceGrids[i];
                    var sourceReliable = (
                        sourceGrid &&
                        sourceGrid.role &&
                        sourceGrid.role.owner === owner &&
                        sourceGrid.role.is(
                            RelatiNormalSourceGridStatus, "any"
                        )
                    );

                    if (sourceReliable) {
                        ruleTraces.push({
                            target: sourceGrid,
                            routes: []
                        });
                    }
                }

                return ruleTraces;
            }
        };

        export var RelatiRemoteSourceGridStatus: RelatiRoleStatus[] = [
            "relati-remote-launcher",
            "relati-remote-repeater",
            ...RelatiSourceGridStatus
        ];

        export var RelatiRemoteBySource: RelatiRuleTraceable = {
            allow(state) {
                return (
                    RelatiRemoteNormalBySource.allow(state) ||
                    RelatiRemoteStableBySource.allow(state)
                );
            },
            trace(state) {
                return [
                    ...RelatiRemoteNormalBySource.trace(state),
                    ...RelatiRemoteStableBySource.trace(state)
                ];
            }
        };

        export var RelatiRemoteNormalSourceGridStatus: RelatiRoleStatus[] = [
            "relati-remote-normal-launcher",
            "relati-remote-normal-repeater",
            ...RelatiRemoteSourceGridStatus
        ];

        export var RelatiRemoteNormalBySource: RelatiRuleTraceable = {
            allow({ owner, grid }) {
                if (!grid) return false;

                var sourceGrids = grid.queries("2O,O");

                for (var i = 0; i < sourceGrids.length; i += 2) {
                    var sourceGrid = sourceGrids[i];
                    var sourceReliable = (
                        sourceGrid &&
                        sourceGrid.role &&
                        sourceGrid.role.owner === owner &&
                        sourceGrid.role.is(
                            RelatiRemoteNormalSourceGridStatus, "any"
                        )
                    );
                    if (!sourceReliable) continue;

                    var middleGrid = sourceGrids[i + 1];
                    var notBlocked = !middleGrid.role;
                    if (notBlocked) return true;
                }

                return false;
            },
            trace({ owner, grid }) {
                if (!grid) return [];

                var sourceGrids = grid.queries("2O,O");
                var ruleTraces: RelatiRuleTrace[] = [];

                for (var i = 0; i < sourceGrids.length; i += 2) {
                    var sourceGrid = sourceGrids[i];
                    var sourceReliable = (
                        sourceGrid &&
                        sourceGrid.role &&
                        sourceGrid.role.owner === owner &&
                        sourceGrid.role.is(
                            RelatiRemoteNormalSourceGridStatus, "any"
                        )
                    );
                    if (!sourceReliable) continue;

                    var middleGrid = sourceGrids[i + 1];
                    var notBlocked = !middleGrid.role;
                    if (notBlocked) {
                        ruleTraces.push({
                            target: sourceGrid,
                            routes: [middleGrid]
                        });
                    }
                }

                return ruleTraces;
            }
        };

        export var RelatiRemoteStableSourceGridStatus: RelatiRoleStatus[] = [
            "relati-remote-stable-launcher",
            "relati-remote-stable-repeater",
            ...RelatiRemoteSourceGridStatus
        ];

        export var RelatiRemoteStableBySource: RelatiRuleTraceable = {
            allow({ owner, grid }) {
                if (!grid) return false;

                var sourceGrids = grid.queries("IIH,II,I,IH,H,IHH,HH,H,HI,I");

                for (var i = 0; i < sourceGrids.length; i += 5) {
                    var sourceGrid = sourceGrids[i];
                    var sourceReliable = (
                        sourceGrid &&
                        sourceGrid.role &&
                        sourceGrid.role.owner === owner &&
                        sourceGrid.role.is(
                            RelatiRemoteStableSourceGridStatus, "any"
                        )
                    );
                    if (!sourceReliable) continue;

                    var middleGrids = sourceGrids.slice(i + 1, i + 5);

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

                var sourceGrids = grid.queries("IIH,II,I,IH,H,IHH,HH,H,HI,I");
                var ruleTraces: RelatiRuleTrace[] = [];

                for (var i = 0; i < sourceGrids.length; i += 5) {
                    var sourceGrid = sourceGrids[i];
                    var sourceReliable = (
                        sourceGrid &&
                        sourceGrid.role &&
                        sourceGrid.role.owner === owner &&
                        sourceGrid.role.is(
                            RelatiRemoteStableSourceGridStatus, "any"
                        )
                    );
                    if (!sourceReliable) continue;

                    var middleGrids = sourceGrids.slice(i + 1, i + 5);

                    var middleGrid1 = middleGrids[1];
                    var middleGrid2 = middleGrids[0];
                    var notBlocked = !middleGrid1.role && !middleGrid2.role;

                    if (notBlocked) ruleTraces.push({
                        target: sourceGrid,
                        routes: [
                            middleGrid1,
                            middleGrid2
                        ]
                    });

                    var middleGrid1 = middleGrids[1];
                    var middleGrid2 = middleGrids[2];
                    var notBlocked = !middleGrid1.role && !middleGrid2.role;

                    if (notBlocked) ruleTraces.push({
                        target: sourceGrid,
                        routes: [
                            middleGrid1,
                            middleGrid2
                        ]
                    });

                    var middleGrid1 = middleGrids[3];
                    var middleGrid2 = middleGrids[2];
                    var notBlocked = !middleGrid1.role && !middleGrid2.role;

                    if (notBlocked) ruleTraces.push({
                        target: sourceGrid,
                        routes: [
                            middleGrid1,
                            middleGrid2
                        ]
                    });
                }

                return ruleTraces;
            }
        };
    }
}
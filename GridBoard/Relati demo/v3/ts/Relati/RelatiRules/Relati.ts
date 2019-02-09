namespace Relati {
    export namespace RelatiRules {
        export var RelatiSourceGridStatus: RelatiRoleStatus[] = [
            "relati-launcher",
            "relati-repeater"
        ];

        export var Relati: RelatiRuleTraceable = {
            allow(state) {
                return (
                    RelatiNormal.allow(state) ||
                    RelatiRemote.allow(state)
                );
            },
            trace(state) {
                return [
                    ...RelatiNormal.trace(state),
                    ...RelatiRemote.trace(state)
                ];
            }
        };

        export var RelatiNormalSourceGridStatus: RelatiRoleStatus[] = [
            "relati-normal-launcher",
            "relati-normal-repeater",
            ...RelatiSourceGridStatus
        ];

        export var RelatiNormal: RelatiRuleTraceable = {
            allow({ owner, grid }) {
                if (!grid) return false;

                var sourceGrids = grid.queries("O");

                for (var i = 0; i < sourceGrids.length; i++) {
                    var sourceGrid = sourceGrids[i];

                    if (!sourceGrid) continue;
                    if (!sourceGrid.role) continue;
                    if (sourceGrid.role.owner != owner) continue;

                    if (!sourceGrid.role.is(
                        RelatiNormalSourceGridStatus, "any"
                    )) continue;

                    return true;
                }

                return false;
            },
            trace({ owner, grid }) {
                if (!grid) return [];

                var sourceGrids = grid.queries("O");
                var ruleTraces: RelatiRuleTrace[] = [];

                for (var i = 0; i < sourceGrids.length; i++) {
                    var sourceGrid = sourceGrids[i];

                    if (!sourceGrid) continue;
                    if (!sourceGrid.role) continue;
                    if (sourceGrid.role.owner != owner) continue;

                    if (!sourceGrid.role.is(
                        RelatiNormalSourceGridStatus, "any"
                    )) continue;

                    ruleTraces.push({
                        target: sourceGrid,
                        routes: []
                    });
                }

                return ruleTraces;
            }
        };

        export var RelatiRemoteSourceGridStatus: RelatiRoleStatus[] = [
            "relati-remote-launcher",
            "relati-remote-repeater",
            ...RelatiSourceGridStatus
        ];

        export var RelatiRemote: RelatiRuleTraceable = {
            allow(state) {
                return (
                    RelatiRemoteNormal.allow(state) ||
                    RelatiRemoteStable.allow(state)
                );
            },
            trace(state) {
                return [
                    ...RelatiRemoteNormal.trace(state),
                    ...RelatiRemoteStable.trace(state)
                ];
            }
        };

        export var RelatiRemoteNormalSourceGridStatus: RelatiRoleStatus[] = [
            "relati-remote-normal-launcher",
            "relati-remote-normal-repeater",
            ...RelatiRemoteSourceGridStatus
        ];

        export var RelatiRemoteNormal: RelatiRuleTraceable = {
            allow({ owner, grid }) {
                if (!grid) return false;

                var sourceGrids = grid.queries("2O,O");

                for (var i = 0; i < sourceGrids.length; i += 2) {
                    var sourceGrid = sourceGrids[i];

                    if (!sourceGrid) continue;
                    if (!sourceGrid.role) continue;
                    if (sourceGrid.role.owner != owner) continue;

                    if (!sourceGrid.role.is(
                        RelatiRemoteNormalSourceGridStatus, "any"
                    )) continue;

                    var middleGrid = sourceGrids[i + 1];

                    if (
                        !middleGrid.role ||
                        !middleGrid.role.blood
                    ) return true;
                }

                return false;
            },
            trace({ owner, grid }) {
                if (!grid) return [];

                var sourceGrids = grid.queries("2O,O");
                var ruleTraces: RelatiRuleTrace[] = [];

                for (var i = 0; i < sourceGrids.length; i += 2) {
                    var sourceGrid = sourceGrids[i];

                    if (!sourceGrid) continue;
                    if (!sourceGrid.role) continue;
                    if (sourceGrid.role.owner != owner) continue;

                    if (!sourceGrid.role.is(
                        RelatiRemoteNormalSourceGridStatus, "any"
                    )) continue;

                    var middleGrid = sourceGrids[i + 1];

                    if (
                        !middleGrid.role ||
                        !middleGrid.role.blood
                    ) ruleTraces.push({
                        target: sourceGrid,
                        routes: [middleGrid]
                    });
                }

                return ruleTraces;
            }
        };

        export var RelatiRemoteStableSourceGridStatus: RelatiRoleStatus[] = [
            "relati-remote-stable-launcher",
            "relati-remote-stable-repeater",
            ...RelatiRemoteSourceGridStatus
        ];

        export var RelatiRemoteStable: RelatiRuleTraceable = {
            allow({ owner, grid }) {
                if (!grid) return false;

                var sourceGrids = grid.queries("IIH,II,I,IH,H,IHH,HH,H,HI,I");

                for (var i = 0; i < sourceGrids.length; i += 5) {
                    var sourceGrid = sourceGrids[i];

                    if (!sourceGrid) continue;
                    if (!sourceGrid.role) continue;
                    if (sourceGrid.role.owner != owner) continue;

                    if (!sourceGrid.role.is(
                        RelatiRemoteStableSourceGridStatus, "any"
                    )) continue;

                    var middleGrids = sourceGrids.slice(i + 1, i + 4);

                    for (var j = 1; j < middleGrids.length - 1; j++) {
                        var middleGrid1 = middleGrids[j];
                        var middleGrid2 = middleGrids[j + 1];

                        if (
                            middleGrid1.role &&
                            middleGrid1.role.blood
                        ) continue;

                        if (
                            !middleGrid2.role ||
                            !middleGrid2.role.blood
                        ) return true;
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

                    if (!sourceGrid) continue;
                    if (!sourceGrid.role) continue;
                    if (sourceGrid.role.owner != owner) continue;

                    if (!sourceGrid.role.is(
                        RelatiRemoteStableSourceGridStatus, "any"
                    )) continue;

                    var middleGrids = sourceGrids.slice(i + 1, i + 4);

                    for (var j = 1; j < middleGrids.length - 1; j++) {
                        var middleGrid1 = middleGrids[j];
                        var middleGrid2 = middleGrids[j + 1];

                        if (
                            middleGrid1.role &&
                            middleGrid1.role.blood
                        ) continue;

                        if (
                            !middleGrid2.role ||
                            !middleGrid2.role.blood
                        ) ruleTraces.push({
                            target: sourceGrid,
                            routes: [
                                middleGrid1,
                                middleGrid2
                            ]
                        })
                    }
                }

                return ruleTraces;
            }
        };
    }
}
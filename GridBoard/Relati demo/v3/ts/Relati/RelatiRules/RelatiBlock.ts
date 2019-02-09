namespace Relati {
    export namespace RelatiRules {
        export var RelatiTargetGridStatus: RelatiRoleStatus[] = [
            "relati-recepter"
        ];

        export var RelatiBlock: RelatiRuleTraceable = {
            allow(state) {
                return (
                    RelatiNormalBlock.allow(state) ||
                    RelatiRemoteBlock.allow(state)
                );
            },
            trace(state) {
                return [
                    ...RelatiNormalBlock.trace(state),
                    ...RelatiRemoteBlock.trace(state)
                ];
            }
        };

        export var RelatiNormalTargetGridStatus: RelatiRoleStatus[] = [
            "relati-normal-recepter",
            ...RelatiTargetGridStatus
        ];

        export var RelatiNormalBlock: RelatiRuleTraceable = {
            allow({ owner, grid }) {
                if (!grid) return false;

                var targetGrids = grid.queries("O");

                for (var i = 0; i < targetGrids.length; i++) {
                    var targetGrid = targetGrids[i];

                    if (!targetGrid) continue;
                    if (!targetGrid.role) continue;
                    if (targetGrid.role.owner != owner) continue;

                    if (!targetGrid.role.is(
                        RelatiNormalTargetGridStatus, "any"
                    )) continue;

                    return true;
                }

                return false;
            },
            trace({ owner, grid }) {
                if (!grid) return [];

                var targetGrids = grid.queries("O");
                var ruleTraces: RelatiRuleTrace[] = [];

                for (var i = 0; i < targetGrids.length; i++) {
                    var targetGrid = targetGrids[i];

                    if (!targetGrid) continue;
                    if (!targetGrid.role) continue;
                    if (targetGrid.role.owner != owner) continue;

                    if (!targetGrid.role.is(
                        RelatiNormalTargetGridStatus, "any"
                    )) continue;

                    ruleTraces.push({
                        target: targetGrid,
                        routes: []
                    });
                }

                return ruleTraces;
            }
        };

        export var RelatiRemoteTargetGridStatus: RelatiRoleStatus[] = [
            "relati-remote-recepter",
            ...RelatiTargetGridStatus
        ];

        export var RelatiRemoteBlock: RelatiRuleTraceable = {
            allow(state) {
                return (
                    RelatiRemoteNormalBlock.allow(state) ||
                    RelatiRemoteStableBlock.allow(state)
                );
            },
            trace(state) {
                return [
                    ...RelatiRemoteNormalBlock.trace(state),
                    ...RelatiRemoteStableBlock.trace(state)
                ];
            }
        };

        export var RelatiRemoteNormalTargetGridStatus: RelatiRoleStatus[] = [
            "relati-remote-normal-recepter",
            ...RelatiRemoteTargetGridStatus
        ];

        export var RelatiRemoteNormalBlock: RelatiRuleTraceable = {
            allow({ owner, grid }) {
                if (!grid) return false;

                var targetGrids = grid.queries("2O,O");

                for (var i = 0; i < targetGrids.length; i += 2) {
                    var targetGrid = targetGrids[i];

                    if (!targetGrid) continue;
                    if (!targetGrid.role) continue;
                    if (targetGrid.role.owner != owner) continue;

                    if (!targetGrid.role.is(
                        RelatiRemoteNormalTargetGridStatus, "any"
                    )) continue;

                    var middleGrid = targetGrids[i + 1];

                    if (
                        !middleGrid.role ||
                        !middleGrid.role.blood
                    ) return true;
                }

                return false;
            },
            trace({ owner, grid }) {
                if (!grid) return [];

                var targetGrids = grid.queries("2O,O");
                var ruleTraces: RelatiRuleTrace[] = [];

                for (var i = 0; i < targetGrids.length; i += 2) {
                    var targetGrid = targetGrids[i];

                    if (!targetGrid) continue;
                    if (!targetGrid.role) continue;
                    if (targetGrid.role.owner != owner) continue;

                    if (!targetGrid.role.is(
                        RelatiRemoteNormalTargetGridStatus, "any"
                    )) continue;

                    var middleGrid = targetGrids[i + 1];

                    if (
                        !middleGrid.role ||
                        !middleGrid.role.blood
                    ) ruleTraces.push({
                        target: targetGrid,
                        routes: [middleGrid]
                    });
                }

                return ruleTraces;
            }
        };

        export var RelatiRemoteStableTargetGridStatus: RelatiRoleStatus[] = [
            "relati-remote-stable-recepter",
            ...RelatiRemoteTargetGridStatus
        ];

        export var RelatiRemoteStableBlock: RelatiRuleTraceable = {
            allow({ owner, grid }) {
                if (!grid) return false;

                var targetGrids = grid.queries("IIH,II,I,IH,H,IHH,HH,H,HI,I");

                for (var i = 0; i < targetGrids.length; i += 5) {
                    var targetGrid = targetGrids[i];

                    if (!targetGrid) continue;
                    if (!targetGrid.role) continue;
                    if (targetGrid.role.owner != owner) continue;

                    if (!targetGrid.role.is(
                        RelatiRemoteStableTargetGridStatus, "any"
                    )) continue;

                    var middleGrids = targetGrids.slice(i + 1, i + 4);

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

                var targetGrids = grid.queries("IIH,II,I,IH,H,IHH,HH,H,HI,I");
                var ruleTraces: RelatiRuleTrace[] = [];

                for (var i = 0; i < targetGrids.length; i += 5) {
                    var targetGrid = targetGrids[i];

                    if (!targetGrid) continue;
                    if (!targetGrid.role) continue;
                    if (targetGrid.role.owner != owner) continue;

                    if (!targetGrid.role.is(
                        RelatiRemoteStableTargetGridStatus, "any"
                    )) continue;

                    var middleGrids = targetGrids.slice(i + 1, i + 4);

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
                            target: targetGrid,
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
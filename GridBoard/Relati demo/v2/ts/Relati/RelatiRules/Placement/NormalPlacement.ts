namespace Relati {
    export namespace RelatiRules {
        export var NormalPlacement: RelatiRuleTraceable & RelatiRuleYieldable = {
            allow(game, grid, owner) {
                if (!RolePlacement.allow(game, grid, owner)) return false;
                return Relati.allow(game, grid, owner);
            },
            trace(game, grid, owner) {
                return Relati.trace(game, grid, owner);
            },
            yield(game, grid, owner) {
                grid.role.insertStatus("relati-repeater");
                grid.role.insertStatus("relati-receiver");
                grid.role.owner = owner;
                grid.role.type = "normal";
            }
        };
    }
}
namespace Relati {
    export namespace RelatiRules {
        export var ArcherPlacement: RelatiRuleTraceable & RelatiRuleYieldable = {
            allow(game, grid, owner) {
                if (!RolePlacement.allow(game, grid, owner)) return false;
                return RelatiNormal.allow(game, grid, owner);
            },
            trace(game, grid, owner) {
                return RelatiNormal.trace(game, grid, owner);
            },
            yield(game, grid, owner) {
                grid.role.insertStatus("relati-normal-receiver");
                grid.role.insertStatus("archer");
                grid.role.owner = owner;
                grid.role.type = "general";
            }
        };
    }
}
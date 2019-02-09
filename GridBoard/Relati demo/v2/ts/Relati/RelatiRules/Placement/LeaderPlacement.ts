namespace Relati {
    export namespace RelatiRules {
        export var LeaderPlacement: RelatiRuleYieldable = {
            allow(game, grid, owner) {
                if (!RolePlacement.allow(game, grid, owner)) return false;
                if (game.turn > 2) return false;
                return true;
            },
            yield(game, grid,owner) {
                grid.role.insertStatus("relati-launcher");
                grid.role.owner = owner;
                grid.role.type = "leader";
                grid.role.effects.push(RelatiRules.RelatiBlock);
            }
        };
    }
}
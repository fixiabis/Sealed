namespace Relati {
    export namespace RelatiRules {
        export var Archer: RelatiRuleYieldable = {
            allow(game, grid, owner) {
                return grid.role.is("archer");
            },
            yield(game, grid, owner) {
                var { board } = game;
                
            }
        };
    }
}
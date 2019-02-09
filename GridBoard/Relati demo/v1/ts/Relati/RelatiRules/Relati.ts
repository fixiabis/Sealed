namespace Relati {
    export namespace RelatiRules {
        export var Relati: RelatiRuleTraceable = {
            allow(game, grid, owner) {
                return (
                    RelatiNormal.allow(game, grid, owner) ||
                    RelatiRemote.allow(game, grid, owner)
                );
            },
            trace(game, grid, owner) {
                return [
                    ...RelatiNormal.trace(game, grid, owner),
                    ...RelatiRemote.trace(game, grid, owner)
                ];
            }
        };
    }
}
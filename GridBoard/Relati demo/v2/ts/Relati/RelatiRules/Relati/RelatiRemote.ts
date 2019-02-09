namespace Relati {
    export namespace RelatiRules {
        export var RelatiRemote: RelatiRuleTraceable = {
            allow(game, grid, owner) {
                return (
                    RelatiRemoteNormal.allow(game, grid, owner) ||
                    RelatiRemoteStable.allow(game, grid, owner)
                );
            },
            trace(game, grid, owner) {
                return [
                    ...RelatiRemoteNormal.trace(game, grid, owner),
                    ...RelatiRemoteStable.trace(game, grid, owner)
                ];
            }
        };
    }
}
namespace Relati {
    export namespace RelatiCards {
        export var Normal: RelatiCard = {
            when(game, grid, owner) {
                return (
                    !grid.role.owner &&
                    RelatiRules.Relati.allow(game, grid, owner)
                );
            },
            then(game, grid, owner) {
                grid.role.owner = owner;
                grid.role["relati-receiver"] = true;
                grid.role["relati-repeater"] = true;
                game.turn++;
            }
        }
    }
}
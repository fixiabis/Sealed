namespace Relati {
    export namespace RelatiCards {
        export var Leader: RelatiCard = {
            when(game, grid, owner) {
                return (
                    !grid.role.owner &&
                    game.turn <= 2
                );
            },
            then(game, grid, owner) {
                grid.role.owner = owner;
                grid.role.type = "leader";
                grid.role["relati-launcher"] = true;
                grid.role.effects.push(RelatiActions.RelatiBlock);
                game.turn++;
            }
        }
    }
}
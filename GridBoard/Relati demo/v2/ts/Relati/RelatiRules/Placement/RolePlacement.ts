namespace Relati {
    export namespace RelatiRules {
        export var RolePlacement: RelatiRule = {
            allow(game, grid, owner) {
                return grid.role.is("spaceR");
            }
        }
    }
}
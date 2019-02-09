namespace Relati {
    var ticStart: number = new Date().getTime();
    export var tic = () => ticStart = new Date().getTime();
    export var tac = () => console.log(new Date().getTime() - ticStart);

    var gridSize = 5;
    var boardWidth = 15;
    var boardHeight = 9;
    var board = new RelatiBoard(boardWidth, boardHeight, gridSize);

    var boardViewContainer = document.body;
    board.viewInitialize(boardViewContainer);

    export var game = new RelatiGame(board);

    board.view.addEventListener("click", function (event: MouseEvent) {
        var x = Math.floor(event.offsetX / gridSize);
        var y = Math.floor(event.offsetY / gridSize);
        var grid = board.grids[x] && board.grids[x][y];

        tic();
        if (grid) select(grid);
        tac();
    });

    function select(grid: RelatiGrid) {
        var placementRules = [
            RelatiRules.LeaderPlacement,
            RelatiRules.NormalPlacement
        ];

        var owner = game.getNowPlayerSymbol();

        for (var placementRule of placementRules) {
            if (placementRule.allow(game, grid, owner)) {
                placementRule.yield(game, grid, owner);
                game.turn++;
                break;
            }
        }

        var { board } = grid;

        for (var targetGrid of board.gridList) {
            for (var effect of targetGrid.role.effects) {
                if (effect.allow(game, targetGrid, owner)) {
                    effect.yield(game, targetGrid, owner);
                }
            }
        }

        var nowSymbol = game.getNowPlayerSymbol();
        var ownerPlaceable = false;
        var nowSymbolPlaceable = false;

        if (game.turn >= 2) {
            for (var grid of board.gridList) {
                if (grid.role.owner != "") continue;
                grid.role.deleteStatus(<RelatiRolePlaceableStatus>`${owner}-placeable`);

                if (RelatiRules.NormalPlacement.allow(game, grid, nowSymbol)) {
                    grid.role.insertStatus(<RelatiRolePlaceableStatus>`${nowSymbol}-placeable`);
                    nowSymbolPlaceable = true;
                }

                if (!ownerPlaceable) {
                    if (RelatiRules.NormalPlacement.allow(game, grid, owner)) {
                        ownerPlaceable = true;
                    }
                }
            }
        }

        if (game.turn > 2) {
            if (!ownerPlaceable && !nowSymbolPlaceable) {
                alert("平手");
            } else if (!nowSymbolPlaceable) {
                alert(`${nowSymbol}輸了`);
            }
        }

        for (var targetGrid of board.gridList) {
            RelatiView.update(board, gridSize);
        }
    }
}
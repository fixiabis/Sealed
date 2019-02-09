namespace Relati {
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

        if (grid) select(grid);
        RelatiView.update(board, gridSize);
    });

    function select(grid: RelatiGrid) {
        var ownerPlaceable = false;
        var owner = game.getNowPlayer();

        for (var action of grid.role.actions) {
            if (action.when(game, grid, owner)) {
                action.then(game, grid, owner);
                break;
            }
        }

        for (var targetGrid of board.gridList) {
            for (var effect of targetGrid.role.effects) {
                if (effect.when(game, targetGrid, owner)) {
                    effect.then(game, targetGrid, owner);
                }
            }
        }

        var nextOwnerPlaceable = false;
        var nextOwner = game.getNowPlayer();

        if (game.turn > 2) {
            for (var targetGrid of board.gridList) {
                targetGrid.role[`${owner}-placeable`] = false;

                for (var action of targetGrid.role.actions) {
                    if (action.when(game, targetGrid, owner)) {
                        ownerPlaceable = true;
                    }

                    if (action.when(game, targetGrid, nextOwner)) {
                        targetGrid.role[`${nextOwner}-placeable`] = true;
                        nextOwnerPlaceable = true;
                    }
                }
            }

            if (!nextOwnerPlaceable) {
                if (!ownerPlaceable) alert("平手");
                else alert(`${nextOwner}輸了`);
            }
        }
    }
}

var game = Relati.game;
var board = game.board;
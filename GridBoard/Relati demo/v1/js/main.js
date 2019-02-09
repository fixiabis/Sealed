"use strict";
var Relati;
(function (Relati) {
    var gridSize = 5;
    var boardWidth = 15;
    var boardHeight = 9;
    var board = new Relati.RelatiBoard(boardWidth, boardHeight, gridSize);
    var boardViewContainer = document.body;
    board.viewInitialize(boardViewContainer);
    Relati.game = new Relati.RelatiGame(board);
    board.view.addEventListener("click", function (event) {
        var x = Math.floor(event.offsetX / gridSize);
        var y = Math.floor(event.offsetY / gridSize);
        var grid = board.grids[x] && board.grids[x][y];
        if (grid)
            select(grid);
        Relati.RelatiView.update(board, gridSize);
    });
    function select(grid) {
        var ownerPlaceable = false;
        var owner = Relati.game.getNowPlayer();
        for (var _i = 0, _a = grid.role.actions; _i < _a.length; _i++) {
            var action = _a[_i];
            if (action.when(Relati.game, grid, owner)) {
                action.then(Relati.game, grid, owner);
                break;
            }
        }
        for (var _b = 0, _c = board.gridList; _b < _c.length; _b++) {
            var targetGrid = _c[_b];
            for (var _d = 0, _e = targetGrid.role.effects; _d < _e.length; _d++) {
                var effect = _e[_d];
                if (effect.when(Relati.game, targetGrid, owner)) {
                    effect.then(Relati.game, targetGrid, owner);
                }
            }
        }
        var nextOwnerPlaceable = false;
        var nextOwner = Relati.game.getNowPlayer();
        if (Relati.game.turn > 2) {
            for (var _f = 0, _g = board.gridList; _f < _g.length; _f++) {
                var targetGrid = _g[_f];
                targetGrid.role[owner + "-placeable"] = false;
                for (var _h = 0, _j = targetGrid.role.actions; _h < _j.length; _h++) {
                    var action = _j[_h];
                    if (action.when(Relati.game, targetGrid, owner)) {
                        ownerPlaceable = true;
                    }
                    if (action.when(Relati.game, targetGrid, nextOwner)) {
                        targetGrid.role[nextOwner + "-placeable"] = true;
                        nextOwnerPlaceable = true;
                    }
                }
            }
            if (!nextOwnerPlaceable) {
                if (!ownerPlaceable)
                    alert("平手");
                else
                    alert(nextOwner + "\u8F38\u4E86");
            }
        }
    }
})(Relati || (Relati = {}));
var game = Relati.game;
var board = game.board;
//# sourceMappingURL=main.js.map
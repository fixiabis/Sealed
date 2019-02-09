"use strict";
var Relati;
(function (Relati) {
    var ticStart = new Date().getTime();
    Relati.tic = function () { return ticStart = new Date().getTime(); };
    Relati.tac = function () { return console.log(new Date().getTime() - ticStart); };
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
        Relati.tic();
        if (grid)
            select(grid);
        Relati.tac();
    });
    function select(grid) {
        var placementRules = [
            Relati.RelatiRules.LeaderPlacement,
            Relati.RelatiRules.NormalPlacement
        ];
        var owner = Relati.game.getNowPlayerSymbol();
        for (var _i = 0, placementRules_1 = placementRules; _i < placementRules_1.length; _i++) {
            var placementRule = placementRules_1[_i];
            if (placementRule.allow(Relati.game, grid, owner)) {
                placementRule.yield(Relati.game, grid, owner);
                Relati.game.turn++;
                break;
            }
        }
        var board = grid.board;
        for (var _a = 0, _b = board.gridList; _a < _b.length; _a++) {
            var targetGrid = _b[_a];
            for (var _c = 0, _d = targetGrid.role.effects; _c < _d.length; _c++) {
                var effect = _d[_c];
                if (effect.allow(Relati.game, targetGrid, owner)) {
                    effect.yield(Relati.game, targetGrid, owner);
                }
            }
        }
        var nowSymbol = Relati.game.getNowPlayerSymbol();
        var ownerPlaceable = false;
        var nowSymbolPlaceable = false;
        if (Relati.game.turn >= 2) {
            for (var _e = 0, _f = board.gridList; _e < _f.length; _e++) {
                var grid = _f[_e];
                if (grid.role.owner != "")
                    continue;
                grid.role.deleteStatus(owner + "-placeable");
                if (Relati.RelatiRules.NormalPlacement.allow(Relati.game, grid, nowSymbol)) {
                    grid.role.insertStatus(nowSymbol + "-placeable");
                    nowSymbolPlaceable = true;
                }
                if (!ownerPlaceable) {
                    if (Relati.RelatiRules.NormalPlacement.allow(Relati.game, grid, owner)) {
                        ownerPlaceable = true;
                    }
                }
            }
        }
        if (Relati.game.turn > 2) {
            if (!ownerPlaceable && !nowSymbolPlaceable) {
                alert("平手");
            }
            else if (!nowSymbolPlaceable) {
                alert(nowSymbol + "\u8F38\u4E86");
            }
        }
        for (var _g = 0, _h = board.gridList; _g < _h.length; _g++) {
            var targetGrid = _h[_g];
            Relati.RelatiView.update(board, gridSize);
        }
    }
})(Relati || (Relati = {}));
//# sourceMappingURL=main.js.map
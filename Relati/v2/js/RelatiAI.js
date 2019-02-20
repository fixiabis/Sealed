"use strict";
/// <reference path="base/GridBoard.d.ts" />
/// <reference path="base/Relati.d.ts" />
var RelatiRules = Relati.RelatiRules, RelatiRole = Relati.RelatiRole;
var RelatiAI = /** @class */ (function () {
    function RelatiAI(game) {
        this.game = game;
        this.leaderGrids = [];
    }
    RelatiAI.prototype.initialize = function () {
        var game = this.game;
        for (var _i = 0, _a = game.board.gridList; _i < _a.length; _i++) {
            var grid = _a[_i];
            if (grid.role &&
                grid.role.is("relati-launcher"))
                this.leaderGrids.push(grid);
            grid.queries("O,2O,IIH,IHH");
        }
    };
    RelatiAI.prototype.roleStatusStore = function () {
        var cache = new Array(this.game.board.gridList.length);
        for (var i = 0; i < cache.length; i++) {
            var role = this.game.board.gridList[i].role;
            if (role)
                cache[i] = role.status["relati-repeater"];
        }
        return cache;
    };
    RelatiAI.prototype.roleStatusRestore = function (cache) {
        for (var i = 0; i < cache.length; i++) {
            var role = this.game.board.gridList[i].role;
            if (role)
                role.status["relati-repeater"] = cache[i];
        }
    };
    RelatiAI.prototype.analysis = function () {
        var game = this.game;
        var playersPoint = game.players.map(function () { return 0; });
        for (var i = 0; i < game.players.length; i++) {
            var owner = game.players[i];
            var gridVisited = [];
            for (var _i = 0, _a = game.board.gridList; _i < _a.length; _i++) {
                var grid = _a[_i];
                if (!grid.role)
                    continue;
                var isValid = (grid.role.status["relati-launcher"] ||
                    grid.role.status["relati-repeater"]);
                if (grid.role.owner == owner && isValid)
                    gridVisited.push(grid);
            }
            var controllablGrids = [];
            var controllablePoint = 100;
            var controllableGridFinded = false;
            do {
                controllablGrids = [];
                controllableGridFinded = false;
                for (var _b = 0, _c = game.board.gridList; _b < _c.length; _b++) {
                    var grid = _c[_b];
                    if (grid.role || gridVisited.indexOf(grid) > -1)
                        continue;
                    var nearByGrids = grid.queries("O");
                    for (var _d = 0, nearByGrids_1 = nearByGrids; _d < nearByGrids_1.length; _d++) {
                        var nearByGrid = nearByGrids_1[_d];
                        if (gridVisited.indexOf(nearByGrid) > -1) {
                            controllableGridFinded = true;
                            controllablGrids.push(grid);
                            playersPoint[i] += controllablePoint;
                            for (var j = 0; j < game.players.length; j++) {
                                if (i != j)
                                    playersPoint[j] -= controllablePoint;
                            }
                            break;
                        }
                    }
                }
                gridVisited = gridVisited.concat(controllablGrids);
                controllablePoint--;
            } while (controllableGridFinded);
        }
        return playersPoint;
    };
    RelatiAI.prototype.bestStep = function (playerIndex, nowPlayerIndex, level, alpha, beta) {
        var game = this.game;
        console.groupCollapsed(game.players[nowPlayerIndex].badge, level);
        var cache = this.roleStatusStore();
        if (nowPlayerIndex == playerIndex) {
            for (var _i = 0, _a = game.board.gridList; _i < _a.length; _i++) {
                var grid = _a[_i];
                if (grid.role || !RelatiRules.RelatiBySource.allow({
                    game: game, grid: grid, owner: game.players[nowPlayerIndex]
                }))
                    continue;
                grid.role = new RelatiRole(game.players[nowPlayerIndex], grid);
                grid.role.status["relati-receiver"] = true;
                for (var _b = 0, _c = this.leaderGrids; _b < _c.length; _b++) {
                    var leaderGrid = _c[_b];
                    leaderGrid.role.effects[0].do({ game: game, grid: grid });
                }
                if (level) {
                    var result = this.bestStep(playerIndex, (nowPlayerIndex + 1) % game.players.length, level - 1, alpha, beta);
                }
                else {
                    var playerPoint = this.analysis()[playerIndex];
                    var result = { point: playerPoint, grid: grid };
                }
                console.log(grid.coordinate, result.point);
                // Relati.RelatiView.updateBoardView(game.board, game.view);
                // debugger;
                delete grid.role;
                result.grid = grid;
                this.roleStatusRestore(cache);
                if (alpha.point < result.point)
                    alpha = result;
                if (beta.point <= alpha.point)
                    break;
            }
            console.groupEnd();
            return alpha;
        }
        else {
            for (var _d = 0, _e = game.board.gridList; _d < _e.length; _d++) {
                var grid = _e[_d];
                if (grid.role || !RelatiRules.RelatiBySource.allow({
                    game: game, grid: grid, owner: game.players[nowPlayerIndex]
                }))
                    continue;
                grid.role = new RelatiRole(game.players[nowPlayerIndex], grid);
                grid.role.status["relati-receiver"] = true;
                for (var _f = 0, _g = this.leaderGrids; _f < _g.length; _f++) {
                    var leaderGrid = _g[_f];
                    leaderGrid.role.effects[0].do({ game: game, grid: grid });
                }
                if (level) {
                    var result = this.bestStep(playerIndex, (nowPlayerIndex + 1) % game.players.length, level - 1, alpha, beta);
                }
                else {
                    var playerPoint = this.analysis()[playerIndex];
                    var result = { point: playerPoint, grid: grid };
                }
                console.log(grid.coordinate, result.point);
                // Relati.RelatiView.updateBoardView(game.board, game.view);
                // debugger;
                delete grid.role;
                result.grid = grid;
                this.roleStatusRestore(cache);
                if (beta.point > result.point)
                    beta = result;
                if (beta.point <= alpha.point)
                    break;
            }
            console.groupEnd();
            return beta;
        }
    };
    return RelatiAI;
}());
//# sourceMappingURL=RelatiAI.js.map
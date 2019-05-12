/// <reference path="base/GridBoard.d.ts" />
/// <reference path="base/Relati.d.ts" />

var { RelatiRules, RelatiRole } = Relati;
type RelatiGame = Relati.RelatiGame;
type RelatiGrid = Relati.RelatiGrid;
type RelatiRole = Relati.RelatiRole;
type RelatiPlayer = Relati.RelatiPlayer;

class RelatiAI {
    public leaderGrids: RelatiGrid[] = [];
    constructor(public game: RelatiGame) { }

    initialize() {
        var { game } = this;

        for (var grid of game.board.gridList) {
            if (
                grid.role &&
                grid.role.is("relati-launcher")
            ) this.leaderGrids.push(grid);
            grid.queries("O,2O,IIH,IHH");
        }
    }

    roleStatusStore() {
        var cache: boolean[] = new Array(this.game.board.gridList.length);

        for (var i = 0; i < cache.length; i++) {
            var role = this.game.board.gridList[i].role;
            if (role) cache[i] = role.status["relati-repeater"];
        }

        return cache;
    }

    roleStatusRestore(cache: boolean[]) {
        for (var i = 0; i < cache.length; i++) {
            var role = this.game.board.gridList[i].role;
            if (role) role.status["relati-repeater"] = cache[i];
        }
    }

    analysis() {
        var { game } = this;
        var playersPoint = game.players.map(() => 0);

        for (var i = 0; i < game.players.length; i++) {
            var owner = game.players[i];
            var gridVisited: RelatiGrid[] = [];

            for (var grid of game.board.gridList) {
                if (!grid.role) continue;

                var isValid = (
                    grid.role.status["relati-launcher"] ||
                    grid.role.status["relati-repeater"]
                );

                if (grid.role.owner === owner && isValid) gridVisited.push(grid);
            }

            var controllablGrids = [];
            var controllablePoint = 100;
            var controllableGridFinded = false;

            do {
                controllablGrids = [];
                controllableGridFinded = false;

                for (var grid of game.board.gridList) {
                    if (grid.role || gridVisited.indexOf(grid) > -1) continue;
                    var nearByGrids = grid.queries("O");

                    for (var nearByGrid of nearByGrids) {
                        if (gridVisited.indexOf(nearByGrid) > -1) {
                            controllableGridFinded = true;
                            controllablGrids.push(grid);
                            playersPoint[i] += controllablePoint;

                            for (var j = 0; j < game.players.length; j++) {
                                if (i != j) playersPoint[j] -= controllablePoint;
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
    }

    bestStep(
        playerIndex: number,
        nowPlayerIndex: number,
        level: number,
        alpha: { point: number, grid: RelatiGrid },
        beta: { point: number, grid: RelatiGrid }
    ) {
        var { game } = this;

        // console.groupCollapsed(game.players[nowPlayerIndex].badge, level);
        var cache = this.roleStatusStore();

        if (nowPlayerIndex === playerIndex) {
            for (var grid of game.board.gridList) {
                if (grid.role || !RelatiRules.RelatiBySource.allow({
                    game, grid, owner: game.players[nowPlayerIndex]
                })) continue;

                grid.role = new RelatiRole(game.players[nowPlayerIndex], grid);
                grid.role.status["relati-receiver"] = true;

                for (var leaderGrid of this.leaderGrids) {
                    (<RelatiRole>leaderGrid.role).effects[0].do({ game, grid });
                }

                if (level) {
                    var result = this.bestStep(
                        playerIndex,
                        (nowPlayerIndex + 1) % game.players.length,
                        level - 1, alpha, beta
                    );
                } else {
                    var playerPoint = this.analysis()[playerIndex];
                    var result = { point: playerPoint, grid };
                }

                // console.log(grid.coordinate, result.point);
                // Relati.RelatiView.updateBoardView(game.board, game.view);
                // debugger;
                delete grid.role;
                result.grid = grid;

                this.roleStatusRestore(cache);

                if (alpha.point < result.point) alpha = result;
                if (beta.point <= alpha.point) break;
            }

            // console.groupEnd();

            return alpha;
        } else {
            for (var grid of game.board.gridList) {
                if (grid.role || !RelatiRules.RelatiBySource.allow({
                    game, grid, owner: game.players[nowPlayerIndex]
                })) continue;

                grid.role = new RelatiRole(game.players[nowPlayerIndex], grid);
                grid.role.status["relati-receiver"] = true;

                for (var leaderGrid of this.leaderGrids) {
                    (<RelatiRole>leaderGrid.role).effects[0].do({ game, grid });
                }

                if (level) {
                    var result = this.bestStep(
                        playerIndex,
                        (nowPlayerIndex + 1) % game.players.length,
                        level - 1, alpha, beta
                    );
                } else {
                    var playerPoint = this.analysis()[playerIndex];
                    var result = { point: playerPoint, grid };
                }

                // console.log(grid.coordinate, result.point);
                // Relati.RelatiView.updateBoardView(game.board, game.view);
                // debugger;
                delete grid.role;
                result.grid = grid;

                this.roleStatusRestore(cache);

                if (beta.point > result.point) beta = result;
                if (beta.point <= alpha.point) break;
            }

            // console.groupEnd();

            return beta;
        }
    }
}
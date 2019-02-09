/// <reference path="base/GridBoard.d.ts" />
/// <reference path="base/SVGOperation.d.ts" />
/// <reference path="base/TicTac.d.ts" />

namespace Relati {
    export class RelatiGame {
        public turn = 0;
        public players: RelatiPlayer[] = [];
        public status: string = "";
        public view: { [name: string]: SVGElement } = {};

        constructor(public board: RelatiBoard) { }

        getNowPlayer() {
            var totalPlayer = this.players.length;
            return this.players[this.turn % totalPlayer];
        }

        selectGrid(grid: RelatiGrid) {
            if (grid.role && grid.role.owner) return;
            var owner = this.getNowPlayer();
            var game = this;

            if (this.turn < this.players.length) {
                grid.role = new RelatiRoles.RelatiLeader(owner, grid);
                grid.role.gain("relati-launcher");
            } else if (RelatiRules.RelatiBySource.allow({ game, grid, owner })) {
                grid.role = new RelatiRole(owner, grid);
                grid.role.gain("relati-receiver");
            } else return;

            this.turn++;

            for (let grid of this.board.gridList) {
                if (!grid.role) continue;

                for (var effect of grid.role.effects) {
                    effect.do({ game, grid, owner });
                }
            }

            var enemy = this.getNowPlayer();

            if (this.turn >= this.players.length) {
                for (var grid of this.board.gridList) {
                    if (!grid.role && RelatiRules.RelatiBySource.allow({
                        game, grid, owner: enemy
                    })) return;
                }

                this.status = owner.badge + " Win";

                for (var grid of this.board.gridList) {
                    if (!grid.role && RelatiRules.RelatiBySource.allow({
                        game, grid, owner
                    })) return;
                }

                this.status = "Draw";
            }
        }
    }

    export interface RelatiGameState {
        game?: RelatiGame,
        owner?: RelatiPlayer,
        grid?: RelatiGrid
    }
}
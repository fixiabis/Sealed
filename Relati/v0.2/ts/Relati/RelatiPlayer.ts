namespace Relati {
    export class RelatiPlayer {
        constructor(
            public game: RelatiGame,
            public badge: string
        ) { }

        selectGrid(grid: RelatiGrid) {
            var nowPlayer = this.game.getNowPlayer();
            if (nowPlayer != this) return;
            this.game.selectGrid(grid);
        }
    }
}
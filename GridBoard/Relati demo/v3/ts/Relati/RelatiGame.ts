namespace Relati {
    export class RelatiGame {
        public turn = 0;

        constructor(public board: RelatiBoard, public players: RelatiPlayer[]) {
            for (var player of this.players) {
                RelatiActions.Shuffle.action({ owner: player });

                for (var i = 0; i < 5; i++) {
                    var card = player.deck.pop();
                    if (card) player.hand.push(
                        card
                    );
                }
            }
        }

        nowPlayer() {
            return this.players[this.turn % 2];
        }
    }

    export interface RelatiGameState {
        game?: RelatiGame,
        owner?: RelatiPlayer,
        grid?: RelatiGrid
    }
}
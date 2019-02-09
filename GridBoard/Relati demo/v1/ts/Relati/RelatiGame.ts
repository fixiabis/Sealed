namespace Relati {
    export class RelatiGame {
        public turn = 0;
        public players = [
            new RelatiPlayer("O"),
            new RelatiPlayer("X")
        ];

        constructor(public board: RelatiBoard) {
            var cardCount = Math.ceil(board.width * board.height / 2) - 1;

            for (var player of this.players) {
                player.hand.cards.push(RelatiCards.Leader);

                for (var i = 0; i < cardCount; i++) {
                    player.deck.cards.push(RelatiCards.Normal);
                }
            }
        }

        getNowPlayer(): RelatiPlayer {
            return this.players[this.turn % 2];
        }
    }
}
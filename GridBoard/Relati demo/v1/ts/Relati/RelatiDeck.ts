namespace Relati {
    export class RelatiDeck {
        public cards: RelatiCard[] = [];

        shuffle() {
            for (var cardIndex = 0; cardIndex < this.cards.length; cardIndex++) {
                var randomIndex = Math.floor(Math.random() * this.cards.length);
                var card = this.cards[cardIndex];
                this.cards[cardIndex] = this.cards[randomIndex];
                this.cards[randomIndex] = card;
            }
        }
    }
}
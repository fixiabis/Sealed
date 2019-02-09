namespace Relati {
    export namespace RelatiActions {
        export var Shuffle: RelatiAction = {
            action({ owner }) {
                if (!owner) return;

                for (var cardIndex = 0; cardIndex < owner.deck.length; cardIndex++) {
                    var swapCardIndex = Math.floor(Math.random() * owner.deck.length);
                    var card = owner.deck[cardIndex];
                    var swapCard = owner.deck[swapCardIndex];
                    owner.deck[cardIndex] = swapCard;
                    owner.deck[swapCardIndex] = card;
                }
            }
        }
    }
}
namespace Relati {
    export type RelatiPlayerSymbol = "O" | "X";
    export class RelatiPlayer {
        constructor(public ownerSymbol: RelatiPlayerSymbol) { };
        public deck: RelatiDeck = new RelatiDeck();
        public used: RelatiDeck = new RelatiDeck();
        public hand: RelatiDeck = new RelatiDeck();
    }
}
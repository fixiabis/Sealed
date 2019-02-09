namespace Relati {
    export class RelatiGame {
        public turn = 1;

        constructor(public board: RelatiBoard) { }

        getNowPlayerSymbol():RelatiRoleOwnerSymbol {
            return this.turn % 2 == 1 ? "O" : "X";
        }
    }
}
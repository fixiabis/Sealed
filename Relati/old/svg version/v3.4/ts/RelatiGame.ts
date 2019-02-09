namespace lib {
    export interface RelatiGame {
        turn: number;
        players: number;
        board: RelatiBoard;
        reset(): void;
        findNextStep(sym: string): RelatiGrid[];
        nowPlayerSymbol(): string;
        allPlayerPlaced(): boolean;
        findWinner(): string;
    }

    var symbol = "OX";

    export class RelatiGame {

        turn: number = 0;

        /**
         * @constructor
         * @param width 寬度
         * @param height 長度
         * @param container SVG容器
         */

        constructor(width: number, height: number, players: number, container: HTMLElement) {
            var board: RelatiBoard = new RelatiBoard(width, height);

            board.viewer.appendIn(container);
            window.addEventListener("resize", function () {
                board.viewer.resize(container);
            });

            this.board = board;
            this.players = players;
        }

        reset() {
            this.turn = 0;
            this.board.clean();
        }

        findNextStep(sym: string) {
            var result: RelatiGrid[] = [];

            for (var crd in this.board.gridOf) {
                var grid = this.board[crd];
                if (grid.is("space") && grid.by("relati", sym).length > 0) {
                    result.push(grid);
                }
            }

            return result;
        }

        nowPlayerSymbol() {
            return symbol[this.turn % this.players];
        }

        allPlayerPlaced() {
            return this.turn >= this.players;
        }

        findWinner() {
            var notEliminate = "";

            for (var i = 0; i < this.players; i++) {
                var sym = symbol[i];

                if (this.findNextStep(sym).length > 0) {
                    notEliminate += sym;
                }
            }

            if (notEliminate.length === 0) return "Draw";
            if (notEliminate.length === 1) return notEliminate + " win";

            return "";
        }
    }
}
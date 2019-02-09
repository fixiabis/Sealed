namespace lib {
    export var game: RelatiGame = new RelatiGame(9, 9, 2, document.body);
    var board: RelatiBoard = game.board;

    /**
     * 當棋盤格被選取時，經規則判定後放置符號，並確認勝負
     * @param grid
     */

    board.viewer.onselect = function (grid: RelatiGrid): void {
        if (!grid.is("space")) return;

        var sym: string = game.nowPlayerSymbol();

        board.viewer.backgroundFixed = false;
        board.viewer.removeBackground();

        if (!game.allPlayerPlaced()) {
            grid.symbol = sym;
            grid.status = "source";
        } else if (grid.by("relati", sym).length > 0) {
            grid.symbol = sym;
        } else return;

        board.viewer.backgroundFixed = true;

        board.forbid();
        game.turn++;

        if (game.allPlayerPlaced()) {
            var result: string = game.findWinner();

            if (result) {
                new MessageBox(result, {
                    "OK": function (this: MessageBox) {
                        game.reset();
                        this.remove(document.body);
                    }
                }).appendIn(document.body);
            }
        }

        var sym = game.nowPlayerSymbol();

        board.find("space").forEach(function (grid: RelatiGrid) {
            grid.symbol = "";
        });

        game.findNextStep(sym).forEach(function (grid: RelatiGrid) {
            grid.status = `${sym}.next`;
        });

        var analysisResult: RelatiAnalysis["Result"] = RelatiAnalysis(game);
        console.log(analysisResult);

        if (sym === "X") {
            var crd = lib.RelatiBestStep(
                game, 2,
                { point: -Infinity },
                { point: Infinity },
                sym, "O", sym
            ).crd;

            if (board.viewer.onselect && crd) {
                board.viewer.onselect(board[crd]);
            }
        }
    };
}
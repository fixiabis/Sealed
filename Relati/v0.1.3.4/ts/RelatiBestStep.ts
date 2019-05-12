namespace lib {
    var level = 3;

    interface RelatiBestStep {
        crd?: string;
        point: number;
        [name: string]: any;
    }

    /**
     * 查詢最佳的位置
     * @param depth 查詢深度
     * @param a alpha值
     * @param b beta值
     * @param own 我方
     * @param oth 他方
     * @param sym 持有方
     */

    export function RelatiBestStep(
        game: RelatiGame,
        depth: number,
        a: RelatiBestStep,
        b: RelatiBestStep,
        own: string,
        oth: string,
        sym: string
    ): RelatiBestStep {
        var board = game.board;
        var nextGrid = game.findNextStep(own);

        if (!game.allPlayerPlaced() && nextGrid.length === 0) {
            nextGrid = board.find("space");
        }

        if (own === sym) {
            for (var grid of nextGrid) {
                grid.prop.symbol = own;
                if (!game.allPlayerPlaced()) grid.prop.status = "source";
                board.forbid();

                /* if (depth > 0) {
                    console.log(
                        " ".repeat(4 * (level - depth)) + `${own}\t${grid.crd}`
                    );
                } */

                var result = depth
                    ? RelatiBestStep(game, depth - 1, a, b, oth, own, sym)
                    : RelatiAnalysis(game);

                result.crd = grid.crd;
                result.point = result[own].point - result[oth].point;

                /* if (depth > 0) {
                    console.log(
                        " ".repeat(4 * (level - depth)) + `${result.crd} ${result.point}\t${a.point}\t${b.point}`
                    );
                } else {
                    console.log(
                        " ".repeat(4 * (level - depth)) + `${own}\t${grid.crd}\t${result.point}\t${a.point}\t${b.point}`
                    );
                } */

                grid.prop.symbol = "";
                board.forbid();

                if (a.point < result.point) a = <RelatiBestStep>result;
                if (b.point <= a.point) break;
            }

            return a;
        } else {
            for (var grid of nextGrid) {
                grid.prop.symbol = own;
                if (!game.allPlayerPlaced()) grid.prop.status = "source";
                board.forbid();

                /* if (depth > 0) {
                    console.log(
                        " ".repeat(4 * (level - depth)) + `${own}\t${grid.crd}`
                    );
                } */

                var result = depth
                    ? RelatiBestStep(game, depth - 1, a, b, oth, own, sym)
                    : RelatiAnalysis(game);

                result.crd = grid.crd;
                result.point = result[oth].point - result[own].point;

                /* if (depth > 0) {
                    console.log(
                        " ".repeat(4 * (level - depth)) + `${result.crd} ${result.point}\t${a.point}\t${b.point}`
                    );
                } else {
                    console.log(
                        " ".repeat(4 * (level - depth)) + `${own}\t${grid.crd}\t${result.point}\t${a.point}\t${b.point}`
                    );
                } */

                grid.prop.symbol = "";
                board.forbid();

                if (b.point > result.point) b = <RelatiBestStep>result;
                if (b.point <= a.point) break;
            }

            return b;
        }
    }
}
namespace lib {
    export interface RelatiAnalysis {
        (board: RelatiBoard): RelatiAnalysis["Result"],
        Result: {
            [sym: string]: {
                nextGrids: RelatiGrid[][],
                otherArea: RelatiGrid[],
                ownerArea: RelatiGrid[],
                point: number
            }
        }
    }

    /**
     * 分析所有空白
     * @param board 棋盤
     * @param sym 符號
     * @returns 分數, 可設置的符號，對方的區域
     */

    export function RelatiAnalysis(game: RelatiGame): RelatiAnalysis["Result"] {
        var board = game.board;
        var space: RelatiGrid[] = board.find("space");
        var result: RelatiAnalysis["Result"] = {};

        ["O", "X"].forEach(function (sym) {
            var nextGrids: RelatiGrid[][] = [];
            var otherArea: RelatiGrid[] = [];

            do {
                var changed: boolean = false;
                var nextGrid: RelatiGrid[] = space.filter(function (grid: RelatiGrid) {
                    return grid.is("space") &&
                        grid.by("relati", sym).length > 0;
                });

                if (nextGrid.length > 0) {
                    changed = true;
                    nextGrids.push(nextGrid);
                    nextGrid.forEach(function (grid: RelatiGrid) {
                        grid.symbol = sym;
                    });
                }

                board.find("owner forbid", sym).forEach(function (grid: RelatiGrid) {
                    if (grid.by("relati", sym).length) {
                        grid.status = "normal";
                    }
                });
            } while (changed);

            space.forEach(function (grid: RelatiGrid) {
                if (grid.is("space")) {
                    otherArea.push(grid);
                } else {
                    grid.symbol = "";
                }
            });

            board.forbid();

            result[sym] = {
                nextGrids,
                otherArea,
                ownerArea: [],
                point: 0
            };
        });

        result.Public = {
            nextGrids: [],
            otherArea: [
                ...result.O.otherArea,
                ...result.X.otherArea
            ],
            ownerArea: [],
            point: 0
        };

        result.O.ownerArea = result.X.otherArea.filter(function (grid: RelatiGrid) {
            var exist = false;

            result.O.nextGrids.forEach(function (grids) {
                if (grids.indexOf(grid) > -1) exist = true;
            });

            return exist;
        });

        result.X.ownerArea = result.O.otherArea.filter(function (grid: RelatiGrid) {
            var exist = false;

            result.X.nextGrids.forEach(function (grids) {
                if (grids.indexOf(grid) > -1) exist = true;
            });

            return exist;
        });

        var length = Math.min(result.O.nextGrids.length, result.X.nextGrids.length);

        for (var i = 0; i < length; i++) {
            result.Public.nextGrids[i] = result.O.nextGrids[i].filter(
                (grid: RelatiGrid) => result.X.nextGrids[i].indexOf(grid) > -1
            );
            result.Public.ownerArea = result.Public.ownerArea.concat(result.Public.nextGrids[i]);
        }

        ["O", "X"].forEach(function (sym: string) {
            result[sym].nextGrids.forEach(
                function (grids: RelatiGrid[], i: number) {
                    result[sym].point += -(4 ** i) * grids.length;
                }
            );

            result[sym].point -= result[sym].otherArea.length * 10;

            if (!result[sym].point) result[sym].point = -3e22;
        });

        return result;
    }
}
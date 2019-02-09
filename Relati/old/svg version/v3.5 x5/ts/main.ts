namespace lib {
    var { RelatiBoard, SymtusSymbol } = lib;

    export var turn = 0;
    export var symbols: SymtusSymbolType[] = ["O", "X"];
    export var board = new RelatiBoard(5, 5);

    board.viewer.appendIn(document.body);
    board.viewer.onselect = function (grid: RelatiGrid) {
        var sym: SymtusSymbol = SymtusSymbol[symbols[turn % 2]];

        if (grid.is("space") && turn < symbols.length ||
            grid.by("relati-normal", sym).length > 0
        ) {
            grid.symbol = sym;
        } else return;

        turn++;

        if (turn >= symbols.length) {
            var nextGrid = findNextGrid(SymtusSymbol[symbols[turn % 2]]);

            if (nextGrid.length === 0 && turn !== 25) {
                console.log(sym + " win");
            } else if (turn === 25) {
                console.log("draw");
            }
        }

        if (sym === SymtusSymbol.O) {
            (<Function>board.viewer.onselect)(
                board[findBestStep(
                    SymtusSymbol.X,
                    SymtusSymbol.X,
                    SymtusSymbol.O,
                    1,
                    { point: -Infinity },
                    { point: Infinity }
                ).crd]
            );
        }
    };

    export function findNextGrid(sym: SymtusSymbol) {
        var nextGrid = [];

        for (var crd in board.gridOf) {
            var grid = board[crd];

            if (grid.is("space") && (
                turn < symbols.length ||
                grid.by("relati-normal", sym).length > 0
            )) {
                nextGrid.push(grid);
            }
        }

        return nextGrid;
    }

    export function analysis(own: SymtusSymbol, oth: SymtusSymbol) {
        var result: { [name: number]: any, [name: string]: any } = {};
        var space: RelatiGrid[] = [];

        for (var crd in board.gridOf) {
            var grid = board[crd];

            if (grid.is("space")) {
                space.push(grid);
            }
        }

        [SymtusSymbol.O, SymtusSymbol.X].forEach(function (sym: SymtusSymbol) {
            var nextGrids: RelatiGrid[][] = [];
            var otherArea: RelatiGrid[] = [];
            var point: number = 0;

            do {
                var changed = false;
                var nextGrid: RelatiGrid[] = [];

                for (var grid of space) {
                    if (!grid.is("space")) continue;

                    if (grid.by("relati-normal", sym).length > 0) {
                        nextGrid.push(grid);
                    }
                }

                nextGrid.forEach(function (grid: RelatiGrid) {
                    changed = true;
                    grid.symbol = sym;
                });

                if (changed) {
                    nextGrids.push(nextGrid);
                    point -= nextGrids.length * nextGrid.length;
                }
            } while (changed);

            for (var grid of space) {
                if (grid.is("space")) {
                    otherArea.push(grid);
                } else {
                    grid.symbol = SymtusSymbol.space;
                }
            }

            point -= otherArea.length * 100;

            result[sym] = { nextGrids, otherArea, point };
        });

        result.point = result[own].point - result[oth].point;

        return result;
    }

    type objectAny = { [name: string]: any };

    export function findBestStep(
        sym: SymtusSymbol,
        own: SymtusSymbol,
        oth: SymtusSymbol,
        depth: number,
        alpha: objectAny,
        beta: objectAny
    ) {
        var nextGrid = findNextGrid(own);

        if (own === sym) {
            for (var grid of nextGrid) {
                grid.symbol = own;
                turn++;
                // debugger;

                if (depth) {
                    // console.log("  ".repeat(2 - depth), SymtusSymbol[grid.symbol], grid.crd);
                    var result: objectAny = findBestStep(sym, oth, own, depth - 1, alpha, beta);
                } else {
                    var result: objectAny = analysis(own, oth);
                    result.crds = [];
                }

                result.crd = grid.crd;
                result.crds.push(grid.crd);

                // if (depth) {
                //     console.log("  ".repeat(2 - depth), result.point);
                // } else {
                //     console.log("  ".repeat(2 - depth), SymtusSymbol[grid.symbol], grid.crd, result.point);
                // }

                // console.log("  ".repeat(2 - depth), result);

                grid.symbol = SymtusSymbol.space;
                turn--;

                if (alpha.point < result.point) Object.assign(alpha, result);
                if (beta.point <= alpha.point) break;
            }

            return alpha;
        } else {
            var oldBeta = beta;
            beta = {};
            Object.assign(beta, oldBeta);

            for (var grid of nextGrid) {
                grid.symbol = own;
                turn++;
                // debugger;

                if (depth) {
                    // console.log("  ".repeat(2 - depth), SymtusSymbol[grid.symbol], grid.crd);
                    var result: objectAny = findBestStep(sym, oth, own, depth - 1, alpha, beta);
                } else {
                    var result: objectAny = analysis(oth, own);
                    result.crds = [];
                }

                result.crd = grid.crd;
                result.crds.push(grid.crd);

                // if (depth) {
                //     console.log("  ".repeat(2 - depth), result.point);
                // } else {
                //     console.log("  ".repeat(2 - depth), SymtusSymbol[grid.symbol], grid.crd, result.point);
                // }

                // console.log("  ".repeat(2 - depth), result);

                grid.symbol = SymtusSymbol.space;
                turn--;

                if (beta.point > result.point) Object.assign(beta, result);
                if (beta.point <= alpha.point) break;
            }

            return beta;
        }
    }

    window.addEventListener("resize", () => board.viewer.resize());
}
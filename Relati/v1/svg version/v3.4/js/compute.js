var level = 0;

/**
 * 分析所有空白
 * @param {string} sym 符號
 * @returns 分數, 可設置的符號，對方的區域
 */

function analysis(sym) {
    var space = board.find("space");

    var point = 0;
    var nextGrids = [];
    var otherArea = [];

    do {
        var changed = false;
        var nextGrid = space.filter(function (grid) {
            return grid.is("space") &&
                grid.by("relati", sym).length > 0;
        });

        if (nextGrid.length > 0) {
            changed = true;
            point += nextGrid.length * -nextGrids.length;
            nextGrids.push(nextGrid);
            nextGrid.forEach(function (grid) {
                grid.symbol = sym;
            });
        }

        board.find("owner forbid", sym).forEach(function (grid) {
            if (grid.by("relati", sym).length) grid.status = "normal";
        });
    } while (changed);

    space.forEach(function (grid) {
        if (grid.is("space")) {
            otherArea.push(grid);
        } else {
            grid.symbol = "";
        }
    });

    board.forbid();

    point -= otherArea.length * 100;

    return {
        point: point,
        nextGrids: nextGrids,
        otherArea: otherArea
    };
}

/**
 * 查詢最佳的位置
 * @param {number} depth 查詢深度
 * @param {object} a alpha值
 * @param {object} b beta值
 * @param {string} own 我方
 * @param {string} oth 他方
 * @param {string} sym 持有方
 */

function compute(depth, a, b, own, oth, sym) {
    var nextGrid = game.findNextGrid(sym) || board.find("space");

    if (own === sym) {
        for (var grid of nextGrid) {
            grid.symbol = sym;
            if (!game.allPlayerReady()) grid.status = "source";
            board.forbid();

            if (depth > 0) {
                console.log(
                    " ".repeat(4 * (level - depth)) + `${own}\t${grid.crd}`
                );
            }

            var result = depth
                ? compute(depth - 1, a, b, oth, own, sym)
                : { O: analysis("O"), X: analysis("X") };

            result.crd = grid.crd;
            result.point = result[own].point - result[oth].point;

            if (depth > 0) {
                console.log(
                    " ".repeat(4 * (level - depth)) + `${result.point}\t${a.point}\t${b.point}`
                );
            } else {
                console.log(
                    " ".repeat(4 * (level - depth)) + `${own}\t${grid.crd}\t${result.point}\t${a.point}\t${b.point}`
                );
            }

            grid.symbol = "";
            board.forbid();

            if (a.point < result.point) a = result;
            if (b.point <= a.point) break;
        }

        return a;
    } else {
        for (var grid of nextGrid) {
            grid.symbol = sym;
            if (!game.allPlayerReady()) grid.status = "source";
            board.forbid();

            if (depth > 0) {
                console.log(
                    " ".repeat(4 * (level - depth)) + `${own}\t${grid.crd}`
                );
            }

            var result = depth
                ? compute(depth - 1, a, b, oth, own, sym)
                : { O: analysis("O"), X: analysis("X") };

            result.crd = grid.crd;
            result.point = result[oth].point - result[own].point;

            if (depth > 0) {
                console.log(
                    " ".repeat(4 * (level - depth)) + `${result.point}\t${a.point}\t${b.point}`
                );
            } else {
                console.log(
                    " ".repeat(4 * (level - depth)) + `${own}\t${grid.crd}\t${result.point}\t${a.point}\t${b.point}`
                );
            }

            grid.symbol = "";
            board.forbid();

            if (b.point > result.point) b = result;
            if (b.point <= a.point) break;
        }

        return b;
    }
}
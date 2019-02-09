namespace lib {
    var { RelatiBoard, SymtusSymbol } = lib;

    export var turn = 0;
    export var symbols: SymtusSymbolType[] = ["O", "X"];
    export var board = new RelatiBoard(9, 9);
    // export var bulletSelect = false;

    function relati(grid: RelatiGrid, sym: SymtusSymbol, list: RelatiGrid[]) {
        if (list.indexOf(grid) > -1) return;
        list.push(grid);
        var grids = grid.by("relati", sym);
        for (let grid of grids) relati(grid, sym, list);
    }

    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function relatiPath(sym: SymtusSymbol) {
        var list: RelatiGrid[] = [];
        var nowTurn = turn;

        for (var crd in board.gridOf) {
            var grid = board[crd];

            if (grid.is("source") && grid.is("owner", sym)) {
                relati(grid, sym, list);
            }
        }

        board.viewer.backgroundFixed = false;
        board.viewer.backgroundRemove();

        for (let grid of list) {
            await delay(125);
            if (turn !== nowTurn) return;
            grid.by("relati", sym);
        }

        await delay(125);
        if (turn !== nowTurn) return;
        board.viewer.backgroundRemove();
        board.viewer.backgroundFixed = true;
    }

    function nextStep(sym: SymtusSymbol) {
        for (var crd in board.gridOf) {
            var grid = board[crd];

            if (grid.is("space-real") && grid.by("relati", sym).length > 0) {
                board.viewer.appendGridDot(
                    grid, 0.4, SymtusColor[(<SymtusSymbolType>SymtusSymbol[sym])]
                );
            }
        }
    }

    board.viewer.appendIn(document.body);
    board.viewer.backgroundFixed = true;
    board.viewer.onselect = function (grid: RelatiGrid) {
        var sym: SymtusSymbol = SymtusSymbol[symbols[turn % 2]];

        /* if (bulletSelect) {
            if (!grid.is("select")) return;

            grid.to("broken");

            for (var crd in board.gridOf) {
                let grid: RelatiGrid = board[crd];
                if (grid.is("select")) grid.to("normal");
            }

            bulletSelect = false;
        } */

        if (grid.is("space-real")) {
            if (turn < symbols.length) {
                grid.symbol = sym;
                grid.to("source");
            } else if (grid.by("relati", sym).length > 0) {
                grid.symbol = sym;
            } /* else if (grid.by("escape", sym).length > 0) {
                for (var crd in board.gridOf) {
                    let grid: RelatiGrid = board[crd];

                    if (grid.is("owner", sym) && grid.is("valid")) {
                        grid.to("broken");
                    }
                }

                grid.symbol = sym;
                grid.to("source");
            } */ else return;
        }/*  else {
            var bullets: RelatiGrid[] = grid.by("attack", sym);

            if (bullets.length > 0) {
                bullets.forEach(grid => grid.to("select"));
                bulletSelect = true;
                grid.to("broken");
                return;
            }
        } */

        board.forbid();

        turn++;

        relatiPath(sym);
    };

    window.addEventListener("resize", () => board.viewer.resize());
}
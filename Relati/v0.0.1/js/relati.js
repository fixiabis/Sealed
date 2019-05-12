var board = new ViewableBoard(15, 15, document.body),
    gameRecord = [],
    turn = 1,
    record = [],
    analysisRecord = {},
    relati = {
        root: {},
        dead: [],
        battle: [],
        battleFar: [],
        shield: [],
        relati: {},
        domain: {},
        prevJudge: [],
        setting: {}
    },
    isRelati = function (grid, sym, needList) {
        if (relati.prevJudge.indexOf(grid.crd) > -1 && !needList) return true;
        var relatiCrd = [],
            gridO = grid.getGridsByRelCrd("O"),
            grid2O = grid.getGridsByRelCrd("2O"),
            gridQ = grid.getGridsByRelCrd("IIH,IHH"),
            isOwner = grid => grid && grid._.symbol == sym && grid._.dead == "" && grid._.status != "dead",
            isSpace = grid => grid && (
                grid._.symbol == "" ||
                (grid._.status == "dead" && grid._.dead == "") ||
                (grid._.symbol == sym && grid._.dead == "shield")
            );
        for (var i = 0; i < gridO.length; i++)
            if (isOwner(gridO[i]))
                relatiCrd.push(gridO[i].crd);
        for (var i = 0; i < grid2O.length; i++) {
            if (!isOwner(grid2O[i])) continue;
            if (isSpace(gridO[i]))
                relatiCrd.push(grid2O[i].crd);
        }
        for (var i = 0; i < gridQ.length; i++) {
            if (!isOwner(gridQ[i])) continue;
            var relCrd = grid.getRelCrdByGrid(gridQ[i]),
                SVGrid = grid.getGridByRelCrd(relCrd.replace(/2./, "")),
                DVGrid = grid.getGridByRelCrd(relCrd.replace(/1./, "")),
                DSVGrid = grid.getGridByRelCrd(relCrd.replace(/1./, "").replace("2", "1")),
                HVGrid = grid.getGridByRelCrd(relCrd.replace("2", "1").replace(/1/g, ""));
            if ((isSpace(HVGrid) && (isSpace(SVGrid) || isSpace(DSVGrid))) || isSpace(DSVGrid) && isSpace(DVGrid))
                relatiCrd.push(gridQ[i].crd);
        }
        if (needList) return relatiCrd;
        return relatiCrd.length > 0;
    },
    isEscape = function (grid, sym) {
        var relCrd = ["F", "B", "R", "L", "FR", "BR", "FL", "BL"];
        for (var i = 0; i < relCrd.length; i++)
            for (var j = 1; j < 15; j++) {
                var gridX = grid.getGridByRelCrd(j + relCrd[i]);
                if (!gridX) break;
                if (gridX._.symbol == "") continue;
                if (gridX._.symbol != sym) break;
                if (gridX._.symbol == sym && gridX._.status != "dead") return true;
            }
        return false;
    },
    isBattle = function (grid, sym, needList) {
        var relCrd = ["F", "B", "R", "L", "FR", "BR", "FL", "BL"],
            battleCrd = [];
        if (grid._.status == "dead" && grid._.dead != "") return false;
        for (var i = 0; i < relCrd.length; i++) {
            var j = 1;
            while (true) {
                var gridX = grid.getGridByRelCrd(j + relCrd[i]);
                if (
                    !gridX || gridX._.symbol == "" ||
                    (gridX._.symbol != sym && (
                        gridX._.status != "dead" ||
                        gridX._.dead == "shield")
                    )
                ) break;
                if (gridX._.symbol == sym && gridX._.status != "dead") {
                    var gridX2 = grid.getGridByRelCrd((j + 1) + relCrd[i]);
                    if (!gridX2) break;
                    if (gridX2._.symbol == sym && gridX2._.status != "dead") {
                        if (!needList)
                            relati.battle.push(gridX2.crd);
                        battleCrd.push(gridX2.crd);
                        (function (relCrd) {
                            if (needList) return;
                            gridX2._.direct = relCrd;
                        })(relCrd[i]);
                        break;
                    }
                }
                j++;
            }
        }
        if (needList) return battleCrd;
        return battleCrd.length > 0;
    },
    isBattleFar = function (grid, sym, needList) {
        var relCrd = ["F", "B", "R", "L", "FR", "BR", "FL", "BL"],
            battleFarCrd = [];
        if (grid._.status == "dead" && grid._.dead != "") return false;
        for (var i = 0; i < relCrd.length; i++) {
            var j = 1;
            while (true) {
                var gridX = grid.getGridByRelCrd(j + relCrd[i]);
                if (!gridX) break;
                if (gridX._.symbol != "" && gridX._.symbol != sym) break;
                if (gridX._.symbol == sym)
                    if (gridX._.status != "dead") {
                        var gridX2 = grid.getGridByRelCrd((j + 1) + relCrd[i]);
                        if (!gridX2) break;
                        if (gridX2._.symbol == sym && gridX2._.status != "dead") {
                            if (!needList)
                                relati.battleFar.push([gridX.crd, gridX2.crd]);
                            battleFarCrd.push([gridX.crd, gridX2.crd]);
                            (function (relCrd) {
                                if (needList) return;
                                gridX._.direct = relCrd;
                                gridX2._.direct = relCrd;
                            })(relCrd[i]);
                            break;
                        }
                    } else break;
                j++;
            }
        }
        if (needList) return battleFarCrd;
        return battleFarCrd.length > 0;
    },
    isSheild = function (grid) {
        if (grid._.status == "") return true;
        return false;
    },
    relatiTree = function (grid, sym, parent) {
        var relatiCrd = isRelati(grid, sym, true);
        if (relati.relati[sym].indexOf(grid.crd) > -1) return;
        relati.relati[sym].push(grid.crd);
        relati.relati.all.push(grid.crd);
        for (var i = 0; i < relatiCrd.length; i++)
            relatiTree(board.grids[relatiCrd[i]], sym, grid);
    },
    spaceAreaTree = function (grid, space, index) {
        if (space.visited.indexOf(grid.crd) > -1) return;
        space.visited.push(grid.crd);
        if (index == -1) {
            index = space.area.length;
            space.area.push([grid.crd]);
        } else space.area[index].push(grid.crd);
        var gridO = grid.getGridsByRelCrd("O");
        for (var i = 0; i < gridO.length; i++)
            if (gridO[i] && gridO[i]._.symbol == "")
                spaceAreaTree(gridO[i], space, index);
    },
    resetJudge = function () {
        for (var i in board.grids) {
            board.grids[i]._.status = "";
            board.grids[i]._.area = "";
            board.grids[i]._.dead = "";
        }
    },
    battleJudge = function () {
        for (var i = 0; i < relati.dead.length; i++) {
            board.grids[relati.dead[i]]._.status = "dead";
            board.grids[relati.dead[i]]._.dead = "battle";
        }
        for (var i = 0; i < relati.battleFar.length; i++)
            for (var j = 0; j < relati.battleFar[i].length; j++)
                board.grids[relati.battleFar[i][j]]._.status = "arrow";
        for (var i = 0; i < relati.battle.length; i++)
            board.grids[relati.battle[i]]._.status = "spear";
    },
    shieldJudge = function () {
        for (var i = 0; i < relati.shield.length; i++)
            board.grids[relati.shield[i]]._.dead = "shield";
    },
    escapeJudge = function () {
        var rootCrd = [
            record.indexOf(relati.root.O),
            record.indexOf(relati.root.X)
        ];
        for (var i = 0; i < record.length; i++) {
            if (i >= rootCrd[i % 2] || !board.grids[record[i]]) continue;
            board.grids[record[i]]._.status = "dead";
            board.grids[record[i]]._.dead = "battle";
        }
    },
    relatiJudge = function () {
        relati.relati = { all: [], O: [], X: [] };
        relati.prevJudge = [];
        for (var sym in relati.root) {
            if (board.grids[relati.root[sym]]._.status == "dead") continue;
            board.grids[relati.root[sym]]._.status = "root";
            relatiTree(board.grids[relati.root[sym]], sym);
        }
        do {
            var gridHasChange = false;
            for (var i = 0; i < record.length; i++) {
                var crd = record[i],
                    grid = board.grids[crd],
                    sym = grid && grid._.symbol;
                if (
                    !grid || grid._.status == "root" || grid._.dead != "" || sym == ""
                ) continue;
                if (relati.relati.all.indexOf(crd) == -1) {
                    var noRelati = true,
                        relatiCrd = isRelati(grid, sym, true);
                    for (var j = 0; j < relatiCrd.length; j++)
                        if (relati.relati[sym].indexOf(relatiCrd[j]) > -1) {
                            noRelati = false;
                            gridHasChange = true;
                            relatiTree(grid, sym, board.grids[relatiCrd[j]]);
                            break;
                        }
                    if (noRelati) {
                        if (grid._.status != "dead") gridHasChange = true;
                        grid._.status = "dead";
                    } else {
                        if (grid._.status != "") gridHasChange = true;
                        grid._.status = "";
                    }
                }
            }
        } while (gridHasChange);
    },
    domainJudge = function () {
        var space = { O: [], X: [], P: [], N: [], all: [], visited: [], area: [] },
            sym = turn % 2 == 0 ? "X" : "O",
            prevJudge = [];
        relati.domain = { O: [], X: [] };
        for (var i in relati.domain)
            for (var crd in board.grids) {
                var grid = board.grids[crd];
                if (grid._.symbol != "") continue;
                if (space.all.indexOf(crd) < 0)
                    space.all.push(crd);
                var isRelatiGrid = isRelati(grid, i);
                if (isRelatiGrid) {
                    if (isRelatiGrid && i == sym) prevJudge.push(crd);
                    space[i].push(crd);
                    if (i == "X" && space.O.indexOf(crd) > -1)
                        space.P.push(crd);
                } else space.N.push(crd);
            }
        relati.prevJudge = prevJudge;
        if (prevJudge.length == 0)
            alert((sym == "O" ? "X" : "O") + "贏了");
        for (var i in relati.domain)
            space[i] = space[i].filter(crd => space.P.indexOf(crd) < 0);
        for (var i = 0; i < space.all.length; i++)
            spaceAreaTree(board.grids[space.all[i]], space, -1);
        for (var i = 0; i < space.area.length; i++) {
            var belong = ""
            P: for (var j = 0; j < space.area[i].length; j++)
                for (var sym in relati.domain)
                    if (space[sym].indexOf(space.area[i][j]) > -1) {
                        if (belong == "")
                            belong = sym;
                        else if (belong != sym) {
                            belong = "P"
                            break P;
                        }
                    } else if (space.P.indexOf(space.area[i][j]) > -1) {
                        belong = "P";
                        break P;
                    }
            if (belong != "P" && belong != "")
                relati.domain[belong] = relati.domain[belong].concat(space.area[i]);
        }
        for (var sym in relati.domain)
            for (var i = 0; i < relati.domain[sym].length; i++)
                board.grids[relati.domain[sym][i]]._.area = sym;
    },
    recordBoard = function () {
        var newRecord = {
            turn: turn,
            record: [],
            relati: {
                root: {
                    O: relati.root.O,
                    X: relati.root.X
                },
                dead: [],
                battle: [],
                battleFar: [],
                shield: []
            },
            boardGrid: {}
        };
        for (var i = 0; i < record.length; i++)
            newRecord.record.push(record[i]);
        for (var i = 0; i < relati.dead.length; i++)
            newRecord.relati.dead.push(relati.dead[i]);
        for (var i = 0; i < relati.battle.length; i++)
            newRecord.relati.battle.push(relati.battle[i]);
        for (var i = 0; i < relati.battleFar.length; i++)
            newRecord.relati.battleFar.push(relati.battleFar[i]);
        for (var i = 0; i < relati.shield.length; i++)
            newRecord.relati.shield.push(relati.shield[i]);
        for (var i in board.grids)
            newRecord.boardGrid[i] = board.grids[i]._.symbol; 1
        gameRecord.push(newRecord);
    };
var analysis = function () {
    var relatiable = { O: [], X: [], P: [] },
        battleable = { O: [], X: [] },
        point = {
            relati: { O: 0, X: 0 },
            domain: { O: relati.domain.O.length, X: relati.domain.X.length },
            battle: { O: 0, X: 0 }
        };
    for (var crd in board.grids) {
        if (board.grids[crd]._.status == "dead") continue;
        if (board.grids[crd]._.symbol == "") {
            var syms = "OX";
            for (var i = 0; i < syms.length; i++)
                if (isRelati(board.grids[crd], syms[i], true).length > 0)
                    relatiable[syms[i]].push(crd);
        } else {
            var sym = board.grids[crd]._.symbol == "O" ? "X" : "O";
            if (
                isBattle(board.grids[crd], sym, true).length > 0 ||
                isBattleFar(board.grids[crd], sym, true).length > 0
            ) battleable[sym].push(crd);
        }
    }
    relatiable.P = relatiable.O.filter(crd => relatiable.X.indexOf(crd) > -1);
    relatiable.O = relatiable.O.filter(crd => relatiable.P.indexOf(crd) < 0);
    relatiable.X = relatiable.X.filter(crd => relatiable.P.indexOf(crd) < 0);
    point.relati.O = relatiable.O.length;
    point.relati.X = relatiable.X.length;
    point.battle.O = battleable.O.length;
    point.battle.X = battleable.X.length;
    var type = ["domain", "relati", "battle"],
        typeName = ["領地", "連線", "戰鬥"],
        logData = "";
    for (var i = 0; i < type.length; i++) {
        logData += typeName[i] + "方面:";
        if (point[type[i]].O == point[type[i]].X)
            logData += "勢均力敵";
        else if (point[type[i]].O > point[type[i]].X)
            logData += `O方優先${point[type[i]].O - point[type[i]].X}點`;
        else
            logData += `X方優先${point[type[i]].X - point[type[i]].O}點`;
        logData += "\n";
    }
    if (analysisRecord.relati) {
        var statusName = ["增加領地", "正在擴展", "戰力提升"];
        for (var i = 0; i < type.length; i++) {
            if (analysisRecord[type[i]].O < point[type[i]].O) logData += `O方${statusName[i]}\n`;
            if (analysisRecord[type[i]].X < point[type[i]].X) logData += `X方${statusName[i]}\n`;
        }
    }
    analysisRecord = {
        relati: point.relati,
        domain: point.domain,
        battle: point.battle,
        able: {
            relati: relatiable,
            battle: battleable
        }
    }
    if (battleable.O.indexOf(relati.root.X) > -1) logData += "X方危險了\n";
    if (battleable.X.indexOf(relati.root.O) > -1) logData += "O方危險了\n";
    console.log(logData);
};
board.ongridhover = grid =>
    document.title = `${
    grid.crd
    }${
    grid._.symbol && ":" + grid._.symbol
    }${
    grid._.symbol && (
        "(" + (grid._.status || "node") + (grid._.dead ? "/" + grid._.dead : "") + ")"
    )
    }`;
board.ongridclick = function (grid) {
    var sym = turn % 2 == 0 ? "X" : "O";
    if (grid._.symbol != "") {
        if (grid._.symbol == sym) {
            if (relati.battle.length > 0 || relati.battleFar.length > 0) {
                if (relati.battle.indexOf(grid.crd) > -1) {
                    relati.dead.push(grid.crd);
                    record[record.length - 1] += "-" + grid.crd;
                } else {
                    var isBattleFarGrid = false;
                    for (var i = 0; i < relati.battleFar.length; i++) {
                        if (relati.battleFar[i].indexOf(grid.crd) > -1) {
                            for (var j = 0; j < relati.battleFar[i].length; j++)
                                relati.dead.push(relati.battleFar[i][j]);
                            record[record.length - 1] += "-" + relati.battleFar[i].toString().replace(",", "&");
                            isBattleFarGrid = true;
                        }
                    }
                    if (!isBattleFarGrid) return;
                }
                for (var i = 0; i < relati.battle.length; i++)
                    board.grids[relati.battle[i]]._.status = "";
                for (var i = 0; i < relati.battleFar.length; i++)
                    for (var j = 0; j < relati.battleFar[i].length; j++)
                        board.grids[relati.battleFar[i][j]]._.status = "";
                relati.battle = [];
                relati.battleFar = [];
            } else if (isSheild(grid)) {
                relati.dead.push(grid.crd);
                relati.shield.push(grid.crd);
                record.push(grid.crd);
            } else return;
            turn++;
        } else {
            var isBattleGrid = isBattle(grid, sym),
                isBattleFarGrid = isBattleFar(grid, sym);
            if (isBattleGrid || isBattleFarGrid) {
                relati.dead.push(grid.crd);
                record.push(grid.crd);
            } else return;
        }
    } else if (relati.battle.length < 1 && relati.battleFar.length < 1) {
        var isRelatiGrid = isRelati(grid, sym, true);
        if (isRelatiGrid.length > 0 || turn < 3) {
            if (turn < 3) {
                relati.root[sym] = grid.crd;
                grid._.status = "root";
            }
            grid._.symbol = sym;
            record.push(grid.crd);
            turn++;
        } else if (isEscape(grid, sym)) {
            grid._.status = "root";
            relati.root[sym] = grid.crd;
            grid._.symbol = sym;
            record.push(grid.crd);
            turn++;
        } else return;
    } else return;
    recordBoard();
    resetJudge();
    if (turn > 2) {
        escapeJudge();
        battleJudge();
        shieldJudge();
        relatiJudge();
        domainJudge();
        analysis();
    }
    board.refresh();
};
board.onclean = function () {
    for (var i in board.grids) {
        board.grids[i]._.dead = "";
        board.grids[i]._.status = "";
        board.grids[i]._.symbol = "";
    }
};
board.gameStart();
window.onkeydown = function (event) {
    if (event.which == 90 && event.ctrlKey) {
        var oldRecord = gameRecord.pop();
        if (oldRecord.turn == turn)
            oldRecord = gameRecord.pop();
        if (!oldRecord) return;
        for (var i in oldRecord.relati)
            relati[i] = oldRecord.relati[i];
        record = oldRecord.record;
        turn = oldRecord.turn;
        for (var i in oldRecord.boardGrid)
            board.grids[i]._.symbol = oldRecord.boardGrid[i];
        resetJudge();
        if (turn > 2) {
            escapeJudge();
            battleJudge();
            shieldJudge();
            relatiJudge();
            domainJudge();
            analysis();
        }
        board.refresh();
    }
};
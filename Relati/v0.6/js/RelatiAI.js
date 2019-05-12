(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const space = 0b00000000;
    const RelatiLauncher = 0b00010000;
    const RelatiRepeater = 0b00001000;
    const RelatiReceiver = 0b00000100;
    class RelatiAI {
        analysis(board, owner) {
            let boardWidth = board.width;
            let boardHeight = board.height;
            let boardLength = board.length;
            let ownerGrid = new Int8Array(boardLength);
            let otherGrid = new Int8Array(boardLength);
            let hasGrid;
            let gridPoint = 100;
            let ownerPoint = 0;
            let otherPoint = 0;
            for (let i = 0; i < boardLength; i++) {
                let grid = board[i];
                if (!grid)
                    continue;
                if ((grid & owner) == owner) {
                    ownerGrid[i] = 101;
                }
                else {
                    otherGrid[i] = 101;
                }
            }
            do {
                hasGrid = false;
                for (let x = 0; x < boardWidth; x++) {
                    for (let y = 0; y < boardHeight; y++) {
                        let i = board.getIdx(x, y);
                        if (ownerGrid[i] == gridPoint + 1) {
                            for (let dx = x - 1; dx < x + 2; dx++) {
                                for (let dy = y - 1; dy < y + 2; dy++) {
                                    if (dx == x && dy == y ||
                                        dx < 0 || dy < 0 ||
                                        dx >= boardWidth ||
                                        dy >= boardHeight)
                                        continue;
                                    let idx = board.getIdx(dx, dy);
                                    let grid = board[idx];
                                    if (grid || ownerGrid[idx])
                                        continue;
                                    ownerGrid[idx] = gridPoint;
                                    hasGrid = true;
                                }
                            }
                        }
                        if (otherGrid[i] == gridPoint + 1) {
                            for (let dx = x - 1; dx < x + 2; dx++) {
                                for (let dy = y - 1; dy < y + 2; dy++) {
                                    if (dx == x && dy == y ||
                                        dx < 0 || dy < 0 ||
                                        dx >= boardWidth ||
                                        dy >= boardHeight)
                                        continue;
                                    let idx = board.getIdx(dx, dy);
                                    let grid = board[idx];
                                    if (grid || otherGrid[idx])
                                        continue;
                                    otherGrid[idx] = gridPoint;
                                    hasGrid = true;
                                }
                            }
                        }
                    }
                }
                gridPoint--;
            } while (hasGrid);
            for (let i = 0; i < boardLength; i++) {
                if (!ownerGrid[i])
                    ownerGrid[i] = board[i] ? 0 : 1;
                if (!otherGrid[i])
                    otherGrid[i] = board[i] ? 0 : 1;
                ownerPoint += ownerGrid[i] - (otherGrid[i] -
                    ownerGrid[i]) * 10;
                otherPoint += otherGrid[i] - (ownerGrid[i] -
                    otherGrid[i]) * 10;
            }
            return { ownerPoint, otherPoint };
        }
        syncTraceStep(board, owner, other, level, route = [], isOwn = true, inOwn = { point: -Infinity, in: owner, route: [] }, inOth = { point: Infinity, in: other, route: [] }) {
            console.groupCollapsed(`start level: ${level}, isOwn: ${isOwn}`);
            if (isOwn) {
                for (let x = 0; x < board.width; x++) {
                    for (let y = 0; y < board.height; y++) {
                        let idx = board.getIdx(x, y);
                        let grid = board[idx];
                        if (grid)
                            continue;
                        if (!isRelati(x, y, owner, board))
                            continue;
                        board[idx] = owner | RelatiRepeater;
                        if (level) {
                            console.log(idx);
                            let step = this.syncTraceStep(board, owner, other, level - 1, [...route, idx], !isOwn, inOwn, inOth);
                            if (inOwn.point < step.point)
                                inOwn = Object.assign({}, step, { idx });
                        }
                        else {
                            let point = this.analysis(board, owner).ownerPoint;
                            if (inOwn.point < point)
                                inOwn = {
                                    in: owner, idx,
                                    point, route: [...route, idx]
                                };
                        }
                        board[idx] = space;
                        console.log(inOwn);
                        // if (inOth.point <= inOwn.point) break;
                    }
                }
                console.groupEnd();
                return inOwn;
            }
            else {
                for (let x = 0; x < board.width; x++) {
                    for (let y = 0; y < board.height; y++) {
                        let idx = board.getIdx(x, y);
                        let grid = board[idx];
                        if (grid)
                            continue;
                        if (!isRelati(x, y, other, board))
                            continue;
                        board[idx] = other | RelatiRepeater;
                        if (level) {
                            console.log(idx);
                            let step = this.syncTraceStep(board, owner, other, level - 1, [...route, idx], !isOwn, inOwn, inOth);
                            if (inOth.point > step.point)
                                inOth = Object.assign({}, step, { idx });
                        }
                        else {
                            let point = this.analysis(board, owner).ownerPoint;
                            if (inOth.point > point)
                                inOth = {
                                    in: other, idx,
                                    point, route: [...route, idx]
                                };
                        }
                        board[idx] = space;
                        console.log(inOth);
                        // if (inOth.point <= inOwn.point) break;
                    }
                }
                console.groupEnd();
                return inOth;
            }
        }
        getGridCoor(idx, board) {
            let [x, y] = board.getCoor(idx);
            return `${String.fromCharCode(x + 65)}${y + 1}`;
        }
    }
    exports.RelatiAI = RelatiAI;
    class BinaryBoard extends Int8Array {
        constructor(board) {
            if (board instanceof BinaryBoard) {
                super(board.length);
                for (let i = 0; i < board.length; i++) {
                    this[i] = board[i];
                }
            }
            else {
                super(board.gridList.length);
                for (let i = 0; i < board.gridList.length; i++) {
                    let grid = board.gridList[i];
                    if (!grid.role)
                        continue;
                    let binRole = space;
                    if (grid.role.owner.name == "O")
                        binRole = 0b00000001;
                    else
                        binRole = 0b00000010;
                    if (grid.role.is("relati-launcher"))
                        binRole |= RelatiLauncher;
                    if (grid.role.is("relati-repeater"))
                        binRole |= RelatiRepeater;
                    if (grid.role.is("relati-receiver"))
                        binRole |= RelatiReceiver;
                    this[i] = binRole;
                }
            }
            this.width = board.width;
            this.height = board.height;
        }
        getCoor(i) {
            let y = i % this.height;
            let x = (i - y) / this.width;
            return [x, y];
        }
        getIdx(x, y) {
            return x * this.width + y;
        }
        getGrid(x, y) {
            return this[this.getIdx(x, y)];
        }
    }
    exports.BinaryBoard = BinaryBoard;
    function isRelati(x, y, owner, board) {
        let boardWidth = board.width;
        let boardHeight = board.height;
        for (let dx = x - 1; dx < x + 2; dx++) {
            for (let dy = y - 1; dy < y + 2; dy++) {
                if (dx == x && dy == y ||
                    dx < 0 || dy < 0 ||
                    dx >= boardWidth ||
                    dy >= boardHeight)
                    continue;
                let grid = board.getGrid(dx, dy);
                if ((grid & owner) == owner &&
                    (grid & RelatiRepeater) == RelatiRepeater)
                    return true;
            }
        }
        return false;
    }
});
// symbolN 0b000xxx00
// symbolO 0b000xxx01
// symbolX 0b000xxx10
// source  0b0001xx00
// normal  0b00001100
// frozen  0b00000100

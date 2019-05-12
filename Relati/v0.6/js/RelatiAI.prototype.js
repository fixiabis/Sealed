(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./base/GridBoard", "./rules/RoleSummon"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const GridBoard_1 = require("./base/GridBoard");
    const RoleSummon_1 = require("./rules/RoleSummon");
    class RelatiAI {
        constructor(game, RoleConstructors) {
            this.game = game;
            this.RoleConstructors = RoleConstructors;
        }
        analysis(board, owner) {
            let ownerGrid = {};
            let otherGrid = {};
            let hasGrid;
            let gridPoint = 100;
            let ownerPoint = 0;
            let otherPoint = 0;
            for (let grid of board.gridList) {
                if (!grid.role)
                    continue;
                let { coordinate } = grid;
                if (grid.role.owner == owner) {
                    ownerGrid[coordinate] = 101;
                }
                else {
                    otherGrid[coordinate] = 101;
                }
            }
            do {
                hasGrid = false;
                for (let grid of board.gridList) {
                    let { coordinate } = grid;
                    if (ownerGrid[coordinate] == gridPoint + 1) {
                        for (let nearBy of grid.queries("O")) {
                            if (!nearBy || nearBy.role || ownerGrid[nearBy.coordinate])
                                continue;
                            ownerGrid[nearBy.coordinate] = gridPoint;
                            hasGrid = true;
                        }
                    }
                    if (otherGrid[coordinate] == gridPoint + 1) {
                        for (let nearBy of grid.queries("O")) {
                            if (!nearBy || nearBy.role || otherGrid[nearBy.coordinate])
                                continue;
                            otherGrid[nearBy.coordinate] = gridPoint;
                            hasGrid = true;
                        }
                    }
                }
                gridPoint--;
            } while (hasGrid);
            for (let { coordinate } of board.gridList) {
                if (!ownerGrid[coordinate])
                    ownerGrid[coordinate] = 1;
                if (!otherGrid[coordinate])
                    otherGrid[coordinate] = 1;
                ownerPoint += ownerGrid[coordinate] - (otherGrid[coordinate] -
                    ownerGrid[coordinate] + 1) * 10;
                otherPoint += otherGrid[coordinate] - (ownerGrid[coordinate] -
                    otherGrid[coordinate] + 1) * 10;
            }
            return { ownerPoint, otherPoint };
        }
        cloneBoard(board) {
            let { width, height } = board;
            let cloneBoard = new GridBoard_1.GridBoard(width, height);
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    let grid = board.grids[x][y];
                    let { role } = grid;
                    if (!role)
                        continue;
                    let { owner } = role;
                    let RoleConstructor = role.constructor;
                    let cloneRole = new RoleConstructor(cloneBoard.grids[x][y], owner);
                    for (let name in role.status)
                        cloneRole.status[name] = role.status[name];
                    for (let name in role.points)
                        cloneRole.points[name] = role.points[name];
                    for (let name in role.params)
                        cloneRole.params[name] = role.params[name];
                    for (let name in role.skills)
                        cloneRole.skills[name] = role.skills[name];
                    cloneBoard.grids[x][y].role = cloneRole;
                }
            }
            return cloneBoard;
        }
        printBoard(board, type = "dev-console") {
            let first = true;
            if (type == "dev-console") {
                let colorO = "color: crimson";
                let colorX = "color: royalblue";
                let colorF = "color: #666";
                let colorB = "color: #888";
                let printParams = ["%c", colorB];
                for (let y = 0; y < board.height; y++) {
                    if (first)
                        first = false;
                    else
                        printParams[0] += "\n";
                    printParams[0] += "|";
                    for (let x = 0; x < board.width; x++) {
                        let grid = board.grids[x][y];
                        if (!grid.role)
                            printParams[0] += "   ";
                        else {
                            printParams[0] += ` %c${grid.role.owner.name} `;
                            if (!grid.role.is("relati-repeater")) {
                                printParams.push(colorF);
                            }
                            else if (grid.role.owner.name == "O") {
                                printParams.push(colorO);
                            }
                            else if (grid.role.owner.name == "X") {
                                printParams.push(colorX);
                            }
                            else {
                                printParams.push(colorB);
                            }
                        }
                        printParams[0] += "%c|";
                        printParams.push(colorB);
                    }
                }
                console.log(...printParams);
            }
            if (type == "node-console") {
                let printString = "";
                for (let y = 0; y < board.height; y++) {
                    if (first)
                        first = false;
                    else
                        printString += "\n";
                    printString += "|";
                    for (let x = 0; x < board.width; x++) {
                        let grid = board.grids[x][y];
                        if (!grid.role)
                            printString += "   ";
                        else {
                            printString += ` ${grid.role.owner.name} `;
                        }
                        printString += "|";
                    }
                }
                console.log(printString);
            }
        }
        async traceStep(board, owner, other, level, route = [], isOwn = true, inOwn = { point: -Infinity, title: "inOwn", route: [] }, inOth = { point: Infinity, title: "inOth", route: [] }) {
            if (isOwn) {
                let steps = await Promise.all(board.gridList.map(grid => new Promise(async (resolve) => {
                    let { coordinate: coor } = grid;
                    if (grid.role)
                        return resolve({
                            point: -Infinity, coor,
                            title: "inOwn", route
                        });
                    let role = new this.RoleConstructors[0](grid, owner);
                    if (!RoleSummon_1.RoleSummon.allow({
                        game: this.game, role,
                        allowCache: false
                    }))
                        return resolve({
                            point: -Infinity, coor,
                            title: "inOwn", route
                        });
                    let cloneBoard = this.cloneBoard(board);
                    grid = cloneBoard.grids[grid.x][grid.y];
                    role.grid = grid;
                    grid.role = role;
                    role.gain("relati-repeater");
                    if (level) {
                        let result = await this.traceStep(cloneBoard, owner, other, level - 1, [...route, coor], !isOwn, inOwn, inOth);
                        result.coor = coor;
                        return resolve(result);
                    }
                    let point = this.analysis(cloneBoard, owner).ownerPoint;
                    return resolve({
                        point, coor, title: "inOwn",
                        route: [...route, coor]
                    });
                })));
                for (let step of steps) {
                    if (inOwn.point < step.point)
                        inOwn = Object.assign({}, step);
                    if (inOth.point <= inOwn.point)
                        break;
                }
                inOwn.steps = steps;
                return inOwn;
            }
            else {
                let steps = await Promise.all(board.gridList.map(grid => new Promise(async (resolve) => {
                    let { coordinate: coor } = grid;
                    if (grid.role)
                        return resolve({
                            point: Infinity, coor,
                            title: "inOth", route
                        });
                    let role = new this.RoleConstructors[0](grid, other);
                    if (!RoleSummon_1.RoleSummon.allow({
                        game: this.game, role,
                        allowCache: false
                    }))
                        return resolve({
                            point: Infinity, coor,
                            title: "inOth", route
                        });
                    let cloneBoard = this.cloneBoard(board);
                    grid = cloneBoard.grids[grid.x][grid.y];
                    role.grid = grid;
                    grid.role = role;
                    role.gain("relati-repeater");
                    if (level) {
                        let result = await this.traceStep(cloneBoard, owner, other, level - 1, [...route, coor], !isOwn, inOwn, inOth);
                        result.coor = coor;
                        return resolve(result);
                    }
                    let point = this.analysis(cloneBoard, owner).ownerPoint;
                    return resolve({
                        point, coor,
                        title: "inOth",
                        route: [...route, coor]
                    });
                })));
                for (let step of steps) {
                    if (inOth.point > step.point)
                        inOth = Object.assign({}, step);
                    if (inOth.point <= inOwn.point)
                        break;
                }
                inOth.steps = steps;
                return inOth;
            }
        }
    }
    exports.RelatiAI = RelatiAI;
});

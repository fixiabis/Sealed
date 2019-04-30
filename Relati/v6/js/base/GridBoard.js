/**
 * @overview 可供查詢的棋盤與棋盤格
 * @author fixiabis <fixiabis@github.com>
 * @version 1.2
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
    /** 棋盤格查詢暫存器 */
    var GridQueryCache = /** @class */ (function () {
        function GridQueryCache() {
            /** 查詢結果暫存(單數) */
            this._queryCache = {};
            /** 查詢結果暫存(複數) */
            this._queriesCache = {};
        }
        /** 暫存查詢結果(單數) */
        GridQueryCache.prototype._cacheQueryResult = function (command, result) {
            return this._queryCache[command] = result;
        };
        /** 暫存查詢結果(複數) */
        GridQueryCache.prototype._cacheQueriesResult = function (commmands, results) {
            return this._queriesCache[commmands] = results;
        };
        return GridQueryCache;
    }());
    /** 棋盤格 */
    var Grid = /** @class */ (function (_super) {
        __extends(Grid, _super);
        /**
         * 建立棋盤格，並設置座標
         * @param board 所屬棋盤
         * @param x 數學X座標
         * @param y 數學Y座標
         */
        function Grid(
        /** 所屬棋盤 */
        board, 
        /** X軸座標 */
        x, 
        /** Y軸座標 */
        y) {
            var _this = _super.call(this) || this;
            _this.board = board;
            _this.x = x;
            _this.y = y;
            _this.coordinate = "" + String.fromCharCode(x + 65) + (y + 1);
            return _this;
        }
        /**
         * 使用相對座標進行棋盤格查詢，查詢後暫存，
         * 若下次有相同查詢請求時將直接返回查詢結果
         * 相對座標格式:
         *     "F" = (y - 1)
         *     "B" = (y + 1)
         *     "R" = (x + 1)
         *     "L" = (x - 1)
         * @param directionCommand 相對座標指令(單數)
         *
         * @example
         * // 一般:取得前方(y - 1)的棋盤格
         * query("F");
         * // 一般:取得前方(y - 2)兩單位的棋盤格
         * query("FF");
         *
         * @example
         * // 單位:取得後方二單位(x - 2)的棋盤格
         * query("2B");
         *
         * @example
         * // 多向:取得左前方(x - 1, y - 1)的棋盤格
         * query("FL");
         *
         * @example
         * // 反向:取得右後方反向(x + -1, y + -1)的棋盤格(即左前方)
         * query("-BR");
         */
        Grid.prototype.query = function (directionCommand) {
            if (!directionCommand)
                return;
            if (this._queryCache[directionCommand]) {
                return this._queryCache[directionCommand];
            }
            var _a = this, x = _a.x, y = _a.y, board = _a.board;
            var unitCarried = 1;
            var unit = 1;
            for (var _i = 0, directionCommand_1 = directionCommand; _i < directionCommand_1.length; _i++) {
                var direction = directionCommand_1[_i];
                switch (direction) {
                    case "F":
                        unitCarried = 1;
                        y -= unit;
                        break;
                    case "B":
                        unitCarried = 1;
                        y += unit;
                        break;
                    case "R":
                        unitCarried = 1;
                        x += unit;
                        break;
                    case "L":
                        unitCarried = 1;
                        x -= unit;
                        break;
                    case "-":
                        unitCarried = 1;
                        unit *= -1;
                        break;
                    default:
                        var unitValue = parseInt(direction);
                        var unitSign = Math.sign(unit);
                        if (isNaN(unitValue))
                            break;
                        if (unitCarried === 1)
                            unit = unitValue * unitSign;
                        else
                            unit = (Math.abs(unit) * 10 + unitValue) * unitSign;
                        unitCarried++;
                        break;
                }
            }
            return this._cacheQueryResult(directionCommand, board.grids[x] && board.grids[x][y]);
        };
        /**
         * 使用相對座標進行棋盤格查詢，查詢後暫存，
         * 若下次有相同查詢請求時將直接返回查詢結果
         * 相對座標格式擴充:
         *     "," 分隔多個相對座標
         *     "I" = F,B
         *     "H" = R,L
         *     "T" = I,H
         *     "X" = IH
         *     "O" = T,X
         *     ";" 分隔多個相對座標指令
         * @param directionCommands 相對座標指令(複數)
         *
         * @example
         * // 一般:取得前方(y - 1)與後方(y + 1)的棋盤格
         * queries("F,B");
         *
         * @example
         * // 簡寫:取得前方(y - 1)與後方(y + 1)的棋盤格
         * queries("I");
         * // 簡寫:取得左方(x - 1)與右方(x + 1)的棋盤格
         * queries("H");
         * // 簡寫:取得四方
         * // 四方:前(y - 1), 後(y + 1), 左(x - 1), 右(x + 1)
         * queries("T");
         * // 簡寫:取得斜四方的棋盤格
         * // 斜四方:右前(x + 1, y - 1), 左前(x - 1, y - 1), 右後(x + 1, y + 1), 左後(x - 1, y + 1)
         * queries("X");
         * // 簡寫: 取得八方的棋盤格
         * // 八方: 四方與斜四方
         * queries("O");
         *
         * @example
         * // 多向簡寫:取得右前方(x + 1, y - 1)與右後方(x + 1, y + 1)的棋盤格
         * queries("IR");
         * // 多向簡寫:取得前一單位的斜四方的棋盤格
         * queries("FX");
         *
         * @example
         * // 指令分離:取得前後方與左右方
         * queries("I;H");
         *
         * // 一般查詢與指令分離的差異
         * // 一般查詢時，會將所有簡寫皆轉換為對應，再開始查詢
         * // 指令分離查詢，會先將指令分離，再開始進行一般查詢
         *
         * // 一般查詢過程:
         * //         I,H
         * //       /     \
         * //    F,H       B,H
         * //   /   \     /   \
         * // F,R   F,L B,R   B,L => F,R,F,L,B,R,B,L
         *
         * // 指令分離查詢過程
         * //     I;H
         * //    /   \
         * //   I     H
         * //  / \   / \
         * // F   B R   L => F,B,R,L
         *
         * @example
         * // 範圍:取得前方從一至三單位
         * queries("~3F");
         * // 範圍:取得前方從二至四單位
         * queries("2~4F");
         * // 範圍:取得前方從四至二單位
         * queries("4~2F");
         * // 範圍:取得前方從三至一單位
         * queries("3~F");
         */
        Grid.prototype.queries = function (directionCommands) {
            if (!directionCommands)
                return [];
            if (this._queriesCache[directionCommands]) {
                return this._queriesCache[directionCommands];
            }
            var simplifyDirectionList = Grid.simplifyDirectionList, originalDirectionLists = Grid.originalDirectionLists;
            var gridList = [];
            if (directionCommands.indexOf(";") > -1) {
                for (var _i = 0, _a = directionCommands.split(";"); _i < _a.length; _i++) {
                    var directionCommand = _a[_i];
                    gridList = gridList.concat(this.queries(directionCommand));
                }
                return this._cacheQueriesResult(directionCommands, gridList);
            }
            for (var i = 0; i < simplifyDirectionList.length; i++) {
                var simplifyDirection = simplifyDirectionList[i];
                if (!directionCommands.match(simplifyDirection))
                    continue;
                for (var _b = 0, _c = originalDirectionLists[i]; _b < _c.length; _b++) {
                    var originalDirection = _c[_b];
                    gridList = gridList.concat(this.queries(directionCommands.replace(simplifyDirection, originalDirection)));
                }
                return this._cacheQueriesResult(directionCommands, gridList);
            }
            if (directionCommands.indexOf(",") > -1) {
                for (var _d = 0, _e = directionCommands.split(","); _d < _e.length; _d++) {
                    var directionCommand = _e[_d];
                    gridList = gridList.concat(this.queries(directionCommand));
                }
                return this._cacheQueriesResult(directionCommands, gridList);
            }
            if (directionCommands.indexOf("~") > -1) {
                var commands = directionCommands.split("~");
                var unitRanges = commands.map(function (unit) { return parseInt(unit) || 1; });
                var direction = commands[1].replace(/\d+/, "");
                if (unitRanges[0] > unitRanges[1]) {
                    for (var unit = unitRanges[0]; unit >= unitRanges[1]; unit--) {
                        gridList.push(this.query(unit + direction));
                    }
                }
                else {
                    for (var unit = unitRanges[0]; unit <= unitRanges[1]; unit++) {
                        gridList.push(this.query(unit + direction));
                    }
                }
                return this._cacheQueriesResult(directionCommands, gridList);
            }
            return this._cacheQueriesResult(directionCommands, [this.query(directionCommands)]);
        };
        /**
         * 簡寫座標轉換為一般座標
         * @param directionCommands 相對座標指令(複數)
         *
         * @example
         * // 取得 ["FFR", "FFL", "BRR", "BLL"]
         * getOriginalDirection("IIH");
         */
        Grid.getOriginalDirection = function (directionCommands) {
            var simplifyDirectionList = Grid.simplifyDirectionList, originalDirectionLists = Grid.originalDirectionLists;
            var directions = [];
            for (var i = 0; i < simplifyDirectionList.length; i++) {
                var simplifyDirection = simplifyDirectionList[i];
                if (!directionCommands.match(simplifyDirection))
                    continue;
                for (var _i = 0, _a = originalDirectionLists[i]; _i < _a.length; _i++) {
                    var originalDirection = _a[_i];
                    directions = directions.concat(Grid.getOriginalDirection(directionCommands.replace(simplifyDirection, originalDirection)));
                }
                return directions;
            }
            return [directionCommands];
        };
        /** 複數查詢簡化語法 */
        Grid.simplifyDirectionList = [/I/g, /H/g, /T/g, /X/g, /O/g];
        /** 複數查詢簡化語法對應 */
        Grid.originalDirectionLists = [
            ["F", "B"], ["R", "L"],
            ["F", "B", "R", "L"],
            ["FR", "FL", "BR", "BL"],
            ["F", "B", "R", "L", "FR", "FL", "BR", "BL"]
        ];
        return Grid;
    }(GridQueryCache));
    exports.Grid = Grid;
    /** 棋盤 */
    var GridBoard = /** @class */ (function (_super) {
        __extends(GridBoard, _super);
        /**
         * 建立棋盤，並依照所給的寬度與長度建立指定數量的棋盤格
         * @param width 棋盤格寬度
         * @param height 棋盤格長度
         */
        function GridBoard(width, height) {
            var _this = _super.call(this) || this;
            _this.width = width;
            _this.height = height;
            /** 棋盤格(二維陣列) */
            _this.grids = [];
            /** 棋盤格(一維陣列) */
            _this.gridList = [];
            for (var x = 0; x < width; x++) {
                var gridRow = [];
                for (var y = 0; y < height; y++) {
                    var grid = new Grid(_this, x, y);
                    gridRow.push(grid);
                    _this.gridList.push(grid);
                    _this._queryCache[grid.coordinate] = grid;
                }
                _this.grids.push(gridRow);
            }
            return _this;
        }
        /**
         * 使用絕對座標進行棋盤格查詢，查詢後暫存，
         * 若下次有相同查詢請求時將直接返回查詢結果
         * 絕對座標格式: x, y 皆從0開始，x為英文字母，從A開始，y為數字，從1開始
         * @param coordinateCommand 絕對座標指令(單數)
         *
         * @example
         * // 一般:取得位於左上角(x = 0, y = 0)的格子
         * query("A1");
         * // 一般:取得位於(x = 4, y = 2)的格子
         * query("E3");
         */
        GridBoard.prototype.query = function (coordinateCommand) {
            if (!coordinateCommand)
                return;
            if (this._queryCache[coordinateCommand]) {
                return this._queryCache[coordinateCommand];
            }
            var coordinate = coordinateCommand;
            var x = coordinate[0].charCodeAt(0) - 65;
            var y = parseInt(coordinate.substr(1, coordinate.length - 1)) - 1;
            return this._cacheQueryResult(coordinateCommand, this.grids[x] && this.grids[x][y]);
        };
        /**
         * 使用絕對座標進行棋盤格查詢，查詢後暫存，
         * 若下次有相同查詢請求時將直接返回查詢結果
         * 絕對座標格式擴充:
         *     "," 分隔多個絕對座標與絕對座標指令
         *     ":" 從前者到後者之間的所有座標
         * @param coordinateCommands 絕對座標指令(複數)
         *
         * @example
         * // 一般:取得A1與D4
         * queries("A1,D4");
         *
         * @example
         * // 單一範圍:取得A列
         * queries("A");
         * // 單一範圍:取得5行
         * queries("5");
         *
         * @example
         * // 複合範圍:取得A列至5行
         * queries("A1:5");
         * // 複合範圍:取得5行至B列
         * queries("A:B5");
         * // 複合範圍:取得A4到B5間的矩型
         * queries("A4:B5");
         *
         * // 複合範圍是具有方向性的，
         * // 雖與上面範例取得的格子皆一樣，但是順序不同
         * queries("A5:B4");
         */
        GridBoard.prototype.queries = function (coordinateCommands) {
            if (!coordinateCommands)
                return [];
            if (this._queriesCache[coordinateCommands]) {
                return this._queriesCache[coordinateCommands];
            }
            var gridList = [];
            var _a = this, width = _a.width, height = _a.height;
            if (coordinateCommands.indexOf(",") > -1) {
                for (var _i = 0, _b = coordinateCommands.split(","); _i < _b.length; _i++) {
                    var coordinate = _b[_i];
                    gridList = gridList.concat(this.queries(coordinate));
                }
                return this._cacheQueriesResult(coordinateCommands, gridList);
            }
            if (coordinateCommands.indexOf(":") > -1) {
                var coordinates = coordinateCommands.split(":");
                var startCoordinate = coordinates[0];
                var endCoordinate = coordinates[1];
                var startX;
                var startY = parseInt(startCoordinate);
                if (!isNaN(startY))
                    startY -= 1;
                else if (startCoordinate.length === 1) {
                    startX = startCoordinate.charCodeAt(0) - 65;
                }
                else {
                    var startGrid = this.query(startCoordinate);
                    if (!startGrid)
                        throw new Error("Grid is not in board");
                    startX = startGrid.x;
                    startY = startGrid.y;
                }
                var endX;
                var endY = parseInt(endCoordinate);
                if (!isNaN(endY))
                    endY -= 1;
                else if (endCoordinate.length === 1) {
                    endX = endCoordinate.charCodeAt(0) - 65;
                }
                else {
                    var endGrid = this.query(endCoordinate);
                    if (!endGrid)
                        throw new Error("Grid is not in board");
                    endX = endGrid.x;
                    endY = endGrid.y;
                }
                if (startX === undefined) {
                    if (endX === undefined) {
                        startX = 0, endX = width;
                    }
                    else
                        startX = endX;
                }
                else if (endX === undefined)
                    endX = startX;
                if (isNaN(startY)) {
                    if (isNaN(endY)) {
                        startY = 0, endY = height;
                    }
                    else
                        startY = endY;
                }
                else if (isNaN(endY))
                    endY = startY;
                if (endX < startX && endY < startY) {
                    for (var x = startX; x >= endX; x--) {
                        for (var y = startY; y >= endY; y--) {
                            var grid = this.grids[x] && this.grids[x][y];
                            gridList.push(grid);
                        }
                    }
                }
                else if (endX < startX) {
                    for (var x = startX; x >= endX; x--) {
                        for (var y = startY; y <= endY; y++) {
                            var grid = this.grids[x] && this.grids[x][y];
                            gridList.push(grid);
                        }
                    }
                }
                else if (endY < startY) {
                    for (var x = startX; x <= endX; x++) {
                        for (var y = startY; y >= endY; y--) {
                            var grid = this.grids[x] && this.grids[x][y];
                            gridList.push(grid);
                        }
                    }
                }
                else {
                    for (var x = startX; x <= endX; x++) {
                        for (var y = startY; y <= endY; y++) {
                            var grid = this.grids[x] && this.grids[x][y];
                            gridList.push(grid);
                        }
                    }
                }
                return this._cacheQueriesResult(coordinateCommands, gridList);
            }
            var y = parseInt(coordinateCommands);
            if (!isNaN(y)) {
                y -= 1;
                for (var x = 0; x < width; x++) {
                    gridList.push(this.grids[x][y]);
                }
                return this._cacheQueriesResult(coordinateCommands, gridList);
            }
            else if (coordinateCommands.length === 1) {
                var x = coordinateCommands.charCodeAt(0) - 65;
                for (var y = 0; y < height; y++) {
                    gridList.push(this.grids[x][y]);
                }
                return this._cacheQueriesResult(coordinateCommands, gridList);
            }
            return this._cacheQueriesResult(coordinateCommands, [this.query(coordinateCommands)]);
        };
        return GridBoard;
    }(GridQueryCache));
    exports.GridBoard = GridBoard;
});

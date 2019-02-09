"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var lib;
(function (lib) {
    var RelatiBoard = lib.RelatiBoard, SymtusSymbol = lib.SymtusSymbol;
    lib.turn = 0;
    lib.symbols = ["O", "X"];
    lib.board = new RelatiBoard(9, 9);
    // export var bulletSelect = false;
    function relati(grid, sym, list) {
        if (list.indexOf(grid) > -1)
            return;
        list.push(grid);
        var grids = grid.by("relati", sym);
        for (var _i = 0, grids_1 = grids; _i < grids_1.length; _i++) {
            var grid_1 = grids_1[_i];
            relati(grid_1, sym, list);
        }
    }
    function delay(ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    }
    function relatiPath(sym) {
        return __awaiter(this, void 0, void 0, function () {
            var list, nowTurn, crd, grid, ms, _i, list_1, grid_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        list = [];
                        nowTurn = lib.turn;
                        for (crd in lib.board.gridOf) {
                            grid = lib.board[crd];
                            if (grid.is("source") && grid.is("owner", sym)) {
                                relati(grid, sym, list);
                            }
                        }
                        lib.board.viewer.backgroundFixed = false;
                        lib.board.viewer.backgroundRemove();
                        nextStep(SymtusSymbol[lib.symbols[lib.turn % 2]]);
                        ms = 750 / list.length;
                        if (ms < 75 || ms > 375)
                            ms = 75;
                        _i = 0, list_1 = list;
                        _a.label = 1;
                    case 1:
                        if (!(_i < list_1.length)) return [3 /*break*/, 4];
                        grid_2 = list_1[_i];
                        if (lib.turn !== nowTurn)
                            return [2 /*return*/];
                        grid_2.by("relati", sym);
                        return [4 /*yield*/, delay(ms)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, delay(ms)];
                    case 5:
                        _a.sent();
                        if (lib.turn !== nowTurn)
                            return [2 /*return*/];
                        lib.board.viewer.backgroundRemove();
                        nextStep(SymtusSymbol[lib.symbols[lib.turn % 2]]);
                        lib.board.viewer.backgroundFixed = true;
                        return [2 /*return*/];
                }
            });
        });
    }
    function nextStep(sym) {
        for (var crd in lib.board.gridOf) {
            var grid = lib.board[crd];
            if (grid.is("space-real") && grid.by("relati", sym).length > 0) {
                lib.board.viewer.appendGridDot(grid, 0.4, lib.SymtusColor[SymtusSymbol[sym]]);
            }
        }
    }
    lib.board.viewer.appendIn(document.body);
    lib.board.viewer.backgroundFixed = true;
    lib.board.viewer.onselect = function (grid) {
        var sym = SymtusSymbol[lib.symbols[lib.turn % 2]];
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
            if (lib.turn < lib.symbols.length) {
                grid.symbol = sym;
                grid.to("source");
            }
            else if (grid.by("relati", sym).length > 0) {
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
            } */
            else
                return;
        }
        else {
            /* var bullets: RelatiGrid[] = grid.by("attack", sym);

            if (bullets.length > 0) {
                bullets.forEach(grid => grid.to("select"));
                bulletSelect = true;
                grid.to("broken"); */
            return;
            /* } */
        }
        lib.board.forbid();
        lib.turn++;
        relatiPath(sym);
    };
    window.addEventListener("resize", function () { return lib.board.viewer.resize(); });
})(lib || (lib = {}));

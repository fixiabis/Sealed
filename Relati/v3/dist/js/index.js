/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./relati/GridBoard.ts":
/*!*****************************!*\
  !*** ./relati/GridBoard.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var GridQueryCacheable = /** @class */ (function () {
    function GridQueryCacheable() {
        this._queryCache = {};
        this._queriesCache = {};
    }
    GridQueryCacheable.prototype._cacheQueryResult = function (command, result) {
        return this._queryCache[command] = result;
    };
    GridQueryCacheable.prototype._cacheQueriesResult = function (commmands, results) {
        return this._queriesCache[commmands] = results;
    };
    GridQueryCacheable.prototype.clearQueryResult = function (command) {
        return delete this._queryCache[command];
    };
    GridQueryCacheable.prototype.clearQueriesResult = function (commands) {
        return delete this._queriesCache[commands];
    };
    return GridQueryCacheable;
}());
exports.GridQueryCacheable = GridQueryCacheable;
var Grid = /** @class */ (function (_super) {
    __extends(Grid, _super);
    function Grid(board, x, y) {
        var _this = _super.call(this) || this;
        _this.board = board;
        _this.x = x;
        _this.y = y;
        _this.coordinate = "" + String.fromCharCode(x + 65) + (y + 1);
        return _this;
    }
    Grid.prototype.query = function (directionCommand) {
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
                    unit *= -1;
                    break;
                default:
                    var unitValue = parseInt(direction);
                    if (isNaN(unitValue))
                        break;
                    if (unitCarried === 1)
                        unit = unitValue;
                    else
                        unit = unit * 10 + unitValue;
                    unitCarried++;
                    break;
            }
        }
        return this._cacheQueryResult(directionCommand, board.grids[x] && board.grids[x][y]);
    };
    Grid.prototype.queries = function (directionCommands) {
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
        return this._cacheQueriesResult(directionCommands, [this.query(directionCommands)]);
    };
    Grid.simplifyDirectionList = [/I/g, /H/g, /T/g, /X/g, /O/g];
    Grid.originalDirectionLists = [
        ["F", "B"], ["R", "L"],
        ["F", "B", "R", "L"],
        ["FR", "FL", "BR", "BL"],
        ["F", "B", "R", "L", "FR", "FL", "BR", "BL"]
    ];
    return Grid;
}(GridQueryCacheable));
exports.Grid = Grid;
var GridBoard = /** @class */ (function (_super) {
    __extends(GridBoard, _super);
    function GridBoard(width, height) {
        var _this = _super.call(this) || this;
        _this.width = width;
        _this.height = height;
        _this.grids = [];
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
    GridBoard.prototype.query = function (coordinateCommand) {
        if (this._queryCache[coordinateCommand]) {
            return this._queryCache[coordinateCommand];
        }
        var coordinate = coordinateCommand;
        var x = coordinate[0].charCodeAt(0) - 65;
        var y = parseInt(coordinate.substr(1, coordinate.length - 1)) - 1;
        return this._cacheQueryResult(coordinateCommand, this.grids[x] && this.grids[x][y]);
    };
    GridBoard.prototype.queries = function (coordinateCommands) {
        if (this._queriesCache[coordinateCommands]) {
            return this._queriesCache[coordinateCommands];
        }
        var gridList = [];
        var _a = this, width = _a.width, height = _a.height;
        if (coordinateCommands === "*")
            return this.gridList;
        if (coordinateCommands.indexOf(",") > -1) {
            for (var _i = 0, _b = coordinateCommands.split(","); _i < _b.length; _i++) {
                var coordinate = _b[_i];
                gridList = gridList.concat(this.queries(coordinate));
            }
            return this._cacheQueriesResult(coordinateCommands, gridList);
        }
        if (coordinateCommands.indexOf(":")) {
            var coordinates = coordinateCommands.split(":");
            var startCoordinate = coordinates[0];
            var endCoordinate = coordinates[1];
            var startGrid = this.query(startCoordinate);
            var endGrid = this.query(endCoordinate);
            var startX = Math.min(startGrid.x, endGrid.x);
            var endX = Math.max(startGrid.x, endGrid.x);
            var startY = Math.min(startGrid.y, endGrid.y);
            var endY = Math.max(startGrid.y, endGrid.y);
            for (var x = startX; x <= endX; x++) {
                for (var y = startY; y <= endY; y++) {
                    var grid = this.grids[x] && this.grids[x][y];
                    gridList.push(grid);
                }
            }
            return this._cacheQueriesResult(coordinateCommands, gridList);
        }
        var y = parseInt(coordinateCommands);
        if (!isNaN(y)) {
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
}(GridQueryCacheable));
exports.GridBoard = GridBoard;


/***/ }),

/***/ "./relati/Relati.ts":
/*!**************************!*\
  !*** ./relati/Relati.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./Relati/RelatiRole */ "./relati/Relati/RelatiRole.ts"));
__export(__webpack_require__(/*! ./Relati/RelatiGame */ "./relati/Relati/RelatiGame.ts"));
__export(__webpack_require__(/*! ./Relati/RelatiPlayer */ "./relati/Relati/RelatiPlayer.ts"));
var RelatiRules = __webpack_require__(/*! ./Relati/RelatiRules */ "./relati/Relati/RelatiRules.ts");
exports.RelatiRules = RelatiRules;
var RelatiRoles = __webpack_require__(/*! ./Relati/RelatiRoles */ "./relati/Relati/RelatiRoles.ts");
exports.RelatiRoles = RelatiRoles;
var RelatiRoleEffects = __webpack_require__(/*! ./Relati/RelatiRoleEffects */ "./relati/Relati/RelatiRoleEffects.ts");
exports.RelatiRoleEffects = RelatiRoleEffects;


/***/ }),

/***/ "./relati/Relati/RelatiGame.ts":
/*!*************************************!*\
  !*** ./relati/Relati/RelatiGame.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var RelatiRules = __webpack_require__(/*! ./RelatiRules */ "./relati/Relati/RelatiRules.ts");
var RelatiRole_1 = __webpack_require__(/*! ./RelatiRole */ "./relati/Relati/RelatiRole.ts");
var RelatiRoles = __webpack_require__(/*! ./RelatiRoles */ "./relati/Relati/RelatiRoles.ts");
var RelatiGame = /** @class */ (function () {
    function RelatiGame(board) {
        this.board = board;
        this.turn = 0;
        this.players = [];
        this.status = "";
    }
    RelatiGame.prototype.getNowPlayer = function () {
        var totalPlayer = this.players.length;
        return this.players[this.turn % totalPlayer];
    };
    RelatiGame.prototype.selectGrid = function (grid) {
        if (grid.role && grid.role.owner)
            return;
        var owner = this.getNowPlayer();
        var game = this;
        if (this.turn < this.players.length) {
            grid.role = new RelatiRoles.RelatiLeader(owner, grid);
            grid.role.gain("relati-launcher");
        }
        else if (RelatiRules.RelatiBySource.allow({ game: game, grid: grid, owner: owner })) {
            grid.role = new RelatiRole_1.RelatiRole(owner, grid);
            grid.role.gain("relati-receiver");
        }
        else
            return;
        this.turn++;
        for (var _i = 0, _a = this.board.gridList; _i < _a.length; _i++) {
            var grid_1 = _a[_i];
            if (!grid_1.role)
                continue;
            for (var _b = 0, _c = grid_1.role.effects; _b < _c.length; _b++) {
                var effect = _c[_b];
                effect.do({ game: game, grid: grid_1, owner: owner });
            }
        }
        var enemy = this.getNowPlayer();
        if (this.turn >= this.players.length) {
            for (var _d = 0, _e = this.board.gridList; _d < _e.length; _d++) {
                var grid = _e[_d];
                if (!grid.role && RelatiRules.RelatiBySource.allow({
                    game: game, grid: grid, owner: enemy
                }))
                    return;
            }
            this.status = owner.badge + " Win";
            for (var _f = 0, _g = this.board.gridList; _f < _g.length; _f++) {
                var grid = _g[_f];
                if (!grid.role && RelatiRules.RelatiBySource.allow({
                    game: game, grid: grid, owner: owner
                }))
                    return;
            }
            this.status = "Draw";
        }
    };
    return RelatiGame;
}());
exports.RelatiGame = RelatiGame;


/***/ }),

/***/ "./relati/Relati/RelatiPlayer.ts":
/*!***************************************!*\
  !*** ./relati/Relati/RelatiPlayer.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var RelatiPlayer = /** @class */ (function () {
    function RelatiPlayer(game, badge) {
        this.game = game;
        this.badge = badge;
    }
    RelatiPlayer.prototype.selectGrid = function (grid) {
        var nowPlayer = this.game.getNowPlayer();
        if (nowPlayer != this)
            return;
        this.game.selectGrid(grid);
    };
    return RelatiPlayer;
}());
exports.RelatiPlayer = RelatiPlayer;


/***/ }),

/***/ "./relati/Relati/RelatiRole.ts":
/*!*************************************!*\
  !*** ./relati/Relati/RelatiRole.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var RelatiRole = /** @class */ (function () {
    function RelatiRole(owner, grid) {
        this.owner = owner;
        this.grid = grid;
        this.type = "normal";
        this.status = {};
        this.effects = [];
        this.actions = [];
    }
    RelatiRole.prototype.is = function (status, type) {
        if (typeof status === "string")
            return this.status[status];
        if (type === "any") {
            for (var _i = 0, status_1 = status; _i < status_1.length; _i++) {
                var statusName = status_1[_i];
                if (this.status[statusName])
                    return true;
            }
            return false;
        }
        else {
            for (var _a = 0, status_2 = status; _a < status_2.length; _a++) {
                var statusName = status_2[_a];
                if (!this.status[statusName])
                    return false;
            }
            return true;
        }
    };
    RelatiRole.prototype.gain = function () {
        var statusList = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            statusList[_i] = arguments[_i];
        }
        for (var _a = 0, statusList_1 = statusList; _a < statusList_1.length; _a++) {
            var status = statusList_1[_a];
            this.status[status] = true;
        }
    };
    RelatiRole.prototype.lost = function () {
        var statusList = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            statusList[_i] = arguments[_i];
        }
        for (var _a = 0, statusList_2 = statusList; _a < statusList_2.length; _a++) {
            var status = statusList_2[_a];
            this.status[status] = false;
        }
    };
    return RelatiRole;
}());
exports.RelatiRole = RelatiRole;
exports.RelatiRoleStatusRelatiRemoteStable = [
    "relati-remote-stable-launcher",
    "relati-remote-stable-repeater",
    "relati-remote-stable-receiver"
];
exports.RelatiRoleStatusRelatiRemoteNormal = [
    "relati-remote-normal-launcher",
    "relati-remote-normal-repeater",
    "relati-remote-normal-receiver"
];
exports.RelatiRoleStatusRelatiRemote = [
    "relati-remote-launcher",
    "relati-remote-repeater",
    "relati-remote-receiver"
].concat(exports.RelatiRoleStatusRelatiRemoteNormal, exports.RelatiRoleStatusRelatiRemoteStable);
exports.RelatiRoleStatusRelatiNormal = [
    "relati-normal-launcher",
    "relati-normal-repeater",
    "relati-normal-receiver"
];
exports.RelatiRoleStatusRelati = [
    "relati-launcher",
    "relati-repeater",
    "relati-receiver"
].concat(exports.RelatiRoleStatusRelatiNormal, exports.RelatiRoleStatusRelatiRemote);
exports.RelatiRoleStatusRelatiLauncher = [
    "relati-launcher",
    "relati-normal-launcher",
    "relati-remote-launcher",
    "relati-remote-normal-launcher",
    "relati-remote-stable-launcher"
];
exports.RelatiRoleStatusRelatiRepeater = [
    "relati-repeater",
    "relati-normal-repeater",
    "relati-remote-repeater",
    "relati-remote-normal-repeater",
    "relati-remote-stable-repeater"
];
exports.RelatiRoleStatusRelatiReceiver = [
    "relati-receiver",
    "relati-normal-receiver",
    "relati-remote-receiver",
    "relati-remote-normal-receiver",
    "relati-remote-stable-receiver"
];


/***/ }),

/***/ "./relati/Relati/RelatiRoleEffects.ts":
/*!********************************************!*\
  !*** ./relati/Relati/RelatiRoleEffects.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./RelatiRoleEffects/RelatiMaintain */ "./relati/Relati/RelatiRoleEffects/RelatiMaintain.ts"));


/***/ }),

/***/ "./relati/Relati/RelatiRoleEffects/RelatiMaintain.ts":
/*!***********************************************************!*\
  !*** ./relati/Relati/RelatiRoleEffects/RelatiMaintain.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var RelatiRules = __webpack_require__(/*! ../RelatiRules */ "./relati/Relati/RelatiRules.ts");
exports.RelatiMaintain = {
    name: "連結維持",
    do: function (_a) {
        var game = _a.game, grid = _a.grid;
        if (!game || !grid || !grid.role ||
            game.turn < game.players.length)
            return;
        var owner = grid.role.owner;
        for (var _i = 0, _b = game.board.gridList; _i < _b.length; _i++) {
            var grid_1 = _b[_i];
            if (grid_1.role && grid_1.role.owner === owner) {
                grid_1.role.status["relati-repeater"] = false;
            }
        }
        maintain(grid, owner);
    }
};
function maintain(grid, owner) {
    if (!grid.role || grid.role.status["relati-repeater"])
        return;
    grid.role.status["relati-repeater"] = true;
    var ruleTraces = RelatiRules.RelatiToTarget.trace({ owner: owner, grid: grid });
    for (var _i = 0, ruleTraces_1 = ruleTraces; _i < ruleTraces_1.length; _i++) {
        var trace = ruleTraces_1[_i];
        var targetGrid = trace.target;
        maintain(targetGrid, owner);
    }
}


/***/ }),

/***/ "./relati/Relati/RelatiRoles.ts":
/*!**************************************!*\
  !*** ./relati/Relati/RelatiRoles.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./RelatiRoles/RelatiLeader */ "./relati/Relati/RelatiRoles/RelatiLeader.ts"));


/***/ }),

/***/ "./relati/Relati/RelatiRoles/RelatiLeader.ts":
/*!***************************************************!*\
  !*** ./relati/Relati/RelatiRoles/RelatiLeader.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var RelatiRole_1 = __webpack_require__(/*! ../RelatiRole */ "./relati/Relati/RelatiRole.ts");
var RelatiRoleEffects = __webpack_require__(/*! ../RelatiRoleEffects */ "./relati/Relati/RelatiRoleEffects.ts");
var RelatiLeader = /** @class */ (function (_super) {
    __extends(RelatiLeader, _super);
    function RelatiLeader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "leader";
        _this.effects = [RelatiRoleEffects.RelatiMaintain];
        return _this;
    }
    return RelatiLeader;
}(RelatiRole_1.RelatiRole));
exports.RelatiLeader = RelatiLeader;


/***/ }),

/***/ "./relati/Relati/RelatiRules.ts":
/*!**************************************!*\
  !*** ./relati/Relati/RelatiRules.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./RelatiRules/RelatiBySource */ "./relati/Relati/RelatiRules/RelatiBySource.ts"));
__export(__webpack_require__(/*! ./RelatiRules/RelatiToTarget */ "./relati/Relati/RelatiRules/RelatiToTarget.ts"));


/***/ }),

/***/ "./relati/Relati/RelatiRules/RelatiBySource.ts":
/*!*****************************************************!*\
  !*** ./relati/Relati/RelatiRules/RelatiBySource.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RelatiSourceGridStatus = [
    "relati-launcher",
    "relati-repeater"
];
exports.RelatiBySource = {
    allow: function (state) {
        return (exports.RelatiNormalBySource.allow(state) ||
            exports.RelatiRemoteBySource.allow(state));
    },
    trace: function (state) {
        return exports.RelatiNormalBySource.trace(state).concat(exports.RelatiRemoteBySource.trace(state));
    }
};
exports.RelatiNormalSourceGridStatus = [
    "relati-normal-launcher",
    "relati-normal-repeater"
].concat(exports.RelatiSourceGridStatus);
exports.RelatiNormalBySource = {
    allow: function (_a) {
        var owner = _a.owner, grid = _a.grid;
        if (!grid)
            return false;
        var sourceGrids = grid.queries("O");
        for (var i = 0; i < sourceGrids.length; i++) {
            var sourceGrid = sourceGrids[i];
            var sourceReliable = (sourceGrid &&
                sourceGrid.role &&
                sourceGrid.role.owner === owner &&
                sourceGrid.role.is(exports.RelatiNormalSourceGridStatus, "any"));
            if (sourceReliable)
                return true;
        }
        return false;
    },
    trace: function (_a) {
        var owner = _a.owner, grid = _a.grid;
        if (!grid)
            return [];
        var sourceGrids = grid.queries("O");
        var ruleTraces = [];
        for (var i = 0; i < sourceGrids.length; i++) {
            var sourceGrid = sourceGrids[i];
            var sourceReliable = (sourceGrid &&
                sourceGrid.role &&
                sourceGrid.role.owner === owner &&
                sourceGrid.role.is(exports.RelatiNormalSourceGridStatus, "any"));
            if (sourceReliable) {
                ruleTraces.push({
                    target: sourceGrid,
                    routes: []
                });
            }
        }
        return ruleTraces;
    }
};
exports.RelatiRemoteSourceGridStatus = [
    "relati-remote-launcher",
    "relati-remote-repeater"
].concat(exports.RelatiSourceGridStatus);
exports.RelatiRemoteBySource = {
    allow: function (state) {
        return (exports.RelatiRemoteNormalBySource.allow(state) ||
            exports.RelatiRemoteStableBySource.allow(state));
    },
    trace: function (state) {
        return exports.RelatiRemoteNormalBySource.trace(state).concat(exports.RelatiRemoteStableBySource.trace(state));
    }
};
exports.RelatiRemoteNormalSourceGridStatus = [
    "relati-remote-normal-launcher",
    "relati-remote-normal-repeater"
].concat(exports.RelatiRemoteSourceGridStatus);
exports.RelatiRemoteNormalBySource = {
    allow: function (_a) {
        var owner = _a.owner, grid = _a.grid;
        if (!grid)
            return false;
        var sourceGrids = grid.queries("2O,O");
        for (var i = 0; i < sourceGrids.length; i += 2) {
            var sourceGrid = sourceGrids[i];
            var sourceReliable = (sourceGrid &&
                sourceGrid.role &&
                sourceGrid.role.owner === owner &&
                sourceGrid.role.is(exports.RelatiRemoteNormalSourceGridStatus, "any"));
            if (!sourceReliable)
                continue;
            var middleGrid = sourceGrids[i + 1];
            var notBlocked = !middleGrid.role;
            if (notBlocked)
                return true;
        }
        return false;
    },
    trace: function (_a) {
        var owner = _a.owner, grid = _a.grid;
        if (!grid)
            return [];
        var sourceGrids = grid.queries("2O,O");
        var ruleTraces = [];
        for (var i = 0; i < sourceGrids.length; i += 2) {
            var sourceGrid = sourceGrids[i];
            var sourceReliable = (sourceGrid &&
                sourceGrid.role &&
                sourceGrid.role.owner === owner &&
                sourceGrid.role.is(exports.RelatiRemoteNormalSourceGridStatus, "any"));
            if (!sourceReliable)
                continue;
            var middleGrid = sourceGrids[i + 1];
            var notBlocked = !middleGrid.role;
            if (notBlocked) {
                ruleTraces.push({
                    target: sourceGrid,
                    routes: [middleGrid]
                });
            }
        }
        return ruleTraces;
    }
};
exports.RelatiRemoteStableSourceGridStatus = [
    "relati-remote-stable-launcher",
    "relati-remote-stable-repeater"
].concat(exports.RelatiRemoteSourceGridStatus);
exports.RelatiRemoteStableBySource = {
    allow: function (_a) {
        var owner = _a.owner, grid = _a.grid;
        if (!grid)
            return false;
        var sourceGrids = grid.queries("IIH,II,I,IH,H,IHH,HH,H,HI,I");
        for (var i = 0; i < sourceGrids.length; i += 5) {
            var sourceGrid = sourceGrids[i];
            var sourceReliable = (sourceGrid &&
                sourceGrid.role &&
                sourceGrid.role.owner === owner &&
                sourceGrid.role.is(exports.RelatiRemoteStableSourceGridStatus, "any"));
            if (!sourceReliable)
                continue;
            var middleGrids = sourceGrids.slice(i + 1, i + 5);
            for (var j = 0; j < middleGrids.length - 1; j++) {
                var middleGrid1 = middleGrids[j];
                var middleGrid2 = middleGrids[j + 1];
                var notBlocked = !middleGrid1.role && !middleGrid2.role;
                if (notBlocked)
                    return true;
            }
        }
        return false;
    },
    trace: function (_a) {
        var owner = _a.owner, grid = _a.grid;
        if (!grid)
            return [];
        var sourceGrids = grid.queries("IIH,II,I,IH,H,IHH,HH,H,HI,I");
        var ruleTraces = [];
        for (var i = 0; i < sourceGrids.length; i += 5) {
            var sourceGrid = sourceGrids[i];
            var sourceReliable = (sourceGrid &&
                sourceGrid.role &&
                sourceGrid.role.owner === owner &&
                sourceGrid.role.is(exports.RelatiRemoteStableSourceGridStatus, "any"));
            if (!sourceReliable)
                continue;
            var middleGrids = sourceGrids.slice(i + 1, i + 5);
            var middleGrid1 = middleGrids[1];
            var middleGrid2 = middleGrids[0];
            var notBlocked = !middleGrid1.role && !middleGrid2.role;
            if (notBlocked)
                ruleTraces.push({
                    target: sourceGrid,
                    routes: [
                        middleGrid1,
                        middleGrid2
                    ]
                });
            var middleGrid1 = middleGrids[1];
            var middleGrid2 = middleGrids[2];
            var notBlocked = !middleGrid1.role && !middleGrid2.role;
            if (notBlocked)
                ruleTraces.push({
                    target: sourceGrid,
                    routes: [
                        middleGrid1,
                        middleGrid2
                    ]
                });
            var middleGrid1 = middleGrids[3];
            var middleGrid2 = middleGrids[2];
            var notBlocked = !middleGrid1.role && !middleGrid2.role;
            if (notBlocked)
                ruleTraces.push({
                    target: sourceGrid,
                    routes: [
                        middleGrid1,
                        middleGrid2
                    ]
                });
        }
        return ruleTraces;
    }
};


/***/ }),

/***/ "./relati/Relati/RelatiRules/RelatiToTarget.ts":
/*!*****************************************************!*\
  !*** ./relati/Relati/RelatiRules/RelatiToTarget.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RelatiTargetGridStatus = [
    "relati-receiver"
];
exports.RelatiToTarget = {
    allow: function (state) {
        return (exports.RelatiNormalToTarget.allow(state) ||
            exports.RelatiRemoteToTarget.allow(state));
    },
    trace: function (state) {
        return exports.RelatiNormalToTarget.trace(state).concat(exports.RelatiRemoteToTarget.trace(state));
    }
};
exports.RelatiNormalTargetGridStatus = [
    "relati-normal-receiver"
].concat(exports.RelatiTargetGridStatus);
exports.RelatiNormalToTarget = {
    allow: function (_a) {
        var owner = _a.owner, grid = _a.grid;
        if (!grid)
            return false;
        var targetGrids = grid.queries("O");
        for (var i = 0; i < targetGrids.length; i++) {
            var targetGrid = targetGrids[i];
            var targetReliable = (targetGrid &&
                targetGrid.role &&
                targetGrid.role.owner === owner &&
                targetGrid.role.is(exports.RelatiNormalTargetGridStatus, "any"));
            if (targetReliable)
                return true;
        }
        return false;
    },
    trace: function (_a) {
        var owner = _a.owner, grid = _a.grid;
        if (!grid)
            return [];
        var targetGrids = grid.queries("O");
        var ruleTraces = [];
        for (var i = 0; i < targetGrids.length; i++) {
            var targetGrid = targetGrids[i];
            var targetReliable = (targetGrid &&
                targetGrid.role &&
                targetGrid.role.owner === owner &&
                targetGrid.role.is(exports.RelatiNormalTargetGridStatus, "any"));
            if (targetReliable) {
                ruleTraces.push({
                    target: targetGrid,
                    routes: []
                });
            }
        }
        return ruleTraces;
    }
};
exports.RelatiRemoteTargetGridStatus = [
    "relati-remote-receiver"
].concat(exports.RelatiTargetGridStatus);
exports.RelatiRemoteToTarget = {
    allow: function (state) {
        return (exports.RelatiRemoteNormalToTarget.allow(state) ||
            exports.RelatiRemoteStableToTarget.allow(state));
    },
    trace: function (state) {
        return exports.RelatiRemoteNormalToTarget.trace(state).concat(exports.RelatiRemoteStableToTarget.trace(state));
    }
};
exports.RelatiRemoteNormalTargetGridStatus = [
    "relati-remote-normal-receiver"
].concat(exports.RelatiRemoteTargetGridStatus);
exports.RelatiRemoteNormalToTarget = {
    allow: function (_a) {
        var owner = _a.owner, grid = _a.grid;
        if (!grid)
            return false;
        var targetGrids = grid.queries("2O,O");
        for (var i = 0; i < targetGrids.length; i += 2) {
            var targetGrid = targetGrids[i];
            var targetReliable = (targetGrid &&
                targetGrid.role &&
                targetGrid.role.owner === owner &&
                targetGrid.role.is(exports.RelatiRemoteNormalTargetGridStatus, "any"));
            if (!targetReliable)
                continue;
            var middleGrid = targetGrids[i + 1];
            var notBlocked = !middleGrid.role;
            if (notBlocked)
                return true;
        }
        return false;
    },
    trace: function (_a) {
        var owner = _a.owner, grid = _a.grid;
        if (!grid)
            return [];
        var targetGrids = grid.queries("2O,O");
        var ruleTraces = [];
        for (var i = 0; i < targetGrids.length; i += 2) {
            var targetGrid = targetGrids[i];
            var targetReliable = (targetGrid &&
                targetGrid.role &&
                targetGrid.role.owner === owner &&
                targetGrid.role.is(exports.RelatiRemoteNormalTargetGridStatus, "any"));
            if (!targetReliable)
                continue;
            var middleGrid = targetGrids[i + 1];
            var notBlocked = !middleGrid.role;
            if (notBlocked) {
                ruleTraces.push({
                    target: targetGrid,
                    routes: [middleGrid]
                });
            }
        }
        return ruleTraces;
    }
};
exports.RelatiRemoteStableTargetGridStatus = [
    "relati-remote-stable-receiver"
].concat(exports.RelatiRemoteTargetGridStatus);
exports.RelatiRemoteStableToTarget = {
    allow: function (_a) {
        var owner = _a.owner, grid = _a.grid;
        if (!grid)
            return false;
        var targetGrids = grid.queries("IIH,II,I,IH,H,IHH,HH,H,HI,I");
        for (var i = 0; i < targetGrids.length; i += 5) {
            var targetGrid = targetGrids[i];
            var targetReliable = (targetGrid &&
                targetGrid.role &&
                targetGrid.role.owner === owner &&
                targetGrid.role.is(exports.RelatiRemoteStableTargetGridStatus, "any"));
            if (!targetReliable)
                continue;
            var middleGrids = targetGrids.slice(i + 1, i + 5);
            for (var j = 0; j < middleGrids.length - 1; j++) {
                var middleGrid1 = middleGrids[j];
                var middleGrid2 = middleGrids[j + 1];
                var notBlocked = !middleGrid1.role && !middleGrid2.role;
                if (notBlocked)
                    return true;
            }
        }
        return false;
    },
    trace: function (_a) {
        var owner = _a.owner, grid = _a.grid;
        if (!grid)
            return [];
        var targetGrids = grid.queries("IIH,II,I,IH,H,IHH,HH,H,HI,I");
        var ruleTraces = [];
        for (var i = 0; i < targetGrids.length; i += 5) {
            var targetGrid = targetGrids[i];
            var targetReliable = (targetGrid &&
                targetGrid.role &&
                targetGrid.role.owner === owner &&
                targetGrid.role.is(exports.RelatiRemoteStableTargetGridStatus, "any"));
            if (!targetReliable)
                continue;
            var middleGrids = targetGrids.slice(i + 1, i + 5);
            var middleGrid1 = middleGrids[1];
            var middleGrid2 = middleGrids[0];
            var notBlocked = !middleGrid1.role && !middleGrid2.role;
            if (notBlocked)
                ruleTraces.push({
                    target: targetGrid,
                    routes: [
                        middleGrid1,
                        middleGrid2
                    ]
                });
            var middleGrid1 = middleGrids[1];
            var middleGrid2 = middleGrids[2];
            var notBlocked = !middleGrid1.role && !middleGrid2.role;
            if (notBlocked)
                ruleTraces.push({
                    target: targetGrid,
                    routes: [
                        middleGrid1,
                        middleGrid2
                    ]
                });
            var middleGrid1 = middleGrids[3];
            var middleGrid2 = middleGrids[2];
            var notBlocked = !middleGrid1.role && !middleGrid2.role;
            if (notBlocked)
                ruleTraces.push({
                    target: targetGrid,
                    routes: [
                        middleGrid1,
                        middleGrid2
                    ]
                });
        }
        return ruleTraces;
    }
};


/***/ }),

/***/ "./src/RelatiViews/RelatiBadgeView.tsx":
/*!*********************************************!*\
  !*** ./src/RelatiViews/RelatiBadgeView.tsx ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var RelatiBadgeView = /** @class */ (function (_super) {
    __extends(RelatiBadgeView, _super);
    function RelatiBadgeView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RelatiBadgeView.prototype.render = function () {
        var grid = this.props.grid;
        var badge = [];
        var srtX = grid.x * 5 + 1;
        var srtY = grid.y * 5 + 1;
        var endX = grid.x * 5 + 4;
        var endY = grid.y * 5 + 4;
        var badgeAttr = {
            "d": "",
            "strokeWidth": "0.6",
            "stroke": "",
            "fill": "none",
            "key": "1"
        };
        if (!grid.role)
            return React.createElement("g", { key: grid.coordinate }, badge);
        switch (grid.role.owner.badge) {
            case "O":
                badgeAttr["d"] = "\n                    M " + (srtX + 1.5) + " " + (srtY + 1.5) + "\n                    m 0 -1.5\n                    a 1.5 1.5 0 0 1, 0 3\n                    a 1.5 1.5 0 0 1, 0 -3\n                ";
                badgeAttr["stroke"] = "crimson";
                break;
            case "X":
                badgeAttr["d"] = "\n                    M " + srtX + " " + srtY + " L " + endX + " " + endY + "\n                    M " + endX + " " + srtY + " L " + srtX + " " + endY + "\n                ";
                badgeAttr["stroke"] = "royalblue";
                break;
        }
        if (grid.role.is("relati-launcher")) {
            badgeAttr["strokeWidth"] = "1";
            badge.push(React.createElement("path", badgeAttr));
            badgeAttr["key"] = "2";
            badgeAttr["stroke"] = "#f2f2f2";
            badgeAttr["strokeWidth"] = "0.5";
            badge.push(React.createElement("path", badgeAttr));
        }
        else if (grid.role.is("relati-repeater")) {
            badge.push(React.createElement("path", badgeAttr));
        }
        else {
            badgeAttr["stroke"] = "#666";
            badge.push(React.createElement("path", badgeAttr));
        }
        return React.createElement("g", { key: grid.coordinate }, badge);
    };
    return RelatiBadgeView;
}(React.Component));
exports.RelatiBadgeView = RelatiBadgeView;


/***/ }),

/***/ "./src/RelatiViews/RelatiBoardView.tsx":
/*!*********************************************!*\
  !*** ./src/RelatiViews/RelatiBoardView.tsx ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var Relati_1 = __webpack_require__(/*! ../../relati/Relati */ "./relati/Relati.ts");
var RelatiBadgeView_1 = __webpack_require__(/*! ./RelatiBadgeView */ "./src/RelatiViews/RelatiBadgeView.tsx");
var RelatiPathLine_1 = __webpack_require__(/*! ./RelatiPathLine */ "./src/RelatiViews/RelatiPathLine.tsx");
var RelatiBoardView = /** @class */ (function (_super) {
    __extends(RelatiBoardView, _super);
    function RelatiBoardView(prop) {
        var _this = _super.call(this, prop) || this;
        _this.gameTurn = 0;
        _this.gridVisited = [];
        _this.game = prop.game;
        _this.gridSize = prop.gridSize;
        _this.state = {
            background: [],
            gridList: _this.game.board.gridList,
            gridLinePaths: []
        };
        var board = _this.game.board;
        var gridSize = _this.gridSize;
        for (var x = 1; x < board.width; x++) {
            _this.state.gridLinePaths.push("M " + x * gridSize + " 0 V " + board.height * gridSize);
        }
        for (var y = 1; y < board.height; y++) {
            _this.state.gridLinePaths.push("M 0 " + y * gridSize + " H " + board.width * gridSize);
        }
        window.comp = _this;
        return _this;
    }
    RelatiBoardView.prototype._onClick = function (reactEvent) {
        var event = reactEvent.nativeEvent;
        var board = this.game.board;
        var x = Math.floor(event.offsetX / 5), y = Math.floor(event.offsetY / 5), grid = board.grids[x] && board.grids[x][y];
        this.game.selectGrid(grid);
        this.state.background = [];
        this.forceUpdate();
        setTimeout(function () {
            this.createMaintainEffect();
        }.bind(this), 50);
    };
    RelatiBoardView.prototype.createGridView = function (grid) {
        if (grid.role)
            return React.createElement(RelatiBadgeView_1.RelatiBadgeView, { grid: grid, key: grid.coordinate });
        var game = this.game;
        var owner = game.getNowPlayer();
        var color = owner.badge == "O" ? "crimson" : "royalblue";
        var srtX = grid.x * 5 + 1;
        var srtY = grid.y * 5 + 1;
        var endX = grid.x * 5 + 4;
        var endY = grid.y * 5 + 4;
        if (Relati_1.RelatiRules.RelatiBySource.allow({ game: game, grid: grid, owner: owner })) {
            return (React.createElement("g", { key: grid.coordinate }, React.createElement("path", {
                "d": "\n                            M " + (srtX + 1.5) + " " + (srtY + 1.5) + "\n                            m 0 -0.4\n                            a 0.4 0.4 0 0 1, 0 0.8\n                            a 0.4 0.4 0 0 1, 0 -0.8\n                        ",
                "stroke": "none",
                "fill": color
            })));
        }
    };
    RelatiBoardView.prototype.createMaintainEffect = function () {
        var game = this.game;
        var owner = game.players[(game.turn - 1) % game.players.length];
        var color = owner.badge == "O" ? "crimson" : "royalblue";
        this.gridVisited = [];
        for (var _i = 0, _a = game.board.gridList; _i < _a.length; _i++) {
            var grid = _a[_i];
            if (!grid.role || grid.role.owner != owner)
                continue;
            if (grid.role.status["relati-launcher"]) {
                this.createMaintainPath(grid, owner, game.turn, color);
            }
        }
    };
    RelatiBoardView.prototype.createMaintainPath = function (grid, owner, turn, color, sourceGrid) {
        if (this.gridVisited.indexOf(grid) > -1 || turn < this.gameTurn)
            return;
        this.gridVisited.push(grid);
        this.gameTurn = turn;
        var ruleTraces = Relati_1.RelatiRules.RelatiToTarget.trace({ owner: owner, grid: grid });
        var _loop_1 = function (trace) {
            if (trace.target == sourceGrid)
                return "continue";
            this_1.state.background.push(React.createElement(RelatiPathLine_1.RelatiPathLine, { sourceGrid: grid, trace: trace, color: color, key: grid.coordinate + "-" + trace.routes.map(function (grid) { return grid.coordinate; }).join("-") + "-" + trace.target.coordinate }));
            setTimeout(function () {
                this.createMaintainPath(trace.target, owner, turn, color, grid);
            }.bind(this_1), 250);
        };
        var this_1 = this;
        for (var _i = 0, ruleTraces_1 = ruleTraces; _i < ruleTraces_1.length; _i++) {
            var trace = ruleTraces_1[_i];
            _loop_1(trace);
        }
        this.forceUpdate();
    };
    RelatiBoardView.prototype.render = function () {
        return (React.createElement("svg", { width: "45", height: "45", className: "relati-board", onClick: this._onClick.bind(this) },
            React.createElement("g", null, this.state.background),
            React.createElement("g", null, this.state.gridLinePaths.map(function (path, i) { return (React.createElement("path", { d: path, stroke: "#888", strokeWidth: "0.4", key: i })); })),
            React.createElement("g", null, this.state.gridList.map(function (grid) {
                return this.createGridView(grid);
            }.bind(this)))));
    };
    return RelatiBoardView;
}(React.Component));
exports.RelatiBoardView = RelatiBoardView;


/***/ }),

/***/ "./src/RelatiViews/RelatiPathLine.tsx":
/*!********************************************!*\
  !*** ./src/RelatiViews/RelatiPathLine.tsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var RelatiPathLine = /** @class */ (function (_super) {
    __extends(RelatiPathLine, _super);
    function RelatiPathLine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RelatiPathLine.prototype.render = function () {
        var _a = this.props, trace = _a.trace, sourceGrid = _a.sourceGrid, color = _a.color;
        var targetGrid = trace.target;
        var pathAttr = {
            "d": "M " + (sourceGrid.x * 5 + 2.5) + " " + (sourceGrid.y * 5 + 2.5),
            "strokeWidth": "0.5",
            "stroke": color,
            "fill": "none",
            "className": "relati-path"
        };
        for (var _i = 0, _b = trace.routes; _i < _b.length; _i++) {
            var grid = _b[_i];
            pathAttr["d"] += " L " + (grid.x * 5 + 2.5) + " " + (grid.y * 5 + 2.5);
        }
        pathAttr["d"] += " L " + (targetGrid.x * 5 + 2.5) + " " + (targetGrid.y * 5 + 2.5);
        return React.createElement("path", pathAttr);
    };
    return RelatiPathLine;
}(React.Component));
exports.RelatiPathLine = RelatiPathLine;


/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var ReactDOM = __webpack_require__(/*! react-dom */ "react-dom");
var Relati_1 = __webpack_require__(/*! ../relati/Relati */ "./relati/Relati.ts");
var GridBoard_1 = __webpack_require__(/*! ../relati/GridBoard */ "./relati/GridBoard.ts");
var RelatiBoardView_1 = __webpack_require__(/*! ./RelatiViews/RelatiBoardView */ "./src/RelatiViews/RelatiBoardView.tsx");
var board = new GridBoard_1.GridBoard(9, 9);
var game = new Relati_1.RelatiGame(board);
game.players = [
    new Relati_1.RelatiPlayer(game, "O"),
    new Relati_1.RelatiPlayer(game, "X")
];
var container = document.getElementById("relati-container");
ReactDOM.render(React.createElement(RelatiBoardView_1.RelatiBoardView, { game: game, gridSize: 5 }), container);
var relatiBoardView = document.querySelector(".relati-board");
function resize() {
    relatiBoardView.style.transform = "scale(" + Math.min(container.clientWidth / (board.width * 5), container.clientHeight / (board.height * 5)) * 0.95 + ")";
}
window.addEventListener("resize", resize);
resize();
window.game = game;


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ })

/******/ });
//# sourceMappingURL=index.js.map
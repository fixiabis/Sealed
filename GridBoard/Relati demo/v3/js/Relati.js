"use strict";
var Grid = /** @class */ (function () {
    function Grid(board, x, y) {
        this.board = board;
        this.x = x;
        this.y = y;
        this.coordinate = "" + String.fromCharCode(x + 65) + (y + 1);
        this.board[this.coordinate] = this;
    }
    Grid.prototype.query = function (directionCommand) {
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
                    if (unitCarried == 1)
                        unit = unitValue;
                    else
                        unit = unit * 10 + unitValue;
                    unitCarried++;
                    break;
            }
        }
        return board.grids[x] && board.grids[x][y];
    };
    Grid.prototype.queries = function (directionCommands) {
        var simplifyDirectionList = Grid.simplifyDirectionList, originalDirectionLists = Grid.originalDirectionLists;
        var gridList = [];
        if (directionCommands.indexOf(";") > -1) {
            for (var _i = 0, _a = directionCommands.split(";"); _i < _a.length; _i++) {
                var directionCommand = _a[_i];
                gridList = gridList.concat(this.queries(directionCommand));
            }
            return gridList;
        }
        for (var i = 0; i < simplifyDirectionList.length; i++) {
            var simplifyDirection = simplifyDirectionList[i];
            if (!directionCommands.match(simplifyDirection))
                continue;
            for (var _b = 0, _c = originalDirectionLists[i]; _b < _c.length; _b++) {
                var originalDirection = _c[_b];
                gridList = gridList.concat(this.queries(directionCommands.replace(simplifyDirection, originalDirection)));
            }
            return gridList;
        }
        if (directionCommands.indexOf(",") > -1) {
            for (var _d = 0, _e = directionCommands.split(","); _d < _e.length; _d++) {
                var directionCommand = _e[_d];
                gridList = gridList.concat(this.queries(directionCommand));
            }
            return gridList;
        }
        return [this.query(directionCommands)];
    };
    Grid.simplifyDirectionList = [/I/g, /H/g, /T/g, /X/g, /O/g];
    Grid.originalDirectionLists = [
        ["F", "B"], ["R", "L"],
        ["F", "B", "R", "L"],
        ["FR", "FL", "BR", "BL"],
        ["F", "B", "R", "L", "FR", "FL", "BR", "BL"]
    ];
    return Grid;
}());
var GridBoard = /** @class */ (function () {
    function GridBoard(width, height) {
        this.width = width;
        this.height = height;
        this.grids = [];
        this.gridList = [];
        for (var x = 0; x < width; x++) {
            var gridRow = [];
            for (var y = 0; y < height; y++) {
                var grid = new Grid(this, x, y);
                gridRow.push(grid);
                this.gridList.push(grid);
            }
            this.grids.push(gridRow);
        }
    }
    GridBoard.prototype.query = function (coordinateCommand) {
        var coordinate = coordinateCommand;
        var x = coordinate[0].charCodeAt(0) - 65;
        var y = parseInt(coordinate.substr(1, coordinate.length - 1)) - 1;
        return this.grids[x] && this.grids[x][y];
    };
    GridBoard.prototype.queries = function (coordinateCommands) {
        var gridList = [];
        var _a = this, width = _a.width, height = _a.height;
        if (coordinateCommands == "*")
            return this.gridList;
        if (coordinateCommands.indexOf(",") > -1) {
            for (var _i = 0, _b = coordinateCommands.split(","); _i < _b.length; _i++) {
                var coordinate = _b[_i];
                gridList = gridList.concat(this.queries(coordinate));
            }
            return gridList;
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
            return gridList;
        }
        var y = parseInt(coordinateCommands);
        if (!isNaN(y)) {
            for (var x = 0; x < width; x++) {
                gridList.push(this.grids[x][y]);
            }
            return gridList;
        }
        else if (coordinateCommands.length == 1) {
            var x = coordinateCommands.charCodeAt(0) - 65;
            for (var y = 0; y < height; y++) {
                gridList.push(this.grids[x][y]);
            }
            return gridList;
        }
        return [this.query(coordinateCommands)];
    };
    return GridBoard;
}());
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Relati;
(function (Relati) {
    var RelatiBoard = /** @class */ (function (_super) {
        __extends(RelatiBoard, _super);
        function RelatiBoard(width, height) {
            var _this = _super.call(this, width, height) || this;
            _this.width = width;
            _this.height = height;
            _this.gridList = [];
            for (var x = 0; x < width; x++) {
                for (var y = 0; y < height; y++) {
                    var grid = new Relati.RelatiGrid(_this, x, y);
                    _this.grids[x][y] = grid;
                    _this.gridList.push(grid);
                }
            }
            return _this;
        }
        return RelatiBoard;
    }(GridBoard));
    Relati.RelatiBoard = RelatiBoard;
})(Relati || (Relati = {}));
var Relati;
(function (Relati) {
    var RelatiGame = /** @class */ (function () {
        function RelatiGame(board, players) {
            this.board = board;
            this.players = players;
            this.turn = 0;
            for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
                var player = _a[_i];
                Relati.RelatiActions.Shuffle.action({ owner: player });
                for (var i = 0; i < 5; i++) {
                    var card = player.deck.pop();
                    if (card)
                        player.hand.push(card);
                }
            }
        }
        RelatiGame.prototype.nowPlayer = function () {
            return this.players[this.turn % 2];
        };
        return RelatiGame;
    }());
    Relati.RelatiGame = RelatiGame;
})(Relati || (Relati = {}));
var Relati;
(function (Relati) {
    var RelatiGrid = /** @class */ (function (_super) {
        __extends(RelatiGrid, _super);
        function RelatiGrid() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.selectable = false;
            _this.cards = [];
            return _this;
        }
        return RelatiGrid;
    }(Grid));
    Relati.RelatiGrid = RelatiGrid;
})(Relati || (Relati = {}));
var Relati;
(function (Relati) {
    var RelatiPlayer = /** @class */ (function () {
        function RelatiPlayer() {
            this.deck = [];
            this.hand = [];
            this.blood = 30;
        }
        return RelatiPlayer;
    }());
    Relati.RelatiPlayer = RelatiPlayer;
})(Relati || (Relati = {}));
var Relati;
(function (Relati) {
    var RelatiRole = /** @class */ (function () {
        function RelatiRole(owner, grid) {
            this.owner = owner;
            this.grid = grid;
            this.type = "normal";
            this.blood = 0;
            this.status = {};
            this.attack = 0;
            this.defend = 0;
        }
        RelatiRole.prototype.is = function (status, type) {
            if (typeof status === "string")
                return this.status[status];
            if (type == "any") {
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
        RelatiRole.prototype.gain = function (status) {
            this.status[status] = true;
        };
        RelatiRole.prototype.lost = function (status) {
            this.status[status] = false;
        };
        return RelatiRole;
    }());
    Relati.RelatiRole = RelatiRole;
})(Relati || (Relati = {}));
var Relati;
(function (Relati) {
    Relati.RelatiBlockGridStatus = [
        "relati-blocked",
        "relati-normal-blocked",
        "relati-remote-blocked",
        "relati-remote-normal-blocked",
        "relati-remote-stable-blocked"
    ];
    Relati.RelatiBlock = {
        action: function (_a) {
            var game = _a.game, owner = _a.owner, grid = _a.grid;
            if (!game || !owner || !grid)
                return;
            for (var _i = 0, _b = game.board.gridList; _i < _b.length; _i++) {
                var grid_1 = _b[_i];
                if (!grid_1.role)
                    continue;
                if (grid_1.role.owner != owner)
                    continue;
                for (var _c = 0, RelatiBlockGridStatus_1 = Relati.RelatiBlockGridStatus; _c < RelatiBlockGridStatus_1.length; _c++) {
                    var status = RelatiBlockGridStatus_1[_c];
                    if (grid_1.role.is(status)) {
                        grid_1.role.lost(status);
                    }
                }
            }
            relatiGridList = [];
            relatiExpand(grid, owner);
            for (var _d = 0, _e = game.board.gridList; _d < _e.length; _d++) {
                var grid_2 = _e[_d];
                if (!grid_2.role)
                    continue;
                if (grid_2.role.owner != owner)
                    continue;
                if (relatiGridList.indexOf(grid_2) < 0) {
                    grid_2.role.gain("relati-blocked");
                }
            }
        }
    };
    var relatiGridList = [];
    function relatiExpand(grid, owner) {
        if (relatiGridList.indexOf(grid) > -1)
            return;
        relatiGridList.push(grid);
        var ruleTraces = Relati.RelatiRules.RelatiBlock.trace({ owner: owner, grid: grid });
        for (var _i = 0, ruleTraces_1 = ruleTraces; _i < ruleTraces_1.length; _i++) {
            var trace = ruleTraces_1[_i];
            var targetGrid = trace.target;
            relatiExpand(targetGrid, owner);
        }
    }
})(Relati || (Relati = {}));
var Relati;
(function (Relati) {
    var RelatiActions;
    (function (RelatiActions) {
        RelatiActions.Shuffle = {
            action: function (_a) {
                var owner = _a.owner;
                if (!owner)
                    return;
                for (var cardIndex = 0; cardIndex < owner.deck.length; cardIndex++) {
                    var swapCardIndex = Math.floor(Math.random() * owner.deck.length);
                    var card = owner.deck[cardIndex];
                    var swapCard = owner.deck[swapCardIndex];
                    owner.deck[cardIndex] = swapCard;
                    owner.deck[swapCardIndex] = card;
                }
            }
        };
    })(RelatiActions = Relati.RelatiActions || (Relati.RelatiActions = {}));
})(Relati || (Relati = {}));
var Relati;
(function (Relati) {
    var RelatiCards;
    (function (RelatiCards) {
        var Normal = /** @class */ (function () {
            function Normal(owner) {
                this.owner = owner;
                this.actions = [];
                this.effects = [];
            }
            Normal.prototype.select = function (game) {
                var owner = this.owner;
                for (var _i = 0, _a = game.board.gridList; _i < _a.length; _i++) {
                    var grid = _a[_i];
                    if (grid.role)
                        continue;
                    if (game.turn < 2 || Relati.RelatiRules.Relati.allow({ owner: owner, grid: grid })) {
                        grid.selectable = true;
                    }
                }
            };
            Normal.prototype.launch = function (game, grid) {
                var owner = this.owner;
                if (grid.role)
                    return;
                if (game.turn < 2 || Relati.RelatiRules.Relati.allow({ owner: owner, grid: grid })) {
                    grid.role = new Relati.RelatiRoles.Normal(owner, grid);
                    var cardIndex = owner.hand.indexOf(this);
                    owner.hand.splice(cardIndex, 1);
                    grid.cards.push(this);
                    game.board.gridList.forEach(function (grid) { return grid.selectable = false; });
                    if (game.turn < 2) {
                        grid.role.gain("relati-launcher");
                        grid.role.type = "leader";
                        this.effects.push(Relati.RelatiBlock);
                    }
                    else {
                        grid.role.gain("relati-repeater");
                        grid.role.gain("relati-recepter");
                    }
                }
            };
            return Normal;
        }());
        RelatiCards.Normal = Normal;
    })(RelatiCards = Relati.RelatiCards || (Relati.RelatiCards = {}));
})(Relati || (Relati = {}));
var Relati;
(function (Relati) {
    var RelatiRoles;
    (function (RelatiRoles) {
        var Normal = /** @class */ (function (_super) {
            __extends(Normal, _super);
            function Normal() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.blood = 1;
                _this.attack = 0;
                _this.defend = 0;
                return _this;
            }
            return Normal;
        }(Relati.RelatiRole));
        RelatiRoles.Normal = Normal;
    })(RelatiRoles = Relati.RelatiRoles || (Relati.RelatiRoles = {}));
})(Relati || (Relati = {}));
var Relati;
(function (Relati_1) {
    var RelatiRules;
    (function (RelatiRules) {
        RelatiRules.RelatiSourceGridStatus = [
            "relati-launcher",
            "relati-repeater"
        ];
        RelatiRules.Relati = {
            allow: function (state) {
                return (RelatiRules.RelatiNormal.allow(state) ||
                    RelatiRules.RelatiRemote.allow(state));
            },
            trace: function (state) {
                return RelatiRules.RelatiNormal.trace(state).concat(RelatiRules.RelatiRemote.trace(state));
            }
        };
        RelatiRules.RelatiNormalSourceGridStatus = [
            "relati-normal-launcher",
            "relati-normal-repeater"
        ].concat(RelatiRules.RelatiSourceGridStatus);
        RelatiRules.RelatiNormal = {
            allow: function (_a) {
                var owner = _a.owner, grid = _a.grid;
                if (!grid)
                    return false;
                var sourceGrids = grid.queries("O");
                for (var i = 0; i < sourceGrids.length; i++) {
                    var sourceGrid = sourceGrids[i];
                    if (!sourceGrid)
                        continue;
                    if (!sourceGrid.role)
                        continue;
                    if (sourceGrid.role.owner != owner)
                        continue;
                    if (!sourceGrid.role.is(RelatiRules.RelatiNormalSourceGridStatus, "any"))
                        continue;
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
                    if (!sourceGrid)
                        continue;
                    if (!sourceGrid.role)
                        continue;
                    if (sourceGrid.role.owner != owner)
                        continue;
                    if (!sourceGrid.role.is(RelatiRules.RelatiNormalSourceGridStatus, "any"))
                        continue;
                    ruleTraces.push({
                        target: sourceGrid,
                        routes: []
                    });
                }
                return ruleTraces;
            }
        };
        RelatiRules.RelatiRemoteSourceGridStatus = [
            "relati-remote-launcher",
            "relati-remote-repeater"
        ].concat(RelatiRules.RelatiSourceGridStatus);
        RelatiRules.RelatiRemote = {
            allow: function (state) {
                return (RelatiRules.RelatiRemoteNormal.allow(state) ||
                    RelatiRules.RelatiRemoteStable.allow(state));
            },
            trace: function (state) {
                return RelatiRules.RelatiRemoteNormal.trace(state).concat(RelatiRules.RelatiRemoteStable.trace(state));
            }
        };
        RelatiRules.RelatiRemoteNormalSourceGridStatus = [
            "relati-remote-normal-launcher",
            "relati-remote-normal-repeater"
        ].concat(RelatiRules.RelatiRemoteSourceGridStatus);
        RelatiRules.RelatiRemoteNormal = {
            allow: function (_a) {
                var owner = _a.owner, grid = _a.grid;
                if (!grid)
                    return false;
                var sourceGrids = grid.queries("2O,O");
                for (var i = 0; i < sourceGrids.length; i += 2) {
                    var sourceGrid = sourceGrids[i];
                    if (!sourceGrid)
                        continue;
                    if (!sourceGrid.role)
                        continue;
                    if (sourceGrid.role.owner != owner)
                        continue;
                    if (!sourceGrid.role.is(RelatiRules.RelatiRemoteNormalSourceGridStatus, "any"))
                        continue;
                    var middleGrid = sourceGrids[i + 1];
                    if (!middleGrid.role ||
                        !middleGrid.role.blood)
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
                    if (!sourceGrid)
                        continue;
                    if (!sourceGrid.role)
                        continue;
                    if (sourceGrid.role.owner != owner)
                        continue;
                    if (!sourceGrid.role.is(RelatiRules.RelatiRemoteNormalSourceGridStatus, "any"))
                        continue;
                    var middleGrid = sourceGrids[i + 1];
                    if (!middleGrid.role ||
                        !middleGrid.role.blood)
                        ruleTraces.push({
                            target: sourceGrid,
                            routes: [middleGrid]
                        });
                }
                return ruleTraces;
            }
        };
        RelatiRules.RelatiRemoteStableSourceGridStatus = [
            "relati-remote-stable-launcher",
            "relati-remote-stable-repeater"
        ].concat(RelatiRules.RelatiRemoteSourceGridStatus);
        RelatiRules.RelatiRemoteStable = {
            allow: function (_a) {
                var owner = _a.owner, grid = _a.grid;
                if (!grid)
                    return false;
                var sourceGrids = grid.queries("IIH,II,I,IH,H,IHH,HH,H,HI,I");
                for (var i = 0; i < sourceGrids.length; i += 5) {
                    var sourceGrid = sourceGrids[i];
                    if (!sourceGrid)
                        continue;
                    if (!sourceGrid.role)
                        continue;
                    if (sourceGrid.role.owner != owner)
                        continue;
                    if (!sourceGrid.role.is(RelatiRules.RelatiRemoteStableSourceGridStatus, "any"))
                        continue;
                    var middleGrids = sourceGrids.slice(i + 1, i + 4);
                    for (var j = 1; j < middleGrids.length - 1; j++) {
                        var middleGrid1 = middleGrids[j];
                        var middleGrid2 = middleGrids[j + 1];
                        if (middleGrid1.role &&
                            middleGrid1.role.blood)
                            continue;
                        if (!middleGrid2.role ||
                            !middleGrid2.role.blood)
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
                    if (!sourceGrid)
                        continue;
                    if (!sourceGrid.role)
                        continue;
                    if (sourceGrid.role.owner != owner)
                        continue;
                    if (!sourceGrid.role.is(RelatiRules.RelatiRemoteStableSourceGridStatus, "any"))
                        continue;
                    var middleGrids = sourceGrids.slice(i + 1, i + 4);
                    for (var j = 1; j < middleGrids.length - 1; j++) {
                        var middleGrid1 = middleGrids[j];
                        var middleGrid2 = middleGrids[j + 1];
                        if (middleGrid1.role &&
                            middleGrid1.role.blood)
                            continue;
                        if (!middleGrid2.role ||
                            !middleGrid2.role.blood)
                            ruleTraces.push({
                                target: sourceGrid,
                                routes: [
                                    middleGrid1,
                                    middleGrid2
                                ]
                            });
                    }
                }
                return ruleTraces;
            }
        };
    })(RelatiRules = Relati_1.RelatiRules || (Relati_1.RelatiRules = {}));
})(Relati || (Relati = {}));
var Relati;
(function (Relati) {
    var RelatiRules;
    (function (RelatiRules) {
        RelatiRules.RelatiTargetGridStatus = [
            "relati-recepter"
        ];
        RelatiRules.RelatiBlock = {
            allow: function (state) {
                return (RelatiRules.RelatiNormalBlock.allow(state) ||
                    RelatiRules.RelatiRemoteBlock.allow(state));
            },
            trace: function (state) {
                return RelatiRules.RelatiNormalBlock.trace(state).concat(RelatiRules.RelatiRemoteBlock.trace(state));
            }
        };
        RelatiRules.RelatiNormalTargetGridStatus = [
            "relati-normal-recepter"
        ].concat(RelatiRules.RelatiTargetGridStatus);
        RelatiRules.RelatiNormalBlock = {
            allow: function (_a) {
                var owner = _a.owner, grid = _a.grid;
                if (!grid)
                    return false;
                var targetGrids = grid.queries("O");
                for (var i = 0; i < targetGrids.length; i++) {
                    var targetGrid = targetGrids[i];
                    if (!targetGrid)
                        continue;
                    if (!targetGrid.role)
                        continue;
                    if (targetGrid.role.owner != owner)
                        continue;
                    if (!targetGrid.role.is(RelatiRules.RelatiNormalTargetGridStatus, "any"))
                        continue;
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
                    if (!targetGrid)
                        continue;
                    if (!targetGrid.role)
                        continue;
                    if (targetGrid.role.owner != owner)
                        continue;
                    if (!targetGrid.role.is(RelatiRules.RelatiNormalTargetGridStatus, "any"))
                        continue;
                    ruleTraces.push({
                        target: targetGrid,
                        routes: []
                    });
                }
                return ruleTraces;
            }
        };
        RelatiRules.RelatiRemoteTargetGridStatus = [
            "relati-remote-recepter"
        ].concat(RelatiRules.RelatiTargetGridStatus);
        RelatiRules.RelatiRemoteBlock = {
            allow: function (state) {
                return (RelatiRules.RelatiRemoteNormalBlock.allow(state) ||
                    RelatiRules.RelatiRemoteStableBlock.allow(state));
            },
            trace: function (state) {
                return RelatiRules.RelatiRemoteNormalBlock.trace(state).concat(RelatiRules.RelatiRemoteStableBlock.trace(state));
            }
        };
        RelatiRules.RelatiRemoteNormalTargetGridStatus = [
            "relati-remote-normal-recepter"
        ].concat(RelatiRules.RelatiRemoteTargetGridStatus);
        RelatiRules.RelatiRemoteNormalBlock = {
            allow: function (_a) {
                var owner = _a.owner, grid = _a.grid;
                if (!grid)
                    return false;
                var targetGrids = grid.queries("2O,O");
                for (var i = 0; i < targetGrids.length; i += 2) {
                    var targetGrid = targetGrids[i];
                    if (!targetGrid)
                        continue;
                    if (!targetGrid.role)
                        continue;
                    if (targetGrid.role.owner != owner)
                        continue;
                    if (!targetGrid.role.is(RelatiRules.RelatiRemoteNormalTargetGridStatus, "any"))
                        continue;
                    var middleGrid = targetGrids[i + 1];
                    if (!middleGrid.role ||
                        !middleGrid.role.blood)
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
                    if (!targetGrid)
                        continue;
                    if (!targetGrid.role)
                        continue;
                    if (targetGrid.role.owner != owner)
                        continue;
                    if (!targetGrid.role.is(RelatiRules.RelatiRemoteNormalTargetGridStatus, "any"))
                        continue;
                    var middleGrid = targetGrids[i + 1];
                    if (!middleGrid.role ||
                        !middleGrid.role.blood)
                        ruleTraces.push({
                            target: targetGrid,
                            routes: [middleGrid]
                        });
                }
                return ruleTraces;
            }
        };
        RelatiRules.RelatiRemoteStableTargetGridStatus = [
            "relati-remote-stable-recepter"
        ].concat(RelatiRules.RelatiRemoteTargetGridStatus);
        RelatiRules.RelatiRemoteStableBlock = {
            allow: function (_a) {
                var owner = _a.owner, grid = _a.grid;
                if (!grid)
                    return false;
                var targetGrids = grid.queries("IIH,II,I,IH,H,IHH,HH,H,HI,I");
                for (var i = 0; i < targetGrids.length; i += 5) {
                    var targetGrid = targetGrids[i];
                    if (!targetGrid)
                        continue;
                    if (!targetGrid.role)
                        continue;
                    if (targetGrid.role.owner != owner)
                        continue;
                    if (!targetGrid.role.is(RelatiRules.RelatiRemoteStableTargetGridStatus, "any"))
                        continue;
                    var middleGrids = targetGrids.slice(i + 1, i + 4);
                    for (var j = 1; j < middleGrids.length - 1; j++) {
                        var middleGrid1 = middleGrids[j];
                        var middleGrid2 = middleGrids[j + 1];
                        if (middleGrid1.role &&
                            middleGrid1.role.blood)
                            continue;
                        if (!middleGrid2.role ||
                            !middleGrid2.role.blood)
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
                    if (!targetGrid)
                        continue;
                    if (!targetGrid.role)
                        continue;
                    if (targetGrid.role.owner != owner)
                        continue;
                    if (!targetGrid.role.is(RelatiRules.RelatiRemoteStableTargetGridStatus, "any"))
                        continue;
                    var middleGrids = targetGrids.slice(i + 1, i + 4);
                    for (var j = 1; j < middleGrids.length - 1; j++) {
                        var middleGrid1 = middleGrids[j];
                        var middleGrid2 = middleGrids[j + 1];
                        if (middleGrid1.role &&
                            middleGrid1.role.blood)
                            continue;
                        if (!middleGrid2.role ||
                            !middleGrid2.role.blood)
                            ruleTraces.push({
                                target: targetGrid,
                                routes: [
                                    middleGrid1,
                                    middleGrid2
                                ]
                            });
                    }
                }
                return ruleTraces;
            }
        };
    })(RelatiRules = Relati.RelatiRules || (Relati.RelatiRules = {}));
})(Relati || (Relati = {}));
//# sourceMappingURL=Relati.js.map
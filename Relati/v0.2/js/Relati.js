"use strict";
/// <reference path="base/GridBoard.d.ts" />
/// <reference path="base/SVGOperation.d.ts" />
/// <reference path="base/TicTac.d.ts" />
var Relati;
(function (Relati) {
    var RelatiGame = /** @class */ (function () {
        function RelatiGame(board) {
            this.board = board;
            this.turn = 0;
            this.players = [];
            this.status = "";
            this.view = {};
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
                grid.role = new Relati.RelatiRoles.RelatiLeader(owner, grid);
                grid.role.gain("relati-launcher");
            }
            else if (Relati.RelatiRules.RelatiBySource.allow({ game: game, grid: grid, owner: owner })) {
                grid.role = new Relati.RelatiRole(owner, grid);
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
                    if (!grid.role && Relati.RelatiRules.RelatiBySource.allow({
                        game: game, grid: grid, owner: enemy
                    }))
                        return;
                }
                this.status = owner.badge + " Win";
                for (var _f = 0, _g = this.board.gridList; _f < _g.length; _f++) {
                    var grid = _g[_f];
                    if (!grid.role && Relati.RelatiRules.RelatiBySource.allow({
                        game: game, grid: grid, owner: owner
                    }))
                        return;
                }
                this.status = "Draw";
            }
        };
        return RelatiGame;
    }());
    Relati.RelatiGame = RelatiGame;
})(Relati || (Relati = {}));
var Relati;
(function (Relati) {
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
    Relati.RelatiPlayer = RelatiPlayer;
})(Relati || (Relati = {}));
var Relati;
(function (Relati) {
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
    Relati.RelatiRole = RelatiRole;
})(Relati || (Relati = {}));
(function (Relati) {
    Relati.RelatiRoleStatusRelatiRemoteStable = [
        "relati-remote-stable-launcher",
        "relati-remote-stable-repeater",
        "relati-remote-stable-receiver"
    ];
    Relati.RelatiRoleStatusRelatiRemoteNormal = [
        "relati-remote-normal-launcher",
        "relati-remote-normal-repeater",
        "relati-remote-normal-receiver"
    ];
    Relati.RelatiRoleStatusRelatiRemote = [
        "relati-remote-launcher",
        "relati-remote-repeater",
        "relati-remote-receiver"
    ].concat(Relati.RelatiRoleStatusRelatiRemoteNormal, Relati.RelatiRoleStatusRelatiRemoteStable);
    Relati.RelatiRoleStatusRelatiNormal = [
        "relati-normal-launcher",
        "relati-normal-repeater",
        "relati-normal-receiver"
    ];
    Relati.RelatiRoleStatusRelati = [
        "relati-launcher",
        "relati-repeater",
        "relati-receiver"
    ].concat(Relati.RelatiRoleStatusRelatiNormal, Relati.RelatiRoleStatusRelatiRemote);
})(Relati || (Relati = {}));
(function (Relati) {
    Relati.RelatiRoleStatusRelatiLauncher = [
        "relati-launcher",
        "relati-normal-launcher",
        "relati-remote-launcher",
        "relati-remote-normal-launcher",
        "relati-remote-stable-launcher"
    ];
    Relati.RelatiRoleStatusRelatiRepeater = [
        "relati-repeater",
        "relati-normal-repeater",
        "relati-remote-repeater",
        "relati-remote-normal-repeater",
        "relati-remote-stable-repeater"
    ];
    Relati.RelatiRoleStatusRelatiReceiver = [
        "relati-receiver",
        "relati-normal-receiver",
        "relati-remote-receiver",
        "relati-remote-normal-receiver",
        "relati-remote-stable-receiver"
    ];
})(Relati || (Relati = {}));
var Relati;
(function (Relati) {
    var RelatiView = /** @class */ (function () {
        function RelatiView(game, container, gridSize) {
            this.game = game;
            this.container = container;
            this.gridSize = gridSize;
            this.view = {};
            var board = game.board;
            var width = board.width, height = board.height;
            var boardView = createSVG("svg");
            boardView.setAttribute("width", "" + width * gridSize);
            boardView.setAttribute("height", "" + height * gridSize);
            var background = createSVG("g");
            boardView.appendChild(background);
            var lineAttr = {
                "d": "",
                "stroke": "#888",
                "stroke-width": "0.4"
            };
            for (var x = 1; x < width; x++) {
                lineAttr.d = "M " + x * gridSize + " 0 V " + height * gridSize;
                var gridLine = createSVG("path", lineAttr);
                boardView.appendChild(gridLine);
            }
            for (var y = 1; y < height; y++) {
                lineAttr.d = "M 0 " + y * gridSize + " H " + width * gridSize;
                var gridLine = createSVG("path", lineAttr);
                boardView.appendChild(gridLine);
            }
            boardView.style.transform = "scale(" + Math.min(container.clientWidth / (board.width * 5), container.clientHeight / (board.height * 5)) * 0.95 + ")";
            window.addEventListener("resize", function () {
                boardView.style.transform = "scale(" + Math.min(container.clientWidth / (width * 5), container.clientHeight / (height * 5)) * 0.95 + ")";
            });
            container.appendChild(boardView);
            for (var _i = 0, _a = board.gridList; _i < _a.length; _i++) {
                var grid = _a[_i];
                var gridView = createSVG("g");
                this.view[grid.coordinate] = gridView;
                boardView.appendChild(gridView);
            }
            this.view.board = boardView;
            this.view.background = background;
            this.view.board.addEventListener("click", function (event) {
                var x = Math.floor(event.offsetX / 5), y = Math.floor(event.offsetY / 5), grid = board.grids[x] && board.grids[x][y];
                this.game.selectGrid(grid);
                this.updateBoardView();
                this.relatiNextStepHint();
                this.relatiMaintainEffect();
            }.bind(this));
        }
        RelatiView.prototype.updateBoardView = function () {
            for (var _i = 0, _a = this.game.board.gridList; _i < _a.length; _i++) {
                var grid = _a[_i];
                var gridView = this.view[grid.coordinate];
                while (gridView.childNodes.length > 0) {
                    gridView.removeChild(gridView.childNodes[0]);
                }
                updateGridBadge(grid, gridView);
            }
        };
        RelatiView.prototype.relatiNextStepHint = function () {
            var game = this.game;
            var owner = game.getNowPlayer();
            var color = owner.badge == "O" ? "crimson" : "royalblue";
            for (var _i = 0, _a = game.board.gridList; _i < _a.length; _i++) {
                var grid = _a[_i];
                var gridView = this.view[grid.coordinate];
                if (Relati.RelatiRules.RelatiBySource.allow({ game: game, grid: grid, owner: owner })) {
                    createGridHint(grid, gridView, color);
                }
            }
        };
        RelatiView.prototype.relatiMaintainEffect = function () {
            var _a = this, game = _a.game, view = _a.view;
            var owner = game.players[(game.turn - 1) % game.players.length];
            var color = owner.badge == "O" ? "crimson" : "royalblue";
            while (view.background.childNodes.length) {
                view.background.removeChild(view.background.childNodes[0]);
            }
            gridVisited = [];
            for (var _i = 0, _b = game.board.gridList; _i < _b.length; _i++) {
                var grid = _b[_i];
                if (!grid.role || grid.role.owner != owner)
                    continue;
                if (grid.role.status["relati-launcher"]) {
                    createMaintainPath(grid, view, owner, game.turn, color);
                }
            }
        };
        return RelatiView;
    }());
    Relati.RelatiView = RelatiView;
    function updateGridBadge(grid, gridView) {
        if (!grid.role)
            return;
        var srtX = grid.x * 5 + 1;
        var srtY = grid.y * 5 + 1;
        var endX = grid.x * 5 + 4;
        var endY = grid.y * 5 + 4;
        var badgeAttr = {
            "d": "",
            "stroke-width": "0.6",
            "stroke": "",
            "fill": "none"
        };
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
            badgeAttr["stroke-width"] = "1";
            gridView.appendChild(createSVG("path", badgeAttr));
            badgeAttr.stroke = "#f2f2f2";
            badgeAttr["stroke-width"] = "0.5";
            gridView.appendChild(createSVG("path", badgeAttr));
        }
        else if (grid.role.is("relati-repeater")) {
            gridView.appendChild(createSVG("path", badgeAttr));
        }
        else {
            badgeAttr.stroke = "#666";
            gridView.appendChild(createSVG("path", badgeAttr));
        }
    }
    function createGridHint(grid, gridView, color) {
        if (grid.role)
            return;
        var srtX = grid.x * 5 + 1;
        var srtY = grid.y * 5 + 1;
        var endX = grid.x * 5 + 4;
        var endY = grid.y * 5 + 4;
        var hintAttr = {
            "d": "\n                M " + (srtX + 1.5) + " " + (srtY + 1.5) + "\n                m 0 -0.4\n                a 0.4 0.4 0 0 1, 0 0.8\n                a 0.4 0.4 0 0 1, 0 -0.8\n            ",
            "stroke": "none",
            "fill": color
        };
        gridView.appendChild(createSVG("path", hintAttr));
    }
    var gridVisited = [];
    var gameTurn = 0;
    function createMaintainPath(grid, view, owner, turn, color, sourceGrid) {
        if (gridVisited.indexOf(grid) > -1 || turn < gameTurn)
            return;
        gridVisited.push(grid);
        gameTurn = turn;
        var ruleTraces = Relati.RelatiRules.RelatiToTarget.trace({ owner: owner, grid: grid });
        var _loop_1 = function (trace) {
            if (trace.target == sourceGrid)
                return "continue";
            createRelatiPath(grid, trace, view, color);
            setTimeout(function () {
                createMaintainPath(trace.target, view, owner, turn, color, grid);
            }, 250);
        };
        for (var _i = 0, ruleTraces_1 = ruleTraces; _i < ruleTraces_1.length; _i++) {
            var trace = ruleTraces_1[_i];
            _loop_1(trace);
        }
    }
    function createRelatiPath(sourceGrid, trace, view, color) {
        var targetGrid = trace.target;
        var pathAttr = {
            "d": "M " + (sourceGrid.x * 5 + 2.5) + " " + (sourceGrid.y * 5 + 2.5),
            "stroke-width": "0.5",
            "stroke": color,
            "fill": "none",
            "class": "relati-path"
        };
        for (var _i = 0, _a = trace.routes; _i < _a.length; _i++) {
            var grid = _a[_i];
            pathAttr["d"] += " L " + (grid.x * 5 + 2.5) + " " + (grid.y * 5 + 2.5);
        }
        pathAttr["d"] += " L " + (targetGrid.x * 5 + 2.5) + " " + (targetGrid.y * 5 + 2.5);
        var path = createSVG("path", pathAttr);
        path.style.opacity = "0.3";
        view.background.appendChild(path);
    }
})(Relati || (Relati = {}));
var Relati;
(function (Relati) {
    var RelatiEffects;
    (function (RelatiEffects) {
        RelatiEffects.RelatiMaintain = {
            name: "連結維持",
            do: function (_a) {
                var game = _a.game, grid = _a.grid;
                if (!game || !grid || !grid.role ||
                    game.turn < game.players.length)
                    return;
                var owner = grid.role.owner;
                for (var _i = 0, _b = game.board.gridList; _i < _b.length; _i++) {
                    var grid_2 = _b[_i];
                    if (grid_2.role && grid_2.role.owner === owner) {
                        grid_2.role.status["relati-repeater"] = false;
                    }
                }
                maintain(grid, owner);
            }
        };
        function maintain(grid, owner) {
            if (!grid.role || grid.role.status["relati-repeater"])
                return;
            grid.role.status["relati-repeater"] = true;
            var ruleTraces = Relati.RelatiRules.RelatiToTarget.trace({ owner: owner, grid: grid });
            for (var _i = 0, ruleTraces_2 = ruleTraces; _i < ruleTraces_2.length; _i++) {
                var trace = ruleTraces_2[_i];
                var targetGrid = trace.target;
                maintain(targetGrid, owner);
            }
        }
    })(RelatiEffects = Relati.RelatiEffects || (Relati.RelatiEffects = {}));
})(Relati || (Relati = {}));
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
var Relati;
(function (Relati) {
    var RelatiRoles;
    (function (RelatiRoles) {
        var RelatiLeader = /** @class */ (function (_super) {
            __extends(RelatiLeader, _super);
            function RelatiLeader() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.type = "leader";
                _this.effects = [Relati.RelatiEffects.RelatiMaintain];
                return _this;
            }
            return RelatiLeader;
        }(Relati.RelatiRole));
        RelatiRoles.RelatiLeader = RelatiLeader;
    })(RelatiRoles = Relati.RelatiRoles || (Relati.RelatiRoles = {}));
})(Relati || (Relati = {}));
var Relati;
(function (Relati) {
    var RelatiRules;
    (function (RelatiRules) {
        RelatiRules.RelatiSourceGridStatus = [
            "relati-launcher",
            "relati-repeater"
        ];
        RelatiRules.RelatiBySource = {
            allow: function (state) {
                return (RelatiRules.RelatiNormalBySource.allow(state) ||
                    RelatiRules.RelatiRemoteBySource.allow(state));
            },
            trace: function (state) {
                return RelatiRules.RelatiNormalBySource.trace(state).concat(RelatiRules.RelatiRemoteBySource.trace(state));
            }
        };
        RelatiRules.RelatiNormalSourceGridStatus = [
            "relati-normal-launcher",
            "relati-normal-repeater"
        ].concat(RelatiRules.RelatiSourceGridStatus);
        RelatiRules.RelatiNormalBySource = {
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
                        sourceGrid.role.is(RelatiRules.RelatiNormalSourceGridStatus, "any"));
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
                        sourceGrid.role.is(RelatiRules.RelatiNormalSourceGridStatus, "any"));
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
        RelatiRules.RelatiRemoteSourceGridStatus = [
            "relati-remote-launcher",
            "relati-remote-repeater"
        ].concat(RelatiRules.RelatiSourceGridStatus);
        RelatiRules.RelatiRemoteBySource = {
            allow: function (state) {
                return (RelatiRules.RelatiRemoteNormalBySource.allow(state) ||
                    RelatiRules.RelatiRemoteStableBySource.allow(state));
            },
            trace: function (state) {
                return RelatiRules.RelatiRemoteNormalBySource.trace(state).concat(RelatiRules.RelatiRemoteStableBySource.trace(state));
            }
        };
        RelatiRules.RelatiRemoteNormalSourceGridStatus = [
            "relati-remote-normal-launcher",
            "relati-remote-normal-repeater"
        ].concat(RelatiRules.RelatiRemoteSourceGridStatus);
        RelatiRules.RelatiRemoteNormalBySource = {
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
                        sourceGrid.role.is(RelatiRules.RelatiRemoteNormalSourceGridStatus, "any"));
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
                        sourceGrid.role.is(RelatiRules.RelatiRemoteNormalSourceGridStatus, "any"));
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
        RelatiRules.RelatiRemoteStableSourceGridStatus = [
            "relati-remote-stable-launcher",
            "relati-remote-stable-repeater"
        ].concat(RelatiRules.RelatiRemoteSourceGridStatus);
        RelatiRules.RelatiRemoteStableBySource = {
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
                        sourceGrid.role.is(RelatiRules.RelatiRemoteStableSourceGridStatus, "any"));
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
                        sourceGrid.role.is(RelatiRules.RelatiRemoteStableSourceGridStatus, "any"));
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
    })(RelatiRules = Relati.RelatiRules || (Relati.RelatiRules = {}));
})(Relati || (Relati = {}));
var Relati;
(function (Relati) {
    var RelatiRules;
    (function (RelatiRules) {
        RelatiRules.RelatiTargetGridStatus = [
            "relati-receiver"
        ];
        RelatiRules.RelatiToTarget = {
            allow: function (state) {
                return (RelatiRules.RelatiNormalToTarget.allow(state) ||
                    RelatiRules.RelatiRemoteToTarget.allow(state));
            },
            trace: function (state) {
                return RelatiRules.RelatiNormalToTarget.trace(state).concat(RelatiRules.RelatiRemoteToTarget.trace(state));
            }
        };
        RelatiRules.RelatiNormalTargetGridStatus = [
            "relati-normal-receiver"
        ].concat(RelatiRules.RelatiTargetGridStatus);
        RelatiRules.RelatiNormalToTarget = {
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
                        targetGrid.role.is(RelatiRules.RelatiNormalTargetGridStatus, "any"));
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
                        targetGrid.role.is(RelatiRules.RelatiNormalTargetGridStatus, "any"));
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
        RelatiRules.RelatiRemoteTargetGridStatus = [
            "relati-remote-receiver"
        ].concat(RelatiRules.RelatiTargetGridStatus);
        RelatiRules.RelatiRemoteToTarget = {
            allow: function (state) {
                return (RelatiRules.RelatiRemoteNormalToTarget.allow(state) ||
                    RelatiRules.RelatiRemoteStableToTarget.allow(state));
            },
            trace: function (state) {
                return RelatiRules.RelatiRemoteNormalToTarget.trace(state).concat(RelatiRules.RelatiRemoteStableToTarget.trace(state));
            }
        };
        RelatiRules.RelatiRemoteNormalTargetGridStatus = [
            "relati-remote-normal-receiver"
        ].concat(RelatiRules.RelatiRemoteTargetGridStatus);
        RelatiRules.RelatiRemoteNormalToTarget = {
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
                        targetGrid.role.is(RelatiRules.RelatiRemoteNormalTargetGridStatus, "any"));
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
                        targetGrid.role.is(RelatiRules.RelatiRemoteNormalTargetGridStatus, "any"));
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
        RelatiRules.RelatiRemoteStableTargetGridStatus = [
            "relati-remote-stable-receiver"
        ].concat(RelatiRules.RelatiRemoteTargetGridStatus);
        RelatiRules.RelatiRemoteStableToTarget = {
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
                        targetGrid.role.is(RelatiRules.RelatiRemoteStableTargetGridStatus, "any"));
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
                        targetGrid.role.is(RelatiRules.RelatiRemoteStableTargetGridStatus, "any"));
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
    })(RelatiRules = Relati.RelatiRules || (Relati.RelatiRules = {}));
})(Relati || (Relati = {}));
//# sourceMappingURL=Relati.js.map
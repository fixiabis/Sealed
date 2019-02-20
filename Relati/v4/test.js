(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./js/base/GridBoard", "./js/RelatiClient"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var GridBoard_1 = require("./js/base/GridBoard");
    var RelatiClient_1 = require("./js/RelatiClient");
    var RelatiBoardView = RelatiClient_1.RelatiViews.RelatiBoardView;
    var board = new GridBoard_1.GridBoard(9, 9);
    var players = [
        new RelatiClient_1.RelatiPlayer("O"),
        new RelatiClient_1.RelatiPlayer("X")
    ];
    var game = new RelatiClient_1.RelatiGame(players, board);
    if (typeof window !== "undefined") {
        var container = document.body;
        var gridSize = 5;
        var boardView = new RelatiBoardView(game, gridSize);
        container.appendChild(boardView.container);
        var boardViewResize = function () {
            boardView.container.style.transform = "scale(" + Math.min(container.clientWidth / (boardView.width), container.clientHeight / (boardView.height)) * 0.95 + ")";
        };
        boardView.gridRenderers.push(RelatiClient_1.RelatiGridRenderers.Od);
        boardView.gridRenderers.push(RelatiClient_1.RelatiGridRenderers.Xa);
        window.addEventListener("resize", boardViewResize);
        boardViewResize();
    }
    game.turn = 3;
    var grid = board.query("E5");
    grid.role = new RelatiClient_1.RelatiRole(grid, players[0], "leader");
    grid.role.gain("relati-launcher");
    grid.role.skills.push(RelatiClient_1.RelatiSkills.RelatiCommonMaintain);
    var grid = grid.query("FFR");
    grid.role = new RelatiClient_1.RelatiRole(grid, players[0]);
    grid.role.gain("relati-receiver");
    var grid = grid.query("FFR");
    grid.role = new RelatiClient_1.RelatiRole(grid, players[0]);
    grid.role.gain("relati-receiver");
    var grid = grid.query("2BBL1F");
    grid.role = new RelatiClient_1.RelatiRole(grid, players[1]);
    var grid = grid.query("R");
    grid.role = new RelatiClient_1.RelatiRole(grid, players[1]);
    var grid = board.query("E5");
    grid.role.skills[0]["do"]({ game: game, grid: grid });
    var grids = grid.queries("~2FFR");
    console.log(grids.map(function (grid) { return [grid.coordinate, grid.role.status]; }));
    if (typeof window !== "undefined") {
        boardView.render();
        console.log(boardView);
    }
});

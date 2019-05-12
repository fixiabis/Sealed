import { GridBoard } from "./js/base/GridBoard";

import {
    RelatiGame,
    RelatiRole,
    RelatiPlayer,
    RelatiSkills,
    RelatiBoard,
    RelatiViews,
    RelatiGridRenderers
} from "./js/RelatiClient";

var { RelatiBoardView } = RelatiViews;

var board: RelatiBoard = new GridBoard(9, 9);

var players = [
    new RelatiPlayer("O"),
    new RelatiPlayer("X")
];

var game = new RelatiGame(players, board);

if (typeof window !== "undefined") {
    var container = document.body;
    var gridSize = 5;
    var boardView = new RelatiBoardView(game, gridSize);
    container.appendChild(boardView.container);

    var boardViewResize = function () {
        boardView.container.style.transform = `scale(${Math.min(
            container.clientWidth / (boardView.width),
            container.clientHeight / (boardView.height)
        ) * 0.95})`;
    };

    boardView.gridRenderers.push(RelatiGridRenderers.Od);
    boardView.gridRenderers.push(RelatiGridRenderers.Xa);

    window.addEventListener("resize", boardViewResize);
    boardViewResize();
}

game.turn = 3;

var grid = board.query("E5");
grid.role = new RelatiRole(grid, players[0], "leader");
grid.role.gain("relati-launcher");
grid.role.skills.push(RelatiSkills.RelatiCommonMaintain);

var grid = grid.query("FFR");
grid.role = new RelatiRole(grid, players[0]);
grid.role.gain("relati-receiver");

var grid = grid.query("FFR");
grid.role = new RelatiRole(grid, players[0]);
grid.role.gain("relati-receiver");

var grid = grid.query("2BBL1F");
grid.role = new RelatiRole(grid, players[1]);

var grid = grid.query("R");
grid.role = new RelatiRole(grid, players[1]);

var grid = board.query("E5");
grid.role.skills[0].do({ game, grid });

var grids = grid.queries("~2FFR");

console.log(grids.map(
    grid => [grid.coordinate, grid.role.status]
));

if (typeof window !== "undefined") {
    boardView.render();
    console.log(boardView);
}
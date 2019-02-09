import * as React from "react";
import * as ReactDOM from "react-dom";
import { RelatiGame, RelatiPlayer } from "../relati/Relati";

import { GridBoard } from "../relati/GridBoard";
import { RelatiBoardView } from "./RelatiViews/RelatiBoardView";

var board = new GridBoard(9, 9);
var game = new RelatiGame(board);

game.players = [
    new RelatiPlayer(game, "O"),
    new RelatiPlayer(game, "X")
];

var container = document.getElementById("relati-container");

ReactDOM.render(
    <RelatiBoardView game={game} gridSize={5} />,
    container
);

var relatiBoardView: SVGElement = document.querySelector(".relati-board");

function resize() {
    relatiBoardView.style.transform = `scale(${Math.min(
        container.clientWidth / (board.width * 5),
        container.clientHeight / (board.height * 5)
    ) * 0.95})`;
}

window.addEventListener("resize", resize);
resize();

(window as any).game = game;
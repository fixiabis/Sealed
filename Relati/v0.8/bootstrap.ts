import "./scss/main/page.scss";
import "./scss/view/message-box.scss";
import "./scss/page/main-page.scss";
import "./scss/page/game-page.scss";
import "./scss/view/relati-effect.scss";
import "./scss/page/help-page.scss";

import { Page } from "./ts/main/Page";
import { MessageBoxView } from "./ts/view/MessageBoxView";
import "./ts/page/MainPage";
import "./ts/page/GamePage";
import "./ts/page/HelpPage";

Page.switchTo("main");

import { RelatiBoard } from "./ts/core/RelatiBoard";
import { RelatiGame } from "./ts/core/RelatiGame";
import { BY_COMMON_RELATI } from "./ts/core/RelatiRoutes";
import { RelatiBoardView } from "./ts/view/RelatiBoardView";
import { createRelatiEffect, createHintEffect } from "./ts/view/RelatiEffectView";

let board = new RelatiBoard(9, 9);
let game = new RelatiGame(board, BY_COMMON_RELATI);
let boardView = new RelatiBoardView(board, document.getElementById("game-board") as HTMLElement);

boardView.resize();
window.addEventListener("resize", boardView.resize.bind(boardView));

boardView.body.addEventListener("click", function (event: MouseEvent) {
    let x: number = Math.floor(event.offsetX / 5),
        y: number = Math.floor(event.offsetY / 5);

    let playerSymbol = game.nowPlayerSymbol;

    game.selectGrid(x, y);

    let { background } = boardView;
    let nowPlayerSymbol = game.nowPlayerSymbol;
    let gameResult = game.result;

    if (gameResult !== "none") {
        if (confirm(gameResult)) {
            game.restart();
        }
    }

    boardView.update();
    boardView.removeBackground();

    let placeableGrids = game.getPlaceableGrids(nowPlayerSymbol);
    createHintEffect(placeableGrids, nowPlayerSymbol, background);
    createRelatiEffect(playerSymbol, background, game);
});

(<any>window).game = game;

import { Page } from "../view/Page";
import { RelatiGame } from "../main/RelatiGame";
import { RelatiBoard } from "../main/RelatiBoard";
import { RelatiPlayer } from "../main/RelatiPlayer";
import { BY_COMMON_RELATI } from "../main/rule/RelatiRoute";
import { RelatiBoardView } from "../view/RelatiBoard";
import { RelatiSymbol, RelatiEffect, RelatiAction } from "../main/RelatiDefs";
import { createHintEffect, createRelatiEffect } from "../view/RelatiEffect";
import { PlacementRule } from "../main/rule/Placement";
import { MessageBox } from "../view/MessageBox";
import { Placement } from "../main/skill/Placement";
import { DestoryRepeater, RestoreRepeater } from "../main/skill/Relati";
import { removeSVGChild } from "../core/SVGProcess";

const toMainPageButton: HTMLElement = document.getElementById("game-to-main") as HTMLElement;

toMainPageButton.addEventListener("click", () => {
    MessageBox.show("yorn accept reject", "確認離開？", message => {
        if (message == "accept") Page.switchTo("main");
    });
});

let board = new RelatiBoard(9, 9);
let players = [new RelatiPlayer("O"), new RelatiPlayer("X")];
let gridActions: RelatiAction[] = [Placement];
let gridEffects: RelatiEffect[] = [DestoryRepeater, RestoreRepeater];

let game = new RelatiGame(
    board, players, BY_COMMON_RELATI,
    gridActions,
    gridEffects
);

let container = document.getElementById("game-board") as HTMLElement;
let boardView = new RelatiBoardView(game, container);

window.addEventListener("hashchange", () => {
    if (location.hash == "#game") game.restart();
});

boardView.context.addEventListener("click", function (event: MouseEvent) {
    let x: number = Math.floor(event.offsetX / 5),
        y: number = Math.floor(event.offsetY / 5),
        grid = board.getGrid(x, y);

    if (MessageBox.isShow) return;
    if (game.selectGrid) game.selectGrid(grid);
});

game.onstart = boardView.remove.bind(boardView);

game.onend = gameResult => {
    let messageIcon = "";
    let messageContent = "";

    switch (gameResult) {
        case 1:
            messageIcon = "owin";
            messageContent = "圈方獲勝！";
            break;
        case 2:
            messageIcon = "xwin";
            messageContent = "叉方獲勝！";
            break;
        case 3:
            messageIcon = "draw";
            messageContent = "無人獲勝！";
            break;
    }

    MessageBox.show(`${messageIcon} accept reject`, messageContent, message => {
        if (message == "accept") game.restart();
    });
};

let prevPlayerSymbol: RelatiSymbol = "";

game.onturnstart = () => prevPlayerSymbol = game.nowPlayer.symbol;
game.ongridselect = boardView.update.bind(boardView);

game.onturnend = async () => {
    boardView.update();

    let symbol = game.nowPlayer.symbol;
    let grids = PlacementRule.trace(
        game, symbol, BY_COMMON_RELATI
    );

    removeSVGChild(boardView.layers[0]);
    removeSVGChild(boardView.layers[1]);

    createHintEffect(grids, symbol, boardView.layers[1]);
    createRelatiEffect(prevPlayerSymbol, boardView.layers[0], game);
};

game.start();

(function (global: any) {
    global["game"] = game;
})(window);
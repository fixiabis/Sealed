import { Page } from "../view/Page";
import { MessageBox } from "../view/MessageBox";
import { RelatiGame } from "../main/RelatiGame";
import { RelatiBoard, RelatiGrid } from "../main/RelatiBoard";
import { RelatiPlayer } from "../main/RelatiPlayer";
import { BY_COMMON_RELATI } from "../main/rule/RelatiRoute";
import { RelatiBoardView } from "../view/RelatiBoard";
import { RelatiSymbol, RelatiEffect, RelatiAction } from "../main/RelatiDefs";
import { createHintEffect, createRelatiEffect } from "../view/RelatiEffect";
import { PlacementRule } from "../main/rule/Placement";
import { Placement } from "../main/skill/Placement";
import { DestoryRepeater, RestoreRepeater } from "../main/skill/Relati";
import { updateSVG, removeSVGChild } from "../core/SVGProcess";

const toMainPageButton: HTMLElement = document.getElementById("help-to-main") as HTMLElement;
const helpMessaageView: HTMLElement = document.getElementById("help-desc") as HTMLElement;

toMainPageButton.addEventListener("click", event => {
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

let container = document.getElementById("help-board") as HTMLElement;
let boardView = new RelatiBoardView(game, container);

window.addEventListener("hashchange", () => {
    if (location.hash == "#help") game.restart();
});

boardView.context.addEventListener("click", function (event: MouseEvent) {
    let x: number = Math.floor(event.offsetX / 5),
        y: number = Math.floor(event.offsetY / 5),
        grid = board.getGrid(x, y);

    if (
        MessageBox.isShow ||
        game.nowPlayer.symbol !== "O" ||
        stepHint[game.turn] &&
        stepHint[game.turn].indexOf(grid) < 0
    ) return;

    if (game.selectGrid) game.selectGrid(grid);
});

game.onstart = () => {
    MessageBox.show("verify", "放置符號時需發生連線，無法繼續放置符號時便輸了，以下為連線的範例", null);
    game.selectedGrid = stepGrid[game.turn];
    boardView.remove();
};

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

game.onturnstart = () => {
    prevPlayerSymbol = game.nowPlayer.symbol;

    if (stepMessage[game.turn]) {
        helpMessaageView.innerHTML = stepMessage[game.turn];
    }
};

game.ongridselect = boardView.update.bind(boardView);

game.onturnend = () => {
    boardView.update();

    let symbol = game.nowPlayer.symbol;
    let grids = PlacementRule.trace(
        game, symbol, BY_COMMON_RELATI
    );

    removeSVGChild(boardView.layers[0]);
    removeSVGChild(boardView.layers[1]);

    createHintEffect(
        grids,
        game.nowPlayer.symbol,
        boardView.layers[1]
    );

    if (stepHint[game.turn]) {
        for (let childNode of boardView.layers[1].childNodes as unknown as Array<ChildNode>) {
            updateSVG(childNode as SVGElement, { "opacity": "0.4" });
        }

        createHintEffect(
            stepHint[game.turn],
            game.nowPlayer.symbol,
            boardView.layers[1]
        );
    }

    createRelatiEffect(prevPlayerSymbol, boardView.layers[0], game);

    let turn = game.turn;

    if (game.turn < 2) {
        game.selectedGrid = stepGrid[game.turn];
    } else setTimeout(() => {
        if (game.turn !== turn) return;
        if (game.selectGrid) game.selectGrid(stepGrid[game.turn]);
    }, 1000);

    switch (game.turn) {
        case 11:
            MessageBox.show("verify", "倘若將一處圍成區塊時，對方將無法藉由連線把符號放入其中", null);
            break;
        case 51:
            MessageBox.show("verify", "恭喜，想必你對遊戲有一些概念了", function () {
                Page.switchTo("main");
            });
    }
};

let stepGrid: { [turn: number]: RelatiGrid } = {
    0: board.getGrid(4, 4),
    1: board.getGrid(5, 4),
    3: board.getGrid(4, 5),
    5: board.getGrid(2, 4),
    7: board.getGrid(5, 3),
    9: board.getGrid(7, 1),
    11: board.getGrid(7, 5),
    13: board.getGrid(8, 5),
    15: board.getGrid(5, 5),
    17: board.getGrid(3, 5),
    19: board.getGrid(2, 5),
    21: board.getGrid(6, 4),
    23: board.getGrid(5, 6),
    25: board.getGrid(5, 7),
    27: board.getGrid(4, 7),
    29: board.getGrid(3, 7),
    31: board.getGrid(2, 7),
    33: board.getGrid(1, 7),
    35: board.getGrid(0, 7),
    37: board.getGrid(1, 5),
    39: board.getGrid(1, 6),
    41: board.getGrid(2, 2),
    43: board.getGrid(3, 2),
    45: board.getGrid(0, 3),
    47: board.getGrid(4, 1),
    49: board.getGrid(0, 2)
};

let stepHint: { [turn: number]: RelatiGrid[] } = {
    2: [board.getGrid(4, 3), board.getGrid(3, 3)],
    4: [board.getGrid(2, 1), board.getGrid(3, 1)],
    6: [board.getGrid(6, 3)],
    8: [board.getGrid(5, 2)],
    10: [board.getGrid(6, 2)],
    12: [
        board.getGrid(5, 0),
        board.getGrid(5, 1),
        board.getGrid(7, 3),
        board.getGrid(8, 3)
    ],
    20: [board.getGrid(6, 5)],
    22: [board.getGrid(7, 4)],
    24: [board.getGrid(6, 7)],
    26: [board.getGrid(5, 8)],
    28: [board.getGrid(4, 8)],
    30: [board.getGrid(3, 8)],
    32: [board.getGrid(2, 8)],
    34: [board.getGrid(1, 8)],
    36: [board.getGrid(1, 3)],
    38: [board.getGrid(0, 5)],
    40: [board.getGrid(1, 1)],
    42: [board.getGrid(2, 3)],
    44: [board.getGrid(1, 2)],
    46: [board.getGrid(2, 1), board.getGrid(3, 1)],
    48: [board.getGrid(3, 0)],
    50: [board.getGrid(0, 1)]
};

stepHint[14] = stepHint[12];
stepHint[16] = stepHint[12];
stepHint[18] = stepHint[12];

let stepMessage: { [turn: number]: string } = {
    0: "一般連線範例",
    3: "遠程連線範例",
    5: "遠程連線中斷範例",
    7: "遠程連線恢復技巧",
    9: "遠程連線中斷技巧",
    11: "區塊建立技巧",
    19: "區塊破壞技巧",
    27: "區塊壓制技巧",
    41: "區塊抗壓技巧"
};

if (location.hash == "#help") game.start();
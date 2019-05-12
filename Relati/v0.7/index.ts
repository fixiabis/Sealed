import { RelatiBoard } from "./ts/core/RelatiBoard";
import { RelatiBoardView } from "./ts/game/RelatiView";
import { RelatiGame } from "./ts/main/RelatiGame";
import { BY_COMMON_RELATI } from "./ts/core/RelatiRoutes";

import "./scss/game/RelatiViewEffect.scss";
import "./scss/main/RelatiGame.scss";
import "./scss/page/GamePage.scss";
import "./scss/page/HelpPage.scss";
import "./scss/page/MainPage.scss";

import "./ts/page/Switcher.ts";
import "./ts/page/GamePage.ts";
import "./ts/page/HelpPage.ts";
import "./ts/page/MainPage.ts";

let gameView = document.querySelector("#board-container") as HTMLElement;
let board = new RelatiBoard(9, 9);
let boardView = new RelatiBoardView(board, gameView);
let game = new RelatiGame(board, boardView, BY_COMMON_RELATI);
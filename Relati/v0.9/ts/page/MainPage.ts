import { Page } from "../view/Page";

const toGamePageButton: HTMLElement = document.getElementById("main-to-game") as HTMLElement;
const toHelpPageButton: HTMLElement = document.getElementById("main-to-help") as HTMLElement;

toGamePageButton.addEventListener("click", event => Page.switchTo("game"));
toHelpPageButton.addEventListener("click", event => Page.switchTo("help"));
namespace MainPage {
    let toGamePage: HTMLElement;
    let toHelpPage: HTMLElement;

    toGamePage = document.getElementById("main-to-game") as HTMLElement;
    toHelpPage = document.getElementById("main-to-help") as HTMLElement;

    toGamePage.addEventListener("click", event => {
        location.hash = "#game-page";
    });
    toHelpPage.addEventListener("click", event => {
        location.hash = "#help-page";
    });
}
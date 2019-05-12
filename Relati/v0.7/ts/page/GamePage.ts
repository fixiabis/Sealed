namespace GamePage {
    let toMainPage: HTMLElement;

    toMainPage = document.getElementById("game-to-main") as HTMLElement;
    toMainPage.addEventListener("click", event => {
        location.hash = "#main-page";
    });
}
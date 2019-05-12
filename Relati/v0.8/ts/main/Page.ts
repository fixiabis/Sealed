export namespace Page {
    export function switchTo(pageName: string) {
        location.hash = pageName;
    }

    function switchToPage() {
        let activePage;

        activePage = document.getElementsByClassName("page active")[0];
        if (activePage) activePage.classList.remove("active");

        activePage = document.querySelector(`${location.hash}-page`);
        if (activePage) activePage.classList.add("active");
    }

    window.addEventListener("hashchange", switchToPage);
    switchToPage();
}
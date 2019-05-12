namespace Switcher {
    function pageSwitch() {
        let prevActivePage: Element | null = document.getElementsByClassName("page active")[0];
        let nextActivePage = document.querySelector(location.hash);
        if (prevActivePage == nextActivePage) return;
        if (nextActivePage) nextActivePage.classList.add("active");
        if (prevActivePage) prevActivePage.classList.remove("active");
    }

    window.addEventListener("hashchange", pageSwitch);
    if (location.hash) pageSwitch();
}
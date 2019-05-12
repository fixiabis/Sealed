var TicTac = (function () {
    var startTime;

    return {
        tic: function () {
            return startTime = new Date().getTime();
        },
        tac: function () {
            return new Date().getTime() - startTime;
        }
    }
})();
var OXDUAStatus = (function () {
    var viewsChange = function (grid, color) {
        var views = grid.symbolViews;

        for (var i = 0; i < views.length; i++) {
            views[i].setAttribute("stroke", color);
        }
    };

    return function (board) {
        for (var crd in board.gridOf) {
            var grid = board.gridOf[crd];

            grid.setStatus = function (status) {
                var views = this.symbolViews;

                if (!views) return;

                if (status === "broken") {
                    viewsChange(this, "#bbb");
                } else {
                    viewsChange(
                        this,
                        this.symbol === "O"
                            ? "#dc143c"
                            : "#4169e1"
                    );
                }

                this.status = status;
            };

            grid.status = "";
        }
    };
})();
var OXDUA = (function () {
    var viewsCreate = {
        "O": function (grid) {
            var symbolViews = grid.board.createViews([
                {
                    tag: "circle",
                    attribute: {
                        "stroke-width": 2,
                        "cx": grid.x * 20 + 10,
                        "cy": grid.y * 20 + 10,
                        "r": 6,
                        "stroke": "#dc143c",
                        "fill": "none"
                    }
                }
            ]);
            return symbolViews;
        },
        "X": function (grid) {
            var startX = grid.x * 20 + 4;
            var startY = grid.y * 20 + 4;
            var endX = grid.x * 20 + 16;
            var endY = grid.y * 20 + 16;
            var symbolViews = grid.board.createViews([
                {
                    tag: "path",
                    attribute: {
                        "stroke-width": 2,
                        "d": "M " + startX + " " + startY + " L " + endX + " " + endY,
                        "stroke": "#4169e1",
                        "fill": "none"
                    }
                }, {
                    tag: "path",
                    attribute: {
                        "stroke-width": 2,
                        "d": "M " + startX + " " + endY + " L " + endX + " " + startY,
                        "stroke": "#4169e1",
                        "fill": "none"
                    }
                }
            ]);
            return symbolViews;
        }
    };

    return function (board) {
        for (var crd in board.gridOf) {
            var grid = board.gridOf[crd];

            grid.set = function (sym) {
                var views = this.symbolViews;

                if (views) {
                    views.forEach(function (view) {
                        board.viewer.removeChild(view)
                    });
                    delete this.symbolViews;
                }

                if (viewsCreate[sym]) {
                    var views = viewsCreate[sym](this);
                    views.forEach(function (view) {
                        board.viewer.appendChild(view)
                    });
                    this.symbolViews = views;
                }

                this.symbol = sym;
            };

            grid.symbol = "";
        }
    };
})();
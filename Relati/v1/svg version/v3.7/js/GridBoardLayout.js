"use strict";
var GridBoardLayout = /** @class */ (function () {
    function GridBoardLayout() {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        this.views = [];
        window.addEventListener("resize", this.resize.bind(this));
    }
    GridBoardLayout.prototype.render = function () {
        setInterval(function () {
            for (var _i = 0, _a = this.views; _i < _a.length; _i++) {
                var view = _a[_i];
                view.render(this);
            }
        }.bind(this), 20);
    };
    GridBoardLayout.prototype.resize = function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    };
    return GridBoardLayout;
}());

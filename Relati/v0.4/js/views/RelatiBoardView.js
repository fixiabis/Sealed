(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../RelatiSVG"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RelatiSVG_1 = require("../RelatiSVG");
    var GridsRender = /** @class */ (function () {
        function GridsRender(boardView) {
            this.boardView = boardView;
            this.layer = RelatiSVG_1.RelatiSVG("g");
        }
        GridsRender.prototype.render = function () {
            var _a = this.boardView, gridRenderers = _a.gridRenderers, game = _a.game, gridSize = _a.gridSize;
            var board = game.board;
            RelatiSVG_1.RelatiSVG.empty(this.layer);
            for (var _i = 0, gridRenderers_1 = gridRenderers; _i < gridRenderers_1.length; _i++) {
                var gridRenderer = gridRenderers_1[_i];
                for (var _b = 0, _c = board.gridList; _b < _c.length; _b++) {
                    var grid = _c[_b];
                    var gridView = gridRenderer.render(grid, gridSize);
                    if (gridView)
                        this.layer.appendChild(gridView);
                }
            }
        };
        return GridsRender;
    }());
    var RelatiBoardView = /** @class */ (function () {
        function RelatiBoardView(game, gridSize) {
            this.game = game;
            this.gridSize = gridSize;
            this.layers = [];
            this.container = RelatiSVG_1.RelatiSVG("svg");
            this.background = RelatiSVG_1.RelatiSVG("g");
            this.gridRenderers = [];
            this.boardRenderers = [];
            var _a = game.board, width = _a.width, height = _a.height;
            this.width = width * gridSize;
            this.height = height * gridSize;
            this.container = RelatiSVG_1.RelatiSVG("svg", {
                "width": "" + this.width,
                "height": "" + this.height
            });
            var gridLineLayer = RelatiSVG_1.RelatiSVG("g");
            var gridLineProp = {
                "d": "",
                "stroke": "#888",
                "stroke-width": "" + gridSize * 0.08,
                "fill": "none"
            };
            for (var x = 1; x < width; x++) {
                gridLineProp["d"] = "M " + x * gridSize + " 0 V " + gridSize * height;
                var gridLine = RelatiSVG_1.RelatiSVG("path", gridLineProp);
                gridLineLayer.appendChild(gridLine);
            }
            for (var y = 1; y < height; y++) {
                gridLineProp["d"] = "M 0 " + y * gridSize + " H " + gridSize * width;
                var gridLine = RelatiSVG_1.RelatiSVG("path", gridLineProp);
                gridLineLayer.appendChild(gridLine);
            }
            this.layers.push(this.background);
            this.layers.push(gridLineLayer);
            var boardRenderer = new GridsRender(this);
            this.boardRenderers.push(boardRenderer);
            this.layers.push(boardRenderer.layer);
            this.render();
        }
        RelatiBoardView.prototype.render = function () {
            var container = this.container;
            RelatiSVG_1.RelatiSVG.empty(container);
            for (var _i = 0, _a = this.boardRenderers; _i < _a.length; _i++) {
                var renderer = _a[_i];
                renderer.render();
            }
            for (var _b = 0, _c = this.layers; _b < _c.length; _b++) {
                var layer = _c[_b];
                container.appendChild(layer);
            }
        };
        return RelatiBoardView;
    }());
    exports.RelatiBoardView = RelatiBoardView;
});
//# sourceMappingURL=RelatiBoardView.js.map
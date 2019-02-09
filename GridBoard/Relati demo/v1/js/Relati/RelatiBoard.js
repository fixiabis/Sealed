"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Relati;
(function (Relati) {
    var RelatiBoard = /** @class */ (function (_super) {
        __extends(RelatiBoard, _super);
        function RelatiBoard(width, height, gridSize) {
            var _this = _super.call(this, width, height) || this;
            _this.width = width;
            _this.height = height;
            _this.gridSize = gridSize;
            _this.gridList = [];
            for (var x = 0; x < width; x++) {
                for (var y = 0; y < height; y++) {
                    var grid = new Relati.RelatiGrid(_this, x, y);
                    _this.grids[x][y] = grid;
                    _this.gridList.push(grid);
                }
            }
            _this.view = createSVG("svg", {
                width: "" + width * gridSize,
                height: "" + height * gridSize
            });
            return _this;
        }
        RelatiBoard.prototype.addBackground = function () {
            var backgroundView = createSVG("g");
            this.view.appendChild(backgroundView);
        };
        RelatiBoard.prototype.drawGridLine = function () {
            var _a = this, width = _a.width, height = _a.height, gridSize = _a.gridSize;
            var lineContainer = createSVG("g");
            var lineColor = "#888";
            var lineWidth = "0.2";
            var lineAttribute = {
                "stroke": lineColor,
                "stroke-width": lineWidth,
                "d": ""
            };
            for (var x = 1; x < width; x++) {
                var linePositionX = x * gridSize;
                var linePositionY = 0;
                var lineLength = height * gridSize;
                lineAttribute["d"] = ("M " + linePositionX + " " + linePositionY +
                    ("v " + lineLength));
                var line = createSVG("path", lineAttribute);
                lineContainer.appendChild(line);
            }
            for (var y = 1; y < height; y++) {
                var linePositionX = 0;
                var linePositionY = y * gridSize;
                var lineLength = width * gridSize;
                lineAttribute["d"] = ("M " + linePositionX + " " + linePositionY +
                    ("h " + lineLength));
                var line = createSVG("path", lineAttribute);
                lineContainer.appendChild(line);
            }
            this.view.appendChild(lineContainer);
        };
        RelatiBoard.prototype.viewInitialize = function (container) {
            this.addBackground();
            this.drawGridLine();
            for (var _i = 0, _a = this.gridList; _i < _a.length; _i++) {
                var grid = _a[_i];
                this.view.appendChild(grid.view);
            }
            this.viewResize(container.clientWidth, container.clientHeight);
            container.appendChild(this.view);
            window.addEventListener("resize", function () {
                this.viewResize(container.clientWidth, container.clientHeight);
            }.bind(this));
            container.appendChild(this.view);
        };
        RelatiBoard.prototype.viewResize = function (containerWidth, containerHeight) {
            var gridSize = this.gridSize;
            var boardViewWidth = this.width * gridSize;
            var boardViewHeight = this.height * gridSize;
            var widthScalingRatio = containerWidth / boardViewWidth;
            var heightScalingRatio = containerHeight / boardViewHeight;
            var scalingRatio = Math.min(widthScalingRatio, heightScalingRatio);
            scalingRatio *= 0.95;
            this.view.style.transform = "scale(" + scalingRatio + ")";
        };
        return RelatiBoard;
    }(GridBoard));
    Relati.RelatiBoard = RelatiBoard;
})(Relati || (Relati = {}));
//# sourceMappingURL=RelatiBoard.js.map
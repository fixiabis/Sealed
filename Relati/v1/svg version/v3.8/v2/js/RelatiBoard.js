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
var RelatiGrid = /** @class */ (function (_super) {
    __extends(RelatiGrid, _super);
    function RelatiGrid() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.role = new RelatiRole(_this);
        return _this;
    }
    return RelatiGrid;
}(Grid));
var RelatiBoard = /** @class */ (function (_super) {
    __extends(RelatiBoard, _super);
    function RelatiBoard(width, height) {
        var _this = _super.call(this, width, height) || this;
        _this.layout = new GridBoardLayout();
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var grid = new RelatiGrid(_this, x, y);
                _this.grids[x][y] = grid;
            }
        }
        return _this;
    }
    return RelatiBoard;
}(GridBoard));
var rule = {
    "relati-noraml": new RelatiRule("O is owner{S}"),
    "relati-remote-normal": new RelatiRule("2O is owner{S} && O is space"),
    "relati-remote-stable": new RelatiRule("IIH is owner{S} && II is space && I is space || " +
        "IIH is owner{S} && IH is space && I is space || " +
        "IIH is owner{S} && IH is space && H is space || " +
        "IHH is owner{S} && HH is space && H is space || " +
        "IHH is owner{S} && IH is space && I is space || " +
        "IHH is owner{S} && IH is space && H is space")
};
//# sourceMappingURL=RelatiBoard.js.map
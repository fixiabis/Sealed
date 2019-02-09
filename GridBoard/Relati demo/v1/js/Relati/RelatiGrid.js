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
    var RelatiGrid = /** @class */ (function (_super) {
        __extends(RelatiGrid, _super);
        function RelatiGrid() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.role = new Relati.RelatiRole(_this);
            _this.view = createSVG("g");
            return _this;
        }
        return RelatiGrid;
    }(Grid));
    Relati.RelatiGrid = RelatiGrid;
})(Relati || (Relati = {}));
//# sourceMappingURL=RelatiGrid.js.map
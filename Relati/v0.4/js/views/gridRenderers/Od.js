(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../RelatiSVG"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RelatiSVG_1 = require("../../RelatiSVG");
    exports.Od = {
        render: function (grid, gridSize) {
            if (!grid.role || grid.role.owner.badge != "O")
                return;
            var srtX = (grid.x + 0.2) * gridSize;
            var srtY = (grid.y + 0.2) * gridSize;
            var endX = (grid.x + 0.8) * gridSize;
            var endY = (grid.y + 0.8) * gridSize;
            var gridViews = RelatiSVG_1.RelatiSVG("g");
            var gridViewProp = {
                "d": "\n                M " + (srtX + 1.5) + " " + (srtY + 1.5) + "\n                m 0 -1.5\n                a 1.5 1.5 0 0 1, 0 3\n                a 1.5 1.5 0 0 1, 0 -3\n            ",
                "stroke": "crimson",
                "stroke-width": "" + gridSize * 0.12,
                "fill": "none"
            };
            if (grid.role.is("relati-launcher")) {
                gridViewProp["stroke-width"] = "" + gridSize * 0.2;
                gridViews.appendChild(RelatiSVG_1.RelatiSVG("path", gridViewProp));
                gridViewProp["stroke"] = "#f2f2f2";
                gridViewProp["stroke-width"] = "" + gridSize * 0.1;
                gridViews.appendChild(RelatiSVG_1.RelatiSVG("path", gridViewProp));
            }
            else if (grid.role.is("relati-repeater")) {
                gridViews.appendChild(RelatiSVG_1.RelatiSVG("path", gridViewProp));
            }
            else {
                gridViewProp["stroke"] = "#666";
                gridViews.appendChild(RelatiSVG_1.RelatiSVG("path", gridViewProp));
            }
            return gridViews;
        }
    };
});
//# sourceMappingURL=Od.js.map
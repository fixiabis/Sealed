(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SVGNS = "http://www.w3.org/2000/svg";
    function RelatiSVG(type, prop) {
        if (prop === void 0) { prop = {}; }
        var element = document.createElementNS(SVGNS, type);
        RelatiSVG.update(element, prop);
        return element;
    }
    exports.RelatiSVG = RelatiSVG;
    RelatiSVG.update = function (element, prop) {
        for (var name in prop)
            element.setAttribute(name, prop[name]);
    };
    RelatiSVG.empty = function (element) {
        var count = element.childNodes.length;
        while (count--)
            element.removeChild(element.childNodes[0]);
    };
});
//# sourceMappingURL=RelatiSVG.js.map
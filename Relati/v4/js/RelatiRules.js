(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./rules/RelatiBySource", "./rules/RelatiToTarget", "./rules/RelatiPath"], factory);
    }
})(function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(require("./rules/RelatiBySource"));
    __export(require("./rules/RelatiToTarget"));
    __export(require("./rules/RelatiPath"));
});
//# sourceMappingURL=RelatiRules.js.map
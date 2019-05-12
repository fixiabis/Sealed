var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Relati", "./RelatiSVG", "./RelatiViews", "./RelatiGridRenderers"], factory);
    }
})(function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(require("./Relati"));
    __export(require("./RelatiSVG"));
    var RelatiViews = __importStar(require("./RelatiViews"));
    exports.RelatiViews = RelatiViews;
    var RelatiGridRenderers = __importStar(require("./RelatiGridRenderers"));
    exports.RelatiGridRenderers = RelatiGridRenderers;
});
// import * as RelatiBoardRenderers from "./RelatiBoardRenderers";
// export { RelatiBoardRenderers };
//# sourceMappingURL=RelatiClient.js.map
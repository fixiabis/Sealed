/**
 * @overview 棋盤遊戲
 * @author fixiabis <fixiabis@github.com>
 * @version 1.1
 */
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
        define(["require", "exports", "./RelatiGame", "./RelatiPlayer", "./RelatiRole", "./RelatiRoleStatus", "./RelatiRules", "./RelatiSkills"], factory);
    }
})(function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(require("./RelatiGame"));
    __export(require("./RelatiPlayer"));
    __export(require("./RelatiRole"));
    __export(require("./RelatiRoleStatus"));
    var RelatiRules = __importStar(require("./RelatiRules"));
    exports.RelatiRules = RelatiRules;
    var RelatiSkills = __importStar(require("./RelatiSkills"));
    exports.RelatiSkills = RelatiSkills;
});
//# sourceMappingURL=Relati.js.map
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./RelatiProtocol"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const RelatiProtocol_1 = require("./RelatiProtocol");
    const sourceType = "relati-target";
    const targetType = "relati-source";
    const relyStatus = ["relati-launcher", "relati-repeater"];
    exports.RoleSummon = {
        name: "角色召喚",
        detail: "是否符合角色召喚的規則",
        allow({ game, role, role: { grid }, allowCache = true }) {
            if (grid.role)
                return false;
            if (game.turn < game.playerCount)
                return true;
            return RelatiProtocol_1.RelatiProtocol.allow({
                role,
                sourceType,
                targetType,
                relyStatus,
                allowCache
            });
        }
    };
});

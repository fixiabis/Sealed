(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../rules/RoleSummon"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const RoleSummon_1 = require("../rules/RoleSummon");
    exports.NormalRoleSummon = {
        type: "action",
        name: "一般召喚",
        detail: "召喚角色至棋盤上",
        priority: 0,
        async do({ game, role }) {
            if (!RoleSummon_1.RoleSummon.allow({ game, role }))
                return;
            await game.do("role-create", role);
            if (game.turn < game.playerCount) {
                await game.do("role-leader", role);
            }
            await game.do("next-player");
        }
    };
});

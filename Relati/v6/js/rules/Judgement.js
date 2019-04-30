(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../RelatiRole", "./RelatiProtocol"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const RelatiRole_1 = require("../RelatiRole");
    const RelatiProtocol_1 = require("./RelatiProtocol");
    const sourceType = "relati-target";
    const targetType = "relati-source";
    const relyStatus = ["relati-launcher", "relati-repeater"];
    exports.Judgement = {
        name: "勝負判定",
        detail: "若無法繼續放置角色時判負",
        allow({ game: { board: { gridList } }, owner }) {
            for (let grid of gridList) {
                if (grid.role)
                    continue;
                var role = new RelatiRole_1.RelatiRole(grid, owner);
                role.gain("relati-receiver");
                role.params["relati-source"] = RelatiProtocol_1.RelatiProtocolParams.RelatiNormal;
                var relatiable = RelatiProtocol_1.RelatiProtocol.allow({
                    role,
                    sourceType,
                    targetType,
                    relyStatus
                });
                if (relatiable)
                    return true;
            }
            return false;
        }
    };
});

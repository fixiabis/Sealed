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
    exports.RelatiDestory = {
        when: "next-player",
        type: "effect",
        name: "連結破壞",
        detail: "破壞對方所有角色的連結轉發機能",
        priority: 0,
        async do({ owner: { owner, grid: { board: { gridList } } } }) {
            for (var { role } of gridList) {
                if (role && role.owner != owner) {
                    role.lost("relati-repeater");
                }
            }
        }
    };
});

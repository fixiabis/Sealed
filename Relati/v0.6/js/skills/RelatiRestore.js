(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../rules/RelatiProtocol"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const RelatiProtocol_1 = require("../rules/RelatiProtocol");
    exports.RelatiRestore = {
        when: "next-player",
        type: "effect",
        name: "連結恢復",
        detail: "恢復我方所有角色的連結轉發機能",
        priority: 10,
        async do({ owner }) {
            if (!owner.is("relati-launcher"))
                return;
            await restore(owner, owner.owner);
        }
    };
    const sourceType = "relati-source";
    const targetType = "relati-target";
    const relyStatus = ["relati-receiver"];
    async function restore(role, owner) {
        if (role.owner != owner || role.is("relati-repeater"))
            return;
        role.gain("relati-repeater");
        var traces = RelatiProtocol_1.RelatiProtocol.trace({
            role,
            sourceType,
            targetType,
            relyStatus
        });
        await Promise.all(traces.map(({ target }) => new Promise(resolve => {
            if (!target.role)
                return resolve();
            restore(target.role, owner).then(resolve);
        })));
    }
});

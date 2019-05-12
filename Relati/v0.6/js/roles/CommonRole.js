(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../RelatiRole", "../rules/RelatiProtocol", "../skills/RelatiDestroy", "../skills/RelatiRestore"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const RelatiRole_1 = require("../RelatiRole");
    const RelatiProtocol_1 = require("../rules/RelatiProtocol");
    const RelatiDestroy_1 = require("../skills/RelatiDestroy");
    const RelatiRestore_1 = require("../skills/RelatiRestore");
    class CommonRole extends RelatiRole_1.RelatiRole {
        constructor(grid, owner, type) {
            super(grid, owner, type);
            this.params["relati-source"] = RelatiProtocol_1.RelatiProtocolParams.RelatiCommon;
            this.params["relati-target"] = RelatiProtocol_1.RelatiProtocolParams.RelatiCommon;
            if (type == "leader") {
                this.gain("relati-launcher");
                this.skills.push(RelatiDestroy_1.RelatiDestory);
                this.skills.push(RelatiRestore_1.RelatiRestore);
            }
            else
                this.gain("relati-receiver");
        }
    }
    exports.CommonRole = CommonRole;
});

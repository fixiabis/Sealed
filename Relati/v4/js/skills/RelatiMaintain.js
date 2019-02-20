(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./RelatiMaintainRoute", "../rules/RelatiToTarget"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RelatiMaintainRoute_1 = require("./RelatiMaintainRoute");
    var RelatiToTarget_1 = require("../rules/RelatiToTarget");
    exports.RelatiCommonMaintain = {
        name: "通用連結維持",
        type: "effect",
        do: function (state) {
            state.status = "relati-repeater";
            state.toTarget = RelatiToTarget_1.RelatiCommonToTarget;
            return RelatiMaintainRoute_1.RelatiMaintainRoute.do(state);
        }
    };
    exports.RelatiNormalMaintain = {
        name: "一般連結維持",
        type: "effect",
        do: function (state) {
            state.status = "relati-normal-repeater";
            state.toTarget = RelatiToTarget_1.RelatiNormalToTarget;
            return RelatiMaintainRoute_1.RelatiMaintainRoute.do(state);
        }
    };
    exports.RelatiRemoteMaintain = {
        name: "遠程連結維持",
        type: "effect",
        do: function (state) {
            state.status = "relati-remote-repeater";
            state.toTarget = RelatiToTarget_1.RelatiRemoteToTarget;
            return RelatiMaintainRoute_1.RelatiMaintainRoute.do(state);
        }
    };
    exports.RelatiRemoteNormalMaintain = {
        name: "遠程一般連結維持",
        type: "effect",
        do: function (state) {
            state.status = "relati-remote-normal-repeater";
            state.toTarget = RelatiToTarget_1.RelatiRemoteNormalToTarget;
            return RelatiMaintainRoute_1.RelatiMaintainRoute.do(state);
        }
    };
    exports.RelatiRemoteStableMaintain = {
        name: "遠程穩定連結維持",
        type: "effect",
        do: function (state) {
            state.status = "relati-remote-stable-repeater";
            state.toTarget = RelatiToTarget_1.RelatiRemoteStableToTarget;
            return RelatiMaintainRoute_1.RelatiMaintainRoute.do(state);
        }
    };
});
//# sourceMappingURL=RelatiMaintain.js.map
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "././RelatiPath"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RelatiPath_1 = require("././RelatiPath");
    /** 通用連結來源狀態 */
    exports.RelatiCommonSourceStatus = [
        "relati-launcher",
        "relati-repeater"
    ];
    /** 通用連結來源規則 */
    exports.RelatiCommonBySource = {
        allow: function (state) {
            return (exports.RelatiNormalBySource.allow(state),
                exports.RelatiRemoteBySource.allow(state));
        },
        trace: function (state) {
            return exports.RelatiNormalBySource.trace(state).concat(exports.RelatiRemoteBySource.trace(state));
        }
    };
    /** 一般連結來源狀態 */
    exports.RelatiNormalSourceStatus = exports.RelatiCommonSourceStatus.concat([
        "relati-normal-launcher",
        "relati-normal-repeater"
    ]);
    /** 一般連結來源規則 */
    exports.RelatiNormalBySource = {
        allow: function (state) {
            state.status = exports.RelatiNormalSourceStatus;
            return RelatiPath_1.RelatiNormalPath.allow(state);
        },
        trace: function (state) {
            state.status = exports.RelatiNormalSourceStatus;
            return RelatiPath_1.RelatiNormalPath.trace(state);
        }
    };
    /** 遠程連結來源狀態 */
    exports.RelatiRemoteSourceStatus = exports.RelatiCommonSourceStatus.concat([
        "relati-remote-launcher",
        "relati-remote-repeater"
    ]);
    /** 遠程連結來源規則 */
    exports.RelatiRemoteBySource = {
        allow: function (state) {
            return (exports.RelatiRemoteNormalBySource.allow(state),
                exports.RelatiRemoteStableBySource.allow(state));
        },
        trace: function (state) {
            return exports.RelatiRemoteNormalBySource.trace(state).concat(exports.RelatiRemoteStableBySource.trace(state));
        }
    };
    /** 遠程一般連結來源狀態 */
    exports.RelatiRemoteNormalSourceStatus = exports.RelatiRemoteSourceStatus.concat([
        "relati-remote-normal-launcher",
        "relati-remote-normal-repeater"
    ]);
    /** 遠程一般連結來源規則 */
    exports.RelatiRemoteNormalBySource = {
        allow: function (state) {
            state.status = exports.RelatiRemoteNormalSourceStatus;
            return RelatiPath_1.RelatiRemoteNormalPath.allow(state);
        },
        trace: function (state) {
            state.status = exports.RelatiRemoteNormalSourceStatus;
            return RelatiPath_1.RelatiRemoteNormalPath.trace(state);
        }
    };
    /** 遠程穩定連結來源狀態 */
    exports.RelatiRemoteStableSourceStatus = exports.RelatiRemoteSourceStatus.concat([
        "relati-remote-stable-launcher",
        "relati-remote-stable-repeater"
    ]);
    /** 遠程穩定連結來源規則 */
    exports.RelatiRemoteStableBySource = {
        allow: function (state) {
            state.status = exports.RelatiRemoteStableSourceStatus;
            return RelatiPath_1.RelatiRemoteStablePath.allow(state);
        },
        trace: function (state) {
            state.status = exports.RelatiRemoteStableSourceStatus;
            return RelatiPath_1.RelatiRemoteStablePath.trace(state);
        }
    };
});
//# sourceMappingURL=RelatiBySource.js.map
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
    /** 角色狀態 */
    var RelatiRoleStatus;
    (function (RelatiRoleStatus) {
        RelatiRoleStatus.RelatiCommon = [
            "relati-launcher",
            "relati-repeater",
            "relati-receiver"
        ];
        RelatiRoleStatus.RelatiNormal = [
            "relati-normal-launcher",
            "relati-normal-repeater",
            "relati-normal-receiver"
        ];
        RelatiRoleStatus.RelatiRemote = [
            "relati-remote-launcher",
            "relati-remote-repeater",
            "relati-remote-receiver"
        ];
        RelatiRoleStatus.RelatiRemoteNormal = [
            "relati-remote-normal-launcher",
            "relati-remote-normal-repeater",
            "relati-remote-normal-receiver"
        ];
        RelatiRoleStatus.RelatiRemoteStable = [
            "relati-remote-stable-launcher",
            "relati-remote-stable-repeater",
            "relati-remote-stable-receiver"
        ];
        RelatiRoleStatus.RelatiLauncher = [
            "relati-launcher",
            "relati-normal-launcher",
            "relati-remote-launcher",
            "relati-remote-normal-launcher",
            "relati-remote-stable-launcher"
        ];
        RelatiRoleStatus.RelatiRepeater = [
            "relati-repeater",
            "relati-normal-repeater",
            "relati-remote-repeater",
            "relati-remote-normal-repeater",
            "relati-remote-stable-repeater"
        ];
        RelatiRoleStatus.RelatiReceiver = [
            "relati-receiver",
            "relati-normal-receiver",
            "relati-remote-receiver",
            "relati-remote-normal-receiver",
            "relati-remote-stable-receiver"
        ];
    })(RelatiRoleStatus = exports.RelatiRoleStatus || (exports.RelatiRoleStatus = {}));
});
//# sourceMappingURL=RelatiRoleStatus.js.map
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
    class RelatiRole {
        constructor(grid, owner, type = "normal") {
            this.grid = grid;
            this.owner = owner;
            this.type = type;
            this.status = {};
            this.points = {};
            this.params = {};
            this.skills = [];
        }
        is(status, type) {
            if (typeof status === "string")
                return this.status[status];
            if (type === "any") {
                for (let name of status) {
                    if (this.status[name])
                        return true;
                }
                return false;
            }
            else {
                for (let name of status) {
                    if (!this.status[name])
                        return false;
                }
                return true;
            }
        }
        gain(...status) {
            for (let name of status)
                this.status[name] = true;
        }
        lost(...status) {
            for (let name of status)
                this.status[name] = false;
        }
    }
    exports.RelatiRole = RelatiRole;
    var RelatiRoleStatus;
    (function (RelatiRoleStatus) {
        RelatiRoleStatus.Relati = [
            "relati-launcher",
            "relati-repeater",
            "relati-receiver"
        ];
    })(RelatiRoleStatus = exports.RelatiRoleStatus || (exports.RelatiRoleStatus = {}));
    var RelatiRoleParams;
    (function (RelatiRoleParams) {
        RelatiRoleParams.RelatiProtocol = [
            "relati-source",
            "relati-target"
        ];
    })(RelatiRoleParams = exports.RelatiRoleParams || (exports.RelatiRoleParams = {}));
    var RelatiRolePoints;
    (function (RelatiRolePoints) {
        RelatiRolePoints.RoleSummon = [
            "summon-points",
            "summon-assets"
        ];
    })(RelatiRolePoints = exports.RelatiRolePoints || (exports.RelatiRolePoints = {}));
});

"use strict";
var RelatiRole = /** @class */ (function () {
    function RelatiRole(grid) {
        this.grid = grid;
        this.type = "士兵";
        this.owner = "";
        this.status = [];
    }
    RelatiRole.prototype.has = function (status) {
        if (status.indexOf("|") > -1) {
            var statusList = status.split("|");
            for (var _i = 0, statusList_1 = statusList; _i < statusList_1.length; _i++) {
                var status = statusList_1[_i];
                if (this.has(status))
                    return true;
            }
            return false;
        }
        if (status.indexOf("&") > -1 || status.indexOf(" ") > -1) {
            var statusList = status.replace(/ /g, "&").split("&");
            for (var _a = 0, statusList_2 = statusList; _a < statusList_2.length; _a++) {
                var status = statusList_2[_a];
                if (!this.has(status))
                    return false;
            }
            return true;
        }
        return this.status.indexOf(status) > -1;
    };
    return RelatiRole;
}());
//# sourceMappingURL=RelatiRole.js.map
"use strict";
var Relati;
(function (Relati) {
    var RelatiRole = /** @class */ (function () {
        function RelatiRole(grid) {
            this.grid = grid;
            this.owner = "";
            this.type = "normal";
            this.name = "unknown";
            this.blood = 1;
            /* public statusList: RelatiRoleStatus[] = []; */
            this.status = {};
            this.effects = [];
        }
        ;
        RelatiRole.prototype.is = function (status) {
            if (status.indexOf("|") > -1) {
                var statusList = status.split("|");
                for (var _i = 0, statusList_1 = statusList; _i < statusList_1.length; _i++) {
                    var status = statusList_1[_i];
                    if (this.is(status))
                        return true;
                }
                return false;
            }
            if (status.indexOf("&") > -1) {
                var statusList = status.split("&");
                for (var _a = 0, statusList_2 = statusList; _a < statusList_2.length; _a++) {
                    var status = statusList_2[_a];
                    if (!this.is(status))
                        return false;
                }
                return true;
            }
            switch (status) {
                case "ownerO": return this.owner == "O";
                case "ownerX": return this.owner == "X";
                case "space": return (this.owner == "" || this.blood == 0);
                case "spaceR": return this.owner == "";
                case "spaceF": return this.blood == 0;
            }
            return this.status[status];
            /* return this.statusList.indexOf(<RelatiRoleStatus>status) != -1; */
        };
        RelatiRole.prototype.insertStatus = function (status) {
            return this.status[status] = true;
            /* var statusIndex = this.statusList.indexOf(<RelatiRoleStatus>status);
            if (statusIndex == -1) this.statusList.push(status); */
        };
        RelatiRole.prototype.updateStatus = function (status, newStatus) {
            /* var statusIndex = this.statusList.indexOf(<RelatiRoleStatus>status);
            this.statusList[statusIndex] = newStatus; */
        };
        RelatiRole.prototype.deleteStatus = function (status) {
            return this.status[status] = false;
            /* var statusIndex = this.statusList.indexOf(<RelatiRoleStatus>status);
            if (statusIndex != -1) this.statusList.splice(statusIndex, 1); */
        };
        return RelatiRole;
    }());
    Relati.RelatiRole = RelatiRole;
})(Relati || (Relati = {}));
//# sourceMappingURL=RelatiRole.js.map
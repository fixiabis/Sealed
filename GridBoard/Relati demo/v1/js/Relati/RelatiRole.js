"use strict";
var Relati;
(function (Relati) {
    var RelatiRole = /** @class */ (function () {
        function RelatiRole(grid) {
            this.grid = grid;
            this.owner = null;
            this.type = "normal";
            this.name = "unknown";
            this.blood = 1;
            this.actions = [];
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
                case "space": return (this.owner == null || this.blood == 0);
                case "spaceR": return this.owner == null;
                case "spaceF": return this.blood == 0;
            }
            return this[status];
        };
        return RelatiRole;
    }());
    Relati.RelatiRole = RelatiRole;
})(Relati || (Relati = {}));
//# sourceMappingURL=RelatiRole.js.map
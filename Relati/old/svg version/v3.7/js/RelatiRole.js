"use strict";
var RelatiRole = /** @class */ (function () {
    function RelatiRole(grid) {
        this.grid = grid;
        this.symbol = "";
        this.status = "normal";
    }
    /** @param status 狀態 */
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
        if (status.indexOf("&") > -1 || status.indexOf(" ") > -1) {
            var statusList = status.replace(/ /g, "&").split("&");
            for (var _a = 0, statusList_2 = statusList; _a < statusList_2.length; _a++) {
                var status = statusList_2[_a];
                if (!this.is(status))
                    return false;
            }
            return true;
        }
        switch (status) {
            case "ownerO": return this.symbol == "O";
            case "ownerX": return this.symbol == "X";
            case "spaceR": return this.symbol == "";
            case "spaceF": return (this.status == "broken" ||
                this.status == "perish");
            case "space": return (this.symbol == "" ||
                this.status == "broken" ||
                this.status == "perish");
            case "valid": return (this.status == "normal" ||
                this.status == "source");
        }
        return this.status == status;
    };
    return RelatiRole;
}());
[
    "\n    O is owner{S} partially ?\n        C.symbol = {S}\n    ",
    "\n    (2O is owner{S} & O is space) partially ?\n        C.symbol = {S}\n    ",
    "\n    (IIH is owner{S} & (\n        I,IH is space totally |\n        H,IH is space totally |\n        I,II is space totally\n    )) partially | (IHH is owner{S} & (\n        H,IH is space totally |\n        I,IH is space totally |\n        H,HH is space totally\n    )) partially ? C.symbol = {S}\n    "
];

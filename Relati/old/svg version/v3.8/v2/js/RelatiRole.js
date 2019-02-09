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
var RelatiRule = /** @class */ (function () {
    function RelatiRule(rule) {
        this.rule = rule;
        this.rules = [];
        var rules = rule.split(" || ");
        for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
            var rule_1 = rules_1[_i];
            this.rules = this.rules.concat(Grid.convertDirection(rule_1));
        }
    }
    RelatiRule.prototype.allow = function (grid, symbol) {
        for (var _i = 0, _a = this.rules; _i < _a.length; _i++) {
            var rule = _a[_i];
            if (RelatiRule.legal(rule, grid, symbol))
                return true;
        }
        return false;
    };
    RelatiRule.prototype.trace = function (grid, symbol) {
        var result = [];
        for (var _i = 0, _a = this.rules; _i < _a.length; _i++) {
            var rule = _a[_i];
            if (RelatiRule.legal(rule, grid, symbol)) {
                result.push(rule.replace(/\{S\}/g, symbol));
            }
        }
        return result;
    };
    RelatiRule.legal = function (rule, grid, symbol) {
        var rules = rule.split(" && ");
        for (var _i = 0, rules_2 = rules; _i < rules_2.length; _i++) {
            var rule_2 = rules_2[_i];
            var ruleCommand = rule_2.split(" is ");
            var targetGrid = grid.query(ruleCommand[0]);
            var status = ruleCommand[1].replace(/\{S\}/g, symbol);
            if (!targetGrid.role.is(status))
                return false;
        }
        return true;
    };
    return RelatiRule;
}());
var rule = {
    "relati-noraml": new RelatiRule("O is owner{S}"),
    "relati-remote-normal": new RelatiRule("2O is owner{S} && O is space"),
    "relati-remote-stable": new RelatiRule("IIH is owner{S} && II is space && I is space || " +
        "IIH is owner{S} && IH is space && I is space || " +
        "IIH is owner{S} && IH is space && H is space || " +
        "IHH is owner{S} && HH is space && H is space || " +
        "IHH is owner{S} && IH is space && I is space || " +
        "IHH is owner{S} && IH is space && H is space")
};
//# sourceMappingURL=RelatiRole.js.map
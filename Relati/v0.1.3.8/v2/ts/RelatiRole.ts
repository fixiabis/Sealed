/** 角色 */
interface RelatiRole {
    /** 角色符號 */
    symbol: RelatiRole.Symbol;
    /** 角色狀態 */
    status: RelatiRole.Status;
    /** 角色所在棋盤格 */
    grid: RelatiGrid;
    /** 角色狀態判斷 */
    is(status: string): boolean;
}

class RelatiRole implements RelatiRole {
    public symbol: RelatiRole.Symbol = "";
    public status: RelatiRole.Status = "normal";

    constructor(public grid: RelatiGrid) { }

    /** @param status 狀態 */
    is(status: string): boolean {
        if (status.indexOf("|") > -1) {
            var statusList = status.split("|");

            for (var status of statusList) {
                if (this.is(status)) return true;
            }

            return false;
        }

        if (status.indexOf("&") > -1 || status.indexOf(" ") > -1) {
            var statusList = status.replace(/ /g, "&").split("&");

            for (var status of statusList) {
                if (!this.is(status)) return false;
            }

            return true;
        }

        switch (<RelatiRole.ExpandStatus>status) {
            case "ownerO": return this.symbol == "O";
            case "ownerX": return this.symbol == "X";
            case "spaceR": return this.symbol == "";
            case "spaceF": return (
                this.status == "broken" ||
                this.status == "perish"
            );
            case "space": return (
                this.symbol == "" ||
                this.status == "broken" ||
                this.status == "perish"
            );
            case "valid": return (
                this.status == "normal" ||
                this.status == "source"
            );
        }

        return this.status == status;
    }
}

namespace RelatiRole {
    /** 角色符號 */
    export type Symbol = "" | "O" | "X";

    /** 角色狀態 */
    export type Status = (
        "normal" | // 一般
        "source" | // 來源
        "forbid" | // 阻斷
        "broken" | // 損毀
        "perish"   // 淪陷
    );

    /** 角色狀態擴充(查詢用) */
    export type ExpandStatus = (
        "ownerO" | "ownerX" |
        "spaceR" | "spaceF" | "space" |
        "valid"
    );
}

interface RelatiRule {
    rule: string;
    rules: string[];
}

class RelatiRule {
    rules: string[] = [];

    constructor(public rule: string) {
        var rules: string[] = rule.split(" || ");

        for (let rule of rules) {
            this.rules = this.rules.concat(
                Grid.convertDirection(rule)
            );
        }
    }

    allow(grid: RelatiGrid, symbol: RelatiRole.Symbol): boolean {
        for (var rule of this.rules) {
            if (RelatiRule.legal(rule, grid, symbol)) return true;
        }

        return false;
    }

    trace(grid: RelatiGrid, symbol: RelatiRole.Symbol): string[] {
        var result: string[] = [];

        for (var rule of this.rules) {
            if (RelatiRule.legal(rule, grid, symbol)) {
                result.push(rule.replace(/\{S\}/g, symbol));
            }
        }

        return result;
    }

    static legal(rule: RelatiRule["rule"], grid: RelatiGrid, symbol: RelatiRole.Symbol): boolean {
        var rules = rule.split(" && ");

        for (let rule of rules) {
            var ruleCommand = rule.split(" is ");
            var targetGrid = grid.query(ruleCommand[0]);
            var status = ruleCommand[1].replace(/\{S\}/g, symbol);

            if (!targetGrid.role.is(status)) return false;
        }

        return true;
    }
}

namespace RelatiRule {
    export type RuleType = "launcher" | "repeater" | "receptor" | "trigger";
}

var rule = {
    "relati-noraml": new RelatiRule("O is owner{S}"),
    "relati-remote-normal": new RelatiRule("2O is owner{S} && O is space"),
    "relati-remote-stable": new RelatiRule(
        "IIH is owner{S} && II is space && I is space || " +
        "IIH is owner{S} && IH is space && I is space || " +
        "IIH is owner{S} && IH is space && H is space || " +
        "IHH is owner{S} && HH is space && H is space || " +
        "IHH is owner{S} && IH is space && I is space || " +
        "IHH is owner{S} && IH is space && H is space"
    )
};
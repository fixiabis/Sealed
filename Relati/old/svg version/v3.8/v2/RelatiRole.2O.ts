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

/** 規則 */
interface RelatiRule {
    /** 條件類型 */
    type: "all" | "any";
    /** 狀態 */
    condition: string;
    conditions: RelatiRule.Parameter[]
}

class RelatiRule {
    static parse(syntax: string) {
        var precedence = { "(": 0, ")": 0, "is": 3, "&": 2, "|": 1 };
        var operatorStack: RelatiRule.Operator[] = [];
        var parameterStack: (RelatiRule.Parameter | string)[] = [];
        var isString = false;
        var stringStack = [];

        for (var word of syntax.replace(/\n/g, " ").split(" ")) {
            if (word[0] == "\"" && word[word.length - 1] == "\"") {
                parameterStack.push(word.replace(/"/g, ""));
            } else if (word[0] == "\"" || word[word.length - 1] == "\"") {
                isString = !isString;
                stringStack.push(word);
                if (!isString) {
                    parameterStack.push(stringStack.join(" ").replace(/"/g, ""));
                    stringStack = [];
                }
            } else if (isString) {
                stringStack.push(word);
                continue;
            }

            if (word == "(") operatorStack.push(word);
            else if (word == ")") {
                while (operatorStack[operatorStack.length - 1] != "(") {
                    var operator: RelatiRule.Operator = <RelatiRule.Operator>operatorStack.pop();
                    var param2: RelatiRule.Parameter = <RelatiRule.Parameter>parameterStack.pop();
                    var param1: RelatiRule.Parameter = <RelatiRule.Parameter>parameterStack.pop();
                    parameterStack.push({ operator, param1, param2 });
                }

                operatorStack.pop();
            } else if (word in precedence) {
                while (precedence[operatorStack[operatorStack.length - 1]] >= precedence[(<RelatiRule.Operator>word)]) {
                    var operator: RelatiRule.Operator = <RelatiRule.Operator>operatorStack.pop();
                    var param2: RelatiRule.Parameter = <RelatiRule.Parameter>parameterStack.pop();
                    var param1: RelatiRule.Parameter = <RelatiRule.Parameter>parameterStack.pop();
                    parameterStack.push({ operator, param1, param2 });
                }

                operatorStack.push(<RelatiRule.Operator>word);
            }
        }

        while (operatorStack.length) {
            var operator: RelatiRule.Operator = <RelatiRule.Operator>operatorStack.pop();
            var param2: RelatiRule.Parameter = <RelatiRule.Parameter>parameterStack.pop();
            var param1: RelatiRule.Parameter = <RelatiRule.Parameter>parameterStack.pop();
            parameterStack.push({ operator, param1, param2 });
        }

        return <RelatiRule.Parameter>parameterStack[0];
    }

    constructor(public type: "all" | "any", public condition: string) {
        this.conditions = Grid.convertDirection(condition).map(
            condition => RelatiRule.parse(condition)
        );
    }

    allow(grid: RelatiGrid, symbol: RelatiRole.Symbol, condition?: RelatiRule.Parameter): boolean {
        if (!condition) {
            if (this.type == "any") {
                for (var cond of this.conditions) {
                    if (this.allow(grid, symbol, cond)) return true;
                }

                return false;
            }

            if (this.type == "all") {
                for (var cond of this.conditions) {
                    if (!this.allow(grid, symbol, cond)) return false;
                }

                return true;
            }
        }

        switch ((<RelatiRule.Parameter>condition).operator) {
            case "is":
                var grids = grid.queries(<string>(<RelatiRule.Parameter>condition).param1);
                var status = (<string>(<RelatiRule.Parameter>condition).param2).replace(/{S}/g, symbol);

                for (let grid of grids) {
                    if (!grid.role.is(status)) {
                        return false;
                    }
                }

                return true;

            case "&":
                return (
                    this.allow(grid, symbol, (<RelatiRule.Parameter>(<RelatiRule.Parameter>condition).param1)) &&
                    this.allow(grid, symbol, (<RelatiRule.Parameter>(<RelatiRule.Parameter>condition).param2))
                );

            case "|":
                return (
                    this.allow(grid, symbol, (<RelatiRule.Parameter>(<RelatiRule.Parameter>condition).param1)) ||
                    this.allow(grid, symbol, (<RelatiRule.Parameter>(<RelatiRule.Parameter>condition).param2))
                );
        }

        return false;
    }

    trace(grid: RelatiGrid, symbol: RelatiRole.Symbol) {

    }
}

namespace RelatiRule {
    export type Operator = "(" | ")" | "&" | "|" | "is";
    export type Parameter = {
        operator: Operator,
        param1: Parameter | string,
        param2: Parameter | string
    };
}

var normalRelati = new RelatiRule("any", `"O" is "owner{S}"`);
var remoteNormalRelati = new RelatiRule("any", `"2O" is "owner{S}" & "O" is "space"`);
var remoteStableRelati = new RelatiRule("any", `
    "IIH" is "owner{S}" & (
        "II,I" is "space" |
        "IH,I" is "space" |
        "IH,H" is "space
    ) | "IHH" is "owner{S}" & (
        "HH,H" is "space" |
        "IH,I" is "space" |
        "IH,H" is "space"
    )
`);
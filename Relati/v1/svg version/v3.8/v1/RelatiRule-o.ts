interface RelatiRuleO {
    rule: string;
    rules: string[];
}

class RelatiRuleO {
    rules: string[] = [];

    static legal(rule: RelatiRuleO["rule"], grid: RelatiGrid, symbol: RelatiRole.Symbol): boolean {
        var rules = rule.split(" && ");

        for (let rule of rules) {
            var ruleCommand = rule.split(" is ");
            var targetGrids = grid.queries(ruleCommand[0]);
            var status = ruleCommand[1].replace(/\{S\}/g, symbol);

            for (var targetGrid of targetGrids) {
                if (!targetGrid || !targetGrid.role.is(status)) {
                    return false;
                }
            }
        }

        return true;
    }

    constructor(public rule: string) {
        var rules: string[] = rule.split(" || ");

        for (let rule of rules) {
            this.rules = this.rules.concat(
                Grid.directionConvert(rule)
            );
        }
    }

    allow(grid: RelatiGrid, symbol: RelatiRole.Symbol): boolean {
        for (var rule of this.rules) {
            if (RelatiRuleO.legal(rule, grid, symbol)) {
                return true;
            }
        }

        return false;
    }

    trace(grid: RelatiGrid, symbol: RelatiRole.Symbol): string[] {
        var result: string[] = [];

        for (var rule of this.rules) {
            if (RelatiRuleO.legal(rule, grid, symbol)) {
                result.push(rule.replace(/\{S\}/g, symbol));
            }
        }

        return result;
    }
}

/* new RelatiRuleO("O is owner{S} valid");
new RelatiRuleO("2O is owner{S} valid && O is space");
new RelatiRuleO(
    "IIH is owner{S} valid && II,I is space || " +
    "IIH is owner{S} valid && IH,I is space || " +
    "IIH is owner{S} valid && IH,H is space || " +
    "IHH is owner{S} valid && HH,H is space || " +
    "IHH is owner{S} valid && IH,I is space || " +
    "IHH is owner{S} valid && IH,H is space"
); */
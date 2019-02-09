namespace Relati {
    export interface RelatiRule {
        allow(
            game: RelatiGame,
            grid: RelatiGrid,
            owner: RelatiRoleOwnerSymbol
        ): boolean;
    }

    export interface RelatiRuleTraceable extends RelatiRule {
        trace(
            game: RelatiGame,
            grid: RelatiGrid,
            owner: RelatiRoleOwnerSymbol
        ): RelatiRuleTrace[];
    }

    export interface RelatiRuleYieldable extends RelatiRule {
        yield(
            game: RelatiGame,
            grid: RelatiGrid,
            owner: RelatiRoleOwnerSymbol
        ): void;
    }

    export interface RelatiRuleTrace {
        targetGrid: RelatiGrid;
        gridRoute: RelatiGrid[];
    }
}
namespace Relati {
    export interface RelatiRule {
        allow(
            game: RelatiGame,
            grid: RelatiGrid,
            owner: RelatiPlayer
        ): boolean;
    }

    export interface RelatiRuleTraceable extends RelatiRule {
        trace(
            game: RelatiGame,
            grid: RelatiGrid,
            owner: RelatiPlayer
        ): RelatiRuleTrace[];
    }

    export interface RelatiRuleTrace {
        targetGrid: RelatiGrid;
        gridRoute: RelatiGrid[];
    }
}
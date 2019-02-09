namespace Relati {
    export interface RelatiCard {
        when(
            game: RelatiGame,
            grid: RelatiGrid,
            owner: RelatiPlayer
        ): boolean;
        then(
            game: RelatiGame,
            grid: RelatiGrid,
            owner: RelatiPlayer
        ): void;
    }
}
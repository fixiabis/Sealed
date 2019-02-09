namespace Relati {
    export interface RelatiAction {
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
namespace Relati {
    export interface RelatiCard {
        owner: RelatiPlayer;
        actions: RelatiAction[];
        effects: RelatiAction[];
        select(game: RelatiGame): void;
        launch(game: RelatiGame, grid: RelatiGrid): void;
    }
}
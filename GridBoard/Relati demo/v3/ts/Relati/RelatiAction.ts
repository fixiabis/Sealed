namespace Relati {
    export interface RelatiAction {
        action(state: RelatiGameState): void;
    }
}
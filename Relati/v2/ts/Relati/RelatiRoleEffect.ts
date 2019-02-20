namespace Relati {
    export interface RelatiRoleEffect {
        name: string;
        do(state: RelatiGameState): void;
    }
}
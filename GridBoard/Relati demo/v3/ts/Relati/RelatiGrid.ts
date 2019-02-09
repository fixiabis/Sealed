namespace Relati {
    export interface RelatiGrid {
        board: RelatiBoard;
        query(directionCommand: string): RelatiGrid;
        queries(directionCommands: string): RelatiGrid[];
    }

    export class RelatiGrid extends Grid {
        public role?: RelatiRole;
        public selectable: boolean = false;
        public owner?: RelatiPlayer;
        public cards: RelatiCard[] = [];
    }
}
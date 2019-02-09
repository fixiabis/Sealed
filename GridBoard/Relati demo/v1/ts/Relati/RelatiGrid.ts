namespace Relati {
    export interface RelatiGrid {
        board: RelatiBoard;
        query(directionCommand: string): RelatiGrid;
        queries(directionCommands: string): RelatiGrid[];
    }

    export class RelatiGrid extends Grid {
        public role = new RelatiRole(this);
        public view = createSVG("g");
    }
}
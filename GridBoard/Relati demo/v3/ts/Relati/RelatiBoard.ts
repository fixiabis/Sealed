namespace Relati {
    export interface RelatiBoard {
        grids: RelatiGrid[][];
        gridList: RelatiGrid[];
        query(coordinateCommand: string): RelatiGrid;
        queries(coordinateCommands: string): RelatiGrid[];
    }

    export class RelatiBoard extends GridBoard {
        public gridList: RelatiGrid[] = [];

        constructor(public width: number, public height: number) {
            super(width, height);

            for (var x = 0; x < width; x++) {
                for (var y = 0; y < height; y++) {
                    var grid = new RelatiGrid(this, x, y);
                    this.grids[x][y] = grid;
                    this.gridList.push(grid);
                }
            }
        }
    }
}
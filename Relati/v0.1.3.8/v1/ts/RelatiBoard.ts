interface RelatiGrid extends Grid {
    role: RelatiRole;
    level: number;
    board: RelatiBoard;
    query(dir: string): RelatiGrid;
    queries(dirs: string): RelatiGrid[];
}

class RelatiGrid extends Grid implements RelatiGrid {
    public role: RelatiRole = new RelatiRole(this);
    public level: number = 0;
}

interface RelatiBoard extends GridBoard {
    grids: RelatiGrid[][];
    query(coor: string): RelatiGrid;
    queries(coors: string): RelatiGrid[];
}

class RelatiBoard extends GridBoard implements RelatiBoard {
    constructor(width: number, height: number) {
        super(width, height);

        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                this.grids[x][y] = new RelatiGrid(this, x, y);
            }
        }
    }
}
const GridBoard = (function () {
    class Grid {
        constructor(crd, x, y, board) {
            this.crd = crd;
            this.x = x;
            this.y = y;
            this.board = board;
        }

        getGridsFromDir(dirString) {
            var result = [];

            if (dirString.indexOf(",") > -1) {
                dirString.split(",").forEach(
                    dirStr => result = result.concat(
                        this.getGridsFromDir(dirStr)
                    )
                );

                return result;
            }

            var shortDirs = [/I/g, /H/g, /T/g, /X/g, /O/g];
            var fullDirs = [["F", "B"], ["R", "L"], ["I", "H"], ["IH"], ["T", "X"]];

            for (var i = 0; i < shortDirs.length; i++) {
                var shortDir = shortDirs[i];
                var fullDir = fullDirs[i];

                if (dirString.match(shortDir)) {
                    result = result.concat(
                        this.getGridsFromDir(
                            fullDir.map(
                                dir => dirString.replace(shortDir, dir)
                            ).join(",")
                        )
                    );

                    return result;
                }
            }

            if (dirString[0] === "~") {
                var dir = dirString.substr(1, dirString.length - 1);
                var nowDir = dir;

                do {
                    result.push(this.getGridFromDir(nowDir));
                    nowDir += dir;
                } while (this.getGridFromDir(nowDir));

                return result;
            }

            return this.getGridFromDir(dirString);
        }

        getGridFromDir(dirString) {
            var { x, y, board } = this;

            for (var i = 0; i < dirString.length; i++) {
                switch (dirString[i]) {
                    case "F": y--; break;
                    case "B": y++; break;
                    case "R": x++; break;
                    case "L": x--; break;
                }
            }

            return board.grids[x] && board.grids[x][y];
        }
    }

    class GridBoard {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.viewer = document.createElement("canvas");
            this.painter = this.viewer.getContext("2d");
            this.gridOf = {};
            this.grids = [];
            this.gridMarks = [];

            for (var x = 0; x < width; x++) {
                var gridCol = [];
                this.grids.push(gridCol);

                for (var y = 0; y < height; y++) {
                    var crd = String.fromCharCode(x + 65) + (y + 1);
                    var grid = new Grid(crd, x, y, this);
                    this.gridOf[crd] = grid;
                    gridCol.push(grid);
                }
            }

            this.viewer.addEventListener("click", function (event) {
                var { offsetX: x, offsetY: y } = event;
                var { viewer, width, grids, ongridselect } = this;
                var gridSize = Math.floor((viewer.width - width - 1) / width) + 1;

                if (ongridselect) {
                    ongridselect(
                        grids[(x / gridSize) | 0][(y / gridSize) | 0]
                    );
                }
            }.bind(this));
        }

        viewerRefresh() {
            var { painter, viewer, width, height, gridOf, gridMarks } = this;
            var gridSize = Math.floor((viewer.width - width - 1) / width);
            viewer.width = gridSize * width + (width + 1);
            viewer.height = gridSize * height + (height + 1);
            painter.fillStyle = "#fff";
            painter.strokeStyle = "#000";
            painter.clearRect(0, 0, viewer.width, viewer.height);
            painter.lineWidth = 1;
            painter.setTransform(1, 0, 0, 1, 0.5, 0.5);

            for (var x = 0; x <= width; x++) {
                painter.beginPath();
                painter.moveTo((gridSize + 1) * x, 0);
                painter.lineTo((gridSize + 1) * x, viewer.height);
                painter.stroke();
                painter.closePath();
            }

            for (var y = 0; y <= height; y++) {
                painter.beginPath();
                painter.moveTo(0, (gridSize + 1) * y);
                painter.lineTo(viewer.width, (gridSize + 1) * y);
                painter.stroke();
                painter.closePath();
            }

            for (var crd in gridOf) {
                var grid = gridOf[crd];

                for (var i = 0; i < gridMarks.length; i++) {
                    var { condition, configure } = gridMarks[i];

                    if (condition(grid)) {
                        configure(
                            painter,
                            grid.x * (gridSize + 1) + 0.5,
                            grid.y * (gridSize + 1) + 0.5,
                            gridSize
                        );
                    }
                }
            }
        }

        viewerResize(width, height) {
            this.viewer.width = width;
            this.viewer.height = height;
            this.viewerRefresh();
        }

        addGridMark(condition, configure) {
            this.gridMarks.push({ condition, configure });
        }

        selectGrid(crd) {
            if (this.ongridselect) {
                this.ongridselect(this.gridOf[crd]);
            }
        }
    }

    return GridBoard;
})();
var GridBoard = (function () {
    var createSVG = (function () {
        var svgNS = "http://www.w3.org/2000/svg";
        return tag => document.createElementNS(svgNS, tag);
    })();

    class Grid {
        constructor(x, y, board) {
            this.crd = String.fromCharCode(x + 65) + (y + 1);
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

        x; y; crd; board;
    }

    class GridBoard {
        constructor(width, height) {
            var gridOf = {};
            var grids = [];
            var viewer = createSVG("svg");

            for (var x = 0; x < width; x++) {
                var gridCol = [];

                for (var y = 0; y < height; y++) {
                    var grid = new Grid(x, y, this);
                    gridOf[grid.crd] = grid;
                    gridCol.push(grid);
                }

                grids.push(gridCol);
            }

            viewer.setAttribute("width", `${width * 20}`);
            viewer.setAttribute("height", `${height * 20}`);
            viewer.addEventListener("click", function (event) {
                var x = Math.floor(event.offsetX / 20),
                    y = Math.floor(event.offsetY / 20);

                if (this.gridSelected) {
                    this.gridSelected(this.grids[x][y]);
                }
            }.bind(this));

            for (let x = 1; x < width; x++) {
                let line = createSVG("path");
                line.setAttribute("stroke-width", "1");
                line.setAttribute("d", `M ${x * 20} 0 V ${width * 20}`);
                line.setAttribute("stroke", "#888");
                viewer.appendChild(line);
            }

            for (let y = 1; y < height; y++) {
                let line = createSVG("path");
                line.setAttribute("stroke-width", "1");
                line.setAttribute("d", `M 0 ${y * 20} H ${height * 20}`);
                line.setAttribute("stroke", "#888");
                viewer.appendChild(line);
            }

            this.gridOf = gridOf;
            this.grids = grids;
            this.width = width;
            this.height = height;
            this.viewer = viewer;
        }

        viewerResize(container) {
            var size = Math.min(
                container.clientWidth,
                container.clientHeight
            ) * 0.9 / (this.width * 20);
            this.viewer.style.transform = "scale(" + size + ")";
        }

        viewerIn(container) {
            window.addEventListener("resize", function () {
                this.viewerResize(container);
            }.bind(this));
            container.appendChild(this.viewer);
            this.viewerResize(container);
        }

        createView(tag, attribute) {
            var graphic = createSVG(tag);

            for (var name in attribute) {
                var value = attribute[name];
                graphic.setAttribute(name, value);
            }

            return graphic;
        }

        createViews(viewsOption) {
            var graphics = [];

            for (var i = 0; i < viewsOption.length; i++) {
                var { tag, attribute } = viewsOption[i];
                graphics.push(this.createView(tag, attribute));
            }

            return graphics;
        }

        reset() {
            for (var crd in this.gridOf) {
                var grid = this.gridOf[crd];
                var symbolViews = grid.symbolViews;

                if (symbolViews) {
                    symbolViews.forEach(
                        views => this.viewer.removeChild(views)
                    );
                }

                delete grid.symbol;
                delete grid.status;
                delete grid.symbolViews;
            }
        }

        grids; gridOf; width; height; viewer;
    }

    return GridBoard;
})();
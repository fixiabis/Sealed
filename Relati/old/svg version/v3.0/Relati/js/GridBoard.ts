var GridBoard = (function () {
    var createSVG = function (tag: string) {
        return document.createElementNS("http://www.w3.org/2000/svg", tag);
    };

    class Grid {
        x: number;
        y: number;
        crd: string;
        setter: Object;
        props = {};
        views: SVGElement[] = [];
        board: GridBoard;
        constructor(x, y, board) {
            this.crd = `${String.fromCharCode(x + 65)}${y + 1}`;
            this.x = x;
            this.y = y;
            this.board = board;
        }

        query(selector) {
            var result: Grid[] = [];
            var shorten: RegExp[] = [/I/g, /H/g, /T/g, /X/g, /O/g];
            var full: string[][] = [["F", "B"], ["R", "L"], ["I", "H"], ["IH"], ["T", "X"]];

            if (selector.match(/I|H|T|X|O/)) {
                for (var i = 0; i < shorten.length; i++) {
                    if (selector.match(shorten[i])) {
                        for (var j = 0; j < full[i].length; j++) {
                            result = result.concat(
                                this.query(selector.replace(shorten[i], full[i][j]))
                            );
                        }
                        return result;
                    }
                }
            }

            if (selector.match(/,/)) {
                var selectors = selector.split(",");
                result = selectors.map(selector => this.query(selector));
                return result;
            }

            var { x, y } = this;

            for (var i = 0; i < selector.length; i++) {
                switch (selector[i]) {
                    case "F": y--; break;
                    case "B": y++; break;
                    case "R": x++; break;
                    case "L": x--; break;
                }
            }

            return this.board.grids[x] && this.board.grids[x][y];
        }
    }

    Grid.prototype.setter = {};

    class GridBoard {
        width: number;
        height: number;
        grids: Grid[][] = [];
        gridOf = {};
        ongridselect: Function;
        viewerBackground = createSVG("g");
        viewer: SVGElement = createSVG("svg");

        constructor(width, height) {
            for (var x = 0; x < width; x++) {
                var row: Grid[] = [];

                for (var y = 0; y < height; y++) {
                    var grid = new Grid(x, y, this);
                    this[grid.crd] = grid;
                    this.gridOf[grid.crd] = grid;
                    row.push(grid);
                }

                this.grids.push(row);
            }

            this.width = width;
            this.height = height;

            this.viewer.appendChild(this.viewerBackground);
            this.viewer.setAttribute("width", `${width * 5}`);
            this.viewer.setAttribute("height", `${height * 5}`);
            this.viewer.addEventListener("click", function (event) {
                var x = Math.floor(event.offsetX / 5),
                    y = Math.floor(event.offsetY / 5);

                if (this.ongridselect) {
                    this.ongridselect(this.grids[x][y]);
                }
            }.bind(this));

            for (var x = 1; x < width; x++) {
                var line = createSVG("path");
                line.setAttribute("stroke-width", "0.4");
                line.setAttribute("d", `M ${x * 5} 0 V ${height * 5}`);
                line.setAttribute("stroke", "#888");
                this.viewer.appendChild(line);
            }

            for (var y = 1; y < height; y++) {
                var line = createSVG("path");
                line.setAttribute("stroke-width", "0.4");
                line.setAttribute("d", `M 0 ${y * 5} H ${width * 5}`);
                line.setAttribute("stroke", "#888");
                this.viewer.appendChild(line);
            }
        }

        viewerResize(container, scale) {
            var size = Math.min(
                container.clientWidth / (this.width * 5),
                container.clientHeight / (this.height * 5)
            ) * (scale || 0.95);

            this.viewer.style.transform = `scale(${size})`;
        }

        addSign(name, value, fn) {
            if (!Grid.prototype.setter[name]) {
                Grid.prototype.setter[name] = {};
                Object.defineProperty(Grid.prototype, name, {
                    get: function () {
                        return this.props[name];
                    },
                    set: function (input) {
                        this.props[name] = input;
                        if (this.setter[name][input]) {
                            this.setter[name][input](createSVG, this);
                        }
                    }
                });

                for (var crd in this.gridOf) {
                    this.gridOf[crd][name] = value;
                }
            }

            Grid.prototype.setter[name][value] = fn;
        }

        removeBackground() {
            var childNodes = this.viewerBackground.childNodes;
            
            while (childNodes.length) {
                var childNode = childNodes[0];
                this.viewerBackground.removeChild(childNode);
            }
        }

        addLine(crds, color) {
            var line = createSVG("path");
            line.setAttribute("stroke", color);
            line.setAttribute("stroke-width", "0.4");
            line.setAttribute("fill", "none");
            line.style.opacity = "0.2";

            var path = `M ${this[crds[0]].x * 5 + 2.5} ${this[crds[0]].y * 5 + 2.5} `;

            for (var i = 1; i < crds.length; i++) {
                path += `L ${this[crds[i]].x * 5 + 2.5} ${this[crds[i]].y * 5 + 2.5} `;
            }

            line.setAttribute("d", path);
            this.viewerBackground.appendChild(line);
        }
    }

    return GridBoard;
}());
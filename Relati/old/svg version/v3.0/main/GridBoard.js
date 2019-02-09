var GridBoard = (function () {
    var createSVG = (function () {
        var svgNS = "http://www.w3.org/2000/svg";
        return function (tag) { return document.createElementNS(svgNS, tag); };
    })();
    var Grid = /** @class */ (function () {
        function Grid(x, y, board) {
            this.crd = String.fromCharCode(x + 65) + (y + 1);
            this.x = x;
            this.y = y;
            this.board = board;
        }
        Grid.prototype.getGridsFromDir = function (dirString) {
            var _this = this;
            var result = [];
            if (dirString.indexOf(",") > -1) {
                dirString.split(",").forEach(function (dirStr) { return result = result.concat(_this.getGridsFromDir(dirStr)); });
                return result;
            }
            var shortDirs = [/I/g, /H/g, /T/g, /X/g, /O/g];
            var fullDirs = [["F", "B"], ["R", "L"], ["I", "H"], ["IH"], ["T", "X"]];
            for (var i = 0; i < shortDirs.length; i++) {
                var shortDir = shortDirs[i];
                var fullDir = fullDirs[i];
                if (dirString.match(shortDir)) {
                    result = result.concat(this.getGridsFromDir(fullDir.map(function (dir) { return dirString.replace(shortDir, dir); }).join(",")));
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
        };
        Grid.prototype.getGridFromDir = function (dirString) {
            var _a = this, x = _a.x, y = _a.y, board = _a.board;
            for (var i = 0; i < dirString.length; i++) {
                switch (dirString[i]) {
                    case "F":
                        y--;
                        break;
                    case "B":
                        y++;
                        break;
                    case "R":
                        x++;
                        break;
                    case "L":
                        x--;
                        break;
                }
            }
            return board.grids[x] && board.grids[x][y];
        };
        return Grid;
    }());
    var GridBoard = /** @class */ (function () {
        function GridBoard(width, height) {
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
            viewer.setAttribute("width", "" + width * 20);
            viewer.setAttribute("height", "" + height * 20);
            viewer.addEventListener("click", function (event) {
                var x = Math.floor(event.offsetX / 20), y = Math.floor(event.offsetY / 20);
                if (this.gridSelected) {
                    this.gridSelected(this.grids[x][y]);
                }
            }.bind(this));
            for (var x_1 = 1; x_1 < width; x_1++) {
                var line = createSVG("path");
                line.setAttribute("stroke-width", "1");
                line.setAttribute("d", "M " + x_1 * 20 + " 0 V " + width * 20);
                line.setAttribute("stroke", "#888");
                viewer.appendChild(line);
            }
            for (var y_1 = 1; y_1 < height; y_1++) {
                var line = createSVG("path");
                line.setAttribute("stroke-width", "1");
                line.setAttribute("d", "M 0 " + y_1 * 20 + " H " + height * 20);
                line.setAttribute("stroke", "#888");
                viewer.appendChild(line);
            }
            this.gridOf = gridOf;
            this.grids = grids;
            this.width = width;
            this.height = height;
            this.viewer = viewer;
        }
        GridBoard.prototype.viewerResize = function (container) {
            var size = Math.min(container.clientWidth, container.clientHeight) * 0.9 / (this.width * 20);
            this.viewer.style.transform = "scale(" + size + ")";
        };
        GridBoard.prototype.viewerIn = function (container) {
            window.addEventListener("resize", function () {
                this.viewerResize(container);
            }.bind(this));
            container.appendChild(this.viewer);
            this.viewerResize(container);
        };
        GridBoard.prototype.createView = function (tag, attribute) {
            var graphic = createSVG(tag);
            for (var name in attribute) {
                var value = attribute[name];
                graphic.setAttribute(name, value);
            }
            return graphic;
        };
        GridBoard.prototype.createViews = function (viewsOption) {
            var graphics = [];
            for (var i = 0; i < viewsOption.length; i++) {
                var _a = viewsOption[i], tag = _a.tag, attribute = _a.attribute;
                graphics.push(this.createView(tag, attribute));
            }
            return graphics;
        };
        GridBoard.prototype.reset = function () {
            var _this = this;
            for (var crd in this.gridOf) {
                var grid = this.gridOf[crd];
                var symbolViews = grid.symbolViews;
                if (symbolViews) {
                    symbolViews.forEach(function (views) { return _this.viewer.removeChild(views); });
                }
                delete grid.symbol;
                delete grid.symbolViews;
            }
        };
        return GridBoard;
    }());
    return GridBoard;
})();

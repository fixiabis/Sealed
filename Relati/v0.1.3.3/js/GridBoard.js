(function (global) {
    /**
     * 建立SVG元素
     * @param tagName SVG標籤名稱
     * @return SVG元素
     */
    function createSVG(tagName) {
        return document.createElementNS("http://www.w3.org/2000/svg", tagName);
    }
    var Grid = /** @class */ (function () {
        /**
         * @constructor
         * @param x     X座標
         * @param y     Y座標
         * @param board 所屬棋盤
         */
        function Grid(x, y, board) {
            this.crd = "" + String.fromCharCode(x + 65) + (y + 1);
            this.x = x;
            this.y = y;
            this.board = board;
        }
        /**
         * 棋盤格查詢
         * @param command 查詢指令
         * @returns 棋盤格或棋盤格陣列
         */
        Grid.prototype.query = function (command) {
            var result = [];
            var shorten = [/I/g, /H/g, /T/g, /X/g, /O/g];
            var full = [
                ["F", "B"],
                ["R", "L"],
                ["I", "H"],
                ["IH"],
                ["T", "X"]
            ];
            if (command.match(/I|H|T|X|O/)) {
                for (var i = 0; i < shorten.length; i++) {
                    if (command.match(shorten[i])) {
                        for (var j = 0; j < full[i].length; j++) {
                            result = result.concat(this.query(command.replace(shorten[i], full[i][j])));
                        }
                        return result;
                    }
                }
            }
            if (command.match(/,/)) {
                var commands = command.split(",");
                for (var i = 0; i < commands.length; i++) {
                    var command = commands[i];
                    result = result.concat(this.query(command));
                }
                return result;
            }
            if (command.match(/\d+/)) {
                var units = command.split(/\D+/).map(function (str) { return parseInt(str); });
                var dirs = command.split(/\d+/);
                units.pop();
                dirs.shift();
                command = dirs.map(function (dirs, u) {
                    var dir = dirs;
                    dirs = "";
                    for (var i = 0; i < units[u]; i++) {
                        dirs += dir;
                    }
                    return dirs;
                }).join("");
            }
            var _a = this, x = _a.x, y = _a.y;
            for (var i = 0; i < command.length; i++) {
                var dir = command[i];
                switch (dir) {
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
            return this.board.grids[x] && this.board.grids[x][y];
        };
        return Grid;
    }());
    var GridBoardViewer = /** @class */ (function () {
        /**
         * @constructor
         * @param board 所屬棋盤
         */
        function GridBoardViewer(board) {
            this.body = createSVG("svg");
            this.background = createSVG("g");
            this.board = board;
            this.body.appendChild(this.background);
            this.body.setAttribute("width", "" + board.width * 5);
            this.body.setAttribute("height", "" + board.height * 5);
            this.body.addEventListener("click", function (event) {
                var x = Math.floor(event.offsetX / 5), y = Math.floor(event.offsetY / 5);
                if (this.onselect) {
                    this.onselect(this.board.grids[x][y]);
                }
            }.bind(this));
            for (var x = 1; x < board.width; x++) {
                var line = createSVG("path");
                line.setAttribute("d", "M " + x * 5 + " 0 V " + board.height * 5);
                line.setAttribute("stroke", "#888");
                line.setAttribute("stroke-width", "0.4");
                this.body.appendChild(line);
            }
            for (var y = 1; y < board.height; y++) {
                var line = createSVG("path");
                line.setAttribute("d", "M 0 " + y * 5 + " H " + board.width * 5);
                line.setAttribute("stroke", "#888");
                line.setAttribute("stroke-width", "0.4");
                this.body.appendChild(line);
            }
        }
        /**
         * 讓SVG以最大比例顯示在SVG容器中
         * @param container SVG容器
         * @param scale 指定縮放比例
         */
        GridBoardViewer.prototype.resize = function (container, scale) {
            if (scale === void 0) { scale = 0.95; }
            var size = Math.min(container.clientWidth / (this.board.width * 5), container.clientHeight / (this.board.height * 5)) * scale;
            this.body.style.transform = "scale(" + size + ")";
        };
        /**
         * 建立SVG元素並設定屬性
         * @param tagName 標籤名稱
         * @param property 設定屬性
         * @return SVG元素
         */
        GridBoardViewer.prototype.create = function (tagName, property) {
            var element = createSVG(tagName);
            for (var name in property) {
                var value = property[name];
                element.setAttribute(name, value);
            }
            return element;
        };
        /**
         * 將SVG增加到元素中，並重新設定SVG大小
         * @param container 容器元素
         */
        GridBoardViewer.prototype.appendIn = function (container) {
            container.appendChild(this.body);
            this.resize(container);
        };
        return GridBoardViewer;
    }());
    var GridBoard = /** @class */ (function () {
        /**
         * @constructor
         * @param width  寬度
         * @param height 高度
         */
        function GridBoard(width, height) {
            this.grids = [];
            this.gridOf = {};
            this.width = width;
            this.height = height;
            this.viewer = new GridBoardViewer(this);
            for (var x = 0; x < width; x++) {
                var row = [];
                for (var y = 0; y < height; y++) {
                    var grid = new Grid(x, y, this);
                    this.gridOf[grid.crd] = grid;
                    this[grid.crd] = grid;
                    row.push(grid);
                }
                this.grids.push(row);
            }
        }
        return GridBoard;
    }());
    global.GridBoard = GridBoard;
}(this));

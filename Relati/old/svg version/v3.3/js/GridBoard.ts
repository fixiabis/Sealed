(function (global) {
    interface GridBoard {
        width: number;
        height: number;
        viewer: GridBoardViewer;
        grids: Grid[][];
        gridOf: object;
    }

    interface Grid {
        x: number;
        y: number;
        crd: string;
        board: GridBoard;
    }

    interface GridBoardViewer {
        width: number;
        height: number;
        board: GridBoard;
        body: SVGElement;
        background: SVGElement;
    }

    /**
     * 建立SVG元素
     * @param tagName SVG標籤名稱
     * @return SVG元素
     */

    function createSVG(tagName: string): SVGElement {
        return document.createElementNS(
            "http://www.w3.org/2000/svg", tagName
        );
    }

    class Grid implements Grid {
        /**
         * @constructor
         * @param x     X座標
         * @param y     Y座標
         * @param board 所屬棋盤
         */

        constructor(x: number, y: number, board: GridBoard) {
            this.crd = `${String.fromCharCode(x + 65)}${y + 1}`;
            this.x = x;
            this.y = y;
            this.board = board;
        }

        /**
         * 棋盤格查詢
         * @param command 查詢指令
         * @returns 棋盤格或棋盤格陣列
         */

        query(command: string): Grid | Grid[] {
            var result: Grid[] = [];
            var shorten: RegExp[] = [/I/g, /H/g, /T/g, /X/g, /O/g];
            var full: string[][] = [
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
                            result = result.concat(
                                this.query(
                                    command.replace(shorten[i], full[i][j])
                                )
                            );
                        }

                        return result;
                    }
                }
            }

            if (command.match(/,/)) {
                var commands: string[] = command.split(",");

                for (var i = 0; i < commands.length; i++) {
                    var command = commands[i];
                    result = result.concat(this.query(command));
                }

                return result;
            }

            if (command.match(/\d+/)) {
                var units: number[] = command.split(/\D+/).map(str => parseInt(str));
                var dirs: string[] = command.split(/\d+/);
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

            var { x, y } = this;

            for (var i = 0; i < command.length; i++) {
                var dir: string = command[i];

                switch (dir) {
                    case "F": y--; break;
                    case "B": y++; break;
                    case "R": x++; break;
                    case "L": x--; break;
                }
            }

            return this.board.grids[x] && this.board.grids[x][y];
        }
    }

    class GridBoardViewer implements GridBoardViewer {
        body: SVGElement = createSVG("svg");
        background: SVGElement = createSVG("g");

        /**
         * @constructor
         * @param board 所屬棋盤
         */

        constructor(board: GridBoard) {
            this.board = board;
            this.body.appendChild(this.background);
            this.body.setAttribute("width", `${board.width * 5}`);
            this.body.setAttribute("height", `${board.height * 5}`);
            this.body.addEventListener("click", function (event) {
                var x = Math.floor(event.offsetX / 5),
                    y = Math.floor(event.offsetY / 5);

                if (this.onselect) {
                    this.onselect(this.board.grids[x][y]);
                }
            }.bind(this));

            for (var x = 1; x < board.width; x++) {
                var line: SVGElement = createSVG("path");
                line.setAttribute("d", `M ${x * 5} 0 V ${board.height * 5}`);
                line.setAttribute("stroke", "#888");
                line.setAttribute("stroke-width", "0.4");
                this.body.appendChild(line);
            }

            for (var y = 1; y < board.height; y++) {
                var line: SVGElement = createSVG("path");
                line.setAttribute("d", `M 0 ${y * 5} H ${board.width * 5}`);
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

        resize(container: HTMLElement, scale: number = 0.95) {
            var size: number = Math.min(
                container.clientWidth / (this.board.width * 5),
                container.clientHeight / (this.board.height * 5)
            ) * scale;

            this.body.style.transform = `scale(${size})`;
        }

        /**
         * 建立SVG元素並設定屬性
         * @param tagName 標籤名稱
         * @param property 設定屬性
         * @return SVG元素
         */

        create(tagName: string, property: object) {
            var element = createSVG(tagName);

            for (var name in property) {
                var value = property[name];
                element.setAttribute(name, value);
            }

            return element;
        }

        /**
         * 將SVG增加到元素中，並重新設定SVG大小
         * @param container 容器元素
         */

        appendIn(container) {
            container.appendChild(this.body);
            this.resize(container);
        }
    }

    class GridBoard implements GridBoard {
        grids: Grid[][] = [];
        gridOf: object = {};

        /**
         * @constructor
         * @param width  寬度
         * @param height 高度
         */

        constructor(width: number, height: number) {
            this.width = width;
            this.height = height;
            this.viewer = new GridBoardViewer(this);

            for (var x = 0; x < width; x++) {
                var row: Grid[] = [];

                for (var y = 0; y < height; y++) {
                    var grid: Grid = new Grid(x, y, this);
                    this.gridOf[grid.crd] = grid;
                    this[grid.crd] = grid;
                    row.push(grid);
                }

                this.grids.push(row);
            }
        }
    }

    global.GridBoard = GridBoard;
}(this));
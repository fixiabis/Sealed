namespace lib {
    export interface GridBoard {
        width: number;
        height: number;
        viewer: GridBoardViewer;
        grids: Grid[][];
        gridOf: { [crd: string]: Grid };
        [propName: string]: any;
    }

    export interface Grid {
        x: number;
        y: number;
        crd: string;
        board: GridBoard;
        [propName: string]: any;
        query(command: string): Grid | Grid[];
    }

    export interface GridBoardViewer {
        width: number;
        height: number;
        board: GridBoard;
        body: SVGElement;
        background: SVGGElement;
        [propName: string]: any;
        resize(container: HTMLElement, scale?: number): void;
        create<K extends keyof SVGElementTagNameMap>(
            tagName: K,
            property?: { [propName: string]: string }
        ): SVGElementTagNameMap[K];
        appendIn(container: HTMLElement): void;
        onselect?(grid: Grid): void;
    }

    /**
    * 建立SVG元素
    * @param tagName SVG標籤名稱
    * @return SVG元素
    */

    function createSVG<K extends keyof SVGElementTagNameMap>(tagName: K): SVGElementTagNameMap[K] {
        return document.createElementNS(
            "http://www.w3.org/2000/svg", tagName
        );
    }

    export class Grid implements Grid {
        /**
         * @constructor
         * @param x     X座標
         * @param y     Y座標
         * @param board 所屬棋盤
         */

        constructor(public x: number, public y: number, public board: GridBoard) {
            this.crd = `${String.fromCharCode(x + 65)}${y + 1}`;
        }

        /**
         * 棋盤格查詢
         * @param command 查詢指令
         * 
         * 棋盤格對照 board.grids[x][y] = board[ASCII(x + 65) + (y + 1)]
         * 
         * @example
         * 使用方向查詢指令 (F B R L) F(-y) B(+y) R(+x) L(-x)
         * board.D4.query("FR") => board.E3 // FR
         * 
         * @example
         * 使用反向查詢指令 (-)
         * board.E5.query("-L") => board.F5 // R
         * 
         * @example
         * 使用組合查詢指令 (I H T X O) I(F, B) H(R, L) T(I, H) X(IH) O(T, X)
         * board.E5.query("IIH") => [
         *     board.D3, // FFR
         *     board.F3, // FFL
         *     board.D7, // BBR
         *     board.F7  // BBL
         * ]
         * 
         * @example
         * 使用單位查詢指令 (數值) 3F(FFF) 2FH(FFRR, FFLL) 2F1H(FFR, FFL)
         * board.D4.query("2IH") => [
         *     board.F2, // FFRR
         *     board.B2, // FFLL
         *     board.F6, // BBRR
         *     board.B6  // BBLL
         * ]
         * 
         * @example
         * 使用單位區間查詢指令 (~)
         * board.D4.query("1~2I") => [
         *     board.D3, // F
         *     board.D2, // FF
         *     board.D5, // B
         *     board.D6  // BB
         * ]
         * 
         * @example
         * 使用同向多重查詢指令 (,)
         * board.F6.query("I, IH, IIH") => [
         *     board.F5, // F
         *     board.G5, // FR
         *     board.G4, // FFR
         *     board.F5, // F
         *     board.E5, // FL
         *     board.E4, // FFL
         *     board.F7, // B
         *     board.G7, // BR
         *     board.G8, // BBR
         *     board.F7, // B
         *     board.E7, // BL
         *     board.E8  // BBL
         * ]
         * 
         * @example
         * 使用異向多重查詢指令 (;)
         * board.F6.query("I; IH; IIH") => [
         *     board.F5, // F
         *     board.F7, // B
         *     board.G5, // FR
         *     board.E5, // FL
         *     board.G7, // BR
         *     board.E7, // BL
         *     board.G4, // FFR
         *     board.E4, // FFL
         *     board.G8, // BBR
         *     board.E8  // BBL
         * ]
         * 
         * @returns 棋盤格或棋盤格陣列
         */

        query(command: string): Grid | Grid[] {
            if (this[command]) return this[command];

            command = command.replace(/ |\n|\t/g, "");

            var result: Grid[] = [];
            var shorten: RegExp[] = [/I/g, /H/g, /T/g, /X/g, /O/g];
            var full: string[][] = [
                ["F", "B"],
                ["R", "L"],
                ["I", "H"],
                ["IH"],
                ["T", "X"]
            ];

            if (command.match(/\;/)) {
                var commands: string[] = command.split(";");

                for (var i = 0; i < commands.length; i++) {
                    var command: string = commands[i];
                    result = result.concat(<Grid | Grid[]>this.query(command));
                }

                this[commands.join(";")] = result;

                return result;
            }

            if (command.match(/I|H|T|X|O/)) {
                for (var i = 0; i < shorten.length; i++) {
                    if (command.match(shorten[i])) {
                        for (var j = 0; j < full[i].length; j++) {
                            result = result.concat(<Grid | Grid[]>this.query(
                                command.replace(shorten[i], full[i][j])
                            ));
                        }

                        this[command] = result;

                        return result;
                    }
                }
            }

            if (command.match(/\,/)) {
                var commands: string[] = command.split(",");

                for (var i = 0; i < commands.length; i++) {
                    var command: string = commands[i];
                    result = result.concat(<Grid | Grid[]>this.query(command));
                }

                this[commands.join(",")] = result;

                return result;
            }

            if (command.match(/\~/)) {
                var range = command.match(/(\d|-\d)~(\d|-\d)/);

                if (range) {
                    var dir = command.replace(range[0], "");
                    var units: number[] = range[0].split("~").map(
                        (str: string) => parseInt(str)
                    );
                    var commands: string[] = [];

                    var preDir = command.substr(0, range.index);
                    dir = dir.replace(preDir, "");

                    if (units[0] < units[1]) {
                        for (var u = units[0]; u <= units[1]; u++) {
                            commands.push(`${preDir}${u}${dir}`);
                        }
                    } else {
                        for (var u = units[0]; u >= units[1]; u--) {
                            commands.push(`${preDir}${u}${dir}`);
                        }
                    }

                    this[command] = this.query(commands.join(","));

                    return this[command];
                }
            }

            var { x, y } = this;
            var unit = 1;

            for (var i = 0; i < command.length; i++) {
                var dir: string = command[i];

                switch (dir) {
                    case "F": y -= unit; break;
                    case "B": y += unit; break;
                    case "R": x += unit; break;
                    case "L": x -= unit; break;
                    case "+": unit *= 1; break;
                    case "-": unit *= -1; break;
                    default:
                        if (!isNaN(parseInt(dir))) {
                            var prevDir = command[i - 1];

                            if (prevDir && !isNaN(parseInt(prevDir))) {
                                unit = unit * 10 + parseInt(dir);
                            } else {
                                unit = Math.sign(unit) * parseInt(dir);
                            }
                        }
                }
            }

            this[command] = this.board.grids[x] && this.board.grids[x][y];

            return this[command];
        }
    }

    export class GridBoardViewer implements GridBoardViewer {
        body: SVGElement = createSVG("svg");
        background: SVGGElement = createSVG("g");

        /**
         * @constructor
         * @param board 所屬棋盤
         */

        constructor(public board: GridBoard) {
            this.body.appendChild(this.background);
            this.body.setAttribute("width", `${board.width * 5}`);
            this.body.setAttribute("height", `${board.height * 5}`);
            this.body.addEventListener("click", function (this: GridBoardViewer, event: MouseEvent) {
                var x: number = Math.floor(event.offsetX / 5),
                    y: number = Math.floor(event.offsetY / 5);

                if (this.onselect) {
                    this.onselect(this.board.grids[x][y]);
                }
            }.bind(this));

            for (var x = 1; x < board.width; x++) {
                var line: SVGPathElement = createSVG("path");
                line.setAttribute("d", `M ${x * 5} 0 V ${board.height * 5}`);
                line.setAttribute("stroke", "#888");
                line.setAttribute("stroke-width", "0.4");
                this.body.appendChild(line);
            }

            for (var y = 1; y < board.height; y++) {
                var line: SVGPathElement = createSVG("path");
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

        create<K extends keyof SVGElementTagNameMap>(
            tagName: K,
            property: { [propName: string]: string } = {}
        ): SVGElementTagNameMap[K] {
            var element: SVGElementTagNameMap[K] = createSVG(tagName);

            for (var name in property) {
                var value: string = property[name];
                element.setAttribute(name, value);
            }

            return element;
        }

        /**
         * 將SVG增加到元素中，並重新設定SVG大小
         * @param container 容器元素
         */

        appendIn(container: HTMLElement) {
            container.appendChild(this.body);
            this.resize(container);
        }
    }

    export class GridBoard implements GridBoard {
        grids: Grid[][] = [];
        gridOf: { [crd: string]: Grid } = {};

        /**
         * @constructor
         * @param width  寬度
         * @param height 高度
         */

        constructor(public width: number, public height: number) {
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
}
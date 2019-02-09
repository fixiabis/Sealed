namespace lib {
    var { GridBoard } = lib;

    export type SymtusType = "symbol" | "status";
    export type SymtusSymbolType = "O" | "X";
    export enum SymtusSymbol { space, O, X }
    export type SymtusStatusType = "normal" | "source" | "forbid" | "broken" | "select";
    export enum SymtusStatus { normal, source, forbid, broken, select }
    export enum SymtusColor {
        O = "crimson",
        X = "royalblue",
        forbid = "#666",
        broken = "#bbb",
        source = "#f2f2f2"
    }

    export interface SymtusBoard extends GridBoard {
        viewer: SymtusBoardViewer;
        grids: SymtusGrid[][];
        gridOf: { [crd: string]: SymtusGrid };
    }

    export interface SymtusBoardViewer {
        body: SVGSVGElement;
        background: SVGGElement;
        container: HTMLElement;
        createSVG: Function;
        updateSVG: Function;
        onselect?(grid: SymtusGrid): void;
    }

    export interface SymtusGrid extends Grid {
        query(dir: string): SymtusGrid | SymtusGrid[];
        views: SVGElement[];
        prop: {
            symbol: SymtusSymbol;
            status: SymtusStatus;
        }
        symbol: SymtusSymbol;
        status: SymtusStatus;
    }

    var viewOperation: { [type: string]: { [value: string]: Function } } = {
        status: {
            [SymtusStatus.normal]: function (grid: SymtusGrid) {
                viewOperation.symbol[grid.symbol](grid);
            },
            [SymtusStatus.source]: function (grid: SymtusGrid) {
                viewOperation.symbol[grid.symbol](grid);
                updateView(grid, { "stroke-width": "1.0" });
                var views: SVGElement[] = grid.views;
                removeView(grid);
                viewOperation.symbol[grid.symbol](grid);
                updateView(grid, { "stroke": SymtusColor.source, "stroke-width": "0.5" });
                views = views.concat(grid.views);
                removeView(grid);
                grid.views = views;
                appendView(grid);
            },
            [SymtusStatus.forbid]: function (grid: SymtusGrid) {
                viewOperation.symbol[grid.symbol](grid);
                updateView(grid, { "stroke": SymtusColor.forbid });
            },
            [SymtusStatus.broken]: function (grid: SymtusGrid) {
                viewOperation.symbol[grid.symbol](grid);
                updateView(grid, { "stroke": SymtusColor.broken });
            },
            [SymtusStatus.select]: function (grid: SymtusGrid) {
                var srtX = grid.x * 5 + 0.5;
                var srtY = grid.y * 5 + 0.5;
                var endX = grid.x * 5 + 4.5;
                var endY = grid.y * 5 + 4.5;
                var views = grid.views;
                removeView(grid);
                grid.views = views.concat([
                    createSVG("path", {
                        "stroke-width": "0.4",
                        "d": `M ${srtX} ${srtY + 1} V ${srtY} H ${srtX + 1}`,
                        "stroke": SymtusColor[(<SymtusSymbolType>SymtusSymbol[grid.symbol])],
                        "fill": "none"
                    }),
                    createSVG("path", {
                        "stroke-width": "0.4",
                        "d": `M ${endX} ${srtY + 1} V ${srtY} H ${endX - 1}`,
                        "stroke": SymtusColor[(<SymtusSymbolType>SymtusSymbol[grid.symbol])],
                        "fill": "none"
                    }),
                    createSVG("path", {
                        "stroke-width": "0.4",
                        "d": `M ${srtX + 1} ${endY} H ${srtX} V ${endY - 1}`,
                        "stroke": SymtusColor[(<SymtusSymbolType>SymtusSymbol[grid.symbol])],
                        "fill": "none"
                    }),
                    createSVG("path", {
                        "stroke-width": "0.4",
                        "d": `M ${endX - 1} ${endY} H ${endX} V ${endY - 1}`,
                        "stroke": SymtusColor[(<SymtusSymbolType>SymtusSymbol[grid.symbol])],
                        "fill": "none"
                    })
                ]);
                appendView(grid);
            }
        },
        symbol: {
            [SymtusSymbol.space]: function (grid: SymtusGrid) {
                removeView(grid);
                grid.prop.status = SymtusStatus.normal;
            },
            [SymtusSymbol.O]: function (grid: SymtusGrid) {
                removeView(grid);
                grid.views = [
                    createSVG("circle", {
                        "stroke-width": "0.6",
                        "cx": `${grid.x * 5 + 2.5}`,
                        "cy": `${grid.y * 5 + 2.5}`,
                        "r": "1.5",
                        "stroke": SymtusColor.O,
                        "fill": "none"
                    })
                ];
                appendView(grid);
            },
            [SymtusSymbol.X]: function (grid: SymtusGrid) {
                removeView(grid);
                var srtX: number = grid.x * 5 + 1;
                var srtY: number = grid.y * 5 + 1;
                var endX: number = grid.x * 5 + 4;
                var endY: number = grid.y * 5 + 4;
                grid.views = [
                    createSVG("path", {
                        "stroke-width": "0.6",
                        "stroke": SymtusColor.X,
                        "d": `M ${srtX} ${srtY} L ${endX} ${endY}`,
                        "fill": "none"
                    }),
                    createSVG("path", {
                        "stroke-width": "0.6",
                        "stroke": SymtusColor.X,
                        "d": `M ${srtX} ${endY} L ${endX} ${srtY}`,
                        "fill": "none"
                    })
                ];
                appendView(grid);
            }
        }
    };

    function createSVG<T extends keyof SVGElementTagNameMap>(tagName: T, attribute?: { [name: string]: string }): SVGElementTagNameMap[T] {
        var element: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", tagName);
        if (attribute) updateSVG(element, attribute);
        return element;
    }

    function updateSVG(element: SVGElement, attribute: { [name: string]: string }): void {
        for (var name in attribute) {
            var value: string = attribute[name]
            element.setAttribute(name, value);
        }
    }

    function appendView(grid: SymtusGrid) {
        grid.views.forEach(view => grid.board.viewer.body.appendChild(view));
    }

    function removeView(grid: SymtusGrid) {
        grid.views.forEach(view => grid.board.viewer.body.removeChild(view));
        grid.views = [];
    }

    function updateView(grid: SymtusGrid, attribute: { [name: string]: string }) {
        grid.views.forEach(view => updateSVG(view, attribute));
    }

    export class SymtusBoardViewer implements SymtusBoardViewer {
        body: SVGSVGElement = createSVG("svg");
        background: SVGGElement = createSVG("g");
        createSVG: Function = createSVG;
        updateSVG: Function = updateSVG;

        constructor(public board: SymtusBoard) {
            this.body.appendChild(this.background);
            this.body.setAttribute("width", `${board.width * 5}`);
            this.body.setAttribute("height", `${board.height * 5}`);
            this.body.addEventListener("click", function (
                this: SymtusBoardViewer, event: MouseEvent
            ) {
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

            for (var crd in board.gridOf) {
                var grid: SymtusGrid = board[crd];
                grid.prop = { symbol: 0, status: 0 };
                grid.views = [];

                (<SymtusType[]>["symbol", "status"]).forEach(function (type: SymtusType) {
                    Object.defineProperty(grid, type, {
                        get: function (this: SymtusGrid) {
                            return this.prop[type];
                        },
                        set: function (this: SymtusGrid, value: number) {
                            if (!viewOperation[type][value]) return;
                            this.prop[type] = value;
                            viewOperation[type][value](this);
                        }
                    });
                });
            }
        }

        resize(scale: number = 0.95) {
            var { board, container } = this;

            var size: number = Math.min(
                container.clientWidth / (board.width * 5),
                container.clientHeight / (board.height * 5)
            ) * scale;

            this.body.style.transform = `scale(${size})`;
        }

        appendIn(container: HTMLElement) {
            this.container = container;
            container.appendChild(this.body);
            this.resize();
        }
    }

    export class SymtusBoard extends GridBoard implements SymtusBoard {
        constructor(width: number, height: number) {
            super(width, height);
            this.viewer = new SymtusBoardViewer(this);
        }
    }
}
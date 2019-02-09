namespace lib {
    export type RelatiExtraType = "space-real" | "space" | "owner" | "other" | "valid";
    export type RelatiRuleType = "relati" | "relati-normal" |
        "relati-remote" | "relati-remote-normal" | "relati-remote-stable" |
        "escape" | "attack";

    export interface RelatiBoard extends SymtusBoard {
        grids: RelatiGrid[][];
        gridOf: { [crd: string]: RelatiGrid };
        viewer: RelatiBoardViewer;
    }

    export interface RelatiGrid extends SymtusGrid {
        query(dir: string): RelatiGrid | RelatiGrid[];
        is(type: SymtusStatusType | RelatiExtraType, sym?: SymtusSymbol): boolean;
        by(type: RelatiRuleType, sym: SymtusSymbol): RelatiGrid[];
        to(type: SymtusStatusType): void;
    }

    export interface RelatiBoardViewer extends SymtusBoardViewer {
        backgroundFixed: boolean;
        backgroundRemove(): void;
        appendGridPath(grids: RelatiGrid[], size: number, color: SymtusColor): void;
        appendGridDot(grid: RelatiGrid, size: number, color: SymtusColor): void;
    }

    function gridIs(this: RelatiGrid, type: SymtusStatusType | RelatiExtraType, sym?: SymtusSymbol): boolean {
        if (type === "space-real") {
            return this.symbol === SymtusSymbol.space;
        }

        if (type === "space") {
            return this.symbol === SymtusSymbol.space ||
                this.status === SymtusStatus.broken;
        }

        if (type === "owner") {
            return this.symbol === sym;
        }

        if (type === "other") {
            return this.symbol !== SymtusSymbol.space && this.symbol !== sym;
        }

        if (type === "valid") {
            return this.status === SymtusStatus.normal ||
                this.status === SymtusStatus.source;
        }

        if (type in SymtusStatus) {
            return this.status === SymtusStatus[type];
        }

        return false;
    }

    function gridBy(this: RelatiGrid, type: RelatiRuleType, sym: SymtusSymbol): RelatiGrid[] {
        var result: RelatiGrid[] = [];
        var viewer: RelatiBoardViewer = this.board.viewer;

        if (type === "relati" || type === "relati-normal") {
            var grids = <RelatiGrid[]>this.query("I;H;IH");

            for (var i = 0; i < grids.length; i++) {
                var grid = grids[i];
                if (grid && grid.is("owner", sym) && grid.is("valid")) {
                    result.push(grid);
                    viewer.appendGridPath(
                        [this, grid],
                        0.4,
                        SymtusColor[(<SymtusSymbolType>SymtusSymbol[this.symbol])]
                    );
                }
            }
        }

        if (type === "relati" || type === "relati-remote" || type === "relati-remote-normal") {
            var grids = <RelatiGrid[]>this.query("2I,I;2H,H,2IH,IH");

            for (var i = 0; i < grids.length; i += 2) {
                var grid = grids[i], space = grids[i + 1];
                if (grid && grid.is("owner", sym) && grid.is("valid")) {
                    if (space.is("space")) {
                        result.push(grid);
                        viewer.appendGridPath(
                            [this, grid],
                            0.4,
                            SymtusColor[(<SymtusSymbolType>SymtusSymbol[this.symbol])]
                        );
                    }
                }
            }
        }

        if (type === "relati" || type === "relati-remote" || type === "relati-remote-stable") {
            var grids = <RelatiGrid[]>this.query("IIH,II,I,IH,H,IHH,HH,H,HI,I");

            for (var i = 0; i < grids.length; i += 5) {
                var grid = grids[i], spaces = grids.slice(i + 1, i + 5);
                var exist = false;

                if (grid && grid.is("owner", sym) && grid.is("valid")) {
                    if (spaces[0].is("space") && spaces[1].is("space") ||
                        spaces[1].is("space") && spaces[2].is("space") ||
                        spaces[2].is("space") && spaces[3].is("space")
                    ) {
                        result.push(grid);
                    }

                    if (spaces[0].is("space") && spaces[1].is("space")) {
                        viewer.appendGridPath(
                            [this, spaces[1], spaces[0], grid],
                            0.4,
                            SymtusColor[(<SymtusSymbolType>SymtusSymbol[this.symbol])]
                        );
                    }

                    if (spaces[1].is("space") && spaces[2].is("space")) {
                        viewer.appendGridPath(
                            [this, spaces[1], spaces[2], grid],
                            0.4,
                            SymtusColor[(<SymtusSymbolType>SymtusSymbol[this.symbol])]
                        );
                    }

                    if (spaces[2].is("space") && spaces[3].is("space")) {
                        viewer.appendGridPath(
                            [this, spaces[3], spaces[2], grid],
                            0.4,
                            SymtusColor[(<SymtusSymbolType>SymtusSymbol[this.symbol])]
                        );
                    }
                }
            }
        }

        if (type === "escape") {
            var dirs: string[] = ["F", "B", "R", "L", "FR", "FL", "BR", "BL"];

            for (var dir of dirs) {
                var unit = 1;

                do {
                    var grid: RelatiGrid = <RelatiGrid>this.query(`${unit}${dir}`);
                    if (!grid || grid.is("other", sym) && !grid.is("space")) break;

                    if (grid.is("owner", sym) && grid.is("source")) {
                        result.push(grid);
                        break;
                    }

                    unit++;
                } while (grid);
            }
        }

        if (type === "attack") {
            var dirs: string[] = ["F", "B", "R", "L"];

            for (var dir of dirs) {
                var triggerExist = false;
                var unit = 1;

                do {
                    var grid: RelatiGrid = <RelatiGrid>this.query(`${unit}${dir}`);
                    if (!grid) break;

                    if (triggerExist) {
                        if (grid.is("owner", sym) && grid.is("valid")) {
                            result.push(grid);
                        }

                        break;
                    } else if (!grid.is("space")) {
                        triggerExist = true;
                    }

                    unit++;
                } while (grid);
            }
        }

        return result;
    }

    function gridTo(this: RelatiGrid, type: SymtusStatusType) {
        this.status = SymtusStatus[type];
    }

    function relati(grid: RelatiGrid, sym: SymtusSymbol, list: RelatiGrid[]) {
        if (list.indexOf(grid) > -1) return;
        list.push(grid);
        var grids = grid.by("relati", sym);
        for (let grid of grids) relati(grid, sym, list);
    } 

    function viewerAppendGridDot(this: RelatiBoardViewer, grid: RelatiGrid, size: number, color: SymtusColor) {
        if (this.backgroundFixed) return;

        var dot = this.createSVG("circle", {
            "cx": `${grid.x * 5 + 2.5}`,
            "cy": `${grid.y * 5 + 2.5}`,
            "r": `${size}`,
            "fill": color
        });

        this.background.appendChild(dot);
    }

    var gridPaths: string[] = [];

    function viewerAppendGridPath(this: RelatiBoardViewer, grids: RelatiGrid[], size: number, color: SymtusColor) {
        if (this.backgroundFixed) return;

        var gridPath: string = grids.map(grid => grid.crd).join("");
        if (gridPaths.indexOf(gridPath) > -1) return;
        gridPaths.push(gridPath);

        var path: string = `M ${grids[0].x * 5 + 2.5} ${grids[0].y * 5 + 2.5}`;

        for (var i = 1; i < grids.length; i++) {
            path += ` L ${grids[i].x * 5 + 2.5} ${grids[i].y * 5 + 2.5}`
        }

        var line: SVGElement = this.createSVG("path", {
            "stroke-width": size,
            "stroke": color,
            "d": path,
            "fill": "none"
        });

        line.style.opacity = "0.2";

        this.background.appendChild(line);
    }

    function viewerBackgroundRemove(this: RelatiBoardViewer) {
        while (this.background.childNodes.length > 0) {
            this.background.removeChild(this.background.childNodes[0]);
        }

        gridPaths = [];
    }

    export class RelatiBoard extends SymtusBoard {
        constructor(width: number, height: number) {
            super(width, height);

            for (var crd in this.gridOf) {
                var grid: RelatiGrid = this[crd];
                grid.is = gridIs;
                grid.by = gridBy;
                grid.to = gridTo;
            }

            this.viewer.backgroundFixed = false;
            this.viewer.appendGridPath = viewerAppendGridPath;
            this.viewer.appendGridDot = viewerAppendGridDot;
            this.viewer.backgroundRemove = viewerBackgroundRemove;
        }

        forbid() {
            var list: RelatiGrid[] = [];

            for (var crd in this.gridOf) {
                var grid: RelatiGrid = this[crd];

                if (grid.is("forbid")) {
                    grid.to("normal");
                }
            }

            for (var crd in this.gridOf) {
                var grid: RelatiGrid = this[crd];

                if (grid.is("source")) {
                    relati(grid, grid.symbol, list);
                }
            }

            for (var crd in this.gridOf) {
                var grid: RelatiGrid = this[crd];

                if (grid.is("normal") && list.indexOf(grid) < 0) {
                    grid.to("forbid");
                }
            }
        }
    }
}
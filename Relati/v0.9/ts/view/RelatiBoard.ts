import { RelatiGame } from "../main/RelatiGame";
import { createSVG, updateSVG, appendSVGChild, removeSVGChild } from "../core/SVGProcess";
import { RelatiBoard, RelatiGrid } from "../main/RelatiBoard";
import { RelatiSymbol } from "../main/RelatiDefs";

export class RelatiBoardView {
    public context: SVGSVGElement = createSVG("svg");
    public gridViews: RelatiGridView[] = [];
    public layers: SVGGElement[];

    constructor(public game: RelatiGame, public container: HTMLElement) {
        let { board } = game;

        updateSVG(this.context, {
            "width": `${board.width * 5}`,
            "height": `${board.height * 5}`
        });

        let routesLayer = createSVG("g");
        let dotsLayer = createSVG("g");
        let linesLayer = createSVG("g");
        let gridsLayer = createSVG("g");
        appendGridLine(board, linesLayer);

        this.layers = [routesLayer, dotsLayer, linesLayer, gridsLayer];
        appendSVGChild(this.context, this.layers);

        for (let grid of board.grids) {
            let gridView = new RelatiGridView(grid);
            gridsLayer.appendChild(gridView.context);
            this.gridViews.push(gridView);
        }

        this.container.appendChild(this.context);

        this.resize();
        window.addEventListener("resize", this.resize.bind(this));
    }

    resize() {
        let { container, game: { board: { width, height } } } = this;

        this.context.style.transform = "scale(" + Math.min(
            container.clientWidth / (width * 5),
            container.clientHeight / (height * 5)
        ) * 0.95 + ")";
    }

    update() {
        for (let gridView of this.gridViews) gridView.update();
    }

    remove() {
        for (let gridView of this.gridViews) gridView.remove();
        removeSVGChild(this.layers[0]);
        removeSVGChild(this.layers[1]);
    }
}

let lineAttr = {
    "d": "",
    "stroke": "#888",
    "stroke-width": "0.4"
};

function appendGridLine(board: RelatiBoard, linesLayer: SVGGElement) {
    for (let x = 1; x < board.width; x++) {
        lineAttr["d"] = `M ${x * 5} 0 V ${board.height * 5}`;
        let line = createSVG("path", lineAttr);
        linesLayer.appendChild(line);
    }

    for (let y = 1; y < board.height; y++) {
        lineAttr["d"] = `M 0 ${y * 5} H ${board.width * 5}`;
        let line = createSVG("path", lineAttr);
        linesLayer.appendChild(line);
    }
}

export class RelatiGridView {
    public context: SVGGElement = createSVG("g");
    public symbol: RelatiSymbol = "";
    public status: { [status: string]: boolean } = {};

    constructor(public grid: RelatiGrid) {
        this.symbol = grid.symbol;
        this.status = { ...grid.status };
        this.update();
    }

    update() {
        let { grid } = this;

        if (
            this.symbol == grid.symbol &&
            this.status["relati-launcher"] ==
            grid.status["relati-launcher"] &&
            this.status["relati-repeater"] ==
            grid.status["relati-repeater"] &&
            this.status["relati-receiver"] ==
            grid.status["relati-receiver"] &&
            this.status["attack-selected"] ==
            grid.status["attack-selected"]
        ) return;

        let symbolAttr = {
            "d": "",
            "fill": "none",
            "stroke": "",
            "stroke-width": "0.6"
        };

        let srtX = grid.x * 5 + 1;
        let srtY = grid.y * 5 + 1;
        let endX = grid.x * 5 + 4;
        let endY = grid.y * 5 + 4;

        switch (grid.symbol) {
            case "": {
                removeSVGChild(this.context);
                break;
            }

            case "O": {
                symbolAttr["d"] = (
                    `M ${srtX + 1.5} ${srtY + 1.5} ` +
                    "m 0 -1.5 " +
                    "a 1.5 1.5 0 0 1, 0 3 " +
                    "a 1.5 1.5 0 0 1, 0 -3"
                );
                symbolAttr["stroke"] = "crimson";
                break;
            }

            case "X": {
                symbolAttr["d"] = (
                    `M ${srtX} ${srtY} L ${endX} ${endY} ` +
                    `M ${endX} ${srtY} L ${srtX} ${endY}`
                );
                symbolAttr["stroke"] = "royalblue";
                break;
            }
        }

        if (!grid.is("relati-repeater")) symbolAttr["stroke"] = "#666";

        if (
            !grid.is(["relati-launcher", "relati-receiver"], "any")
        ) symbolAttr["stroke"] = "#bbb";

        if (!this.symbol) {
            if (!grid.isSpace) {
                if (grid.is("relati-launcher")) {
                    symbolAttr["stroke-width"] = "1.2";
                    this.context.appendChild(createSVG("path", symbolAttr));

                    symbolAttr["stroke-width"] = "0.6";
                    symbolAttr["stroke"] = "#f2f2f2";
                    this.context.appendChild(createSVG("path", symbolAttr));
                } else if (grid.is("relati-repeater")) {
                    this.context.appendChild(createSVG("path", symbolAttr));
                } else if (grid.is("relati-receiver")) {
                    this.context.appendChild(createSVG("path", symbolAttr));
                } else {
                    this.context.appendChild(createSVG("path", symbolAttr));
                }
            }
        } else {
            let color = symbolAttr["stroke"];

            updateSVG(
                this.context.childNodes[0] as SVGElement,
                { "stroke": color }
            );
        }

        this.symbol = grid.symbol;
        this.status = { ...grid.status };
    }

    remove() {
        this.symbol = "";
        this.status = {};
        removeSVGChild(this.context);
    }
}
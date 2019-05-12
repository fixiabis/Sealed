import { RelatiSVG } from "../RelatiSVG";
import { RelatiGame } from "../RelatiGame";
import { RelatiGrid } from "../RelatiBoard";

class GridsRender implements RelatiBoardRenderer {
    public layer = RelatiSVG("g");

    constructor(public boardView: RelatiBoardView) { }

    render() {
        var { gridRenderers, game, gridSize } = this.boardView;
        var { board } = game;

        RelatiSVG.empty(this.layer);

        for (var gridRenderer of gridRenderers) {
            for (var grid of board.gridList) {
                var gridView = gridRenderer.render(grid, gridSize);
                if (gridView) this.layer.appendChild(gridView);
            }
        }
    }
}

export class RelatiBoardView {
    public width: number;
    public height: number;
    public layers: SVGGElement[] = [];
    public container = RelatiSVG("svg");
    public background = RelatiSVG("g");
    public gridRenderers: RelatiGridRenderer[] = [];
    public boardRenderers: RelatiBoardRenderer[] = [];

    constructor(public game: RelatiGame, public gridSize: number) {
        var { width, height } = game.board;

        this.width = width * gridSize;
        this.height = height * gridSize;

        this.container = RelatiSVG("svg", {
            "width": `${this.width}`,
            "height": `${this.height}`
        });

        var gridLineLayer = RelatiSVG("g");

        var gridLineProp = {
            "d": "",
            "stroke": "#888",
            "stroke-width": `${gridSize * 0.08}`,
            "fill": "none"
        };

        for (var x = 1; x < width; x++) {
            gridLineProp["d"] = `M ${x * gridSize} 0 V ${gridSize * height}`;
            var gridLine = RelatiSVG("path", gridLineProp);
            gridLineLayer.appendChild(gridLine);
        }

        for (var y = 1; y < height; y++) {
            gridLineProp["d"] = `M 0 ${y * gridSize} H ${gridSize * width}`;
            var gridLine = RelatiSVG("path", gridLineProp);
            gridLineLayer.appendChild(gridLine);
        }

        this.layers.push(this.background);
        this.layers.push(gridLineLayer);

        var boardRenderer = new GridsRender(this);
        this.boardRenderers.push(boardRenderer);
        this.layers.push(boardRenderer.layer);
        this.render();
    }

    render() {
        var { container } = this;
        RelatiSVG.empty(container);

        for (var renderer of this.boardRenderers) {
            renderer.render();
        }

        for (var layer of this.layers) {
            container.appendChild(layer);
        }
    }
}

export interface RelatiGridRenderer {
    render(
        grid: RelatiGrid,
        gridSize: number
    ): SVGElement | undefined;
}

export interface RelatiBoardRenderer {
    boardView: RelatiBoardView;
    render(): void;
}
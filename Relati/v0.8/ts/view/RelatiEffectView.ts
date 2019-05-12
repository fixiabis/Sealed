import { createSVG } from "../core/SVGProcess";
import { RelatiGrid, RELATI_LAUNCHER, RELATI_RECEIVER } from "../core/RelatiBoard";
import { getRelatiTracesBy } from "../core/RelatiRoutes";
import { RelatiGame } from "../core/RelatiGame";

const RELATI_EFFECTED = 0b10000000;
const SYMBOL_COLOR = ["#666", "crimson", "royalblue"];

let dotAttr = {
    "cx": "",
    "cy": "",
    "r": "0.5",
    "fill": ""
};

function createDot(x: number, y: number, color: string) {
    dotAttr["cx"] = `${x * 5 + 2.5}`;
    dotAttr["cy"] = `${y * 5 + 2.5}`;
    dotAttr["fill"] = color;
    return createSVG("circle", dotAttr);
}

export function createHintEffect(grids: RelatiGrid[], symbol: number, view: SVGElement) {
    let color = SYMBOL_COLOR[symbol];
    for (let { x, y } of grids) {
        view.appendChild(createDot(x, y, color));
    }
}

let lineAttr = {
    "d": "",
    "stroke-width": "0.5",
    "stroke": "",
    "fill": "none",
    "class": "relati-effect-line"
};

function createLine(source: RelatiGrid, traces: RelatiGrid[], color: string, view: SVGElement) {
    lineAttr["d"] = `M ${source.x * 5 + 2.5} ${source.y * 5 + 2.5}`;
    lineAttr["stroke"] = color;

    for (let grid of traces) {
        lineAttr["d"] += ` L ${grid.x * 5 + 2.5} ${grid.y * 5 + 2.5}`;
    }

    let path = createSVG("path", lineAttr);
    view.appendChild(path);
}

function createRelatiLine(grid: RelatiGrid, color: string, view: SVGElement, routeType: number, turn: number, game: RelatiGame) {
    if (grid.is(RELATI_EFFECTED) || game.turn > turn) return;
    grid.gain(RELATI_EFFECTED);

    setTimeout(() => {
        if (game.turn > turn) return;
        let traces = getRelatiTracesBy(grid, grid.symbol | RELATI_RECEIVER, routeType);

        for (let grids of traces) {
            let targetGrid = grids[grids.length - 1];

            if (!targetGrid.is(RELATI_EFFECTED)) {
                createLine(grid, grids, color, view);
                createRelatiLine(targetGrid, color, view, routeType, turn, game);
            }
        }
    }, 250);
}

export function createRelatiEffect(symbol: number, view: SVGElement, game: RelatiGame) {
    let { board: { grids }, routeType, turn } = game;
    let color = SYMBOL_COLOR[symbol];

    for (let grid of grids) grid.lost(RELATI_EFFECTED);

    for (let grid of grids) {
        if (grid.is(RELATI_LAUNCHER) && grid.symbol == symbol) {
            createRelatiLine(grid, color, view, routeType, turn, game);
        }
    }
}
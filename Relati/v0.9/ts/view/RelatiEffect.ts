import { createSVG } from "../core/SVGProcess";
import { RelatiGrid } from "../main/RelatiBoard";
import { RelatiGame } from "../main/RelatiGame";
import { RelatiRoute, RelatiRouteType } from "../main/rule/RelatiRoute";
import { RelatiSymbol } from "../main/RelatiDefs";

const SYMBOL_COLOR = {
    "": "#666",
    "O": "crimson",
    "X": "royalblue"
};

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

export function createHintEffect(grids: RelatiGrid[], symbol: RelatiSymbol, view: SVGElement) {
    let color = SYMBOL_COLOR[symbol];

    for (let { x, y, symbol } of grids) {
        if (symbol) continue;
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

function createRelatiLine(grid: RelatiGrid, color: string, view: SVGElement, routeType: RelatiRouteType, turn: number, game: RelatiGame) {
    if (grid.is("effect-activate") || game.turn > turn) return;
    grid.gain("effect-activate");

    setTimeout(() => {
        if (game.turn > turn) return;
        let traces = RelatiRoute.trace(grid, grid.symbol, ["relati-receiver"], routeType);

        for (let grids of traces) {
            grids.reverse();

            let targetGrid = grids[grids.length - 1];

            if (!targetGrid.is("effect-activate")) {
                createLine(grid, grids, color, view);
                createRelatiLine(targetGrid, color, view, routeType, turn, game);
            }
        }
    }, 250);
}

export function createRelatiEffect(symbol: RelatiSymbol, view: SVGElement, game: RelatiGame) {
    let { board: { grids }, routeType, turn } = game;
    let color = SYMBOL_COLOR[symbol];

    for (let grid of grids) grid.lost("effect-activate");

    for (let grid of grids) {
        if (grid.is("relati-launcher") && grid.symbol == symbol) {
            createRelatiLine(grid, color, view, routeType, turn, game);
        }
    }
}